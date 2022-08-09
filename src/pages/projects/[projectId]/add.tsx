import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/router";

import useEditorSlice from "../../../store/useEditorSlice";
const PdfRenderComponent = dynamic(
  () => import("../../../components/PdfRenderComponent"),
  { ssr: false }
);

const ContentFormComponent = dynamic(
  () => import("../../../components/ContentForm"),
  { ssr: false }
);

export default function Pdf() {
  const { query } = useRouter();
  const { project, setProject } = useEditorSlice();

  useEffect(() => {
    if (!project && query.projectId) {
      axios.get(`/api/projects/${query.projectId}`).then(async (data) => {
        data?.data?.project && setProject(data?.data?.project);
      });
    }
  }, [project, query.projectId, setProject]);

  return (
    <div className="grid grid-cols-2 gap-3 h-screen w-full">
      <div className="col-span-1 h-screen w-full overflow-y-auto">
        <ContentFormComponent />
      </div>
      <div className="col-span-1 h-full w-full">
        <div className="flex w-full h-screen">
          <PdfRenderComponent />
        </div>
      </div>
    </div>
  );
}
