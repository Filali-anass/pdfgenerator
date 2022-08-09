import { SentencesInput } from "./SentencesInput";
import React, { useEffect } from "react";

import { Widget } from "@uploadcare/react-widget";
import useEditorSlice, { DataType } from "../../store/useEditorSlice";
import { MyDocument } from "../PdfRenderComponent";
import { usePDF } from "@react-pdf/renderer";
import { useSession } from "next-auth/react";

export default function SectionInputs({
  index,
  section,
}: {
  index: number;
  section: DataType["report"]["sections"][number];
}) {
  const { editSection } = useEditorSlice();
  return (
    <div className="flex w-full">
      <label className="block text-sm font-medium text-gray-700 w-10">
        #{index + 1}
      </label>
      <div className="w-full">
        <div className="w-full">
          <label
            htmlFor={`sectionTitle-${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name={`sectionTitle-${index}`}
            id={`sectionTitle-${index}`}
            defaultValue={section.title}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={(e) =>
              editSection({ ...section, title: e.target.value }, section.uid)
            }
          />
        </div>
        <div className="w-full">
          <div className="flex">
            <label
              // htmlFor={`sectionTitle-${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              Remarques
            </label>
            <button
              className=""
              onClick={() => {
                editSection(
                  { ...section, sentences: [...section.sentences, ""] },
                  section.uid
                );
              }}
            >
              Add
            </button>
          </div>
          {section.sentences.map((sentence, indx) => (
            <div key={`${section.uid}-${indx}`}>
              <SentencesInput
                index={index}
                indx={indx}
                sentence={sentence}
                section={section}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
