import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router';
import LoginAndSignUp from './LoginAndSignUp';



function MainHeader(props) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const navigate = useNavigate()
    return (
        <Stack
            className="main--header"
            direction={"row"}
            justifyContent={"space-evenly"}
            sx={{
                ...(props.changeTheme === "white" && {
                    backgroundColor: "white",
                    color: "#10af7e",
                  })
            }}
        >
            <Stack className="main--header__logo"
                direction={"row"}
                spacing={1}
                onClick={() => { navigate("/home") }}>
                <DirectionsBusIcon
                    sx={{
                        fontSize: "2.5vw",
                    }} />
                <Typography sx={{ fontSize: "2vw" }} >BusApp</Typography>
            </Stack>
            <Stack className="main--header__link" direction={"row"} spacing={10}>
                <Typography
                    sx={{
                        fontSize: "1.5vw",
                        cursor: "pointer",
                    }}
                    onClick={() => { navigate("/home") }}>Home</Typography>
                <Typography
                    sx={{
                        fontSize: "1.5vw",
                        cursor: "pointer",
                    }}
                    onClick={() => { navigate("/home/aboutus") }}>About us</Typography>
                <Typography
                    sx={{
                        fontSize: "1.5vw",
                        cursor: "pointer",
                    }}
                    onClick={() => { navigate("/home/contact") }}>Contact</Typography>
            </Stack>
            <Button 
            variant="outlined" 
            onClick={handleClickOpen}
            sx={{
                color: "white",
                border: "1px solid white",
                ...(props.changeTheme === "white" && {
                    border: "1px solid #10af7e",
                    color: "#10af7e",
                  }),
                fontSize: "1vw",
                "&:hover":{
                    border: "1px solid white",
                }
            }}>
            Login
            </Button>
            <LoginAndSignUp 
            open={open}
            onClose={handleClose}
            />
        </Stack>
    );
}
export default MainHeader;