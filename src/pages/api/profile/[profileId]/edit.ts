// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import Profile, { IProfile } from "../../../../model/Profile";
import { getSession } from "next-auth/react";
import User from "../../../../model/User";
import { z } from "zod";

interface ResponseData {
  error?: any;
  msg?: string;
  profile?: IProfile;
}

const schema = z.object({
  name: z.string(),
  image: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // validate if it is a GET
  if (req.method !== "PUT") {
    return res
      .status(404)
      .json({ error: "This API call only accepts POST methods" });
  }

  const validation = schema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).send({
      msg: `Bad payload!`,
      error: validation.error,
    });
  }

  const session = await getSession({ req });
  if (session) {
    await dbConnect();

    let updated = await Profile.updateOne(
      {
        _id: req.query.profileId,
      },
      req.body
    );

    res.status(200).json({ msg: "Profile Updated Successfuly" });
  } else {
    res.status(401).json({ msg: "NOT Authorized" });
  }
}
