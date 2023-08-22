/** --- Utility Types --- */
type Coordinates = {
  longitude: number;
  latitude: number;
};

type VerificationStates = 'PENDING' | 'APPROVED' | 'DISPUTED';

type VerificationStatus = {
  state: VerificationStates;
  dispute_type?: string | null;
  dispute_reason?: string | null;
};

type ConductReport = {
  attitudeRating: string;
  designation: VerificationStatus;
  peerPost: VerificationStatus;
  review: string;
};

type EntityVerification = {
  id: string;
  status: VerificationStatus;
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

type CommonIdDetails = {
  id: string;
  id_type: string;
  id_number: string;
  user: string;
  address: NormalizedAddress;
  dob: string;
  fullName: string;
  createdAt: Date;
  updatedAt: string;
};

type AadharDetails = CommonIdDetails;

type PanDetails = CommonIdDetails & {
  phoneNumber: string;
  aadharLinked: boolean;
  pan_type: string;
};

type DLDetails = CommonIdDetails & {
  dateOfIssue: string;
  dateOfExpiry: string;
  fatherName: string;
  bloodGroup: string;
  VehicleType: string[];
};

type WorkExperienceReport = {
  workExp: {
    workExperiences: Array<ExperienceDetails>;
  };
  peers: Array<WorkPeerDetails>;
  documents: Array<WorkDocumentDetails>;
};

type ResidentialDetailsReport = {
  residentialInfo: Array<ResidentialDetails>;
  residentialPeers: Array<ResidentialPeerDetails>;
};

/** --- Type Exports --- */
export type AccountDetails = {
  email: string;
  firstName: string;
  greenieId: string;
  lastName: string;
};

export type ExperienceDetails = {
  id: string;
  designation: string;
  companyType: string;
  email: string;
  workMode: string;
  department: string;
  workType: string;
  companyName: string;
  salary: string;
  dateOfJoining: string;
  linkedInUrl?: string;
  dateOfLeaving: string | null;
  noOfVerifications: number;
  createdAt: string;
  updatedAt: string;
};

export type WorkPeerDetails = {
  ref: string;
  name: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  verificationBy: 'LINE_MANAGER' | 'REPORTING_MANAGER' | 'HR' | 'COLLEAGUE' | 'CXO';
  selectedFields: Record<string, VerificationStatus>;
  allQuestions: ConductReport;
  skills: Array<EntityVerification>;
  documents: Array<EntityVerification>;
  createdAt: string;
  updatedAt: string;
  isVerificationCompleted: boolean;
};

export type WorkDocumentDetails = {
  name: string;
  privateUrl: string;
  type: string;
  workExperience: string;
};

export type ResidentialDetails = {
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
    [key in keyof Coordinates]: number;
  };
  location: Coordinates;
};

export type ResidentialPeerDetails = {
  id: string;
  ref: string;
  name: string;
  email: string;
  phone: string;
  verificationBy: string;
  isVerificationCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type IDDetailsReport = {
  aadhar: AadharDetails | null;
  pan: PanDetails | null;
  dl: DLDetails | null;
};

export type ReportData = {
  accountDetails: AccountDetails;
  workExperienceDetails: WorkExperienceReport;
  ResidentialDetails: ResidentialDetailsReport;
  idDetails: IDDetailsReport;
};
