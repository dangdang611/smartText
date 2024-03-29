import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { showMessage } from "./status";

class Request {
  // axios实例
  private axiosInstance: AxiosInstance;
  // 公共配置
  private baseConfig: AxiosRequestConfig = {
    timeout: 10000,
  };

  // 构造器，配置axios实例
  constructor(config: AxiosRequestConfig) {
    this.axiosInstance = axios.create(Object.assign(this.baseConfig, config));

    // 请求拦截器
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // 配置请求头
        if (!config.headers) {
          config.headers = {
            // "Content-Type": "application/x-www-form-urlencoded", // 传参方式表单
            "Content-Type": "application/json;charset=UTF-8", // 传参方式json
          };
        }

        if (Cookies.get("smartToken")) {
          // 传的是token
          config.headers.authorization = "Bearer " + Cookies.get("smartToken");
        }

        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    // 响应拦截器
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (err) => {
        const { response } = err;
        return Promise.reject(showMessage(response.status));
      }
    );
  }

  // 请求方法
  public request<T>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.axiosInstance.request(config);
  }
}

export default Request;
