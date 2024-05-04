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
const iconFooterSize = 30;

export default function HomePage() {
  const navigation = useNavigation();

  const handleLookupPress = () => {
    navigation.navigate('Lookup');
  };

  const handleHomePress = () => {
    navigation.navigate('Home');
  };
  const handleNavigatePress = () => {
    navigation.navigate('Navigate');
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
                  source={require('../images/tuyen.png')}
                />
                <Text style={styles.textIcon}>Tra cứu tuyến</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNavigatePress}>
              <View style={[styles.element]}>
                <Image
                  resizeMode="cover"
                  style={[styles.icon]}
                  source={require('../images/timduong.jpg')}
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
                  source={require('../images/tram.jpg')}
                />
                <Text style={styles.textIcon}>Tra cứu trạm</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLikesPress}>
              <View style={[styles.element]}>
                <Image
                  resizeMode="cover"
                  style={[styles.icon]}
                  source={require('../images/tym.jpg')}
                />
                <Text style={styles.textIcon}>Yêu thích</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.box2]}>
          <MapComponent />
        </View>
        <View style={[styles.box3]}>
          <View style={[styles.elementFooter]}>
            <TouchableOpacity onPress={handleHomePress}>
              <Image
                resizeMode="cover"
                style={[styles.iconFooter]}
                source={require('../images/home.png')}
              />
              <Text style={styles.textIconFooter}>Trang chủ</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.elementFooter]}>
            <TouchableOpacity onPress={handleNavigatePress}>
              <Image
                resizeMode="cover"
                style={[styles.iconFooter]}
                source={require('../images/timduong.jpg')}
              />
              <Text style={styles.textIconFooter}>Tìm đường</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.elementFooter]}>
            <TouchableOpacity onPress={handleLikesPress}>
              <Image
                resizeMode="cover"
                style={[styles.iconFooter]}
                source={require('../images/tym.jpg')}
              />
              <Text style={styles.textIconFooter}>Yêu thích</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.elementFooter]}>
            <TouchableOpacity onPress={handleAccountPress}>
              <Image
                resizeMode="cover"
                style={[styles.iconFooter]}
                source={require('../images/account.png')}
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
    backgroundColor: 'lightgray',
  },
  box2: {
    flex: 3,
  },
  box3: {
    flex: 0.5,
    flexDirection: 'row',
    backgroundColor: 'lightgray',
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
    color: 'black',
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
    color: 'black',
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
