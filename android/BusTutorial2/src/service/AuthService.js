import {getIP} from '../common/common';

const IP = getIP();
const AuthService = {
  async signIn(form) {
    // tra ra 2 du lieu token
    const response = await fetch(`${IP}/api/auth/login`, {
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
};

export default AuthService;
