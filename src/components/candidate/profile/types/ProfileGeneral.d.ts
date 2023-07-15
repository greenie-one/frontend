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

type UseStylesType = (
  params: void,
  options?: UseStylesOptions<string>
) => {
  classes: UseStyles;
  cx: (...args: string[]) => string;
  theme: MantineTheme;
};

export type Document = {
  document: File | undefined;
  documentTag: string | null;
};

export type Peer = {
  email: string;
  name: string;
  peerType: string;
  phone: string;
  workExperience: string;
  _id: string;
};

export interface IWorkExperienceVerification {
  workExId: string;
  image: string | null;
  designation: string;
  companyName: string;
  isVerified: boolean;
}

export interface ISearchListObject {
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
}

export interface ISearchListContentType {
  results: ISearchListObject[];
  classes: UseStyles;
}

export type SearchResponse = {
  profiles: ISearchListObject[];
};

export type ResidentialInfoPeerType = {
  name: string;
  email: string;
  peerType: string;
  phone: string;
};
