import { getData } from "../utils/fetchApi";
const API = "http://localhost:8080/api";

const userService = {
  getInfo() {
    return getData(`${API}/auth/access-token`);
  },
};

export default userService;
