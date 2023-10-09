import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import imgOneSecOne from '../../assets/img/insideBus.jpg'
import imgMeetingOne from '../../assets/img/meetingOne.jpg'
import imgMeetingTwo from '../../assets/img/meetingTwo.jpg'


export default function SectionOne() {
    return (
        <Stack className="about--us__section--one">
            <Stack className="about--us__section--one__content">
                <Stack className="about--us__section--one__content__top" spacing={8} direction={"row"}>
                    <Stack className="about--us__section--one__content__top__right" >
                        <Typography
                            sx={{
                                color: "white",
                                marginBottom: "3%",
                            }}
                            variant='h6'
                        >About BusApp  🚌</Typography>
                        <Typography sx={{ color: "white" }} variant='h4'>We improve public transportation for enhanced convenience and efficiency through innovative solutions and technology.</Typography>
                    </Stack>
                    <Box className="about--us__section--one__content__top__left">
                        <img src={imgOneSecOne}/>
                    </Box>
                </Stack>
                <Stack className="about--us__section--one__content__bot" spacing={8} direction={"row"}>
                    <Box className="about--us__section--one__content__bot__right">
                        <img src={imgMeetingOne}/>
                    </Box>
                    <Box className="about--us__section--one__content__bot__left">
                        <img src={imgMeetingTwo}/>
                    </Box>
                </Stack>
            </Stack>
        </Stack>
    )
}
