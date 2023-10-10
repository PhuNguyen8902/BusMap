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

export default function RouteForward(props) {

  const routeDetail = props.routeDetail
  // console.log("routeDetail in route forward: ", routeDetail)

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <Box sx={{ width: '100%', height: "100%", typography: 'body1' }} className="route--detail__container__content">
      <TabContext value={value}>
        <Stack
          className="box"
          direction={"row"}
          justifyContent={"center"}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" variant='fullWidth'
            sx={{
              display: "flex",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              borderRadius: "10px",
              width: "100%",
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
    </Box>
  )
}
