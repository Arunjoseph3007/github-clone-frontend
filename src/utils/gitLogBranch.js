import { gitify } from "./gitify";

const childProcess = require("child_process");

export const gitLogBranch = (repoPath, branch = "main") => {
  try {
    const result = childProcess
      .execSync(`git log --pretty=format:"%H || %an || %ad || %s" ${branch}`, {
        cwd: gitify(repoPath),
      })
      .toString();

    const data = result
      .split("\n")
      .filter((a) => a)
      .map((a) => {
        const details = a.split(" || ");

        return {
          objectId: details[0],
          authorName: details[1],
          date: details[2],
          message: details[3],
        };
      });

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
