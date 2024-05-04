import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {tripService, stationRouteService} from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

function formatTime(timeObject) {
  const hours = timeObject[0] < 10 ? `0${timeObject[0]}` : timeObject[0];
  const minutes = timeObject[1] < 10 ? `0${timeObject[1]}` : timeObject[1];

  return `${hours}:${minutes}`;
}

export default function Information({data}) {
  const [count, setCount] = useState(0);
  const [dataDirection, setDataDirection] = useState('');
  // console.log('hello');
  const fetchData = async () => {
    let domain = await AsyncStorage.getItem('domain');
    if (domain == null || domain == '') {
      AsyncStorage.removeItem('domain');
      navigation.navigate('Domain');
    }
    domain = 'http://' + domain;
    const d = await tripService.countTripByRouteId(data.id, domain);
    setCount(d);

    const dDirection = await stationRouteService.getStationRouteByRouteId(
      data.id,
      domain,
    );
    setDataDirection(dDirection);
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.itemTextName}>Tuyến số: </Text>
            <Text style={styles.itemText}>{data.routeNum}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.itemTextName}>Tên tuyến: </Text>
            <Text style={styles.itemText}>{data.name}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.itemTextName}>Độ dài tuyến: </Text>
            <Text style={styles.itemText}>{data.distance} km</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.itemTextName}>Thời gian chạy: </Text>
            <Text style={styles.itemText}>
              {' '}
              {formatTime(data.startTime)} - {formatTime(data.endTime)}
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.itemTextName}>Thời gian tuyến: </Text>
            <Text style={styles.itemText}>{data.duration} phút</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.itemTextName}>Giãn cách tuyến: </Text>
            <Text style={styles.itemText}>{data.tripSpacing} phút</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.itemTextName}>Số chuyến: </Text>
            <Text style={styles.itemText}>{count} chuyến</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.itemTextName}>Hướng đi: </Text>
            <Text style={styles.itemText}>
              {dataDirection !== '' && dataDirection.length > 0
                ? dataDirection.map((u, i) => (
                    <Text key={i}>
                      {u.stationId.name}
                      {i !== dataDirection.length - 1 && (
                        <Text style={styles.arrow}> → </Text>
                      )}
                    </Text>
                  ))
                : null}
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  listItem: {
    flexDirection: 'row',
    marginLeft: 20,
    // marginBottom: 5,
    width: 230,
    marginVertical: 10,
  },
  bullet: {
    // marginRight: 5,
    fontSize: 20,
    lineHeight: 20,
    color: 'green',
  },
  itemText: {
    fontSize: 16,
    lineHeight: 20,
    color: 'black',
  },
  itemTextName: {
    fontSize: 16,
    lineHeight: 20,
    color: 'black',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  arrow: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 20,
  },
});
