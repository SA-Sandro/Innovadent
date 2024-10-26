
import { AsideProps } from "@/lib/definitions";
import { useSession } from "@/context/SessionContext";
import AdminRoutes from "./Routes/AdminRoutes";
import UserRoutes from "./Routes/UserRoutes";
import NonSignedInRoutes from "./Routes/NonSignedInRoutes";

export default function Aside({ burguerIsClicked }: AsideProps) {

  const { session } = useSession();

  return (
    <aside
      className={`fixed top-0 z-50 left-0 w-64 h-screen transition-transform sm:translate-x-0  bg-[#1F2937]
      ${burguerIsClicked ? "translate-x-0" : "-translate-x-full"}`}
    >
      {session?.isLoggedIn && session?.role === 'user' ? <UserRoutes /> : (
        session?.role === 'admin' ? <AdminRoutes /> : <NonSignedInRoutes />)}
    </aside>
  );
}