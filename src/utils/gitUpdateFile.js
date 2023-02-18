import { gitify } from "./gitify";

const childProcess = require("child_process");

export const gitUpdateFile = (repoPath, filePath, content, commitMsg) => {
  const run = (command) =>
    childProcess.execSync(command, { cwd: gitify(repoPath) }).toString();

  try {
    const objectHash = run(`echo ${content} | git hash-object -w --stdin`);

    const result = run(
      `git update-index --cacheinfo 0644 ${objectHash} "${filePath}"`
    );

    const writeTreeHash = run("git write-tree");

    const commitHash = run(
      `git commit-tree ${writeTreeHash} -p HEAD -m "${commitMsg}"`
    );

    const update = run(`git update-ref HEAD ${commitHash}`);

    return { data: "Successfull", error: null };
  } catch (error) {
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
