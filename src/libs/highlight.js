import hljs from "highlight.js/lib/common";

export const syntaxHighlight = (text, extension) => {
  try {
    return hljs.highlight(text, { language: extension }).value;
  } catch (e) {
    return hljs.highlightAuto(text).value;
  }
};
