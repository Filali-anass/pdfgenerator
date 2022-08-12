import Link from "next/link";
import React from "react";
import { IProject } from "../../model/Project";
import { IReport } from "../../model/Report";
import useEditorSlice from "../../store/useEditorSlice";
import { ListItem } from "./ListItem";

export default function ReportsList({
  reports,
  project,
}: {
  reports: IReport[];
  project: IProject;
}) {
  const { setProject } = useEditorSlice();

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="">Reports</h2>
        <Link href={`/projects/${project._id}/reports/add`}>
          <button
            onClick={() => {
              setProject(project);
            }}
            className="px-4 py-2 bg-indigo-500 outline-none rounded text-white shadow-indigo-200 shadow-lg font-medium active:shadow-none active:scale-95 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
          >
            <p className="cursor-pointer">Ajouter un Rapport</p>
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-8  sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0 p-6">
        {reports.map((report) => (
          <ListItem key={report._id} project={project} report={report} />
        ))}
      </div>
      {/* <div className="flex">
        {reports.map((r) => (
          <div
            key={r._id}
            className="bg-gray-100 p-4 rounded m-4 cursor-pointer"
          >
            <p>{r.subject}</p>
            <p>{r.date}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
}
