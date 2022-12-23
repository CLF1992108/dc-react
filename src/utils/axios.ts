
import axios, { AxiosRequestConfig } from "axios";

export enum ResponseStatus {
  Ok = 1,
  InvalidToken = 61,
  Error = 50,
  Disabled = 62,
}

export interface IResponseResult<T = any> {
  code: ResponseStatus;
  msg: string;
  error?: null | string[];
  data: T;
}

/**
 * 列表数据返回格式
 */
export interface IResultList<T = any> {
  current: number;
  total: number;
  size: number;
  data: T[];
}
export const myAxios = axios.create({
  baseURL: API_URL,
});

// 发送请求时的拦截操作
myAxios.interceptors.request.use(
  (config) => {
    if (config.headers) {
      config.headers["Authorization"] = "admin:1:ed6prj0dmk0cp96zpn5ypro700sae77r";
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const ErrorResult = { code: -1, data: null };

myAxios.interceptors.response.use(
  function (response) {
    return Promise.resolve(response.data);
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(ErrorResult);
  }
);

const handleError = async (err: { message: any; }): Promise<IResponseResult<null>> => {
  return { ...ErrorResult, msg: err?.message ?? "请求发生错误" };
};

export async function getReq<T = any>(
  url: string,
  config?: AxiosRequestConfig
) {
  return myAxios.get<T>(url, config).catch(handleError);
}

export async function postReq<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) {
  return myAxios.post<T>(url, data, config).catch(handleError);
}

export async function putReq<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) {
  return myAxios.put<T>(url, data, config).catch(handleError);
}

export async function deleteReq<T = any>(
  url: string,
  config?: AxiosRequestConfig
) {
  return myAxios.delete<T>(url, config).catch(handleError);
}
