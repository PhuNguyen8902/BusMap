import Footer from "../layout/Footer"
import MainHeader from "../layout/MainHeader"
import HomeBanner from "./HomeBanner"
import SectionOne from "./SectionOne"
import SecTionTwo from "./SectionTwo"

export default function Home(){

    return(
        <>
            <MainHeader />
            <HomeBanner />
            <SectionOne />
            <SecTionTwo />
            <Footer />
        </>
    )
}