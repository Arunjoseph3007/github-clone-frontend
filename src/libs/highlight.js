import hljs from "highlight.js/lib/common";

export const syntaxHighlight = (text, extension) => {
  return hljs.highlightAuto(text).value;
};
