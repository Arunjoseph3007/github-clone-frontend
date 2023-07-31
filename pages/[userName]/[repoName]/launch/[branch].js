import FileTree from "@/components/FileTree";
import { CopyIcon } from "@/icons/copy";
import { LaunchIcon } from "@/icons/launch";
import { getGetFs } from "@/utils/gitGetFs";
import { WebContainer } from "@webcontainer/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "xterm/css/xterm.css";

/** @type {WebContainer} */
let container = null;
/** @type boolean */
let done = false;
/** @type {import('xterm').Terminal} */
let terminal = null;
/** @type {import('@webcontainer/api').WebContainerProcess} */
let devServerProcess = null;

const TABS = ["logs", "files", "edit"];

export default function LaunchPage({ files, config }) {
  const [status, setStatus] = useState("Initializing");
  const [url, setUrl] = useState("");
  const [selectedTab, setSelectedTab] = useState("logs");
  const [isRunning, setIsRunning] = useState(false);
  const terminalElm = useRef();
  const router = useRouter();

  useEffect(() => {
    if (done) return;

    setup();

    return () => {
      terminal?.dispose();
      container?.teardown();
    };
  }, []);

  const setUpTerminal = async () => {
    const { Terminal } = await import("xterm");
    terminal = new Terminal({
      convertEol: true,
      rows: 32,
      cursorBlink: true,
    });
    terminal.open(terminalElm.current);
  };

  const setUpContainer = async () => {
    setStatus("Booting web container...");
    container = await WebContainer.boot();

    setStatus("Mounting files...");
    await container.mount(files);

    setStatus("Installing dependencies...");
    await runCommand(config.install);

    container.on("server-ready", (port, url) => {
      setStatus(`Server ready on Port ${port}`);
      setUrl(url);
    });
  };

  const startServer = async () => {
    if (isRunning) {
      toast.warn("Process already running");
      return;
    }
    setStatus("Starting dev server...");
    setIsRunning(true);
    terminal.write(config.run + "\n");
    const installCmd = config.run.split(" ")[0];
    const installArgs = config.run.split(" ").slice(1);
    devServerProcess = await container.spawn(installCmd, installArgs);
    devServerProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          terminal.write(data);
        },
      })
    );
  };

  const stopServer = async () => {
    if (!isRunning) {
      toast.error("Dev server is not running");
      return;
    }
    devServerProcess?.kill();
    setIsRunning(false);
    setUrl("");
    setStatus("Dev server closed");
    terminal.write("=> ");
  };

  const setup = async () => {
    done = true;
    try {
      await setUpTerminal();
      await setUpContainer();
      if (config.autoStart) {
        await startServer();
      }
    } catch (e) {
      router.reload();
    }
  };

  const saveFile = async (file, content) => {
    try {
      await container.fs.writeFile(file, content);
      toast.success(`${file} saved succefully`);
    } catch (error) {
      toast.error("Counldn't save the file");
    }
  };

  const readFile = async (fileName) => {
    const content = await container.fs.readFile(fileName, "utf-8");
    return content;
  };

  const runCommand = async (command) => {
    terminal.write(`Executing: ${command}\n`);
    const tool = command.split(" ")[0];
    const args = command.split(" ").slice(1);
    const cmdProcess = await container.spawn(tool, args);
    cmdProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          terminal.write(data);
        },
      })
    );

    const exitCode = await cmdProcess.exit;
    terminal.write("=> ");
    return exitCode;
  };

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden border">
      <div className="w-full flex items-center justify-between px-4 py-2">
        <Link href="/">
          <div className="flex gap-2 items-center">
            <img src="/logo4.png" className="w-12" />
            <h3>
              <span className="font-bold text-2xl mr-3">GitBase</span>
              Launch
            </h3>
          </div>
        </Link>
        <h2 className="text-lg font-medium">{status}</h2>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 overflow-scroll flex flex-col">
          <div className="p-1">
            <div className="input-group">
              <input
                type="text"
                placeholder={status}
                value={url}
                readOnly
                className="input input-bordered flex-1"
              />
              <button
                onClick={() => navigator.clipboard.writeText(url)}
                className="btn btn-square"
              >
                <CopyIcon />
              </button>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-square ml-1"
              >
                <LaunchIcon />
              </a>
            </div>
          </div>
          <iframe className="w-full flex-1" src={url} />
        </div>
        <div className="w-1/2 flex flex-col">
          <div className="tabs">
            {TABS.map((tab) => (
              <a
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`tab tab-lg tab-lifted capitalize ${
                  tab == selectedTab && "tab-active"
                }`}
              >
                {tab}
              </a>
            ))}
            <div className="flex-1" />
            <button
              onClick={isRunning ? stopServer : startServer}
              className="btn gap-2"
            >
              <LaunchIcon /> <p>{isRunning ? "stop" : "start"}</p>
            </button>
          </div>
          <div
            className={selectedTab == "logs" ? "block" : "hidden"}
            id="terminal"
            ref={terminalElm}
          />
          <div
            className={`overflow-y-scroll ${
              selectedTab == "files" ? "block" : "hidden"
            }`}
          >
            <FileTree files={{ directory: files }} />
          </div>
          <div
            className={`h-full w-full flex items-center justify-center ${
              selectedTab == "edit" ? "block" : "hidden"
            }`}
          >
            <p className="text-xl font-bold">Commig soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const pathName = `${ctx.params.userName}/${ctx.params.repoName}`;
  const branch = ctx.params.branch;

  const { data, error } = getGetFs(pathName, branch);

  console.log({data,error})

  if (error) return { notFound: true };

  return { props: data };
};
