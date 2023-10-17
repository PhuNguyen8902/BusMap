import { getDataToken } from "../util/fetchApi";
const API = "http://localhost:8080/api";

const userService = {
  getInfo() {
    return getDataToken(`${API}/auth/access-token`);
  },
};

export default userService;
