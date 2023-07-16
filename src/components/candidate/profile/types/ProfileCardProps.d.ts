type ExperienceCardProp = {
  position: string;
  companyName: string;
  isVerified: boolean;
  companyStartYear: string;
  companyEndYear: string;
};

type VerificationIdCardProp = {
  documentName: string;
  isVerified: boolean;
};

type ResidentialInfoCardProps = {
  address_line_1: string;
  address_line_2: string;
  landmark: string;
  pincode: number;
  start_date: Date;
  end_date: Date;
  isVerified: boolean;
  city: string;
};

type ResidentialInfoDetailsCardProps = {
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
};
