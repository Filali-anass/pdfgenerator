import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/projects",
        permanent: false,
      },
    };
  }
}

const Home = () => <></>;

export default Home;
