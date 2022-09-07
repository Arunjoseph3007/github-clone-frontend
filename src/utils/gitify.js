const rootUserDir = process.env.GIT_ROOT_DIRECTORY;

export const gitify = (repo) => rootUserDir + repo + ".git";
