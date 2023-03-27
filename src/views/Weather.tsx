import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ListRenderItem,
  BackHandler,
  ImageBackground,
} from "react-native";
import { IWeather, StackNavigation, WeatherParamList } from "../features/types/types";
import { Button } from "@rneui/themed";
import { RouteProp, useFocusEffect } from "@react-navigation/native";

const Weather: React.FC<{
  navigation: StackNavigation;
  route: RouteProp<WeatherParamList>;
}> = ({ navigation, route }) => {
  const { weather } = route.params;
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={{
          uri: "https://i.imgur.com/B5sA1D8.png",
        }}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.container}>
          <Text style={{ color: "white", fontSize: 34 }}>{weather.name}</Text>
          <View style={styles.tempContainer}>
            <Text style={{ color: "white", fontSize: 96 }}>
              {Math.round(weather.main.temp)}
            </Text>
            <Text style={{ color: "white", fontSize: 50, lineHeight: 80 }}>o</Text>
          </View>
          <Text style={{ color: "white", fontSize: 18 }}>
            {weather.weather[0].description}
          </Text>
          <View style={styles.tempContainer}>
            <Text style={{ color: "white", fontSize: 20 }}>{`H: ${Math.round(
              weather.main.temp_max
            )}`}</Text>
            <Text style={{ color: "white", fontSize: 20 }}>{`L: ${Math.round(
              weather.main.temp_min
            )}`}</Text>
          </View>
          <Text>{weather.main.feels_like}</Text>
        </View>

        <Button
          title="Change"
          onPress={() => {
            navigation.navigate("InitialSearch");
          }}
        />
        <Button
          title="refetch"
          onPress={() => {
            navigation.navigate("FetchWeather", {
              lat: weather.coord.lat,
              lon: weather.coord.lon,
            });
          }}
        />
      </ImageBackground>
    </View>
  );
};

export default Weather;
const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  container: { flex: 1, alignItems: "center" },

  tempContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },
  image: { flex: 1, alignItems: "center" },
});
