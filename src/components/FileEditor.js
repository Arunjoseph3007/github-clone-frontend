import BreadCrumbs from "@/components/BreadCrumbs";

export default function FileEditor({ content, setContent }) {
  return (
    <>
      <div className="mockup-code bg-neutral-focus [font-family:monospace_!important]">
        <div className="px-4 flex justify-between items-center pb-3">
          <BreadCrumbs />
        </div>
        <pre className="flex" data-prefix={" "} key={10}>
          <textarea
            rows={Math.min(content.split("\n").length + 10, 30)}
            className="flex-1 bg-transparent"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </pre>
      </div>
    </>
  );
}
