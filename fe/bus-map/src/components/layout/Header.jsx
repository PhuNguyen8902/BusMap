import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import { CardHeader, Typography, Avatar, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export default function Header() {
  return (
    <CardHeader
      className="header"
      avatar={
        <Avatar className="header__avatar__background">
          <DirectionsBusFilledIcon className="header__avatar__icon" />
        </Avatar>
      }
      title={
        <Box className="header__wrap">
          <Typography className="header__wrap__title">
            Bus Tutorial
          </Typography>
        </Box>
      }
    />
  );
}
