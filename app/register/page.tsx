import Form from "@/ui/register/Form";

export default function register() {
  return (
    <div className="relative flex flex-col justify-center">
      <div className="rounded-lg bg-gray-50 px-3 my-10 py-3 m-2 sm:px-10 sm:mx-5 md:m-10 md:px-20 md:py-20">
        <h2 className="text-[#1F2937] text-center text-3xl font-bold mb-5">Créate una cuenta</h2>
        <Form />
      </div>
    </div>
  );
}
