import { gitify } from "./gitify";

const childProcess = require("child_process");

export const gitArchiveAsZip = (repoPath) => {
  try {
    const result = childProcess
      .execSync(`git archive --format zip HEAD`, {
        cwd: gitify(repoPath),
      })
      .toString();

    console.log(repoPath, result);

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
