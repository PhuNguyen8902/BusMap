import { Title } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import imgBanner from "../../assets/img/_128732544_gettyimages-1247162782.jpg"
import { useNavigate } from "react-router";


export default function HomeBanner(){

    const navigate = useNavigate();

    return(
        <Stack className="home--banner" direction={"row"} justifyContent={"center"} spacing={10}>
            <Box className="home--banner__right--container">
                <Typography variant="h5" sx={{marginBottom: "3%"}}>BusApp</Typography>
                <Typography variant="h4" sx={{marginBottom: "5%"}}>
                    <strong>
                      The application for public transportation, which is considered the top choice in Vietnam
                    </strong>
                </Typography>
                <Typography variant="h5" sx={{marginBottom: "10%"}}>Đã có mặt tại 9 thành phố lớn: Hồ Chí Minh, Hà Nội, Đà Nẵng, Bình Dương, Bình Phước, Đồng Nai, Cần Thơ, Chiangmai và Bangkok</Typography>
                <Button onClick={() => {navigate("/map")}} variant="contained" 
                    sx={{
                        backgroundColor: "#10af7e",
                        borderRadius: "20px",
                        padding: "0.5vw 1.5vw",
                        fontSize: "1vw"
                    }}>
                        Open map</Button>
            </Box>
            <Box className="home--banner__left--container">
                <img src={imgBanner}/>
            </Box>
        </Stack>
    )
}