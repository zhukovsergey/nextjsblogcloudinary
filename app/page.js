import Image from "next/image";
import homeLog from "../public/home.png";

export default function Home() {
  return (
    <div className="container flex flex-col md:flex-row gap-5 h-[calc(100vh-4rem)]">
      <div className="basis-full flex flex-col justify-center md:basis-2/3">
        <p className="special-word text-xs"> фильмы, сериалы, тв-шоу</p>
        <h1 className="pb-5">
          {" "}
          Zhukovka <span className="special-word"> о дорамах</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel dolorum
          assumenda fugit libero obcaecati vero esse nemo ipsam nostrum? Illum
          perspiciatis saepe dignissimos nam hic et, nostrum veniam maxime
          accusantium.
        </p>
      </div>
      <div className=" hidden md:block basis-1/3">
        <Image
          src={homeLog}
          alt="home"
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
