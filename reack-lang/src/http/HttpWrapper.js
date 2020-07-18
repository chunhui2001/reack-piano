import Http from './Http';

export class HttpWrapper {

    create (headers) {
        Http.interceptors.request.use(
          config => {
            if (headers) {
                for (const [key, value] of Object.entries(headers)) {
                    config.headers[key] = value;
                }
            }
            return config;
          },
          err => {
            return Promise.reject(err);
        });
        return Http;
    }

}

export default new HttpWrapper();

