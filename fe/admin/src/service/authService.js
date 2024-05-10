import { Ip } from "../common/common";
import { postData } from "../utils/fetchApi";
const IPs = Ip;

const API = `${IPs}api`;
console.log(API);
const authService = {
  async signIn(form) {
    const IPs = Ip;

    const API = `${IPs}api`;
    const response = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    return response.status !== 200
      ? {
          // error: (await response.json()).mess,
          error: "Login Fail",

        }
      : {
          ...(await response.json()),
        };
  },

  refreshToken(form) {
    return postData(`${API}/auth/refresh-token`, form);
  },
};

export default authService;
