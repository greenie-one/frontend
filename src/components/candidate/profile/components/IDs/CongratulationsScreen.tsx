import { useNavigate } from 'react-router-dom';
import { Text, Box, Title, Button, CopyButton } from '@mantine/core';
import { Layout } from '../Layout';

import { useGlobalContext } from '../../../../../context/GlobalContext';
import checkGif from '../../assets/94109-confirmation 1.gif';
import { MdVerified } from 'react-icons/md';
import { BsCheck } from 'react-icons/bs';
import { GoCopy } from 'react-icons/go';

export const CongratulationsScreen = () => {
  const navigate = useNavigate();
  const { scrollToTop, profileData } = useGlobalContext();

  const greeneId = profileData?.greenieId ?? '';
  const handleContinue = () => {
    scrollToTop();
    navigate('/candidate/profile/IDs/verify/aadhar/details');
  };

  return (
    <Layout>
      <Box className="congratulations-screen">
        <Box className="container">
          <img src={checkGif} className="checkedImg" alt="Checked" />
          <Title className="title">Congratulations!</Title>
          <Text className="sub-title">You are a part of the Greenie Community</Text>
          <Text className="sub-text">You have achieved a star rating. You are among top 2% on Greenie.</Text>

          <Box>
            <Text fz="lg" fw={500}>
              Your Greenie ID is generated
            </Text>
            <Title order={2} sx={{ marginTop: '0.5rem' }}>
              {greeneId || 'GRN1208'}
            </Title>
          </Box>

          <Box sx={{ margin: '1.25rem 0 1.5rem' }}>
            <Button
              className="verified"
              sx={{ marginRight: '1rem' }}
              leftIcon={<MdVerified color="#8CF078" size={'16px'} />}
            >
              Verified
            </Button>
            <CopyButton value={greeneId} timeout={2000}>
              {({ copied, copy }) => (
                <Button
                  onClick={copy}
                  className="copied"
                  color={copied ? 'teal' : 'blue'}
                  leftIcon={copied ? <BsCheck color="#8CF078" size={'16px'} /> : <GoCopy color="gray" size={'16px'} />}
                >
                  {copied ? 'Copied Greenie ID' : 'Copy Greenie ID'}
                </Button>
              )}
            </CopyButton>
          </Box>

          <Button className="primaryBtn" onClick={handleContinue}>
            Continue
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};
