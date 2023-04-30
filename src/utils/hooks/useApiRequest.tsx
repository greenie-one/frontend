import { useState, useCallback } from "react";
import axios from "axios";

type useApiProps<T> = {
  isLoading: boolean;
  error: Error | null;
  sendRequest: (
    url: string,
    method: string,
    data?: T,
    headers?: any
  ) => Promise<T>;
};

const useApi = <T,>(): useApiProps<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const sendRequest = useCallback(
    async (url: string, method: string, data?: T, headers?: any) => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios({
          method,
          url,
          data,
          headers,
        });

        return res.data;
      } catch (err: any) {
        setError(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { isLoading, error, sendRequest };
};

axios.interceptors.request.use((config) => {
  // Add caching mechanism to prevent redundant network requests
  const cacheKey = config.url + JSON.stringify(config.params);
  const cache = localStorage.getItem(cacheKey);
  if (cache) {
    const data = JSON.parse(cache);
    return Promise.resolve({ ...config, data });
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    // Add caching mechanism to prevent redundant network requests
    const cacheKey =
      response.config.url + JSON.stringify(response.config.params);
    localStorage.setItem(cacheKey, JSON.stringify(response.data));
    return response;
  },
  (error) => {
    if (!axios.isCancel(error)) {
      // TODO: Handle errors
    }
    return Promise.reject(error);
  }
);

export default useApi;
