import { Box } from "@mui/material";
import Footer from "../layout/Footer";
import MainHeader from "../layout/MainHeader";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";

export default function AboutUs() {
    return (
        <>
            <MainHeader
                changeTheme="white"
            />
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <Footer />
        </>
    )
}