import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

type UseGetAPIProps = {
  url: string;
  config?: AxiosRequestConfig;
};

type UseGetAPIReturn<T> = {
  isLoading: boolean;
  error: Error | null;
  response: T | null;
};

const useGetAPI = <T,>({ url, config }: UseGetAPIProps): UseGetAPIReturn<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get<T>(url, config);
        setResponse(res.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, config]);

  return { isLoading, error, response };
};

export default useGetAPI;
