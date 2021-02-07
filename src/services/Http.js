import axios from 'axios';

export default axios.create({
  baseURL: 'https://www.thetutorsdirectory.com/app/api/index.php',
  //   baseURL: 'http://192.168.3.7/index.php',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json',
  validateStatus: (status) => status <= 404,
});
