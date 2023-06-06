import { useState, useEffect } from 'react';

export const useDebounce = (queryValue: string, debounceTime: number = 500): string => {
  const [debouncedValue, setDebouncedValue] = useState<string>(queryValue);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(queryValue);
    }, debounceTime);

    return () => clearTimeout(timeoutId);
  }, [queryValue, debounceTime]);

  return debouncedValue;
};
