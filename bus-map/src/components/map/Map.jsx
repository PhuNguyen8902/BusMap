import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ScaleControl,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point, SearchControl } from "leaflet";
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { GeoSearchControl, MapBoxProvider } from 'leaflet-geosearch';
import SearchField from "./SearchField";
import { useMap } from 'react-leaflet';
import L from "leaflet";
import SideBar from "./sidebar/SideBar";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Autocomplete, IconButton, Input, InputBase, Paper, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Form } from "react-router-dom";
import { TextFields } from "@mui/icons-material";
import { UpdateMapView } from "./UpdateMapView";
import { useDispatch, useSelector } from "react-redux";
import routeService from "../../service/routeService";
import { setStations } from "../../store/features/storeRoute/storeMakersSlice";
import RoutingMap from "./RoutingMap";


export default function Map() {

  // valuable section
  const [position, setPosition] = useState({
    lat: 10.8231,
    lon: 106.6297,
    zoom: 10,
  });

  const customIcon = new Icon({
    iconUrl: require("../../assets/img/mark.png"),
    iconSize: [38, 38], // size of the icon
  });

  const [active, setActive] = useState(false);
  const [address, setAddress] = useState("");

  const [strAddress, setStrAddress] = useState({
    latitude: "",
    longitude: ""
  });

  const dispatch = useDispatch()
  const routeId = useSelector((state) => state.storeRoute.routeId);
  // console.log("routeId in Map: ", routeId)
  const stations = useSelector((state) => state.storeMarkers)
  // console.log("all stations: ", stations)
  // get stations in select route
  useEffect(() => {
    if (routeId != null) {
      const fetchRoute = async () => {
        const routeData = await routeService.getRouteDetail(routeId);
        // console.log("route detail in Map: ", routeData)
        const getAllStationDetail = routeData.map((route, index) => {
          return {
            lat: route.stationId.latitude,
            lon: route.stationId.longitude,
          };
        })
        dispatch(setStations(getAllStationDetail));
      }
      fetchRoute();
    }
  }, [routeId])
  // console.log("Station detail: ", stations)


  // function section
  const fetchAddressInfo = async (ar) => {
    // const ar = "62 Gò Vấp, Việt Nam";
    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      ar
    )}&format=json`;

    console.log(apiUrl);

    try {
      const response = await fetch(apiUrl);
      const addressInfo = await response.json();

      const latitude1 = addressInfo[0].lat;
      const longitude1 = addressInfo[0].lon;
      setStrAddress({
        latitude: latitude1,
        longitude: longitude1
      });
      setPosition({
        lat: latitude1,
        lon: longitude1,
        zoom: 16,
      })

      // Tiếp tục xử lý dữ liệu ở đây
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // console.log(position)

  const handleInputChange1 = (event) => {
    const newAddress = [...address];
    newAddress[0] = event.target.value;
    setAddress(newAddress);
  };

  // const demo = () => {

  //   setStrAddress([[], []]);
  //   fetchAdd(address[0]);
  //   setActive(!active);
  // };


  // feath api
  const fetchVietNameInfo = async () => {
    try {
      const response = await fetch("https://provinces.open-api.vn/api/?depth=3");
      const responseDataSaiGon = await fetch("https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/data/SG.json");

      if (!responseDataSaiGon.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await responseDataSaiGon.json();

      // console.log(data) 


    } catch (error) {
      console.error('Error:', error);
    }

  }
  // const provider = new OpenStreetMapProvider();

  const positionChangeHandle = (event) => {
    setPosition()
  }
  const searchAddressChangeHandle = (event) => {
    setAddress(event.target.value);
  }

  const enterKeyPressHandle = (event) => {
    if (event.key == "Enter") {
      fetchAddressInfo(address)

      console.log("enter");
    }
  }


  return (
    <Stack className="map--wrap" direction={"row"} sx={{ position: "relative" }}>
      <SideBar className="map--wrap__sidebar" />
      <MapContainer
        center={position}
        zoom={position.zoom}
        className="map--wrap__map"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <UpdateMapView coords={position} />

        <Box className="map--wrap__map__search--field">
          <Stack className="map--wrap__map__search--field__content" direction={"row"}>
            <input type="text" value={address} onChange={searchAddressChangeHandle} onKeyDown={enterKeyPressHandle} />
            <Box className="map--wrap__map__search--field__content__search--icon">
              <SearchIcon sx={{ cursor: "pointer", width: "100%", height: "100%" }} />
            </Box>
          </Stack>
        </Box>


        {/* <SearchField
          provider={provider}
          showMarker={true}
          showPopup={false}
          popupFormat={({ query, result }) => result.label}
          maxMarkers={3}
          retainZoomLevel={false}
          animateZoom={true}
          autoClose={false}
          searchLabel={"Enter Location"}
          keepResult={true}
        /> */}

        {(strAddress.latitude != "") & (strAddress.longitude != "") ? (
          <>
            <Marker
              position={[
                strAddress.latitude,
                strAddress.longitude,
              ]}
              icon={customIcon}
            />
          </>
        ) : null}

        {stations.length > 1 ?
          <>
            {stations.map((station, index) => (
              <>
                <Marker
                  key={index} // Use a unique key for each Marker (you can use station ID if available)
                  position={[station.lat, station.lon]}
                  icon={customIcon}
                />
              </>
            ))}
            {/* <RoutingMap/> */}
          </>
          : null
        }

      </MapContainer>
    </Stack>

  );
}
