// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Profile, { IProfile } from "../../../model/Profile";
import { getSession } from "next-auth/react";
import User from "../../../model/User";

interface ResponseData {
  error?: string;
  msg?: string;
  profile?: IProfile;
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

    console.log(session);
    let profile = await Profile.findOne({
      userId: session.user._id || session?.token?.sub,
    });

    if (!profile) {
      const user = await User.findById(session.user._id || session?.token?.sub);
      if (!user) {
        return res.status(404).json({ error: "No User Found" });
      }
      profile = await Profile.create(
        new Profile({
          image: "",
          name: user.name,
          userId: session.user._id || session?.token?.sub,
        })
      );
    }

    res.status(200).json({ msg: "Profile Fetch Successfuly", profile });
  } else {
    res.status(401).json({ msg: "NOT Authorized" });
  }
}
