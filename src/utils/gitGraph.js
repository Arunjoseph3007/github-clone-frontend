import { gitify } from "./gitify";

const childProcess = require("child_process");

export const gitGraph = (repoPath) => {
  try {
    const result = childProcess
      .execSync(
        `git log --graph --abbrev-commit --decorate --format=format:'||||||||________||||||||%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all`,
        {
          cwd: gitify(repoPath),
        }
      )
      .toString();

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
