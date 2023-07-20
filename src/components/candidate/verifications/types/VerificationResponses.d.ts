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
  dispute_type?: string | null;
  dispute_reason?: string | null;
};

type OptionalFieldsType = {
  dateOfJoining?: StatusType;
  dateOfLeaving?: StatusType;
  companyName?: StatusType;
  workMode?: StatusType;
  salary?: StatusType;
};

type OtherQuestionsFieldsType = {
  [key: string]: StatusType;
};

type GetVerificationDataResponse = {
  id: string;
  name: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  verificationBy: string;
  optionalVerificationFields: OptionalFieldsType;
  otherQuestionFields: OtherQuestionsFieldsType;
  data: CandidateDataType;
};
