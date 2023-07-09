type profileFormType = {
  [key: string]: string | string[];
  firstName: string;
  lastName: string;
  bio: string;
  descriptionTags: string[];
};

type verifyAadharFormType = {
  aadharNo: string;
  otp: string;
};

type verifyPANFormType = {
  panNo: string;
};

type verifyLicenceFormType = {
  licenceNo: string;
  dateOfBirth: Date | null;
};

type workExperienceFormType = {
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

type residentialInfoFormType = {
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

type skillFormType = {
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
