import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";

type useApiProps<T> = {
  isLoading: boolean;
  error: Error | null;
  sendRequest: (
    url: string,
    method: string,
    onSuccess?: (data: T) => void,
    data?: T,
    headers?: any
  ) => void;
};

const useApi = <T,>(): useApiProps<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [cancelToken, setCancelToken] = useState<CancelTokenSource | null>(
    null
  );

  useEffect(() => {
    return () => {
      if (cancelToken) {
        cancelToken.cancel();
      }
    };
  }, [cancelToken]);

  const sendRequest = async (
    url: string,
    method: string,
    onSuccess?: (data: T) => void,
    data?: T,
    headers?: any
  ) => {
    setIsLoading(true);
    setError(null);

    if (cancelToken) {
      cancelToken.cancel();
    }

    const newCancelToken = axios.CancelToken.source();
    setCancelToken(newCancelToken);

    try {
      const res = await axios({
        method,
        url,
        data,
        headers: {
          ...headers,
          cancelToken: newCancelToken.token,
        },
      });

      if (onSuccess) onSuccess(res.data);
    } catch (err: any) {
      if (!axios.isCancel(err)) {
        setError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, sendRequest };
};

export default useApi;
