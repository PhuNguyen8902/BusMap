import { getData } from "../util/fetchApi";
import { Ip } from "../common/common";

// const IPs = Ip;

// const stationApi = `${IPs}api/station`;

// console.log(stationApi);

const stationService = {
  //   async getRouteWithOneTripData(a){
  //     const api = `${stationApi}/find?${a}`
  //     console.log(api)
  //     const routeWithOneTripData = await getData(api)
  //     // console.log(routeWithOneTripData);
  //     return routeWithOneTripData;
  // },
  async getRouteWithOneTripData(lat1, lon1, lat2, lon2) {
    const IPs = Ip;

    const stationApi = `${IPs}api/station`;

    const api = `${stationApi}/route1?latitude1=${lat1}&longitude1=${lon1}&latitude2=${lat2}&longitude2=${lon2}`;
    // console.log(api);
    const routeWithOneTripData = await getData(api);
    // console.log(routeWithOneTripData);
    return routeWithOneTripData;
  },
  async getRouteWithTwoTripData(lat1, lon1, lat2, lon2) {
    const IPs = Ip;

    const stationApi = `${IPs}api/station`;

    const api = `${stationApi}/route2?latitude1=${lat1}&longitude1=${lon1}&latitude2=${lat2}&longitude2=${lon2}`;
    // console.log(api);
    const routeWithTwoTripData = await getData(api);
    // console.log(routeWithTwoTripData);
    return routeWithTwoTripData;
  },
  async getRouteWithThreeTripData(lat1, lon1, lat2, lon2) {
    const IPs = Ip;

    const stationApi = `${IPs}api/station`;

    const api = `${stationApi}/route3?latitude1=${lat1}&longitude1=${lon1}&latitude2=${lat2}&longitude2=${lon2}`;
    // console.log(api);
    const routeWithThreeTripData = await getData(api);
    // console.log(routeWithThreeTripData);
    return routeWithThreeTripData;
  },
};

export default stationService;
