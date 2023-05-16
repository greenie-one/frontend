import { useState } from 'react';
import { Text, Box } from '@mantine/core';
import '../styles/global.scss';
import { MdVerified } from 'react-icons/md';
import { VerificationIDCard } from '../components/VerificationIDCard';
import { VerifyIdNoData } from '../components/VerifyIdNoData';
import { Link } from 'react-router-dom';

export const VerificationIDSection = () => {
  const [data, setData] = useState([
    {
      id: 1,
      document: 'Aadhar Card',
      verified: false,
    },
    {
      id: 2,
      document: 'Aadhar Card',
      verified: false,
    },
  ]);
  return (
    <Box className="container">
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
        <Box>
          {data.map((i) => (
            <Box className="cards-wrapper" key={i.id}>
              <VerificationIDCard />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
