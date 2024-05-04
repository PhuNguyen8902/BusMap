import {getData} from '../util/fetchApi';

const tripService = {
  async countTripByRouteId(id, d) {
    const api = `${d}/api/trip/count/${id}`;
    // console.log(api);
    const data = await getData(api);
    return data;
  },
  async getTripByRoute(id, d) {
    const api = `${d}/api/trip/route/${id}`;
    const data = await getData(api);
    return data;
  },
};

export default tripService;
