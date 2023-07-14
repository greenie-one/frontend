import { useState } from 'react';
import { useProfileContext } from '../../context/ProfileContext';
import { Text, Box, Button, Modal, Title, Checkbox } from '@mantine/core';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight, AiOutlineHome } from 'react-icons/ai';
import { MdVerified, MdAddLocationAlt } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import location from '../../assets/location.png';
import { ResidentialInfoDetails } from './ResidentialInfoDetails';
import { IResidendialInfoResponse } from '../../types/ProfileResponses';
import { VerifyResidentialInfo } from './VerifyResidentialInfo';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';

export const AllResidentialInfo = () => {
  const { setCandidateActivePage, residentialInfoData, selectedResidentialInfo, setSelectedResidentialInfo } =
    useProfileContext();
  const [infoDetails, setInfoDetails] = useState<IResidendialInfoResponse | null>(null);

  const [modalStep, setModalStep] = useState<number>(1);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState<boolean>(false);
  const handleToggleResidentialDetails = (): void => {
    setCandidateActivePage('Profile');
  };

  const handleAggree = () => {
    if (checked) {
      setModalStep(2);
    }
  };

  const handleGoToVerification = () => {
    setSelectedResidentialInfo(infoDetails);
    setInfoDetails(null);
    close();
  };

  return (
    <section className="container">
      {modalStep === 1 && (
        <Modal className="modal" size={'60%'} fullScreen={isMobile} opened={opened} onClose={close} centered>
          <Box className="disclaimer-modal">
            <Title className="disclaimer-heading">Disclaimer</Title>
            <Text className="disclaimer-subHeading">Verifying IDs on Greenie</Text>
            <Button className="primaryBtn" disabled={!checked} onClick={handleAggree}>
              I Agree
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
        </Modal>
      )}
      {modalStep === 2 && (
        <Modal className="modal" size={'60%'} fullScreen={isMobile} opened={opened} onClose={close} centered>
          <Box className="residential-info-modal">
            <Title className="residential-info-modal-title">Disclaimer</Title>
            <Text className="address">
              {infoDetails?.address_line_1}, {infoDetails?.address_line_2}, {infoDetails?.landmark}, {infoDetails?.city}
              , {infoDetails?.pincode}
            </Text>
            <Box className="residential-info-modal-box">
              <Box className="residential-info-modal-choice-box" onClick={handleGoToVerification}>
                <Box className="residential-info-modal-icon">
                  <AiOutlineHome size={'20px'} />
                </Box>

                <Text className="text">Yes, I will verify myself</Text>
              </Box>
              <Box className="residential-info-modal-choice-box" onClick={handleGoToVerification}>
                <Box className="residential-info-modal-icon">
                  <MdAddLocationAlt size={'20px'} />
                </Box>

                <Text className="text">No, I do not reside here</Text>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}

      <Box className="top-header">
        <Box className="see-all-header">
          <Box className="go-back-btn" onClick={handleToggleResidentialDetails}>
            <BsArrowLeft className="arrow-left-icon" size={'16px'} />
            <Text>Profile</Text>
            <AiOutlineRight className="arrow-right-icon" size={'16px'} />
          </Box>
          <Text onClick={() => setInfoDetails(null)}>{`Residential Information (${residentialInfoData.length})`}</Text>
        </Box>
        {infoDetails !== null && (
          <Button className="green-btn" onClick={open}>
            Get verified
          </Button>
        )}
      </Box>

      {selectedResidentialInfo === null && infoDetails === null && (
        <Box className="residential-info-wrapper">
          {residentialInfoData.map((info, index) => {
            return (
              <Box className="residential-card" key={index} onClick={() => setInfoDetails(info)}>
                <Box className="top-box">
                  <Box className="location">
                    <img className="location=img" src={location} alt="Location" />
                  </Box>
                  <Box className="address-box">
                    <Box className="address">
                      {info.address_line_1}, {info.address_line_2}, {info.landmark}, {info.city} {info.pincode}
                    </Box>
                    {info.isVerified ? (
                      <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified">
                        Verified
                      </Button>
                    ) : (
                      <Button
                        leftIcon={<CgSandClock size={'16px'} />}
                        className="pending"
                        onClick={() => setSelectedResidentialInfo(info)}
                      >
                        Pending
                      </Button>
                    )}
                  </Box>
                </Box>
                <Box>
                  <Text className="since-text">Since</Text>
                  <Text className="tenure">
                    {info.start_date.toString().substring(0, 4)} - {info.end_date.toString().substring(0, 4)}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
      {selectedResidentialInfo === null && infoDetails !== null && (
        <ResidentialInfoDetails
          address_line_1={infoDetails.address_line_1}
          address_line_2={infoDetails.address_line_2}
          landmark={infoDetails.landmark}
          pincode={infoDetails.pincode}
          start_date={infoDetails.start_date}
          end_date={infoDetails.end_date}
          isVerified={infoDetails.isVerified}
          city={infoDetails.city}
          address_type={'Permanant'}
          state={infoDetails.state}
          country={infoDetails.country}
        />
      )}
      {selectedResidentialInfo !== null && infoDetails === null && (
        <VerifyResidentialInfo
          address_line_1={selectedResidentialInfo.address_line_1}
          address_line_2={selectedResidentialInfo.address_line_2}
          landmark={selectedResidentialInfo.landmark}
          pincode={selectedResidentialInfo.pincode}
          start_date={selectedResidentialInfo.start_date}
          end_date={selectedResidentialInfo.end_date}
          isVerified={selectedResidentialInfo.isVerified}
          city={selectedResidentialInfo.city}
          address_type={'Permanant'}
          state={selectedResidentialInfo.state}
          country={selectedResidentialInfo.country}
        />
      )}
    </section>
  );
};
