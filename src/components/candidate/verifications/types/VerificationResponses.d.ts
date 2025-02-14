type CandidateDataType = {
  name: string;
  profilePic: string;
  dateOfJoining: string;
  dateOfLeaving: string;
  companyName: string;
  workMode: string;
  salary: string;
};

type StatusType = {
  state: 'ACCEPTED' | 'REJECTED' | 'PENDING';
  dispute_type?: string;
  dispute_reason?: string;
};

type OptionalFieldsType = {
  dateOfJoining?: StatusType;
  dateOfLeaving?: StatusType;
  companyName?: StatusType;
  workMode?: StatusType;
  salary?: StatusType;
};

type DynamicObjectType = {
  [key: string]: StatusType;
};

type DynamicObjectWithIdType = { id: string; status: StatusType };

type OtherQuestionsType = {
  exitProcedure: StatusType;
  designation: StatusType;
  peerPost: StatusType;
};

type VerificationDataType = {
  name: string;
  profilePic: string;
  companyName: string;
  peerPost: string;
  designation: string;
  skills: Array<{ id: string; skillName: string; expertise: string }>;
  documents: Array<{ id: string; type: string; name: string; privateUrl: string }>;
  selectedFields: { [key: string]: string };
};

type GetVerificationDataResponse = {
  id: string;
  name: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  verificationBy: string;
  dateOfJoining: string;
  dateOfLeaving?: string;
  data: VerificationDataType;
};

type PostVerificationDataType = {
  isReal: StatusType;
  selectedFields: DynamicObjectType;
  allQuestions: {
    attitudeRating: string;
    peerPost: StatusType;
    review: string;
    designation: StatusType;
  };
  otherQuestions?: {
    exitProcedure?: StatusType;
    onNotice?: StatusType;
    eligibleForRehire: StatusType;
  };
  skills: Array<DynamicObjectWithIdType>;
  documents: Array<DynamicObjectWithIdType>;
};
