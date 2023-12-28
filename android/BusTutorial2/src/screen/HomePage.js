import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const iconSize = 50;
const iconFooterSize = 25;

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
  const handleSearchBusPress = () => {
    navigation.navigate('SearchBus');
  };
  const handleAccountPress = () => {
    navigation.navigate('Account');
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
                  source={require('../images/pikachu.jpg')}
                />
                <Text style={styles.textIcon}>Tra cứu</Text>
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
            <View style={[styles.element]}>
              <Image
                resizeMode="cover"
                style={[styles.icon]}
                source={require('../images/pikachu.jpg')}
              />
              <Text style={styles.textIcon}>Trạm xung quanh</Text>
            </View>
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
          <Image
            resizeMode="cover"
            source={require('../images/map.jpg')}
            style={{width: '100%', height: '100%'}}
          />
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
            <Image
              resizeMode="cover"
              style={[styles.iconFooter]}
              source={require('../images/pikachu.jpg')}
            />
            <Text style={styles.textIconFooter}>Yêu thích</Text>
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
});
