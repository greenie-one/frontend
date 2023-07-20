import { useVerificationContext } from '../context/VerificationContext';
import { VerificationDisclaimer } from './VerificationDisclaimer';
import { VerificationQuestions } from './VerificationQuestions';

export const OthersSpecificQuestions = (): JSX.Element => {
  const { activeStep, verificationData, verificationBy } = useVerificationContext();
  const { data } = verificationData;

  return (
    <section className="verification-step">
      {activeStep === 2 ? (
        <VerificationQuestions
          question={
            <>
              According to {data.name} you were his {verificationBy} during his employment in {data.companyName}
            </>
          }
          _id="peerPost"
        />
      ) : (
        <></>
      )}
      {activeStep === 3 ? (
        <VerificationQuestions
          question={
            <>
              According to {data.name} he was {data.designation} during his employment in {data.companyName}
            </>
          }
          _id="designation"
        />
      ) : (
        <></>
      )}
      <VerificationDisclaimer />
    </section>
  );
};
