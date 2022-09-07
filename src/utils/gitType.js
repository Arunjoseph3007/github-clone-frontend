import { gitify } from "./gitify";

const childProcess = require("child_process");

export const gitType = (repoPath, filePath = "", branch = "main") => {
  try {
    const result = childProcess
      .execSync(`git cat-file -p ${branch}:${filePath}`, {
        cwd: gitify(repoPath),
      })
      .toString();

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
