import Image from "next/image";
import Info from "@/ui/Info/Info";

export default function Home() {
  return (
    <>
      <div className="relative flex flex-col justify-center items-center">
        <div className="relative rounded-md w-92 sm:w-[21rem] md:w-[30rem] mt-10 bg-[#1F2937]/90 py-3 px-3 mx-3 text-center">
          <h3 className="text-4xl text-white font-bold">Innovadent</h3>
          <p className="text-xl text-gray-200 mt-1">
            Porque tú sonrisa es nuestra prioridad
          </p>
          <div className="absolute top-1 right-1 sm:right-3 md:right-20">
            <Image
              src={"/images/logo_empresa.png"}
              alt="Icono de la empresa"
              width={35}
              height={35}
            />
          </div>
        </div>
        <Info />
      </div>
    </>
  );
}
