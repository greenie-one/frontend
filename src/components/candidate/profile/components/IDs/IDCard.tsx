import { Text, Box, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import AadharImg from '../../assets/Aadhar.png';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import PanImg from '../../assets/Pan.png';
import DrivingLicence from '../../assets/DrivingLicence.png';

export const IDCard: React.FC<VerificationIdCardProp> = ({ documentName, isVerified }) => {
  const { scrollToTop } = useGlobalContext();
  const navigate = useNavigate();
  const handleViewAdhar = () => {
    scrollToTop();
    navigate('/candidate/profile/IDs/aadhar');
  };

  const handleViewPan = () => {
    scrollToTop();
    navigate('/candidate/profile/IDs/pan');
  };
  return (
    <Box className="verificationIdCard">
      <Box className="verificationIdImg">
        {documentName === 'AADHAR' && (
          <span className="blurBox" onClick={handleViewAdhar}>
            <img src={AadharImg} />
          </span>
        )}
        {documentName === 'PAN' && (
          <span className="blurBox" onClick={handleViewPan}>
            <img src={PanImg} />
          </span>
        )}
        {documentName === 'DRIVING_LICENSE' && (
          <div className="blurBox">
            <img src={DrivingLicence} />
            <Button className="viewBtn">View</Button>
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
