type getEnvValueParams = 'BASE_URL';
export const getEnvValue = (__var__: getEnvValueParams) => import.meta.env[`VITE_${__var__}`];
