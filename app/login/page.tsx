import Form from "@/ui/login/Form";

export default function Login() {
  return (
    <>
      <div className="flex flex-col justify-center items-center relative h-[90%] ">
        <div className="p-8 rounded-xl bg-gray-50 mx-4 sm:mx-2 shadow">
          <h2 className="text-gray-800 text-center text-2xl font-bold">
            Inicio de sesión
          </h2>
          <Form />
        </div>
      </div>
    </>
  );
}
