type ExperienceRequestBody = {
  designation: string;
  companyType: string;
  email: string;
  workMode: string;
  workType: string;
  companyName: string;
  companyId: string;
  dateOfLeaving?: string;
  dateOfJoining: string;
  isVerified: boolean;
  department: string;
  reasonForLeaving: string;
};

type SkillRequestBody = {
  skillName: string;
  expertise: string;
  workExperience: string;
};

type IDRequestBody = {
  id_type: 'AADHAR' | 'PAN' | 'DRIVING_LICENSE';
  id_number: string;
};

type IDVerificationOtpRequestBody = {
  otp: string;
  request_id: string;
  task_id: string;
};

type ResidentialInfoRequestBody = {
  address_line_1: string;
  address_line_2: string;
  landmark: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
  start_date: string;
  end_date?: string;
  addressType: string;
};

type updateProfileRequestBody = {
  firstName?: string;
  lastName?: string;
  bio?: string;
  descriptionTags?: string[];
};
