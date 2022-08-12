import Link from "next/link";
import React from "react";

export default function AccessDenied() {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div>
        <p className="py-6">Access Denied</p>
        <Link href="/auth">
          <button className="px-4 py-2 bg-indigo-500 outline-none rounded text-white shadow-indigo-200 shadow-lg font-medium active:shadow-none active:scale-95 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
            <p className="cursor-pointer">{"S'authentifier"}</p>
          </button>
        </Link>
      </div>
    </div>
  );
}
