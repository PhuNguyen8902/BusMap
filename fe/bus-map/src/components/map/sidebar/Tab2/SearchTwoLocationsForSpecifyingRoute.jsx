import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import stationService from "../../../../service/stationService";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import RouteWithOnetrip from "./RouteWithOneTrip";
import RouteWithTwotrip from "./RouteWithTwoTrip";
import RouteWithThreetrip from "./RouteWithThreeTrip";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import {
  storeDestination,
  storeStartLocation,
} from "../../../../store/features/storeStation/storeStationSlice";

export default function SearchTwoLocationsForSpecifyingRoute() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [startLocation, setStartLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [isEnter, setIsEnter] = useState(false);
  // console.log("check enter location: ", isEnter);

  //valuables pass to props
  const [lat1, setLat1] = useState("");
  // const [lon1, setLon1] = useState("")
  // const [lat2, setLat2] = useState("")
  // const [lon2, setLon2] = useState("")

  const { location } = useParams();

  const startLocationHandle = (event) => {
    setStartLocation(event.target.value);
    setIsEnter(false);
  };

  const destinationLocationHandle = (event) => {
    setDestinationLocation(event.target.value);
    setIsEnter(false);
  };

  const enterHandle = (event) => {
    if (event.key === "Enter") {
      if (startLocation !== "" && destinationLocation !== "") {
        console.log("enter");
        // console.log(destinationLocation);
        setIsEnter(true);
      }
    }
  };

  useEffect(() => {
    const fetchRouteWithOnetrip = async () => {
      if (startLocation != "" && destinationLocation != "" && isEnter == true) {
        const startLocationApiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          startLocation
        )}&format=json`;
        const destinationLocationApiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          destinationLocation
        )}&format=json`;
        // console.log("startLocation: ", startLocationApiUrl);
        // console.log("destinationLocation: ", destinationLocationApiUrl);

        try {
          const response1 = await fetch(startLocationApiUrl);
          const addressInfo1 = await response1.json();
          const response2 = await fetch(destinationLocationApiUrl);
          const addressInfo2 = await response2.json();

          const latitude1 = addressInfo1[0].lat;
          const longitude1 = addressInfo1[0].lon;
          const latitude2 = addressInfo2[0].lat;
          const longitude2 = addressInfo2[0].lon;


          dispatch(
            storeStartLocation({
              lat: latitude1,
              lon: longitude1,
            })
          );
          dispatch(
            storeDestination({
              lat: latitude2,
              lon: longitude2,
            })
          );

          setLat1(latitude1);
          // setLon1(longitude1)
          // setLat2(latitude2)
          // setLon2(longitude2)

          navigate(
            `/map/routes/${latitude1}_${longitude1}_${latitude2}_${longitude2}`
          );

        
        } catch (error) {
          //check err
          console.error("Error fetching data:", error);
        }
      } else if (location != undefined) {
        try {
          navigate(`/map/routes/${location}`);
        } catch (error) {
          //check err
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchRouteWithOnetrip();
  }, [isEnter]);

  // Tabs
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="sidebar__seconde--tab__navigate">
      <Stack className="sidebar__seconde--tab__navigate__content">
        <Stack className="sidebar__seconde--tab__navigate__content__search--field">
          <Box className="search--start--location">
            <input
              type="text"
              placeholder="Start location"
              value={startLocation}
              onChange={startLocationHandle}
              onKeyDown={enterHandle}
            />
          </Box>
          <Box className="search--destination--location">
            <input
              type="text"
              placeholder="Destination location"
              value={destinationLocation}
              onChange={destinationLocationHandle}
              onKeyDown={enterHandle}
            />
          </Box>
        </Stack>
        <Box className="sidebar__seconde--tab__navigate__content__routes">
          <Box sx={{ width: "100%", height: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  variant="fullWidth"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  <Tab label="One Trip" value="1" />
                  <Tab label="Two Trip" value="2" />
                  <Tab label="Three Trip" value="3" />
                </TabList>
              </Box>
              {lat1 != "" || location != undefined ? (
                <>
                  <TabPanel value="1" className="tab">
                    <RouteWithOnetrip
                    // lat1 = {lat1}
                    // lon1 = {lon1}
                    // lat2 = {lat2}
                    // lon2 = {lon2}
                    />
                  </TabPanel>
                  <TabPanel value="2" className="tab">
                    <RouteWithTwotrip
                    // lat1 = {lat1}
                    // lon1 = {lon1}
                    // lat2 = {lat2}
                    // lon2 = {lon2}
                    />
                  </TabPanel>
                  <TabPanel value="3" className="tab">
                    <RouteWithThreetrip
                    // lat1 = {lat1}
                    // lon1 = {lon1}
                    // lat2 = {lat2}
                    // lon2 = {lon2}
                    />
                  </TabPanel>
                </>
              ) : null}
            </TabContext>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
