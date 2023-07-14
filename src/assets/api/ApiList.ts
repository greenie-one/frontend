import { useEnv } from "../../utils/hooks/useEnv";

const BASE_URL = useEnv("BASE_URL");

export const authApiList = {
  waitlist: `${BASE_URL}/waitlist`,
  signup: `${BASE_URL}/auth/signup`,
  validateOtp: `${BASE_URL}/auth/validateOTP`,
  login: `${BASE_URL}/auth/login`,
  googleAuth: `${BASE_URL}/auth/redirect/google`,
  googleCallback: `${BASE_URL}/auth/callback/google`,
  refreshToken: `${BASE_URL}/auth/refresh`,
  resendOtp: `${BASE_URL}/auth/resendOTP`,
  forgotpasswordOtp: `${BASE_URL}/auth/forgot_password`,
  forgotpasswordValidate: `${BASE_URL}/auth/validate_forgot_password`,
  changePassword: `${BASE_URL}/auth/change_password`
};

export const profileAPIList = {
  createProfile: `${BASE_URL}/profiles/create`,
  getMyProfile: `${BASE_URL}/profiles/me`,
  searchProfile: `${BASE_URL}/profiles?search=`,
  updateProfile: `${BASE_URL}/profiles/update`,
  updateProfilePicture: `${BASE_URL}/utils/profile_pic`,
}

export const documentsAPIList = {
  getDocuments: `${BASE_URL}/ids/me`,
}

export const aadharAPIList = {
  requestOTPForAadhar: `${BASE_URL}/ids/aadhar/request-otp`,
  verifyOTPForAadhar: `${BASE_URL}/ids/aadhar/verify-otp`
}

export const PANAPIList = {
  verifyPAN: `${BASE_URL}/ids/pan/verify`
}

export const drivinglicenseAPIList = {
  verifylicense: `${BASE_URL}/ids/driving-license/verify`
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
  getSkill: `${BASE_URL}/skill/get`,
  postSkill: `${BASE_URL}/skill/create`,
  deleteSkill: `${BASE_URL}/skill`,
  updateSkill: `${BASE_URL}/skill`,
}

export const docDepotAPIList = {
  uploadDocument: `${BASE_URL}/utils/doc_depot`,
  addDocument: `${BASE_URL}/documents/create`,
  getDocument: `${BASE_URL}/documents/`,
  getAllDocuments: `${BASE_URL}/documents/me`,
  deleteDocument: `${BASE_URL}/documents`,
  updateDocument: `${BASE_URL}/documents`
}

export const peerVerificationAPIList = {
  createPeer : `${BASE_URL}/peer/create`,
  getPeer: `${BASE_URL}/peer`,
  getSinglePeer: `${BASE_URL}/peer`,
  getPeerSkills: `${BASE_URL}/peer`
}

