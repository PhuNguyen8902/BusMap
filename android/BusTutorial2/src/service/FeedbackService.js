import {getData} from '../util/fetchApi';

const feedbackApi = `/api/feedback`;

const feedbackService = {
  async getAll(id, d) {
    const apifeedback = d + feedbackApi;

    const api = `${apifeedback}?routeId=${id}`;
    const data = await getData(api);
    return data;
  },
  async addFeedback(form, d) {
    const apifeedback = d + feedbackApi;

    const response = await fetch(`${apifeedback}/addAPP`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    return response.status !== 200
      ? null
      : {
          ...JSON.parse(await response.text()),
        };
  },
};

export default feedbackService;
