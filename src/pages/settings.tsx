import React from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Router from "next/router";
import AccessDenied from "../components/AccessDenied";
import useProfileSlice from "../store/useProfileSlice";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import axios from "axios";

export default function Setting() {
  const { status } = useSession();
  const { profile, setProfile } = useProfileSlice();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }

  const openWidget = () => {
    // create the widget
    if (profile) {
      const widget = window?.cloudinary?.createUploadWidget(
        {
          cloudName: "dlmkxe4ts",
          uploadPreset: "pdfgen",
          folder: `pdfgen/${profile?.name}/setting`,
          resourceType: "image",
          multiple: false,
        },
        (error: any, result: any) => {
          if (
            result.event === "success" &&
            result.info.resource_type === "image"
          ) {
            console.log(result.info);
            setProfile({ ...profile, image: result.info.secure_url });
          }
        }
      );
      widget.open(); // open up the widget after creation
    }
  };

  const formSubmit = async (actions: any) => {
    actions.setSubmitting(false);
    const res = await axios
      .put(
        `/api/profile/${profile?._id}/edit`,
        { name: profile?.name, image: profile?.image },
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
    <div className="w-full h-screen">
      <div className="flex w-full justify-end p-4">
        <button
          onClick={() => {
            signOut();
            Router.push("/auth");
          }}
          className="px-4 py-2 bg-indigo-500 outline-none rounded text-white shadow-indigo-200 shadow-lg font-medium active:shadow-none active:scale-95 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
        >
          <p className="cursor-pointer">Se deconnecter</p>
        </button>
      </div>
      <div className="flex w-full h-full">
        {profile && (
          <div className="md:m-20 w-full">
            <Formik
              initialValues={{}}
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
                          Entreprise
                        </label>
                        <input
                          value={profile.name}
                          onChange={(e) =>
                            setProfile({ ...profile, name: e.target.value })
                          }
                          placeholder="Nom"
                          required
                          className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        ></input>
                      </div>
                    )}
                  </Field>
                  <Field name="image">
                    {() => (
                      <div className="my-4">
                        <label htmlFor="image" className="text-sm px-2">
                          {"Logo de l'entreprise"}
                        </label>
                        <input
                          value={profile.image}
                          id="image"
                          name="image"
                          required
                          className="h-[0.5px] p-[0px] appearance-none rounded relative block w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        ></input>
                        <button
                          type="button"
                          id="image"
                          className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          onClick={openWidget}
                        >
                          Ajouter Photo
                        </button>
                      </div>
                    )}
                  </Field>
                  {profile.image !== "" && (
                    <Image src={profile.image} width={80} height={80} alt="" />
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
                    Enregistre les Parametres
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
}
