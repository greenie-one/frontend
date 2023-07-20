import { Text, Box, Button } from '@mantine/core';
import { useVerificationContext } from '../context/VerificationContext';
import { DisputeModal } from './DisputeModal';
import { useDisclosure } from '@mantine/hooks';

type VerificationQuestionsProps = {
  question: React.ReactNode;
  _id: string;
};

type ResponseObjType = { [keys: string]: string };

export const VerificationQuestions: React.FC<VerificationQuestionsProps> = ({ question, _id }): JSX.Element => {
  const { verificationResponse, setVerificationResponse, setActiveStep } = useVerificationContext();
  const [disputeModalOpened, { open: disputeModalOpen, close: disputeModalClose }] = useDisclosure();

  const approveHandler = () => {
    const responseObj: ResponseObjType = {};
    responseObj['state'] = 'ACCEPTED';

    const responseData: { [keys: string]: ResponseObjType } = {};
    responseData[_id] = responseObj;

    setVerificationResponse({ ...verificationResponse, ...responseData });
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
      />
      <Text className="question-text" w={'45%'}>
        {question}
      </Text>
      <Box className="profile-details-actions">
        <Button className="green-outline-btn" onClick={approveHandler}>
          Approve
        </Button>
        <Button className="dispute-btn" onClick={disputeModalOpen}>
          Dispute
        </Button>
      </Box>
    </>
  );
};
