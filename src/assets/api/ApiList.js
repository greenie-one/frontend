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
  searchProfile: `${BASE_URL}/profiles?search=`,
};

const profileAPIList = {
  createProfile: `${BASE_URL}/profiles/create`,
  getMyProfile: `${BASE_URL}/profiles/me`,
}

const documentsAPIList = {
  getDocuments: `${BASE_URL}/documents/me`,
  postDocuments: `${BASE_URL}/documents`,
}

const workExperienceAPiList = {
  getWorkExperience: `${BASE_URL}/workExperience/me`,
  postWorkExperience: `${BASE_URL}/workExperience/create`,
  deleteWorkExperience: `${BASE_URL}/workExperience`,
  updateWorkExperience: `${BASE_URL}/workExperience`,
}

const residentialInfoAPIList = {
  getResidentialInfo: `${BASE_URL}/residential_info/me`,
  postResidentialInfo: `${BASE_URL}/residential_info`,
  deleteResidentialInfo: `${BASE_URL}/residential_info`,
  updateResidentialInfo: `${BASE_URL}/residential_info`,
}

const skillsAPIList = {
  getSkill: `${BASE_URL}/skill/me`,
  postSkill: `${BASE_URL}/skill/create`,
  deleteSkill: `${BASE_URL}/skill`,
  updateSkill: `${BASE_URL}/skill`,
}

export default {ApiList,profileAPIList, documentsAPIList, workExperienceAPiList, residentialInfoAPIList, skillsAPIList};