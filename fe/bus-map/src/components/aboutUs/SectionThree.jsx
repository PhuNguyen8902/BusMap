import React from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router'
import MovingIcon from '@mui/icons-material/Moving'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function SectionThree() {
    return (
        <Stack className="about--us__section--three">
            <Stack className="about--us__section--three__container">
                <Stack className="about--us__section--three__container__content">
                    <Stack className="top">
                        <Typography variant='h3'>The focal point of BusMap's development</Typography>
                    </Stack>
                    <Stack className="bot" direction={"row"} justifyContent={"space-between"}>
                        <Stack className="bot__right">
                            <MovingIcon
                                sx={{
                                    marginBottom: "5%",
                                    fontSize: "3vw",
                                    color: "#10af7e"
                                }}
                            />
                            <Typography variant='h5'
                                sx={{
                                    marginBottom: "3%"
                                }}
                            >Continuous improvement</Typography>
                            <Typography>BusApp always listens to valuable contributions and feedback from users, continuously updating new features for the application to deliver the best possible user experiences.</Typography>
                        </Stack>
                        <Stack className="bot__mid">
                            <ThumbUpAltIcon
                                sx={{
                                    marginBottom: "5%",
                                    fontSize: "3vw",
                                    color: "#10af7e"
                                }}
                            />
                            <Typography variant='h5'
                                sx={{
                                    marginBottom: "3%"
                                }}
                            >Accurate and reliable</Typography>
                            <Typography>BusApp aims to provide precise information about vehicle locations and arrival times, optimizing public transportation journeys for users.</Typography>
                        </Stack>
                        <Stack className="bot__left">
                            <CheckCircleIcon
                                sx={{
                                    marginBottom: "5%",
                                    fontSize: "3vw",
                                    color: "#10af7e"
                                }}
                            />
                            <Typography variant='h5'
                                sx={{
                                    marginBottom: "3%"
                                }}
                            >Community support</Typography>
                            <Typography>As one of the leading and entirely free public transportation apps, BusApp takes pride in accompanying millions of users on their journeys.</Typography>
                        </Stack>
                    </Stack>
                </Stack>

            </Stack>
        </Stack>
    )
}
