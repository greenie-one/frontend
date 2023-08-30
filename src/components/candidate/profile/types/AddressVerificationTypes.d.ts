type CreateAddressVerificationRequest = {
  name: string;
  email: string;
  phone: string;
  ref: string;
  verificationBy: string;
};

type GetAddressVerificationResponse = {
  id: string;
  name: string;
  email: string;
  phone: string;
  verificationBy: string;
  ref: string;
  isVerificationCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};

type ResidentialInfoDataResponse = {
  id: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  country: string;
  start_date: string;
  end_date: string;
  pincode: string;
  addressType: string;
  landmark: string;
};

type PeerVerificationErrorResponse = {
  code: string;
  message: string;
  status: number;
  name: string;
  phone: string;
  email: string;
  username: string;
  verificationBy: string;
};

type PeerVerificationDataResponse = {
  name: string;
  phone: string;
  email: string;
  verificationBy: string;

  user: {
    name: string;
    profilePic: string;
  };

  residentialInfo: ResidentialInfoDataResponse;
};

type AddressType = {
  long: number;
  lat: number;
  address: {
    address_line_1: string;
    address_line_2: string;
    landmark: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  formattedAddress: string;
};

type CoordinatesType = {
  latitude: number;
  longitude: number;
};

type FetchedAddressType = {
  description: string;
  placeId: string;
};
