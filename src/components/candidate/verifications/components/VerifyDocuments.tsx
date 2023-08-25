import { useState } from 'react';
import { Text, Box, Button } from '@mantine/core';
import { BsPersonCheckFill } from 'react-icons/bs';
import { HiOutlineBan } from 'react-icons/hi';
import pdfIcon from '../../profile/assets/pdfIcon.png';
import { useDisclosure } from '@mantine/hooks';
import { useVerificationContext } from '../context/VerificationContext';
import { DisputeModal } from './DisputeModal';
import {
  showLoadingNotification,
  showErrorNotification,
  showSuccessNotification,
} from '../../../../utils/functions/showNotification';

export const VerifyDocuments = () => {
  const { setActiveStep, setVerificationResponse, verificationResponse, verificationData } = useVerificationContext();
  const { data } = verificationData;
  const [disputeModalOpened, { open: disputeModalOpen, close: disputeModalClose }] = useDisclosure();

  const [attrId, setAttrId] = useState<string>('');
  const [approvedAttrs, setApprovedAttrs] = useState<string[]>([]);
  const [disputedAttrs, setDisputedAttrs] = useState<string[]>([]);

  const viewPDFDocument = async (requestURL: string): Promise<void> => {
    showLoadingNotification({ title: 'Please wait', message: '' });
    try {
      const res = await fetch(requestURL, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      if (!res.ok) {
        const error = await res.json();
        showErrorNotification('SOMETHING_WENT_WRONG');
        throw new Error(JSON.stringify(error));
      }
      const file = await res.blob();
      const localFileURL = URL.createObjectURL(file);
      showSuccessNotification({ title: 'Success', message: '' });
      window.open(localFileURL, '_blank');
    } catch (err: unknown) {
      console.error('~ workexperience3.tsx ~ viewPDFDocument() ~ line 45 :', err);
    }
  };
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

        const findDoc = documentList.find((_doc) => _doc.id === _id);
        if (!findDoc) {
          return { ...current, documents: [...current.documents, responseObj] };
        }

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

    setApprovedAttrs((current) => [...current, _id]);
    setDisputedAttrs((current) => current.filter((id) => id !== _id));
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
        setApprovedAttrs={setApprovedAttrs}
        setDisputedAttrs={setDisputedAttrs}
      />
      <Text className="question-text">Could you verify uploaded documents ?</Text>
      <Box className="verify-documents-box">
        <Box className="verify-documents-header">
          <Text className="verify-header-text">File</Text>
          <Text className="verify-header-text">Status</Text>
        </Box>
        <Box className="verify-documents-wrapper">
          {data.documents.map((doc, index) => {
            return (
              <Box key={index} className="verify-documets-row">
                <Box className="verify-document-name">
                  <img src={pdfIcon} alt="PDF Icon" />
                  <Text onClick={() => viewPDFDocument(doc.privateUrl)} className="name">
                    {doc.name}
                  </Text>
                </Box>
                <Box className="verification-documents-actions">
                  <Button
                    className="verify-action-btn approved-btn"
                    leftIcon={<BsPersonCheckFill size={'18px'} />}
                    onClick={() => approveHandler(doc.id)}
                    disabled={approvedAttrs.includes(doc.id)}
                  >
                    {approvedAttrs.includes(doc.id) ? 'Approved' : 'Approve'}
                  </Button>
                  <Button
                    className="verify-action-btn disputed-btn"
                    leftIcon={<HiOutlineBan size={'18px'} />}
                    onClick={() => {
                      setAttrId(doc.id);
                      disputeModalOpen();
                    }}
                    disabled={disputedAttrs.includes(doc.id)}
                  >
                    {disputedAttrs.includes(doc.id) ? 'Disputed' : 'Dispute'}
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box className="verification-btns-wrapper">
        <Button
          disabled={approvedAttrs.length + disputedAttrs.length < data.documents.length}
          className="btn next-btn"
          onClick={() => setActiveStep((current) => current + 1)}
        >
          Continue
        </Button>
      </Box>
    </section>
  );
};
