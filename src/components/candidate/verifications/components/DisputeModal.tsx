import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Text, Box, Button, Modal, Textarea, Select } from '@mantine/core';
import { useVerificationContext } from '../verification_by_hr/context/VerificationContext';

type DisputeModalProps = {
  opened: boolean;
  action: () => void;
};

const disputesReasons = ['Wrong or unable to confirm'];

export const DisputeModal: React.FC<DisputeModalProps> = ({ opened, action }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { disputeForm } = useVerificationContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    const wordCount = inputValue.trim().split(' ').length;

    if (wordCount <= 150) {
      disputeForm.setFieldValue('disputeReason', inputValue);
    }
  };

  return (
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
          data={disputesReasons}
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
        <Button className="green-btn" onClick={action}>
          Raise dispute
        </Button>
        <Text className="fact">
          This information will not be shared with the candidate, it will be only used to maintain records
        </Text>
      </Box>
    </Modal>
  );
};
