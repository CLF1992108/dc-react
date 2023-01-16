
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
      config.headers["Authorization"] = getCookie("admin-token") || "admin:1:ed6prj0a4c0cpna677u6q4o100g8t0lt";
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
/**
 * 
 * @param key            就是key
 * @param value          就是value
 * @param time:number    以毫秒的形式设置过期时间         ===》3000  
 * @param time:string    以时间字符的形式设置过期时间    ===》Sat, 13 Mar 2017 12:25:57 GMT  
 * @param time:Date      以Date设置过期时间             ===》new Date(2017, 03, 12)
 * 
 * @param defaultTime     如果没有时间参数，设置默认过期时间 单位毫秒
 */

const defaultTime = 86400000
//设置cookie
export function setCookie(key: string, value: string, time?: number | Date) {
  let invalid = new Date();;
  if (time) {
    switch (typeof time) {
      case 'number':
        invalid.setTime(invalid.getTime() + time)
        break;
      default:
        invalid = time
    }
  } else {
    invalid.setTime(invalid.getTime() + defaultTime)
  }
  //字符串拼接cookie
  window.document.cookie = key + "=" + value + ";path=/;expires=" + invalid.toUTCString();
};

//读取cookie
export function getCookie(param: string) {
  var c_param = '';
  if (document.cookie.length > 0) {
    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('='); //再次切割
      //判断查找相对应的值
      if (arr2[0] == param) {
        c_param = arr2[1];
        //保存到保存数据的地方
      }
    }
    return c_param;
  }
  return ""
};


