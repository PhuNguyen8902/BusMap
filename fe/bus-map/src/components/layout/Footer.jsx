import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {

    const navigate = useNavigate()

    return (
        <Box className="footer">
            <Stack className="footer__content" direction={"row"}>
                <Stack className="footer__content__secOne">
                    <Stack
                        direction={"row"}
                        spacing={1}
                        sx={{
                            margin: "0 0 2% 0"
                        }}>
                        <DirectionsBusIcon className='text'
                            sx={{
                                fontSize: "2.5vw",
                            }} />
                        <Typography variant="h4" className="text">
                            <strong>
                                BusApp
                            </strong>
                        </Typography>
                    </Stack>
                    <Typography className="text"
                        sx={{
                            width: "90%",
                            margin: "0 0 3% 0"
                        }}
                    >
                        BusApp is a user-friendly and reliable mobile application that simplifies your daily commute by providing real-time information about bus routes, schedules, and arrival times.
                    </Typography>
                    <Stack
                        direction={"row"}
                        spacing={1}
                        sx={{
                            width: "90%",
                            margin: "0 0 2% 0"
                        }}
                    >
                        <LocationOnIcon className='text' />
                        <Typography className="text">33, Nguyen Van Lac, Phuong 21, Quan Binh Thanh, TP. Ho Chi Minh</Typography>
                    </Stack>
                    <Typography className="text">MST: 0908091530</Typography>
                </Stack>
                <Stack
                    className="footer__content__secTwo"
                    direction={"column"}
                    spacing={3}
                >
                    <Typography
                        className="text"
                        onClick={() => { navigate("/") }}>
                        Home
                    </Typography>
                    <Typography
                        className="text"
                        onClick={() => { navigate("/aboutus") }}>
                        About Us
                    </Typography>
                    <Typography
                        className="text"
                        onClick={() => { navigate("/contact") }}>
                        Contact
                    </Typography>
                </Stack>
                <Stack className="footer__content__secThree">
                    <Typography className="text"
                        sx={{
                            marginBottom: "4%"
                        }}
                    >Contact us through</Typography>
                    <Stack direction={"row"} spacing={1}>
                        <Button 
                        sx={{
                            backgroundColor: "#555555",
                            borderRadius: "50px",
                            height: "130%",
                            width: "40%",
                            '&:hover': {
                                backgroundColor: "#10af7e"
                            }
                        }}
                        >
                            <Stack direction={"row"} spacing={1}>
                                <FacebookIcon className='text'/>
                                <Typography className='text'>Facebook</Typography>
                            </Stack>
                        </Button>
                        <Button
                        sx={{
                            backgroundColor: "#555555",
                            borderRadius: "50px",
                            height: "130%",
                            width: "40%",
                            '&:hover': {
                                backgroundColor: "#10af7e"
                            }
                        }}
                        >
                            <Stack direction={"row"} spacing={1}>
                                <TwitterIcon className='text'/>
                                <Typography className='text'>Twitter</Typography>
                            </Stack>
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}
