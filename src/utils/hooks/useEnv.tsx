type useEnvParams = 'BASE_URL';
export const useEnv = (__var__: useEnvParams) => import.meta.env[`VITE_${__var__}`];
