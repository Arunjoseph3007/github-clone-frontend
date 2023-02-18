import BreadCrumbs from "@/components/BreadCrumbs";
import { useState } from "react";

export default function FileEditor({ fileName, data }) {
  const [content, setContent] = useState(data);

  return (
    <>
      <div className="mockup-code bg-neutral-focus [font-family:monospace_!important]">
        <div className="px-4 flex justify-between items-center pb-3">
          <BreadCrumbs />
        </div>
        <pre className="flex-1" data-prefix={1} key={10}>
          <textarea
          className="flex-1 w-full bg-transparent"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </pre>
      </div>
    </>
  );
}
