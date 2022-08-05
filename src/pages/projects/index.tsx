import React from "react";

import Projects from "../../components/ProjectsList";
import { IProject } from "../../model/Project";

export async function getServerSideProps(context: any) {
  const res = await fetch(`http://${context.req.headers.host}/api/projects`, {
    headers: {
      Cookie: `next-auth.session-token=${context.req.cookies["next-auth.session-token"]}`,
    },
  });
  const data = await res.json();

  return { props: { projects: data.projects } };
}

export default function ProjectsPage({ projects }: { projects: IProject[] }) {
  return (
    <div className={"flex w-full p-6"}>
      <Projects projects={projects} />
    </div>
  );
}
