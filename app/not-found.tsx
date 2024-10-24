import Image from "next/image"

function NotFoundPage() {
    return (
        <div className="relative bg-white p-20 rounded-xl flex flex-col justify-center items-center">
            <Image src={'/images/404_error.webp'} height={200} width={200} className="rounded-full h-64 w-64 border border-black" alt="404 error image" />
            <h1 className="text-lg text-center mt-5">
                La página solicitada no existe o no se ha podido encontrar
            </h1>
        </div>
    )
}

export default NotFoundPage