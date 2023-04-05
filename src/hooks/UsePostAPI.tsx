import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

type UsePostAPIProps<T> = {
  url: string;
  data: T;
  config?: AxiosRequestConfig;
};

type UsePostAPIReturn<T> = {
  isLoading: boolean;
  error: Error | null;
  response: any;
  sendRequest: () => void;
};

const usePostAPI = <T,>({
  url,
  data,
  config,
}: UsePostAPIProps<T>): UsePostAPIReturn<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<any>(null);

  const sendRequest = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(url, data, config);
      setResponse(res.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, response, sendRequest };
};

export default usePostAPI;
