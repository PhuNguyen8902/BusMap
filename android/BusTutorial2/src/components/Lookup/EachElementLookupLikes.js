import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert, // Add this import
} from 'react-native';
import {Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserRouteLikesService, routeService} from '../../service/index';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function formatTime(timeObject) {
  const hours = timeObject[0] < 10 ? `0${timeObject[0]}` : timeObject[0];
  const minutes = timeObject[1] < 10 ? `0${timeObject[1]}` : timeObject[1];

  return `${hours}:${minutes}`;
}

export default function EachElementLookupLikes({search, user}) {
  const [fakeRoute, setFakeRoute] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchData2 = async () => {
    setLoading(true);
    let domain = await AsyncStorage.getItem('domain');
    if (domain == null || domain == '') {
      AsyncStorage.removeItem('domain');
      navigation.navigate('Domain');
    }
    domain = 'http://' + domain;
    const data = await UserRouteLikesService.getAllByUserId(user.id, domain);
    setFakeRoute(data);
    setPage(page + 1);
    setLoading(false);
  };

  const fetchSearchData = async () => {
    setLoading(true);
    let domain = await AsyncStorage.getItem('domain');
    if (domain == null || domain == '') {
      AsyncStorage.removeItem('domain');
      navigation.navigate('Domain');
    }
    domain = 'http://' + domain;
    const data = await UserRouteLikesService.getSearchRoute(
      search,
      user.id,
      domain,
    );
    setFakeRoute(data);
    setPage(page + 1);
    setLoading(false);
  };

  useEffect(() => {
    if (search === '') {
      setFakeRoute([]);
      fetchData2();
    } else {
      setFakeRoute([]);
      fetchSearchData();
    }
  }, [search]);

  const handlePress = item => {
    // console.log('Pressed item:', item);
    navigation.navigate('DetailLookup', {data: item});
  };

  const deleteItem = async item => {
    const d = {
      userId: user.id,
      routeId: item.id,
    };
    let domain = await AsyncStorage.getItem('domain');
    if (domain == null || domain == '') {
      AsyncStorage.removeItem('domain');
      navigation.navigate('Domain');
    }
    domain = 'http://' + domain;
    const rs = UserRouteLikesService.delete(d, domain);
    if (rs == null) {
      Alert.alert('Xóa yêu thích thất bại', 'Đã có lỗi xảy ra', [{text: 'OK'}]);
    } else {
      Alert.alert('Xóa yêu thích thành công', '', [{text: 'OK'}]);
      setFakeRoute(fakeRoute.filter(i => i.id !== item.id));
    }
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
                source={require('../../images/bustutorial.png')}
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
              onPress={() => deleteItem(item)}
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
    color: 'black',
    fontSize: 13,
    marginTop: 5,
  },
  routeNum: {
    color: 'green',
    fontSize: 16,
    marginTop: 5,
  },
});
