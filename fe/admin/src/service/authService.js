import { postData } from "../utils/fetchApi";

const API = "http://localhost:8080/api";

const authService = {
  async signIn(form) {
    const response = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    return response.status !== 200
      ? {
          error: (await response.json()).mess,
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
