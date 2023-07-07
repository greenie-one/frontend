import '../styles/global.scss';
import { useProfileContext } from '../context/ProfileContext';
import { Text, Box, Button, Modal, Title, Checkbox } from '@mantine/core';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import tscLogo from '../assets/tscLogo.png';
import { VerifyWorkExperience } from './VerifyWorkExperience';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { IWorkExperience } from '../types/APICalls';

export const SeeAllExperiences = () => {
  const { dispatchDetailsPage, detailsPage, workExperienceData, selectedCard, setSelectedCard } = useProfileContext();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [selectedExperience, setSelectedExperience] = useState<IWorkExperience | null>(null);

  const handleToggleWorkExperienceDetails = (): void => {
    dispatchDetailsPage({
      type: 'SET_SEE_ALL_WORKEXPERIENCE',
      payload: !detailsPage.seeAllWorkExperience,
    });
  };

  const handleOpenModal = (workExperience: IWorkExperience) => {
    open();
    setSelectedExperience(workExperience);
  };

  const handleGoToVerification = () => {
    if (selectedExperience !== null) {
      setSelectedCard(selectedExperience);
      setChecked(!checked);
      close();
    }
  };

  return (
    <section className="container">
      <Modal className="modal" size={'60%'} fullScreen={isMobile} opened={opened} onClose={close} centered>
        <Box className="disclaimer-modal">
          <Title className="disclaimer-heading">Disclaimer</Title>
          <Text className="disclaimer-subHeading">Verifying IDs on Greenie</Text>
          <Button className="primaryBtn" disabled={!checked} onClick={handleGoToVerification}>
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
      <Box className="see-all-header">
        <Box className="go-back-btn" onClick={handleToggleWorkExperienceDetails}>
          <BsArrowLeft className="arrow-left-icon" size={'16px'} />
          <Text>Profile</Text>
          <AiOutlineRight className="arrow-right-icon" size={'16px'} />
        </Box>
        <Text onClick={() => setSelectedCard(null)}>{`Work Experience (${workExperienceData.length})`}</Text>
      </Box>
      {selectedCard === null ? (
        <Box className="see-all-experiences-wrapper">
          {workExperienceData.reverse().map((workExperience) => {
            return (
              <Box key={workExperience._id} onClick={() => handleOpenModal(workExperience)}>
                <Box className="experience-card">
                  <img className="companyLogo" src={tscLogo} />
                  <Text className="position">{workExperience.designation}</Text>
                  <Text className="companyName">{workExperience.companyName}</Text>
                  {workExperience.isVerified ? (
                    <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified">
                      Verified
                    </Button>
                  ) : (
                    <Button leftIcon={<CgSandClock size={'16px'} />} className="pending">
                      Pending
                    </Button>
                  )}

                  <Box className="tenure-box">
                    <Text className="since-text">Since</Text>
                    <Text className="tenure">
                      {workExperience.companyStartDate?.toString().substring(0, 4)}-
                      {workExperience.companyEndDate?.toString().substring(0, 4)}
                    </Text>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      ) : (
        <Box>
          <VerifyWorkExperience
            _id={selectedCard._id}
            image={selectedCard.image}
            companyName={selectedCard.companyName}
            designation={selectedCard.designation}
            isVerified={selectedCard.isVerified}
          />
        </Box>
      )}
    </section>
  );
};
