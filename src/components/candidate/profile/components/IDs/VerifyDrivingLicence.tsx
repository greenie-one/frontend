import { useState } from 'react';
import { useProfileContext } from '../../context/ProfileContext';
import { Text, Box, Button, TextInput, Title, Checkbox } from '@mantine/core';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import DrivingLicenceImg from '../../assets/DrivingLicence.png';
import john from '../../assets/johnMarston.png';
import { drivinglicenseAPIList } from '../../../../../assets/api/ApiList';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../../utils/functions/showNotification';
import { HttpClient, Result } from '../../../../../utils/generic/httpClient';
import { IDRequestBody } from '../../types/ProfileRequests';
import { verifyLicence } from '../../types/ProfileResponses';

export const VerifyDrivingLicence = () => {
  const [checked, setChecked] = useState(false);
  const { setCandidateActivePage, verifyLicenceForm, getDocuments, licenseIsVerified, setLicenseIsVerified } =
    useProfileContext();
  const { authClient } = useGlobalContext();

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
        getDocuments();
      } else {
        showErrorNotification(res.error.code);
      }
    }
  };
  const handlePageChange = () => {
    setCandidateActivePage('Profile');
    verifyLicenceForm.values.licenceNo = '';
    verifyLicenceForm.values.dateOfBirth = null;
    setLicenseIsVerified(false);
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
      {licenseIsVerified ? (
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
              <Text className="tearms-conditions">
                I understand that during the sign-up process and while using this website, I may be required to provide
                certain personal information, including but not limited to my name, email address, contact details, and
                any other information deemed necessary for registration and website usage.
              </Text>
            </Box>

            <Text className="policy">Click to view Data and Privacy Policy</Text>
          </Box>
        </form>
      )}
    </section>
  );
};
