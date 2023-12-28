import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useEffect, useState} from 'react';
import {routeService} from '../service/index';

function formatTime(timeObject) {
  const hours = timeObject[0] < 10 ? `0${timeObject[0]}` : timeObject[0];
  const minutes = timeObject[1] < 10 ? `0${timeObject[1]}` : timeObject[1];

  return `${hours}:${minutes}`;
}

export default function EachElementLookup({search}) {
  const [fakeRoute, setFakeRoute] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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
    // setPage(page + 1);
    setLoading(false);
  };
  // const readData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('auth');
  //     if (value !== null) {
  //       console.log('Data read successfully:', value);
  //     } else {
  //       console.log('No data found');
  //     }
  //   } catch (error) {
  //     console.error('Error reading data:', error);
  //   }
  // };

  useEffect(() => {
    if (search == '') {
      setFakeRoute([]);
      fetchData();
    } else {
      setFakeRoute([]);

      fetchSearchData();
    }
  }, [search]);
  const renderListItem = ({item}) => {
    return (
      <View style={styles.user}>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={require('../images/pikachu.jpg')}
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
            onPress={() => console.log('hello')}
            size={30}
          />
        </View>
      </View>
    );
  };
  // return (
  //   <>
  //     <ScrollView>
  //       <Card containerStyle={styles.container}>
  //         {fakeRoute.map((u, i) => {
  //           return (
  //             <View key={i} style={styles.user}>
  //               <View>
  //                 <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //                   <Image
  //                     style={styles.image}
  //                     resizeMode="cover"
  //                     source={require('../images/pikachu.jpg')}
  //                   />
  //                   <View>
  //                     <Text style={styles.routeNum}>{u.routeNum}</Text>
  //                     <Text style={[styles.name, {width: 200}]}>{u.name}</Text>
  //                     <Text style={styles.name}>
  //                       {formatTime(u.startTime)} - {formatTime(u.endTime)}
  //                     </Text>
  //                   </View>
  //                 </View>
  //               </View>
  //               <View>
  //                 <Icon
  //                   raised
  //                   name="heartbeat"
  //                   type="font-awesome"
  //                   color="red"
  //                   onPress={() => console.log('hello')}
  //                   size={30}
  //                 />
  //               </View>
  //             </View>
  //           );
  //         })}
  //       </Card>
  //     </ScrollView>
  //   </>
  // );
  return (
    <>
      <FlatList
        data={fakeRoute}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderListItem}
        // onEndReached={fetchData}
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
