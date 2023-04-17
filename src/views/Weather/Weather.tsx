import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { StackNavigation, WeatherParamList } from '../../features/types/types';
import { RouteProp } from '@react-navigation/native';
import Weather5Days from './components/Weather5Days';
import Navigation from './components/Navigation';

const Weather: React.FC<{
  navigation: StackNavigation;
  route: RouteProp<WeatherParamList>;
}> = ({ navigation, route }) => {
  const { weather, weather5days } = route.params;

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={{
          uri: 'https://i.imgur.com/B5sA1D8.png',
        }}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.container}>
          <Text style={{ color: 'white', fontSize: 34, paddingTop: 15 }}>{weather.name}</Text>
          <View style={styles.tempContainer}>
            <Text style={{ color: 'white', fontSize: 96 }}>{Math.round(weather.main.temp)}</Text>
            <Text style={{ color: 'white', fontSize: 50, lineHeight: 80 }}>o</Text>
          </View>

          <View style={styles.maxMinContainer}>
            <View style={styles.tempContainer}>
              <Text style={{ color: 'white', fontSize: 25 }}>{`H: ${Math.round(weather.main.temp_max)}`}</Text>
              <Text style={{ color: 'white', fontSize: 20, lineHeight: 25 }}>o</Text>
            </View>

            <View style={styles.tempContainer}>
              <Text style={{ color: 'white', fontSize: 25 }}>{`L: ${Math.round(weather.main.temp_min)}`}</Text>
              <Text style={{ color: 'white', fontSize: 20, lineHeight: 25 }}>o</Text>
            </View>
          </View>

          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
            }}
            style={{ width: 100, height: 100, marginTop: 20 }}
          />
          <Text style={{ color: 'white', fontSize: 18 }}>{weather.weather[0].description}</Text>
        </View>

        <Weather5Days weather5days={weather5days} />
        <Navigation navigation={navigation} weather={weather} />
      </ImageBackground>
    </View>
  );
};

export default Weather;
const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  container: { flex: 1, alignItems: 'center' },

  tempContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  maxMinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    gap: 20,
  },

  image: { flex: 1, alignItems: 'center' },
});
