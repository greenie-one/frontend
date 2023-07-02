import { VBMContextProvider } from '../components/Verifications/VerificationByManager/context/VBMContext';
import { VerifyByManager } from '../components/Verifications/VerificationByManager/VerifyByManager';

export const VerificationByManagerPage = () => {
  return (
    <>
      <VBMContextProvider>
        <VerifyByManager />
      </VBMContextProvider>
    </>
  );
};
