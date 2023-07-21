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
  verificationData: any;
  unverifiedLink: string;
  disputeForm: UseFormReturnType<DisputeFormType>;
  getVerificationData: () => Promise<void>;
  postVerificationData: () => Promise<void>;
  verificationResponse: VerificationResponseType;
  setVerificationResponse: React.Dispatch<React.SetStateAction<VerificationResponseType>>;
  personBeingVerified: string;
};
