import { useEnv } from "../../utils/hooks/useEnv";

const BASE_URL = useEnv("BASE_URL");

export const authApiList = {
  waitlist: `${BASE_URL}/waitlist`,
  signup: `${BASE_URL}/auth/signup`,
  validateOtp: `${BASE_URL}/auth/validateOTP`,
  login: `${BASE_URL}/auth/login`,
  googleAuth: `${BASE_URL}/oauth/google/redirect`,
  googleCallback: `${BASE_URL}/oauth/google/callback`,
  refreshToken: `${BASE_URL}/refresh`,
  resendOtp: `${BASE_URL}/auth/resendOTP`,
  forgetPassowordOTP: `${BASE_URL}/auth/forgot_password`,
  forgetPassowordValidate: `${BASE_URL}/auth/validate_forgot_password`,
  changePassoword: `${BASE_URL}/auth/change_password`

};

export const profileAPIList = {
  createProfile: `${BASE_URL}/profiles/create`,
  getMyProfile: `${BASE_URL}/profiles/me`,
  searchProfile: `${BASE_URL}/profiles?search=`,
}

export const documentsAPIList = {
  getDocuments: `${BASE_URL}/ids/me`,
  postDocuments: `${BASE_URL}/ids`,
}

export const workExperienceAPiList = {
  getWorkExperience: `${BASE_URL}/workExperience/me`,
  postWorkExperience: `${BASE_URL}/workExperience/create`,
  deleteWorkExperience: `${BASE_URL}/workExperience`,
  updateWorkExperience: `${BASE_URL}/workExperience`,
}

export const residentialInfoAPIList = {
  getResidentialInfo: `${BASE_URL}/residential_info/me`,
  postResidentialInfo: `${BASE_URL}/residential_info`,
  deleteResidentialInfo: `${BASE_URL}/residential_info`,
  updateResidentialInfo: `${BASE_URL}/residential_info`,
}

export const skillsAPIList = {
  getSkill: `${BASE_URL}/skill/me`,
  postSkill: `${BASE_URL}/skill/create`,
  deleteSkill: `${BASE_URL}/skill`,
  updateSkill: `${BASE_URL}/skill`,
}

