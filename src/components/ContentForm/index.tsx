import React, { useEffect, useState } from "react";

import useEditorSlice, { DataType } from "../../store/useEditorSlice";
import { MyDocument } from "../PdfRenderComponent";
import { usePDF } from "@react-pdf/renderer";
import { useSession } from "next-auth/react";
import SectionInputs from "./SectionInputs";
import { CITIES } from "../../lib/data/cities";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";

// import { CloudinaryContext, Image as CloudinaryImage } from "cloudinary-react";
export default function ContentFormComponent({
  cities,
  action,
  preview,
}: {
  cities: typeof CITIES;
  action: "ADD" | "EDIT";
  preview: boolean;
}) {
  const { query } = useRouter();

  const {
    project,
    report,
    setCity,
    setDate,
    setSubject,
    addSection,
    addPictures,
    deletePicture,
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

  const openWidget = () => {
    // create the widget
    const widget = window?.cloudinary?.createUploadWidget(
      {
        cloudName: "dlmkxe4ts",
        uploadPreset: "pdfgen",
        folder: `pdfgen/${session?.user.name}`,
        resourceType: "image",
        multiple: true,
      },
      (error: any, result: any) => {
        if (
          result.event === "success" &&
          result.info.resource_type === "image"
        ) {
          console.log(result.info);
          addPictures([result.info.secure_url]);
        }
      }
    );
    widget.open(); // open up the widget after creation
  };

  const formValidation = () => {
    if (report.subject === "") {
      alert("Renseinger le Sujet");
      return false;
    }

    if (report.date === "") {
      alert("Renseinger la Date");
      return false;
    }

    if (report.city === "") {
      alert("Renseinger la ville");
      return false;
    }

    return true;
  };
  const handleSveReport = async () => {
    if (!formValidation()) {
      return;
    }
    if (action === "ADD") {
      const res = await axios
        .post(
          "/api/reports/create",
          {
            report: {
              projectId: report.projectId,
              // userId: "",
              date: report.date,
              city: report.city,
              subject: report.subject,
              sections: report.sections.map((s) => ({
                title: s.title,
                sentences: s.sentences,
              })),
              pictures: report.pictures,
            },
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then(async () => {
          Router.push("/projects");
        })
        .catch((error: Error) => {
          console.log(error);
        });
    } else {
      // /api/reports/62f547bfec71a54cd961987a/edit
      const res = await axios
        .put(
          `/api/reports/${query.reportId}/edit`,
          {
            report: {
              projectId: report.projectId,
              // userId: "",
              date: report.date,
              city: report.city,
              subject: report.subject,
              sections: report.sections.map((s) => ({
                title: s.title,
                sentences: s.sentences,
              })),
              pictures: report.pictures,
            },
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then(async () => {
          Router.push("/projects");
        })
        .catch((error: Error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="w-full h-screen justify-center p-4">
      {/* <div className="flex w-full justify-end">
        <button className="px-4 py-2 bg-indigo-500 outline-none rounded text-white shadow-indigo-200 shadow-lg font-medium active:shadow-none active:scale-95 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
          <a
            href={instance.url ?? ""}
            download={`${project?.name}-${new Date().toISOString()}.pdf`}
          >
            <p className="cursor-pointer">Download</p>
          </a>
        </button>
      </div> */}
      <div className="w-full gap-4">
        <h5 className="my-2">Ville & Date:</h5>
        <div className="flex w-full gap-4">
          <div className="w-full">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              Ville
            </label>
            <select
              id="city"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-[10px]"
              onChange={(e) => setCity(e.target.value)}
            >
              <option value={""}></option>
              {(cities || []).map((city) => {
                return (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-full">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              name="date"
              id="date"
              type="date"
              defaultValue={report.date}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className=" w-full gap-4">
        <h5 className="my-2">Sujet:</h5>

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
        </div>
        {report.sections.map((section, index) => (
          <div key={section.uid || section._id} className="py-2">
            <SectionInputs index={index} section={section} />
          </div>
        ))}
        <div>
          <button
            className="appearance-none rounded relative block w-full px-3 py-2 my-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            onClick={() => {
              addSection({ title: "", sentences: [""] });
            }}
          >
            Ajouter une Section
          </button>
        </div>
      </div>
      <div className=" w-full gap-4">
        <div className="flex">
          <h5 className="my-2">Photos:</h5>
        </div>
        <button
          type="button"
          id="files"
          className="appearance-none rounded relative block w-full px-3 py-2 my-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          onClick={openWidget}
        >
          Ajouter des photos
        </button>
        <div className="flex p-4">
          {report.pictures.map((p) => (
            <div key={p} className="mx-3">
              <Image src={p} alt="" width={70} height={70} />
              <button
                onClick={() => {
                  deletePicture(p);
                }}
              >
                <AiFillDelete size={20} color={"#eb2c2c"} />
              </button>
            </div>
          ))}
        </div>
      </div>
      {preview && (
        <div className="flex w-full justify-end">
          <button
            onClick={handleSveReport}
            className="px-4 py-2 bg-indigo-500 outline-none rounded text-white shadow-indigo-200 shadow-lg font-medium active:shadow-none active:scale-95 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
          >
            <p className="cursor-pointer">Enregistrer le Rapport</p>
          </button>
        </div>
      )}
      {/*  <a onClick={() => console.log(instance)}>LOG</a> */}
    </div>
  );
}
