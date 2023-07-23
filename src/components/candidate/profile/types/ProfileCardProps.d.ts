type ExperienceCardProp = {
  id: string;
  position: string;
  companyName: string;
  noOfVerifications: number;
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
  start_date: Date | null;
  end_date: Date | null;
  isVerified: boolean;
  city: string;
};

type ResidentialInfoDetailsCardProps = {
  address_line_1: string;
  address_line_2: string;
  landmark: string;
  pincode: number;
  start_date: Date | null;
  end_date: Date | null;
  isVerified: boolean;
  city: string;
  state: string;
  country: string;
  address_type: string;
};
