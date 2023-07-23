import { gitify } from "./gitify";

const childProcess = require("child_process");

const DefaultConfig = {
  install: "npm install",
  run: "npm run dev",
  autoStart: false,
};

export const getGetFs = (repoPath, branch = "main") => {
  try {
    const result = childProcess
      .execSync(`git ls-files ${branch} .`, {
        cwd: gitify(repoPath),
      })
      .toString()
      .split("\n")
      .filter((a) => a);

    const allFiles = result.map((path) => {
      const content = childProcess
        .execSync(`git show ${branch}:"${path}"`, {
          cwd: gitify(repoPath),
        })
        .toString();
      return { content, path };
    });

    const gitFs = {};
    allFiles.forEach((file) => {
      const pathSegs = file.path.split("/").filter(Boolean);
      const endFileName = pathSegs.pop();
      let currentObj = gitFs;

      pathSegs.forEach((seg) => {
        if (!currentObj.hasOwnProperty(seg)) {
          currentObj[seg] = { directory: {} };
        }
        currentObj = currentObj[seg].directory;
      });

      currentObj[endFileName] = { file: { contents: file.content } };
    });

    const configText = gitFs?.["gitbase.launch.json"]?.file?.contents || "{}";
    const configFromFile = JSON.parse(configText);
    const configCombined = { ...DefaultConfig, ...configFromFile };

    return { data: { files: gitFs, config: configCombined }, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
