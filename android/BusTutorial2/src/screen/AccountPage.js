import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

const iconSize = 100;

export default function AccountPage() {
  const navigation = useNavigation();

  const [data, setData] = useState('');

  const readData = async () => {
    const value = await AsyncStorage.getItem('auth');
    if (value != null) {
      const storedData = JSON.parse(value);
      setData(storedData);
    }
  };
  useEffect(() => {
    readData();
  }, []);
  //   console.log(data.name);

  const ExitDomain = () => {
    AsyncStorage.removeItem('domain');
    navigation.navigate('Domain');
  };
  const Login = () => {
    navigation.navigate('Login');
  };
  const SignOut = () => {
    AsyncStorage.removeItem('auth');

    navigation.navigate('Login');
  };
  return (
    <>
      {data != '' ? (
        <View style={styles.container}>
          <Image
            resizeMode="cover"
            style={[styles.icon]}
            source={require('../images/bustutorial.png')}
          />
          <View style={styles.row}>
            <Text style={styles.font}>Tên</Text>
            <Text style={styles.font}>{data.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.font}>Email</Text>
            <Text style={styles.font}>{data.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.font}>Số điện thoại</Text>
            <Text style={styles.font}>{data.phone}</Text>
          </View>
          <View>
            <Button
              title={'Đăng xuất'}
              containerStyle={{
                width: 200,
                marginTop: 20,
                borderRadius: 50,
                marginHorizontal: 60,
              }}
              buttonStyle={{
                backgroundColor: 'lightgreen',
                borderRadius: 10,
              }}
              onPress={SignOut}></Button>
            <Button
              title={'Thoát Domain'}
              containerStyle={{
                width: 200,
                marginTop: 20,
                borderRadius: 50,
                marginHorizontal: 60,
              }}
              buttonStyle={{
                backgroundColor: 'lightgreen',
                borderRadius: 10,
              }}
              onPress={ExitDomain}></Button>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.container}>
            <Image
              resizeMode="cover"
              style={[styles.icon]}
              source={require('../images/bus.png')}
            />
            <Button
              title={'Đăng nhập'}
              containerStyle={{
                width: 200,
                marginTop: 20,
                borderRadius: 50,
                marginHorizontal: 60,
              }}
              buttonStyle={{
                backgroundColor: 'lightgreen',
                borderRadius: 10,
              }}
              onPress={Login}></Button>

            <Button
              title={'Thoát Domain'}
              containerStyle={{
                width: 200,
                marginTop: 20,
                borderRadius: 50,
                marginHorizontal: 60,
              }}
              buttonStyle={{
                backgroundColor: 'lightgreen',
                borderRadius: 10,
              }}
              onPress={ExitDomain}></Button>
          </View>
        </>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  icon: {
    width: iconSize,
    height: iconSize,
    borderRadius: iconSize / 2,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    width: 300,
  },
  font: {
    fontSize: 20,
    color: 'black',
  },
});
