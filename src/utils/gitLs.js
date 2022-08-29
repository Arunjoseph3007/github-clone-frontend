const childProcess = require("child_process");

const rootUserDir = process.env.GIT_ROOT_DIRECTORY;

export const gitLs = (repoPath, dirPath = ".", branch = "main") => {
  try {
    const result = childProcess.execSync(`git ls-tree ${branch} ${dirPath}/`, {
      cwd: rootUserDir + repoPath,
    });

    //? SAMPLE RESULT
    // 100755 blob bffb357a7122523ec94045523758c4b825b448ef	.eslintrc.json
    // 100755 blob 6a486bc6c78b9044de9e6503b067d1cf5f81c11e	.gitignore
    // 040000 tree 7401b8efa6c339346ac682f6552c91cc222dab51	.vscode
    // 100755 blob b12f3e33e7d5bdb88dde6f2e09a42367592e2241	README.md
    // 100644 blob 2789359322c32ac04c94266c4eb100926f40ed96	jsconfig.json
    // 100644 blob 4ae671cccea88303fa8f27c9bac06c0cab2a54d2	middleware.js
    // 100644 blob 4ec18532d519f86d75d133eedec3fa8e6d4536fb	package.json

    let files = [],
      dirs = [],
      Readme = null;

    const allFilesAndDirs = result.toString().split("\n");

    allFilesAndDirs
      .filter((a) => a)
      .forEach((elm) => {
        //? SAMPLE ELM
        // 100644 blob d047e8f25e197a4ce843a25d13016e4ce9cb5f56	tailwind.config.js (FILE)
        // 040000 tree ee03056099151a19dc889d081b34c2fa0eaa815a	styles (DIRS)

        const name = elm.split("\t").pop();
        const commitName = elm.replaceAll("\t", " ").split(" ")[2];

        if (elm.split(" ")[1] === "tree") {
          dirs.push({ name, objectId: commitName });
        } else {
          files.push({ name, objectId: commitName });
        }
      });

    const ReadmeFile = files.find((file) =>
      ["README.MD", "README.MARKDOWN", "README.HTML"].includes(
        file?.name?.toUpperCase()
      )
    )?.objectId;

    if (ReadmeFile) {
      Readme = childProcess
        .execSync(`git show ${ReadmeFile}`, { cwd: rootUserDir + repoPath })
        .toString();
    }

    return { data: { files, dirs, Readme }, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
