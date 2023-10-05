import { Route, Routes } from "react-router";
import MainDash from "./components/MainDash/MainDash";
import { RoutePage, StationPage } from "./page";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<MainDash />} />
      <Route path="/route/" element={<RoutePage />} />
      <Route path="/station/" element={<StationPage />} />

      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}
