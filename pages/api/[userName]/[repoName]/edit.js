import { gitUpdateFile } from "@/utils/gitUpdateFile";

export default async function edit(req, res) {
  const { repoName, userName } = req.query;
  const repoPath = `${userName}/${repoName}`;
  const { content, commitMsg, filePath } = req.body;

  try {
    const { data, error } = gitUpdateFile(
      repoPath,
      filePath,
      content,
      commitMsg
    );

    if (error) return res.status(400).json({ message: "Something went wrong" });

    return res.status(200).json({ message: "Succesful" });
  } catch (error) {
    return res.status(400).json({ error });
  }
}
