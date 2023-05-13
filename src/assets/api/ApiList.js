const BASE_URL = "https://dev-api.greenie.one";

const ApiList = {
  waitlist: `${BASE_URL}/waitlist`,
  signup: `${BASE_URL}/signup`,
  refreshToken: `${BASE_URL}/refresh?refreshToken=`,
  validateOtp: `${BASE_URL}/validateOTP`,
  login: `${BASE_URL}/login`,
};

export default ApiList;