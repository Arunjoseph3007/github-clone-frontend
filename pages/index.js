import Link from "next/link";
import GLOBE from "vanta/dist/vanta.globe.min";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
export default function Home() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        GLOBE({
          el: myRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xffffff,
          backgroundColor: 0x000000,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <div ref={myRef}>
      
      <div className="hero min-h-screen justify-start text-white">
        <div className="hero-content text-neutral-content flex flex-col items-start md:ml-[10rem]">
        <div className="text-[3rem] md:text-[15rem]" style={{"fontFamily":'Bebas Neue'}}>
          GitBase
        </div>
          <p className=" md:-mt-[3rem] md:text-[1.5rem] font-semibold" >
            Want a database for your repositories!
          </p>
          <p className="mb-2 md:-mt-[1rem] opacity-80 md:text-[1rem] " >  You Landed at your Goal.</p>
          <Link href={"/signup"}>
            <button className="btn btn-active btn-primary btn-sm md:btn-md">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
// import Link from "next/link";
// export default function Home() {
//   return (
//     <div>

//       <div
//         className="hero min-h-screen "
//         style={{
//           backgroundImage: "url(/background.png)",
//         }}

//       >
//         <div className="hero"></div>
//         <div className="hero-content text-center text-neutral-content flex flex-col">
//           <div className="max-w-sm ">
//             <img src="logo3.png" className="max-w-sm rounded-lg" />

//           </div>
//           <p className="mb-5" style={{color:'black'}}>
//               Want a database for your repositories! You Landed at your Goal.
//             </p>
//             <Link href={'/signup'}>
//               <button className="btn m-3" >Get Started</button>

//             </Link>
//           </div>
//       </div>
//     </div>
//   );
// }
