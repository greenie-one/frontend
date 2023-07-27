import { UseFormReturnType } from '@mantine/form';

type UnverifiedLinkType = 'EMAIL' | 'MOBILE' | 'NONE';

type DisputeFormType = {
  disputeType: string;
  disputeReason: string;
};

type ResponseObjType = { [keys: string]: string };
type VerificationResponseType = { [keys: string]: ResponseObjType | string };

type VerificationContextType = {
  peerUUID: string;
  verificationBy: string;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  totalSteps: number;
  verificationData: GetVerificationDataResponse;
  unverifiedLink: string;
  disputeForm: UseFormReturnType<DisputeFormType>;
  getVerificationData: () => Promise<void>;
  postVerificationData: () => Promise<void>;
  verificationResponse: PostVerificationDataType;
  setVerificationResponse: React.Dispatch<React.SetStateAction<PostVerificationDataType>>;
  personBeingVerified: string;
  peerVerified: boolean;
};
