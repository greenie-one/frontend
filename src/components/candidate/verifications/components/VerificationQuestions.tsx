import { Text, Box, Button } from '@mantine/core';
import { useVerificationContext } from '../context/VerificationContext';
import { DisputeModal } from './DisputeModal';
import { useDisclosure } from '@mantine/hooks';

type VerificationQuestionsProps = {
  question: React.ReactNode;
  _id: string;
  parentKey: keyof PostVerificationDataType;
};

type ResponseObjType = { [keys: string]: string };

export const VerificationQuestions: React.FC<VerificationQuestionsProps> = ({
  _id,
  question,
  parentKey,
}): JSX.Element => {
  const { verificationResponse, setVerificationResponse, setActiveStep } = useVerificationContext();
  const [disputeModalOpened, { open: disputeModalOpen, close: disputeModalClose }] = useDisclosure();

  const approveHandler = () => {
    const responseObj: ResponseObjType = {};
    responseObj['state'] = 'ACCEPTED';

    const responseData: { [keys: string]: ResponseObjType } = {};
    responseData[_id] = responseObj;

    setVerificationResponse({
      ...verificationResponse,
      [parentKey]: { ...verificationResponse[parentKey], ...responseData },
    });
    setActiveStep((current) => current + 1);
  };

  return (
    <>
      <DisputeModal
        attrId={_id}
        opened={disputeModalOpened}
        close={() => {
          disputeModalClose();
        }}
        setActiveStep={setActiveStep}
        parentKey={parentKey}
      />
      <section className="verification-step">
        <Text className="question-text">{question}</Text>
        <Box className="profile-details-actions">
          <Button className="green-outline-btn" onClick={approveHandler}>
            Approve
          </Button>
          <Button className="dispute-btn" onClick={disputeModalOpen}>
            Dispute
          </Button>
        </Box>
      </section>
    </>
  );
};
