import { deleteData, getData, postData, putData } from "../utils/fetchApi";
import { Ip } from "../common/common";

const routeStationAdminApi = "http://localhost:8080/api/admin/station-route";

const stationRouteService = {
  async getAllStationRoute(id, a) {
    const IPs = Ip;

    const routeStationAdminApi = `${IPs}api/admin/station-route`;

    const stationRouteData = await getData(
      `${routeStationAdminApi}/route/${id}?${a}`
    );
    return stationRouteData;
  },
  async getAllStationRouteByStation(id, a) {
    const IPs = Ip;

    const routeStationAdminApi = `${IPs}api/admin/station-route`;

    const stationRouteData = await getData(
      `${routeStationAdminApi}/station/${id}?${a}`
    );
    return stationRouteData;
  },
  async deleteStationRoute(a) {
    const IPs = Ip;

    const routeStationAdminApi = `${IPs}api/admin/station-route`;

    const stationRouteData = await deleteData(
      `${routeStationAdminApi}/delete/${a}`
    );
    return stationRouteData;
  },
  async findByPriority(a, b, c) {
    const IPs = Ip;

    const routeStationAdminApi = `${IPs}api/admin/station-route`;

    const stationRouteData = await getData(
      `${routeStationAdminApi}/?priority=${a}&routeId=${b}&stationId=${c}`
    );
    return stationRouteData;
  },
  async editStationRoute(a) {
    const IPs = Ip;

    const routeStationAdminApi = `${IPs}api/admin/station-route`;

    const stationRouteData = await putData(`${routeStationAdminApi}/edit`, a);
    return stationRouteData;
  },
  async addStationRoute(a) {
    const IPs = Ip;

    const routeStationAdminApi = `${IPs}api/admin/station-route`;

    const stationRouteData = await postData(`${routeStationAdminApi}/add`, a);
    return stationRouteData;
  },
};

export default stationRouteService;
