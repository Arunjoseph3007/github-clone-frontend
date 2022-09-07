import { gitify } from "./gitify";

const childProcess = require("child_process");

export const gitLs = (repoPath, dirPath = ".", branch = "main") => {
  try {
    const result = childProcess.execSync(`git ls-tree ${branch} ${dirPath}/`, {
      cwd: gitify(repoPath),
    });

    let files = [],
      dirs = [],
      Readme = null;

    const allFilesAndDirs = result.toString().split("\n");

    //@ Extract al directories and files
    allFilesAndDirs
      .filter((a) => a)
      .forEach((elm) => {
        const name = elm.split("\t").pop();
        const commitName = elm.replaceAll("\t", " ").split(" ")[2];

        if (elm.split(" ")[1] === "tree") {
          dirs.push({ name, objectId: commitName });
        } else {
          files.push({ name, objectId: commitName });
        }
      });

    //@ Query for last commit of each file/directory
    const cmdQuery = [...dirs, ...files].map(querify).join(" && ");

    //@ Collecting history
    const historyResult = childProcess
      .execSync(cmdQuery, {
        cwd: gitify(repoPath),
      })
      .toString()
      .split("\n")
      .filter((a) => a)
      .map((line) => {
        const details = line.split(" #### ");

        return {
          lastCommit: details[0],
          author: details[1],
          lastCommitMessage: details[2],
          lastCommitDate: details[3],
        };
      });

    //@ Combining history with files
    dirs = dirs.map((dir, i) => ({ ...dir, ...historyResult[i] }));
    files = files.map((file, i) => ({
      ...file,
      ...historyResult[i + dirs.length],
    }));

    //@ Checking for Readme
    const ReadmeFile = files.find((file) =>
      file?.name?.toUpperCase().includes("README")
    )?.objectId;

    if (ReadmeFile) {
      Readme = childProcess
        .execSync(`git show ${ReadmeFile}`, { cwd: gitify(repoPath) })
        .toString();
    }

    return { data: { files, dirs, Readme }, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const querify = (elm) =>
  `git log -n 1 --pretty=format:"%H #### %an #### %s #### %ad \n" -- ${elm.name}`;
