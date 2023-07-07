import { VerifyByHR } from '../components/verifications/verification_by_hr/VerifyByHR';
import { VBHRContextProvider } from '../components/verifications/verification_by_hr/context/VBHRContext';

export const VerificationByHRPage = () => {
  return (
    <>
      <VBHRContextProvider>
        <VerifyByHR />
      </VBHRContextProvider>
    </>
  );
};
