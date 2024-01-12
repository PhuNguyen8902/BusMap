import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {tripService} from '../../service';

function formatTime(timeObject) {
  const hours = timeObject[0] < 10 ? `0${timeObject[0]}` : timeObject[0];
  const minutes = timeObject[1] < 10 ? `0${timeObject[1]}` : timeObject[1];

  return `${hours}:${minutes}`;
}

function isPast(timeObject) {
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  return (
    timeObject[0] < currentHours ||
    (timeObject[0] === currentHours && timeObject[1] <= currentMinutes)
  );
}

export default function HourlyChart({data}) {
  const [dataTime, setDataTime] = useState([]);

  const fetchData = async () => {
    const dTime = await tripService.getTripByRoute(data.id);
    setDataTime(dTime);
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  return (
    <FlatList
      style={styles.container}
      data={dataTime}
      keyExtractor={(item, index) => index.toString()}
      numColumns={4}
      renderItem={({item, index}) => (
        <View style={styles.itemContainer}>
          <View
            style={[
              styles.backgroudItemText,
              {
                backgroundColor: isPast(item.startTime)
                  ? 'lightgray'
                  : 'lightgreen',
              },
            ]}>
            <Text style={styles.itemText}>{formatTime(item.startTime)}</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  itemText: {
    fontSize: 16,
    lineHeight: 20,
  },
  backgroudItemText: {
    padding: 5,
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    flex: 1,
    justifyContent: 'center',
  },
});
