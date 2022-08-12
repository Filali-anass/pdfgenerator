import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const ROUTES = [
  // {
  //   label: "Dashboard",
  //   path: "/dashboard",
  // },
  {
    label: "Projects",
    path: "/projects",
  },
  {
    label: "Settings",
    path: "/settings",
  },
  // {
  //   label: "Editor",
  //   path: "/pdf",
  // },
];

export default function SideBar() {
  const { pathname } = useRouter();
  const { data: session } = useSession();
  return (
    <div className="min-h-screen bg-gray-100 z-10 shadow-lg">
      <div className="sidebar   overflow-hidden border-r w-56  ">
        <div className="flex flex-col justify-between pt-2 pb-6">
          <div>
            <div className="w-full justify-center items-center my-6 space-y-2 tracking-wide">
              <div className="w-full flex justify-center rounded-xl">
                <Image
                  className="p-4 rounded-[50%]"
                  src={session?.user?.image ?? ""}
                  alt=""
                  width={80}
                  height={80}
                />
              </div>
              <p className="w-full text-center text-2xl">
                {session?.user?.name}
              </p>
            </div>
            <ul className="mt-6 space-y-2 tracking-wide">
              {ROUTES.map(({ label, path }) => (
                <li key={label} className="min-w-max">
                  <Link href={path}>
                    <span
                      className={
                        pathname.includes(path)
                          ? "relative flex items-center space-x-4 bg-indigo-600 focus:ring-2 focus:ring-indigo-600 px-4 py-3 text-white"
                          : "relative bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600 hover:text-indigo-600 "
                      }
                    >
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
