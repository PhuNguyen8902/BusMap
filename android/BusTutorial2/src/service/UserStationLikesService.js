import {getData} from '../util/fetchApi';

const API = `/api/userStationLikes`;

const UserStationLikesService = {
  async getAllByUserId(id, d) {
    const api2 = d + API;

    const api = `${api2}/${id}`;
    const data = await getData(api);
    return data;
  },
  async getSearchRoute(search, id, d) {
    const api2 = d + API;

    const api = `${api2}/oneWay?name=${search}&id=${id}`;
    const data = await getData(api);
    return data;
  },

  async add(form, d) {
    const api2 = d + API;

    // tra ra 2 du lieu token
    const response = await fetch(`${api2}/add`, {
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
  async delete(form, d) {
    const api2 = d + API;

    // tra ra 2 du lieu token
    const response = await fetch(`${api2}/delete`, {
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
