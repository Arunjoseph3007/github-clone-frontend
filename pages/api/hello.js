import { gitShowBranches } from "@/utils/gitShowBranches";

export default function handler(req, res) {
  const { userName, repoName } = req.body;

  const { data, error } = gitShowBranches(`${userName}/${repoName}`);

  if (!error) return res.status(200).json(data);

  return res.status(404).json(error);
}
