export type Document = {
  document: File | undefined;
  documentTag: string | null;
};

export type Peer = {
  index: number;
  name: string;
  email: string;
  status: string;
  peerType: string;
  contactNumber: string;
  documents: File[];
  skills: ISkill[];
};

export interface IWorkExperienceVerification {
  _id: string;
  image: string | null;
  designation: string;
  companyName: string;
  isVerified: boolean;
}
