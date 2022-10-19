import Link from "next/link";
export default function Home() {
  return (
    <div>

      <div
        className="hero min-h-screen "
        style={{
          backgroundImage: "url(/background.png)",
        }}
        
      >
        <div className="hero"></div>
        <div className="hero-content text-center text-neutral-content flex flex-col">
          <div className="max-w-sm ">
            <img src="logo3.png" className="max-w-sm rounded-lg" />
            
          </div>
          <p className="mb-5" style={{color:'black'}}>
              Want a database for your repositories! You Landed at your Goal.
            </p>
            <Link href={'/signup'}>
              <button className="btn m-3" >Get Started</button>
            
            </Link>
          </div>
      </div>
    </div>
  );
}
