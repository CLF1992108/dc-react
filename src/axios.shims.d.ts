import { AxiosInstance, AxiosRequestConfig, AxiosPromise } from "axios";

declare enum ResponseStatus {
  Ok = 0,
}

/**
 * 列表数据返回格式
 */
declare interface IResultList<T = any> {
  current: number;
  total: number;
  size: number;
  data: T[];
}

/**
 * 定义接口返回的固定格式
 * { code => 状态码, message => '响应信息', data => 数据 }
 */
declare interface IResponseResult<T = any> {
  code: ResponseStatus;
  msg: string;
  data: T;
  error?: null | string[];
}
/**
 * 自定义扩展axios模块
 */
declare module "axios" {
  export interface AxiosInstance {
    request<T = any, R = IResponseResult<T>>(
      config: AxiosRequestConfig
    ): Promise<R>;
    get<T = any, R = IResponseResult<T>>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<R>;
    delete<T = any, R = IResponseResult<T>>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<R>;
    head<T = any, R = IResponseResult<T>>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<R>;
    options<T = any, R = IResponseResult<T>>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<R>;
    post<T = any, R = IResponseResult<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<R>;
    put<T = any, R = IResponseResult<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<R>;
    patch<T = any, R = IResponseResult<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<R>;
  }
}
