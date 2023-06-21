import { Text, Box, Button, Modal, Title, Checkbox } from '@mantine/core';
import '../styles/global.scss';
import { VerificationIDCard } from '../components/VerificationIDCard';
import { MdOutlineEdit, MdVerified } from 'react-icons/md';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { useProfileContext } from '../context/ProfileContext';
import { Carousel } from '@mantine/carousel';
import janeCooper from '../assets/janeCooper.png';
import johnMarston from '../assets/johnMarston.png';
import flyoMiles from '../assets/flyodMiles.png';
import { AiOutlinePlus } from 'react-icons/ai';
import aadharLogo from '../assets/aadhar-logo.png';
import panLogo from '../assets/pan-logo.png';
import licenceLogo from '../assets/licence-logo.png';
import updateIdTrophy from '../assets/updateIdTrophy.png';
import { useState } from 'react';

export const VerificationIDSection = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const { detailsPage, dispatchDetailsPage, documentsData } = useProfileContext();
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const handlePageChange = (documentsType: string) => {
    if (documentsType === 'AADHAR') {
      dispatchDetailsPage({ type: 'SET_SEE_AADHAR_CARD', payload: !detailsPage.seeAadharCard });
    }
    if (documentsType === 'PAN') {
      dispatchDetailsPage({ type: 'SET_SEE_PAN_CARD', payload: !detailsPage.seePanCard });
    }
    if (documentsType === 'DRIVING_LICENSE') {
      dispatchDetailsPage({
        type: 'SET_SEE_DRIVER_LICENCE',
        payload: !detailsPage.seeDrivingLicence,
      });
    }
  };

  const onClose = () => {
    setIsAgreed(false);
    setChecked(false);
    close();
  };

  return (
    <section className="verificationId-section  container">
      {isAgreed && documentsData.length === 0 && (
        <Modal
          className="modal"
          size={'55%'}
          fullScreen={isMobile}
          opened={opened}
          onClose={onClose}
          centered
        >
          <Box className="ids-modal">
            <Text className="title">Select ID that you want to verify</Text>
            <Box className="ids-wrapper">
              <Box className="id-box" onClick={() => handlePageChange('AADHAR')}>
                <img src={aadharLogo} alt="Aadhar logo" />
                <Text className="id-name">Aadhar Card</Text>
              </Box>
              <Box className="id-box  disabled">
                <img src={licenceLogo} alt="licence logo" />
                <Text className="id-name">Passport</Text>
                <Text className="coming-soon">Coming soon</Text>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
      {isAgreed && documentsData.length > 0 && (
        <Modal
          className="modal"
          size={'65%'}
          fullScreen={isMobile}
          opened={opened}
          onClose={onClose}
          centered
        >
          <Box className="ids-modal">
            <Text className="title">Select ID that you want to verify</Text>
            <Box className="ids-wrapper">
              <Box className="id-box" onClick={() => handlePageChange('PAN')}>
                <img src={panLogo} alt="Pan logo" />
                <Text className="id-name">PAN Card</Text>
              </Box>
              <Box className="id-box" onClick={() => handlePageChange('DRIVING_LICENSE')}>
                <img src={licenceLogo} alt="licence logo" />
                <Text className="id-name">Driving Licence</Text>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
      {!isAgreed && (
        <Modal
          className="modal"
          size={'60%'}
          fullScreen={isMobile}
          opened={opened}
          onClose={onClose}
          centered
        >
          <Box className="disclaimer-modal">
            <Title className="disclaimer-heading">Disclaimer</Title>
            <Text className="disclaimer-subHeading">Verifying IDs on Greenie</Text>
            <Button
              className="primaryBtn"
              disabled={!checked}
              onClick={() => setIsAgreed(!isAgreed)}
            >
              I Agree
            </Button>
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
          </Box>
        </Modal>
      )}

      <Box className="header">
        <Box>
          <Text className="heading">{`Verification ID (${documentsData.length})`}</Text>
          <Text className="subheading">All government IDs, personal verification IDs etc.</Text>
        </Box>
        {documentsData.length > 0 && (
          <>
            <Box className="header-links">
              <Button leftIcon={<MdOutlineEdit />} onClick={open} className="edit-btn">
                Edit Section
              </Button>
            </Box>
            <Box className="edit-icon" onClick={open}>
              <MdOutlineEdit size={'22px'} className="btn" />
            </Box>
          </>
        )}
      </Box>

      {documentsData.length === 0 && (
        <Box className="verify-id-no-data-wrapper">
          <Box className="verify-id-img">
            <Box className="verify-data-no-data-card-wrapper">
              <Box className="hidden-card">
                <img className="card-img" src={janeCooper} alt="Profile Picture" />
                <Text className="card-text">Jane Cooper </Text>
              </Box>
              <Box className="card">
                <img className="card-img" src={johnMarston} alt="Profile Picture" />
                <Text className="card-text">{`John Marston`} </Text>
              </Box>
              <Box className="hidden-card">
                <img className="card-img" src={flyoMiles} alt="Profile Picture" />
                <Text className="card-text">Floyd Miles</Text>
              </Box>
            </Box>
          </Box>
          <Box className="verify-id-text">
            <Text className="text-heading">Stand Out!!</Text>
            <Text className="text-subheading">Verify your identity </Text>
            <Text className="text-subheading">
              and get a {<MdVerified color="#8cf078" />} Greenie Check
            </Text>

            <Button leftIcon={<AiOutlinePlus />} onClick={open} mt={'sm'} className="add-records">
              Verify ID
            </Button>
          </Box>
        </Box>
      )}

      {documentsData.length === 1 && (
        <Box className="singleData-wrapper">
          <VerificationIDCard documentName={documentsData[0].id_type} isVerified={true} />
          <Box className="single-data-box">
            <img src={updateIdTrophy} alt="Update Id" />
            <Box className="verify-id-text">
              <Text className="text-heading">Update IDs</Text>
              <Text className="text-subheading">Increase your ranking by adding more IDs</Text>
              <Button leftIcon={<AiOutlinePlus />} onClick={open} mt={'sm'} className="add-records">
                Add more
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      {documentsData.length > 1 && (
        <Carousel
          withIndicators={false}
          slideSize="33.33%"
          slideGap={24}
          slidesToScroll={1}
          align="start"
          styles={{ control: { display: 'none' } }}
          breakpoints={[
            { maxWidth: 'xs', slideSize: '100%' },
            { maxWidth: 'md', slideSize: '50%' },
          ]}
        >
          {documentsData.map(({ id_type }, index) => (
            <Carousel.Slide key={index}>
              <Box>
                <VerificationIDCard documentName={id_type} isVerified={true} />
              </Box>
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
    </section>
  );
};
