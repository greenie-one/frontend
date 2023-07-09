import { useState, useCallback } from 'react';
import axios from 'axios';

type useApiProps<T> = {
  isLoading: boolean;
  error: Error | null;
  sendRequest: (url: string, method: string, data?: T, headers?: any) => Promise<T>;
};

const useApi = <T,>(): useApiProps<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [isSendingRequest, setIsSendingRequest] = useState<boolean>(false);

  const sendRequest = useCallback(
    async (url: string, method: string, data?: T, headers?: any) => {
      if (isSendingRequest) {
        return Promise.resolve(null);
      }

      setIsSendingRequest(true);
      setIsLoading(true);
      setError(null);

      try {
        const res = await axios({
          method,
          url,
          data,
          headers: {
            ...headers,
          },
        });

        return res.data;
      } catch (err: any) {
        setError(err.response?.data);
      } finally {
        setIsSendingRequest(false);
        setIsLoading(false);
      }
    },
    [isSendingRequest]
  );

  return { isLoading, error, sendRequest };
};

export default useApi;
