export type ExperienceRequestBody = {
  designation: string;
  companyType: string;
  email: string;
  workMode: string;
  workType: string;
  companyName: string;
  companyId: string;
  companyStartDate: Date;
  companyEndDate: Date;
  isVerified: boolean;
};

export type SkillRequestBody = {
  skillName: string;
  expertise: string;
};

export type IDRequestBody = {
  id_type: 'AADHAR' | 'PAN' | 'DRIVING_LICENSE';
  id_number: string;
};

export type IDVerificationOtpRequestBody = {
  otp: string;
  request_id: string;
  task_id: string;
};

export type ResidentialInfoRequestBody = {
  address_line_1: string;
  address_line_2: string;
  landmark: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
  start_date: Date;
  end_date: Date;
};
