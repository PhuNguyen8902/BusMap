import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Button, Stack, Tabs, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { storeRouteId } from '../../../../store/features/storeRoute/storeRouteSlice';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import UndoIcon from '@mui/icons-material/Undo';
import { useEffect } from 'react';
import { getData } from '../../../../util/fetchApi';
import routeService from '../../../../service/routeService';
import { useState } from 'react';
import { setStations } from '../../../../store/features/storeRoute/storeMakersSlice';
import RouteForward from './RouteForward';
import RouteBackward from './RouteBackward';


export default function RouteDetail() {
    const [value1, setValue1] = useState('1');
    const [routeDetail, setRouteDetail] = useState("");
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const navigate = useNavigate();

    const routeId = useSelector((state) => state.storeRoute.routeId);
    const dispatch = useDispatch();

    const handleChange1 = (event, newValue) => {
        setValue1(newValue);
    };

    const clickReturnHandle = () => {
        dispatch(storeRouteId(null))
        dispatch(setStations([]))
        navigate("/map")
    }

    useEffect(() => {
        const fetchRoute = async () => {
            const routeData = await routeService.getRouteDetail(routeId);
            // console.log("route detail data: ", routeData)
            setRouteDetail(routeData);
        }
        fetchRoute();
    }, [])

    return (
        <Box className="route--detail">
            <Stack className="route--detail__return--btn" direction={"row"}>
                <Button onClick={clickReturnHandle}
                    sx={{
                        color: "black",
                        width: "30%"
                    }}>
                    <UndoIcon
                        sx={{
                            margin: "0 3%"
                        }}
                    />
                    <Typography variant='h6'>back</Typography>
                </Button>
            </Stack>
            <Box className="route--detail__container">
                <Box
                    sx={{
                        width: '100%',
                        height: "100%",
                        typography: 'body1'
                    }}>
                    <TabContext value={value}>
                        <Stack 
                        direction={"row"}
                        justifyContent={"center"}
                        sx={{
                            width: '100%',
                            height: "5%",
                        }}>
                            <TabList
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                                variant='fullWidth'
                                sx={{
                                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                                    width: "80%",
                                    height: "80%",
                                    borderRadius: "10px"
                                }}
                            >
                                <Tab label="Forward" value="1" />
                                <Tab label="Backward" value="2" />
                            </TabList>
                        </Stack> 
                        <TabPanel value="1" 
                            sx={{
                                width: "100%",
                                height: "95%",
                            }}> 
                            {routeDetail != "" ?
                                <RouteForward
                                    routeDetail={routeDetail}
                                />
                                : null
                            }
                        </TabPanel>
                        <TabPanel value="2"
                            sx={{
                                width: "100%",
                                height: "95%",
                            }}
                        >
                            {routeDetail != "" ?
                                <RouteBackward
                                    routeDetail={routeDetail}
                                />
                                : null
                            }
                        </TabPanel>
                    </TabContext>
                </Box>
                {/* <Box sx={{ width: '100%', height: "100%", typography: 'body1' }} className="route--detail__container">
                    <TabContext value={value1}>
                        <Box className="box"
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}>
                            <TabList onChange={handleChange1} aria-label="lab API tabs example" variant='fullWidth'
                                sx={{
                                    display: "flex",
                                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                                    borderRadius: "5px",
                                    width: "80%",
                                }}>
                                <Tab label="Station" value="1" />
                                <Tab label="Information" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1" className="first--tab">
                            {routeDetail != "" ?
                                <Stack className="first--tab__stations">
                                    {routeDetail.map((station, index) => {
                                        return <Stack key={index} direction={"row"}
                                            sx={{
                                                marginBottom: "1vh"
                                            }}>
                                            <FiberManualRecordIcon
                                                sx={{
                                                    fontSize: "0.8vw",
                                                    color: "#10af7e",
                                                    margin: "2%"
                                                }} />
                                            <Typography>{station.stationId.name}</Typography>
                                        </Stack>
                                    })}
                                </Stack>
                                : null}
                        </TabPanel>
                        <TabPanel value="2" className="seacond--tab">
                            {routeDetail != "" ?
                                <Stack className="first--tab__information" spacing={2}>
                                    <Typography><strong>Route: </strong>{routeDetail[0].routeId.routeNum}</Typography>
                                    <Typography><strong>Route Name: </strong>{routeDetail[0].routeId.name}</Typography>
                                    <Typography><strong>Route Distance: </strong>{routeDetail[0].routeId.distance} km</Typography>
                                    <Typography>
                                        <strong>Time: </strong>
                                        {routeDetail[0].routeId.startTime[0]}:{routeDetail[0].routeId.startTime[1]}
                                        {routeDetail[0].routeId.startTime[1].toString().length < 2 ?
                                            0
                                            : null}
                                        -
                                        {routeDetail[0].routeId.endTime[0]}:{routeDetail[0].routeId.endTime[1]}
                                        {routeDetail[0].routeId.endTime[1].toString().length < 2 ?
                                            0
                                            : null}
                                    </Typography>
                                    <Typography><strong>Route Duration: </strong>{routeDetail[0].routeId.duration} min</Typography>

                                </Stack>
                                : null}
                        </TabPanel>
                    </TabContext>
                </Box> */}
            </Box>
        </Box>
    )
}