import { Box, Stack, Typography } from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import RouteIcon from "@mui/icons-material/Route";
import { useNavigate, useParams } from "react-router";
import stationService from "../../service/stationService";
import { useEffect, useState } from "react";

export default function RouteWithThreetrip({ triggerNextStep }) {
  const navigate = useNavigate();
  const { location } = useParams();
  const [lat1, lon1, lat2, lon2] = location.split("_");

  const [routeWithThreeTripData, setRouteWithThreeTripData] = useState("");

  useEffect(() => {
    const fetchRouteWithThreeTrip = async () => {
      const routeWithThreetripData = await stationService.getRouteWithThreeTripData(
        lat1,
        lon1,
        lat2,
        lon2
      );
      if (routeWithThreeTripData.length != 0) {
        setRouteWithThreeTripData(routeWithThreetripData[0]);
      }
      triggerNextStep();
      // console.log("route with three trips: ", routeWithThreetripData);
    };
    // get route with one trip
    fetchRouteWithThreeTrip();
  }, []);

  return (
    <>
      {routeWithThreeTripData != "" ? (
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
                    {
                      routeWithThreeTripData.startStation.stationRoute.routeId
                        .routeNum
                    }
                  </strong>
                </Typography>
              </Stack>
              <Box>
                <Typography sx={{ fontSize: "1vw" }}>
                  From your location, go to route{" "}
                  {
                    routeWithThreeTripData.startStation.stationRoute.routeId
                      .routeNum
                  }
                </Typography>
                <Typography sx={{ fontSize: "1vw" }}>
                  At station:{" "}
                  {
                    routeWithThreeTripData.startStation.stationRoute.stationId
                      .name
                  }
                </Typography>
                <Typography sx={{ fontSize: "1vw" }}>
                  With the address:{" "}
                  {
                    routeWithThreeTripData.startStation.stationRoute.stationId
                      .address
                  }
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
                    {
                      routeWithThreeTripData.startStation.stationRoute.routeId
                        .routeNum
                    }
                  </strong>
                </Typography>
              </Stack>
              <Stack>
                <Typography sx={{ fontSize: "1vw" }}>
                  From station:{" "}
                  {
                    routeWithThreeTripData.startStation.stationRoute.stationId
                      .name
                  }
                </Typography>
                <Typography sx={{ fontSize: "1vw" }}>
                  Go to station:{" "}
                  {routeWithThreeTripData.midRoute.startStation.name}
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
                    {
                      routeWithThreeTripData.startStation.stationRoute.routeId
                        .routeNum
                    }{" "}
                    to route {routeWithThreeTripData.midRoute.route.routeNum}
                  </strong>
                </Typography>
              </Stack>
              <Box>
                <Typography sx={{ fontSize: "1vw" }}>
                  Get off at station:{" "}
                  {routeWithThreeTripData.midRoute.startStation.name}
                </Typography>
                <Typography sx={{ fontSize: "1vw" }}>
                  With the address:{" "}
                  {routeWithThreeTripData.midRoute.startStation.address}
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
                    Go on route {routeWithThreeTripData.midRoute.route.routeNum}
                  </strong>
                </Typography>
              </Stack>
              <Stack>
                <Typography sx={{ fontSize: "1vw" }}>
                  From station:{" "}
                  {routeWithThreeTripData.midRoute.startStation.name}
                </Typography>
                <Typography sx={{ fontSize: "1vw" }}>
                  Go to station:{" "}
                  {routeWithThreeTripData.midRoute.endStation.name}
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
                    {routeWithThreeTripData.midRoute.route.routeNum} to route{" "}
                    {
                      routeWithThreeTripData.endStation.stationRoute.routeId
                        .routeNum
                    }
                  </strong>
                </Typography>
              </Stack>
              <Box>
                <Typography sx={{ fontSize: "1vw" }}>
                  Get off at station:{" "}
                  {routeWithThreeTripData.midRoute.endStation.name}
                </Typography>
                <Typography sx={{ fontSize: "1vw" }}>
                  With the address:{" "}
                  {routeWithThreeTripData.midRoute.endStation.address}
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
                    {
                      routeWithThreeTripData.endStation.stationRoute.routeId
                        .routeNum
                    }
                  </strong>
                </Typography>
              </Stack>
              <Stack>
                <Typography sx={{ fontSize: "1vw" }}>
                  From station:{" "}
                  {routeWithThreeTripData.midRoute.endStation.name}
                </Typography>
                <Typography sx={{ fontSize: "1vw" }}>
                  Go to station:{" "}
                  {
                    routeWithThreeTripData.endStation.stationRoute.stationId
                      .name
                  }
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
                  {
                    routeWithThreeTripData.endStation.stationRoute.stationId
                      .name
                  }
                </Typography>
                <Typography sx={{ fontSize: "1vw" }}>
                  With the address:{" "}
                  {
                    routeWithThreeTripData.endStation.stationRoute.stationId
                      .address
                  }
                </Typography>
                <Typography sx={{ fontSize: "1vw" }}>
                  Go to destination
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Stack>
      ) : (
        <>
          <Typography
            sx={{
              fontSize: "1vw",
              margin: "0 0 5% 0",
              color: "red",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <strong>Unfound</strong>
          </Typography>
        </>
      )}
    </>
  );
}
