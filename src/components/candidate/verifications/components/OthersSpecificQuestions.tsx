import { useVerificationContext } from '../context/VerificationContext';
import { VerificationQuestions } from './VerificationQuestions';

export const OthersSpecificQuestions = (): JSX.Element => {
  const { activeStep, verificationData, verificationBy } = useVerificationContext();
  const { data } = verificationData;

  return (
    <>
      {activeStep === 2 ? (
        <VerificationQuestions
          question={
            <>
              According to <span>{data.name}</span> you were his <span className="green-text">{verificationBy}</span> in{' '}
              <span>{data.selectedFields?.companyName}</span> during his employment tenure?
            </>
          }
          _id="peerPost"
          parentKey="allQuestions"
        />
      ) : (
        <></>
      )}
      {activeStep === 3 ? (
        <VerificationQuestions
          question={
            <>
              According to <span className="name">{data.name} </span>he was{' '}
              <span className="green-text">{data.selectedFields?.designation}</span> during his employment in{' '}
              <span>{data.selectedFields?.companyName}</span>
            </>
          }
          _id="designation"
          parentKey="allQuestions"
        />
      ) : (
        <></>
      )}
    </>
  );
};
