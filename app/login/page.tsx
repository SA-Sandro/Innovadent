import Form from "@/ui/login/Form";

export default async function Login() {
  return (
    <div className="flex flex-col justify-center items-center relative">
      <div className="px-8 py-16 rounded-xl bg-gray-50 mx-4 sm:mx-2 shadow">
        <h2 className="text-[#1F2937] text-center text-3xl font-bold">
          Inicia la sesión
        </h2>
        <Form />
      </div>
    </div>
  );
}
