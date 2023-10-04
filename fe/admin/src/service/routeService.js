import { getData } from "../utils/fetchApi";

const routeApi = "http://localhost:8080/api/route";
const routeStationApi = "http://localhost:8080/api/station-route";

const routeService = {
  async getAllRoute() {
    const oneWayRouteData = await getData(`${routeApi}/`);
    console.log(oneWayRouteData);
    return oneWayRouteData;
  },
};

export default routeService;
