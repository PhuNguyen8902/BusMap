import { Route, Routes } from "react-router";
import MapDemoPage from "./routes/MapDemoPage";
import LearnPage from "./routes/LearnPage";

export default function Routers() {
  return (
    <Routes>
      <Route path="/demo" element={<MapDemoPage />} />
      <Route path="/learn" element={<LearnPage />} />
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}
