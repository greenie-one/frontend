import { useState } from 'react';
import { Text, Box } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import '../styles/global.scss';

interface CardProps {
  documentName: string;
  documentImg: string;
  isVerified: boolean;
}

export const VerificationIDCard: React.FC<CardProps> = ({
  documentName,
  documentImg,
  isVerified,
}) => {
  return (
    <Box className="verificationIdCard">
      <Box className="verificationIdImg">
        <img src={documentImg} alt="Document Image" />
      </Box>
      <Text className="document-name">{documentName}</Text>
      {isVerified ? (
        <Box className="is-verified-box">
          <Text className="is-verified-text">Verified</Text>
          <MdVerified color="#9FE870" />
        </Box>
      ) : (
        <Box></Box>
      )}
    </Box>
  );
};
