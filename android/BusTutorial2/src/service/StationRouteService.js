import {getData} from '../util/fetchApi';

const stationRouteService = {
  async getStationRouteByRouteId(id) {
    const api = `${IPs}/api/station-route/route/${id}`;
    const data = await getData(api);
    return data;
  },
};

export default stationRouteService;
