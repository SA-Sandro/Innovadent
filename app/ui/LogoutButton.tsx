'use client'
import { useSession } from "@/context/SessionContext";
import { logoutAction } from "@/lib/actions"
import { useRouter } from "next/navigation";


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
        <form onSubmit={handleSubmit}>
            <button>Cerrar sesión</button>
        </form>
    )
}