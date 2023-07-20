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
              According to {data.name} you were his <span>{verificationBy}</span> during his employment in
              <span>{data.companyName}</span>
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
              According to <span>{data.name} </span>he was <span>{data.designation}</span> during his employment in{' '}
              <span>{data.companyName}</span>
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
