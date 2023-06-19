type useEnvParams = 'BASE_URL';
export const useEnv = (__var__: useEnvParams) => {
  const envVar = `VITE_${__var__}`;
  return import.meta.env[envVar];
};
