import { getData } from "../utils/fetchApi";
import Ip from "../common/common"

// const feedbackAdminApi = "http://localhost:8080/api/admin/feedback";

const feedbackService = {
  async gettAllFeedbackByRouteId(routeId, page) {
    const IPs = Ip;

    const feedbackAdminApi = `${IPs}api/admin/feedback`;

    const api = `${feedbackAdminApi}/route/${routeId}?${page}`;
    const feedbackData = await getData(api);
    return feedbackData;
  },
  async gettAllFeedbackByUserId(userId, page) {
    const IPs = Ip;

    const feedbackAdminApi = `${IPs}api/admin/feedback`;
    const api = `${feedbackAdminApi}/user/${userId}?${page}`;
    const feedbackData = await getData(api);
    return feedbackData;
  },
};

export default feedbackService;
