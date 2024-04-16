import BusChatBot from "../chatBot/BusChatBot";
import Footer from "../layout/Footer";
import MainHeader from "../layout/MainHeader";
import HomeBanner from "./HomeBanner";
import SectionOne from "./SectionOne";
import SecTionTwo from "./SectionTwo";


export default function Home() {
 
  return (
    <>
      <BusChatBot />
      <MainHeader />
      <HomeBanner />
      <SectionOne />
      <SecTionTwo />
      <Footer />
    </>
  );
}
