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
  companyType?: string;
  email: string;
  workMode?: string;
  workType?: string;
  companyName: string;
  companyId: string;
  isVerified?: boolean;
  description?: string;
  verifiedBy?: string;
  dateOfJoining?: string;
  linkedInUrl?: string;
  dateOfLeaving?: string;
  department: string;
  salary: string;
};

type residentialInfoFormType = {
  address_line_1: string;
  address_line_2: string;
  landmark: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
  start_date: {
    month: string;
    year: string;
  };
  end_date?: {
    month: string;
    year: string;
  };
  addressType: string;
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
