import { postData } from "../util/fetchApi";
import { Ip } from "../common/common";

// const IPs = Ip;

// const API = `${IPs}api`;

const authService = {
  async signIn(form) {
    // tra ra 2 du lieu token

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
          // error: (await response.json()).error,
          error: "Login Fail",
        }
      : {
          ...(await response.json()),
        };
  },

  refreshToken(form) {
    const IPs = Ip;

    const API = `${IPs}api`;
    return postData(`${API}/auth/refresh-token`, form);
  },

  async signUp(form) {
    // tra ra 2 du lieu token
    const IPs = Ip;

    const API = `${IPs}api`;
    const response = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    return response.status !== 200
      ? {
          error: (await response.json()).error,
        }
      : {
          ...(await response.json()),
        };
  },
};

export default authService;
