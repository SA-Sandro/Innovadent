import Form from "@/ui/register/Form";

export default function register() {
  return (
    <div className="relative flex flex-col justify-center">
      <div className="rounded-lg bg-gray-50 mx-4 sm:mx-2 shadow px-20 py-5">
        <h2 className="text-left text-2xl mb-5">Créate una cuenta</h2>
        <Form />
      </div>
    </div>
  );
}
