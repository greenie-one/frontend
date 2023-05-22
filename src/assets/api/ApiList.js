const BASE_URL = "https://dev-api.greenie.one";
// const BASE_URL = "http://localhost:8080";

const ApiList = {
  waitlist: `${BASE_URL}/waitlist`,
  signup: `${BASE_URL}/signup`,
  validateOtp: `${BASE_URL}/validateOTP`,
  login: `${BASE_URL}/login`,
  googleAuth: `${BASE_URL}/oauth/google/redirect`,
  googleCallback: `${BASE_URL}/oauth/google/callback`,
  refreshToken: `${BASE_URL}/refresh`,
  resendOtp: `${BASE_URL}/resendOTP`,
  createProfile: `${BASE_URL}/profiles/create`,
  getMyProfile: `${BASE_URL}/profiles/me`,
};

export default ApiList;