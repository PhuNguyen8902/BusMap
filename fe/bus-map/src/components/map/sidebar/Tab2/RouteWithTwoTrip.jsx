import { Box, Stack, Typography } from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import RouteIcon from "@mui/icons-material/Route";
import stationService from "../../../../service/stationService";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

export default function RouteWithTwotrip(props) {
  const navigate = useNavigate();
  const { location } = useParams();
  const [lat1, lon1, lat2, lon2] = location.split("_");

  const [routeWithTwoTripData, setRouteWithTwoTrip] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRouteWithTwoTrip = async () => {
      setIsLoading(true);
      const routeWithTwotripData = await stationService.getRouteWithTwoTripData(
        lat1,
        lon1,
        lat2,
        lon2
      );
      setIsLoading(false);
      
      setRouteWithTwoTrip(routeWithTwotripData);
      // console.log("route with two trips: ", routeWithTwotripData);
    };
    // get route with one trip
    fetchRouteWithTwoTrip();
  }, []);

  return (
    <>
      {isLoading === false ? (
        <>
          {" "}
          {routeWithTwoTripData !== "" ? (
            <>
              {routeWithTwoTripData.map((route, index) => {
                return (
                  <Stack
                    key={index}
                    className="tab__avaiable--routes"
                    onClick={() => {
                      navigate(
                        `/map/routes/${lat1}_${lon1}_${lat2}_${lon2}/2/${index}`
                      );
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1vw",
                        margin: "0 0 5% 0",
                        color: "#10af7e",
                      }}
                    >
                      <strong>
                        Go on routes{" "}
                        {route.startStation.stationRoute.routeId.routeNum},{" "}
                        {route.endStation.stationRoute.routeId.routeNum}
                      </strong>
                    </Typography>
                    <Box>
                      <Stack
                        direction={"row"}
                        sx={{
                          width: "100%",
                          margin: "0 0 2.5% 0",
                        }}
                      >
                        <Typography sx={{ width: "60%" }}>
                          From start to station:{" "}
                        </Typography>
                        <DirectionsRunIcon sx={{ margin: "0 1% 0 0" }} />
                        <Typography>
                          {" "}
                          {route.startStation.distance.toFixed(2)} km
                        </Typography>
                      </Stack>
                      <Stack direction={"row"} sx={{ width: "100%" }}>
                        <Typography sx={{ width: "60%" }}>
                          Total Distance:{" "}
                        </Typography>
                        <RouteIcon sx={{ margin: "0 1% 0 0" }} />
                        <Typography> {route.distance.toFixed(2)} km</Typography>
                      </Stack>
                    </Box>
                  </Stack>
                );
              })}
            </>
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
      ) : (
        <Typography
          sx={{
            fontSize: "1vw",
            margin: "0 0 5% 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <strong>Finding route...</strong>
        </Typography>
      )}
    </>
  );
}
