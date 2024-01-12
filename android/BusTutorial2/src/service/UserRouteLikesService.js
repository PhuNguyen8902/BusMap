import {IP} from '../common/common';
import {getData} from '../util/fetchApi';

const IPs = IP;

const API = `${IPs}/api/userRouteLikes`;

const UserRouteLikesService = {
  async getAllByUserId(id) {
    const api = `${API}/${id}`;
    const data = await getData(api);
    return data;
  },
  async getSearchRoute(search, id) {
    const api = `${API}/oneWay?name=${search}&id=${id}`;
    const data = await getData(api);
    return data;
  },
};

export default UserRouteLikesService;
