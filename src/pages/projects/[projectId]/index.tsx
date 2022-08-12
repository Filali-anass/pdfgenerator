import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReportsList from "../../../components/ReportsList";
import { IProject } from "../../../model/Project";
import { IReport } from "../../../model/Report";
import useEditorSlice from "../../../store/useEditorSlice";

export async function getServerSideProps(context: any) {
  const projectRes = await fetch(
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
  const projectResJSON = await projectRes.json();

  const reportsRes = await fetch(
    `http://${context.req.headers.host}/api/reports?projectId=${context.params.projectId}`,
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
  const reportsResJSON = await reportsRes.json();

  return {
    props: {
      project: projectResJSON?.project,
      reports: reportsResJSON?.reports ?? [],
    },
  };
}

export default function Project({
  project,
  project: { name, description, image },
  reports,
}: {
  project: IProject;
  reports: IReport[];
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
      <ReportsList reports={reports} project={project} />
    </div>
  );
}
