import { gitify } from "./gitify";

const childProcess = require("child_process");

export const gitShowCommit = (repoPath, commitId) => {
  try {
    const result = childProcess
      .execSync(
        `git show --pretty=format:"%H __||__ %s __||__ %ad __||__ %an __||__ %ae __||__ " ${commitId}`,
        {
          cwd: gitify(repoPath),
        }
      )
      .toString();

    const details = result.split(" __||__ ");

    const data = {
      commitId: details[0],
      message: details[1],
      authorDate: details[2],
      authorName: details[3],
      authorEmail: details[4],
      body: details[5],
    };

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
