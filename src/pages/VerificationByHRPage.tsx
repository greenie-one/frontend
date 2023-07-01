import { VerifyByHR } from '../components/Verifications/VerificationByHR/VerifyByHR';
import { VBHRContextProvider } from '../components/Verifications/VerificationByHR/context/VBHRContext';

export const VerificationByHRPage = () => {
  return (
    <>
      <VBHRContextProvider>
        <VerifyByHR />
      </VBHRContextProvider>
    </>
  );
};
