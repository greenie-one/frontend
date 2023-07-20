import React, { useState } from 'react';
import { ActionIcon, Text, Box, Button, Title, Modal, Checkbox } from '@mantine/core';
import tcsLogo from '../../assets/tscLogo.png';
import { CgSandClock } from 'react-icons/cg';
import { MdVerified } from 'react-icons/md';
import { BiEditAlt } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { DeleteConfirmationModal } from '../../../../common/GenericModals';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import { Layout } from '../Layout';

export const ExperienceDetails: React.FC = () => {
  const navigate = useNavigate();
  const backgroundStyle = {
    backgroundImage: `url(${tcsLogo})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const { deleteWorkExperience, workExperienceData, scrollToTop } = useGlobalContext();

  const [checked, setChecked] = useState<boolean>(false);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);

  const [deleteModalOpened, { open: deleteModalOpen, close: deleteModalClose }] = useDisclosure(false);

  const handleDeleteWorkInfo = (_id: string): void => {
    deleteWorkExperience(_id);
    deleteModalClose();
    navigate('/candidate/profile');
  };

  const { id } = useParams();
  const filteredExperience = workExperienceData.find((exp) => exp.id === id);

  const handleAllExperiencesPage = (): void => {
    scrollToTop();
    navigate('/candidate/profile/experience/allExperiences');
  };

  const handleGoToVerification = () => {
    scrollToTop();
    navigate(`/candidate/profile/experience/${id}/verify`);
  };

  return (
    <>
      <Modal className="modal" size={'60%'} fullScreen={isMobile} opened={opened} onClose={close} centered>
        <Box className="disclaimer-modal">
          <Title className="disclaimer-heading">Undertaking</Title>
          <Text className="disclaimer-subHeading">Verifying Work experience on Greenie</Text>

          <Box className="checkbox-box">
            <Checkbox checked={checked} onChange={() => setChecked(!checked)} className="checkbox" color="teal" />
            <Text className="tearms-conditions">
              I have read the undertaking and i authorise Greenie to collect information on my behalf.
            </Text>
          </Box>
          <Text className="policy">Click to view the Undertaking, Data and Privacy policy</Text>
          <Button className="primaryBtn" disabled={!checked} onClick={handleGoToVerification}>
            I Agree
          </Button>
        </Box>
      </Modal>
      <Layout>
        <Box className="container" style={{ marginTop: '7rem' }}>
          <Box className="top-header">
            <Box className="see-all-header">
              <Box className="go-back-btn" onClick={handleAllExperiencesPage}>
                <BsArrowLeft className="arrow-left-icon" size={'16px'} />
                <Text>Profile</Text>
                <AiOutlineRight className="arrow-right-icon" size={'16px'} />
              </Box>
              <Text>{`Work Experience (${workExperienceData.length})`}</Text>
            </Box>
          </Box>
          <Box className="experience-details-screen">
            <Box className="experience-details-wrapper">
              <Box className="experience-details">
                <Box className="company-logo" style={backgroundStyle}>
                  <MdVerified className="verified-icon" color="#17a672" size="22px" />
                </Box>

                <Box className="experience-details-text-box">
                  <Text className="designation">{filteredExperience?.designation}</Text>
                  <Text className="company-name">{filteredExperience?.companyName}</Text>
                  {filteredExperience?.isVerified ? (
                    <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified">
                      Verified
                    </Button>
                  ) : (
                    <Button leftIcon={<CgSandClock size={'16px'} />} className="pending">
                      Pending
                    </Button>
                  )}
                </Box>
              </Box>
              <Box className="actions-icons">
                <Box className="action-icon">
                  <BiEditAlt />
                </Box>
                <Box className="action-icon">
                  <ActionIcon
                    onClick={(event) => {
                      event.stopPropagation();
                      deleteModalOpen();
                    }}
                  >
                    <AiOutlineDelete />
                  </ActionIcon>
                </Box>
              </Box>
            </Box>
            <Box className="about-company">
              <Title className="experience-details-box-heading">About Company</Title>
              <Box className="about-company-box-wrapper">
                <Box className="comapny-type-box">
                  <Text className="experience-details-box-heading">Company Type</Text>
                  <Text className="experience-details-box-text">{filteredExperience?.companyType}</Text>
                </Box>
                <Box className="comapny-type-box">
                  <Text className="experience-details-box-heading">Linked In</Text>
                  {filteredExperience?.linkedInUrl ? (
                    <a
                      href={filteredExperience?.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="details-link"
                    >
                      {filteredExperience?.companyName}
                    </a>
                  ) : (
                    '-'
                  )}
                </Box>
              </Box>
            </Box>
            <Box className="basic-info">
              <Title className="experience-details-box-heading">Basic Information</Title>
              <Box className="basic-info-box-wrapper">
                <Box className="comapny-type-box">
                  <Text className="experience-details-box-heading">Company ID</Text>
                  <Text className="experience-details-box-text">{filteredExperience?.companyId}</Text>
                </Box>
                <Box className="comapny-type-box">
                  <Text className="experience-details-box-heading">Work Email</Text>
                  <Text className="experience-details-box-text">{filteredExperience?.email}</Text>
                </Box>
                <Box className="comapny-type-box">
                  <Text className="experience-details-box-heading">Tenure</Text>
                  <Text className="experience-details-box-text">
                    {filteredExperience?.dateOfJoining?.toString().substring(11, 15)}-
                    {filteredExperience?.companyEndDate?.toString().substring(11, 15)}
                  </Text>
                </Box>
                <Box className="comapny-type-box">
                  <Text className="experience-details-box-heading">Work Type</Text>
                  <Text className="experience-details-box-text">
                    {filteredExperience?.workType} - {filteredExperience?.workMode}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box className="experience-details-links">
              <Text className="details-link">Show Documents</Text>
              <Text className="details-link">Show Skills</Text>
            </Box>
            <Button className="green-btn" onClick={open}>
              Get Verified
            </Button>
          </Box>

          <DeleteConfirmationModal
            opened={deleteModalOpened}
            close={deleteModalClose}
            cb={() => handleDeleteWorkInfo(filteredExperience?.id)}
          />
        </Box>
      </Layout>
    </>
  );
};
