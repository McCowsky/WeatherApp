import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { SearchBar } from "@rneui/themed";

import { UseQueryResult } from "react-query";
import { useGetCityGeocodes, useGetWeather } from "../../features/queries";
import { IGeocodes, StackNavigation } from "../../features/types/types";
import { useDebounce } from "../../hooks/useDebounce";
import { StatusBar } from "react-native";
import SearchItem from "./components/SearchItem";
import { LinearGradient } from "expo-linear-gradient";

const SearchLocation: React.FC<{ navigation: StackNavigation }> = ({ navigation }) => {
  const [city, setCity] = useState<string>("");
  const debouncedCity = useDebounce(city, 500);

  const { data: locations, refetch }: UseQueryResult<IGeocodes, Error> =
    useGetCityGeocodes(debouncedCity);

  const handleChange = (text: string) => {
    const spaceReplaced = text.split(" ").join("+");
    setCity(text);
  };

  const filteredLocations = locations?.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.name === value.name && t.country === value.country)
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#2E335A", "#1C1B33"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.linearGradient}
      >
        <View style={styles.subcontainer}>
          <SearchBar
            placeholder="Your city"
            value={city}
            onChangeText={handleChange}
            style={styles.search}
            containerStyle={{
              borderRadius: 15,
              margin: 20,
            }}
            inputStyle={{ borderRadius: 15 }}
          />
        </View>

        <View style={styles.subcontainer}>
          {filteredLocations?.map((location) => {
            return (
              <SearchItem
                key={location.lat}
                name={location.name}
                country={location.country}
                lat={location.lat}
                lon={location.lon}
                navigation={navigation}
              ></SearchItem>
            );
          })}
        </View>
      </LinearGradient>
      <StatusBar />
    </View>
  );
};

export default SearchLocation;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#666",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  linearGradient: {
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 5,
    height: "100%",
    width: "100%",
  },
  subcontainer: {
    flexBasis: "auto",
    backgroundColor: "transparent",
    width: "100%",
  },
  search: {
    width: "100%",
    flexBasis: "auto",
    backgroundColor: "rgba(52, 52, 52, 1)",
  },
});
