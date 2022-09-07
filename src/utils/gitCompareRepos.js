import { gitify } from "./gitify";

const childProcess = require("child_process");

export const gitCompareRepos = (
  repoA,
  repoB,
) => {
  try {
    const result = childProcess
      .execSync(
        `GIT_ALTERNATE_OBJECT_DIRECTORIES=${gitify(repoB)}/objects \
         git diff $(git --git-dir=${gitify(
           repoB
         )} rev-parse --verify HEAD) HEAD`,
        {
          cwd: gitify(repoA),
        }
      )
      .toString();

    return {
      data: {
        body: result,
        message: "my random message",
        authorName: "Arun joseph",
        createdAt: "Tue Aug 2 18:13:25 2022 +0530",
      },
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
};
