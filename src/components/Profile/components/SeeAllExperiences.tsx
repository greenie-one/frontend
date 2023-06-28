import '../styles/global.scss';
import { useProfileContext } from '../context/ProfileContext';
import { Text, Box, Button } from '@mantine/core';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import { useState } from 'react';
import tscLogo from '../assets/tscLogo.png';
import { VerifyWorkExperience } from './VerifyWorkExperience';

interface IWorkExperience {
  _id: string;
  image: string | null;
  designation: string;
  companyName: string;
  email: string;
  companyId: string;
  companyStartDate: string;
  companyEndDate: string;
  workMode: string;
  workType: string;
  isVerified: boolean;
  verifiedBy: [] | null;
  companyType: string;
}

export const SeeAllExperiences = () => {
  const [selectedCard, setSelectedCard] = useState<IWorkExperience | null>(null);

  const { dispatchDetailsPage, detailsPage, workExperienceData } = useProfileContext();

  const handleToggleWorkExperienceDetails = (): void => {
    dispatchDetailsPage({
      type: 'SET_SEE_ALL_WORKEXPERIENCE',
      payload: !detailsPage.seeAllWorkExperience,
    });
  };

  return (
    <section className="container">
      <Box className="see-all-header">
        <Box className="go-back-btn" onClick={handleToggleWorkExperienceDetails}>
          <BsArrowLeft className="arrow-left-icon" size={'16px'} />
          <Text>Profile</Text>
          <AiOutlineRight className="arrow-right-icon" size={'16px'} />
        </Box>
        <Text
          onClick={() => setSelectedCard(null)}
        >{`Work Experience (${workExperienceData.length})`}</Text>
      </Box>
      {selectedCard === null ? (
        <Box className="see-all-experiences-wrapper">
          {workExperienceData.reverse().map((workExperience) => {
            return (
              <Box key={workExperience._id} onClick={() => setSelectedCard(workExperience)}>
                <Box className="experience-card">
                  <img className="companyLogo" src={tscLogo} />
                  <Text className="position">{workExperience.designation}</Text>
                  <Text className="companyName">{workExperience.companyName}</Text>
                  {workExperience.isVerified ? (
                    <Button
                      leftIcon={<MdVerified color="#8CF078" size={'16px'} />}
                      className="verified"
                    >
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
