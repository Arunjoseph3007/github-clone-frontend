import { gitify } from "./gitify";

const childProcess = require("child_process");

const query = `git log --shortstat --no-merges --pretty="%cE" | sed 's/\\(.*\\)@.*/\\1/' | grep -v "^$" | awk 'BEGIN { line=""; } !/^ / { if (line=="" || !match(line, $0)) {line = $0 "," line }} /^ / { print line " # " $0; line=""}' | sort | sed -E 's/# //;s/ files? changed,//;s/([0-9]+) ([0-9]+ deletion)/\\1 0 insertions\\(+\\), \\2/;s/\\(\\+\\)$/\\(\\+\\), 0 deletions\\(-\\)/;s/insertions?\\(\\+\\), //;s/ deletions?\\(-\\)//' | awk 'BEGIN {name=""; files=0; insertions=0; deletions=0;} {if ($1 != name && name != "") { print name ": " files " files changed, " insertions " insertions(+), " deletions " deletions(-), " insertions-deletions " net"; files=0; insertions=0; deletions=0; name=$1; } name=$1; files+=$2; insertions+=$3; deletions+=$4} END {print name ": " files " files changed, " insertions " insertions(+), " deletions " deletions(-), " insertions-deletions " net";}'`;

export const gitContributionStats = (repoPath, branch = "main") => {
  try {
    const result = childProcess
      .execSync(query, { cwd: gitify(repoPath) })
      .toString()
      .split("\n")
      .filter((a) => a)
      .map(lineCountExtractor);

    let commitResult = childProcess
      .execSync(`git log --pretty=format:"%cE"| sort | uniq -c`, {
        cwd: gitify(repoPath),
      })
      .toString()
      .split("\n")
      .filter((a) => a)
      .map((a) => a.trim())
      .filter((a) => a)
      .map((a) => ({
        commits: +a.split(" ")[0],
        ...result.find((elm) => elm.user === a.split(" ")[1].split("@")[0]),
      }));

    return { data: commitResult, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const lineCountExtractor = (a) => {
  const details = a
    .split(",")
    .filter((a) => a)
    .map((a) => a.trim());

  const user = details[0];
  const insertions = +details
    .find((a) => a.includes("insertions(+)"))
    .split(" ")[0];
  const deletions = +details
    .find((a) => a.includes("deletions(-)"))
    .split(" ")[0];
  const filesChanged = +details
    .find((a) => a.includes("files changed"))
    .split(" ")[1];
  const net = insertions - deletions;

  return {
    user,
    insertions,
    deletions,
    filesChanged,
    net,
  };
};
