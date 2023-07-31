type DocsType = {
  id_type: string;
  isVerified: boolean;
};

type DocumentsResponse = {
  ids: DocsType[];
};

type UserProfileType = {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  descriptionTags: string[];
  profilePic?: string;
  greenieId?: string;
};

type WorkExperience = {
  companyId?: string;
  companyName: string;
  companyType: string;
  dateOfJoining: string;
  dateOfLeaving: string;
  department: string;
  designation: string;
  email: string;
  id: string;
  image?: string | null;
  linkedInUrl?: string;
  noOfVerifications: 0;
  salary: string;
  workMode: string;
  workType: string;
};

type workExperienceResponse = {
  workExperiences: WorkExperience[];
};

type ResidentialInfoResponse = {
  id: string;
  address_line_1: string;
  address_line_2: string;
  addressType: string;
  landmark: string;
  pincode: number;
  city: string;
  state: string;
  country: string;
  start_date: Date | null;
  end_date: Date | null;
  isVerified: boolean;
};

type ResidentialInfoRes = {
  residentialInfo: {
    residentialInfos: ResidentialInfoResponse[];
  };
};

type SkillResponse = {
  id: string;
  skillName: string;
  expertise: string;
  isVerified: boolean;
  workExperience: string;
};

type Skill = {
  skillName: string;
  expertise: string;
  workExperience: string;
};

type AadharVerificationResponse = {
  requestId: string;
  taskId: string;
};

type AddAadhar = {
  request_id: string;
  taskId: string;
};

type verifyAadhar = {
  success: boolean;
  aadhar: string;
};

type verifyPan = {
  success: boolean;
  pan: string;
};

type verifyLicence = {
  success: boolean;
  driving_licence: string;
};

type createExperience = {
  success: boolean;
  id: string;
};

type createResidentialInfo = {
  success: boolean;
  residentialInfo: string;
};

type createSkill = {
  success: boolean;
  skill: string;
};

type UpdateResponse = {
  success: boolean;
  message: string;
};
type DeleteResponse = {
  success: boolean;
  message: string;
};

type addPeerResponse = {
  email: string;
  name: string;
  peerType: string;
  phone: string;
  workExperience: string;
  _id: string;
};

type SentRequestsResponseType = {
  id: string;
  email: string;
  name: string;
  phone: string;
  isVerificationCompleted: boolean;
  workExperience: string;
  createdAt: string;
  updatedAt: string;
  peerPost: string;
};
