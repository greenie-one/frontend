type IDocument = {
  id_type: string;
  isVerified: boolean;
};

type DocumentsRes = {
  ids: IDocument[];
};

type IUserProfile = {
  _id: string;
  firstName: string;
  lastName: string;
  bio: string;
  descriptionTags: string[];
};

type IWorkExperience = {
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
};

type IResidendialInfoDataType = {
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
};

type ResidentialInfoRes = {
  residentialInfo: IResidendialInfoDataType[];
};

type ISkillDataType = {
  _id: string;
  createdAt: string;
  skillName: string;
  expertise: string;
  updatedAt: string;
  user: string;
  __v: number;
};

type ISkill = {
  skillName: string;
  expertise: string;
  workExperience: string;
};

type IAadharVerificationData = {
  requestId: string;
  taskId: string;
};
