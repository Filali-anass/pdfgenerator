import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

export interface IWeather extends Document {
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: { speed: number; deg: number };
  cityName: string;
  cityId: number;
  date: string;
}

const weatherSchema = new Schema<IWeather>(
  {
    cityName: {
      type: String,
      required: true,
    },
    cityId: {
      type: Number,
      required: true,
    },
    wind: {
      speed: {
        type: Number,
        required: true,
      },
      deg: {
        type: Number,
        required: true,
      },
    },
    main: {
      temp: {
        type: Number,
        required: true,
      },
      feels_like: {
        type: Number,
        required: true,
      },
      temp_min: {
        type: Number,
        required: true,
      },
      temp_max: {
        type: Number,
        required: true,
      },
      pressure: {
        type: Number,
        required: true,
      },
      humidity: {
        type: Number,
        required: true,
      },
    },
    weather: {
      id: {
        type: Number,
        required: true,
      },
      main: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
    },
    date: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Weather =
  mongoose.models.Weather || mongoose.model<IWeather>("Weather", weatherSchema);
export default Weather;
