import { gitify } from "./gitify";

const childProcess = require("child_process");

export const gitShow = (repoPath, filePath, branch = "main") => {
  try {
    const result = childProcess
      .execSync(`git show ${branch}:${filePath}`, {
        cwd: gitify(repoPath),
      })
      .toString();

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
