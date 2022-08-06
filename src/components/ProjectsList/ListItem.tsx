import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IProject } from "../../model/Project";
import useEditorSlice from "../../store/useEditorSlice";

export function ListItem({ project }: { project: IProject }) {
  return (
    <Link href={`/projects/${project._id}`}>
      <div className="relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 overflow-hidden bg-gray-100 sm:rounded-xl cursor-pointer">
        <Image src={project.image ?? ""} alt="" width={50} height={50} />
        <h4 className="text-xl font-medium text-gray-700">{project.name}</h4>
        <p className="text-base text-center text-gray-500">
          {project.description}
        </p>
      </div>
    </Link>
  );
}
