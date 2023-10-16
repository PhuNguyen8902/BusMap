import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Login from './Login';
import SignUp from './SignUp';

export default function LoginAndSignUp(props) {

    const handleClose = () => {
        props.onClose();
    };

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            
            <DialogContent>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}> 
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example" variant='fullWidth'>
                                <Tab label="Sign in" value="1" />
                                <Tab label="Sign up" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Login />
                        </TabPanel>
                        <TabPanel value="2">
                            <SignUp />
                        </TabPanel>
                    </TabContext>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>


    )
}
