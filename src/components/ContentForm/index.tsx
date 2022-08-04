import React from "react";
import useDataSlice from "../../store/useDataSlice";

import { Widget } from "@uploadcare/react-widget";

export default function ContentFormComponent() {
  const { setHeaderTitle, addImage } = useDataSlice();

  // const toBase64 = async (file: File) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       resolve(reader.result);
  //     };
  //     reader.onerror = (error) => reject(error);
  //   });

  // const getBase64 = async (file: File) => {
  //   const frontDoc = (await toBase64(file)) as string;
  //   return frontDoc;
  // };

  // const handleAddImage = async (file: File) => {
  //   const b64 = await getBase64(file);
  //   addImage(b64);
  //   console.log("After setting the state");
  // };

  // const handleFile = (e: ProgressEvent<FileReader>) => {
  //   const content = e?.target?.result;
  //   console.log("file content", typeof content, "xxx ", content);
  //   // You can set content in state and show it in render.
  //   // if (typeof content === "string") addImage(content);
  // };

  const handleChangeFile = (file: File) => {
    // let fileData = new FileReader();
    // fileData.onloadend = handleFile;
    // fileData.readAsText(file);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="p-6 bg-white">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700"
            >
              Project Name
            </label>
            <input
              type="text"
              name="first-name"
              id="first-name"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              onChange={(e) => setHeaderTitle(e.target.value)}
            />
          </div>
          <Widget
            publicKey="54fac5e9d2af1574492d"
            systemDialog
            imagesOnly
            clearable
            onChange={(fileInfo) => {
              console.log("onChange", fileInfo.cdnUrl);
              if (fileInfo.cdnUrl) addImage(fileInfo.cdnUrl);
            }}
            onFileSelect={(fileInfo) => {
              console.log("onFileSelect", fileInfo);
            }}
            onDialogOpen={(dialog) => {
              console.log("onDialogOpen", dialog);
            }}
            onDialogClose={(info) => {
              console.log("onDialogClose", info);
            }}
            onTabChange={(tabName) => {
              console.log("onTabChange", tabName);
            }}
          />
        </div>
        {/* <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div> */}
      </div>
    </div>
  );
}
