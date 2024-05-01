import { getData, getDataToken, postData, putData } from "../utils/fetchApi";
import { Ip } from "../common/common";

const IPs = Ip;

const API = `${IPs}api`;

const userAdminApi = `${IPs}api/admin/user`;

const userService = {
  getInfo() {
    return getDataToken(`${API}/auth/access-token`);
  },
  async getAllUser(a) {
    const users = await getData(`${userAdminApi}?${a}`);
    return users;
  },
  async editUser(a) {
    const users = await putData(`${userAdminApi}/edit`, a);
    console.log(users);
    return users;
  },
  async addUser(a) {
    const users = await postData(`${userAdminApi}/add`, a);
    return users;
  },
};

export default userService;
