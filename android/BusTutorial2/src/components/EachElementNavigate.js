import {useEffect, useState} from 'react';
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
  // const OneRoute = [
  //   {
  //     startStation: {
  //       stationRoute: {
  //         id: 1,
  //         priority: 1,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R2231',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 12,
  //     },
  //     midStation: null,
  //     endStation: {
  //       stationRoute: {
  //         id: 10,
  //         priority: 10,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 22,
  //     },
  //     distance: 0.12,
  //   },
  //   {
  //     startStation: {
  //       stationRoute: {
  //         id: 1,
  //         priority: 1,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 12,
  //     },
  //     midStation: null,
  //     endStation: {
  //       stationRoute: {
  //         id: 10,
  //         priority: 10,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 22,
  //     },
  //     distance: 0.12,
  //   },
  //   {
  //     startStation: {
  //       stationRoute: {
  //         id: 1,
  //         priority: 1,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 12,
  //     },
  //     midStation: null,
  //     endStation: {
  //       stationRoute: {
  //         id: 10,
  //         priority: 10,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 22,
  //     },
  //     distance: 0.12,
  //   },
  //   {
  //     startStation: {
  //       stationRoute: {
  //         id: 1,
  //         priority: 1,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 12,
  //     },
  //     midStation: null,
  //     endStation: {
  //       stationRoute: {
  //         id: 10,
  //         priority: 10,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 22,
  //     },
  //     distance: 0.12,
  //   },
  //   {
  //     startStation: {
  //       stationRoute: {
  //         id: 1,
  //         priority: 1,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 12,
  //     },
  //     midStation: null,
  //     endStation: {
  //       stationRoute: {
  //         id: 10,
  //         priority: 10,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 22,
  //     },
  //     distance: 0.12,
  //   },
  //   {
  //     startStation: {
  //       stationRoute: {
  //         id: 1,
  //         priority: 1,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 12,
  //     },
  //     midStation: null,
  //     endStation: {
  //       stationRoute: {
  //         id: 10,
  //         priority: 10,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 22,
  //     },
  //     distance: 0.12,
  //   },
  // ];
  // const TwoRoute = [
  //   {
  //     startStation: {
  //       stationRoute: {
  //         id: 1,
  //         priority: 1,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R2232',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 12,
  //     },
  //     midStation: {
  //       id: 2,
  //       name: 'benthanh2',
  //       latitude: 23.32,
  //       longitude: 32.22,
  //       address: 'hocmon',
  //       code: '12quan',
  //       isActive: 1,
  //     },
  //     endStation: {
  //       stationRoute: {
  //         id: 10,
  //         priority: 10,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh3',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 22,
  //     },
  //     distance: 0.12,
  //   },
  //   {
  //     startStation: {
  //       stationRoute: {
  //         id: 1,
  //         priority: 1,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 12,
  //     },
  //     midStation: {
  //       id: 2,
  //       name: 'benthanh',
  //       latitude: 23.32,
  //       longitude: 32.22,
  //       address: 'hocmon',
  //       code: '12quan',
  //       isActive: 1,
  //     },
  //     endStation: {
  //       stationRoute: {
  //         id: 10,
  //         priority: 10,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 22,
  //     },
  //     distance: 0.12,
  //   },
  //   {
  //     startStation: {
  //       stationRoute: {
  //         id: 1,
  //         priority: 1,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 12,
  //     },
  //     midStation: {
  //       id: 2,
  //       name: 'benthanh',
  //       latitude: 23.32,
  //       longitude: 32.22,
  //       address: 'hocmon',
  //       code: '12quan',
  //       isActive: 1,
  //     },
  //     endStation: {
  //       stationRoute: {
  //         id: 10,
  //         priority: 10,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 22,
  //     },
  //     distance: 0.12,
  //   },
  //   {
  //     startStation: {
  //       stationRoute: {
  //         id: 1,
  //         priority: 1,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 12,
  //     },
  //     midStation: {
  //       id: 2,
  //       name: 'benthanh',
  //       latitude: 23.32,
  //       longitude: 32.22,
  //       address: 'hocmon',
  //       code: '12quan',
  //       isActive: 1,
  //     },
  //     endStation: {
  //       stationRoute: {
  //         id: 10,
  //         priority: 10,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 22,
  //     },
  //     distance: 0.12,
  //   },
  //   {
  //     startStation: {
  //       stationRoute: {
  //         id: 1,
  //         priority: 1,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 12,
  //     },
  //     midStation: {
  //       id: 2,
  //       name: 'benthanh',
  //       latitude: 23.32,
  //       longitude: 32.22,
  //       address: 'hocmon',
  //       code: '12quan',
  //       isActive: 1,
  //     },
  //     endStation: {
  //       stationRoute: {
  //         id: 10,
  //         priority: 10,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 22,
  //     },
  //     distance: 0.12,
  //   },
  //   {
  //     startStation: {
  //       stationRoute: {
  //         id: 1,
  //         priority: 1,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 12,
  //     },
  //     midStation: {
  //       id: 2,
  //       name: 'benthanh',
  //       latitude: 23.32,
  //       longitude: 32.22,
  //       address: 'hocmon',
  //       code: '12quan',
  //       isActive: 1,
  //     },
  //     endStation: {
  //       stationRoute: {
  //         id: 10,
  //         priority: 10,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 22,
  //     },
  //     distance: 0.12,
  //   },
  // ];
  // const ThreeRoute = [
  //   {
  //     startStation: {
  //       stationRoute: {
  //         id: 1,
  //         priority: 1,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh1',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 12,
  //     },
  //     midRoute: {
  //       startStation: {
  //         id: 2,
  //         name: 'benthanh2',
  //         latitude: 23.32,
  //         longitude: 32.22,
  //         address: 'hocmon',
  //         code: '12quan',
  //         isActive: 1,
  //       },
  //       route: {
  //         id: 2,
  //         name: 'Test Route 2',
  //         distance: 12.5,
  //         duration: 62,
  //         tripSpacing: 25,
  //         startTime: {hours: 8, minutes: 0},
  //         endTime: {hours: 17, minutes: 30},
  //         isActive: 1,
  //         routeNum: 'R223',
  //         direction: 'North2',
  //       },
  //       endStation: {
  //         id: 2,
  //         name: 'benthanh3',
  //         latitude: 23.32,
  //         longitude: 32.22,
  //         address: 'hocmon',
  //         code: '12quan',
  //         isActive: 1,
  //       },
  //     },
  //     endStation: {
  //       stationRoute: {
  //         id: 10,
  //         priority: 10,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh4',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 22,
  //     },
  //     distance: 0.12,
  //   },
  //   {
  //     startStation: {
  //       stationRoute: {
  //         id: 1,
  //         priority: 1,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R2233',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh4',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 12,
  //     },
  //     midRoute: {
  //       startStation: {
  //         id: 2,
  //         name: 'benthanh',
  //         latitude: 23.32,
  //         longitude: 32.22,
  //         address: 'hocmon',
  //         code: '12quan',
  //         isActive: 1,
  //       },
  //       route: {
  //         id: 2,
  //         name: 'Test Route 2',
  //         distance: 12.5,
  //         duration: 62,
  //         tripSpacing: 25,
  //         startTime: {hours: 8, minutes: 0},
  //         endTime: {hours: 17, minutes: 30},
  //         isActive: 1,
  //         routeNum: 'R223',
  //         direction: 'North2',
  //       },
  //       endStation: {
  //         id: 2,
  //         name: 'benthanh',
  //         latitude: 23.32,
  //         longitude: 32.22,
  //         address: 'hocmon',
  //         code: '12quan',
  //         isActive: 1,
  //       },
  //     },
  //     endStation: {
  //       stationRoute: {
  //         id: 10,
  //         priority: 10,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 22,
  //     },
  //     distance: 0.12,
  //   },
  //   {
  //     startStation: {
  //       stationRoute: {
  //         id: 1,
  //         priority: 1,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 12,
  //     },
  //     midRoute: {
  //       startStation: {
  //         id: 2,
  //         name: 'benthanh',
  //         latitude: 23.32,
  //         longitude: 32.22,
  //         address: 'hocmon',
  //         code: '12quan',
  //         isActive: 1,
  //       },
  //       route: {
  //         id: 2,
  //         name: 'Test Route 2',
  //         distance: 12.5,
  //         duration: 62,
  //         tripSpacing: 25,
  //         startTime: {hours: 8, minutes: 0},
  //         endTime: {hours: 17, minutes: 30},
  //         isActive: 1,
  //         routeNum: 'R223',
  //         direction: 'North2',
  //       },
  //       endStation: {
  //         id: 2,
  //         name: 'benthanh',
  //         latitude: 23.32,
  //         longitude: 32.22,
  //         address: 'hocmon',
  //         code: '12quan',
  //         isActive: 1,
  //       },
  //     },
  //     endStation: {
  //       stationRoute: {
  //         id: 10,
  //         priority: 10,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 22,
  //     },
  //     distance: 0.12,
  //   },
  //   {
  //     startStation: {
  //       stationRoute: {
  //         id: 1,
  //         priority: 1,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 12,
  //     },
  //     midRoute: {
  //       startStation: {
  //         id: 2,
  //         name: 'benthanh',
  //         latitude: 23.32,
  //         longitude: 32.22,
  //         address: 'hocmon',
  //         code: '12quan',
  //         isActive: 1,
  //       },
  //       route: {
  //         id: 2,
  //         name: 'Test Route 2',
  //         distance: 12.5,
  //         duration: 62,
  //         tripSpacing: 25,
  //         startTime: {hours: 8, minutes: 0},
  //         endTime: {hours: 17, minutes: 30},
  //         isActive: 1,
  //         routeNum: 'R223',
  //         direction: 'North2',
  //       },
  //       endStation: {
  //         id: 2,
  //         name: 'benthanh',
  //         latitude: 23.32,
  //         longitude: 32.22,
  //         address: 'hocmon',
  //         code: '12quan',
  //         isActive: 1,
  //       },
  //     },
  //     endStation: {
  //       stationRoute: {
  //         id: 10,
  //         priority: 10,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 22,
  //     },
  //     distance: 0.12,
  //   },
  //   {
  //     startStation: {
  //       stationRoute: {
  //         id: 1,
  //         priority: 1,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 12,
  //     },
  //     midRoute: {
  //       startStation: {
  //         id: 2,
  //         name: 'benthanh',
  //         latitude: 23.32,
  //         longitude: 32.22,
  //         address: 'hocmon',
  //         code: '12quan',
  //         isActive: 1,
  //       },
  //       route: {
  //         id: 2,
  //         name: 'Test Route 2',
  //         distance: 12.5,
  //         duration: 62,
  //         tripSpacing: 25,
  //         startTime: {hours: 8, minutes: 0},
  //         endTime: {hours: 17, minutes: 30},
  //         isActive: 1,
  //         routeNum: 'R223',
  //         direction: 'North2',
  //       },
  //       endStation: {
  //         id: 2,
  //         name: 'benthanh',
  //         latitude: 23.32,
  //         longitude: 32.22,
  //         address: 'hocmon',
  //         code: '12quan',
  //         isActive: 1,
  //       },
  //     },
  //     endStation: {
  //       stationRoute: {
  //         id: 10,
  //         priority: 10,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 22,
  //     },
  //     distance: 0.12,
  //   },
  //   {
  //     startStation: {
  //       stationRoute: {
  //         id: 1,
  //         priority: 1,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 12,
  //     },
  //     midRoute: {
  //       startStation: {
  //         id: 2,
  //         name: 'benthanh',
  //         latitude: 23.32,
  //         longitude: 32.22,
  //         address: 'hocmon',
  //         code: '12quan',
  //         isActive: 1,
  //       },
  //       route: {
  //         id: 2,
  //         name: 'Test Route 2',
  //         distance: 12.5,
  //         duration: 62,
  //         tripSpacing: 25,
  //         startTime: {hours: 8, minutes: 0},
  //         endTime: {hours: 17, minutes: 30},
  //         isActive: 1,
  //         routeNum: 'R223',
  //         direction: 'North2',
  //       },
  //       endStation: {
  //         id: 2,
  //         name: 'benthanh',
  //         latitude: 23.32,
  //         longitude: 32.22,
  //         address: 'hocmon',
  //         code: '12quan',
  //         isActive: 1,
  //       },
  //     },
  //     endStation: {
  //       stationRoute: {
  //         id: 10,
  //         priority: 10,
  //         routeId: {
  //           id: 2,
  //           name: 'Test Route 2',
  //           distance: 12.5,
  //           duration: 62,
  //           tripSpacing: 25,
  //           startTime: {hours: 8, minutes: 0},
  //           endTime: {hours: 17, minutes: 30},
  //           isActive: 1,
  //           routeNum: 'R223',
  //           direction: 'North2',
  //         },
  //         stationId: {
  //           id: 2,
  //           name: 'benthanh',
  //           latitude: 23.32,
  //           longitude: 32.22,
  //           address: 'hocmon',
  //           code: '12quan',
  //           isActive: 1,
  //         },
  //       },
  //       distance: 22,
  //     },
  //     distance: 0.12,
  //   },
  // ];

  const handleDetailNavigatePress = (u, num) => {
    navigation.navigate('DetailNavigate', {data: u, num: num});
  };
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
                                  <Text> - </Text>
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
                                  <Text> - </Text>

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
                                  <Text> - </Text>
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
  },
  routeNum: {
    color: 'green',
    fontSize: 16,
    marginTop: 5,
    marginLeft: 5,
  },
});
