import Image from "next/image";
import { CiLogin } from "react-icons/ci";
import styles from "./user.module.css";

export default function UserSidebar() {
  return (
    <div>
      <div className="flex items-center space-x-4">
        <div className="">
          <Image
            src={"/icons/UnregisteredUserIcon.svg"}
            alt="Usuario no registrado"
            width={60}
            height={60}
            className="rounded-md "
          />
        </div>
        <div className="space-y-2">
          <button
            type="button"
            className="text-sm bg-[#a08f35] hover:bg-[#cbb130] transition-colors duration-200 p-1 w-40 rounded-lg flex justify-center items-center"
          >
            <span>Identifícate</span>
            <CiLogin size={20} className={styles["login-icon"]} />
          </button>
          <p className="text-sm text-center">
            ¿Eres nuevo?
            <a
              href="#"
              target="_blank"
              className="underline hover:text-[#ffe250f4]"
            >
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
