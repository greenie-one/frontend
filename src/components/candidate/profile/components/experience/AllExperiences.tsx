import { useProfileContext } from '../../context/ProfileContext';
import { Text, Box, Button, Modal, Title, Checkbox } from '@mantine/core';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import tscLogo from '../../assets/tscLogo.png';
import { VerifyExperience } from './VerifyExperience';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { ExperienceDetails } from './ExperienceDetails';

import { IWorkExperienceResponse } from '../../types/CandidateResponses';

export const AllExperiences = () => {
  const { workExperienceData, selectedCard, setSelectedCard, setCandidateActivePage } = useProfileContext();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [experienceDetails, setExperienceDetails] = useState<IWorkExperienceResponse | null>(null);
  const handleToggleWorkExperienceDetails = (): void => {
    setCandidateActivePage('Profile');
  };

  const handleGoToVerification = () => {
    setSelectedCard(experienceDetails);
    setExperienceDetails(null);
    setChecked(!checked);
    close();
  };

  const handleAllExperience = () => {
    setExperienceDetails(null);
    setSelectedCard(null);
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
      <Box className="top-header">
        <Box className="see-all-header">
          <Box className="go-back-btn" onClick={handleToggleWorkExperienceDetails}>
            <BsArrowLeft className="arrow-left-icon" size={'16px'} />
            <Text>Profile</Text>
            <AiOutlineRight className="arrow-right-icon" size={'16px'} />
          </Box>
          <Text onClick={handleAllExperience}>{`Work Experience (${workExperienceData.length})`}</Text>
          {experienceDetails !== null && (
            <Box className="go-back-btn">
              <AiOutlineRight className="arrow-right-icon" size={'16px'} />
              <Text>{experienceDetails.companyName}</Text>
            </Box>
          )}
        </Box>
        {experienceDetails !== null && (
          <Button className="green-btn" onClick={open}>
            Get verified
          </Button>
        )}
      </Box>
      {experienceDetails === null && selectedCard === null && (
        <Box className="see-all-experiences-wrapper">
          {workExperienceData.reverse().map((workExperience) => {
            return (
              <Box key={workExperience._id} onClick={() => setExperienceDetails(workExperience)}>
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
      )}
      {experienceDetails !== null && selectedCard === null && (
        <ExperienceDetails
          _id={experienceDetails._id}
          verifiedBy={experienceDetails.verifiedBy}
          image={experienceDetails.image}
          designation={experienceDetails.designation}
          companyName={experienceDetails.companyName}
          companyId={experienceDetails.companyId}
          companyType={experienceDetails.companyType}
          companyStartDate={experienceDetails.companyStartDate}
          companyEndDate={experienceDetails.companyEndDate}
          workMode={experienceDetails.workMode}
          workType={experienceDetails.workType}
          email={experienceDetails.email}
          isVerified={experienceDetails.isVerified}
        />
      )}
      {selectedCard !== null && experienceDetails === null && (
        <VerifyExperience
          _id={selectedCard._id}
          image={selectedCard.image}
          companyName={selectedCard.companyName}
          designation={selectedCard.designation}
          isVerified={selectedCard.isVerified}
        />
      )}
    </section>
  );
};
