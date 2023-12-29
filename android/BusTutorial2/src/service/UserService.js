import {getIP} from '../common/common';

const IP = getIP();

const API = `${IP}/api`;

// const userAdminApi = "http://localhost:8080/api/admin/user";

const UserService = {
  getInfo() {
    return getDataToken(`${API}/auth/access-token`);
  },
};

export default UserService;
