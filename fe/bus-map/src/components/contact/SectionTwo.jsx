import { Card, Stack, Typography } from '@mui/material'
import React from 'react'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';

export default function SectionTwo() {
    return (
        <Stack className='contact__section--two'>
            <Stack className='contact__section--two__container'>
                <Card className='contact__section--two__container__card'>
                    <PhoneInTalkIcon
                        sx={{
                            fontSize: "3vw",
                            marginBottom: "4%"
                        }}
                    />
                    <Typography variant='h6'>0908091530</Typography>
                </Card>
                <Card className='contact__section--two__container__card'>
                    <LocationOnIcon
                        sx={{
                            fontSize: "3vw",
                            marginBottom: "4%"
                        }}
                    />
                    <Typography variant='h6'>33, Nguyen Van Lac, HCM</Typography>
                </Card>
                <Card className='contact__section--two__container__card'>
                    <EmailIcon
                        sx={{
                            fontSize: "3vw",
                            marginBottom: "4%"
                        }}
                    />
                    <Typography variant='h6'>2051052095phan@ou.edu.vn</Typography>
                </Card>
            </Stack>
        </Stack>
    )
}
