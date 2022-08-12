import React from "react";
import dynamic from "next/dynamic";

const PdfRenderComponent = dynamic(
  () => import("../../components/PdfRenderComponent"),
  { ssr: false }
);

const ContentFormComponent = dynamic(
  () => import("../../components/ContentForm"),
  { ssr: false }
);
import { CITIES } from "../../lib/data/cities";

export function ReportAddEdit({
  preview,
  togglePreview,
  cities,
  action,
}: {
  preview: boolean;
  togglePreview: (action: string) => void;
  cities: typeof CITIES;
  action: "ADD" | "EDIT";
}) {
  return (
    <div className="grid grid-cols-2 gap-3 h-screen w-full">
      <div className="col-span-1 h-screen w-full overflow-y-auto">
        <div className="flex w-full justify-center">
          <p>Disable Preview for better performance</p>
        </div>
        <div className="flex justify-center items-center py-1">
          <div className="form-check form-switch">
            <input
              value={preview ? 1 : 0}
              className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onChange={(e) => togglePreview("")}
            />
            <label
              className="px-1 form-check-label inline-block text-gray-800"
              htmlFor="flexSwitchCheckDefault"
            >
              {preview ? "Disable" : "Enable"} Preview
            </label>
          </div>
        </div>
        <ContentFormComponent cities={cities} action={action} />
      </div>

      <div className="col-span-1 h-full w-full">
        <div className="flex w-full h-screen">
          {preview ? (
            <PdfRenderComponent />
          ) : (
            <div className="flex h-full w-full justify-center items-center">
              <p>Preview disabled</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
