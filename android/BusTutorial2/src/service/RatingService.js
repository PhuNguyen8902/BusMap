import {IP} from '../common/common';
import {getData} from '../util/fetchApi';
const IPs = IP;

const ratingApi = `${IPs}/api/feedback`;

const ratingService = {
  async getAll(id) {
    const api = `${ratingApi}?routeId=${id}`;
    const data = await getData(api);
    return data;
  },
};

export default ratingService;
