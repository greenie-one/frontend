import { useVerificationContext } from '../context/VerificationContext';
import { VerificationQuestions } from './VerificationQuestions';

export const OthersSpecificQuestions = (): JSX.Element => {
  const { activeStep, verificationData, verificationBy } = useVerificationContext();
  const { data } = verificationData;

  const formattedDate = (_data: string) => {
    return _data?.substring(0, 10).split('-').reverse().join('-');
  };

  return (
    <>
      {activeStep === 2 ? (
        <VerificationQuestions
          question={
            <>
              According to <span>{data.name}</span> you were his <span className="green-text">{verificationBy}</span>{' '}
              during his employment in <span>{data.companyName}</span> from{' '}
              <span>{formattedDate(verificationData.dateOfJoining)}</span> to{' '}
              <span>{formattedDate(verificationData.dateOfLeaving)}</span>
            </>
          }
          _id="peerPost"
          parentKey="otherQuestions"
        />
      ) : (
        <></>
      )}
      {activeStep === 3 ? (
        <VerificationQuestions
          question={
            <>
              According to <span className="name">{data.name} </span>he was{' '}
              <span className="green-text">{data.designation}</span> during his employment in{' '}
              <span>{data.companyName}</span>
            </>
          }
          _id="designation"
          parentKey="otherQuestions"
        />
      ) : (
        <></>
      )}
    </>
  );
};
