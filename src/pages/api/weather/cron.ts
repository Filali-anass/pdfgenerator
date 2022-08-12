import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import axios from "axios";
import { CITIES } from "../../../lib/data/cities";
import Weather from "../../../model/Weather";
import { format } from "date-fns";

interface ResponseData {
  error?: string;
  msg?: string;
  weather?: any;
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
  const watherAppId = req.query.appid;
  if (watherAppId != "1867031257943895e9c93efec73a91be") {
    return res.status(401).json({ msg: "NOT Authorized" });
  }

  await dbConnect();

  CITIES.slice(0, 10).forEach(async (city) => {
    try {
      const weatherResp = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lng}&appid=${watherAppId}&units=metric`
      );
      await Weather.create(
        new Weather({
          ...weatherResp.data,
          weather: weatherResp.data.weather[0],
          cityId: city.id,
          cityName: city.name,
          date: format(new Date(), "dd-MM-yyyy"),
        })
      );
    } catch (e) {}
  });

  res.status(200).json({ msg: "Cron Executed" });
}
