import {IP} from '../common/common';

const IPs = IP;

const API = `${IPs}/api`;

const UserService = {
  getInfo() {
    return getDataToken(`${API}/auth/access-token`);
  },
};

export default UserService;
