import { getDataToken } from "../util/fetchApi";
import { Ip } from "../common/common";

// const IPs = Ip;

// const API = `${IPs}api`;

const userService = {
  getInfo() {
    const IPs = Ip;

    const API = `${IPs}api`;
    return getDataToken(`${API}/auth/access-token`);
  },
};

export default userService;
