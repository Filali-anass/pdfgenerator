import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import Router from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function AddProject() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const { data: session } = useSession();

  const formSubmit = async (actions: any) => {
    actions.setSubmitting(false);
    const res = await axios
      .post(
        "/api/projects/create",
        { name, description, image },
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
  };

  const openWidget = () => {
    // create the widget
    const widget = window?.cloudinary?.createUploadWidget(
      {
        cloudName: "dlmkxe4ts",
        uploadPreset: "pdfgen",
        folder: `pdfgen/${session?.user.name}`,
        resourceType: "image",
        multiple: false,
      },
      (error: any, result: any) => {
        if (
          result.event === "success" &&
          result.info.resource_type === "image"
        ) {
          console.log(result.info);
          setImage(result.info.secure_url);
        }
      }
    );
    widget.open(); // open up the widget after creation
  };

  return (
    <div className="w-full p-4">
      <h2>Add Project</h2>
      <div className="md:m-20">
        <Formik
          initialValues={{}} // { email: "", password: "" }
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(_, actions) => {
            formSubmit(actions);
          }}
        >
          <Form className="space-y-6">
            <div className="rounded-md">
              <Field name="name">
                {() => (
                  <div className="my-4">
                    <label htmlFor="name" className="text-sm px-2">
                      Project Name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Project Name"
                      required
                      className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    ></input>
                  </div>
                )}
              </Field>
              <Field name="name">
                {() => (
                  <div className="my-4">
                    <label htmlFor="name" className="text-sm px-2">
                      Project Description
                    </label>
                    <input
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Project Description"
                      className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    ></input>
                  </div>
                )}
              </Field>
              <Field name="name">
                {() => (
                  <div className="my-4">
                    <label htmlFor="files" className="text-sm px-2">
                      Project Image
                    </label>
                    <input
                      value={image}
                      id="files"
                      name="files"
                      required
                      className="h-[0.5px] p-[0px] appearance-none rounded relative block w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    ></input>
                    <button
                      type="button"
                      id="files"
                      className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      onClick={openWidget}
                    >
                      Upload Image
                    </button>
                  </div>
                )}
              </Field>
              {image !== "" && (
                <Image src={image} width={80} height={80} alt="" />
              )}
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Create
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
