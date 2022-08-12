import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import AccessDenied from "../../components/AccessDenied";

import Projects from "../../components/ProjectsList";
import { IProject } from "../../model/Project";

export async function getServerSideProps(context: any) {
  console.log({ host: context.req.headers.host, cookies: context.req.cookies });
  const res = await fetch(`http://${context.req.headers.host}/api/projects`, {
    headers: {
      Cookie: Object.entries(context.req.cookies).reduce((acc, e, index) => {
        // key + "=" + value
        const [key, value] = e;
        if (index == 0) {
          return acc + key + "=" + value;
        } else {
          return acc + "; " + key + "=" + value;
        }
      }, ""),
    },
  });
  const data = await res.json();

  return { props: { projects: data?.projects ?? [] } };
}

export default function ProjectsPage({ projects }: { projects: IProject[] }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }

  return (
    <div className={"flex w-full p-6"}>
      <Projects projects={projects || []} />
    </div>
  );
}
