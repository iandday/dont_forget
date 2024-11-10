import axios from 'axios'
import Axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { AuthContext, AuthProvider } from '../../../context/AuthContext'
import React from 'react'
import useLocalStorage from '@/hooks/use-local-storage'
import { useNavigate } from 'react-router-dom'

const AXIOS_INSTANCE = Axios.create({ baseURL: '' })
AXIOS_INSTANCE.interceptors.request.use(
  async (config) => {
    const { user } = React.useContext(AuthContext)
    const baseUrl = localStorage.getItem('base_url')

    config.baseURL = baseUrl ? baseUrl : ''
    const token = user?.token
    if (token) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    const { user, login, logout } = React.useContext(AuthContext)
    const navigate = useNavigate()
    //const router = useIonRouter()
    // If the error status is 401 and there is no originalRequest._retry flag,
    // if (error.response.status === 401) {
    //   console.log('In');

    // }
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const baseUrl = localStorage.getItem('base_url')
        const tokenString = user?.token

        if (tokenString !== undefined) {
          const token = JSON.parse(tokenString)
          if (token.refresh) {
            try {
              const response = await axios.post(`${baseUrl}/api/user/refresh`, {
                refresh: token?.refresh,
              })
              const { access, refresh } = response.data
              login({
                token: access,
                refreshToken: refresh,
                firstName: token.first_name,
                lastName: token.last_name,
                email: token.email,
              })
              // Retry the original request with the new token
              originalRequest.headers.Authorization = `Bearer ${access}`
              return axios(originalRequest)
            } catch (error) {
              console.log('failed to get new tokens')
              console.log(error!.response!.status)
              navigate('/login')
            }
          } else {
            navigate('/login')
          }
        } else {
          navigate('/login')
        }
      } catch (error) {
        console.log('refresh failed')
        logout()
        navigate('/login')
      }
    }
    return Promise.reject(error)
  }
)

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source()
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data
  )

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled by Vue Query')
  }

  return promise
}

export default customInstance

export interface ErrorType<Error> extends AxiosError<Error> {}
