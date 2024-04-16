import BusChatBot from "../chatBot/BusChatBot";
import Footer from "../layout/Footer";
import MainHeader from "../layout/MainHeader";
import SectionOne from "./SectionOne";
import SectionThree from "./SectionThree";
import SectionTwo from "./SectionTwo";

export default function Contact() {
    return (
        <>
            <BusChatBot />
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