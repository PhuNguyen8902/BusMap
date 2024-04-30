// var IP = 'http://192.168.0.7:8080/';

// export default IP;

let Ip = '';

if(JSON.parse(localStorage.getItem('domain')) !== null){
  Ip = JSON.parse(localStorage.getItem('domain'));
}

// console.log(Ip);

const setIP = newIP => {
  Ip = newIP;
};

export {setIP, Ip};
