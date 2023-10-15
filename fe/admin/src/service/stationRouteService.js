import { deleteData, getData, postData, putData } from "../utils/fetchApi";

const routeStationAdminApi = "http://localhost:8080/api/admin/station-route";

const stationRouteService = {
  async getAllStationRoute(id, a) {
    const stationRouteData = await getData(
      `${routeStationAdminApi}/route/${id}?${a}`
    );
    return stationRouteData;
  },
  async getAllStationRouteByStation(id, a) {
    const stationRouteData = await getData(
      `${routeStationAdminApi}/station/${id}?${a}`
    );
    return stationRouteData;
  },
  async deleteStationRoute(a) {
    const stationRouteData = await deleteData(
      `${routeStationAdminApi}/delete/${a}`
    );
    return stationRouteData;
  },
  async findByPriority(a, b, c) {
    const stationRouteData = await getData(
      `${routeStationAdminApi}/?priority=${a}&routeId=${b}&stationId=${c}`
    );
    return stationRouteData;
  },
  async editStationRoute(a) {
    const stationRouteData = await putData(`${routeStationAdminApi}/edit`, a);
    return stationRouteData;
  },
  async addStationRoute(a) {
    const stationRouteData = await postData(`${routeStationAdminApi}/add`, a);
    return stationRouteData;
  },
};

export default stationRouteService;
