import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SearchRoute from './Tab1/SeachRoute';
import SearchTwoLocationsForSpecifyingRoute from './Tab2/SearchTwoLocationsForSpecifyingRoute';
import { useSelector } from 'react-redux';
import RouteDetail from './Tab1/RouteDetail';
import { useNavigate, useParams } from 'react-router';
import RoutesDetail from './Tab2/RoutesDetail';
import { useState } from 'react';
import { useEffect } from 'react';

export default function SideBar() {

    // Tabs
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const navigate = useNavigate()

    //
    const routeId = useSelector((state) => state.storeRoute.routeId);
    // console.log("routeId in side bar: ", routeId);


    const {location, withManyTrip} = useParams();
    // console.log("with many trip: ", withManyTrip);

    useEffect(() => {
        if (location !== undefined) {
          setValue('2'); // Set the value to '2' if location is defined
        }
      }, [location]);
    
    return (
        <Box className="map--wrap__sidebar__container" 
        sx={{ backgroundColor: "white" }}
        >
        {routeId == null && withManyTrip == undefined ? 
            <Box sx={{ width: '100%', typography: 'body1' }} className="map--wrap__sidebar__container__content">
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example"  variant='fullWidth'>
                            <Tab label="Search Route" value="1" onClick={() => {navigate("/map")}} />
                            <Tab label="Navigate" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" className="sidebar__first--tab" >
                        <SearchRoute />
                    </TabPanel>
                    <TabPanel value="2" className="sidebar__seconde--tab">
                        <SearchTwoLocationsForSpecifyingRoute 
                        />
                    </TabPanel>
                </TabContext>
            </Box>
            : 
            <>
                {withManyTrip != undefined ? 
                <RoutesDetail />
                : 
                <RouteDetail />
                }
            </>
            
        }
            
        </Box>
    )
}