import { gitify } from "./gitify";

const childProcess = require("child_process");

const hashObjectCommand = (content) =>
  `echo '${content}' | git hash-object -w --stdin`;

const updateIndexCommand = (objectHash, filePath) =>
  `git update-index --add --cacheinfo  0644 ${objectHash.trimEnd()} "${filePath}"`;

const commitHashCommand = (writeTreeHash, commitMsg, branch) =>
  `git commit-tree ${writeTreeHash.trimEnd()} -p ${branch} -m "${commitMsg}"`;

const updateRefCommand = (commitHash, branch) =>
  `git update-ref ${branch} ${commitHash.trimEnd()}`;

export const gitUpdateFile = (
  repoPath,
  branch = "main",
  filePath,
  content,
  commitMsg,
  authorName,
  authorEmail
) => {
  const run = (command) => {
    const output = childProcess
      .execSync(command, { cwd: gitify(repoPath) })
      .toString();
    return output;
  };

  try {
    const objectHash = run(hashObjectCommand(content));
    const result = run(updateIndexCommand(objectHash, filePath));
    const writeTreeHash = run("git write-tree");
    const commitHash = run(commitHashCommand(writeTreeHash, commitMsg, branch));
    const update = run(updateRefCommand(commitHash, branch));

    return { data: "Successfull", error: null };
  } catch (error) {
    console.log(error.toString());
    return { data: null, error };
  }
};

/*
&PROCEDURE
` echo content | git hash-object -w --stdin <==> objectHash
` git update-index --cacheinfo 0644 {objectHash} {filePath}
` git write-tree <==> writeTreeHash
` git commit-tree {writeTreeHash} -p HEAD -m {commitMsg} <==> commitHash
` git update-ref HEAD {commitHash}
*/
