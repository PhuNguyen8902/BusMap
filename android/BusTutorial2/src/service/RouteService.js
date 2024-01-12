import {IP} from '../common/common';
import {getData} from '../util/fetchApi';

const IPs = IP;
const routeService = {
  async getAllRoute() {
    const api = `${IPs}/api/route/`;
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
};

export default routeService;
