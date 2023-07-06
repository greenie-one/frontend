import '../styles/global.scss';
import { useState } from 'react';
import { useProfileContext } from '../context/ProfileContext';
import { Text, Box, Button, TextInput, Title, Checkbox } from '@mantine/core';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import PanImg from '../assets/Pan.png';
import john from '../assets/johnMarston.png';
import { PANAPIList } from '../../../assets/api/ApiList';
import { useGlobalContext } from '../../../context/GlobalContext';
import { HttpClient, Result } from '../../../utils/generic/httpClient';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../utils/functions/showNotification';

export const SeePanCard = () => {
  const {
    detailsPage,
    dispatchDetailsPage,
    verifyPANForm,
    getDocuments,

    panIsVerified,
    setPanIsVerified,
    scrollToTop,
  } = useProfileContext();
  const [checked, setChecked] = useState<boolean>(false);
  const { authClient } = useGlobalContext();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!verifyPANForm.validateField('panNo').hasError && checked) {
      showLoadingNotification({ title: 'Verifying your PAN Card...', message: 'Please wait while we verify your PAN' });
      const res: Result<any> = await HttpClient.callApiAuth(
        {
          url: `${PANAPIList.verifyPAN}`,
          method: 'POST',
          body: { id_type: 'PAN', id_number: verifyPANForm.values.panNo },
        },
        authClient
      );
      if (res.ok) {
        showSuccessNotification({ title: 'Success !', message: 'Verified your PAN successfully' });
        setPanIsVerified(true);
        getDocuments();
        scrollToTop();
      } else {
        showErrorNotification(res.error.code);
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
              className="inputClass"
              withAsterisk
              minLength={10}
              maxLength={10}
              {...verifyPANForm.getInputProps('panNo')}
            />
            <Button className={checked ? 'greenBtn' : 'disabledBtn'} disabled={!checked} onClick={handleSubmit}>
              Click to verify
            </Button>
            <Box className="checkbox-box">
              <Checkbox className="checkbox" checked={checked} onChange={() => setChecked(!checked)} color="teal" />
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
