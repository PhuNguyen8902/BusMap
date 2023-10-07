import { Route, Routes, useParams } from "react-router";
import MainDash from "./components/MainDash/MainDash";
import { RouteDeletedPage, RoutePage, StationPage } from "./page";
import TripPage from "./page/TripPage";
import StationRoutePage from "./page/StationRoutePage";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<MainDash />} />
      <Route path="/route/" element={<RoutePage />} />
      <Route path="/station/" element={<StationPage />} />
      <Route path="/trip/route/:id" element={<TripWithRouteId />} />
      <Route
        path="/station-route/route/:id"
        element={<StationRouteWithRouteId />}
      />

      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}
function TripWithRouteId() {
  const { id } = useParams();
  return <TripPage routeId={id} />;
}
function StationRouteWithRouteId() {
  const { id } = useParams();
  return <StationRoutePage routeId={id} />;
}
