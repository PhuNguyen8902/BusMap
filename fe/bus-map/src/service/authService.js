import { postData } from "../util/fetchApi";

const API = "http://localhost:8080/api";

const authService = {
    async signIn(form) {
        // tra ra 2 du lieu token
        const response = await fetch(`${API}/auth/login`, {
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

    refreshToken(form) {
        return postData(`${API}/auth/refresh-token`, form);
    },

    async signUp(form) {
        // tra ra 2 du lieu token
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
    }

};

export default authService;
