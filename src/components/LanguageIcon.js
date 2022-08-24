import { DocumentIcon } from "@/icons/documents";

export default function LanguageIcon({ name }) {
  const extension = getExtension(name);

  if (Devicons[extension])
    return <i className={`devicon-${Devicons[extension]}-plain`}></i>;

  return <DocumentIcon />;
}

const getExtension = (name) => name.split(".").pop();

const Devicons = {
  js: "javascript",
  py: "python",
  c: "c",
  cpp: "cplusplus",
  java: "java",
  sh: "bash",
};
