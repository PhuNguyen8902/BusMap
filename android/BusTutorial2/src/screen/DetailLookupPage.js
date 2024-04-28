// import {Text} from 'react-native';

// export default function DetailLookupPage() {
//   return (
//     <>
//       <Text>hello</Text>
//     </>
//   );
// }
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-elements';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {
  Feedback,
  HourlyChart,
  Information,
  Map,
  StationStop,
} from '../components/Lookup';
import {routeService} from '../service';

export default function DetailLookupPage({route}) {
  const [btn, setBtn] = useState(1);
  const [realData, setRealData] = useState('');

  const data = route.params?.data;
  const fetchData = async () => {
    let domain = await AsyncStorage.getItem('domain');
    const data = route.params?.data;
    console.log(data);
    if (domain == null || domain == '') {
      AsyncStorage.removeItem('domain');
      navigation.navigate('Domain');
    }
    domain = 'http://' + domain;
    const d = await routeService.getRoutesByRouteNum(data.routeNum, domain);
    setRealData(d);
  };
  useEffect(() => {
    fetchData();
  }, [btn]);
  const FirstRoute = () => (
    <View
      style={{
        flex: 1,
      }}>
      {btn == 1 && realData != '' ? <HourlyChart data={realData[0]} /> : null}

      {btn == 2 && realData != '' ? <HourlyChart data={realData[1]} /> : null}
    </View>
  );

  const SecondRoute = () => (
    <View
      style={{
        flex: 1,
      }}>
      {btn == 1 && realData != '' ? <StationStop data={realData[0]} /> : null}

      {btn == 2 && realData != '' ? <StationStop data={realData[1]} /> : null}
    </View>
  );
  const ThirdRoute = () => (
    <View
      style={{
        flex: 1,
      }}>
      {btn == 1 && realData != '' ? <Information data={realData[0]} /> : null}

      {btn == 2 && realData != '' ? <Information data={realData[1]} /> : null}
    </View>
  );
  const FourRoute = () => (
    <View
      style={{
        flex: 1,
      }}>
      {btn == 1 && realData != '' ? <Map data={realData[0]} /> : null}

      {btn == 2 && realData != '' ? <Map data={realData[1]} /> : null}
    </View>
  );
  const FiveRoute = () => (
    <View
      style={{
        flex: 1,
      }}>
      {btn == 1 && realData != '' ? (
        <Feedback data={realData[0]} rate={realData[0]} />
      ) : null}

      {btn == 2 && realData != '' ? (
        <Feedback data={realData[1]} rate={realData[0]} />
      ) : null}
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    four: FourRoute,
    five: FiveRoute,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Biểu đồ giờ'},
    {key: 'second', title: 'Trạm dừng'},
    {key: 'third', title: 'Thông tin'},
    {key: 'four', title: 'Bản đồ'},
    {key: 'five', title: 'Đánh giá'},
  ]);
  const checkButton1 = async () => {
    setBtn(1);
  };
  const checkButton2 = async () => {
    setBtn(2);
  };
  return (
    <>
      <View style={styles.containerButton}>
        {btn == 1 ? (
          <Button
            title={'Lượt đi'}
            containerStyle={{
              width: 150,
              borderRadius: 50,
              marginRight: 5,
            }}
            buttonStyle={{
              backgroundColor: 'red',
              borderRadius: 10,
            }}
            onPress={checkButton1}></Button>
        ) : (
          <Button
            title={'Lượt đi'}
            containerStyle={{
              width: 150,
              borderRadius: 50,
              marginRight: 5,
            }}
            buttonStyle={{
              backgroundColor: 'lightgreen',
              borderRadius: 10,
            }}
            onPress={checkButton1}></Button>
        )}
        {btn == 2 ? (
          <Button
            title={'Lượt về'}
            containerStyle={{
              width: 150,
              borderRadius: 50,
              marginRight: 5,
            }}
            buttonStyle={{
              backgroundColor: 'red',
              borderRadius: 10,
            }}
            onPress={checkButton2}></Button>
        ) : (
          <Button
            title={'Lượt về'}
            containerStyle={{
              width: 150,
              borderRadius: 50,
              marginRight: 5,
            }}
            buttonStyle={{
              backgroundColor: 'lightgreen',
              borderRadius: 10,
            }}
            onPress={checkButton2}></Button>
        )}
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={props => (
          <TabBar {...props} style={{backgroundColor: 'lightgreen'}} />
        )}
        scrollEnabled={true}
      />
    </>
  );
}

const styles = StyleSheet.create({
  containerButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
});
