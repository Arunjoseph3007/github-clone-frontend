import { gitify } from "./gitify";

const childProcess = require("child_process");

export const gitShowBranches = (repoPath) => {
  try {
    const result = childProcess
      .execSync(`git branch -v`, {
        cwd: gitify(repoPath),
      })
      .toString();

    let branches = result
      .split("\n")
      .filter((a) => a)
      .map((line) => {
        const active = line.charAt(0) === "*";
        const details = line
          .slice(2)
          .split(" ")
          .filter((a) => a);

        return {
          active,
          name: details[0],
          objectId: details[1],
          commit: details.splice(2).join(" "),
        };
      });

    return { data: branches, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
