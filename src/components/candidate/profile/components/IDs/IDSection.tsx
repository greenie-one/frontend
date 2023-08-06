import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Box, Button, Modal, Title, Checkbox, Grid } from '@mantine/core';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';

import { useGlobalContext } from '../../../../../context/GlobalContext';
import { UndertakingText } from '../UndertakingText';
import { IDCard } from './IDCard';

import updateIdTrophy from '../../assets/updateIdTrophy.png';
import licenceLogo from '../../assets/licence-logo.png';
import johnMarston from '../../assets/johnMarston.png';
import aadharLogo from '../../assets/aadhar-logo.png';
import janeCooper from '../../assets/janeCooper.png';
import flyoMiles from '../../assets/flyodMiles.png';
import panLogo from '../../assets/pan-logo.png';

import { MdOutlineEdit, MdVerified } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';

export const IDSection: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { IDs, scrollToTop } = useGlobalContext();

  const [opened, { open, close }] = useDisclosure(false);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  const handlePageChange = (documentsType: string) => {
    if (documentsType === 'AADHAR') {
      scrollToTop();
      navigate('/candidate/profile/IDs/verify/aadhar');
    }
    if (documentsType === 'PAN') {
      scrollToTop();
      navigate('/candidate/profile/IDs/verify/pan');
    }
    if (documentsType === 'DRIVING_LICENSE') {
      scrollToTop();
      navigate('/candidate/profile/IDs/verify/driving_licence');
    }
  };

  const onClose = () => {
    setIsAgreed(false);
    setChecked(false);
    close();
  };

  return (
    <section className="verificationId-section  container">
      {!isAgreed && (
        <Modal
          centered
          radius={'lg'}
          size={'60%'}
          opened={opened}
          className="modal"
          onClose={onClose}
          fullScreen={isMobile}
        >
          <Box className="disclaimer-modal">
            <Title className="disclaimer-heading">Undertaking</Title>
            <Text className="disclaimer-subHeading">Verifying IDs on Greenie</Text>

            <Box className="checkbox-box">
              <Checkbox
                color="teal"
                checked={checked}
                className="checkbox"
                onChange={() => setChecked((prev) => !prev)}
              />
              <Text className="terms-conditions">
                I have read the undertaking and I authorise Greenie to collect information on my behalf.
              </Text>
            </Box>
            <UndertakingText />
            <Button className="primaryBtn" disabled={!checked} onClick={() => setIsAgreed((prev) => !prev)}>
              I Agree
            </Button>
          </Box>
        </Modal>
      )}

      {isAgreed && (
        <Modal
          centered
          size={'65%'}
          radius={'lg'}
          opened={opened}
          className="modal"
          onClose={onClose}
          fullScreen={isMobile}
        >
          <Box className="ids-modal">
            <Text className="title">Select ID that you want to verify</Text>
            <Box className="ids-wrapper">
              {IDs.some((id) => id.id_type === 'AADHAR') ? (
                <>
                  {!IDs.some((id) => id.id_type === 'PAN') && (
                    <Box className="id-box" onClick={() => handlePageChange('PAN')}>
                      <img src={panLogo} alt="Pan logo" />
                      <Text className="id-name">PAN Card</Text>
                    </Box>
                  )}

                  {!IDs.some((id) => id.id_type === 'DRIVING_LICENSE') && (
                    <Box className="id-box" onClick={() => handlePageChange('DRIVING_LICENSE')}>
                      <img src={licenceLogo} alt="licence logo" />
                      <Text className="id-name">Driving Licence</Text>
                    </Box>
                  )}
                </>
              ) : (
                <>
                  <Box className="id-box" onClick={() => handlePageChange('AADHAR')}>
                    <img src={aadharLogo} alt="Aadhar logo" />
                    <Text className="id-name">Aadhar Card</Text>
                  </Box>
                  <Box className="id-box disabled">
                    <img src={panLogo} alt="Pan logo" />
                    <Text className="id-name">PAN Card</Text>
                    <Text className="coming-soon">Verify Aadhar first</Text>
                  </Box>
                  <Box className="id-box disabled">
                    <img src={licenceLogo} alt="licence logo" />
                    <Text className="id-name">Driving Licence</Text>
                    <Text className="coming-soon">Verify Aadhar first</Text>
                  </Box>
                  <Box className="id-box  disabled">
                    <img src={licenceLogo} alt="licence logo" />
                    <Text className="id-name">Passport</Text>
                    <Text className="coming-soon">Coming soon</Text>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Modal>
      )}

      <Box className="header">
        <Box>
          <Text className="heading">{`Verification ID (${IDs?.length})`}</Text>
          <Text className="subheading">All government IDs, personal verification IDs etc.</Text>
        </Box>
        {IDs?.length > 0 && IDs?.length < 3 && (
          <>
            <Box className="header-links">
              <Button leftIcon={<MdOutlineEdit />} onClick={open} className="edit-btn">
                Add ID
              </Button>
            </Box>
            <Box className="edit-icon" onClick={open}>
              <MdOutlineEdit size={'22px'} className="btn" />
            </Box>
          </>
        )}
      </Box>

      {IDs?.length === 0 && (
        <Box className="verify-id-no-data-wrapper">
          <Box className="verify-id-img">
            <Box className="verify-data-no-data-card-wrapper">
              <Box className="hidden-card">
                <img className="card-img" src={janeCooper} alt="Profile Picture" />
                <Text className="card-text">
                  Jane Cooper <MdVerified className="verified-icon" />{' '}
                </Text>
              </Box>
              <Box className="card">
                <img className="card-img" src={johnMarston} alt="Profile Picture" />
                <Text className="card-text">
                  John Marston <MdVerified className="verified-icon" />
                </Text>
              </Box>
              <Box className="hidden-card">
                <img className="card-img" src={flyoMiles} alt="Profile Picture" />
                <Text className="card-text">
                  Floyd Miles <MdVerified className="verified-icon" />
                </Text>
              </Box>
            </Box>
          </Box>
          <Box className="verify-id-text">
            <Text className="text-heading">Stand Out!!</Text>
            <Text className="text-subheading">Verify your identity </Text>
            <Text className="text-subheading">and get a {<MdVerified color="#8cf078" />} Greenie Check</Text>

            <Button leftIcon={<AiOutlinePlus />} onClick={open} mt={'sm'} className="add-records">
              Verify ID
            </Button>
          </Box>
        </Box>
      )}

      {IDs?.length === 1 && (
        <Box className="singleData-wrapper">
          <IDCard documentName={IDs[0].id_type} />

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

      {IDs?.length > 1 && (
        <Grid>
          {IDs?.map(({ id_type }, index) => (
            <Grid.Col span={4} key={index}>
              <IDCard documentName={id_type} />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </section>
  );
};
