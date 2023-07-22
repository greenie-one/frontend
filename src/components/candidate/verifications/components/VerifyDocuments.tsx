import { useState } from 'react';
import { Text, Box, Button } from '@mantine/core';
import { BsPersonCheckFill } from 'react-icons/bs';
import { HiOutlineBan } from 'react-icons/hi';
import pdfIcon from '../../profile/assets/pdfIcon.png';
import { useDisclosure } from '@mantine/hooks';
import { useVerificationContext } from '../context/VerificationContext';
import { DisputeModal } from './DisputeModal';

export const VerifyDocuments = () => {
  const { setActiveStep, setVerificationResponse, verificationResponse, verificationData } = useVerificationContext();
  const { data } = verificationData;
  const [disputeModalOpened, { open: disputeModalOpen, close: disputeModalClose }] = useDisclosure();

  const [attrId, setAttrId] = useState<string>('');

  const approveHandler = (_id: string) => {
    const responseObj: DynamicObjectWithIdType = {
      id: _id,
      status: {
        state: 'ACCEPTED',
      },
    };

    if (verificationResponse.documents) {
      setVerificationResponse((current) => {
        const documentList = current.documents;
        const newDocList = documentList.map((_doc) => {
          if (_doc.id === _id) {
            return responseObj;
          }

          return _doc;
        });

        return { ...current, documents: newDocList };
      });
    } else {
      setVerificationResponse({
        ...verificationResponse,
        documents: [responseObj],
      });
    }
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
        parentKey="documents"
      />
      <Text className="question-text">Could you verify documents uploaded by Abhishek?</Text>
      <Box className="verify-documents-box">
        <Box className="verify-documents-header">
          <Text>File</Text>
          <Text>Status</Text>
        </Box>
        <Box className="verify-documents-wrapper">
          {data.documents.map((doc, index) => {
            return (
              <Box key={index} className="verify-documets-row">
                <Box className="verify-document-name">
                  <img src={pdfIcon} alt="PDF Icon" />
                  <Text className="name">{doc.name}</Text>
                </Box>
                <Box className="verification-documents-actions">
                  <Button
                    className="verify-action-btn pending-btn"
                    leftIcon={<BsPersonCheckFill size={'18px'} />}
                    onClick={() => approveHandler(doc.id)}
                  >
                    Approve
                  </Button>
                  <Button
                    className="verify-action-btn disputed-btn"
                    leftIcon={<HiOutlineBan size={'18px'} />}
                    onClick={() => {
                      setAttrId(doc.id);
                      disputeModalOpen();
                    }}
                  >
                    Dispute
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box className="verification-btns-wrapper">
        <Button className="btn next-btn" onClick={() => setActiveStep((current) => current + 1)}>
          Continue
        </Button>
      </Box>
    </section>
  );
};
