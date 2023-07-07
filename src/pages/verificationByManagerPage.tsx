import { VBMContextProvider } from '../components/verifications/verification_by_manager/context/VBMContext';
import { VerifyByManager } from '../components/verifications/verification_by_manager/VerifyByManager';

export const VerificationByManagerPage = () => {
  return (
    <>
      <VBMContextProvider>
        <VerifyByManager />
      </VBMContextProvider>
    </>
  );
};
