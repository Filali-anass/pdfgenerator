import { useState } from "react";
import type { NextPage } from "next";
import { useSession, signIn, getProviders } from "next-auth/react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import Router from "next/router";

const Background = ({ children }: any) => (
  <div className="flex justify-center items-center w-full h-screen">
    {children}
  </div>
);

interface IDivicerProps {
  word?: string;
}

const Divider = ({ word }: IDivicerProps) => {
  return (
    <>
      <div>Divider</div>
    </>
  );
};

const Auth: NextPage = ({ providers }: any) => {
  const { data: session } = useSession();
  const [authType, setAuthType] = useState("Login");
  const oppAuthType: { [key: string]: string } = {
    Login: "Register",
    Register: "Login",
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ProvidersButtons = ({ providers }: any) => (
    <div className="flex-col">
      {Object.values(providers).map(
        (provider: any) =>
          provider.name !== "Credentials" && (
            <button
              key={provider.name}
              type="submit"
              onClick={() => {
                console.log(provider);
                signIn(provider.id, {
                  callbackUrl: `https://pdfgenerator-opal.vercel.app/api/auth/callback/google`,
                });
              }}
            >
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

    authType === "Login" ? loginUser() : registerUser();
  };

  return (
    <Background>
      <div className="p-6 w-[420px] rounded">
        <div className="flex-col justify-center items-center">
          <h2>{authType}</h2>
          <p className="">
            {authType === "Login"
              ? "Not registered yet? "
              : "Already have an account? "}
            <button onClick={() => setAuthType(oppAuthType[authType])}>
              <p>{oppAuthType[authType]}</p>
            </button>
          </p>

          <Divider />

          <ProvidersButtons providers={providers} />

          <Divider word="Or" />

          <Formik
            initialValues={{}} // { email: "", password: "" }
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(_, actions) => {
              formSubmit(actions);
            }}
          >
            {(props) => (
              <Form style={{ width: "100%" }}>
                <div className="flex-col w-full m-4 ">
                  {authType === "Register" && (
                    <Field name="username">
                      {() => (
                        <>
                          <label htmlFor="username">Username:</label>
                          <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            // background={"blue.600"}
                            required
                          />
                        </>
                      )}
                    </Field>
                  )}
                  <Field name="email">
                    {() => (
                      <>
                        <label htmlFor="email">Email:</label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address"
                          required
                        />
                      </>
                    )}
                  </Field>
                  <Field name="password">
                    {() => (
                      <>
                        <label htmlFor="password">Password</label>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          placeholder="Password"
                          required
                        />
                      </>
                    )}
                  </Field>
                  <button
                    className="bg-blue-400 hover:bg-blue-200 m-6"
                    // isLoading={props.isSubmitting}
                    type="submit"
                  >
                    {authType}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Background>
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
