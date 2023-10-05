import { getData } from "../utils/fetchApi";

const stationApi = "http://localhost:8080/api/station";
const stationAdminApi = "http://localhost:8080/api/admin/station";

const routeStationApi = "http://localhost:8080/api/station-route";

const stationService = {
  async getAllStation(a) {
    const stationData = await getData(`${stationAdminApi}?${a}`);
    return stationData;
  },
};

export default stationService;
