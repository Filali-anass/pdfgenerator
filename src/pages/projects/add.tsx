import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import Router from "next/router";
import { Widget } from "@uploadcare/react-widget";

export default function AddProject() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

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
              <Widget
                publicKey="54fac5e9d2af1574492d"
                systemDialog
                imagesOnly
                clearable
                onChange={(fileInfo) => {
                  console.log("onChange", fileInfo.cdnUrl);
                  if (fileInfo.cdnUrl) setImage(fileInfo.cdnUrl);
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
              {/* <Field name="email">
                {() => (
                  <div className="my-4">
                    <label htmlFor="email-address" className="text-sm px-2">
                      Email address
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      required
                      autoComplete="email"
                      className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    ></input>
                  </div>
                )}
              </Field>
              <Field name="password">
                {() => (
                  <div className="my-4">
                    <label htmlFor="password" className="text-sm px-2">
                      Password
                    </label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Password"
                      required
                      autoComplete="current-password"
                      className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    ></input>
                  </div>
                )}
              </Field> */}
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
