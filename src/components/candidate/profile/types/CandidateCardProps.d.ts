export interface IExperienceCardProp {
  position: string;
  companyName: string;
  isVerified: boolean;
  companyStartYear: string;
  companyEndYear: string;
}

export interface IVerificationIdCardProp {
  documentName: string;
  isVerified: boolean;
}

export interface IResidentialInfoCardProps {
  address_line_1: string;
  address_line_2: string;
  landmark: string;
  pincode: number;
  start_date: Date;
  end_date: Date;
  isVerified: boolean;
  city: string;
}

export interface IResidentialInfoDetailsCardProps {
  address_line_1: string;
  address_line_2: string;
  landmark: string;
  pincode: number;
  start_date: Date;
  end_date: Date;
  isVerified: boolean;
  city: string;
  state: string;
  country: string;
  address_type: string;
}
