import { InternalAxiosRequestConfig } from "axios";

export type ConfigAxios = InternalAxiosRequestConfig & {
  _retry?: boolean;
};
