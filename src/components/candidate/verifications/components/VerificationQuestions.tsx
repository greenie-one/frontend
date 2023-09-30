import React from 'react';
import { Text, Box, Button, Select, Textarea, Modal } from '@mantine/core';
import { useVerificationContext } from '../context/VerificationContext';
import { DisputeModal } from './DisputeModal';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { HttpClient } from '../../../../utils/generic/httpClient';
import { peerVerificationAPIList } from '../../../../assets/api/ApiList';
import { useParams } from 'react-router-dom';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../utils/functions/showNotification';

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
  const params = useParams();

  const peerUUID = String(params.uuid);
  const { verificationResponse, disputeForm, totalSteps, setVerificationResponse, setActiveStep } =
    useVerificationContext();
  const [disputeModalOpened, { open: disputeModalOpen, close: disputeModalClose }] = useDisclosure();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);

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

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    const wordCount = inputValue.length;

    if (wordCount <= 250) {
      disputeForm.setFieldValue('disputeReason', inputValue);
    }
  };

  const handleNotMe = async () => {
    showLoadingNotification({ title: 'Please wait', message: 'We are processing your request' });
    const res = await HttpClient.callApi({
      url: `${peerVerificationAPIList.getVerificationData}/${peerUUID}`,
      method: 'PATCH',
      body: {
        isReal: {
          state: 'REJECTED',
          dispute_type: disputeForm.values.disputeType,
          dispute_reason: disputeForm.values.disputeReason || 'NA',
        },
      },
    });

    if (res.ok) {
      showSuccessNotification({ title: 'Success', message: 'We recieved your response.' });
      disputeForm.reset();
      close();
      setActiveStep(totalSteps);
    } else {
      disputeForm.reset();
      close();
      showErrorNotification(res.error.code);
    }
  };

  const handleClose = () => {
    disputeForm.reset();
    close();
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
          <Button className="green-outline-btn no-disable" onClick={approveHandler}>
            Yes
          </Button>
          <Button className="dispute-btn no-disable" onClick={_id === 'peerPost' ? open : disputeModalOpen}>
            No
          </Button>
        </Box>
      </section>
      <Modal
        radius={'lg'}
        centered
        size={'60%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={handleClose}
        title="Add a dispute to the information"
        styles={{
          title: {
            fontFamily: 'Inter',
            fontSize: '1.25rem',
            fontWeight: 600,
          },
        }}
      >
        <Box className="verification-modal">
          <Select
            clearable
            searchable
            withAsterisk
            nothingFound="No options"
            className="inputClass"
            placeholder="Select reason for dispute"
            data={['Wrong Designation']}
            label="Dispute type"
            styles={() => ({
              item: {
                '&[data-selected]': {
                  '&, &:hover': {
                    backgroundColor: '#17a672',
                    color: 'white',
                  },
                },
              },
            })}
            {...disputeForm.getInputProps('disputeType')}
          />
          <Box className="text-area-box">
            <Textarea
              value={disputeForm.values.disputeReason}
              onChange={handleInputChange}
              placeholder="Provide more information about dispute"
              className="text-area"
            />
            <Text className="word-limit">{disputeForm.values.disputeReason.length} / 250 </Text>
          </Box>
          <Button className="green-btn" onClick={handleNotMe}>
            Raise dispute
          </Button>
          <Text className="fact">
            This information will not be shared with the candidate, it will be only used to maintain records
          </Text>
        </Box>
      </Modal>
    </>
  );
};
