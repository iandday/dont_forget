import { useUserStore } from "@/store/user-store";
import axios, { InternalAxiosRequestConfig } from "axios";
import Axios, { AxiosError, AxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const AXIOS_INSTANCE = Axios.create({ baseURL: "" });
AXIOS_INSTANCE.interceptors.request.use(
  async (config) => {
    const token = useUserStore.getState().user?.accessToken;
    const baseUrl = JSON.parse(localStorage.getItem("base_url"));
    config.baseURL = baseUrl ? baseUrl : "";

    if (token) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

AXIOS_INSTANCE.interceptors.response.use(
  function (response) {
    return response;
  },

  async function (error: AxiosError) {
    const originalRequest: CustomAxiosRequestConfig | undefined = error.config;
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      originalRequest.url !== "/api/users/login"
    ) {
      originalRequest._retry = true;
      try {
        const baseUrl = localStorage.getItem("base_url");
        const refreshToken = useUserStore.getState().user?.refreshToken;

        if (refreshToken) {
          try {
            const response = await axios.post(`${baseUrl}/api/user/refresh`, {
              refresh: refreshToken,
            });
            const { access, refresh } = response.data;

            useUserStore.setState({
              user: {
                accessToken: access,
                refreshToken: refresh,
                firstName: useUserStore.getState().user?.firstName,
                lastName: useUserStore.getState().user?.lastName,
                email: useUserStore.getState().user?.email,
              },
            });

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${access}`;
            return axios(originalRequest);
          } catch (error) {
            useUserStore.setState({ user: null });
            //removeCredentials();
            //navigate("/login");
            window.location.href = "/login";
          }
        } else {
          useUserStore.setState({ user: null });
          window.location.href = "/login";
        }
      } catch (error) {
        useUserStore.setState({ user: null });
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(({ data }) => data);

  // @ts-expect-error cancel is not a function on the promise
  promise.cancel = () => {
    source.cancel("Query was cancelled by React Query");
  };

  return promise;
};

export default customInstance;

export interface ErrorType<Error> extends AxiosError<Error> {}
