import { Route, Routes, useParams } from "react-router";
import MainDash from "./components/MainDash/MainDash";
import { RouteDeletedPage, RoutePage, StationPage } from "./page";
import TripPage from "./page/TripPage";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<MainDash />} />
      <Route path="/route/" element={<RoutePage />} />
      <Route path="/route-deleted/" element={<RouteDeletedPage />} />
      <Route path="/station/" element={<StationPage />} />
      <Route path="/trip/route/:id" element={<TripWithRouteId />} />

      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}
function TripWithRouteId() {
  const { id } = useParams();
  console.log(id);
  return <TripPage routeId={id} />;
}
