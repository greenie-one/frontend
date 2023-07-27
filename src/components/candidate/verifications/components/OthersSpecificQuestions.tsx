import { useVerificationContext } from '../context/VerificationContext';
import { VerificationQuestions } from './VerificationQuestions';
import { peerPost } from '../../constants/dictionaries';

export const OthersSpecificQuestions = (): JSX.Element => {
  const { activeStep, verificationData, verificationBy } = useVerificationContext();
  const { data } = verificationData;

  const formattedDate = (data: string) => {
    return data.substring(0, 10).split('-').reverse().join('-');
  };

  return (
    <>
      {activeStep === 2 ? (
        <VerificationQuestions
          question={
            <>
              According to <span>{data.name}</span> you were his/her{' '}
              <span className="green-text">{peerPost[verificationBy]} </span> at{' '}
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
              {verificationData.dateOfLeaving ? (
                <>
                  According to <span className="name">{data.name} </span>he/she was{' '}
                  <span className="green-text">{data.designation}</span> during his/her employment in{' '}
                  <span>{data.selectedFields?.companyName}</span> from {formattedDate(verificationData.dateOfJoining)}{' '}
                  to {formattedDate(verificationData.dateOfLeaving)}.
                </>
              ) : (
                <>
                  According to <span className="name">{data.name} </span>he/she is{' '}
                  <span className="green-text">{data.designation}</span> at{' '}
                  <span>{data.selectedFields?.companyName}</span> from {formattedDate(verificationData.dateOfJoining)}.
                </>
              )}
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
