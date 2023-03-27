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
  IWeather5days,
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
  console.log(lat);

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
    refetch,
  }: UseQueryResult<IWeather, Error> = useGetWeather(lat, lon);

  const {
    data: weather5days,
    isSuccess: days5isSuccess,
    isLoading: days5isLoading,
    refetch: refetch5days,
  }: UseQueryResult<IWeather5days, Error> = useGet5DaysWeather(lat, lon);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (refetch && refetch5days) {
        refetch();
        refetch5days();
      }
    });

    return unsubscribe;
  }, [navigation]);

  if (isLoading || days5isLoading)
    return (
      <View>
        <Text>LOADING</Text>
      </View>
    );
  if (isSuccess && days5isSuccess) {
    navigation.navigate("Weather", { weather: weather, weather5days: weather5days });
  }

  return <View></View>;
};

export default FetchWeather;
