import { Route, Routes } from "react-router";
import MapDemoPage from "./routes/MapDemoPage";
import MapPage from "./routes/MapPage";
import LearnPage from "./routes/LearnPage";
import HomePage from "./routes/HomePage";
import ContactPage from "./routes/ContactPage";
import AboutUsPage from "./routes/AboutUsPage";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/home/contact" element={<ContactPage />} />
      <Route path="/home/aboutus" element={<AboutUsPage />} />
      <Route path="/demo" element={<MapDemoPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/map/route/:routeId" element={<MapPage />} />
      <Route path="/map/routes/:location" element={<MapPage />}/>
      <Route path="/map/routes/:location/:withManyTrip/:order" element={<MapPage />}/>
      {/* <Route path="/map/routes" element={<MapPage />}/> */}
      <Route path="/learn" element={<LearnPage />} />
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}
