import { gitify } from "./gitify";

const childProcess = require("child_process");

export const gitGraphSvg = (repoPath) => {
  try {
    const result = childProcess
      .execSync(`git log --all --pretty="%h|%s|%p"`, {
        cwd: gitify(repoPath),
      })
      .toString()
      .split("\n")
      .filter((a) => a)
      .map((line) => {
        let [hash, message, parentAndBranches] = line.split("|");
        const [parent, ...branches] = parentAndBranches?.split(" ");

        return {
          hash,
          message,
          parent,
          branches,
        };
      });

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
