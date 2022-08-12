import { ReportAddEdit } from "./../../../../components/ReportAddEdit";
import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import useEditorSlice from "../../../../store/useEditorSlice";

import { CITIES } from "../../../../lib/data/cities";

export async function getServerSideProps() {
  return {
    props: {
      cities: CITIES,
    },
  };
}
export default function ReportEdit({ cities }: { cities: typeof CITIES }) {
  const { query } = useRouter();
  const { report, project, setProject, setReport } = useEditorSlice();

  const reducer = (state: boolean, action: any) => {
    switch (action.type) {
      default:
        return !state;
    }
  };
  const [preview, togglePreview] = useReducer(reducer, false);

  useEffect(() => {
    if (!project && query.projectId) {
      axios.get(`/api/projects/${query.projectId}`).then(async (data) => {
        data?.data?.project && setProject(data?.data?.project);
      });
    }
    if (!report && query.reportId) {
      axios.get(`/api/reports/${query.reportId}`).then(async (data) => {
        // data?.data?.project && setProject(data?.data?.project);
        console.log("getting report from backend", data);
      });
    }
  }, [project, query.projectId, query.reportId, setProject, report, setReport]);

  return (
    <ReportAddEdit
      preview={preview}
      togglePreview={togglePreview}
      cities={cities}
    />
  );
}
