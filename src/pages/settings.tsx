import React from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Router from "next/router";
import AccessDenied from "../components/AccessDenied";

export default function Setting() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }

  return (
    <>
      <h1>Protected Page</h1>
      <p>You can view this page because you are signed in.</p>
      <button
        onClick={() => {
          signOut();
          Router.push("/");
        }}
      >
        Sign out
      </button>
    </>
  );
}
