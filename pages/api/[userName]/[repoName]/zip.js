import { gitArchiveAsZip } from "@/utils/gitArchiveAsZip";
import { gitify } from "@/utils/gitify";

const childProcess = require("child_process");

// export default async function zip(req, res) {
//   const { repoName, userName } = req.query;

//   console.log({ repoName, userName });

//   const { data, error } = gitArchiveAsZip(`${userName}/${repoName}`);

//   if (error) {
//     console.log(error.toString());
//     return res.status(404).json({ msg: error.toString() });
//   }

//   res.setHeader("Content-disposition", `attachment; filename=${repoName}.zip`);
//   res.setHeader("Content-type", "application/zip");
//   res.setHeader("Content-length",data.length)
//   res.charset = "UTF-8";
//   res.write(data);
//   res.end();
// }

export default async function zip(req, res) {
  const { repoName, userName } = req.query;

  console.log({ repoName, userName });

  res.setHeader("Content-type", "application/zip");
  res.setHeader("Content-disposition", `attachment; filename=${repoName}.zip`);

  try {
    const reader = childProcess.spawn("git", ["archive", "--format", "zip"], {
      cwd: gitify(userName + "/" + repoName),
    });
    reader.stdout.pipe(res);

    reader.on("close", () => {
      res.status(200);
      res.end();
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
}
