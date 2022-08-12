import React from "react";
import useEditorSlice, { DataType } from "../../store/useEditorSlice";
import { AiFillDelete } from "react-icons/ai";

export function SentencesInput({
  index,
  indx,
  sentence,
  section,
}: {
  index: number;
  indx: number;
  sentence: DataType["report"]["sections"][number]["sentences"][number];
  section: DataType["report"]["sections"][number];
}) {
  const { editSection } = useEditorSlice();

  return (
    <div className="flex">
      <input
        type="text"
        name={`sentence-${index}-${indx}`}
        id={`sentence-${index}-${indx}`}
        defaultValue={sentence.value}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        onChange={(e) => {
          console.log(indx, index);
          editSection(
            {
              ...section,
              sentences: section.sentences.map((s, i) =>
                i === indx ? { ...s, value: e.target.value } : s
              ),
            },
            section.uid
          );
        }}
      />
      <button
        onClick={() => {
          editSection(
            {
              ...section,
              sentences: section.sentences.filter((s, i) => {
                return i !== indx;
              }),
            },
            section.uid
          );
        }}
        className="px-4"
      >
        <AiFillDelete size={20} color={"#eb2c2c"} />
      </button>
    </div>
  );
}
