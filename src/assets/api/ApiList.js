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
  documents: `${BASE_URL}/documents/me`,
  postDocuments: `${BASE_URL}/documents`,
  workExperience: `${BASE_URL}/workExperience/me`,
  postWorkExperience: `${BASE_URL}/workExperience/create`,
  residentialInfo: `${BASE_URL}/residential_info/me`,
  postResidentialInfo: `${BASE_URL}/residential_info`,
  skill: `${BASE_URL}/skill/me`,
  postSkill: `${BASE_URL}/skill/create`,
  resendOtp: `${BASE_URL}/resendOTP`,
  createProfile: `${BASE_URL}/profiles/create`,
  getMyProfile: `${BASE_URL}/profiles/me`,
  searchProfile: `${BASE_URL}/profiles?search=`,
};

export default ApiList;