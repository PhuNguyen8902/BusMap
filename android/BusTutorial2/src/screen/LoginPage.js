import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {TextInput, Text, StyleSheet, Image, View, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import {AuthService} from '../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const iconSize = 200;

export default function LoginPage() {
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const navigation = useNavigation();

  const Login = async () => {
    const userCredentials = {
      userName: userName,
      password: pass,
    };

    const data = await AuthService.signIn(userCredentials);
    if (data == null) {
      Alert.alert('Đăng nhập thất bại', 'Sai tài khoản hoặc mật khẩu', [
        {text: 'OK'},
      ]);
    } else {
      const dataString = JSON.stringify(data);

      await AsyncStorage.setItem('auth', dataString);
      navigation.navigate('Home');
    }
  };
  const GoHome = () => {
    navigation.navigate('Home');
  };
  return (
    <>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          resizeMode="cover"
          style={[styles.img]}
          source={require('../images/pikachu.jpg')}
        />
        <Text style={{marginVertical: 10, fontWeight: 'bold'}}>Đăng nhập</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Tài khoản"
        value={userName}
        onChangeText={text => setUserName(text)}
      />
      <TextInput
        style={[styles.input, {marginTop: 10}]}
        placeholder="Mật khẩu"
        value={pass}
        onChangeText={text => setPass(text)}
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
        onPress={Login}></Button>
      <Button
        title={'Không cần tài khoản'}
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
        onPress={GoHome}></Button>
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
