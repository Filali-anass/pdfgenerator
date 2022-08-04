import React, { useEffect, useState } from "react";
import ContentFormComponent from "../components/ContentForm";

// import PdfRenderComponent from "../components/PdfRenderComponent";
import useDataSlice from "../store/useDataSlice";
import dynamic from "next/dynamic";

const PdfRenderComponent = dynamic(
  () => import("../components/PdfRenderComponent"),
  { ssr: false }
);

export default function Pdf() {
  const { header, imgFile } = useDataSlice();
  //   const [clientSide, setClientSide] = useState(false);

  //   useEffect(() => {
  //     setClientSide(true);
  //   }, []);

  return (
    <div className="flex w-full h-screen">
      <div className="flex w-full h-screen">
        <ContentFormComponent />
      </div>
      <div className="flex w-full  h-full">
        <PdfRenderComponent sections={[]} header={header} imgFile={imgFile} />
      </div>
    </div>
  );
}
