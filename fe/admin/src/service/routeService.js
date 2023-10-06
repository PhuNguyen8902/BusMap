import { getData, postData, putData } from "../utils/fetchApi";

const routeApi = "http://localhost:8080/api/route";
const routeAdminApi = "http://localhost:8080/api/admin/route";

const routeStationApi = "http://localhost:8080/api/station-route";

const routeService = {
  async getAllRoute(a) {
    const oneWayRouteData = await getData(`${routeAdminApi}?${a}`);
    // console.log(oneWayRouteData);
    return oneWayRouteData;
  },
  async getAllRouteDeleted(a) {
    const oneWayRouteData = await getData(
      `${routeAdminApi}/route-deleted?${a}`
    );
    // console.log(oneWayRouteData);
    return oneWayRouteData;
  },
  async editRoute(a) {
    const routeData = await putData(`${routeAdminApi}/edit`, a);
    return routeData;
  },
  async deleteRoute(a) {
    const routeData = await putData(`${routeAdminApi}/delete/${a}`);
    return routeData;
  },
  async activeRoute(a) {
    const routeData = await putData(`${routeAdminApi}/active/${a}`);
    return routeData;
  },
  async addRoute(a) {
    const routeData = await postData(`${routeAdminApi}/add`, a);
    return routeData;
  },
};

export default routeService;
