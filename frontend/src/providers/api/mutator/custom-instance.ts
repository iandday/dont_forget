import axios from "axios";
import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
//import { useAuth } from "../../../hooks/useAuth";

//const { user, login, logout } = useAuth();
const user = { token: true, refreshToken: true };
//const navigate = useNavigate();

const AXIOS_INSTANCE = Axios.create({ baseURL: "" });
AXIOS_INSTANCE.interceptors.request.use(
  async (config) => {
    config.baseURL = localStorage.getItem("baseURL")?.toString();

    if (user) {
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // If the error status is 401 and there is no originalRequest._retry flag,
    // if (error.response.status === 401) {
    //   console.log('In');

    // }
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const baseURL = localStorage.getItem("baseURL");

        if (user !== null) {
          if (user.refreshToken) {
            try {
              const response = await axios.post(`${baseURL}/api/user/refresh`, {
                refresh: user.refreshToken,
              });
              const { access, refresh } = response.data;
              login({
                token: access,
                refreshToken: refresh,
                firstName: user.firstName,
                email: user.email,
              });
              // Retry the original request with the new token
              originalRequest.headers.Authorization = `Bearer ${access}`;
              return axios(originalRequest);
            } catch (error) {
              console.log("failed to get new tokens");
              console.log(error.response.status);
              //navigate("/login");
            }
          } else {
            //navigate("/login");
          }
        } else {
          //navigate("/login");
        }
      } catch (error) {
        console.log("refresh failed");
        logout();
        //navigate("/login");
      }
    }
    return Promise.reject(error);
  }
);

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(({ data }) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled by Vue Query");
  };

  return promise;
};

export default customInstance;

export interface ErrorType<Error> extends AxiosError<Error> {}
