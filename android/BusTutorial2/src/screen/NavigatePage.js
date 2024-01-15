import {StyleSheet, View, Text} from 'react-native';
import {Button, SearchBar} from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import {EachElementNavigate} from '../components';
import stationService from '../service/StationService';

export default function NavigatePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQuery2, setSearchQuery2] = useState('');
  const [flag3, setFlag3] = useState(0);

  const [numOfRoute, setnumOfRoute] = useState(1);
  const [data, setData] = useState([]);

  const onChangeSearch = query => setSearchQuery(query);
  const onChangeSearch2 = query => setSearchQuery2(query);

  const fetchData = async (
    latitude1,
    longitude1,
    latitude2,
    longitude2,
    num,
  ) => {
    if (num == 1) {
      setData([]);

      const d = await stationService.getRouteWithOneTripData(
        latitude1,
        longitude1,
        latitude2,
        longitude2,
      );
      setData(d);
      setFlag3(1);
    } else if (num == 2) {
      setData([]);

      const d = await stationService.getRouteWithTwoTripData(
        latitude1,
        longitude1,
        latitude2,
        longitude2,
      );
      setData(d);
      setFlag3(2);
    } else if (num == 3) {
      setData([]);

      const d = await stationService.getRouteWithThreeTripData(
        latitude1,
        longitude1,
        latitude2,
        longitude2,
      );

      setData(d);
      setFlag3(3);
    }
  };

  const fetchAddress = async (start, end, num) => {
    const response1 = await fetch(start);
    const addressInfo1 = await response1.json();
    const response2 = await fetch(end);
    const addressInfo2 = await response2.json();

    const latitude1 = addressInfo1[0].lat;
    const longitude1 = addressInfo1[0].lon;
    const latitude2 = addressInfo2[0].lat;
    const longitude2 = addressInfo2[0].lon;
    fetchData(latitude1, longitude1, latitude2, longitude2, num);
  };

  const address = num => {
    if (searchQuery != '' && searchQuery2 != '') {
      const startLocationApiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        searchQuery,
      )}&format=json`;
      const destinationLocationApiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        searchQuery2,
      )}&format=json`;
      fetchAddress(startLocationApiUrl, destinationLocationApiUrl, num);
    }
  };

  const search = num => {
    if (num == 1) {
      setFlag3(0);
      setnumOfRoute(1);
    } else if (num == 2) {
      setFlag3(0);

      setnumOfRoute(2);
    } else if (num == 3) {
      setFlag3(0);

      setnumOfRoute(3);
    } else if (num == undefined) {
      num = 1;
    }
    address(num);
  };

  return (
    <>
      <View style={{flex: 6}}>
        <View style={styles.box1}>
          <View style={{justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'column'}}>
              <SearchBar
                placeholder="Search..."
                containerStyle={{
                  height: 50,
                  padding: 0,
                }}
                onChangeText={onChangeSearch}
                value={searchQuery}
                clearIcon={null}
                searchIcon={null}
                lightTheme
                color={'black'}
              />
              <SearchBar
                placeholder="Search..."
                containerStyle={{
                  height: 50,
                  padding: 0,
                }}
                onChangeText={onChangeSearch2}
                value={searchQuery2}
                clearIcon={null}
                searchIcon={null}
                lightTheme
                color={'black'}
              />
            </View>
            <Button title={'Search'} onPress={() => search()}></Button>
          </View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 17,
              marginHorizontal: 150,
              marginTop: 20,
            }}>
            SỐ TUYẾN TỐI ĐA
          </Text>
          <View style={styles.buttonRoute}>
            <Button title={'1 Tuyến'} onPress={() => search(1)}></Button>
            <Button title={'2 Tuyến'} onPress={() => search(2)}></Button>
            <Button title={'3 Tuyến'} onPress={() => search(3)}></Button>
          </View>
        </View>
        <View style={styles.box2}>
          {flag3 == 1 || flag3 == 2 || flag3 == 3 ? (
            <EachElementNavigate num={numOfRoute} data={data} />
          ) : (
            <EachElementNavigate num={numOfRoute} data={[]} />
          )}
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  box1: {flex: 2.5},
  box2: {flex: 3.5, backgroundColor: 'lightgray'},
  buttonRoute: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
