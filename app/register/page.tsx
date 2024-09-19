import PasswordField from "@/ui/password/passwordField";
import PhotoPreviewer from "@/ui/photo/Photo";

export default function register() {
  return (
    <div className="relative flex flex-col justify-center">
      <div className="rounded-lg bg-gray-50 mx-4 sm:mx-2 shadow px-20 py-5">
        <h2 className="text-left text-2xl mb-5">Créate una cuenta</h2>
        <form>
          <div className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Nombre de usuario*
              </label>
              <input
                name="text"
                type="text"
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Escribe tú nombre de usuario"
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Correo electrónico*
              </label>
              <input
                name="email"
                type="text"
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Escribe tú correo aquí"
              />
            </div>
            <PasswordField labelName="Contraseña*" />
            <PasswordField labelName="Confirmar contraseña*" />
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Añade una foto de perfil
              </label>
              <PhotoPreviewer />
            </div>
          </div>

          <div className="!mt-12">
            <button
              type="button"
              className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Crear cuenta
            </button>
          </div>
          <p className="text-gray-800 text-sm mt-6 text-center">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="/login"
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Inicia sesión aquí
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
