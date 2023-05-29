import { useState, useEffect } from 'react';
import { Text, Box, Button, Modal } from '@mantine/core';
import '../styles/global.scss';
import { VerificationIDCard } from '../components/VerificationIDCard';
import { VerifyIdNoData } from '../components/VerifyIdNoData';
import { Link } from 'react-router-dom';
import { MdOutlineEdit } from 'react-icons/md';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { DocumentsModal } from '../components/DocumentsModal';
import { useProfileContext } from '../context/ProfileContext';
import axios from 'axios';
import ApiList from '../../../assets/api/ApiList';
import { useLocalStorage } from '@mantine/hooks';

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

enum DocumentType {
  AadharCard = 'Aadhar Card',
  PanCard = 'Pan Card',
}

interface Document {
  documentType: DocumentType;
  documentNumber: string;
  isVerified: boolean;
}

export const VerificationIDSection = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const [authTokens, setAuthTokens] = useLocalStorage<AuthTokens>({ key: 'auth-tokens' });

  const [documentsData, setDocumentsData] = useState<Document[]>([]);

  const getDocuments = async () => {
    try {
      const res = await axios.get(ApiList.documents, {
        headers: {
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });
      if (res.data && authTokens?.accessToken) {
        setDocumentsData(res.data);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <section className="verificationId-section  container">
      <Modal
        className="modal"
        size={'65%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={close}
        title="Add work experience"
      >
        <DocumentsModal />
      </Modal>
      <Box className="header">
        <Box>
          <Text className="heading">{`Verification ID (${documentsData.length})`}</Text>
          <Text className="subheading">All government IDs, personal verification IDs etc.</Text>
        </Box>

        <Box className="header-links">
          {documentsData.length > 0 && (
            <Link className="link" to={'/'}>
              See all documents
            </Link>
          )}

          <Button leftIcon={<MdOutlineEdit />} onClick={open} className="edit-btn">
            Edit Section
          </Button>
        </Box>
      </Box>

      {documentsData.length === 0 ? (
        <Box className="verify-id-no-data-wrapper">
          <Box className="verify-id-img">
            <VerifyIdNoData />
          </Box>
          <Box className="verify-id-text">
            <Text className="text-heading">Stand Out!!</Text>
            <Text className="text-subheading">Verify your identity </Text>
            <Text className="text-subheading">and get a Greenie Check</Text>
          </Box>
        </Box>
      ) : (
        <Box className="cards-wrapper">
          {documentsData.map((document, index) => (
            <Box key={index}>
              <VerificationIDCard
                documentName={document.documentType}
                isVerified={document.isVerified}
              />
            </Box>
          ))}
        </Box>
      )}
    </section>
  );
};
