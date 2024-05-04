import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {TextInput, Text, StyleSheet, Image, View} from 'react-native';
import {Button} from 'react-native-elements';
import {setIP} from '../common/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthService} from '../service';

const iconSize = 200;

export default function DomainPage() {
  const [domain, setDomain] = useState('');

  const [result, setResult] = useState(null);
  const navigation = useNavigation();

  const checkDomain = async () => {
    try {
      const api = `http://${domain}`;
      const response = await AuthService.domain(api);

      if (response.message != '') {
        await AsyncStorage.setItem('domain', domain);

        setIP(`http://${domain}`);
        navigation.navigate('Home');
      } else {
        setResult('Lỗi kết nối đến domain.');
      }
    } catch (error) {
      setResult('Lỗi kết nối đến domain.');
    }
  };

  const checkLocalDomain = async () => {
    const d = await AsyncStorage.getItem('domain');
    setDomain(d);
    if (d != null) {
      try {
        const response = await fetch(`http://${d}`);
        if (response.status == 200) {
          setIP(`http://${d}`);
          navigation.navigate('Home');
        } else {
          AsyncStorage.removeItem('domain');
          setResult('Lỗi kết nối đến domain.');
        }
      } catch (error) {
        AsyncStorage.removeItem('domain');
        setResult('Lỗi kết nối đến domain.');
      }
    }
  };
  useEffect(() => {
    checkLocalDomain();
  }, []);
  return (
    <>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          resizeMode="cover"
          style={[styles.img]}
          source={require('../images/domain.png')}
        />
        <Text style={{marginVertical: 10, color: 'black', fontSize: 20}}>
          Domain
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nhập domain cần kiểm tra"
        value={domain}
        onChangeText={text => setDomain(text)}
      />
      <Button
        title={'Xác nhận'}
        containerStyle={{
          width: 200,
          marginTop: 20,
          borderRadius: 50,
          marginHorizontal: 120,
        }}
        buttonStyle={{
          backgroundColor: 'lightgreen',
          borderRadius: 10,
        }}
        onPress={checkDomain}></Button>
      {result && (
        <Text style={{textAlign: 'center', marginTop: 10, color: 'red'}}>
          {result}
        </Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  img: {
    width: iconSize,
    height: iconSize,
    borderRadius: iconSize / 2,
    overflow: 'hidden',
    marginVertical: 10,
  },
  input: {
    backgroundColor: 'lightgray',
    marginHorizontal: 20,
    borderRadius: 50,
    padding: 10,
  },
});
