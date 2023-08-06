import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Box, Button, TextInput, Title, Checkbox } from '@mantine/core';

import { HttpClient, Result } from '../../../../../utils/generic/httpClient';
import { drivinglicenseAPIList } from '../../../../../assets/api/ApiList';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { Layout } from '../Layout';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../../utils/functions/showNotification';

import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import emptyProfile from '../../assets/emptyProfile.png';
import DrivingLicenceImg from '../../assets/DrivingLicence.png';
import privacyPolicy from '../../../../auth/assets/Privacy Policy-Greenie.pdf';

export const VerifyDrivingLicence = () => {
  const [licenseIsVerified, setLicenseIsVerified] = useState<boolean>(false);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const { authClient, verifyLicenceForm, setForceRender, profileData } = useGlobalContext();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!verifyLicenceForm.validateField('licenceNo').hasError && checked) {
      showLoadingNotification({
        title: 'Verifying your Driving Licence...',
        message: 'Please wait while we verify your licence',
      });
      const requestBody: IDRequestBody = { id_type: 'DRIVING_LICENSE', id_number: verifyLicenceForm.values.licenceNo };
      const res: Result<verifyLicence> = await HttpClient.callApiAuth(
        {
          url: `${drivinglicenseAPIList.verifylicense}`,
          method: 'POST',
          body: requestBody,
        },
        authClient
      );
      if (res.ok) {
        showSuccessNotification({ title: 'Success !', message: 'Verified your Licence successfully' });
        setLicenseIsVerified(true);
        setForceRender((prev) => !prev);
      } else {
        showErrorNotification(res.error.code);
      }
    }
  };

  const handlePageChange = () => {
    verifyLicenceForm.setFieldValue('licenceNo', '');
    verifyLicenceForm.setFieldValue('dateOfBirth', null);
    setLicenseIsVerified(false);
    navigate('/candidate/profile');
  };

  return (
    <Layout>
      <section className="container" style={{ marginTop: '7rem' }}>
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
        {licenseIsVerified ? (
          <Box className="document-verified-container">
            <Box className="document-verified-left-box">
              <Box className="left-img-box">
                {profileData.profilePic ? (
                  <img src={profileData.profilePic} className="verified-document-profile" alt="" />
                ) : (
                  <img src={emptyProfile} className="verified-document-profile" alt="" />
                )}

                <Text className="verified-document-name">
                  {profileData.firstName}
                  {profileData.lastName}
                </Text>
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

              <Button className="primaryBtn" onClick={handlePageChange}>
                Continue
              </Button>
            </Box>
          </Box>
        ) : (
          <form onSubmit={handleSubmit} className="document-container">
            <img src={DrivingLicenceImg} className="document-img" alt="Driving Licence Image" />
            <Box className="document-text-box">
              <Title className="heading">Enter your Driving Licence Details</Title>
              <TextInput
                label="DOB as per license(DD/MM/YYYY)"
                className="inputClass"
                withAsterisk
                {...verifyLicenceForm.getInputProps('dateOfBirth')}
              />
              <TextInput
                label="Licence Number"
                className="inputClass"
                withAsterisk
                maxLength={15}
                minLength={15}
                {...verifyLicenceForm.getInputProps('licenceNo')}
              />
              <Button disabled={!checked} onClick={handleSubmit} className={checked ? 'greenBtn' : 'disabledBtn'}>
                Click to verify
              </Button>
              <Box className="checkbox-box">
                <Checkbox checked={checked} onChange={() => setChecked(!checked)} className="checkbox" color="teal" />
                <Text className="terms-conditions">
                  I hereby authorize Greenie to verify my Aadhar/PAN/DL details for authentication purposes. I have read
                  the Consent Notice and I am aware that Greenie will use the information only for the intended purpose
                  and my data will be handled as per laws. I am aware that I can withdraw this consent in the future.
                </Text>
              </Box>

              <a className="policy" href={privacyPolicy} download={'Data and Privacy Policy'}>
                Click to view Data and Privacy Policy
              </a>
            </Box>
          </form>
        )}
      </section>
    </Layout>
  );
};
