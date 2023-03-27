import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type IGeocode = {
  name: string;
  local_names?: {};
  lat: number;
  lon: number;
  country: string;
  state: string;
};

export type IWeather = {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: { lat: number; lon: number };
  dt: number;
  id: number;
  main: { [key: string]: number };
  name: string;
  sys: { [key: string]: unknown };
  timezone: number;
  visibility: number;
  weather: { description: string; icon: string; id: number; main: string }[];
  wind: {};
};

export type IWeather5days = {
  city: { [key: string]: unknown };
  cnt: number;
  cod: string;
  list: { [key: string]: unknown }[];
};

export type IGeocodes = IGeocode[];

export type FetchWeatherParamList = {
  FetchWeather: { lat: number; lon: number };
};

export type WeatherParamList = {
  Weather: { weather: IWeather; weather5days: IWeather5days };
};

export type InitialSearchParamList = {
  InitialSearch: undefined;
};

export type StackParamList = InitialSearchParamList &
  FetchWeatherParamList &
  WeatherParamList;

export type StackNavigation = NativeStackNavigationProp<StackParamList>;
