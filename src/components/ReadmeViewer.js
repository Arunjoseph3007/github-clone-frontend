import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ReadmeViewer = memo(({ text }) => {
  if (!text) return;

  return (
    <div className="my-10 rounded-xl bg-neutral-focus w-full  max-w-[1000px] mx-auto">
      <h1 className="text-3xl p-5 border-b">Readme.md</h1>
      <div class="prose prose-lg dark:prose-invert prose-a:text-blue-500 p-5 ">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
});

export default ReadmeViewer;
