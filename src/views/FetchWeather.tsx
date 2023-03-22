import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ListRenderItem,
  BackHandler,
  Alert,
} from "react-native";
import {
  FetchWeatherParamList,
  IWeather,
  StackNavigation,
} from "../features/types/types";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { UseQueryResult } from "react-query";
import { useGet5DaysWeather, useGetWeather } from "../features/queries";
import { useCallback, useEffect } from "react";
import Weather from "./Weather";

const FetchWeather: React.FC<{
  navigation: StackNavigation;
  route: RouteProp<FetchWeatherParamList>;
}> = ({ navigation, route }) => {
  const { lat, lon } = route.params;

  useEffect(
    useCallback(() => {
      const onBackPress = () => {
        //  navigation.navigate("InitialSearch");
        Alert.alert("Hold on!", "Are you sure you want to exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const {
    data: weather,
    isSuccess,
    isLoading,
  }: UseQueryResult<IWeather, Error> = useGetWeather(lat, lon);

  const {
    data: days5,
    isSuccess: days5isSuccess,
    isLoading: days5isLoading,
  }: UseQueryResult = useGet5DaysWeather(lat, lon);
  console.log(days5);

  if (isLoading || days5isLoading)
    return (
      <View>
        <Text>LOADING</Text>
      </View>
    );
  if (isSuccess && days5isSuccess) {
    return <Weather navigation={navigation} weather={weather} />;
  }

  return <View></View>;
};

export default FetchWeather;
