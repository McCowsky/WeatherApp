import { useQuery } from "react-query";
import {
  getWeather,
  getCityGeocodes,
  get5DaysWeather,
  getCurrentAirPollution,
} from "./services";
import { IWeather5days, IGeocodes, IWeather } from "./types/types";

export const useGetCityGeocodes = (city: string) => {
  return useQuery<IGeocodes, Error>(["cityGeocode", city], () => getCityGeocodes(city), {
    enabled: Boolean(city),
  });
};

export const useGet5DaysWeather = (lat: number, lon: number) => {
  return useQuery<IWeather5days, Error>("5dayWeather", () => {
    return get5DaysWeather(lat, lon);
  });
};

export const useGetWeather = (lat: number, lon: number) => {
  return useQuery<IWeather, Error>("weather", () => {
    return getWeather(lat, lon);
  });
};

export const useGetCurrentAirPollution = (lat: number, lon: number) => {
  return useQuery("currentPollution", () => {
    return getCurrentAirPollution(lat, lon);
  });
};
