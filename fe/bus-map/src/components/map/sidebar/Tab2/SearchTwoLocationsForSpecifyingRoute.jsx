import { Box, Stack } from "@mui/material";

export default function SearchTwoLocationsForSpecifyingRoute(){
    return (
        <Box className="sidebar__seconde--tab__navigate">
            <Stack className="sidebar__seconde--tab____navigate__content">
                <Stack className="sidebar__seconde--tab__navigate__content__search--field">
                    <Box className="search--start--location">
                        <input 
                            type="text" 
                            placeholder="Start location"
                        />
                    </Box>
                    <Box className="search--destination--location">
                        <input 
                            type="text" 
                            placeholder="Destination location"
                        />
                    </Box>
                </Stack>
                <Box className="sidebar__seconde--tab__navigate__content__routes">
                    <h1>halo nina</h1>
                </Box>
            </Stack>
        </Box>
    )
}