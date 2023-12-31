import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity, // Add this import
} from 'react-native';
import {Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {routeService} from '../../service/index';
import {useNavigation} from '@react-navigation/native';

function formatTime(timeObject) {
  const hours = timeObject[0] < 10 ? `0${timeObject[0]}` : timeObject[0];
  const minutes = timeObject[1] < 10 ? `0${timeObject[1]}` : timeObject[1];

  return `${hours}:${minutes}`;
}

export default function EachElementLookup({search}) {
  const [fakeRoute, setFakeRoute] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchData = async () => {
    setLoading(true);
    const data = await routeService.getAllRoute();
    setFakeRoute(data);
    setPage(page + 1);
    setLoading(false);
  };

  const fetchSearchData = async () => {
    setLoading(true);
    const data = await routeService.getSearchRoute(search);
    setFakeRoute(data);
    setLoading(false);
  };

  useEffect(() => {
    if (search === '') {
      setFakeRoute([]);
      fetchData();
    } else {
      setFakeRoute([]);
      fetchSearchData();
    }
  }, [search]);

  const handlePress = item => {
    // console.log('Pressed item:', item);
    navigation.navigate('DetailLookup', {data: item});
  };

  const renderListItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => handlePress(item)} activeOpacity={0.8}>
        <View style={styles.user}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={require('../../images/pikachu.jpg')}
              />
              <View>
                <Text style={styles.routeNum}>{item.routeNum}</Text>
                <Text style={[styles.name, {width: 200}]}>{item.name}</Text>
                <Text style={styles.name}>
                  {formatTime(item.startTime)} - {formatTime(item.endTime)}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Icon
              raised
              name="heartbeat"
              type="font-awesome"
              color="red"
              onPress={() => console.log(item)}
              size={30}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <FlatList
        data={fakeRoute}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderListItem}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading && <ActivityIndicator size="small" color="#0000ff" />
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
    backgroundColor: 'lightgray',
    padding: 5,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 50,
  },
  name: {
    fontSize: 13,
    marginTop: 5,
  },
  routeNum: {
    color: 'green',
    fontSize: 16,
    marginTop: 5,
  },
});
