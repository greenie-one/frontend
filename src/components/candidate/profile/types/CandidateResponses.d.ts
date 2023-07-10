export interface IDocument {
  id_type: string;
  isVerified: boolean;
}

export type DocumentsResponse = {
  ids: IDocument[];
};

export interface IUserProfileResponse {
  _id: string;
  firstName: string;
  lastName: string;
  bio: string;
  descriptionTags: string[];
}

export interface IWorkExperienceResponse {
  _id: string;
  image: string | null;
  designation: string;
  companyName: string;
  email: string;
  companyId: string;
  companyStartDate: string;
  companyEndDate: string;
  workMode: string;
  workType: string;
  isVerified: boolean;
  verifiedBy: [] | null;
  companyType: string;
}

export interface IResidendialInfoResponse {
  _id: string;
  address_line_1: string;
  address_line_2: string;
  typeOfAddress: string;
  landmark: string;
  pincode: number;
  city: string;
  state: string;
  country: string;
  start_date: Date;
  end_date: Date;
  isVerified: boolean;
}

export type ResidentialInfoRes = {
  residentialInfo: IResidendialInfoResponse[];
};

export interface ISkillResponse {
  _id: string;
  skillName: string;
  expertise: string;
  isVerified: boolean;
}

export interface ISkill {
  skillName: string;
  expertise: string;
  workExperience: string;
}

export interface IAadharVerificationResponse {
  requestId: string;
  taskId: string;
}
