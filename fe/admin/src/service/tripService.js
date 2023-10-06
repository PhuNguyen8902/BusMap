import { deleteData, getData, postData, putData } from "../utils/fetchApi";

const tripApi = "http://localhost:8080/api/trip";
const tripAdminApi = "http://localhost:8080/api/admin/trip";

const routeStationApi = "http://localhost:8080/api/station-route";

const tripService = {
  async getAllTripByRoute(id, a) {
    const tripData = await getData(`${tripAdminApi}/route/${id}?${a}`);
    // console.log(oneWayRouteData);
    return tripData;
  },
  async editTrip(a) {
    const tripData = await putData(`${tripAdminApi}/edit`, a);
    return tripData;
  },
  async deleteTrip(a) {
    const tripData = await deleteData(`${tripAdminApi}/delete/${a}`);
    return tripData;
  },
  async addTrip(a) {
    const tripData = await postData(`${tripAdminApi}/add`, a);
    return tripData;
  },
};

export default tripService;
