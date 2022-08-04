import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Projects from "../components/Projects";
import { PROJECTS } from "../lib/data/PROJECTS";

export async function getStaticProps() {
  const projects = PROJECTS;

  return {
    props: {
      projects,
    },
  };
}

const Home = ({ projects }: { projects: typeof PROJECTS }) => {
  const { data: session } = useSession();

  return (
    <div className={"p-6"}>
      <Projects projects={projects} />
    </div>
  );
};

export default Home;
