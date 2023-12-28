import {getData} from '../util/fetchApi';
import {IP} from '../common/common';

const routeService = {
  async getAllRoute() {
    const api = `${IP}api/route/`;
    const data = await getData(api);
    return data;
  },
  async getSearchRoute(search) {
    const api = `${IP}api/route/oneWay?name=${search}`;
    const data = await getData(api);
    return data;
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
  // async getRoutesByRouteNum(routeNum) {
  //   const api = `${routeApi}/routeBackward/${routeNum}`;
  //   // console.log(api)
  //   const allRoutesByRouteNum = await getData(api);
  //   // console.log(allRoutesByRouteNum);
  //   return allRoutesByRouteNum;
  // },
};

export default routeService;
