import { DocumentIcon } from "@/icons/documents";

export default function LanguageIcon({ name }) {
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
  html: "html5",
  css: "css3",
  kt: "kotlin",
  swift: "swift",
  jl: "julia",
};
