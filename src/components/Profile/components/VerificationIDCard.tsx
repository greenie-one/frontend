import { Text, Box, Button } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import '../styles/global.scss';

interface CardProps {
  documentName: string;
  isVerified: boolean;
}

export const VerificationIDCard: React.FC<CardProps> = ({ documentName, isVerified }) => {
  return (
    <Box className="verificationIdCard">
      <Box className="verificationIdImg"></Box>
      <Box className="verification-id-text-box">
        {documentName === 'AADHAR' && <Text className="document-name">Aadhar Card</Text>}
        {documentName === 'PAN' && <Text className="document-name">PAN Card</Text>}
        {documentName === 'DRIVING_LICENSE' && (
          <Text className="document-name">Driving License</Text>
        )}
        {isVerified ? (
          <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified">
            Verified
          </Button>
        ) : (
          <Button leftIcon={<CgSandClock color="#FF7272" size={'16px'} />} className="pending">
            Pending
          </Button>
        )}
      </Box>
    </Box>
  );
};
