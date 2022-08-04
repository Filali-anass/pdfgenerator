import React from "react";

import { PROJECTS } from "../../lib/data/PROJECTS";

import Projects from "../../components/Projects";
import { IProject } from "../../model/Project";

export async function getServerSideProps(context: any) {
  const res = await fetch(`http://localhost:3000/api/projects`, {
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

  return { props: { projects: data.projects } };
}

export default function ProjectsPage({ projects }: { projects: IProject[] }) {
  return (
    <div className={"flex w-full p-6"}>
      <Projects projects={projects} />
    </div>
  );
}
