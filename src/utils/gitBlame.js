import { gitify } from "./gitify";

const childProcess = require("child_process");

export const gitBlame = (repoPath, filePath, branch = "main") => {
  try {
    const result = childProcess
      .execSync(`git blame --line-porcelain ${branch} "${filePath}"`, {
        cwd: gitify(repoPath),
      })
      .toString()
      .split("\t")
      .map(getLineFromNext)
      .filter((a) => a)
      .map(objFromText);

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const objFromText = (text) => {
  const details = text.split("\n");

  const commitId    = details[1].split(" ")[0];
  const content     = details[0].slice("text ".length);
  const summary     = details.find((a) => a.startsWith("summary ")).slice("summary ".length);
  const commiter    = details.find((a) => a.startsWith("committer ")).slice("committer ".length);
  const previous    = details.find((a) => a.startsWith("previous "))?.split(' ')?.[1] || null;
  const authorTime  = new Date(details.find((a) => a.startsWith("author-time ")).slice("author-time ".length) * 1000).toString();

  return {
    content,
    commitId,
    summary,
    commiter,
    authorTime,
    previous
  };
};

const getLineFromNext = (text, index, array) => {
  if (index === array.length - 1) return null;

  let details = text.split("\n");

  if (index!==0)  details = details.slice(1);

  const nextLine = "text " + array[index + 1].split("\n")[0];
  details = [nextLine, ...details];

  return details.join("\n");
};
