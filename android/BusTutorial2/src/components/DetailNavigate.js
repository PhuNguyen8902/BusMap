import {Text, StyleSheet, View, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function DetailNavigate({data, num}) {
  return (
    <>
      {num == 1 ? (
        <ScrollView>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Icon
                raised
                name="user"
                type="font-awesome"
                onPress={() => console.log('hello')}
                size={20}
              />
              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: 10,
                  alignItems: 'center',
                }}>
                <Text style={styles.routeNum}>
                  Đi đến trạm {data.startStation.stationRoute.stationId.name}
                </Text>
                <Text style={styles.direc1}>
                  Xuất phát từ [Vị trí hiện tại]
                </Text>
              </View>
              <Text style={{fontWeight: 'bold', color: 'blue', fontSize: 15}}>
                {data.startStation.distance} km
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',

                marginTop: 50,
              }}>
              <Icon
                raised
                name="bus"
                type="font-awesome"
                onPress={() => console.log('hello')}
                size={20}
              />
              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: 10,
                  alignItems: 'center',
                }}>
                <Text style={styles.routeNum}>
                  Đi tuyến {data.startStation.stationRoute.routeId.routeNum}:{' '}
                  {data.startStation.stationRoute.routeId.name}
                </Text>
                <Text style={styles.direc1}>
                  {data.startStation.stationRoute.stationId.name} ---{' '}
                  {data.endStation.stationRoute.stationId.name}
                </Text>
              </View>
              <Text style={{fontWeight: 'bold', color: 'blue', fontSize: 15}}>
                {data.distance} km
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 50,
              }}>
              <Icon
                raised
                name="user"
                type="font-awesome"
                onPress={() => console.log('hello')}
                size={20}
              />
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <Text style={styles.routeNum}>
                  Xuống tại trạm {data.endStation.stationRoute.stationId.name}{' '}
                  và đi tới điểm đến
                </Text>
                <Text style={styles.direc1}>
                  Đi đến {data.endStation.stationRoute.stationId.name}
                </Text>
              </View>
              <Text style={{fontWeight: 'bold', color: 'blue', fontSize: 15}}>
                {data.endStation.distance} km
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : null}
      {num == 2 ? (
        <ScrollView>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Icon
                raised
                name="user"
                type="font-awesome"
                onPress={() => console.log('hello')}
                size={20}
              />
              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: 10,
                }}>
                <Text style={styles.routeNum}>
                  Đi đến trạm {data.startStation.stationRoute.stationId.name}
                </Text>
                <Text style={styles.direc1}>
                  Xuất phát từ [Vị trí hiện tại]
                </Text>
              </View>
              <Text style={{fontWeight: 'bold', color: 'blue', fontSize: 15}}>
                {data.startStation.distance} km
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <Icon
                raised
                name="bus"
                type="font-awesome"
                onPress={() => console.log('hello')}
                size={20}
              />
              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: 40,
                }}>
                <Text style={styles.routeNum}>
                  Đi tuyến {data.startStation.stationRoute.routeId.routeNum}:{' '}
                  {data.startStation.stationRoute.routeId.name}
                </Text>
                <Text style={styles.direc1}>
                  {data.startStation.stationRoute.stationId.name} ---{' '}
                  {data.midStation.name}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <Icon
                raised
                name="user"
                type="font-awesome"
                onPress={() => console.log('hello')}
                size={20}
              />
              <Text
                style={{
                  color: 'green',
                  fontSize: 16,
                  marginTop: 5,
                  marginLeft: 40,
                }}>
                Đổi tuyến xe tại trạm {data.midStation.name}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <Icon
                raised
                name="bus"
                type="font-awesome"
                onPress={() => console.log('hello')}
                size={20}
              />
              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: 40,
                }}>
                <Text style={styles.routeNum}>
                  Đi tuyến {data.endStation.stationRoute.routeId.routeNum}:{' '}
                  {data.endStation.stationRoute.routeId.name}
                </Text>
                <Text style={styles.direc1}>
                  {data.midStation.name} ---{' '}
                  {data.endStation.stationRoute.stationId.name}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 50,
              }}>
              <Icon
                raised
                name="user"
                type="font-awesome"
                onPress={() => console.log('hello')}
                size={20}
              />
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <Text style={styles.routeNum}>
                  Xuống tại trạm {data.endStation.stationRoute.stationId.name}
                  {'\n'}và đi tới điểm đến
                </Text>
                <Text style={styles.direc1}>
                  Đi đến {data.endStation.stationRoute.stationId.name}
                </Text>
              </View>
              <Text style={{fontWeight: 'bold', color: 'blue', fontSize: 15}}>
                {data.endStation.distance} km
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : null}
      {num == 3 ? (
        <ScrollView>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Icon
                raised
                name="user"
                type="font-awesome"
                onPress={() => console.log('hello')}
                size={20}
              />
              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: 10,
                }}>
                <Text style={styles.routeNum}>
                  Đi đến trạm {data.startStation.stationRoute.stationId.name}
                </Text>
                <Text style={styles.direc1}>
                  Xuất phát từ [Vị trí hiện tại]
                </Text>
              </View>
              <Text style={{fontWeight: 'bold', color: 'blue', fontSize: 15}}>
                {data.startStation.distance} km
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <Icon
                raised
                name="bus"
                type="font-awesome"
                onPress={() => console.log('hello')}
                size={20}
              />
              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: 40,
                }}>
                <Text style={styles.routeNum}>
                  Đi tuyến {data.startStation.stationRoute.routeId.routeNum}:{' '}
                  {data.startStation.stationRoute.routeId.name}
                </Text>
                <Text style={styles.direc1}>
                  {data.startStation.stationRoute.stationId.name} ---{' '}
                  {data.midRoute.startStation.name}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <Icon
                raised
                name="user"
                type="font-awesome"
                onPress={() => console.log('hello')}
                size={20}
              />
              <Text
                style={{
                  color: 'green',
                  fontSize: 16,
                  marginTop: 5,
                  marginLeft: 40,
                }}>
                Đổi tuyến xe tại trạm {data.midRoute.startStation.name}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <Icon
                raised
                name="bus"
                type="font-awesome"
                onPress={() => console.log('hello')}
                size={20}
              />
              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: 40,
                }}>
                <Text style={styles.routeNum}>
                  Đi tuyến {data.midRoute.route.routeNum}:{' '}
                  {data.midRoute.route.name}
                </Text>
                <Text style={styles.direc1}>
                  {data.midRoute.startStation.name} ---{' '}
                  {data.midRoute.endStation.name}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <Icon
                raised
                name="user"
                type="font-awesome"
                onPress={() => console.log('hello')}
                size={20}
              />
              <Text
                style={{
                  color: 'green',
                  fontSize: 16,
                  marginTop: 5,
                  marginLeft: 40,
                }}>
                Đổi tuyến xe tại trạm {data.midRoute.endStation.name}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <Icon
                raised
                name="bus"
                type="font-awesome"
                onPress={() => console.log('hello')}
                size={20}
              />
              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: 40,
                }}>
                <Text style={styles.routeNum}>
                  Đi tuyến {data.endStation.stationRoute.routeId.routeNum}:{' '}
                  {data.endStation.stationRoute.routeId.name}
                </Text>
                <Text style={styles.direc1}>
                  {data.midRoute.endStation.name} ---{' '}
                  {data.endStation.stationRoute.stationId.name}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 50,
              }}>
              <Icon
                raised
                name="user"
                type="font-awesome"
                onPress={() => console.log('hello')}
                size={20}
              />
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <Text style={styles.routeNum}>
                  Xuống tại trạm {data.endStation.stationRoute.stationId.name}
                  {'\n'}và đi tới điểm đến
                </Text>
                <Text style={styles.direc1}>
                  Đi đến {data.endStation.stationRoute.stationId.name}
                </Text>
              </View>
              <Text style={{fontWeight: 'bold', color: 'blue', fontSize: 15}}>
                {data.endStation.distance} km
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  fonts: {
    marginBottom: 8,
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
    fontSize: 16,
    marginTop: 5,
  },
  routeNum: {
    color: 'green',
    fontSize: 16,
    marginTop: 5,
    width: 200,
  },
  direc1: {
    color: 'gray',
    width: 200,
  },
});
