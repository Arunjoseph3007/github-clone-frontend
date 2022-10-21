import { gitify } from "./gitify";
import { gitType } from "./gitType";

const childProcess = require("child_process");

export const gitShow = (repoPath, filePath, branch = "main") => {
  try {
    const isFile = gitType(repoPath, filePath, branch, "blob");
    if (!isFile) {
      return { data: null, error: "Given ref is not a file" };
    }

    const result = childProcess
      .execSync(`git show ${branch}:"${filePath}"`, {
        cwd: gitify(repoPath),
      })
      .toString();

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
