import {StyleSheet, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import {Button, SearchBar} from 'react-native-elements';
import React, {useState} from 'react';
import {EachElementNavigate} from '../components';
import stationService from '../service/StationService';

export default function NavigatePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQuery2, setSearchQuery2] = useState('');
  const [flag3, setFlag3] = useState(0);
  const [now1, setNow1] = useState(false);
  const [now2, setNow2] = useState(false);
  const [latNow, setlatNow] = useState([]);

  const [numOfRoute, setnumOfRoute] = useState(1);
  const [data, setData] = useState([]);

  const onChangeSearch = query => setSearchQuery(query);
  const onChangeSearch2 = query => setSearchQuery2(query);
  const onChangeNow = query => setNow1(query);
  const onChangeNow2 = query => setNow2(query);

  const fetchData = async (
    latitude1,
    longitude1,
    latitude2,
    longitude2,
    num,
  ) => {
    let domain = await AsyncStorage.getItem('domain');
    if (domain == null || domain == '') {
      AsyncStorage.removeItem('domain');
      navigation.navigate('Domain');
    }
    domain = 'http://' + domain;

    if (num == 1) {
      setData([]);
      const d = await stationService.getRouteWithOneTripData(
        latitude1,
        longitude1,
        latitude2,
        longitude2,
        domain,
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
        domain,
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
        domain,
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

    if (now1 == true) {
      const latitude2 = addressInfo2[0].lat;
      const longitude2 = addressInfo2[0].lon;
      fetchData(latNow[0], latNow[1], latitude2, longitude2, num);
    } else if (now2 == true) {
      const latitude1 = addressInfo1[0].lat;
      const longitude1 = addressInfo1[0].lon;
      fetchData(latitude1, longitude1, latNow[0], latNow[1], num);
    } else {
      const latitude1 = addressInfo1[0].lat;
      const longitude1 = addressInfo1[0].lon;
      const latitude2 = addressInfo2[0].lat;
      const longitude2 = addressInfo2[0].lon;
      fetchData(latitude1, longitude1, latitude2, longitude2, num);
    }
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

  const getCurrentLocation = number => {
    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        setlatNow([latitude, longitude]);
      },
      error => {
        console.error(error);
      },
    );
    if (number == 1) {
      if (now1 == false) {
        onChangeNow(true);
        onChangeSearch('Vị trí hiện tại');
      } else {
        onChangeNow(false);
        onChangeSearch('');
      }
    } else {
      if (now2 == false) {
        onChangeSearch2('Vị trí hiện tại');
        onChangeNow2(true);
      } else {
        onChangeNow2(false);
        onChangeSearch2('');
      }
    }
  };
  return (
    <>
      <View style={{flex: 6}}>
        <View style={styles.box1}>
          <View style={{justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row'}}>
                <SearchBar
                  placeholder="Điểm bắt đầu..."
                  containerStyle={{
                    height: 40,
                    padding: 0,
                    flex: 1,
                  }}
                  onChangeText={onChangeSearch}
                  value={searchQuery}
                  clearIcon={null}
                  searchIcon={null}
                  lightTheme
                  color={'black'}
                  editable={!now1}
                />
                <Button
                  title={'Vị trí hiện tại'}
                  disabled={now2}
                  onPress={() => getCurrentLocation(1)}></Button>
              </View>
              <View style={{flexDirection: 'row'}}>
                <SearchBar
                  placeholder="Điểm kết thúc..."
                  containerStyle={{
                    height: 40,
                    padding: 0,
                    flex: 1,
                  }}
                  onChangeText={onChangeSearch2}
                  value={searchQuery2}
                  clearIcon={null}
                  searchIcon={null}
                  lightTheme
                  color={'black'}
                  editable={!now2}
                />
                <Button
                  title={'Vị trí hiện tại'}
                  disabled={now1}
                  onPress={() => getCurrentLocation(2)}></Button>
              </View>
            </View>
            <Button title={'Tìm kiếm'} onPress={() => search()}></Button>
          </View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 17,
              marginHorizontal: 120,
              marginTop: 20,
              color: 'black',
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
  box1: {flex: 2},
  box2: {flex: 4, backgroundColor: 'lightgray'},
  buttonRoute: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
