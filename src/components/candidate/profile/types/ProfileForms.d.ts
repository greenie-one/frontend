type profileFormType = {
  firstName: string;
  lastName: string;
  bio: string;
  descriptionTags: string[];
  profilePic: string;
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
  designation: string;
  companyType: string;
  companyName: string;
  linkedInUrl: string;
  department: string;
  workEmail: string;
  companyId: string;
  reasonForLeaving: string;
  startDate: string;
  endDate?: string;
  workType: string;
  modeOfWork: string;
  salary: string;
};

type residentialInfoFormType = {
  address_line_1: string;
  address_line_2: string;
  landmark: string;
  city: string;
  pincode: number | string;
  address_type: string;
  state: '';
  country: '';
  start_date: string;
  end_date?: string;
};

type skillFormType = {
  skillName: string;
  expertise: string;
};

type PeerVerificationFormType = {
  name: string;
  peerType: string;
  email: string;
  contactNumber: string;
};

type residentialInfoVerificationFormType = {
  name: string;
  peerType: string;
  email: string;
  phone: string;
};

type peerAddressVerificationFromType = {
  otp: string;
};
