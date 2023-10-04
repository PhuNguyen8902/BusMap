import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import stationService from "../../../../service/stationService";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import RouteWithOnetrip from "./RouteWithOneTrip";
import RouteWithTwotrip from "./RouteWithTwoTrip";
import RouteWithThreetrip from "./RouteWithThreeTrip";

export default function SearchTwoLocationsForSpecifyingRoute() {

    const [startLocation, setStartLocation] = useState("");
    const [destinationLocation, setDestinationLocation] = useState("");
    const [isEnter, setIsEnter] = useState(false);

    const startLocationHandle = (event) => {
        setStartLocation(event.target.value);
        setIsEnter(false)
    }

    const destinationLocationHandle = (event) => {
        setDestinationLocation(event.target.value)
        setIsEnter(false)
    }

    const enterHandle = (event) => {
        if (event.key == "Enter") {
            if (startLocation != "" && destinationLocation != "") {
                console.log("enter");
                setIsEnter(true)
            }
        }
    }

    useEffect(() => {
        const fetchRouteWithOnetrip = async () => {
            if (startLocation != "" && destinationLocation != "" && isEnter == true) {
                const startLocationApiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                    startLocation)}&format=json`;
                const destinationLocationApiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                    destinationLocation)}&format=json`;
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

                    // get route with one trip
                    const routeWithOnetripData = await stationService.getRouteWithOneTripData(latitude1, longitude1, latitude2, longitude2)
                    console.log("route with one trip: ", routeWithOnetripData);

                    // get route with t2o trip
                    const routeWithTwotripData = await stationService.getRouteWithTwoTripData(latitude1, longitude1, latitude2, longitude2)
                    console.log("route with two trips: ", routeWithTwotripData);

                    // get route with three trip
                    const routeWithThreetripData = await stationService.getRouteWithTwoTripData(latitude1, longitude1, latitude2, longitude2)
                    console.log("route with three trips: ", routeWithThreetripData);

                } catch (error) {
                    //check err
                    console.error("Error fetching data:", error);
                }

            }
        }
        fetchRouteWithOnetrip()
    }, [isEnter])

    // Tabs
    const [value, setValue] = useState('1');

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
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="123">
                                <TabList onChange={handleChange} aria-label="lab API tabs example" className="1236" variant='fullWidth'
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "0",
                                    margin: "0",
                                }}>
                                    <Tab label="One Trip" value="1" />
                                    <Tab label="Two Trip" value="2" />
                                    <Tab label="Three Trip" value="3" />
                                </TabList>
                            </Box>
                            {startLocation != "" && destinationLocation != "" && isEnter == true ?
                                <>
                                    <TabPanel value="1">
                                        <RouteWithOnetrip />
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <RouteWithTwotrip />
                                    </TabPanel>
                                    <TabPanel value="3">
                                        <RouteWithThreetrip />
                                    </TabPanel>
                                </>
                                : null
                            }

                        </TabContext>
                    </Box>


                </Box>
            </Stack>
        </Box>
    )
}