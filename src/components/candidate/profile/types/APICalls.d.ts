export interface IDocument {
  id_type: string;
  isVerified: boolean;
}

export type DocumentsRes = {
  ids: IDocument[];
};

export interface IUserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  bio: string;
  descriptionTags: string[];
}

export interface IWorkExperience {
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

export interface IResidendialInfoDataType {
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
  residentialInfo: IResidendialInfoDataType[];
};

export interface ISkillDataType {
  _id: string;
  createdAt: string;
  skillName: string;
  expertise: string;
  updatedAt: string;
  user: string;
  __v: number;
}

export interface ISkill {
  skillName: string;
  expertise: string;
  workExperience: string;
}

export interface IAadharVerificationData {
  requestId: string;
  taskId: string;
}
