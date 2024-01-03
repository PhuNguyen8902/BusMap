import {getIP} from '../common/common';
import {getData} from '../util/fetchApi';

const IP = getIP();
const tripService = {
  async countTripByRouteId(id) {
    const api = `${IP}/api/trip/count/${id}`;
    const data = await getData(api);
    return data;
  },
  async getTripByRoute(id) {
    const api = `${IP}/api/trip/route/${id}`;
    const data = await getData(api);
    return data;
  },
};

export default tripService;
