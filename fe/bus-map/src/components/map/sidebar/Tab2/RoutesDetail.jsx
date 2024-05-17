import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import stationService from "../../../../service/stationService";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import UndoIcon from '@mui/icons-material/Undo';
import { TabContext, TabList, TabPanel } from "@mui/lab";

import RouteOneDetail from "./RouteOneDetail";
import RouteTwoDetail from "./RouteTwoDetail";
import RouteThreeDetail from "./RouteThreeDetail";
import { useDispatch } from "react-redux";
import { storeStationsOneRoute, storeStationsTwoRoute, storeStationsThreeRoute } from "../../../../store/features/storeStation/storeStationSlice";


export default function RoutesDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { location, withManyTrip, order } = useParams();

    const [lat1, lon1, lat2, lon2] = location.split("_");
    // console.log("lat1: ", lat1);

    const [selectRoute, setSelectRoute] = useState("");

    useEffect(() => {
        const fetchRoutes = async () => {

            switch (withManyTrip) {
                case "1":
                    const routeWithOnetripData = await stationService.getRouteWithOneTripData(lat1, lon1, lat2, lon2)
                    setSelectRoute(routeWithOnetripData[order]);
                    // console.log("route with one trip in routes detail: ", routeWithOnetripData[order])
                    break;
                case "2":
                    const routeWithTwotripData = await stationService.getRouteWithTwoTripData(lat1, lon1, lat2, lon2)
                    setSelectRoute(routeWithTwotripData[order]);
                    // console.log("route with two trip in routes detail: ", routeWithTwotripData[order])
                    break;
                case "3":
                    const routeWithThreetripData = await stationService.getRouteWithThreeTripData(lat1, lon1, lat2, lon2)
                    setSelectRoute(routeWithThreetripData[order]);
                    // console.log("route with three trip in routes detail: ", routeWithThreetripData[order])
                    break;
                default:
                    console.log("Error");
                    break;
            }

        }
        // get route
        fetchRoutes()
    }, [])

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const returnFromRouteDetail = () => {
        navigate(`/map/routes/${location}`)
        dispatch(storeStationsOneRoute([]));
        dispatch(storeStationsTwoRoute([]));
        dispatch(storeStationsThreeRoute([]));
    }
    return (
        <>
            {selectRoute != "" ?
                <Box sx={{ width: "100%", height: "100%", margin: "2% 0 0 0" }}>
                    <Stack direction={"row"} onClick={returnFromRouteDetail}
                        sx={{
                            width: "100%",
                            height: "5%",
                            margin: "0 0 5% 0",
                            fontSize: "1vw",
                            cursor: "pointer"
                        }}>
                        <UndoIcon
                            sx={{
                                fontSize: "1.5vw",
                                margin: "1% 2% 0 2%"
                            }} />
                        <Typography sx={{ fontSize: "1.5vw", }}>Go back</Typography>
                    </Stack>
                    <Box sx={{ width: '100%', typography: 'body1' , height: "90%"}}>
                        <TabContext value={value} sx={{ width: '100%', typography: 'body1' , height: "100%"}}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    height: "7%",
                                    marginBottom: "5%"
                                }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example" variant="fullWidth"
                                    sx={{
                                        display: "flex",
                                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                                        borderRadius: "5px",
                                        width: "80%",
                                    }}>
                                    <Tab label="Detail instruction" value="1" />
                                    <Tab label="Passed by stations" value="2" />
                                </TabList>
                            </Box>
                            {withManyTrip === "1" && (
                                <RouteOneDetail 
                                selectRoute = {selectRoute}
                                />
                            )}
                            {withManyTrip === "2" && (
                                <RouteTwoDetail 
                                selectRoute = {selectRoute}
                                />
                            )}
                            {withManyTrip === "3" && (
                                <RouteThreeDetail 
                                selectRoute = {selectRoute}
                                />
                            )}

                        </TabContext>
                    </Box>

                </Box>
                : null}
        </>
    )
}  