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
import SideBar from "./SideBar";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Autocomplete, IconButton, Input, InputBase, Paper, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Form } from "react-router-dom";

export default function Map() {

  const position = [10.8231, 106.6297];
  const minLatitude = 10.7;
  const minLongitude = 106.5;
  const maxLatitude = 10.9;
  const maxLongitude = 106.7;
  const customIcon = new Icon({
    iconUrl: require("../../assets/img/mark.png"),
    iconSize: [38, 38], // size of the icon
  });


  const [active, setActive] = useState(false);
  const [address, setAddress] = useState(["", ""]);

  const [strAddress, setStrAddress] = useState([[], []]);


  const fetchAdd = async (ar, ar2) => {
    // const ar = "62 Gò Vấp, Việt Nam";
    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      ar
    )}&format=json`;
    const apiUrl2 = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      ar2
    )}&format=json`;
    console.log(apiUrl);
    try {
      const response1 = await fetch(apiUrl);
      const data1 = await response1.json();

      const response2 = await fetch(apiUrl2);
      const data2 = await response2.json();
      if ((data1.length > 0) & (data2.length > 0)) {
        const latitude1 = data1[0].lat;
        const longitude1 = data1[0].lon;
        const latitude2 = data2[0].lat;
        const longitude2 = data2[0].lon;
        setStrAddress([
          [{ latitude1 }, { longitude1 }],
          [{ latitude2 }, { longitude2 }],
        ]);
      }
      // Tiếp tục xử lý dữ liệu ở đây
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  };
  const handleInputChange1 = (event) => {
    const newAddress = [...address];
    newAddress[0] = event.target.value;
    setAddress(newAddress);
  };

  const handleInputChange2 = (event) => {
    const newAddress = [...address];
    newAddress[1] = event.target.value;
    setAddress(newAddress);
  };

  const demo = () => {

    setStrAddress([[], []]);
    fetchAdd(address[0], address[1]);
    setActive(!active);
  };


  // feath api
  const fetchVietNameInfo = async () =>{
    try {
      const response = await fetch("https://provinces.open-api.vn/api/?depth=3");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();

      for(let i = 0; i < data.length; i++){
        if(data[i].name == "Thành phố Hồ Chí Minh"){

          // get all of districts
          let districts = [] 
          districts = data[i].districts

          for(let j = 0; j < districts.length; j++){
            console.log(districts[j])
          }
        } 
      }


    } catch (error) {
      console.error('Error:', error);
    }

  }
  fetchVietNameInfo();
  const provider = new OpenStreetMapProvider();


  return (
    <Stack className="map--wrap" direction={"row"} sx={{ position: "relative" }}>
      <SideBar />
      <MapContainer
        center={position}
        zoom={10}
        className="map"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

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

        <Box
          sx={{
            position: "absolute",
            backgroundColor: "White",
            top: "2vh",
            right: "1vw",
            width: "60%",
            height: "10%",
            border: "1px solid lightgray",
            borderRadius: "10px",
            zIndex: "600"
          }}
        >
          <Box component={"form"}>

            {/* <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={top100Films.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search input"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            /> */}
            
          </Box>
        </Box>

        {(strAddress[1].length > 0) & (strAddress[0].length > 0) ? (
          <>
            <Marker
              position={[
                strAddress[0][0].latitude1,
                strAddress[0][1].longitude1,
              ]}
              icon={customIcon}
            />
            <Marker
              position={[
                strAddress[1][0].latitude2,
                strAddress[1][1].longitude2,
              ]}
              icon={customIcon}
            />
          </>
        ) : null}
      </MapContainer>
    </Stack>

  );
}
