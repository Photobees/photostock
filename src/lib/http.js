import axios from "axios";

class Http {
  constructor(baseURL, headers = {}) {
    this.axiosInstance = axios.create({
      baseURL,
      headers,
    });
  }

  get(url, data) {
    return this.axiosInstance({ method: "GET", url, params: data });
  }

  post(url, data) {
    return this.axiosInstance({ method: "POST", url, data });
  }
}

const httpClient = new Http("/api");

export default Object.freeze(httpClient);
