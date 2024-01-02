import {ScrollView, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {stationRouteService} from '../../service';

export default function StationStop({data}) {
  const [dataStation, setDataStation] = useState('');

  const fetchData = async () => {
    const dStation = await stationRouteService.getStationRouteByRouteId(
      data.id,
    );
    setDataStation(dStation);
  };

  useEffect(() => {
    fetchData();
  }, [data]);
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.listItem}>
            {dataStation !== ''
              ? dataStation.map((u, i) => (
                  <View key={i} style={styles.itemContainer}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.itemText}> {u.stationId.name}</Text>
                  </View>
                ))
              : null}
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
    flexDirection: 'column',
    marginLeft: 20,
    width: 230,
    marginVertical: 10,
  },
  bullet: {
    fontSize: 20,
    lineHeight: 20,
    color: 'green',
  },
  itemText: {
    fontSize: 16,
    lineHeight: 20,
  },
  itemTextName: {
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  arrow: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});
