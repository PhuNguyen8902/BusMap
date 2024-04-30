import { getData } from "../util/fetchApi";
import { Ip } from "../common/common";

// const IPs = Ip;

// const routeApi = `${IPs}api/route`;
// const routeStationApi = `${IPs}api/station-route`;

// console.log(IPs)
// console.log(routeApi)

const routeService = {
  async getRouteById(id) {
    const IPs = Ip;

    const routeApi = `${IPs}api/route`;
    const routeStationApi = `${IPs}api/station-route`;

    // console.log(IPs);
    // console.log(routeApi);
    const api = `${routeApi}/${id}`;
    // console.log(api)
    const getRouteById = await getData(api);
    // console.log(allRoutesByRouteNum);
    return getRouteById;
  },
  async getOneWayRoute(name) {
    const IPs = Ip;

    const routeApi = `${IPs}api/route`;
    const routeStationApi = `${IPs}api/station-route`;
    // console.log(IPs);
    // console.log(routeApi); 
    const oneWayRouteData = await getData(`${routeApi}/oneWay?name=${name}`);
    // console.log(oneWayRouteData);
    return oneWayRouteData;
  },
  async getRouteDetail(routeId) {
    const IPs = Ip;

    const routeApi = `${IPs}api/route`;
    const routeStationApi = `${IPs}api/station-route`;
    const routeDetailData = await getData(
      `${routeStationApi}/route/${routeId}`
    );
    return routeDetailData;
  },
  async getRoutesByRouteNum(routeNum) {
    const IPs = Ip;

    const routeApi = `${IPs}api/route`;
    const routeStationApi = `${IPs}api/station-route`;
    const api = `${routeApi}/routeBackward/${routeNum}`;
    // console.log(api)
    const allRoutesByRouteNum = await getData(api);
    // console.log(allRoutesByRouteNum);
    return allRoutesByRouteNum;
  },
};

export default routeService;
