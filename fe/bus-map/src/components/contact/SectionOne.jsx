import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import imgBus from "../../assets/img/pngwing.com.png"
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';

export default function SectionOne() {
    return (
        <Stack className='contact__section--one'>
            <Stack className='contact__section--one__container'>
                <Stack className='contact__section--one__container__content'>
                    <Stack className='right'>
                        <Typography variant='h3' sx={{ marginBottom: "3%" }}>Contact us</Typography>
                        <Typography variant='h6'>Any feedback or suggestions regarding BusMap, or anything you'd like to share, please feel free to do so here.</Typography>
                    </Stack>
                    <Box className='left'>
                       
                    </Box>
                </Stack>
            </Stack>
        </Stack>
    )
}
