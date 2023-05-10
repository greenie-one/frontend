import { Box, Button, Flex, Text } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import { BsArrowLeft } from 'react-icons/bs';
import '../../styles/global.scss';

const OTPTab = () => {
  const { dispatch } = useAuthContext();

  return (
    <Box style={{ width: '456px' }}>
      <Flex className="tabTopBox" onClick={() => dispatch({ type: 'PREVSIGNUPSTEP' })}>
        <BsArrowLeft size={'15px'} />
        <Text className="tabHeading">Reset Password</Text>
      </Flex>
      <Text className="profileTextBold">Enter the one-time password sent to your phone number</Text>
      <input className="otpInput" maxLength={4} type="text" pattern="[0-9]{4}" />
      <Text fw={'light'} fz={'xs'} my={'md'}>
        Resend{' '}
        <Text fw={'600'} span>
          after 30s
        </Text>
      </Text>
      <Button className="primaryBtn" onClick={() => dispatch({ type: 'NEXTSIGNUPSTEP' })}>
        Verify
      </Button>
    </Box>
  );
};

export default OTPTab;
