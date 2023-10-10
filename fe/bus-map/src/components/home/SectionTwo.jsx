import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import Carousel from 'react-material-ui-carousel'
import imgBanner from "../../assets/img/_128732544_gettyimages-1247162782.jpg"


export default function SecTionTwo() {

    const items = [
        {
            name: "Finding the Optimal Routes for Your Journeys",
            description: "BusApp helps you choose the most reasonable way to travel between any two locations" +
                " through features that display bus stops, estimate distance and time for walking and driving," +
                " combined with other transportation options such as technology-based motorbike taxis.",
            img: {imgBanner}
        },
        {
            name: "Detailed information for each route",
            description: "Obtaining detailed information for each route is essential for efficient and informed" + 
            " travel. Our platform provides comprehensive data on every transportation path, including bus routes," +
            " train lines, and walking directions. With this wealth of information, you can plan your journeys with confidence," + 
            " knowing the exact details of each route's stops, distances, and estimated travel times.",
            img: {imgBanner}
        },
        {
            name: "Providing Feedback on Bus Service Quality.",
            description: "You can send feedback on the quality of the bus service to the Operations Center to improve service quality",
            img: {imgBanner} 
        },
    ]

    return (
        <Stack className="section--two" justifyContent={"center"} direction={"row"}>
            <Carousel 
            className="section--two__carousel"
            navButtonsAlwaysInvisible = "false"
            animation = "fade"
            fullHeightHover = "false"
            >
                {
                    items.map((item, index) => {
                        return (
                            <Stack 
                            key={index}
                            className = "section--two__carousel__item"
                            direction={"row"}
                            sx={{
                               overflow: "visible",
                            }}>
                                <Box>
                                </Box>
                                <Stack>
                                    <Typography variant='h4' sx={{marginBottom: "2%"}}>
                                        <strong>
                                            {item.name}
                                        </strong>
                                    </Typography>
                                    <Typography variant='h5'>{item.description}</Typography>
                                </Stack>
                            </Stack>
                        )
                    })
                }
            </Carousel>
        </Stack>
    )
}
