import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="relative flex items-center">
        <Image
          width={800}
          height={900}
          src="/images/main-background.jpg"
          alt="Fondo de Innovadent"
        ></Image>
        <div className="absolute top-0">
          <h3 className="">Innovadent</h3>
          <p>Porque vuestra sonrisa si que importa</p>
        </div>
      </div>
    </>
  );
}
