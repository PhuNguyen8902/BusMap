import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MapView from 'react-native-maps';
import GetLocation from 'react-native-get-location';

import {MapComponent} from '../components';

const iconSize = 50;
const iconFooterSize = 25;

export default function HomePage() {
  const navigation = useNavigation();
  // const [location, setLocation] = useState(null);

  // const requestLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Ứng dụng cần quyền truy cập vị trí của bạn',
  //         message:
  //           'Ứng dụng cần quyền truy cập vị trí của bạn ' +
  //           'để mang lại trải nghiệm tốt nhất cho bạn.',
  //         buttonNeutral: 'Hỏi tôi sau',
  //         buttonNegative: 'Hủy',
  //         buttonPositive: 'Đồng ý',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('Bạn đã cấp quyền truy cập vị trí');
  //     } else {
  //       console.log('Quyền truy cập vị trí bị từ chối');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };
  const handleLookupPress = () => {
    navigation.navigate('Lookup');
  };

  const handleHomePress = () => {
    navigation.navigate('Home');
  };
  const handleNavigatePress = () => {
    navigation.navigate('Navigate');
  };
  const handleSearchBusPress = () => {
    navigation.navigate('SearchBus');
  };
  const handleAccountPress = () => {
    navigation.navigate('Account');
  };

  const handleLookupStationPress = () => {
    navigation.navigate('LookupStation');
  };
  const handleLikesPress = () => {
    navigation.navigate('FooterLikes');
  };
  // useEffect(() => {
  //   requestLocationPermission().then(() => {
  //     GetLocation.getCurrentPosition({
  //       enableHighAccuracy: true,
  //       timeout: 60000,
  //     })
  //       .then(location => {
  //         setLocation(location);
  //       })
  //       .catch(error => {
  //         const {code, message} = error;
  //         console.warn(code, message);
  //       });
  //   });
  // }, []);
  return (
    <>
      <View style={[styles.container]}>
        <View style={[styles.box1]}>
          <View style={[styles.iconContainer]}>
            <TouchableOpacity onPress={handleLookupPress}>
              <View style={[styles.element]}>
                <Image
                  resizeMode="cover"
                  style={[styles.icon]}
                  source={require('../images/pikachu.jpg')}
                />
                <Text style={styles.textIcon}>Tra cứu tuyến</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNavigatePress}>
              <View style={[styles.element]}>
                <Image
                  resizeMode="cover"
                  style={[styles.icon]}
                  source={require('../images/pikachu.jpg')}
                />
                <Text style={styles.textIcon}>Tìm đường</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.iconContainer]}>
            <TouchableOpacity onPress={handleLookupStationPress}>
              <View style={[styles.element]}>
                <Image
                  resizeMode="cover"
                  style={[styles.icon]}
                  source={require('../images/pikachu.jpg')}
                />
                <Text style={styles.textIcon}>Tra cứu trạm</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSearchBusPress}>
              <View style={[styles.element]}>
                <Image
                  resizeMode="cover"
                  style={[styles.icon]}
                  source={require('../images/pikachu.jpg')}
                />
                <Text style={styles.textIcon}>Tìm kiếm xe</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.box2]}>
          {/* <Image
            resizeMode="cover"
            source={require('../images/map.jpg')}
            style={{width: '100%', height: '100%'}}
          /> */}
          {/* <MapView
            initialRegion={{
              latitude: location?.latitude,
              longitude: location?.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}></MapView> */}
          <MapComponent />
        </View>
        <View style={[styles.box3]}>
          <View style={[styles.elementFooter]}>
            <TouchableOpacity onPress={handleHomePress}>
              <Image
                resizeMode="cover"
                style={[styles.iconFooter]}
                source={require('../images/pikachu.jpg')}
              />
              <Text style={styles.textIconFooter}>Trang chủ</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.elementFooter]}>
            <Image
              resizeMode="cover"
              style={[styles.iconFooter]}
              source={require('../images/pikachu.jpg')}
            />
            <Text style={styles.textIconFooter}>Thông báo</Text>
          </View>
          <View style={[styles.elementFooter]}>
            <TouchableOpacity onPress={handleLikesPress}>
              <Image
                resizeMode="cover"
                style={[styles.iconFooter]}
                source={require('../images/pikachu.jpg')}
              />
              <Text style={styles.textIconFooter}>Yêu thích</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.elementFooter]}>
            <TouchableOpacity onPress={handleAccountPress}>
              <Image
                resizeMode="cover"
                style={[styles.iconFooter]}
                source={require('../images/pikachu.jpg')}
              />
              <Text style={styles.textIconFooter}>Tài khoản</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    display: 'flex',
    flex: 6,
  },
  box1: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  box2: {
    flex: 3,
  },
  box3: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    width: iconSize,
    height: iconSize,
    borderRadius: iconSize / 2,
    overflow: 'hidden',
  },
  textIcon: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  element: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconFooter: {
    width: iconFooterSize,
    height: iconFooterSize,
    borderRadius: iconFooterSize / 2,
    overflow: 'hidden',
  },
  textIconFooter: {
    marginTop: 3,
    fontSize: 10,
    fontWeight: 'bold',
  },
  elementFooter: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 7,
  },
  containerMap: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
});
