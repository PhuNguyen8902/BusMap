import { deleteData, getData, postData, putData } from "../utils/fetchApi";
import { Ip } from "../common/common";

const tripApi = "http://localhost:8080/api/trip";
const tripAdminApi = "http://localhost:8080/api/admin/trip";

const routeStationApi = "http://localhost:8080/api/station-route";

const tripService = {
  async getAllTripByRoute(id, a) {
    const IPs = Ip;
    const tripAdminApi = `${IPs}api/admin/trip`;

    const tripData = await getData(`${tripAdminApi}/route/${id}?${a}`);
    // console.log(oneWayRouteData);
    return tripData;
  },
  async editTrip(a) {
    const IPs = Ip;
    const tripAdminApi = `${IPs}api/admin/trip`;

    const tripData = await putData(`${tripAdminApi}/edit`, a);
    return tripData;
  },
  async deleteTrip(a) {
    const IPs = Ip;
    const tripAdminApi = `${IPs}api/admin/trip`;

    const tripData = await deleteData(`${tripAdminApi}/delete/${a}`);
    return tripData;
  },
  async addTrip(a) {
    const IPs = Ip;
    const tripAdminApi = `${IPs}api/admin/trip`;

    const tripData = await postData(`${tripAdminApi}/add`, a);
    return tripData;
  },
};

export default tripService;
