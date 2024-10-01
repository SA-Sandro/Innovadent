import { ReactElement } from "react";
import Routes from '@/ui/sidebar/Routes';

type AsideProps = {
  burguerIsClicked: boolean;
};

export default function Aside({ burguerIsClicked }: AsideProps): ReactElement {

  return (
    <aside
      className={`fixed top-0 z-50 left-0 w-64 h-screen transition-transform sm:translate-x-0
        ${burguerIsClicked ? "translate-x-0" : "-translate-x-full"}`}
    >
      <Routes />
    </aside>
  );
}
