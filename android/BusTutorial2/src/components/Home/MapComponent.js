import React, {useEffect, useState} from 'react';
import {View, Text, PermissionsAndroid, Alert, StyleSheet} from 'react-native';
import GetLocation from 'react-native-get-location';
import MapView from 'react-native-maps';

const MapComponent = () => {
  const [location, setLocation] = useState(null);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Ứng dụng cần quyền truy cập vị trí của bạn',
          message:
            'Ứng dụng cần quyền truy cập vị trí của bạn ' +
            'để mang lại trải nghiệm tốt nhất cho bạn.',
          buttonNeutral: 'Hỏi tôi sau',
          buttonNegative: 'Hủy',
          buttonPositive: 'Đồng ý',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Bạn đã cấp quyền truy cập vị trí');
      } else {
        console.log('Quyền truy cập vị trí bị từ chối');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestLocationPermission().then(() => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      })
        .then(location => {
          setLocation(location);
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        });
    });
  }, []);
  // console.log(location.latitude);
  // console.log(location.longitude);
  return (
    <>
      {location &&
        (console.log(location),
        (
          <MapView
            style={styles.containerMap}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}></MapView>
        ))}
    </>
  );
};
const styles = StyleSheet.create({
  containerMap: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
});

export default MapComponent;
