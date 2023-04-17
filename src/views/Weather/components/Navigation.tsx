import { StyleSheet, View } from 'react-native';
import { Button } from '@rneui/themed';

import { IWeather, StackNavigation } from '../../../features/types/types';

const Navigation: React.FC<{ navigation: StackNavigation; weather: IWeather }> = ({ navigation, weather }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        style={styles.button}
        title="Change"
        onPress={() => {
          navigation.navigate('InitialSearch');
        }}
      />
      <Button
        style={styles.button}
        title="refetch"
        onPress={() => {
          navigation.navigate('FetchWeather', {
            lat: weather.coord.lat,
            lon: weather.coord.lon,
          });
        }}
      />
    </View>
  );
};

export default Navigation;
const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'red',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'yellow',
    flexBasis: '50%',
  },
});
