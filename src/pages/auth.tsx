import Image from "next/image";
import React, { useState } from "react";
import type { NextPage } from "next";
import {
  useSession,
  signIn,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import Router from "next/router";
import { BuiltInProviderType } from "next-auth/providers";
import loginPageImage from "../../public/assets/images/loginPageImage.png";
const Auth = ({
  providers,
}: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>) => {
  const [authType, setAuthType] = useState<"Login" | "Register">("Login");
  const oppAuthType: { [key: string]: "Login" | "Register" } = {
    Login: "Register",
    Register: "Login",
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ProvidersButtons = ({ providers }: any) => (
    //  Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
    <div className="flex-col">
      {Object.values(providers).map(
        (
          provider: any
          // ClientSafeProvider
        ) =>
          provider.name !== "Credentials" && (
            <button
              key={provider.name}
              onClick={() => {
                console.log(provider);
                signIn(provider.id, {
                  callbackUrl: provider.callbackUrl,
                });
              }}
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
              Sign in with {provider.name}
            </button>
          )
      )}
    </div>
  );

  const redirectToHome = () => {
    const { pathname } = Router;
    if (pathname === "/auth") {
      // TODO: redirect to a success register page
      Router.push("/");
    }
  };

  const registerUser = async () => {
    const res = await axios
      .post(
        "/api/register",
        { username, email, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(async () => {
        await loginUser();
        redirectToHome();
      })
      .catch((error: Error) => {
        console.log(error);
      });
    console.log(res);
  };

  const loginUser = async () => {
    const res: any = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: `${window.location.origin}`,
    });

    res.error ? console.log(res.error) : redirectToHome();
  };

  const formSubmit = (actions: any) => {
    actions.setSubmitting(false);

    console.log("SUBMITTING FORM");
    authType === "Login" ? loginUser() : registerUser();
  };

  return (
    <div className="flex w-full h-screen bg-white-400">
      <div className="flex w-full justify-center items-center h-screen">
        <div className="">
          <div>
            <Image
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
              width={50}
              height={50}
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {authType === "Register"
                ? "Create new Account"
                : "Sign in to your account"}
            </h2>
          </div>
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
                {authType === "Register" && (
                  <Field name="username">
                    {() => (
                      <div className="my-4">
                        <label htmlFor="username" className="text-sm px-2">
                          Username
                        </label>
                        <input
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Username"
                          // background={"blue.600"}
                          required
                          className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        ></input>
                      </div>
                    )}
                  </Field>
                )}
                <Field name="email">
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
                </Field>
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
                  {authType === "Register" ? "Register" : "Sign in"}
                </button>
              </div>
              <div>
                <p className="">
                  {authType === "Login"
                    ? "Not registered yet? "
                    : "Already have an account? "}
                  <button onClick={() => setAuthType(oppAuthType[authType])}>
                    <p>{oppAuthType[authType]}</p>
                  </button>
                </p>
              </div>
            </Form>
          </Formik>
          <div className="w-full justify-center items-center pt-8">
            <p className="text-center"> Or Continue with</p>
          </div>
          <ProvidersButtons providers={providers} />
        </div>
      </div>
      <div className="hidden md:flex md:w-full md:h-screen">
        <Image src={loginPageImage} alt="loginPageImage" />
      </div>
    </div>
  );
};

export default Auth;

export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders(),
    },
  };
}
