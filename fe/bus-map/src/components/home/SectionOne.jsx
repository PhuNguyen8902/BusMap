import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import imgOneSec1 from '../../assets/img/picOneOfSec1.png'
import imgTwoSec1 from '../../assets/img/picTwoOfSec1.png'



export default function SectionOne() {
    return (
        <Stack className="section--one" justifyContent={"center"} direction={"row"}>
            <Stack className="section--one__content" direction={"row"} spacing={8}>
                <Stack className="section--one__content__right--content">
                    <Typography variant='h3' sx={{marginBottom: "5%"}}>BusMap helps you use public transportation conveniently, quickly, and cost-effectively</Typography>
                    <Stack className="section--one__content__right--content__sub" direction={"row"} spacing={2} justifyContent={"space-evenly"}>
                        <Typography className="text" variant="h5">Through features such as 📍 route finding 📝 route lookup 🕛 real-time vehicle tracking 🚌 multimodal transportation, and 👍 quality rating</Typography>
                        <Box className="wrap--pic">
                            <img src={imgTwoSec1}/>
                        </Box>
                    </Stack>
                </Stack>
                <Box className="section--one__content__left--content">
                    <img src={imgOneSec1}/>
                </Box>
            </Stack>
        </Stack>
    )
}
