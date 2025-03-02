import useAuthStore, { USER_PROVIDE_SYMBOL } from '@/store/useAuthStore';
import type { GetItemRequest, GetListRequest } from '@/types';
import { ElNotification } from 'element-plus';
import { inject } from 'vue';

export default () =>
  ((baseUrl: string, defaultConfig?: RequestInit) => {
    const { token } = inject<ReturnType<typeof useAuthStore>>(USER_PROVIDE_SYMBOL)!;
    console.log('token', token);

    const get = <TResponse>(
      url: string,
      query?: GetListRequest | GetItemRequest,
      config?: RequestInit,
    ): Promise<TResponse> => {
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        if (query) {
          if ('id' in query) {
            (Object.keys(query) as (keyof typeof query)[]).forEach((queryParamKey) =>
              params.append(queryParamKey as string, query[queryParamKey]!.toString()),
            );
          } else {
            params.append('data', JSON.stringify(query));
          }
        }
        const paramsStr = params.toString();

        fetch(`${baseUrl}${url}${paramsStr ? `?${paramsStr}` : ''}`, {
          ...defaultConfig,
          ...config,
          headers: {
            Accept: 'application/json',
            ...defaultConfig?.headers,
            ...config?.headers,
            ...(token.value && {
              Authorization: 'Bearer ' + token.value,
            }),
          },
          method: 'GET',
        }).then(
          (result) => resolve(result.json()),
          (error) => {
            ElNotification({
              title: 'Error',
              message: String(error),
              type: 'error',
            });
            reject(error);
          },
        );
      });
    };

    const post = <TResponse>(
      url: string,
      body?: Record<string, unknown>,
      config?: RequestInit,
    ): Promise<TResponse> => {
      return new Promise((resolve, reject) => {
        fetch(`${baseUrl}${url}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            ...defaultConfig?.headers,
            ...config?.headers,
            ...(token.value && {
              Authorization: 'Bearer ' + token.value,
            }),
          },
          body: JSON.stringify(body),
        })
          .then((result) => result.json())
          .then((response) => resolve(response))
          .catch((error) => {
            ElNotification({
              title: 'Error',
              message: String(error),
              type: 'error',
            });
            reject(error);
          });
      });
    };

    const put = <TResponse>(
      url: string,
      body?: Record<string, unknown>,
      config?: RequestInit,
    ): Promise<TResponse> => {
      return new Promise((resolve, reject) => {
        fetch(`${baseUrl}${url}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            ...defaultConfig?.headers,
            ...config?.headers,
            ...(token.value && {
              Authorization: 'Bearer ' + token.value,
            }),
          },
          body: JSON.stringify(body),
        })
          .then((result) => result.json())
          .then((response) => resolve(response))
          .catch((error) => {
            ElNotification({
              title: 'Error',
              message: String(error),
              type: 'error',
            });
            reject(error);
          });
      });
    };

    const del = <TResponse>(
      url: string,
      id: string | number,
      config?: RequestInit,
    ): Promise<TResponse> => {
      return new Promise((resolve, reject) => {
        fetch(`${baseUrl}${url}/${id}`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            ...defaultConfig?.headers,
            ...config?.headers,
            ...(token.value && {
              Authorization: 'Bearer ' + token.value,
            }),
          },
        })
          .then((result) => result.json())
          .then((response) => resolve(response))
          .catch((error) => {
            ElNotification({
              title: 'Error',
              message: String(error),
              type: 'error',
            });
            reject(error);
          });
      });
    };

    return { get, post, put, del };
  })(import.meta.env.VITE_BASE_URL);
