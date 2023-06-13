import '../styles/global.scss';
import { useState } from 'react';
import { useProfileContext } from '../context/ProfileContext';
import {
  Text,
  Box,
  Button,
  createStyles,
  em,
  rem,
  TextInput,
  Title,
  Checkbox,
  Modal,
} from '@mantine/core';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import PanImg from '../assets/Pan.png';
import john from '../assets/johnMarston.png';

export const SeePanCard = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isVerified, setIsVerified] = useState(false);
  const [checked, setChecked] = useState(false);
  const { classes: inputClasses } = inputStyles();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { documentsData, detailsPage, dispatchDetailsPage, verifyPANForm } = useProfileContext();

  const handleCheck = () => {
    setChecked(!checked);
  };
  const handlePageChange = () => {
    dispatchDetailsPage({ type: 'SET_SEE_PAN_CARD', payload: !detailsPage.seePanCard });
    verifyPANForm.values.panNo = '';
    verifyPANForm.values.otp = '';
  };

  const handleOpenModal = () => {
    if (!verifyPANForm.validateField('panNo').hasError && checked) {
      open();
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !verifyPANForm.validateField('panNo').hasError &&
      !verifyPANForm.validateField('otp').hasError
    ) {
      verifyPANForm.values.panNo = '';
      verifyPANForm.values.otp = '';
      setIsVerified(true);
      close();
    }
  };
  return (
    <section className="container">
      <Modal
        centered
        className="modal"
        size={'55%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={close}
        title="Please enter the OTP send to"
      >
        <form className="otp-form" onSubmit={handleSubmit}>
          <Title className="title">Phone number linked with your Aadhaar Card</Title>
          <Text className="disbledInput">
            {verifyPANForm.values.panNo}
            <span className="changeBtn" onClick={close}>
              Change
            </span>
          </Text>
          <TextInput
            classNames={inputClasses}
            label="Enter OTP"
            withAsterisk
            maxLength={6}
            pattern="[0-9]{6}"
            {...verifyPANForm.getInputProps('otp')}
          />
          <Text fw={'light'} fz={'xs'} mb={'md'}>
            Resend{' '}
            <Text fw={'600'} span>
              after 30s.
            </Text>
          </Text>
          <Button type="submit" className="primaryBtn">
            Verify
          </Button>
          <Text className="warning">
            If you haven't received the OTP, make sure to check the spam folder
          </Text>
        </form>
      </Modal>
      <Box className="see-all-header">
        <Box className="go-back-btn" onClick={handlePageChange}>
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
      {isVerified ? (
        <Box className="document-verified-container">
          <Box className="document-verified-left-box">
            <Box className="left-img-box">
              <img src={john} className="verified-document-profile" alt="" />
              <Text className="verified-document-name">John Jocab Marston</Text>
            </Box>

            <Box className="left-text-box">
              <Box>
                <Text className="heading">Last Updated</Text>
                <Text className="details">02/03/2023</Text>
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

            <Button className="primaryBtn" onClick={() => setIsVerified(false)}>
              Continue
            </Button>
          </Box>
        </Box>
      ) : (
        <Box className="document-container">
          <img src={PanImg} className="document-img" alt="Pan Card Image" />
          <Box className="document-text-box">
            <Title className="heading">Enter your PAN Number</Title>
            <TextInput
              label="PAN Number"
              classNames={inputClasses}
              withAsterisk
              {...verifyPANForm.getInputProps('panNo')}
            />
            <Box className="checkbox-box">
              <Checkbox
                checked={checked}
                onChange={handleCheck}
                className="checkbox"
                color="teal"
              />
              <Text className="tearms-conditions">
                I understand that during the sign-up process and while using this website, I may be
                required to provide certain personal information, including but not limited to my
                name, email address, contact details, and any other information deemed necessary for
                registration and website usage.
              </Text>
            </Box>

            <Text className="policy">Click to view Data and Privacy Policy</Text>
            <Button disabled={!checked} onClick={handleOpenModal} className="primaryBtn">
              Click to verify
            </Button>
          </Box>
        </Box>
      )}
    </section>
  );
};

const inputStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    marginTop: '10px',
    marginBottom: '26px',
  },

  input: {
    height: '58px',
    paddingTop: '18px',
    fontSize: '16px',
    fontWeight: 500,
    borderRadius: '8px',
    border: '1px solid #D1D4DB',
    lineHeight: '19px',
    letterSpacing: '-0.02em',
    color: '#697082',

    [`@media screen and (max-width: ${em(1024)})`]: {
      height: '46px',
      borderRadius: '6px',
      fontSize: '10px',
      lineHeight: '12px',
      margin: '0 auto',
    },
  },

  innerInput: {
    height: rem(54),
    paddingTop: rem(28),

    [`@media screen and (max-width: ${em(1024)})`]: {
      paddingTop: rem(8),
    },
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: '12px',
    paddingLeft: '14px',
    paddingTop: '7px',
    lineHeight: '14.52px',
    letterSpacing: '-0.02em',
    zIndex: 1,
    color: '#697082',

    [`@media screen and (max-width: ${em(1024)})`]: {
      fontSize: '10px',
      lineHeight: '10px',
      paddingTop: '8px',
    },
  },
}));
