import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
function Nav() {
  const { data: session } = useSession();

  const { pathname } = useRouter();

  const noNavPaths = ["/auth", "/auth1"];

  const renderNav = !noNavPaths.includes(pathname);

  return renderNav ? (
    <nav
      className={
        "fixed w-full h-20 shadow-xl z-[100] ease-in-out duration-300 bg-[#ecf0f3]"
      }
    >
      <div className="flex justify-between items-center w-full h-full px-2 2x:px-16">
        <div className="flex justify-center items-center">
          <Link href="/">
            <a className="flex justify-center items-center">
              <p className="px-4 uppercase">PDF Gen</p>
            </a>
          </Link>
        </div>
        <div className="flex">
          <div className="flex justify-center items-center">
            <ul className="hidden md:flex">
              <Link href="/">
                <li className="ml-10 text-sm uppercase hover:text-[#5651e5]">
                  Home
                </li>
              </Link>
              <Link href="/#about">
                <li className="ml-10 text-sm uppercase hover:text-[#5651e5]">
                  About
                </li>
              </Link>
            </ul>
          </div>
          <div className="flex justify-center items-center">
            <ul className="hidden md:flex">
              <li className="ml-10 text-sm uppercase hover:text-[#5651e5]">
                {session ? (
                  <div className="flex justify-center items-center">
                    {/* <p className="px-4">
                      {session?.user?.email} <br />
                    </p> */}
                    <button onClick={() => signOut()}>Sign out</button>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-center items-center">
                      <button onClick={() => signIn()}>Sign in</button>
                    </div>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  ) : (
    <></>
  );
}

export default Nav;
