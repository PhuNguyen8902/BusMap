import React, {useEffect, useState} from 'react';
import {View, useWindowDimensions} from 'react-native';
import {Button, SearchBar} from 'react-native-elements';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {
  EachElementStationLookup,
  EachElementStationLookupLikes,
} from '../components/LookupStation';

export default function LookupStationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [u, setU] = useState('');
  const navigation = useNavigation();

  const readData = async () => {
    const value = await AsyncStorage.getItem('auth');
    if (value != null) {
      const storedData = JSON.parse(value);
      setU(storedData);
    }
  };
  useEffect(() => {
    readData();
  }, []);
  const Login = () => {
    navigation.navigate('Login');
  };
  const FirstRoute = () => (
    <View
      style={{
        flex: 1,
      }}>
      {u != '' ? (
        <EachElementStationLookup search={searchQuery} user={u} />
      ) : (
        <EachElementStationLookup search={searchQuery} user={''} />
      )}
    </View>
  );

  const SecondRoute = () => (
    <View
      style={{
        flex: 1,
      }}>
      {u != '' ? (
        <EachElementStationLookupLikes search={searchQuery} user={u} />
      ) : (
        <Button
          title={'Đăng nhập'}
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
      )}
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const onChangeSearch = query => setSearchQuery(query);
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Tất cả'},
    {key: 'second', title: 'Yêu thích'},
  ]);

  // const rs = AsyncStorage.getItem('auth');
  // console.log(rs);

  return (
    <>
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

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={props => (
          <TabBar {...props} style={{backgroundColor: 'lightgreen'}} />
        )}
      />
    </>
  );
}
