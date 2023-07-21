import { useState } from 'react';
import { Text, Box, Button, Modal, Textarea, Select } from '@mantine/core';
import { CgSandClock } from 'react-icons/cg';
import { BsPersonCheckFill } from 'react-icons/bs';
import { HiOutlineBan } from 'react-icons/hi';
import pdfIcon from '../../profile/assets/pdfIcon.png';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { disputes } from '../constants/SelectionOptions';
import { ProfileDetailsBox } from './ProfileDetailsBox';
import { VerificationDisclaimer } from './VerificationDisclaimer';
import { useVerificationContext } from '../context/VerificationContext';

const documents = [
  { fileName: 'Letter of appointment 2021', status: 'pending' },
  { fileName: 'Payslips', status: 'pending' },
  { fileName: 'Experience Letter', status: 'pending' },
];

export const VerifyDocuments = () => {
  const { activeStep, disputeForm } = useVerificationContext();
  const [isDisputed, setIsDisputed] = useState<boolean>(false);
  const [activeDocument, setActiveDocument] = useState<number>(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    const wordCount = inputValue.trim().split(' ').length;
    if (wordCount <= 150) {
      disputeForm.setFieldValue('disputeReason', inputValue);
    }
  };

  const handleOpenModal = (index: number) => {
    open();
    setActiveDocument(index);
  };

  const handleApprove = () => {
    documents[activeDocument].status = 'approved';
    close();
  };

  const handleDispute = () => {
    if (!disputeForm.validate().hasErrors) {
      documents[activeDocument].status = 'disputed';
      setIsDisputed(false);
      close();
    }
  };
  return (
    <section className="verification-step">
      {!isDisputed && (
        <Modal centered size={'75%'} fullScreen={isMobile} opened={opened} onClose={close}>
          <Box className="verification-modal">
            <Text className="document">{documents[activeDocument].fileName}</Text>
            <Box className="profile-details-actions" my={'1rem'}>
              <Button className="green-outline-btn" onClick={handleApprove}>
                Approve
              </Button>
              <Button className="dispute-btn" onClick={() => setIsDisputed(true)}>
                Dispute
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
      {isDisputed && (
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
              data={disputes}
              className="disput-select-box"
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
              <Text className="word-limit">
                {disputeForm.values.disputeReason.trim().split(' ').length} / 150 words
              </Text>
            </Box>
            <Button className="green-btn" onClick={handleDispute}>
              Raise dispute
            </Button>
            <Text className="fact">
              This information will not be shared with the cadidate, it will be only used to maintain records
            </Text>
          </Box>
        </Modal>
      )}
      <ProfileDetailsBox />
      <Box className="verify-documents-box">
        <Box className="verify-documents-header">
          <Text>File</Text>
          <Text>Status</Text>
          <Text>Status</Text>
        </Box>
        <Box className="verify-documents-wrapper">
          {documents.map(({ fileName, status }, index) => {
            return (
              <Box key={index} className="verify-documets-row">
                <Box className="verify-document-name">
                  <img src={pdfIcon} alt="PDF Icon" />
                  <Text className="name">{fileName}</Text>
                </Box>
                {status === 'pending' && (
                  <Button className="verify-action-btn pending-btn" leftIcon={<CgSandClock size={'18px'} />}>
                    Pending
                  </Button>
                )}
                {status === 'approved' && (
                  <Button className="verify-action-btn approved-btn" leftIcon={<BsPersonCheckFill size={'18px'} />}>
                    Approved
                  </Button>
                )}
                {status === 'disputed' && (
                  <Button className="verify-action-btn disputed-btn" leftIcon={<HiOutlineBan size={'18px'} />}>
                    Disputed
                  </Button>
                )}
                <Box className="verification-documents-actions">
                  <Text className="link open-file" onClick={() => handleOpenModal(index)}>
                    Open file
                  </Text>
                  <Text className="link download">Download</Text>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <VerificationDisclaimer />
      <Text className="question-text">Could you verify documents uploaded by Abhishek?</Text>
      <Box className="profile-details-actions" my={'1rem'}>
        <Button className="green-outline-btn">Continue</Button>
        <Button className="dispute-btn">Go Back</Button>
      </Box>
    </section>
  );
};
