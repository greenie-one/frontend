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
} from '@mantine/core';
import { FaExclamation } from 'react-icons/fa';
import { BsArrowLeft, BsCheckLg } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import PanImg from '../assets/Pan.png';
import john from '../assets/johnMarston.png';
import { notifications } from '@mantine/notifications';
import { PANAPIList } from '../../../assets/api/ApiList';
import axios from 'axios';

export const SeePanCard = () => {
  const { classes: inputClasses } = inputStyles();
  const {
    detailsPage,
    dispatchDetailsPage,
    verifyPANForm,
    getDocuments,
    authTokens,
    panIsVerified,
    setPanIsVerified,
    scrollToTop,
  } = useProfileContext();
  const [checked, setChecked] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!verifyPANForm.validateField('panNo').hasError && checked) {
      try {
        notifications.show({
          id: 'load-data',
          title: 'Verifying your PAN Card...',
          message: 'Please wait while we verify your PAN',
          loading: true,
          autoClose: false,
          withCloseButton: false,
          sx: { borderRadius: em(8) },
        });
        const res = await axios.post(
          PANAPIList.verifyPAN,
          {
            id_type: 'PAN',
            id_number: verifyPANForm.values.panNo,
          },
          {
            headers: {
              Authorization: `Bearer ${authTokens?.accessToken}`,
            },
          }
        );
        if (res.data.success) {
          notifications.update({
            id: 'load-data',
            title: 'Success!',
            message: 'Verified your PAN successfully',
            autoClose: 2200,
            withCloseButton: false,
            color: 'teal',
            icon: <BsCheckLg />,
            sx: { borderRadius: em(8) },
          });
          setPanIsVerified(true);
          getDocuments();
          scrollToTop();
        }
      } catch (error: any) {
        if (error.response?.data?.code === 'GR0031') {
          notifications.update({
            id: 'load-data',
            title: 'Invalid PAN Number!',
            message: 'Please enter valid PAN number',
            autoClose: 2200,
            withCloseButton: false,
            color: 'red',
            icon: <FaExclamation />,
            sx: { borderRadius: em(8) },
          });
        }
      }
    }
  };

  const handlePageChange = () => {
    scrollToTop();
    dispatchDetailsPage({ type: 'SET_SEE_PAN_CARD', payload: !detailsPage.seePanCard });
    verifyPANForm.values.panNo = '';
    setPanIsVerified(false);
  };

  return (
    <section className="container">
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
      {panIsVerified ? (
        <Box className="document-verified-container">
          <Box className="document-verified-left-box">
            <Box className="left-img-box">
              <img src={john} className="verified-document-profile" alt="" />
              <Text className="verified-document-name">John Jocab Marston</Text>
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

            <Button className="primaryBtn" onClick={handlePageChange}>
              Continue
            </Button>
          </Box>
        </Box>
      ) : (
        <form onSubmit={handleSubmit} className="document-container">
          <img src={PanImg} className="document-img" alt="Pan Card Image" />
          <Box className="document-text-box">
            <Title className="heading">Enter your PAN Number</Title>
            <TextInput
              label="PAN Number"
              classNames={inputClasses}
              withAsterisk
              minLength={10}
              maxLength={10}
              {...verifyPANForm.getInputProps('panNo')}
            />
            <Button
              className={checked ? 'greenBtn' : 'disabledBtn'}
              disabled={!checked}
              onClick={handleSubmit}
            >
              Click to verify
            </Button>
            <Box className="checkbox-box">
              <Checkbox
                className="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
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
          </Box>
        </form>
      )}
    </section>
  );
};

const inputStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    marginTop: '10px',
    marginBottom: '16px',
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
