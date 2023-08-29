import { useNavigate } from 'react-router-dom';
import { Text, Box, Button } from '@mantine/core';

import { useGlobalContext } from '../../../../../context/GlobalContext';
import DrivingLicence from '../../assets/DrivingLicence.png';
import AadharImg from '../../assets/Aadhar.png';
import PanImg from '../../assets/Pan.png';
import { MdVerified } from 'react-icons/md';

export const IDCard: React.FC<VerificationIdCardProp> = ({ documentName }) => {
  const navigate = useNavigate();
  const { scrollToTop } = useGlobalContext();

  const handleView = (documentName: string) => {
    if (documentName === 'AADHAR') {
      scrollToTop();
      navigate('/candidate/profile/IDs/verify/aadhar/details');
    }
    if (documentName === 'PAN') {
      scrollToTop();
      navigate('/candidate/profile/IDs/verify/pan/details');
    }
    if (documentName === 'DRIVING_LICENSE') {
      scrollToTop();
      navigate('/candidate/profile/IDs/verify/driving_license/details');
    }
  };

  return (
    <Box className="verificationIdCard">
      <Box className="verificationIdImg">
        {documentName === 'AADHAR' && (
          <Box className="blurBox" onClick={() => handleView('AADHAR')}>
            <img src={AadharImg} />
          </Box>
        )}

        {documentName === 'PAN' && (
          <Box className="blurBox" onClick={() => handleView('PAN')}>
            <img src={PanImg} />
          </Box>
        )}

        {documentName === 'DRIVING_LICENSE' && (
          <Box className="blurBox" onClick={() => handleView('DRIVING_LICENSE')}>
            <img src={DrivingLicence} />
          </Box>
        )}
      </Box>

      <Box className="verification-id-text-box">
        {documentName === 'AADHAR' && <Text className="document-name">Aadhar Card</Text>}
        {documentName === 'PAN' && <Text className="document-name">PAN Card</Text>}
        {documentName === 'DRIVING_LICENSE' && <Text className="document-name">Driving License</Text>}

        <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified">
          Verified
        </Button>
      </Box>
    </Box>
  );
};
