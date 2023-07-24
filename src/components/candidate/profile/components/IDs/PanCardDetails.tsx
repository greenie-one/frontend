import { Text, Box, Button, Title } from '@mantine/core';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import emptyProfile from '../../assets/emptyProfile.png';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import { Layout } from '../Layout';

export const PanCardDetails = () => {
  const navigate = useNavigate();
  const { scrollToTop, profileData } = useGlobalContext();
  const handleContinue = () => {
    scrollToTop();
    navigate('/candidate/profile');
  };
  return (
    <Layout>
      <section className="container documents-container" style={{ marginTop: '7rem' }}>
        <Box className="see-all-header">
          <Box className="go-back-btn" onClick={handleContinue}>
            <BsArrowLeft className="arrow-left-icon" size={'16px'} />
            <Text>Profile</Text>
            <AiOutlineRight className="arrow-right-icon" size={'16px'} />
          </Box>
          <Box className="go-back-btn">
            <Text>Verification ID</Text>
            <AiOutlineRight className="arrow-right-icon" size={'16px'} />
            <Text>Pan Card</Text>
          </Box>
        </Box>
        <Box className="document-verified-container">
          <Box className="document-verified-left-box">
            <Box className="left-img-box">
              {profileData.profilePic ? (
                <img src={profileData.profilePic} className="verified-document-profile" alt="" />
              ) : (
                <img src={emptyProfile} className="verified-document-profile" alt="" />
              )}

              <Text className="verified-document-name">
                {profileData.firstName} {profileData.lastName}
              </Text>
            </Box>

            <Box className="left-text-box">
              <Box>
                <Text className="heading">Last Updated</Text>
              </Box>
              <Box>
                <Text className="heading">Timestamp</Text>
                <Text className="details">12:30 AM | 02/03/2023</Text>
              </Box>
              <Box>
                <Text className="heading">Validity</Text>
                <Text className="details">March 2030</Text>
              </Box>
            </Box>
          </Box>
          <Box className="document-verified-right-box">
            <Box className="box-row pan-first-row">
              <Box className="details-box">
                <Title className="details-title">User title</Title>
                <Text className="details-detail">Mr.</Text>
              </Box>
              <Box className="details-box">
                <Title className="details-title">Name on card</Title>
                <Text className="details-detail">John Jacob Marston</Text>
              </Box>
              <Box className="details-box">
                <Title className="details-title">PAN card number</Title>
                <Text className="details-detail">XGASV8788H</Text>
              </Box>
            </Box>
            <Box className="box-row pan-second-row">
              {' '}
              <Box className="details-box">
                <Title className="details-title">DOB</Title>
                <Text className="details-detail">13/03/1990</Text>
              </Box>
              <Box className="details-box">
                <Title className="details-title">Gender</Title>
                <Text className="details-detail">Male</Text>
              </Box>
              <Box className="details-box">
                <Title className="details-title">PAN Type</Title>
                <Text className="details-detail">Personal</Text>
              </Box>
            </Box>
            <Box className="box-row pan-third-row">
              <Box className="details-box">
                <Title className="details-title">Phone Number</Title>
                <Text className="details-detail">+918383838383</Text>
              </Box>
              <Box className="details-box">
                <Title className="details-title">Email</Title>
                <Text className="details-detail">johnmarston@gmail.com</Text>
              </Box>
            </Box>
            <Box className="box-row pan-fourth-row">
              <Box className="details-box">
                <Title className="details-title">Aadhar linked</Title>
                <Text className="details-detail">Yes</Text>
              </Box>
              <Box className="details-box">
                <Title className="details-title">Aadhar Number</Title>
                <Text className="details-detail">2237 8989 8282 0092</Text>
              </Box>
            </Box>

            <Button className="primaryBtn" onClick={handleContinue}>
              Continue
            </Button>
          </Box>
        </Box>
      </section>
    </Layout>
  );
};
