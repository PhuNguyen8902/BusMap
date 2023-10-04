import { getData } from "../util/fetchApi";


const routeApi = "http://localhost:8080/api/route";
const routeStationApi = "http://localhost:8080/api/station-route";


const routeService = {
    async getOneWayRoute(name){
        const oneWayRouteData = await getData(`${routeApi}/oneWay?name=${name}`)
        // console.log(oneWayRouteData);
        return oneWayRouteData;
    },
    async getRouteDetail(routeId){
        const routeDetailData = await getData(`${routeStationApi}/route/${routeId}`)
        return routeDetailData;
    }
}

export default routeService;