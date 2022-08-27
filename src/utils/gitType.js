const childProcess = require("child_process");

const rootUserDir = process.env.GIT_ROOT_DIRECTORY

export const gitType = (repoPath, filePath = "", branch = "main") => {
  try {
    const result = childProcess
      .execSync(`git cat-file -p ${branch}:${filePath}`, {
        cwd: rootUserDir + repoPath,
      })
      .toString();

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
