import { gitify } from "./gitify";

const childProcess = require("child_process");

export const gitCheckEmpty = (repoPath) => {
  try {
    const result = childProcess
      .execSync(`git count-objects`, { cwd: gitify(repoPath) })
      .toString();

    return result === "0 objects, 0 kilobytes\n";
  } catch (error) {
    return false;
  }
};
