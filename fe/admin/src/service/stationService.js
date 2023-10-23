import { getData, postData, putData } from "../utils/fetchApi";

const stationApi = "http://localhost:8080/api/station";
const stationAdminApi = "http://localhost:8080/api/admin/station";

const routeStationApi = "http://localhost:8080/api/station-route";

const stationService = {
  async getAllStation(a) {
    const stationData = await getData(`${stationAdminApi}?${a}`);
    return stationData;
  },
  
  async addStation(a){
    const stationData = await postData(`${stationAdminApi}/add`, a);
    return stationData;
  },

  async editStation(a) {
    const stationData = await putData(`${stationAdminApi}/edit`, a);
    return stationData;
  },

  async deleteStation(a){
    const stationData = await putData(`${stationAdminApi}/delete/${a}`);
    return stationData;
  }
};

export default stationService;
