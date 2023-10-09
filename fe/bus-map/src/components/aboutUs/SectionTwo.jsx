import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'

export default function SectionTwo() {

    const content = "BusMap 🚌 is an intelligent transportation technology product by Phenikaa Maas, founded by Le Yen Thanh" +
        " and a group of friends with the aim of providing a solution to common difficulties and inconveniences when" +
        " using public transportation 🚦.Launched in 2013, alongside positive feedback," +
        " BusMap 🚌 has also received valuable contributions from users. With a spirit of listening, learning," +
        " and continuous innovation, the shortcomings of BusMap have been addressed, making the application increasingly refined." +
        " After much effort from the team and support from users, BusMap has gained trust 🌟 and has been a companion 👟 for millions of daily journeys."

    const navigate = useNavigate();

    return (
        <Stack className="about--us__section--two">
            <Stack className="about--us__section--two__container">
                <Stack className="about--us__section--two__container__content" spacing={8} direction={"row"}>
                    <Stack className="right">
                        <Typography sx={{ color: "white" }} variant='h3'>The story of</Typography>
                        <Typography sx={{ color: "white", marginBottom: "20%" }} variant='h3'>BusApp</Typography>
                        <Button
                            onClick={() => { navigate("../map") }}
                            sx={{
                                backgroundColor: "white",
                                borderRadius: "50px",
                                width: "50%",
                                '&:hover': {
                                    backgroundColor: "lightgray",
                                }
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#10af7e"
                                }}
                            >About Map</Typography>
                        </Button>
                    </Stack>
                    <Stack className="left">
                        <Typography sx={{ color: "white" }} variant='h6'>{content}</Typography>
                    </Stack>
                </Stack>

            </Stack>
        </Stack>
    )
}
