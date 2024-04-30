import { Box, Stack, Typography } from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import RouteIcon from "@mui/icons-material/Route";
import stationService from "../../service/stationService";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

export default function RouteWithTwotrip({ triggerNextStep }) {
  const navigate = useNavigate();
  const { location } = useParams();
  const [lat1, lon1, lat2, lon2] = location.split("_");

  const [routeWithTwoTripData, setRouteWithTwoTrip] = useState("");

  useEffect(() => {
    const fetchRouteWithTwoTrip = async () => {
      const routeWithTwotripData = await stationService.getRouteWithTwoTripData(
        lat1,
        lon1,
        lat2,
        lon2
      );
      setRouteWithTwoTrip(routeWithTwotripData[0]);
      triggerNextStep();
      // console.log("route with two trips: ", routeWithTwotripData);
    };
    // get route with one trip
    fetchRouteWithTwoTrip();
  }, []);

  return (
    <>
      {routeWithTwoTripData != "" ? (
        <Stack direction={"column"}>
          <Stack>
            <Box
              sx={{
                background: "rgba(0, 0, 0, 0.05)",
                borderRadius: "20px",
                padding: "5%",
                marginBottom: "5%",
              }}
            >
              <Stack direction={"row"} sx={{ marginBottom: "4%" }}>
                <DirectionsRunIcon
                  sx={{ fontSize: "1.5vw", marginRight: "2%" }}
                />
                <Typography sx={{ fontSize: "1.2vw" }}>
                  <strong>
                    walk to route{" "}
                    {routeWithTwoTripData.startStation.stationRoute.routeId.routeNum}
                  </strong>
                </Typography>
              </Stack>
              <Box>
                <Typography sx={{ fontSize: "1vw" }}>
                  From your location, go to route{" "}
                  {routeWithTwoTripData.startStation.stationRoute.routeId.routeNum}
                </Typography>
                <Typography sx={{ fontSize: "1vw" }}>
                  At station:{" "}
                  {routeWithTwoTripData.startStation.stationRoute.stationId.name}
                </Typography>
                <Typography sx={{ fontSize: "1vw" }}>
                  With the address:{" "}
                  {routeWithTwoTripData.startStation.stationRoute.stationId.address}
                </Typography>
              </Box>
            </Box>
          </Stack>
          <Stack>
            <Box
              sx={{
                background: "rgba(0, 0, 0, 0.05)",
                borderRadius: "20px",
                padding: "5%",
                marginBottom: "5%",
              }}
            >
              <Stack direction={"row"} sx={{ marginBottom: "4%" }}>
                <DirectionsBusIcon
                  sx={{ fontSize: "1.5vw", marginRight: "2%" }}
                />
                <Typography sx={{ fontSize: "1.2vw" }}>
                  <strong>
                    Go on route{" "}
                    {routeWithTwoTripData.startStation.stationRoute.routeId.routeNum}
                  </strong>
                </Typography>
              </Stack>
              <Stack>
                <Typography sx={{ fontSize: "1vw" }}>
                  From station:{" "}
                  {routeWithTwoTripData.startStation.stationRoute.stationId.name}
                </Typography>
                <Typography sx={{ fontSize: "1vw" }}>
                  Go to station: {routeWithTwoTripData.midStation.name}
                </Typography>
              </Stack>
            </Box>
          </Stack>
          <Stack>
            <Box
              sx={{
                background: "rgba(0, 0, 0, 0.05)",
                borderRadius: "20px",
                padding: "5%",
                marginBottom: "5%",
              }}
            >
              <Stack direction={"row"} sx={{ marginBottom: "4%" }}>
                <DirectionsRunIcon
                  sx={{ fontSize: "1.5vw", marginRight: "2%" }}
                />
                <Typography sx={{ fontSize: "1.1vw" }}>
                  <strong>
                    Change From route{" "}
                    {routeWithTwoTripData.startStation.stationRoute.routeId.routeNum} to
                    route {routeWithTwoTripData.endStation.stationRoute.routeId.routeNum}
                  </strong>
                </Typography>
              </Stack>
              <Box>
                <Typography sx={{ fontSize: "1vw" }}>
                  Get off at station: {routeWithTwoTripData.midStation.name}
                </Typography>
                <Typography sx={{ fontSize: "1vw" }}>
                  With the address: {routeWithTwoTripData.midStation.address}
                </Typography>
              </Box>
            </Box>
          </Stack>
          <Stack>
            <Box
              sx={{
                background: "rgba(0, 0, 0, 0.05)",
                borderRadius: "20px",
                padding: "5%",
                marginBottom: "5%",
              }}
            >
              <Stack direction={"row"} sx={{ marginBottom: "4%" }}>
                <DirectionsBusIcon
                  sx={{ fontSize: "1.5vw", marginRight: "2%" }}
                />
                <Typography sx={{ fontSize: "1.2vw" }}>
                  <strong>
                    Go on route{" "}
                    {routeWithTwoTripData.endStation.stationRoute.routeId.routeNum}
                  </strong>
                </Typography>
              </Stack>
              <Stack>
                <Typography sx={{ fontSize: "1vw" }}>
                  From station: {routeWithTwoTripData.midStation.name}
                </Typography>
                <Typography sx={{ fontSize: "1vw" }}>
                  Go to station:{" "}
                  {routeWithTwoTripData.endStation.stationRoute.stationId.name}
                </Typography>
              </Stack>
            </Box>
          </Stack>
          <Stack>
            <Box
              sx={{
                background: "rgba(0, 0, 0, 0.05)",
                borderRadius: "20px",
                padding: "5%",
                marginBottom: "5%",
              }}
            >
              <Stack direction={"row"} sx={{ marginBottom: "4%" }}>
                <DirectionsRunIcon
                  sx={{ fontSize: "1.5vw", marginRight: "2%" }}
                />
                <Typography sx={{ fontSize: "1.2vw" }}>
                  <strong>Walk to destination</strong>
                </Typography>
              </Stack>
              <Box>
                <Typography sx={{ fontSize: "1vw" }}>
                  Get off at station:{" "}
                  {routeWithTwoTripData.endStation.stationRoute.stationId.name}
                </Typography>
                <Typography sx={{ fontSize: "1vw" }}>
                  With the address:{" "}
                  {routeWithTwoTripData.endStation.stationRoute.stationId.address}
                </Typography>
                <Typography sx={{ fontSize: "1vw" }}>
                  Go to destination
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Stack>
      ) : null}
    </>
  );
}
