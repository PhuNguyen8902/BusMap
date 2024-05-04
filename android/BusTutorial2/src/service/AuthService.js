import {getData} from '../util/fetchApi';

const AuthService = {
  async signIn(form, d) {
    // tra ra 2 du lieu token
    const response = await fetch(`${d}/api/auth/loginAPP`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    return response.status !== 200
      ? null
      : {
          ...JSON.parse(await response.text()),
        };
  },
  async domain(d) {
    const api = `${d}/`;
    const data = await getData(api);
    return data;
  },
};

export default AuthService;
