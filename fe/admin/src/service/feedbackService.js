import { getData, postData, putData } from "../utils/fetchApi";


const feedbackAdminApi = "http://localhost:8080/api/admin/feedback";

const feedbackService = {
  async gettAllFeedbackByRouteId(routeId, page) {
    // console.log(routeId, page)
    const api = `${feedbackAdminApi}/route/${routeId}?${page}`;
    console.log(api)
    const feedbackData = await getData(api);
    console.log(feedbackData);
    return feedbackData;
  },

};

export default feedbackService;
