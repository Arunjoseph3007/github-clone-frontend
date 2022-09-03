import hljs from "highlight.js/lib/common";

export const syntaxHighlight = (text) => hljs.highlightAuto(text).value;
