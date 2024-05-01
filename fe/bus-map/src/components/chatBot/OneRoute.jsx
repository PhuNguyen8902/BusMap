import { Box, Stack, Typography } from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import RouteIcon from "@mui/icons-material/Route";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import stationService from "../../service/stationService";

export default function RouteWithOnetrip({ triggerNextStep }) {
  const navigate = useNavigate();
  const { location } = useParams();
  // console.log(location)
  const [lat1, lon1, lat2, lon2] = location.split("_");

  const [routeWithOneTripData, setRouteWithOneTrip] = useState("");

  useEffect(() => {
    const fetchRouteWithOneTrip = async () => {
      const routeWithOnetripData = await stationService.getRouteWithOneTripData(
        lat1,
        lon1,
        lat2,
        lon2
      );
      // console.log(routeWithOnetripData[0]);
      if (routeWithOnetripData.length != 0) {
        setRouteWithOneTrip(routeWithOnetripData[0]);
      }
      triggerNextStep();
      // console.log("route with one trip: ", routeWithOnetripData);
    };
    // get route with one trip
    fetchRouteWithOneTrip();
  }, [location]);

  return (
    <>
      {routeWithOneTripData != "" ? (
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
                      routeWithOneTripData.startStation.stationRoute.routeId
                        .routeNum
                    }
                  </strong>
                </Typography>
              </Stack>
              <Box>
                <Typography sx={{ fontSize: "1vw" }}>
                  From your location, go to route{" "}
                  {
                    routeWithOneTripData.startStation.stationRoute.routeId
                      .routeNum
                  }
                </Typography>
                <Typography sx={{ fontSize: "1vw" }}>
                  At station:{" "}
                  {
                    routeWithOneTripData.startStation.stationRoute.stationId
                      .name
                  }
                </Typography>
                <Typography sx={{ fontSize: "1vw" }}>
                  With the address:{" "}
                  {
                    routeWithOneTripData.startStation.stationRoute.stationId
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
                      routeWithOneTripData.startStation.stationRoute.routeId
                        .routeNum
                    }
                  </strong>
                </Typography>
              </Stack>
              <Stack>
                <Typography sx={{ fontSize: "1vw" }}>
                  From station:{" "}
                  {
                    routeWithOneTripData.startStation.stationRoute.stationId
                      .name
                  }
                </Typography>
                <Typography sx={{ fontSize: "1vw" }}>
                  Go to station:{" "}
                  {routeWithOneTripData.endStation.stationRoute.stationId.name}
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
                  {routeWithOneTripData.endStation.stationRoute.stationId.name}
                </Typography>
                <Typography sx={{ fontSize: "1vw" }}>
                  With the address:{" "}
                  {
                    routeWithOneTripData.endStation.stationRoute.stationId
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
