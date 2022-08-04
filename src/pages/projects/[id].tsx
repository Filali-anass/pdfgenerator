import Image from "next/image";
import React from "react";
import { IProject } from "../../model/Project";

export async function getServerSideProps(context: any) {
  const res = await fetch(
    `http://localhost:3000/api/projects/${context.params.id}`,
    {
      headers: {
        Cookie: Object.entries(context.req.cookies).reduce((acc, e, index) => {
          const [key, value] = e;
          if (index == 0) {
            return acc + key + "=" + value;
          } else {
            return acc + "; " + key + "=" + value;
          }
        }, ""),
      },
    }
  );
  const data = await res.json();

  return { props: { project: data.project } };
}

export default function Project({
  project: { _id, name, description, image },
}: {
  project: IProject;
}) {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 overflow-hidden bg-gray-100 sm:rounded-xl cursor-pointer">
        <Image src={image} alt="" width={50} height={50} />
        <h4 className="text-xl font-medium text-gray-700">{name}</h4>
        <p className="text-base text-center text-gray-500">{description}</p>
      </div>
    </div>
  );
}
