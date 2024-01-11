import {IP} from '../common/common';
import {getData} from '../util/fetchApi';

const IPs = IP;
const routeService = {
  async getAllRoute() {
    const api = `${IPs}/api/route/`;
    console.log(api);
    const data = await getData(api);
    return data;
  },
  async getSearchRoute(search) {
    const api = `${IPs}/api/route/oneWay?name=${search}`;
    const data = await getData(api);
    return data;
  },
  async getRoutesByRouteNum(routeNum) {
    const api = `${IPs}/api/route/routeBackward/${routeNum}`;
    const allRoutesByRouteNum = await getData(api);
    return allRoutesByRouteNum;
  },
  // async getOneWayRoute(name) {
  //   const oneWayRouteData = await getData(`${routeApi}/oneWay?name=${name}`);
  //   // console.log(oneWayRouteData);
  //   return oneWayRouteData;
  // },
  // async getRouteDetail(routeId) {
  //   const routeDetailData = await getData(
  //     `${routeStationApi}/route/${routeId}`,
  //   );
  //   return routeDetailData;
  // },
};

export default routeService;
