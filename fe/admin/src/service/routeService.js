import { getData } from "../utils/fetchApi";

const routeApi = "http://localhost:8080/api/route";
const routeAdminApi = "http://localhost:8080/api/admin/route";

const routeStationApi = "http://localhost:8080/api/station-route";

const routeService = {
  async getAllRoute(a) {
    const oneWayRouteData = await getData(`${routeAdminApi}?${a}`);
    // console.log(oneWayRouteData);
    return oneWayRouteData;
  },
};

export default routeService;
