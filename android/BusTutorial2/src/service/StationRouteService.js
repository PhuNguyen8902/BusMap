import {getIP} from '../common/common';
import {getData} from '../util/fetchApi';

const IP = getIP();
const stationRouteService = {
  async getStationRouteByRouteId(id) {
    const api = `${IP}/api/station-route/route/${id}`;
    const data = await getData(api);
    return data;
  },
};

export default stationRouteService;
