import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';

const iconSize = 100;

export default function AccountPage() {
  const [data, setData] = useState('');

  const readData = async () => {
    const value = await AsyncStorage.getItem('auth');
    const storedData = JSON.parse(value);
    setData(storedData);
  };
  useEffect(() => {
    readData();
  }, []);
  //   console.log(data.name);
  return (
    <>
      <View style={styles.container}>
        <Image
          resizeMode="cover"
          style={[styles.icon]}
          source={require('../images/pikachu.jpg')}
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
      </View>
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
  },
});
