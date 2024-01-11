import {IP} from '../common/common';

const IPs = IP;

const API = `${IPs}/api`;

// const userAdminApi = "http://localhost:8080/api/admin/user";

const UserService = {
  getInfo() {
    return getDataToken(`${API}/auth/access-token`);
  },
};

export default UserService;
