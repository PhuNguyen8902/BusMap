import { Box, Stack } from "@mui/material";
import { useState } from "react";


export default function SearchRoute(){

    const[route, setRoute] = useState("");

    const searchRouteChangeHandle = (event) =>{
        setRoute(event.target.value)
    }

    const enterKeyPressHandle = (event) =>{
        if(event.key == "Enter"){

            console.log("enter")
        }
    }

    return (
        <Box className="sidebar__first--tab__search--route">
            <Stack className="sidebar__first--tab__search--route__content">
                <Box className="sidebar__first--tab__search--route__content__search--field">
                    <input 
                        type="text" 
                        value={route}
                        placeholder="Search route" 
                        onChange={searchRouteChangeHandle} 
                        onKeyDown={enterKeyPressHandle}
                    />
                </Box>
                <Box className="sidebar__first--tab__search--route__content__routes">
                    <h1>halo nina</h1>
                </Box>
            </Stack>
        </Box>
    )
}