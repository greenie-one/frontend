type DocsType = {
  id: string;
  id_type: 'AADHAR' | 'PAN' | 'DRIVING_LICENSE';
  id_number: string;
  user: string;
  address: {
    address_line_1: string;
    address_line_2: string;
    city: string;
    street: string;
    country: string;
    state: string;
    pincode: string;
    type: string;
    _id: string;
  };
  fullName: string;
  dob: string;
  createdAt: Date | null;
  updatedAt: Date | null;
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
  email?: string;
  phone?: string;
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
  noOfVerifications: number;
  salary: string;
  workMode: string;
  worktype: string;
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

type NormalizedAddress = {
  address_line_1: string;
  address_line_2: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  type: string;
};

type IdDetails = {
  id: string;
  id_type: string;
  id_number: string;
  user: string;
  address: NormalizedAddress[];
  dob: string;
  fullName: string;
  location: string;
  createdAt: Date;
  updatedAt: string;
};

type WorkExperience = {
  designation: string;
  companyName: string;
  companyType: string;
  companyId: string;
  linkedInUrl?: string;
  workEmail: string;
  dateOfJoining: Date;
  dateOfLeaving?: Date;
  worktype: string;
};

type ResidentialType = {
  id: string;
  address_line_1: string;
  address_line_2: string;
  landmark: string;
  pincode: number;
  start_date: string;
  endDate?: string;
  city: string;
  country: string;
  addressType: string;
  location: string;
};

type WorkPeerReportResponse = {
  ref: string;
  name: string;
  email: string;
  phone: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  verificationBy: WorkVerificationBy;
  selectedFields?: SelectedFields;
  allQuestions?: AllQuestions;
  otherQuestions: HRQuestions;
  skills: SkillsVerification[];
  documents: DocumentVerification[];
  createdAt?: Date;
  updatedAt?: Date;
  isVerificationCompleted?: boolean;
};

type ReportData = {
  accountDetails: {
    greenieId?: string;
  };
  workExperienceDetails: {
    peers: WorkPeerReportResponse[];
    workExp: {
      workExperiences: WorkExperience[];
    };
  };
  ResidentialDetails: {
    residentialPeers: GetUserPeersResponse[];
    residentialInfo: {
      residentialInfos: ResidentialType[];
    };
  };
  idDetails: IdDetails[];
};
