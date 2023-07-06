export type profileFormType = {
  [key: string]: string | string[];
  firstName: string;
  lastName: string;
  bio: string;
  descriptionTags: string[];
};

export type verifyAadharFormType = {
  aadharNo: string;
  otp: string;
};
export type verifyPANFormType = {
  panNo: string;
};
export type verifyLicenceFormType = {
  licenceNo: string;
  dateOfBirth: Date | null;
};

export type workExperienceFormType = {
  [key: string]: string | Date | null;
  designation: string;
  companyType: string;
  companyName: string;
  linkedInUrl: string;
  workEmail: string;
  companyId: string;
  startDate: Date | null;
  endDate: Date | null;
  workType: string;
  modeOfWork: string;
};

export type residentialInfoFormType = {
  [key: string]: string | number | Date | null;
  address_line_1: string;
  address_line_2: string;
  landmark: string;
  city: string;
  pincode: number | string;
  typeOfAddress: string;
  state: '';
  country: '';
  start_date: Date | null;
  end_date: Date | null;
};

export type skillFormType = {
  [key: string]: string | null;
  skillName: string;
  expertise: string;
};

type PeerVerificationFormType = {
  name: string;
  peerType: string;
  email: string;
  contactNumber: string;
};
