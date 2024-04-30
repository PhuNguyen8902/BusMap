import { getData, getDataToken, postData, putData } from "../utils/fetchApi";
import Ip from "../common/common"


const API = "http://localhost:8080/api";

const userAdminApi = "http://localhost:8080/api/admin/user";

const userService = {
  getInfo() {
    const IPs = Ip;
    const API = `${IPs}api`;

    return getDataToken(`${API}/auth/access-token`);
  },
  async getAllUser(a) {
    const IPs = Ip;
    const userAdminApi = `${IPs}api/admin/user`;

    const users = await getData(`${userAdminApi}?${a}`);
    return users;
  },
  async editUser(a) {
    const IPs = Ip;
    const userAdminApi = `${IPs}api/admin/user`;

    const users = await putData(`${userAdminApi}/edit`, a);
    console.log(users);
    return users;
  },
  async addUser(a) {
    const IPs = Ip;
    const userAdminApi = `${IPs}api/admin/user`;
    
    const users = await postData(`${userAdminApi}/add`, a);
    return users;
  },
};

export default userService;
