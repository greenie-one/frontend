import { useVerificationContext } from '../context/VerificationContext';
import { VerificationDisclaimer } from './VerificationDisclaimer';
import { VerificationQuestions } from './VerificationQuestions';

export const CommonVerifications: React.FC = (): JSX.Element => {
  const { verificationBy, activeStep } = useVerificationContext();

  return (
    <section className="verification-step">
      {verificationBy === 'HR' ? (
        <>
          {activeStep === 3 ? (
            <VerificationQuestions
              question={<>Has the candidate completed the exit procedure?</>}
              _id="exitProcedure"
            />
          ) : (
            <></>
          )}
          {activeStep === 4 ? (
            <VerificationQuestions question={<>Is the candidate eligible for rehire?</>} _id="eligibleForRehire" />
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {activeStep === 4 ? (
            <VerificationQuestions
              question={<>Has the candidate completed the exit procedure?</>}
              _id="exitProcedure"
            />
          ) : (
            <></>
          )}
          {activeStep === 5 ? (
            <VerificationQuestions question={<>Is the candidate eligible for rehire?</>} _id="eligibleForRehire" />
          ) : (
            <></>
          )}
        </>
      )}
      <VerificationDisclaimer />
    </section>
  );
};
