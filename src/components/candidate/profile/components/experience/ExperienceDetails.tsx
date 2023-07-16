import React from 'react';
import { ActionIcon, Text, Box, Button, Title } from '@mantine/core';
import tcsLogo from '../../assets/tscLogo.png';
import { CgSandClock } from 'react-icons/cg';
import { MdVerified } from 'react-icons/md';
import { BiEditAlt } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { useProfileContext } from '../../context/ProfileContext';
import { DeleteConfirmationModal } from '../../../../common/GenericModals';
import { useDisclosure } from '@mantine/hooks';

export const ExperienceDetails: React.FC<WorkExperience> = ({
  workExpId,
  designation,
  companyName,
  companyId,
  companyType,
  companyStartDate,
  companyEndDate,
  workMode,
  workType,
  email,
  isVerified,
}) => {
  const backgroundStyle = {
    backgroundImage: `url(${tcsLogo})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const { deleteWorkExperience, setCandidateActivePage } = useProfileContext();
  const [deleteModalOpened, { open: deleteModalOpen, close: deleteModalClose }] = useDisclosure(false);

  const handleDeleteWorkInfo = (_id: string): void => {
    deleteWorkExperience(_id);
    deleteModalClose();
    setCandidateActivePage('Profile');
  };

  return (
    <>
      <Box className="experience-details-screen">
        <Box className="experience-details-wrapper">
          <Box className="experience-details">
            <Box className="company-logo" style={backgroundStyle}>
              <MdVerified className="verified-icon" color="#17a672" size="22px" />
            </Box>

            <Box className="experience-details-text-box">
              <Text className="designation">{designation}</Text>
              <Text className="company-name">{companyName}</Text>
              {isVerified ? (
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
              <Text className="experience-details-box-text">{companyType}</Text>
            </Box>
            <Box className="comapny-type-box">
              <Text className="experience-details-box-heading">Linked In</Text>
              <Text className="details-link">{companyName}</Text>
            </Box>
          </Box>
        </Box>
        <Box className="basic-info">
          <Title className="experience-details-box-heading">Basic Information</Title>
          <Box className="basic-info-box-wrapper">
            <Box className="comapny-type-box">
              <Text className="experience-details-box-heading">Company ID</Text>
              <Text className="experience-details-box-text">{companyId}</Text>
            </Box>
            <Box className="comapny-type-box">
              <Text className="experience-details-box-heading">Work Email</Text>
              <Text className="experience-details-box-text">{email}</Text>
            </Box>
            <Box className="comapny-type-box">
              <Text className="experience-details-box-heading">Tenure</Text>
              <Text className="experience-details-box-text">
                {companyStartDate?.toString().substring(0, 4)}-{companyEndDate?.toString().substring(0, 4)}
              </Text>
            </Box>
            <Box className="comapny-type-box">
              <Text className="experience-details-box-heading">Work Type</Text>
              <Text className="experience-details-box-text">
                {workType} - {workMode}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box className="experience-details-links">
          <Text className="details-link">Show Documents</Text>
          <Text className="details-link">Show Skills</Text>
        </Box>
      </Box>
      <DeleteConfirmationModal
        opened={deleteModalOpened}
        close={deleteModalClose}
        cb={() => handleDeleteWorkInfo(workExpId)}
      />
    </>
  );
};
