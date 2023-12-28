// var IP = 'http://192.168.0.149:8080/';

// export {IP};

let IP = '';

const getIP = () => IP;

const setIP = newIP => {
  IP = newIP;
};

export {getIP, setIP};
