import {IP} from '../common/common';

const IPs = IP;
const AuthService = {
  async signIn(form) {
    // tra ra 2 du lieu token
    const response = await fetch(`${IPs}/api/auth/loginAPP`, {
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
