import {IP} from '../common/common';
import {getData} from '../util/fetchApi';
const IPs = IP;

const feedbackApi = `${IPs}/api/feedback`;

const feedbackService = {
  async getAll(id) {
    const api = `${feedbackApi}?routeId=${id}`;
    const data = await getData(api);
    return data;
  },
  async addFeedback(form) {
    const response = await fetch(`${feedbackApi}/addAPP`, {
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
