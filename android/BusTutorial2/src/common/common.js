// var IP = 'http://192.168.0.149:8080/';

// export {IP};

let IP = '';

const setIP = newIP => {
  IP = newIP;
  console.log(newIP);
  console.log('ip ne');
};

export {setIP, IP};
