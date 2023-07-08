import { VerifyByHR } from '../components/candidate/verifications/verification_by_hr/VerifyByHR';
import { VBHRContextProvider } from '../components/candidate/verifications/verification_by_hr/context/VBHRContext';

export const VerificationByHRPage = () => {
  return (
    <>
      <VBHRContextProvider>
        <VerifyByHR />
      </VBHRContextProvider>
    </>
  );
};
