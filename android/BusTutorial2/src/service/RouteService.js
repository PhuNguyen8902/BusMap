import {getData} from '../util/fetchApi';

const routeService = {
  async getAllRoute(d) {
    const api = `${d}/api/route/`;
    const data = await getData(api);
    return data;
  },
  async getSearchRoute(search, d) {
    const api = `${d}/api/route/oneWay?name=${search}`;
    const data = await getData(api);
    return data;
  },
  async getRoutesByRouteNum(routeNum, d) {
    const api = `${d}/api/route/routeBackward/${routeNum}`;
    console.log(api);
    const allRoutesByRouteNum = await getData(api);
    return allRoutesByRouteNum;
  },
};

export default routeService;
