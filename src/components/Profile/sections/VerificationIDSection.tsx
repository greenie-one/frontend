import { useState } from 'react';
import { Text, Box, Button, Modal } from '@mantine/core';
import '../styles/global.scss';
import { VerificationIDCard } from '../components/VerificationIDCard';
import { VerifyIdNoData } from '../components/VerifyIdNoData';
import AadharCard from '../assets/sampleAadhar.png';
import PanCard from '../assets/samplePanCard.png';
import { Link } from 'react-router-dom';
import { MdOutlineEdit } from 'react-icons/md';
import { WorkExperienceModal } from '../components/WorkExperienceModal';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';

export const VerificationIDSection = () => {
  const modalScreenSize = useMediaQuery('(min-width: 790px)');
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState([
    {
      id: 1,
      documentName: 'Aadhar Card',
      documentImg: AadharCard,
      isVerified: true,
    },
    {
      id: 2,
      documentName: 'Pan Card',
      documentImg: PanCard,
      isVerified: true,
    },
  ]);
  return (
    <section className="verificationId-section  container">
      <Modal
        className="modal"
        size={modalScreenSize ? '60%' : '98%'}
        opened={opened}
        onClose={close}
        title="Add work experience"
      >
        <WorkExperienceModal />
      </Modal>
      <Box className="header">
        <Box>
          <Text className="heading">{`Skills (${data.length})`}</Text>
          <Text className="subheading">All government IDs, personal verification IDs etc.</Text>
        </Box>
        {data.length > 0 ? (
          <Box className="header-links">
            <Link className="link" to={'/'}>
              See all documents
            </Link>
            <Button leftIcon={<MdOutlineEdit />} onClick={open} className="edit-btn">
              Edit Section
            </Button>
          </Box>
        ) : (
          <Box></Box>
        )}
      </Box>

      {data.length === 0 ? (
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
          {data.map(({ id, documentName, documentImg, isVerified }) => (
            <Box key={id}>
              <VerificationIDCard
                documentName={documentName}
                documentImg={documentImg}
                isVerified={isVerified}
              />
            </Box>
          ))}
        </Box>
      )}
    </section>
  );
};
