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

  const approveHandler = (_id: string) => {
    const responseObj: StatusType = {} as StatusType;
    responseObj['state'] = 'ACCEPTED';

    const responseData: { [keys: string]: StatusType } = {};
    responseData[_id] = responseObj;

    setVerificationResponse({
      ...verificationResponse,
      optionalVerificationFields: { ...verificationResponse.optionalVerificationFields, ...responseData },
    });
  };

  return (
    <section className="verification-step">
      <DisputeModal
        attrId={attrId}
        setAttrId={setAttrId}
        opened={disputeModalOpened}
        close={() => {
          disputeModalClose();
        }}
        parentKey="optionalVerificationFields"
      />
      <Box className="profile-details-action-section">
        {data &&
          Object.keys(data?.optionalVerificationFields).map((keys, index) => {
            return optionalAttrDict[keys] ? (
              <Box className="profile-detail" key={index}>
                <Box className="details">
                  <Text className="label">{optionalAttrDict[keys]}</Text>
                  <Text className="detail">{data?.optionalVerificationFields[keys]}</Text>
                </Box>
                <Box className="profile-details-actions">
                  <Button className="green-outline-btn" onClick={() => approveHandler(keys)}>
                    Approve
                  </Button>
                  <Button
                    className="dispute-btn"
                    onClick={() => {
                      setAttrId(keys);
                      disputeModalOpen();
                    }}
                  >
                    Dispute
                  </Button>
                </Box>
              </Box>
            ) : (
              <React.Fragment key={index}></React.Fragment>
            );
          })}
      </Box>
      <Box className="verification-btns-wrapper">
        <Button className="btn next-btn" onClick={() => setActiveStep((current) => current + 1)}>
          Continue
        </Button>
      </Box>
    </section>
  );
};
