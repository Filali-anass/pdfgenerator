import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IProject } from "../../model/Project";

export default function Projects({ projects }: { projects: IProject[] }) {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h2 className="">Projects</h2>
        <Link href="/projects/add">
          <button className="px-4 py-2 bg-indigo-500 outline-none rounded text-white shadow-indigo-200 shadow-lg font-medium active:shadow-none active:scale-95 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
            <p className="cursor-pointer">Add Project</p>
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-8  sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0 p-6">
        {projects.map(({ _id, image, name, description }) => (
          <Link key={_id} href={`/projects/${_id}`}>
            <div className="relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 overflow-hidden bg-gray-100 sm:rounded-xl cursor-pointer">
              <Image src={image} alt="" width={50} height={50} />
              <h4 className="text-xl font-medium text-gray-700">{name}</h4>
              <p className="text-base text-center text-gray-500">
                {description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
