import { SentencesInput } from "./SentencesInput";
import React from "react";
import useEditorSlice, { DataType } from "../../store/useEditorSlice";
import { AiFillDelete } from "react-icons/ai";

export default function SectionInputs({
  index,
  section,
}: {
  index: number;
  section: DataType["report"]["sections"][number];
}) {
  const { editSection, deleteSection } = useEditorSlice();

  return (
    <div className="flex w-full">
      <div className="">
        <label className="block text-sm font-medium text-gray-700 w-10">
          #{index + 1}
        </label>
        <button
          onClick={() => {
            deleteSection(section.uid);
          }}
        >
          <AiFillDelete size={20} color={"#eb2c2c"} />
        </button>
      </div>
      <div className="w-full">
        <div className="w-full">
          <label
            htmlFor={`sectionTitle-${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            Titre
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
          </div>
          {section.sentences.map((sentence, indx) => (
            <div key={`${section.uid}-${Math.random()}`}>
              <SentencesInput
                index={index}
                indx={indx}
                sentence={sentence}
                section={section}
              />
            </div>
          ))}
          <div>
            <button
              className="appearance-none rounded relative block w-full px-3 py-2 my-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              onClick={() => {
                editSection(
                  { ...section, sentences: [...section.sentences, ""] },
                  section.uid
                );
              }}
            >
              Ajouter une Remarque
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
