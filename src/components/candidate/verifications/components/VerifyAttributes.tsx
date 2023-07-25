import React, { useState } from 'react';
import { Box, Button, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useVerificationContext } from '../context/VerificationContext';
import { DisputeModal } from './DisputeModal';
import { optionalAttrDict } from '../../constants/dictionaries';

export const VerifyAttributes: React.FC = (): JSX.Element => {
  const { setActiveStep, verificationData, verificationResponse, setVerificationResponse } = useVerificationContext();
  const { data } = verificationData;

  const [disputeModalOpened, { open: disputeModalOpen, close: disputeModalClose }] = useDisclosure();
  const [attrId, setAttrId] = useState<string>('');
  const [approvedAttrs, setApprovedAttrs] = useState<string[]>([]);
  const [disputedAttrs, setDisputedAttrs] = useState<string[]>([]);

  const approveHandler = (_id: string) => {
    const responseObj: StatusType = {} as StatusType;
    responseObj['state'] = 'ACCEPTED';

    const responseData: { [keys: string]: StatusType } = {};
    responseData[_id] = responseObj;

    setVerificationResponse({
      ...verificationResponse,
      selectedFields: { ...verificationResponse.selectedFields, ...responseData },
    });

    setApprovedAttrs((current) => [...current, _id]);
    setDisputedAttrs((current) => current.filter((id) => id !== _id));
  };

  const attributesList = Object.keys(data?.selectedFields)
    .map((key) => {
      if (key !== 'salary') {
        return key;
      }
    })
    .filter((key) => key !== undefined);

  return (
    <section className="verification-step">
      <DisputeModal
        attrId={attrId}
        setAttrId={setAttrId}
        opened={disputeModalOpened}
        close={() => {
          disputeModalClose();
        }}
        parentKey="selectedFields"
        setApprovedAttrs={setApprovedAttrs}
        setDisputedAttrs={setDisputedAttrs}
      />
      <Box className="profile-details-action-section">
        {attributesList.map((keys, index) => {
          if (!keys) return <React.Fragment key={index}></React.Fragment>;
          return optionalAttrDict[keys] ? (
            <Box className="profile-detail" key={index}>
              <Box className="details">
                <Text className="label">{optionalAttrDict[keys]}</Text>
                <Text className="detail">{data?.selectedFields[keys]}</Text>
              </Box>
              <Box className="profile-details-actions">
                <Button
                  disabled={approvedAttrs.includes(keys)}
                  className="green-outline-btn"
                  onClick={() => approveHandler(keys)}
                >
                  {approvedAttrs.includes(keys) ? 'Approved' : 'Approve'}
                </Button>
                <Button
                  disabled={disputedAttrs.includes(keys)}
                  className="dispute-btn"
                  onClick={() => {
                    setAttrId(keys);
                    disputeModalOpen();
                  }}
                >
                  {disputedAttrs.includes(keys) ? 'Disputed' : 'Dispute'}
                </Button>
              </Box>
            </Box>
          ) : (
            <React.Fragment key={index}></React.Fragment>
          );
        })}
      </Box>
      <Box className="verification-btns-wrapper">
        <Button
          disabled={approvedAttrs.length + disputedAttrs.length < attributesList.length}
          className="btn next-btn"
          onClick={() => setActiveStep((current) => current + 1)}
        >
          Continue
        </Button>
      </Box>
    </section>
  );
};
