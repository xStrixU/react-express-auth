import axios from 'axios';

import type { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

export const axiosWrapper = {
  get: <Response>(url: string, config?: AxiosRequestConfig<never>) =>
    axiosInstance.get<Response, AxiosResponse<Response>, never>(url, config),
  post: <Data, Response>(
    url: string,
    data?: Data,
    config?: AxiosRequestConfig<Data>
  ) =>
    axiosInstance.post<Response, AxiosResponse<Response>, Data>(
      url,
      data,
      config
    ),
  put: <Data, Response>(
    url: string,
    data?: Data,
    config?: AxiosRequestConfig<Data>
  ) =>
    axiosInstance.put<Response, AxiosResponse<Response>, Data>(
      url,
      data,
      config
    ),
  delete: <Response>(url: string, config?: AxiosRequestConfig<never>) =>
    axiosInstance.delete<Response, AxiosResponse<Response>, never>(url, config),
};
