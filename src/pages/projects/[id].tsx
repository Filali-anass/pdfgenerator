import Image from "next/image";
import React from "react";
import { IProject } from "../../model/Project";

export async function getServerSideProps(context: any) {
  console.log(context.req.headers.host);
  const res = await fetch(
    `http://${context.req.headers.host}/api/projects/${context.params.id}`,
    {
      headers: {
        Cookie: `next-auth.session-token=${context.req.cookies["next-auth.session-token"]}`,
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
    <div className="w-full justify-center items-center p-4">
      <div className="flex bg-gray-100 p-4 rounded my-4">
        <Image src={image} alt="" width={80} height={80} />
        <div className="p-4">
          <h2 className="">{name}</h2>
          <p className="text-gray-500">{description}</p>
        </div>
      </div>
      <div className="relative flex flex-col col-span-4 px-8 py-12 space-y-4 overflow-hidden bg-gray-100 sm:rounded-xl cursor-pointer">
        Here we have the reports
      </div>
    </div>
  );
}
