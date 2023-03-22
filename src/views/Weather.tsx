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
const Weather: React.FC<{
  navigation: StackNavigation;
  weather: IWeather;
}> = ({ navigation, weather }) => {
  console.log(weather);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://i.imgur.com/B5sA1D8.png",
        }}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={{ color: "white", fontSize: 34 }}>{weather.name}</Text>
        <Text style={{ color: "white", fontSize: 96 }}>
          {`${Math.round(weather.main.temp)}o`}
        </Text>
        <Text style={{ color: "white", fontSize: 96, lineHeight: 37 }}>o</Text>
        <Text>{Math.round(weather.main.temp_max)}</Text>
        <Text>{weather.main.temp_min}</Text>
        <Text>{weather.main.feels_like}</Text>

        <Button
          title="Change location"
          onPress={() => {
            navigation.navigate("InitialSearch");
          }}
        />
      </ImageBackground>
    </View>
  );
};

export default Weather;
const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { flex: 1 },
});
