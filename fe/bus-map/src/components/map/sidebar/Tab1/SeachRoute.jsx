import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate, useParams } from "react-router";
import routeService from "../../../../service/routeService";
import { useDispatch } from "react-redux";
import { storeRouteId } from "../../../../store/features/storeRoute/storeRouteSlice";
export default function SearchRoute() {

    const [searchRoute, setSearchRoute] = useState("");
    const [routes, setRoutes] = useState("");

    const navigate = useNavigate();

    const { routeId } = useParams();
    // console.log("routeId in Search Route: ", routeId);

    // if there all routeId in params it will update to routeId store in redux
    const dispatch = useDispatch();
    if(routeId != undefined)
        dispatch(storeRouteId(routeId));

    const searchRouteChangeHandle = (event) => {
        setSearchRoute(event.target.value)
        // console.log(searchRoute)
    }



    useEffect(() => {
        const fetchRouteData = async () => {
            const routeData = await routeService.getOneWayRoute(searchRoute);
            console.log("route data in search route: ", routeData);
            setRoutes(routeData)
        }
        fetchRouteData()
    }, [searchRoute])


    return (
        <Box className="sidebar__first--tab__search--route">
            <Stack className="sidebar__first--tab__search--route__content">
                        <Box className="sidebar__first--tab__search--route__content__search--field">
                            <input
                                type="text"
                                value={searchRoute}
                                placeholder="Search route"
                                onChange={searchRouteChangeHandle}
                            />
                        </Box>
                        <Box className="sidebar__first--tab__search--route__content__routes">
                            {routes != "" ?
                                <ul>
                                    {routes.map((route, index) => {
                                        // console.log(route.name);
                                        return <li key={index} onClick={() => {navigate(`/map/route/${route.id}`)}}>
                                            <Stack direction={"row"}
                                                sx={{
                                                    justifyContent: "space-around",
                                                    alignItems: "center",
                                                    height: "100%"
                                                }}>
                                                <Box className="route-icon">
                                                    <DirectionsBusIcon sx={{ fontSize: "2.5vw" }} />
                                                </Box>
                                                <Box className="route-content">
                                                    <Typography sx={{ fontSize: "1.3vw", color: "#10af7e" }}>Route {route.routeNum}</Typography>
                                                    <Typography sx={{ fontSize: "0.9vw" }}>{route.name}</Typography>
                                                    <Box>
                                                        <Typography sx={{ fontSize: "1.2vw" }}>
                                                            <AccessTimeIcon sx={{ fontSize: "1vw", margin: "0 0.2vw 0 0  " }} />
                                                            {route.startTime[0]}:{route.startTime[1]}
                                                            {route.startTime[1].toString().length < 2 ?
                                                                0
                                                                : null}
                                                            -
                                                            {route.endTime[0]}:{route.endTime[1]}
                                                            {route.endTime[1].toString().length < 2 ?
                                                                0
                                                                : null}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Stack>
                                        </li>
                                    })}
                                </ul>
                                :
                                null
                            }
                        </Box>
            </Stack>
        </Box>
    )
}