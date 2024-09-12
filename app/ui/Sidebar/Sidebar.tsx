import Image from "next/image";
import styles from "@/ui/Sidebar/sidebar.module.css";

export default function Sidebar() {
  return (
    <>
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
        <div className="h-full px-3 py-4 overflow-y-auto bg-blue-900">
          <div className="flex flex-col items-center mt-5 cursor-pointer">
            <a href="/create-appointment">
              <Image
                width={60}
                height={60}
                src="/images/logo_empresa.png"
                alt="Logo de Innovadent"
              ></Image>
            </a>
            <h3 className="text-white font-bold text-2xl">Innovadent</h3>
          </div>
          <div className="mt-10 flex flex-col justify-center items-center space-y-5">
            <a
              className={`${styles["create-button"]}`}
              href="/create-appointment"
            >
              Crear una cita
            </a>
            <a className={`${styles["create-button"]}`} href="#">
              Ver citas
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
