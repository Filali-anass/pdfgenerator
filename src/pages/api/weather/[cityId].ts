// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Project, { IProject } from "../../../model/Project";
import { getSession } from "next-auth/react";
import axios from "axios";
import { CITIES } from "../../../lib/data/cities";
import Weather, { IWeather } from "../../../model/Weather";
import { format } from "date-fns";

interface ResponseData {
  error?: string;
  msg?: string;
  weather?: IWeather;
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

    let weather = await Weather.findOne({
      cityId: req.query.cityId,
      date: req.query.date,
    });

    if (!weather) {
      const city = CITIES.find((city) => `${city.id}` === req.query.cityId);
      if (city) {
        const weatherResp = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city?.lat}&lon=${city?.lng}&appid=1867031257943895e9c93efec73a91be&units=metric&lang=fr`
        );
        weather = await Weather.create(
          new Weather({
            ...weatherResp.data,
            weather: weatherResp.data.weather[0],
            cityId: city.id,
            cityName: city.name,
            date: format(new Date(), "dd-MM-yyyy"),
          })
        );
      }
    }

    res.status(200).json({ msg: "Projects Fetch Successfuly", weather });
  } else {
    res.status(401).json({ msg: "NOT Authorized" });
  }
}
