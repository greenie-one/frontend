import { VerifyByHR } from '../components/candidate/verifications/verification_by_hr/VerifyByHR';
import { VerificationContextProvider } from '../components/candidate/verifications/verification_by_hr/context/VerificationContext';

export const VerificationByHRPage = () => {
  return (
    <>
      <VerificationContextProvider>
        <VerifyByHR />
      </VerificationContextProvider>
    </>
  );
};
