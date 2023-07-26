import { VerificationJourney } from '../components/candidate/verifications/VerificationJourney';
import { VerificationContextProvider } from '../components/candidate/verifications/context/VerificationContext';

export const ExperienceVerification = () => {
  return (
    <>
      <VerificationContextProvider>
        <VerificationJourney />
      </VerificationContextProvider>
    </>
  );
};
