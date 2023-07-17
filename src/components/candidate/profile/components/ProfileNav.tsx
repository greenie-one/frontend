import { Box, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../../context/GlobalContext';

export const ProfileNav = () => {
  const navigate = useNavigate();
  const { activeButton, setActiveButton } = useGlobalContext();

  const handleButtonClick = (buttonId: number) => {
    setActiveButton(buttonId);
    if (buttonId === 1) {
      navigate('/candidate/profile');
    }
    if (buttonId === 2) {
      navigate('/candidate/profile/docDepot');
    }
    if (buttonId === 3) {
      navigate('/candidate/profile/myVerification');
    }
  };
  return (
    <Box className="profileNav">
      <Box className="profile-btn-wrapper">
        <Button variant="outline" className={activeButton === 1 ? 'active' : ''} onClick={() => handleButtonClick(1)}>
          Profile
        </Button>
        <Button variant="outline" className={activeButton === 2 ? 'active' : ''} onClick={() => handleButtonClick(2)}>
          Doc Depot
        </Button>
        <Button variant="outline" className={activeButton === 3 ? 'active' : ''} onClick={() => handleButtonClick(3)}>
          My Verification
        </Button>
      </Box>
    </Box>
  );
};
