import { Text, Box, Button, Modal } from '@mantine/core';
import '../styles/global.scss';
import { VerificationIDCard } from '../components/VerificationIDCard';
import { Link } from 'react-router-dom';
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

const documentsType = [
  {
    value: 'PAN',
    label: 'Pan Card',
  },
  { value: 'AADHAR', label: 'Aadhar Card' },
  { value: 'DRIVING_LICENSE', label: 'Driving Licence' },
];

export const VerificationIDSection = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const { documentsData, documentsForm, detailsPage, dispatchDetailsPage } = useProfileContext();

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

  return (
    <section className="verificationId-section  container">
      <Modal
        className="modal"
        size={'65%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={close}
        centered
      >
        <Box className="ids-wrapper">
          <Box className="id-box" onClick={() => handlePageChange('AADHAR')}>
            <img src={aadharLogo} alt="" />
            <Text className="id-name">Aadhar Card</Text>
          </Box>
          <Box className="id-box" onClick={() => handlePageChange('PAN')}>
            <img src={panLogo} alt="" />
            <Text className="id-name">PAN Card</Text>
          </Box>
          <Box className="id-box" onClick={() => handlePageChange('DRIVING_LICENSE')}>
            <img src={licenceLogo} alt="" />
            <Text className="id-name">Driving Licence</Text>
          </Box>
        </Box>
      </Modal>
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

      {documentsData.length === 0 ? (
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
              `and get a {<MdVerified color="#8cf078" />} Greenie Check`
            </Text>
            <Button leftIcon={<AiOutlinePlus />} onClick={open} mt={'sm'} className="add-records">
              Verify ID
            </Button>
          </Box>
        </Box>
      ) : (
        <Carousel
          withIndicators={false}
          slideSize="50%"
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
