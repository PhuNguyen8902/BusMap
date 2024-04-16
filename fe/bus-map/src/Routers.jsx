import { Route, Routes } from "react-router";
import MapPage from "./routes/MapPage";
import HomePage from "./routes/HomePage";
import ContactPage from "./routes/ContactPage";
import AboutUsPage from "./routes/AboutUsPage";
import Domain from "./components/domain/Domain";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Domain />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/home/contact" element={<ContactPage />} />
      <Route path="/home/aboutus" element={<AboutUsPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/map/route/:routeId" element={<MapPage />} />
      <Route path="/map/routes/:location" element={<MapPage />} />
      <Route
        path="/map/routes/:location/:withManyTrip/:order"
        element={<MapPage />}
      />
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}
