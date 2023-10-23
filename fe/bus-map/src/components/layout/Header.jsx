import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import { CardHeader, Typography, Avatar, Box, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../store/features/auth/authSlice";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import LoginAndSignUp from './LoginAndSignUp';
import { useNavigate } from "react-router";



export default function Header(props) {

  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);
  
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth)
  // console.log("auth: ", auth)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openProfile = Boolean(anchorEl);
  // console.log(openProfile)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorEl(false);
  };
  const handleLogout = () => {
    dispatch(signOut());
    navigate("/")
    setAnchorEl(false);
  }

  return (
    <CardHeader
      className="header"
      avatar={
        <Avatar className="header__avatar__background">
          <DirectionsBusFilledIcon className="header__avatar__icon" />
        </Avatar>
      }
      title={
        <Stack className="header__wrap" direction={"row"} justifyContent={"space-between"}>
          <Typography className="header__wrap__title">
            Bus Tutorial
          </Typography>
          {auth.isLogin == true ?
                <>
                    <Button
                        variant='text'
                        disableElevation
                        id="fade-button"
                        aria-controls={openProfile ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openProfile ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{
                            color: "White",
                            fontSize: "1.5vw"
                        }}
                    >
                        {auth.user.name}
                    </Button>
                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                            'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchorEl}
                        open={openProfile}
                        onClose={handleCloseProfile}
                    >
                        <MenuItem onClick={handleCloseProfile}>My account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </>
                :
                <>
                    <Button
                        variant="outlined"
                        onClick={handleClickOpen}
                        sx={{
                            color: "white",
                            border: "none",
                            ...(props.changeTheme === "white" && {
                                border: "1px solid #10af7e",
                                color: "#10af7e",
                            }),
                            fontSize: "1vw",
                            "&:hover": {
                                border: "none",
                            }
                        }}>
                        Login
                    </Button>
                    <LoginAndSignUp
                        open={open}
                        onClose={handleClose}
                    />
                </>
            }
        </Stack>
      }
    />
  );
}
