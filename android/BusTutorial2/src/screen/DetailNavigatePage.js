import React, {useState} from 'react';
import {View, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {DetailNavigate} from '../components';

export default function DetailNavigatePage({route}) {
  const data = route.params?.data;
  const num = route.params?.num;

  const FirstRoute = () => (
    <View
      style={{
        flex: 1,
      }}>
      <DetailNavigate data={data} num={num} />
    </View>
  );

  const SecondRoute = () => (
    <View
      style={{
        flex: 1,
      }}>
      <DetailNavigate data={data} num={num} />
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Chi tiết cách đi'},
    {key: 'second', title: 'Các trạm đi qua'},
  ]);
  return (
    <>
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
