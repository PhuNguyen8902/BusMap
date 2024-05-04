import {getData} from '../util/fetchApi';

const stationRouteService = {
  async getStationRouteByRouteId(id, d) {
    const api = `${d}/api/station-route/route/${id}`;
    const data = await getData(api);
    return data;
  },
};

export default stationRouteService;
