import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IProject } from "../../model/Project";
import useEditorSlice from "../../store/useEditorSlice";

export async function getServerSideProps(context: any) {
  const res = await fetch(
    `http://${context.req.headers.host}/api/projects/${context.params.projectId}`,
    {
      headers: {
        Cookie: Object.entries(context.req.cookies).reduce((acc, e, index) => {
          // key + "=" + value
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
  project,
  project: { name, description, image },
}: {
  project: IProject;
}) {
  const { setProject } = useEditorSlice();

  return (
    <div className="w-full justify-center items-center p-4">
      <div className="flex bg-gray-100 p-4 rounded my-4">
        <Image src={image} alt="" width={80} height={80} />
        <div className="p-4">
          <h2 className="">{name}</h2>
          <p className="text-gray-500">{description}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <h2 className="">Reports</h2>
        <Link href={`/projects/${project._id}/add`}>
          <button
            onClick={() => {
              console.log("Trying to set project");
              setProject(project);
            }}
            className="px-4 py-2 bg-indigo-500 outline-none rounded text-white shadow-indigo-200 shadow-lg font-medium active:shadow-none active:scale-95 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
          >
            <p className="cursor-pointer">Add Report</p>
          </button>
        </Link>
      </div>
    </div>
  );
}
