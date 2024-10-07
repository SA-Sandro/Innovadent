
import { AsideProps } from "@/lib/definitions";
import UserRoutes from "@/ui/sidebar/Routes/UserRoutes";
import AdminRoutes from "@/ui/sidebar/Routes/AdminRoutes";
import NonSignedInRoutes from "@/ui/sidebar/Routes/NonSignedInRoutes";
import { useSession } from "@/context/SessionContext";

export default function Aside({ burguerIsClicked }: AsideProps) {

  const { session } = useSession();

  return (
    <aside
      className={`fixed top-0 z-50 left-0 w-64 h-screen transition-transform sm:translate-x-0
      ${burguerIsClicked ? "translate-x-0" : "-translate-x-full"}`}
    >
      {session?.isLoggedIn && session?.role === 'user' ? <UserRoutes /> : (
        session?.role === 'admin' ? <AdminRoutes /> : <NonSignedInRoutes />)}
    </aside>
  );
}