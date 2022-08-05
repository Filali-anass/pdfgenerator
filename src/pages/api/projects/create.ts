// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Project, { IProject } from "../../../model/Project";
import { getSession } from "next-auth/react";

interface ResponseData {
  error?: string | object;
  message?: string;
  project?: IProject;
}

import { z } from "zod";

const schema = z.object({
  name: z.string(),
  image: z.string().optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res
      .status(404)
      .json({ error: "This API call only accepts POST methods" });
  }

  const validation = schema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).send({
      message: `Bad payload!`,
      error: validation.error,
    });
  }

  const session = await getSession({ req });
  if (session) {
    await dbConnect();
    console.log(session);
    const project = await Project.create(
      new Project({
        ...req.body,
        userId: session.user._id || session?.token?.sub,
      })
    );

    if (!project) {
      return res.status(404).json({ error: "No Project Found" });
    }

    res.status(200).json({ message: "Projects Fetch Successfuly", project });
  } else {
    res.status(401).json({ message: "NOT Authorized" });
  }
}
