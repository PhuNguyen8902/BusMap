import { getData, postData, putData } from "../utils/fetchApi";
import Ip from "../common/common"


const routeApi = "http://localhost:8080/api/route";
const routeAdminApi = "http://localhost:8080/api/admin/route";

const routeStationApi = "http://localhost:8080/api/station-route";

const routeService = {
  async getAllRoute(a) {
    const IPs = Ip;
    const routeAdminApi = `${IPs}api/admin/route`;

    const oneWayRouteData = await getData(`${routeAdminApi}?${a}`);
    return oneWayRouteData;
  },
  async editRoute(a) {
    const IPs = Ip;
    const routeAdminApi = `${IPs}api/admin/route`;

    const routeData = await putData(`${routeAdminApi}/edit`, a);
    return routeData;
  },
  async deleteRoute(a) {
    const IPs = Ip;
    const routeAdminApi = `${IPs}api/admin/route`;

    const routeData = await putData(`${routeAdminApi}/delete/${a}`);
    return routeData;
  },
  async addRoute(a) {
    const IPs = Ip;
    const routeAdminApi = `${IPs}api/admin/route`;
    
    const routeData = await postData(`${routeAdminApi}/add`, a);
    return routeData;
  },
};

export default routeService;
