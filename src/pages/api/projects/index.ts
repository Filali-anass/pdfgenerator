// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Project, { IProject } from "../../../model/Project";
import { getSession } from "next-auth/react";

interface ResponseData {
  error?: string;
  msg?: string;
  projects?: IProject[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // validate if it is a GET
  if (req.method !== "GET") {
    return res
      .status(404)
      .json({ error: "This API call only accepts GET methods" });
  }

  const session = await getSession({ req });
  if (session) {
    await dbConnect();

    const projects = await Project.find({
      userId: session.user._id || session?.token?.sub,
    });

    if (!projects) {
      return res.status(404).json({ error: "No Project Found" });
    }

    res.status(200).json({ msg: "Projects Fetch Successfuly", projects });
  } else {
    res.status(401).json({ msg: "NOT Authorized" });
  }
}
