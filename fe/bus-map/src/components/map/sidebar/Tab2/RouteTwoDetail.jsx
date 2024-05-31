import { Box, Stack, Typography } from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { TabPanel } from "@mui/lab";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { storeStationsOneRoute, storeStationsTwoRoute } from "../../../../store/features/storeStation/storeStationSlice";

export default function RouteTwoDetail(props) {
  const selectRoute = props.selectRoute;
  console.log(selectRoute);

  const dispatch = useDispatch();

  useEffect(() => {
    let stationsOneRoute = [];
    let stationsTwoRoute = [];
    let routeOrder = 1;

    const stations = selectRoute.listStation.forEach((station) => {
      if (station.latitude === selectRoute.midStation.latitude && station.longitude === selectRoute.midStation.longitude)
        routeOrder = routeOrder + 1;
      switch (routeOrder) {
        case 1:
          stationsOneRoute.push({
            lat: station.latitude,
            lon: station.longitude,
            name: station.name,
          });
          break;
        case (2, 3):
          stationsTwoRoute.push({
            lat: station.latitude,
            lon: station.longitude,
            name: station.name,
          });
          break;
        default:
          break;
      }
    });
    // console.log("stationsOneRoute: ", stationsOneRoute);
    // console.log("stationsTwoRoute: ", stationsTwoRoute);

    dispatch(storeStationsOneRoute(stationsOneRoute));
    dispatch(storeStationsTwoRoute(stationsTwoRoute));
  }, []);

  return (
    <>
      <TabPanel
        value="1"
        sx={{
          width: "100%",
          height: "95%",
          overflowY: "scroll", // Add this to enable vertical scrolling
          scrollbarWidth: "thin", // Add this for Firefox support
          "&::-webkit-scrollbar": {
            width: "0.3vw",
          },
          "&:hover": {
            "&::-webkit-scrollbar": {
              width: "0.3vw",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#10af7e",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "white",
            },
          },
        }}
      >
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
                  {selectRoute.startStation.stationRoute.routeId.routeNum}
                </strong>
              </Typography>
            </Stack>
            <Box>
              <Typography sx={{ fontSize: "1vw" }}>
                From your location, go to route{" "}
                {selectRoute.startStation.stationRoute.routeId.routeNum}
              </Typography>
              <Typography sx={{ fontSize: "1vw" }}>
                At station:{" "}
                {selectRoute.startStation.stationRoute.stationId.name}
              </Typography>
              <Typography sx={{ fontSize: "1vw" }}>
                With the address:{" "}
                {selectRoute.startStation.stationRoute.stationId.address}
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
                  {selectRoute.startStation.stationRoute.routeId.routeNum}
                </strong>
              </Typography>
            </Stack>
            <Stack>
              <Typography sx={{ fontSize: "1vw" }}>
                From station:{" "}
                {selectRoute.startStation.stationRoute.stationId.name}
              </Typography>
              <Typography sx={{ fontSize: "1vw" }}>
                Go to station: {selectRoute.midStation.name}
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
                  {selectRoute.startStation.stationRoute.routeId.routeNum} to
                  route {selectRoute.endStation.stationRoute.routeId.routeNum}
                </strong>
              </Typography>
            </Stack>
            <Box>
              <Typography sx={{ fontSize: "1vw" }}>
                Get off at station: {selectRoute.midStation.name}
              </Typography>
              <Typography sx={{ fontSize: "1vw" }}>
                With the address: {selectRoute.midStation.address}
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
                  {selectRoute.endStation.stationRoute.routeId.routeNum}
                </strong>
              </Typography>
            </Stack>
            <Stack>
              <Typography sx={{ fontSize: "1vw" }}>
                From station: {selectRoute.midStation.name}
              </Typography>
              <Typography sx={{ fontSize: "1vw" }}>
                Go to station:{" "}
                {selectRoute.endStation.stationRoute.stationId.name}
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
                {selectRoute.endStation.stationRoute.stationId.name}
              </Typography>
              <Typography sx={{ fontSize: "1vw" }}>
                With the address:{" "}
                {selectRoute.endStation.stationRoute.stationId.address}
              </Typography>
              <Typography sx={{ fontSize: "1vw" }}>
                Go to destination
              </Typography>
            </Box>
          </Box>
        </Stack>
      </TabPanel>
      <TabPanel
        value="2"
        sx={{ overflowY: "scroll", width: "100%", height: "90%" }}
      >
        {selectRoute.listStation.map((station, index) => {
          return (
            <Stack key={index} direction={"row"} spacing={1.5}>
              <Box>
                <FiberManualRecordIcon
                  sx={{ color: "#10af7e", width: "80%" }}
                />
              </Box>
              <Box>
                <Typography>{station.name}</Typography>
              </Box>
            </Stack>
          );
        })}
      </TabPanel>
    </>
  );
}
