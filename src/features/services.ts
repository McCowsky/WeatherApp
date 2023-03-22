import axios from "axios";
import { IGeocodes } from "./types/types";

export const getCityGeocodes = async (city: string) => {
  const res = await axios.get(
    `${process.env.GEOCODES_API_URL}/direct?q=${city}&limit=5&appid=${process.env.API_KEY}`
  );
  return res.data;
};

export const getZipCodeGeocodes = async (zipCode: number) => {
  const res = await axios.get(
    `${process.env.GEOCODES_API_URL}/zip?zip=${zipCode},{country code}&appid=${process.env.API_KEY}`
  );
  return res.data;
};

export const getWeather = async (lat: number, lon: number) => {
  const res = await axios.get(
    `${process.env.WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`
  );
  return res.data;
};

export const get5DaysWeather = async (lat: number, lon: number) => {
  const res = await axios.get(
    `${process.env.WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`
  );
  return res.data;
};

export const getCurrentAirPollution = async (lat: number, lon: number) => {
  const res = await axios.get(
    `${process.env.WEATHER_API_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`
  );
  return res.data;
};
