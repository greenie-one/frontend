import { Text, Box, Button, Modal, Select, Textarea } from '@mantine/core';
import { useVBMContext } from '../context/VBMContext';
import { ProfileDetailsBox } from '../../verification_by_hr/components';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { DisclaimerText } from './DisclaimerText';
import { disputes } from '../../constants/SelectionOptions';
import { PolicyText } from './PolicyText';

export const VBMStepOne = () => {
  const designation = 'CXP Manager';
  const companyName = 'Infotech Solutions Private Limited';
  const startDate = '13/03/2021';
  const { NextActiveStep, disputeForm } = useVBMContext();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);

  const handleDispute = () => {
    if (!disputeForm.validate().hasErrors) {
      close();
      disputeForm.reset();
      NextActiveStep();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    const wordCount = inputValue.trim().split(' ').length;
    if (wordCount <= 150) {
      disputeForm.setFieldValue('disputeReason', inputValue);
    }
  };

  return (
    <section className="verification-step">
      <Modal
        centered
        size={'75%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={close}
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
            className="disput-select-box"
            data={disputes}
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
          <Box className="text-area-box-manager">
            <Textarea
              value={disputeForm.values.disputeReason}
              onChange={handleInputChange}
              placeholder="Write a review to help your peer get his dream job"
              className="text-area"
            />
            <Text className="word-limit">{disputeForm.values.disputeReason.trim().split(' ').length} / 150 words</Text>
          </Box>
          <Button className="green-btn" onClick={handleDispute}>
            Raise dispute
          </Button>
          <Text className="fact">
            This information will not be shared with the cadidate, it will be only used to maintain records
          </Text>
        </Box>
      </Modal>
      <ProfileDetailsBox />
      <Text className="question-text" w={'45%'}>
        According to Abhishek you were his <span>{designation}</span> during his employment in{' '}
        <span>{companyName}</span> from <span className="date">{startDate}</span> till Current day
      </Text>
      <Box className="profile-details-actions">
        <Button className="green-outline-btn" onClick={NextActiveStep}>
          Approve
        </Button>
        <Button className="dispute-btn" onClick={open}>
          Dispute
        </Button>
      </Box>
      <DisclaimerText />
      <PolicyText />
    </section>
  );
};
