import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Button, Stack, Tabs, Typography } from '@mui/material';
import { Routes, useNavigate } from 'react-router';
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
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function RouteBackward(props) {

  const [value, setValue] = React.useState('1');
  const [routeDetail, setRouteDetail] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  useEffect(() => {

    const featchBackWardRoute = async () => {

      const routeDetail = props.routeDetail;
      // console.log("routeDetail in route backward: ", routeDetail)

      const routeNum = routeDetail[0].routeId.routeNum;
      // console.log("routeNum in route backward: ", routeNum);

      const RouteByRouteNumData = await routeService.getRoutesByRouteNum(routeNum);

      const RouteBackwardId = RouteByRouteNumData[1].id;
      // console.log("Route backward id: ", RouteBackwardId);

      const routeDetailData = await routeService.getRouteDetail(RouteBackwardId);
      // console.log("Route detail data: ", routeDetailData);

      setRouteDetail(routeDetailData)

    }

    featchBackWardRoute();
  }, [])

  return (
    <Box sx={{ width: '100%', height: "100%", typography: 'body1' }} className="route--detail__container__content">
      <TabContext value={value}>
        <Stack
          className="box"
          direction={"row"}
          justifyContent={"center"}
          sx={{
            width: '100%',
            height: "5%",
          }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" variant='fullWidth'
            sx={{
              display: "flex",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              borderRadius: "10px",
              width: "90%",
            }}>
            <Tab label="Station" value="1" />
            <Tab label="Information" value="2" />
          </TabList>
        </Stack>
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
                      margin: "1%"
                    }} />
                  <Typography>{station.stationId.name}</Typography>
                </Stack>
              })}
            </Stack>
            : null}
        </TabPanel>
        <TabPanel value="2" className="seconde--tab">
          {routeDetail != "" ?
            <Stack className="seconde--tab__information" spacing={2}>
              <Stack direction={"row"}>
                <FiberManualRecordIcon
                  sx={{
                    fontSize: "0.8vw",
                    color: "#10af7e",
                    margin: "1%"
                  }}
                />
                <Typography><strong>Route: </strong>{routeDetail[0].routeId.routeNum}</Typography>
              </Stack>
              <Stack direction={"row"}>
                <FiberManualRecordIcon
                  sx={{
                    fontSize: "0.8vw",
                    color: "#10af7e",
                    margin: "1%"
                  }}
                />
                <Typography><strong>Route Name: </strong>{routeDetail[0].routeId.name}</Typography>
              </Stack>
              <Stack direction={"row"}>
                <FiberManualRecordIcon
                  sx={{
                    fontSize: "0.8vw",
                    color: "#10af7e",
                    margin: "1%"
                  }}
                />
                <Typography><strong>Route Distance: </strong>{routeDetail[0].routeId.distance} km</Typography>
              </Stack>
              <Stack direction={"row"}>
                <FiberManualRecordIcon
                  sx={{
                    fontSize: "0.8vw",
                    color: "#10af7e",
                    margin: "1%"
                  }}
                />
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
              </Stack>
              <Stack direction={"row"}>
                <FiberManualRecordIcon
                  sx={{
                    fontSize: "0.8vw",
                    color: "#10af7e",
                    margin: "1%"
                  }}
                />
                <Typography><strong>Route Duration: </strong>{routeDetail[0].routeId.duration} min</Typography>
              </Stack>
              <Stack direction={"row"}>
                <FiberManualRecordIcon
                  sx={{
                    fontSize: "0.8vw",
                    color: "#10af7e",
                    margin: "1%"
                  }}
                />
                <Typography><strong>Route Backward:  </strong>
                  {routeDetail.map((station, index) => {
                    return <span key={index}>
                      <span>{station.stationId.name}</span>
                      {index !== routeDetail.length - 1 && (
                        <ArrowRightAltIcon sx={{ margin: "0% 2%", fontSize: "0.8vw" }} />
                      )}
                    </span>
                  })}
                </Typography>
              </Stack>

            </Stack>
            : null}
        </TabPanel>
      </TabContext>
    </Box>
  )
}
