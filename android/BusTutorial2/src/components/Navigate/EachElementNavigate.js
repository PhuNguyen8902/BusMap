import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

export default function EachElementNavigate({num, data}) {
  const navigation = useNavigation();
  let fakeRoute = data;

  fakeRoute = fakeRoute.map(route => {
    route.distance = parseFloat(route.distance.toFixed(2));

    if (route.endStation && route.endStation.distance) {
      route.endStation.distance = parseFloat(
        route.endStation.distance.toFixed(2),
      );
    }

    if (route.startStation && route.startStation.distance) {
      route.startStation.distance = parseFloat(
        route.startStation.distance.toFixed(2),
      );
    }

    return route;
  });

  const handleDetailNavigatePress = (u, num) => {
    navigation.navigate('DetailNavigate', {data: u, num: num});
  };
  if (data.length === 0) {
    return (
      <View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            marginHorizontal: 120,
            marginTop: 20,
            color: 'red',
          }}>
          Không có tuyến xe
        </Text>
      </View>
    );
  }
  return (
    <>
      <ScrollView>
        <Card containerStyle={styles.container}>
          {fakeRoute != undefined
            ? fakeRoute.map((u, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => handleDetailNavigatePress(u, num)}>
                    <View style={styles.user}>
                      <View>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              {num == 1 && data != [] ? (
                                <>
                                  <Icon
                                    raised
                                    name="bus"
                                    type="font-awesome"
                                    color="red"
                                    onPress={() => console.log('hello')}
                                    size={20}
                                  />
                                  <Text style={styles.routeNum}>
                                    {
                                      u.startStation.stationRoute.routeId
                                        .routeNum
                                    }
                                  </Text>
                                </>
                              ) : null}
                              {num == 2 && data != [] ? (
                                <>
                                  <Icon
                                    raised
                                    name="bus"
                                    type="font-awesome"
                                    color="red"
                                    onPress={() => console.log('hello')}
                                    size={20}
                                  />
                                  <Text style={styles.routeNum}>
                                    {
                                      u.startStation.stationRoute.routeId
                                        .routeNum
                                    }
                                  </Text>
                                  <Text style={styles.name}> - </Text>
                                  <Icon
                                    raised
                                    name="bus"
                                    type="font-awesome"
                                    color="red"
                                    onPress={() => console.log('hello')}
                                    size={20}
                                  />
                                  <Text style={styles.routeNum}>
                                    {u.endStation.stationRoute.routeId.routeNum}
                                  </Text>
                                </>
                              ) : null}
                              {num == 3 && data != [] ? (
                                <>
                                  <Icon
                                    raised
                                    name="bus"
                                    type="font-awesome"
                                    color="red"
                                    onPress={() => console.log('hello')}
                                    size={20}
                                  />
                                  <Text style={styles.routeNum}>
                                    {
                                      u.startStation.stationRoute.routeId
                                        .routeNum
                                    }
                                  </Text>
                                  <Text style={styles.name}> - </Text>

                                  <Icon
                                    raised
                                    name="bus"
                                    type="font-awesome"
                                    color="red"
                                    onPress={() => console.log('hello')}
                                    size={20}
                                  />
                                  <Text style={styles.routeNum}>
                                    {u.midRoute.route.routeNum}
                                  </Text>
                                  <Text style={styles.name}> - </Text>
                                  <Icon
                                    raised
                                    name="bus"
                                    type="font-awesome"
                                    color="red"
                                    onPress={() => console.log('hello')}
                                    size={20}
                                  />
                                  <Text style={styles.routeNum}>
                                    {u.endStation.stationRoute.routeId.routeNum}
                                  </Text>
                                </>
                              ) : null}
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: 5,
                              }}>
                              <Icon
                                raised
                                name="user"
                                type="font-awesome"
                                color="gray"
                                onPress={() => console.log('hello')}
                                size={17}
                              />
                              <Text style={styles.name}>
                                {u.startStation.distance} km -{' '}
                              </Text>
                              <Icon
                                raised
                                name="bus"
                                type="font-awesome"
                                color="gray"
                                onPress={() => console.log('hello')}
                                size={17}
                              />
                              <Text style={styles.name}>{u.distance} km</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View>
                        <Icon
                          raised
                          name="bus"
                          type="font-awesome"
                          color="red"
                          onPress={() => console.log(num)}
                          size={30}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
            : null}
        </Card>
      </ScrollView>
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
  name: {
    fontSize: 15,
    marginLeft: 5,
    color: 'black',
  },
  routeNum: {
    color: 'green',
    fontSize: 16,
    marginTop: 5,
    marginLeft: 5,
  },
});
