import { Text, Box, Button, Modal, Textarea, Select } from '@mantine/core';
import { useVBMContext } from '../context/VBMContext';
import { ProfileDetailsBox } from '../../verification_by_hr/components';
import { disputes } from '../../constants/SelectionOptions';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { FaBan } from 'react-icons/fa';
import { DisclaimerText } from './DisclaimerText';
import { PolicyText } from './PolicyText';

type candidateDetails = {
  label: string;
  detail: string;
  isApproved: boolean | null;
};

export const VBMStepTwo = () => {
  const { NextActiveStep, PrevActiveStep, disputeForm } = useVBMContext();
  const [selectedLabel, setSelectedLabel] = useState<string>('');
  const [candidateDetails, setCandidateDetails] = useState<candidateDetails[]>([
    { label: 'Candidate Company ID', detail: 'INFO001308', isApproved: null },
    { label: 'Department', detail: 'Engineering', isApproved: null },
    { label: 'Designation at work', detail: 'Software Engineer', isApproved: null },
    { label: 'Date of Joining', detail: '13/03/2021', isApproved: null },
    { label: 'Date of Leaving', detail: 'Currently working', isApproved: null },
  ]);

  const handleDispute = () => {
    if (!disputeForm.validate().hasErrors) {
      updateStatus(selectedLabel, false);
      disputeForm.reset();
      close();
    }
  };

  const updateStatus = (label: string, newStatus: boolean) => {
    const updatedDetails = candidateDetails.map((candidate) => {
      if (candidate.label === label) {
        return { ...candidate, isApproved: newStatus };
      }
      return candidate;
    });

    setCandidateDetails(updatedDetails);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    const wordCount = inputValue.trim().split(' ').length;
    if (wordCount <= 150) {
      disputeForm.setFieldValue('disputeReason', inputValue);
    }
  };

  const handleOpenModal = (label: string) => {
    open();
    setSelectedLabel(label);
  };
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
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
            className="dispute-select-box"
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
      <Box className="profile-details-action-section">
        {candidateDetails.map(({ label, detail, isApproved }, index) => {
          return (
            <Box className="profile-detail" key={index}>
              <Box className="details">
                <Text className="label">{label}</Text>
                <Text className="detail">{detail}</Text>
              </Box>
              {isApproved === null && (
                <Box className="profile-details-actions">
                  <Button className="green-outline-btn" onClick={() => updateStatus(label, true)}>
                    Approve
                  </Button>
                  <Button className="dispute-btn" onClick={() => handleOpenModal(label)}>
                    Dispute
                  </Button>
                </Box>
              )}
              {isApproved === true && (
                <Box className="profile-details-actions">
                  <Button className="green-outline-btn">Approved</Button>
                  <Button className="dispute-btn" disabled>
                    Dispute
                  </Button>
                </Box>
              )}
              {isApproved === false && (
                <Box className="profile-details-actions">
                  <Button className="green-outline-btn" disabled>
                    Approve
                  </Button>
                  <Button leftIcon={<FaBan />} className="disputed-btn">
                    Disputed
                  </Button>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
      <DisclaimerText />
      <PolicyText />
      <Box className="verification-btns-wrapper">
        <Button className="btn prev-btn" onClick={PrevActiveStep}>
          Back
        </Button>
        <Button className="btn next-btn" onClick={NextActiveStep}>
          Continue and Upload
        </Button>
      </Box>
    </section>
  );
};
