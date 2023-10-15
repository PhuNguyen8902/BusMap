import React from "react";
import { Route, Routes, useParams } from "react-router";
import { useSelector } from "react-redux";
import { LoginPage, RoutePage, StationPage } from "./page";
import TripPage from "./page/TripPage";
import StationRoutePage from "./page/StationRoutePage";

export default function Routers() {
  const auth = useSelector((state) => state.auth.isLogin);

  if (!auth) {
    return <LoginPage />;
  }
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route path="/route/" element={<RoutePage />} />
      <Route path="/station/" element={<StationPage />} />
      <Route path="/trip/route/:id" element={<TripWithRouteId />} />
      <Route
        path="/station-route/route/:id"
        element={<StationRouteWithRouteId />}
      />
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
