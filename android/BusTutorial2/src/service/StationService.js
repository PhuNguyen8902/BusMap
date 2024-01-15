import {IP} from '../common/common';
import {getData} from '../util/fetchApi';
const IPs = IP;

const stationApi = `${IPs}/api/station`;

const stationService = {
  async getRouteWithOneTripData(lat1, lon1, lat2, lon2) {
    const api = `${stationApi}/route1?latitude1=${lat1}&longitude1=${lon1}&latitude2=${lat2}&longitude2=${lon2}`;
    console.log(api);
    const routeWithOneTripData = await getData(api);
    return routeWithOneTripData;
  },
  async getRouteWithTwoTripData(lat1, lon1, lat2, lon2) {
    const api = `${stationApi}/route2?latitude1=${lat1}&longitude1=${lon1}&latitude2=${lat2}&longitude2=${lon2}`;
    const routeWithTwoTripData = await getData(api);
    return routeWithTwoTripData;
  },
  async getRouteWithThreeTripData(lat1, lon1, lat2, lon2) {
    const api = `${stationApi}/route3?latitude1=${lat1}&longitude1=${lon1}&latitude2=${lat2}&longitude2=${lon2}`;
    const routeWithThreeTripData = await getData(api);
    return routeWithThreeTripData;
  },
  async getAllStationIsActive() {
    const api = `${stationApi}/app`;
    const data = await getData(api);
    return data;
  },
  async getAllStationIsActive() {
    const api = `${stationApi}/app`;
    const data = await getData(api);
    return data;
  },
  async getSearchStation(search) {
    const api = `${IPs}/search?name=${search}`;
    const data = await getData(api);
    return data;
  },
};

export default stationService;
