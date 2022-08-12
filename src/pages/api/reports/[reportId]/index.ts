// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import Report, { IReport } from "../../../../model/Report";
import { getSession } from "next-auth/react";
import { z } from "zod";

const schema = z.object({
  report: z.string().length(24),
});

interface ResponseData {
  error?: string | object;
  message?: string;
  report?: IReport;
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

  const validation = schema.safeParse(req.query);

  if (!validation.success) {
    return res.status(400).send({
      message: `Bad payload!`,
      error: validation.error,
    });
  }

  const session = await getSession({ req });
  if (session) {
    await dbConnect();

    const { reportId } = req.query;
    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({ error: "Report Not Found" });
    }

    res.status(200).json({ message: "Report Fetch Successfuly", report });
  } else {
    res.status(401).json({ message: "NOT Authorized" });
  }
}
