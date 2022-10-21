import { gitify } from "./gitify";

const childProcess = require("child_process");

export const gitType = (
  repoPath,
  filePath = "",
  branch = "main",
  assertedType = null
) => {
  try {
    const result = childProcess
      .execSync(`git cat-file -t ${branch}:"${filePath}"`, {
        cwd: gitify(repoPath),
      })
      .toString()
      .slice(0, -1);

    if (assertedType) {
      return assertedType === result;
    }

    return { type: result, error: null };
  } catch (error) {
    return { type: null, error };
  }
};
