import { ReactNode } from "react";
import Nav from "../Nav";
import Meta from "../Meta";
import { useRouter } from "next/router";
import SideBar from "../SideBar";
import { useSession } from "next-auth/react";
interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useRouter();
  const { data: session } = useSession();

  const noNavPaths = ["/auth", "/pdf"];

  const renderNav = session && !noNavPaths.includes(pathname);

  return (
    <>
      <Meta />
      <div className={renderNav ? "flex w-full" : "flex w-full"}>
        {renderNav && <SideBar />}
        <main className="flex w-full">{children}</main>
      </div>
    </>
  );
};

export default Layout;
