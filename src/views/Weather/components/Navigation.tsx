import { StyleSheet, View } from 'react-native';
import { IWeather, StackNavigation } from '../../../features/types/types';
import { Icon } from '@rneui/themed';

const Navigation: React.FC<{ navigation: StackNavigation; weather: IWeather }> = ({ navigation, weather }) => {
  return (
    <View style={styles.buttonContainer}>
      <Icon
        name="repeat"
        type="font-awesome"
        color="white"
        onPress={() => {
          navigation.navigate('FetchWeather', {
            lat: weather.coord.lat,
            lon: weather.coord.lon,
          });
        }}
      />

      <Icon
        containerStyle={{}}
        color="white"
        name="location-pin"
        onPress={() => {
          navigation.navigate('InitialSearch');
        }}
        size={40}
        type="material"
      />
    </View>
  );
};

export default Navigation;
const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 15,
  },
});
