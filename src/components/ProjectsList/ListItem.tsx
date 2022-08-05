import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IProject } from "../../model/Project";

export function ListItem({ _id, image, name, description }: Partial<IProject>) {
  return (
    <Link href={`/projects/${_id}`}>
      <div className="relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 overflow-hidden bg-gray-100 sm:rounded-xl cursor-pointer">
        <Image src={image ?? ""} alt="" width={50} height={50} />
        <h4 className="text-xl font-medium text-gray-700">{name}</h4>
        <p className="text-base text-center text-gray-500">{description}</p>
      </div>
    </Link>
  );
}
