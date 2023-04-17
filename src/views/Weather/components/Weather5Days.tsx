import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { IWeather5days } from '../../../features/types/types';
const Weather5Days: React.FC<{ weather5days: IWeather5days }> = ({ weather5days }) => {
  const { width } = Dimensions.get('window');
  const tmpResult: { [key: string]: { max_temp: number; min_temp: number } } = {};
  const result: { dt_txt: string; max_temp: number; min_temp: number }[] = [];

  weather5days.list.forEach(item => {
    const date: string = item.dt_txt.slice(5, 10);

    const min: number = item.main.temp_min;
    const max: number = item.main.temp_max;
    if (!tmpResult[date]) {
      tmpResult[date] = {
        min_temp: min,
        max_temp: max,
      };
    } else {
      const prevMin: number = tmpResult[date].min_temp;
      const prevMax: number = tmpResult[date].max_temp;
      tmpResult[date] = {
        min_temp: min < prevMin ? min : prevMin,
        max_temp: max > prevMax ? max : prevMax,
      };
    }
  });

  for (const date in tmpResult) {
    result.push({
      dt_txt: date,
      min_temp: tmpResult[date].min_temp,
      max_temp: tmpResult[date].max_temp,
    });
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 25,
        marginHorizontal: 25,
        gap: 25,
      }}>
      {result.map(weather => {
        return (
          <View
            key={weather.dt_txt}
            style={{
              backgroundColor: '#48319D',
              minWidth: (width - 100) / 3,
              paddingVertical: 15,
              alignItems: 'center',
              gap: 20,
              borderRadius: 20,
              opacity: 0.75,
            }}>
            <Text style={{ fontSize: 25, color: 'white' }}>{weather.dt_txt}</Text>
            <View style={styles.tempContainer}>
              <Text style={{ fontSize: 25, color: 'white' }}>{Math.round(weather.max_temp)}</Text>
              <Text style={{ fontSize: 20, lineHeight: 25, color: 'white' }}>o</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Weather5Days;
const styles = StyleSheet.create({
  tempContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
});
