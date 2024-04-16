import { wait } from "@testing-library/user-event/dist/utils";
import { getData, postData, putData } from "../util/fetchApi";
import { PostAdd } from "@mui/icons-material";
import { Ip } from "../common/common";

// const IPs = Ip;

// const feedbackApi = `${IPs}api/feedback`;

const feedbackService = {
  async getAllFeedbackByRouteId(routeId) {
    const IPs = Ip;

    const feedbackApi = `${IPs}api/feedback`;
    const feedbackData = await getData(`${feedbackApi}?routeId=${routeId}`);
    // console.log("feedbackData in service: ", feedbackData);
    return feedbackData;
  },

  async getFeedbackByRouteIdAndUserId(routeId, userId) {
    const IPs = Ip;

    const feedbackApi = `${IPs}api/feedback`;
    const api = `${feedbackApi}/routeAndUser?routeId=${routeId}&userId=${userId}`;
    // console.log("api in feedback service: ", api)
    const feedbackData = await getData(api);
    // console.log("feedbackData in service: ", feedbackData);
    return feedbackData;
  },

  async addFeedback(feedback) {
    const IPs = Ip;

    const feedbackApi = `${IPs}api/feedback`;
    const feedbackData = await postData(`${feedbackApi}/add`, feedback);
    // console.log("feedbackData in service: ", feedbackData);
    return feedbackData;
  },

  async editFeedback(feedback) {
    const IPs = Ip;

    const feedbackApi = `${IPs}api/feedback`;
    const feedbackData = await putData(`${feedbackApi}/edit`, feedback);
    // console.log("feedbackData in service: ", feedbackData);
    return feedbackData;
  },
};

export default feedbackService;
