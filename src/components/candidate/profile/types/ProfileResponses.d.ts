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
  workType: string;
  updatedAt: string;
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
  location: {
    longitude: number;
    latitude: number;
  };
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
  workExperience?: string;
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
  driving_license: string;
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
  isReal?: StatusType;
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
  fatherName: string;
  VehicleType: string[];
  phoneNumber: string;
  bloodGroup: string;
  pan_type: string;
  aadharLinked: boolean;
  panType: string;
  phoneNumber: string;
  dateOfIssue: string;
  dateOfExpiry: string;
};

type WorkExperience = {
  designation: string;
  companyName: string;
  companyType: string;
  companyId: string;
  linkedInUrl?: string;
  workEmail: string;
  dateOfJoining: string;
  dateOfLeaving?: string;
  worktype: string;
};

type ResidentialType = {
  id: string;
  address_line_1: string;
  address_line_2: string;
  landmark: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
  start_date: string;
  end_date?: string;
  addressType: 'Current' | 'Permanent' | 'Temporary';
  isVerified: boolean;
  capturedLocation: {
    longitude: number;
    latitude: number;
  };
  location: {
    longitude: number;
    latitude: number;
  };
  createdAt: string;
  updatedAt: string;
};

type SkillsVerification = {
  id: string;
  status: StatusType;
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
  isReal: StatusType;
  allQuestions?: AllQuestions;
  otherQuestions: HRQuestions;
  skills: SkillsVerification[];
  documents: DocumentVerification[];
  createdAt?: string;
  updatedAt?: string;
  isVerificationCompleted?: boolean;
};

type AccountDetails = {
  profilePic: string;
  email: string;
  firstName: string;
  greenieId: string;
  lastName: string;
};

type VerificationState = 'PENDING' | 'APPROVED' | 'DISPUTED';
type VerificationStatus = {
  state: VerificationState;
  dispute_type?: string | null;
  dispute_reason?: string | null;
};

type PeersResponse = {
  isReal: StatusType;
  ref: string;
  name: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  verificationBy: string;
  selectedFields: Record<string, VerificationStatus>;
  allQuestions: {
    attitudeRating: string;
    designation: VerificationStatus;
    peerPost: VerificationStatus;
    review: string;
  };
  skills: {
    id: string;
    status: VerificationStatus;
  }[];
  documents: {
    id: string;
    status: VerificationStatus;
  }[];
  createdAt: string;
  updatedAt: string;
  isVerificationCompleted: boolean;
};

type DocumentResponse = {
  _id: string;
  name: string;
  privateUrl: string;
  type: string;
  workExperience: string;
};

type CandidateSkillType = {
  _id: string;
  user: string;
  skillName: string;
  expertise: string;
  workExperience: string;
};

type WorkExperienceDetails = {
  documents: DocumentResponse[];
  peers: WorkPeerReportResponse[];
  workExp: {
    workExperiences: WorkExperience[];
  };
  skills: CandidateSkillType[];
};

type ResidentialDetailsResponse = {
  residentialPeers: PeersResponse[];
  residentialInfo: ResidentialType[];
};

type IdDetailsResponse = {
  aadhar: IdDetails | null;
  pan: IdDetails | null;
  dl: IdDetails | null;
};
type ReportData = {
  accountDetails: AccountDetails;
  workExperienceDetails: WorkExperienceDetails;
  ResidentialDetails: ResidentialDetailsResponse;
  idDetails: IdDetailsResponse;
};
