const path = require("path");

const rootUserDir = process.env.GIT_ROOT_DIRECTORY;

export const gitify = (repo) => path.normalize(rootUserDir + repo + ".git")
