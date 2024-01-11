import {IP} from '../common/common';
import {getData} from '../util/fetchApi';

const IPs = IP;
const tripService = {
  async countTripByRouteId(id) {
    const api = `${IPs}/api/trip/count/${id}`;
    const data = await getData(api);
    return data;
  },
  async getTripByRoute(id) {
    const api = `${IPs}/api/trip/route/${id}`;
    const data = await getData(api);
    return data;
  },
};

export default tripService;
