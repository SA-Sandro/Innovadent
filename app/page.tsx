import Image from "next/image";
import Info from "../ui/Info/Info";

export default function Home() {
  return (
    <div className="relative flex flex-col justify-center items-center">
      <div className="relative rounded-md w-92 sm:w-[21rem] md:w-[30rem] mt-10 bg-[#1F2937]/90 py-3 px-3 mx-3 text-center">
        <h3 className="text-4xl max-w-80 m-auto text-white font-bold relative">
          Innovadent
          <Image
            src={"/images/logo_empresa.png"}
            alt="Icono de la empresa"
            width={30}
            height={30}
            className="h-auto w-auto absolute -top-2 -right-2 xs:right-4"
          />
        </h3>
        <p className="text-xl text-gray-200 mt-1">
          Porque tú sonrisa es nuestra prioridad

        </p>

      </div>
      <Info />
    </div>
  );
}
