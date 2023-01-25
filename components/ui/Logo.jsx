import Image from "next/image";

function Logo({width}) {
  return (
    <>
      <div className="flexbox" style={{ position: "relative", width: width, height: width * 3 / 16 }}>
        <Image src="/inko-studio-logo-white.png" alt="Inko Studios Logo" fill={true} style={{ objectFit: "contain" }}/>
      </div>
    </>
  );
}

export default Logo;