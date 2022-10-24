import { gitify } from "./gitify";

const childProcess = require("child_process");

export const gitCommitFrequency = (repoPath, branch = "main") => {
  try {
    const result = childProcess
      .execSync(`git log --date=short --pretty=format:%ad | sort | uniq -c`, {
        cwd: gitify(repoPath),
      })
      .toString()
      .split("\n")
      .filter((a) => a)
      .map((a) => a.trim())
      .map((a) => ({
        date: new Date(a.split(" ")[1]).toString(),
        commits: +a.split(" ")[0],
      }));

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
