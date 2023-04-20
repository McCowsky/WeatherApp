import { ListItem } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';
import { StackNavigation } from '../../../features/types/types';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

const SearchItem = ({
  name,
  country,
  lat,
  lon,
  navigation,
}: {
  name: string;
  country: string;
  lat: number;
  lon: number;
  navigation: StackNavigation;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('FetchWeather', { lat: lat, lon: lon });
      }}>
      <LinearGradient
        colors={['#5936B4', '#362A84']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}>
        <ListItem
          containerStyle={{
            backgroundColor: 'transparent',
          }}>
          <ListItem.Content>
            <ListItem.Title style={{ fontSize: 22, color: 'white' }}>{name}</ListItem.Title>
            <ListItem.Subtitle style={{ fontSize: 16, color: 'white' }}>{country}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default SearchItem;
const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
