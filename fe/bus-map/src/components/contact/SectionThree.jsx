import { Button, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

export default function SectionThree() {
    return (
        <Stack className='contact__section--three'>
            <Stack className='contact__section--three__container' spacing={5} direction={"row"}>
                <Stack className='right'>
                    <Stack className='right__content'>
                        <Typography variant='h3'
                            sx={{
                                color: "white"
                            }}
                        >Any feedback or suggestions about BusMap 🚌, or anything you would like, please share them here!</Typography>
                    </Stack>
                </Stack>
                <Stack className='left'>
                    <Stack className='left__content' spacing={5} direction={"column"}>
                        <TextField
                            placeholder="Write here..."
                            multiline
                            rows={20}
                            maxRows={20}
                            sx={{
                                backgroundColor: "rgb(252, 249, 243)",
                            }}
                        />
                        <Button variant='contained'
                            sx={{
                                width: "30%",
                                backgroundColor: "#10af7e",
                            }}
                        >Submit</Button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}
