import { useRouter } from "next/router";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="bg-black text-white dead-center flex-col fullscreen">
      <p className="text-8xl font-semibold">404</p>
      <h1>Couldn&apos;t find the page that you are looking for</h1>
    </div>
  );
}
