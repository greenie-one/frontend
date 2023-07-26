import { Text, Box, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import AadharImg from '../../assets/Aadhar.png';
import PanImg from '../../assets/Pan.png';
import DrivingLicence from '../../assets/DrivingLicence.png';

export const IDCard: React.FC<VerificationIdCardProp> = ({ documentName, isVerified }) => {
  const navigate = useNavigate();
  const handleView = (documentName: string) => {
    if (documentName === 'AADHAR') {
      navigate('/candidate/profile/IDs/verify/Aadhar');
    }
    if (documentName === 'PAN') {
      navigate('/candidate/profile/IDs/verify/pan');
    }
    if (documentName === 'DRIVING_LICENSE') {
      navigate('/candidate/profile/IDs/verify/licence');
    }
  };

  return (
    <Box className="verificationIdCard">
      <Box className="verificationIdImg">
        {documentName === 'AADHAR' && (
          <div className="blurBox">
            <img src={AadharImg} />
            <Button className="viewBtn" onClick={() => handleView('AADHAR')}>
              View
            </Button>
          </div>
        )}
        {documentName === 'PAN' && (
          <div className="blurBox">
            <img src={PanImg} />
            <Button className="viewBtn" onClick={() => handleView('PAN')}>
              View
            </Button>
          </div>
        )}
        {documentName === 'DRIVING_LICENSE' && (
          <div className="blurBox">
            <img src={DrivingLicence} />
            <Button className="viewBtn" onClick={() => handleView('DRIVING_LICENSE')}>
              View
            </Button>
          </div>
        )}
      </Box>
      <Box className="verification-id-text-box">
        {documentName === 'AADHAR' && <Text className="document-name">Aadhar Card</Text>}
        {documentName === 'PAN' && <Text className="document-name">PAN Card</Text>}
        {documentName === 'DRIVING_LICENSE' && <Text className="document-name">Driving License</Text>}
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
