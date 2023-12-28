import React, {useState} from 'react';
import {View, useWindowDimensions} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {EachElementLookup} from '../components';

export default function LookupPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const FirstRoute = () => (
    <View
      style={{
        flex: 1,
      }}>
      <EachElementLookup search={searchQuery} />
    </View>
  );

  const SecondRoute = () => (
    <View
      style={{
        flex: 1,
      }}>
      <EachElementLookup search={searchQuery} />
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
