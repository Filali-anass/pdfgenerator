import React from "react";

import { Widget } from "@uploadcare/react-widget";
import useEditorSlice from "../../store/useEditorSlice";
import { MyDocument } from "../PdfRenderComponent";
import { usePDF } from "@react-pdf/renderer";
import { useSession } from "next-auth/react";

export default function ContentFormComponent() {
  const { project, report } = useEditorSlice();
  const { data: session } = useSession();

  const [instance, updatePdf] = usePDF({
    document: <MyDocument project={project} session={session}></MyDocument>,
  });

  return (
    <div className="w-full h-screen justify-center p-4">
      {/* <p className="w-full">{JSON.stringify({ project, report })}</p> */}
      <a
        href={instance.url ?? ""}
        download={`${project?.name}-${new Date().toISOString()}.pdf`}
      >
        Download
      </a>
      <a onClick={() => console.log(instance)}>LOG</a>
    </div>
  );
}
