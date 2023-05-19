import { useState } from 'react';
import { Text, Box } from '@mantine/core';
import '../styles/global.scss';
import { MdVerified } from 'react-icons/md';
import { VerificationIDCard } from '../components/VerificationIDCard';
import { VerifyIdNoData } from '../components/VerifyIdNoData';
import AadharCard from '../assets/sampleAadhar.png';
import PanCard from '../assets/samplePanCard.png';

export const VerificationIDSection = () => {
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
      <Text className="heading">Verification ID ({data.length})</Text>
      <Text className="subheading">All government IDs, personal verification IDs etc.</Text>

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
