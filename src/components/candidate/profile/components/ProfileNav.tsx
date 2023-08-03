import { Box, Button } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGlobalContext } from '../../../../context/GlobalContext';

export const ProfileNav = () => {
  const navigate = useNavigate();
  const { scrollToTop } = useGlobalContext();

  const location = useLocation();
  const currentUrl = location.pathname + location.search;

  const isProfilePage = currentUrl === '/candidate/profile';
  const isDocDepotPage = currentUrl === '/candidate/profile/docDepot';
  const isMyVerificationPage = currentUrl === '/candidate/profile/myVerification';

  const handleButtonClick = (buttonId: number) => {
    if (buttonId === 1) {
      navigate('/candidate/profile');
      scrollToTop();
    }
    if (buttonId === 2) {
      navigate('/candidate/profile/docDepot');
      scrollToTop();
    }
    if (buttonId === 3) {
      navigate('/candidate/profile/myVerification');
      scrollToTop();
    }
  };

  return (
    <Box className="profileNav">
      <Box className="profile-btn-wrapper">
        <Button variant="outline" className={isProfilePage ? 'active' : ''} onClick={() => handleButtonClick(1)}>
          Profile
        </Button>
        <Button variant="outline" className={isDocDepotPage ? 'active' : ''} onClick={() => handleButtonClick(2)}>
          Doc Depot
        </Button>
        <Button variant="outline" className={isMyVerificationPage ? 'active' : ''} onClick={() => handleButtonClick(3)}>
          My Verification
        </Button>
      </Box>
    </Box>
  );
};
