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
import DrivingLicenceImg from '../assets/DrivingLicence.png';
import john from '../assets/johnMarston.png';
import { notifications } from '@mantine/notifications';
import { drivinglicenseAPIList } from '../../../assets/api/ApiList';
import axios from 'axios';

export const SeeDrivingLicence = () => {
  const [isVerified, setIsVerified] = useState(false);
  const { classes: inputClasses } = inputStyles();
  const [checked, setChecked] = useState(false);
  const { detailsPage, dispatchDetailsPage, verifyLicenceForm, getDocuments } = useProfileContext();

  const token = localStorage.getItem('auth-tokens');
  const authTokens = token ? JSON.parse(token) : null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!verifyLicenceForm.validateField('licenceNo').hasError && checked) {
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
          drivinglicenseAPIList.verifylicense,
          {
            id_type: 'DRIVING_LICENSE',
            id_number: verifyLicenceForm.values.licenceNo,
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
            message: 'Verified your Licence successfully',
            autoClose: 2200,
            withCloseButton: false,
            color: 'teal',
            icon: <BsCheckLg />,
            sx: { borderRadius: em(8) },
          });
          setIsVerified(true);
          getDocuments();
        }
      } catch (error: any) {
        if (error.response?.data?.code === 'GR0032') {
          notifications.update({
            id: 'load-data',
            title: 'Invalid Licence Number!',
            message: 'Please enter valid licence number',
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
    dispatchDetailsPage({
      type: 'SET_SEE_DRIVER_LICENCE',
      payload: !detailsPage.seeDrivingLicence,
    });
    verifyLicenceForm.values.licenceNo = '';
  };
  const handleContinue = () => {
    dispatchDetailsPage({
      type: 'SET_SEE_DRIVER_LICENCE',
      payload: !detailsPage.seeDrivingLicence,
    });
    verifyLicenceForm.values.licenceNo = '';
    dispatchDetailsPage({
      type: 'SET_SEE_CONGRATULATIONS_SCREEN',
      payload: !detailsPage.seeCongratulations,
    });
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
          <Text>Driving Licence </Text>
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
                <Text className="heading">Date of issue</Text>
                <Text className="details">02/03/2020</Text>
              </Box>
              <Box>
                <Text className="heading">Date of expiry</Text>
                <Text className="details">02/03/2030</Text>
              </Box>
            </Box>
          </Box>
          <Box className="document-verified-right-box">
            <Box className="box-row licence-first-row">
              <Box className="details-box">
                <Title className="details-title">Country</Title>
                <Text className="details-detail">India</Text>
              </Box>
              <Box className="details-box">
                <Title className="details-title">District</Title>
                <Text className="details-detail">Pune</Text>
              </Box>
              <Box className="details-box">
                <Title className="details-title">Pincode</Title>
                <Text className="details-detail">413049</Text>
              </Box>
            </Box>
            <Box className="box-row licence-second-row">
              {' '}
              <Box className="details-box">
                <Title className="details-title">State</Title>
                <Text className="details-detail">Maharashtra</Text>
              </Box>
              <Box className="details-box">
                <Title className="details-title">Type</Title>
                <Text className="details-detail">413049</Text>
              </Box>
              <Box className="details-box">
                <Title className="details-title">Blood group</Title>
                <Text className="details-detail">AB+</Text>
              </Box>
            </Box>
            <Box className="box-row licence-third-row">
              <Box className="details-box">
                <Title className="details-title">Licence number</Title>
                <Text className="details-detail">MH220023849984411</Text>
              </Box>
              <Box className="details-box">
                <Title className="details-title">DOB</Title>
                <Text className="details-detail">13/09/1990</Text>
              </Box>
            </Box>
            <Box className="box-row licence-fourth-row">
              <Box className="details-box">
                <Title className="details-title">Name of Father/Husband</Title>
                <Text className="details-detail">Jocob Marston</Text>
              </Box>
              <Box className="details-box">
                <Title className="details-title">Vehicle type</Title>
                <Text className="details-detail">LMV/CAR/JEEP</Text>
              </Box>
            </Box>

            <Button className="primaryBtn" onClick={handleContinue}>
              Continue
            </Button>
          </Box>
        </Box>
      ) : (
        <form onSubmit={handleSubmit} className="document-container">
          <img src={DrivingLicenceImg} className="document-img" alt="Driving Licence Image" />
          <Box className="document-text-box">
            <Title className="heading">Enter your Driving Licence Number</Title>
            <TextInput
              label="Driving Licence Number"
              classNames={inputClasses}
              withAsterisk
              maxLength={15}
              minLength={15}
              {...verifyLicenceForm.getInputProps('licenceNo')}
            />
            <Box className="checkbox-box">
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
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
            <Button disabled={!checked} onClick={handleSubmit} type="submit" className="primaryBtn">
              Click to verify
            </Button>
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
