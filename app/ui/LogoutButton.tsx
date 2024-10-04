'use client'
import { useSession } from "@/context/SessionContext";
import { logoutAction } from "@/lib/actions"
import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";



export default function LogoutButton() {

    const { setSession } = useSession();

    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await logoutAction();
        } catch (error) {
            console.error(error)
        }
        finally {
            setSession({
                isLoggedIn: undefined,
                role: undefined
            })
            router.push('/login')
        }
    };


    return (
        <form onSubmit={handleSubmit} className="cursor-pointer space-x-2 flex items-center bg-gray-600 hover:bg-gray-700 rounded-md p-1   ">
            <CiLogout size={20} strokeWidth={0.9} />
            <button>Cerrar sesión</button>
        </form>
    )
}