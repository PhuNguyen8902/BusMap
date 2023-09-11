import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import { CardHeader, Typography, Avatar } from "@mui/material";
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
        <Typography variant="h4" color="white">
          Bus Tutorial
        </Typography>
      }
    />
  );
}
