import { Text, Box, Button, List } from '@mantine/core';
import '../styles/global.scss';

export const ProfileNav = () => {
  return (
    <section className="profileNav container">
      <Box className="profile-btn-wrapper">
        <Button variant="outline" className="btn active">
          Profile
        </Button>
        <Button variant="outline" className="btn">
          Doc Depot
        </Button>
        <Button variant="outline" className="btn">
          My Verification
        </Button>
      </Box>
    </section>
  );
};
