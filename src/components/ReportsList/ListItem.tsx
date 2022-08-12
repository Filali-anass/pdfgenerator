import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IProject } from "../../model/Project";
import { IReport } from "../../model/Report";
import useEditorSlice from "../../store/useEditorSlice";

export function ListItem({
  project,
  report,
}: {
  project: IProject;
  report: IReport;
}) {
  const { setReport } = useEditorSlice();
  return (
    <Link href={`/projects/${project._id}/reports/${report._id}`}>
      <div
        onClick={() => {
          setReport(report, project);
        }}
        className="relative flex flex-col items-center justify-between col-span-3 px-8 py-8 space-y-4 overflow-hidden bg-gray-100 sm:rounded-xl cursor-pointer"
      >
        <h4 className="text-xl font-medium text-gray-700">{report.subject}</h4>
        <p className="text-base text-center text-gray-500">{report.date}</p>
      </div>
    </Link>
  );
}
