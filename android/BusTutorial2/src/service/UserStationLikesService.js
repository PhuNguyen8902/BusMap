import {IP} from '../common/common';
import {getData} from '../util/fetchApi';

const IPs = IP;

const API = `${IPs}/api/userStationLikes`;

const UserStationLikesService = {
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

  async add(form) {
    console.log(form);
    // tra ra 2 du lieu token
    const response = await fetch(`${API}/add`, {
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
  async delete(form) {
    // tra ra 2 du lieu token
    const response = await fetch(`${API}/delete`, {
      method: 'DELETE',
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

export default UserStationLikesService;
