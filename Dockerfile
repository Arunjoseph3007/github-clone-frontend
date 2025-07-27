FROM node:18

# General configs
WORKDIR /app
EXPOSE 8000
ENV PORT=3000
ENV NEXT_PUBLIC_API=http://django:8080
ENV GIT_ROOT_DIRECTORY=/var/www/git

# install deps and copy code
COPY package.json yarn.lock .
RUN yarn config set "strict-ssl" false -g
RUN yarn
COPY . .

# Build project
ENV NODE_ENV=production
RUN npm run build

# Install apache
RUN apt update
RUN apt install -y apache2 apache2-utils

# Setup config files
COPY configs/authScript.js /usr/local/bin/authScript.js
# Hack to solve `bash: /usr/local/bin/authScript.js: cannot execute: required file not found` issue
RUN sed -i 's/\r$//' /usr/local/bin/authScript.js
RUN chmod +x /usr/local/bin/authScript.js
COPY configs/git.conf /etc/apache2/sites-available/
COPY configs/ports.conf /etc/apache2/

# setup apache sites and modules
RUN a2dissite 000-default.conf
RUN a2ensite git.conf
RUN apt install -y libapache2-mod-authnz-external
RUN a2enmod authnz_external proxy proxy_http rewrite 

# start apache in background and start next server 
# TODO: use pm2 maybe
CMD ["sh", "-c", "service apache2 start && npm run start"]
