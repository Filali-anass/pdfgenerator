import create from "zustand";
import produce from "immer";

export type DataType = {
  weather?: {
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    };
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
  };
};

type DataMutators = {
  setWeather: (weather: DataType["weather"]) => void;
};

const initialState: DataType = {
  weather: undefined,
};

const weatherStore: (set: any) => DataType & DataMutators = (set) => ({
  ...initialState,
  setWeather: (weather) => {
    set(
      produce((draft: DataType) => {
        draft.weather = weather;
      })
    );
  },
});

const useWeatherSlice = create(weatherStore);

export default useWeatherSlice;
