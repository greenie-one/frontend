import React, { useEffect, useState } from 'react';
import { ActionIcon, Text, Box, Button, Title, Modal, Checkbox } from '@mantine/core';
import tcsLogo from '../../assets/tscLogo.png';
import { CgSandClock } from 'react-icons/cg';
import { MdVerified } from 'react-icons/md';
import { BiEditAlt } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { DeleteConfirmationModal } from '../../../../common/GenericModals';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';

export const ExperienceDetails: React.FC = () => {
  const navigate = useNavigate();
  const backgroundStyle = {
    backgroundImage: `url(${tcsLogo})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
  const { deleteWorkExperience, workExperienceData } = useGlobalContext();
  const [experience, setExperience] = useState<WorkExperience>({
    workExpId: '',
    department: '',
    image: null,
    designation: '',
    companyName: '',
    email: '',
    companyId: '',
    companyStartDate: '',
    companyEndDate: '',
    workMode: '',
    workType: '',
    isVerified: false,
    verifiedBy: null,
    companyType: '',
  });

  const [checked, setChecked] = useState<boolean>(false);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);

  const [deleteModalOpened, { open: deleteModalOpen, close: deleteModalClose }] = useDisclosure(false);

  const handleDeleteWorkInfo = (_id: string): void => {
    deleteWorkExperience(_id);
    deleteModalClose();
  };

  const { id } = useParams();
  const filteredExperience = workExperienceData.find((exp) => exp.workExpId === id);

  const handleAllExperiencesPage = (): void => {
    navigate('/candidate/profile/experience/allExperiences');
  };

  const handleGoToVerification = () => {
    navigate(`/candidate/profile/experience/${id}/verify`);
  };

  useEffect(() => {
    setExperience(filteredExperience);
  }, []);

  return (
    <>
      <Navbar />
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
      <main className="profile">
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
                  <Text className="designation">{experience?.designation}</Text>
                  <Text className="company-name">{experience?.companyName}</Text>
                  {experience?.isVerified ? (
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
                  <Text className="experience-details-box-text">{experience?.companyType}</Text>
                </Box>
                <Box className="comapny-type-box">
                  <Text className="experience-details-box-heading">Linked In</Text>
                  <Text className="details-link">{experience?.companyName}</Text>
                </Box>
              </Box>
            </Box>
            <Box className="basic-info">
              <Title className="experience-details-box-heading">Basic Information</Title>
              <Box className="basic-info-box-wrapper">
                <Box className="comapny-type-box">
                  <Text className="experience-details-box-heading">Company ID</Text>
                  <Text className="experience-details-box-text">{experience?.companyId}</Text>
                </Box>
                <Box className="comapny-type-box">
                  <Text className="experience-details-box-heading">Work Email</Text>
                  <Text className="experience-details-box-text">{experience?.email}</Text>
                </Box>
                <Box className="comapny-type-box">
                  <Text className="experience-details-box-heading">Tenure</Text>
                  <Text className="experience-details-box-text">
                    {experience?.companyStartDate?.toString().substring(0, 4)}-
                    {experience?.companyEndDate?.toString().substring(0, 4)}
                  </Text>
                </Box>
                <Box className="comapny-type-box">
                  <Text className="experience-details-box-heading">Work Type</Text>
                  <Text className="experience-details-box-text">
                    {experience?.workType} - {experience?.workMode}
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
            cb={() => handleDeleteWorkInfo(experience?.workExpId)}
          />
        </Box>
      </main>
    </>
  );
};
