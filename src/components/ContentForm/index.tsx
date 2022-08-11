import React, { useEffect, useState } from "react";

import useEditorSlice, { DataType } from "../../store/useEditorSlice";
import { MyDocument } from "../PdfRenderComponent";
import { usePDF } from "@react-pdf/renderer";
import { useSession } from "next-auth/react";
import SectionInputs from "./SectionInputs";

// import { CloudinaryContext, Image as CloudinaryImage } from "cloudinary-react";
export default function ContentFormComponent() {
  const {
    project,
    report,
    setCity,
    setDate,
    setSubject,
    addSection,
    editSection,
  } = useEditorSlice();
  const { data: session } = useSession();
  const [instance, updatePdf] = usePDF({
    document: (
      <MyDocument
        project={project}
        session={session}
        report={report}
      ></MyDocument>
    ),
  });
  return (
    <div className="w-full h-screen justify-center p-4">
      <div className="flex w-full justify-end">
        <button className="px-4 py-2 bg-indigo-500 outline-none rounded text-white shadow-indigo-200 shadow-lg font-medium active:shadow-none active:scale-95 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
          <a
            href={instance.url ?? ""}
            download={`${project?.name}-${new Date().toISOString()}.pdf`}
          >
            <p className="cursor-pointer">Download</p>
          </a>
        </button>
      </div>
      <div className="w-full gap-4">
        <h5 className="my-2">City & Date:</h5>
        <div className="flex w-full gap-4">
          <div className=" w-full">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              defaultValue={report.city}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              type="text"
              name="date"
              id="date"
              defaultValue={report.date}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className=" w-full gap-4">
        <h5 className="my-2">Subject:</h5>

        <div className="flex items-center w-full">
          {/* <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
            Subject
          </label> */}
          <input
            type="text"
            name="subject"
            id="subject"
            defaultValue={report.subject}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
      </div>
      <div className=" w-full gap-4">
        <div className="flex">
          <h5 className="my-2">Sections:</h5>
          <button
            className=""
            onClick={() => {
              addSection({ title: "", sentences: [""] });
            }}
          >
            Add
          </button>
        </div>
        {report.sections.map((section, index) => (
          <div key={section.uid} className="py-2">
            <SectionInputs index={index} section={section} />
          </div>
        ))}
      </div>
      {/*  <a onClick={() => console.log(instance)}>LOG</a> */}
    </div>
  );
}
