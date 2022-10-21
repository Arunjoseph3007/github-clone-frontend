import { syntaxHighlight } from "@/libs/highlight";
import BreadCrumbs from "@/components/BreadCrumbs";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FileViewer({ fileName, extension, data }) {
  const { asPath } = useRouter();

  //$ For images
  if (["jpg", "png"].includes(extension)) {
    return (
      <div tabIndex="1" className="collapse text-white collapse-arrow p-0">
        <div className="px-4">
          <BreadCrumbs />
        </div>
        <input type="checkbox" className="peer" />
        <div className="font-mono bg-neutral-focus mt-2 p-5 font-semibold rounded-t-md collapse-title ">
          <h1>Content in {fileName} is not text</h1>
          View Raw
        </div>
        <div className="rounded-none mb-2 collapse-content">
          <div className="mockup-code">
            {data.split("\n").map((line, i, arr) => (
              <pre
                style={{ color: `hsl(${(360 * i) / arr.length}, 50%, 65%)` }}
                data-prefix={i}
                key={i}
              >
                <code>{line}</code>
              </pre>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mockup-code bg-neutral-focus [font-family:monospace_!important]">
        <div className="px-4 flex justify-between items-center pb-3">
          <BreadCrumbs />
          <Link href={asPath.replace("/blob/", "/blame/")}>
            <a className="btn">View blame</a>
          </Link>
        </div>
        {data.split("\n").map((line, i, arr) => (
          <pre
            id={"L" + i}
            className="target:bg-gray-300 flex-1"
            data-prefix={i}
            key={i}
          >
            <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(line) }} />
          </pre>
        ))}
      </div>
    </>
  );
}
