import React, {useEffect, useRef, useState} from 'react';
import {stationRouteService} from '../../service';
import MapView, {Marker} from 'react-native-maps';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const Map = ({data}) => {
  const [dataStation, setDataStation] = useState(null);
  const fetchData = async () => {
    const dStation = await stationRouteService.getStationRouteByRouteId(
      data.id,
    );
    const processedStations = dStation.map(item => ({
      id: item.stationId.id,
      coordinate: {
        latitude: item.stationId.latitude,
        longitude: item.stationId.longitude,
      },
      title: item.stationId.address,
    }));

    setDataStation(processedStations);
    // console.log(processedStations);
  };

  const mapRef = useRef(null);

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: mapRef.current.props.initialRegion.latitude,
          longitude: mapRef.current.props.initialRegion.longitude,
          latitudeDelta: mapRef.current.props.initialRegion.latitudeDelta / 5,
          longitudeDelta: mapRef.current.props.initialRegion.longitudeDelta / 5,
        },
        200,
      );
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: mapRef.current.props.initialRegion.latitude,
          longitude: mapRef.current.props.initialRegion.longitude,
          latitudeDelta: mapRef.current.props.initialRegion.latitudeDelta * 1.5,
          longitudeDelta:
            mapRef.current.props.initialRegion.longitudeDelta * 1.5,
        },
        200,
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [data]);
  return (
    <View style={styles.container}>
      {dataStation !== null ? (
        <>
          <MapView
            ref={mapRef}
            style={styles.containerMap}
            initialRegion={{
              latitude: dataStation[0].coordinate.latitude,
              longitude: dataStation[0].coordinate.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}>
            {dataStation.map(marker => (
              <Marker
                key={marker.id}
                coordinate={marker.coordinate}
                title={marker.title}
              />
            ))}
          </MapView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleZoomIn}>
              <Text>Zoom In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleZoomOut}>
              <Text>Zoom Out</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  containerMap: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
  },
});

export default Map;
