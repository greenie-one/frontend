import { UseStylesOptions, MantineTheme } from '@mantine/core';

type UseStyles = {
  searchListContainer: string;
  searchList: string;
  searchListItem: string;
  profileThumbnail: string;
  profileImg: string;
  profileDetails: string;
  profileName: string;
  verifiedIcon: string;
  designation: string;
  rating: string;
  starIcon: string;
};

type CreatePeerResponseType = {
  name: string;
  email: string;
  phone: string;
  ref: string;
  verificationBy: string;
  optionalVerificationFields: Array<string>;
  verificationDocuments: Array<string>;
  verificationSkills: Array<string>;
};

type UseStylesType = (
  params: void,
  options?: UseStylesOptions<string>
) => {
  classes: UseStyles;
  cx: (...args: string[]) => string;
  theme: MantineTheme;
};

type Document = {
  document: File | undefined;
  documentTag: string | null;
};

type Peer = {
  email: string;
  name: string;
  peerType: string;
  phone: string;
  workExperience: string;
  _id?: string;
};

type WorkExperienceVerification = {
  id: string;
  image: string | null;
  designation: string;
  companyName: string;
  isVerified: boolean;
};

type SearchListObject = {
  createdAt: string;
  descriptionTags: string[];
  firstName: string;
  lastName: string;
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
  thumbnail: string | undefined;
  designation: string | undefined;
  rating: number | undefined;
  verified: boolean | undefined;
};

type SearchListContentType = {
  results: SearchListObject[];
  classes: UseStyles;
};

type SearchResponse = {
  profiles: SearchListObject[];
};

type ResidentialInfoPeerType = {
  name: string;
  email: string;
  peerType: string;
  phone: string;
};

type ExperienceDocuments = {
  _id: string;
  name: string;
  type: string;
  privateUrl: string;
  workExperience: string;
};

type ExperienceDetailsModal = 'Verify Experience' | 'Show Documents' | 'Show Skills' | null;
