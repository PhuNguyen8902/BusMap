import { getData } from "../util/fetchApi";


const routeApi = "http://localhost:8080/api/route";
const routeStationApi = "http://localhost:8080/api/station-route";


const routeService = {
    async getRouteById(id){
        const api = `${routeApi}/${id}`;
        // console.log(api)
        const getRouteById = await getData(api);
        // console.log(allRoutesByRouteNum);
        return getRouteById;
    },
    async getOneWayRoute(name){
        const oneWayRouteData = await getData(`${routeApi}/oneWay?name=${name}`)
        // console.log(oneWayRouteData);
        return oneWayRouteData;
    },
    async getRouteDetail(routeId){
        const routeDetailData = await getData(`${routeStationApi}/route/${routeId}`)
        return routeDetailData;
    },
    async getRoutesByRouteNum(routeNum){
        const api = `${routeApi}/routeBackward/${routeNum}`;
        // console.log(api)
        const allRoutesByRouteNum = await getData(api);
        // console.log(allRoutesByRouteNum);
        return allRoutesByRouteNum;
    }

}

export default routeService;