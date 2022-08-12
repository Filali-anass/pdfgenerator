// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Report, { IReport } from "../../../model/Report";
import { getSession } from "next-auth/react";

interface ResponseData {
  error?: string;
  msg?: string;
  reports?: IReport[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // validate if it is a GET
  if (req.method !== "GET") {
    return res
      .status(404)
      .json({ error: "This API call only accepts POST methods" });
  }

  const session = await getSession({ req });
  if (session) {
    await dbConnect();

    const reports = await Report.find({
      userId: session.user._id || session?.token?.sub,
      projectId: req.query.projectId,
    });

    if (!reports) {
      return res.status(404).json({ error: "No reports Found" });
    }

    res.status(200).json({ msg: "reports Fetch Successfuly", reports });
  } else {
    res.status(401).json({ msg: "NOT Authorized" });
  }
}
