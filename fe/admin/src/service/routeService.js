import { getData, putData } from "../utils/fetchApi";

const routeApi = "http://localhost:8080/api/route";
const routeAdminApi = "http://localhost:8080/api/admin/route";

const routeStationApi = "http://localhost:8080/api/station-route";

const routeService = {
  async getAllRoute(a) {
    const oneWayRouteData = await getData(`${routeAdminApi}?${a}`);
    // console.log(oneWayRouteData);
    return oneWayRouteData;
  },
  async editRoute(a) {
    const routeData = await putData(`${routeAdminApi}/edit`, a);
    return routeData;
  },
};

export default routeService;
