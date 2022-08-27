export default function DiffSection({ section }) {
  const files = section.split("\n")[0];

  let fileA = files.split(" ")[1].slice(2);
  let fileB = files.split(" ")[2].slice(2);
  const sameFile = fileA === fileB;

  return (
    <div tabindex="1" class="collapse collapse-arrow p-0">
      <input type="checkbox" class="peer" />
      <div className="font-mono bg-neutral-focus mt-2 p-5 font-semibold rounded-t-md collapse-title ">
        {sameFile ? fileA : fileA + " " + fileB}
      </div>
      <div className="mockup-code rounded-none mb-2 collapse-content">
        {section
          .split("\n")
          .filter((a, i) => a && i)
          .map((line, i, arr) => (
            <pre
              style={{
                color:
                  !"-+".includes(line.charAt(0)) &&
                  `hsl(${(360 * i) / arr.length}, 50%, 65%)`,
              }}
              className={`
          ${line.charAt(0) === "+" && "bg-success text-success-content"} 
          ${line.charAt(0) === "-" && "bg-error text-error-content"}
          `}
              data-prefix={i + 1}
              key={i}
            >
              <code>{line}</code>
            </pre>
          ))}
      </div>
    </div>
  );
}
