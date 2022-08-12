// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import Report, { IReport } from "../../../../model/Report";
import { getSession } from "next-auth/react";
import { z } from "zod";

interface ResponseData {
  error?: string | object;
  message?: string;
  report?: IReport;
}

const schema = z.object({
  report: z.object({
    projectId: z.string().length(24),
    // userId: "",
    date: z.string(),
    city: z.string(),
    subject: z.string(),
    sections: z.array(
      z.object({
        title: z.string(),
        sentences: z.array(z.string()),
      })
    ),
    pictures: z.array(z.string()),
  }),
  url: z.string().optional(),
  //   reportId: z.string().length(24),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "PUT") {
    return res
      .status(404)
      .json({ error: "This API call only accepts PUT methods" });
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

    const updated = await Report.updateOne(
      { _id: req.query.reportId },
      { ...req.body.report, userId: session.user._id || session?.token?.sub }
    );

    if (!updated) {
      return res.status(400).json({ error: "Error Updating Report" });
    }

    res.status(200).json({ message: "Report Updated Successfuly" });
  } else {
    res.status(401).json({ message: "NOT Authorized" });
  }
}
