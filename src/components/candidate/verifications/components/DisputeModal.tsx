import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Text, Box, Button, Modal, Textarea, Select } from '@mantine/core';
import { useVerificationContext } from '../context/VerificationContext';

type DisputeModalProps = {
  attrId: string;
  setAttrId?: React.Dispatch<React.SetStateAction<string>>;
  opened: boolean;
  close: () => void;
  setActiveStep?: React.Dispatch<React.SetStateAction<number>>;
  parentKey: keyof PostVerificationDataType;
};

const disputesReasons = ['Wrong or unable to confirm'];

export const DisputeModal: React.FC<DisputeModalProps> = ({
  attrId,
  opened,
  setAttrId,
  close,
  setActiveStep,
  parentKey,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { disputeForm, setVerificationResponse, verificationResponse } = useVerificationContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    const wordCount = inputValue.trim().split(' ').length;

    if (wordCount <= 150) {
      disputeForm.setFieldValue('disputeReason', inputValue);
    }
  };

  const disputeHandler = (id: string) => {
    if (!id) return;
    if (disputeForm.validate().hasErrors) return;

    const responseObj: StatusType = {
      state: 'REJECTED',
      dispute_type: disputeForm.values.disputeType,
      dispute_reason: disputeForm.values.disputeReason,
    };

    if (parentKey === 'documents' || parentKey === 'skills') {
      const resObj: DynamicObjectWithIdType = {
        id: id,
        status: {
          state: 'REJECTED',
          dispute_type: disputeForm.values.disputeType,
          dispute_reason: disputeForm.values.disputeReason,
        },
      };

      if (verificationResponse[parentKey]) {
        setVerificationResponse((current) => {
          const list = current[parentKey];
          const newList = list.map((item) => {
            if (item.id === id) {
              return resObj;
            }

            return item;
          });

          return { ...current, [parentKey]: newList };
        });
      } else {
        setVerificationResponse({
          ...verificationResponse,
          [parentKey]: [resObj],
        });
      }
    } else {
      const responseData: { [keys: string]: StatusType } = {};
      responseData[id] = responseObj;

      setVerificationResponse({
        ...verificationResponse,
        [parentKey]: { ...verificationResponse[parentKey], ...responseData },
      });
    }

    disputeForm.setFieldValue('disputeType', '');
    disputeForm.setFieldValue('disputeReason', '');

    if (setAttrId) {
      setAttrId('');
    }
    close();
    if (setActiveStep) {
      setActiveStep((current) => current + 1);
    }
  };

  return (
    <Modal
      radius={'lg'}
      centered
      size={'75%'}
      fullScreen={isMobile}
      opened={opened}
      onClose={() => {
        close();
      }}
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
        <Button className="green-btn" onClick={() => disputeHandler(attrId)}>
          Raise dispute
        </Button>
        <Text className="fact">
          This information will not be shared with the candidate, it will be only used to maintain records
        </Text>
      </Box>
    </Modal>
  );
};
