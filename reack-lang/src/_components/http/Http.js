import axios from 'axios';
import Lang from '../lang/Lang';

let http = axios.create({
  headers: {

  }
});

http.interceptors.request.use(
  config => {
    if (config.data) {
      config.data = Lang.setEmptyValueToNull(config.data);
    }
    return config;
  },
  err => {
    return Promise.reject(err);
});

http.interceptors.response.use(
  response => {
    // 拦截响应，做统一处理 
    if (process.env.NODE_ENV !== 'production') {
      console.log(response, response.config.url);
    }
    return response;
  },
  // 接口错误状态处理
  error => {
    if (!error.response) {
      console.error(error.message, '[in http.js]');
      return Promise.reject(error.message);
    }
    console.error(error.response.data.message, error.response.config.url);
    return Promise.resolve(error.response);
});

// 服务端返回的结构统一处理成客户端友好的结构
// .. 

export default http;