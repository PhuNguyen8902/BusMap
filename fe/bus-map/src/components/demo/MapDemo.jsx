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
import { Icon, divIcon, point } from "leaflet";
import L from "leaflet";
import RoutingDemo from "./RoutingDemo";

export default function MapDemo() {
  //   const address = "62 Gò Vấp, Việt Nam";
  //   const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
  //     address
  //   )}&format=json`;

  //   fetch(apiUrl)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.length > 0) {
  //         const latitude = data[0].lat;
  //         const longitude = data[0].lon;
  //         console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  //       } else {
  //         console.log("Address not found.");
  //       }
  //     })
  //     .catch((error) => console.error(error));
  const position = [10.8231, 106.6297];
  const minLatitude = 10.7;
  const minLongitude = 106.5;
  const maxLatitude = 10.9;
  const maxLongitude = 106.7;
  const customIcon = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconUrl: require("../../assets/img/mark.png"),
    iconSize: [38, 38], // size of the icon
  });

  // // custom cluster icon
  // const createClusterCustomIcon = function (cluster) {
  //   return new divIcon({
  //     html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
  //     className: "custom-marker-cluster",
  //     iconSize: point(33, 33, true),
  //   });
  // };
  // const markers = [
  //   {
  //     geocode: [10.8231, 106.6297],
  //     popUp: "Hello, I am pop up 1",
  //   },
  //   {
  //     geocode: [10.8241, 106.6297],
  //     popUp: "Hello, I am pop up 2",
  //   },
  //   {
  //     geocode: [10.8251, 106.6297],
  //     popUp: "Hello, I am pop up 3",
  //   },
  // ];

  // const [position2, setPosition] = useState([0, 0]);

  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position2) => {
  //         setPosition([position2.coords.latitude, position2.coords.longitude]);
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //   } else {
  //     console.error("Geolocation is not available.");
  //   }
  // }, []);
  // const [waypoints, setWaypoints] = useState([]);
  // const map = useMap();

  // const handleRouting = () => {
  //   if (waypoints.length === 2) {
  //     const [from, to] = waypoints;
  //     map.eachLayer((layer) => {
  //       if (layer instanceof Routing) {
  //         map.removeLayer(layer);
  //       }
  //     });

  //     Routing.control({
  //       waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
  //     }).addTo(map);
  //   }
  // };
  const [active, setActive] = useState(false);  
  const [address, setAddress] = useState(["", ""]);

  const [strAddress, setStrAddress] = useState([[], []]);
  // const [active2, setActive2] = useState(false);

  // const [demoStr, setDemoStr] = useState(["", ""]);

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
    // await fetch(apiUrl)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.length > 0) {
    //       const latitude = data[0].lat;
    //       const longitude = data[0].lon;
    //       // if (stt == 0) {
    //       //   // setStrAddress[0]({ latitude }, { longitude });
    //       //   let arr = strAddress[1];
    //       //   setStrAddress([[{ latitude }, { longitude }], arr]);
    //       //   console.log("vao 0");
    //       // } else if (stt == 1) {
    //       //   let arr2 = strAddress[0];
    //       //   setStrAddress([arr2, [{ latitude }, { longitude }]]);
    //       //   console.log("vao 1");
    //       // }
    //       // console.log(strAddress);
    //     } else {
    //       console.log("Address not found.");
    //     }
    //   })
    //   .catch((error) => console.error(error));
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
  // const handleInputChange3 = (event) => {
  //   const newAddress = [...demoStr];
  //   newAddress[0] = event.target.value;
  //   setDemoStr(newAddress);
  // };
  // const handleInputChange4 = (event) => {
  //   const newAddress = [...demoStr];
  //   newAddress[1] = event.target.value;
  //   setDemoStr(newAddress);
  // };

  const demo = () => {
    // setStrAddress([["12312312", "123123123"], address[1]]);
    // console.log(strAddress);
    // console.log(address[0]);
    setStrAddress([[], []]);
    fetchAdd(address[0], address[1]);
    // fetchAdd(address[1], 1);
    setActive(!active);
  };
  // const demo2 = () => {
  //   console.log(demoStr);
  //   setActive2(true);
  // };
  //   Latitude: 10.8419232, Longitude: 106.6436252
  //  Latitude: 10.9120766, Longitude: 106.647061
  return (
    <>
      <input type="text" value={address[0]} onChange={handleInputChange1} />
      <input type="text" value={address[1]} onChange={handleInputChange2} />

      <button onClick={demo}>click di</button>
      {/* <input type="text" value={demoStr[0]} onChange={handleInputChange3} />
      <input type="text" value={demoStr[1]} onChange={handleInputChange4} />

      <button onClick={demo2}>xem dia chi</button> */}

      <MapContainer
        center={position}
        zoom={10}
        style={{ height: "400px", width: "100%" }}
        
        // maximum toa do khong gian duong xem
        // maxBounds={[
        //   [minLatitude, minLongitude],
        //   [maxLatitude, maxLongitude],
        // ]}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* <Marker position={demoStr} icon={customIcon}></Marker> */}
        {/* {active2 ? <Marker position={demoStr} icon={customIcon} /> : null} */}
        {/* <Marker position={position} icon={customIcon} /> */}
        {/* <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        > */}
        {/* <Marker position={position2}>
          <Popup>Your current location</Popup>
        </Marker> */}
        {/* Mapping through the markers */}
        {/*           
     {markers.map((marker) => (
            <Marker position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
    // ))}
           */}
        {/* <button
          onClick={handleRouting}
          disabled={waypoints.length !== 2}
        ></button>
        {waypoints.length === 2 && (
          <Routing
            waypoints={[
              L.latLng(waypoints[0][0], waypoints[0][1]),
              L.latLng(waypoints[1][0], waypoints[1][1]),
            ]}
          />
        )} */}
        {/* <RoutingDemo /> */}
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
            <RoutingDemo address={strAddress} />
          </>
        ) : null}
        {/* </MarkerClusterGroup> */}
      </MapContainer>
    </>
    // <>
    //   <button onClick={demo}>click di</button>

    //   <MapContainer
    //     doubleClickZoom={false}
    //     id="mapId"
    //     zoom={14}
    //     center={[33.5024, 36.2988]}
    //   >
    //     <TileLayer
    //       url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
    //       attribution="Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri"
    //     />
    //     {active ? <RoutingDemo /> : null}
    //     {/* <RoutingDemo /> */}
    //   </MapContainer>
    // </>
  );
}
