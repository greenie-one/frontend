import React, { useState, useEffect } from 'react';
import { ActionIcon, Text, Box, Button, Title, Modal, Checkbox } from '@mantine/core';
import { CgSandClock } from 'react-icons/cg';
import { MdVerified, MdDelete } from 'react-icons/md';
import { DeleteConfirmationModal } from '../../../../common/GenericModals';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import { Layout } from '../Layout';
import { ExperienceDetailsModal } from '../../types/ProfileGeneral';
import { skillExpertiseDict } from '../../../constants/dictionaries';
import { docDepotAPIList } from '../../../../../assets/api/ApiList';
import { HttpClient } from '../../../../../utils/generic/httpClient';
import { ExperienceDocuments } from '../../types/ProfileGeneral';
import { showErrorNotification } from '../../../../../utils/functions/showNotification';
import pdfIcon from '../../assets/pdfIcon.png';
import { Link } from 'react-router-dom';
import { UndertakingText } from '../UndertakingText';
import { peerVerificationAPIList } from '../../../../../assets/api/ApiList';
import { peerPost } from '../../../constants/dictionaries';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const formattedDate = (data: string) => {
  return data?.substring(0, 10).split('-').reverse();
};

export const ExperienceDetails: React.FC = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<ExperienceDetailsModal>(null);
  const { deleteWorkExperience, workExperienceData, scrollToTop, skillData, authClient } = useGlobalContext();
  const [checked, setChecked] = useState<boolean>(false);
  const [experienceDocuments, setExperienceDocuments] = useState<ExperienceDocuments[]>([]);
  const [sentRequests, setSentRequests] = useState<Array<SentRequestsResponseType>>([]);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteModalOpened, { open: deleteModalOpen, close: deleteModalClose }] = useDisclosure(false);

  const getExperienceDocument = async () => {
    const res = await HttpClient.callApiAuth<ExperienceDocuments[]>(
      {
        url: `${docDepotAPIList.getAllDocuments}/work`,
        method: 'GET',
      },
      authClient
    );
    if (res.ok) {
      const filtered = res.value.filter((document) => document.workExperience === id);
      setExperienceDocuments(filtered);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  const getSentRequests = async () => {
    const res = await HttpClient.callApiAuth<SentRequestsResponseType[]>(
      {
        url: peerVerificationAPIList.getSentRequest,
        method: 'GET',
      },
      authClient
    );

    if (res.ok) {
      const filteredData = res.value.filter((request) => request.workExperience === id);
      setSentRequests(filteredData);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  useEffect(() => {
    getSentRequests();
  }, [authClient]);

  const handleDeleteWorkInfo = (_id: string): void => {
    deleteWorkExperience(_id);
    deleteModalClose();
    navigate('/candidate/profile');
  };

  const handleOpenModal = (modalType: ExperienceDetailsModal) => {
    if (modalType === 'Show Documents') {
      getExperienceDocument();
      setOpenModal(modalType);
      open();
    } else {
      setOpenModal(modalType);
      open();
    }
  };

  const { id } = useParams();
  const filteredExperience = workExperienceData.find((exp) => exp.id === id);

  const handleAllExperiencesPage = (): void => {
    scrollToTop();
    navigate('/candidate/profile/experience/allExperiences');
  };

  const handleProfilePage = (): void => {
    navigate('/candidate/profile');
  };

  const handleGoToVerification = () => {
    scrollToTop();
    navigate(`/candidate/profile/experience/${id}/verify`);
  };

  const filteredSkillData = skillData.filter((skill) => skill.workExperience === id);

  return (
    <>
      {openModal === 'Verify Experience' && (
        <Modal
          radius={'lg'}
          className="modal"
          size={'60%'}
          fullScreen={isMobile}
          opened={opened}
          onClose={close}
          centered
        >
          <Box className="disclaimer-modal">
            <Title className="disclaimer-heading">Undertaking</Title>
            <Text className="disclaimer-subHeading">Verifying Work experience on Greenie</Text>

            <Box className="checkbox-box">
              <Checkbox checked={checked} onChange={() => setChecked(!checked)} className="checkbox" color="teal" />
              <Text className="terms-conditions">
                I have read the undertaking and i authorise Greenie to collect information on my behalf.
              </Text>
            </Box>
            <UndertakingText />
            <Button className="primaryBtn" disabled={!checked} onClick={handleGoToVerification}>
              I Agree
            </Button>
          </Box>
        </Modal>
      )}
      {openModal === 'Show Skills' && (
        <Modal size={'60%'} title="Skills" fullScreen={isMobile} opened={opened} onClose={close} centered radius={'lg'}>
          <Box className="skills-modal">
            <Box className="add-skills-wrapper">
              {filteredSkillData.length === 0 ? (
                <Text>No skills added</Text>
              ) : (
                <Box className="skill-wrapper">
                  {filteredSkillData.map(({ skillName, expertise }, index) => {
                    return (
                      <Box key={index} className="add-skill-box">
                        <Text className="add-skill-name">{skillName}</Text>
                        <Text className="add-skill-rate">{skillExpertiseDict[expertise]}</Text>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
          </Box>
        </Modal>
      )}
      {openModal === 'Show Documents' && (
        <Modal
          size={'60%'}
          title="Documents"
          fullScreen={isMobile}
          opened={opened}
          onClose={close}
          centered
          radius={'lg'}
        >
          <Box className="skills-modal">
            {experienceDocuments.length === 0 ? (
              <Text>No documents added</Text>
            ) : (
              <Box className="folder-wrapper">
                {experienceDocuments.map(({ name, _id, privateUrl }) => {
                  return (
                    <Link key={_id} className="folder" to={privateUrl} target="_blank">
                      <img src={pdfIcon} alt="PDF Icon" />
                      <Text className="doc-name">{name}</Text>
                    </Link>
                  );
                })}
              </Box>
            )}
          </Box>
        </Modal>
      )}

      <Layout>
        <Box className="container" style={{ marginTop: '7rem' }}>
          <Box className="top-header">
            <Box className="see-all-header">
              <Box className="go-back-btn" onClick={handleProfilePage}>
                <BsArrowLeft className="arrow-left-icon" size={'16px'} />
                <Text>Profile</Text>
                <AiOutlineRight className="arrow-right-icon" size={'16px'} />
              </Box>
              <Text onClick={handleAllExperiencesPage}>{`Work Experience (${workExperienceData.length})`}</Text>
            </Box>
          </Box>
          <Box className="experience-details-screen">
            <Box className="experience-details-wrapper">
              <Box className="experience-details">
                <Box className="experience-details-text-box">
                  <Text className="designation">{filteredExperience?.designation}</Text>
                  <Text className="company-name">{filteredExperience?.companyName}</Text>
                  {filteredExperience?.noOfVerifications >= 2 ? (
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
                  <ActionIcon
                    onClick={(event) => {
                      event.stopPropagation();
                      deleteModalOpen();
                    }}
                  >
                    <MdDelete size={'24px'} color="#697082" />
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
                      title={filteredExperience?.linkedInUrl}
                    >
                      {filteredExperience?.linkedInUrl ? filteredExperience?.linkedInUrl : '-'}
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
                  <Text className="experience-details-box-text">
                    {filteredExperience?.companyId ? filteredExperience?.companyId : '-'}
                  </Text>
                </Box>
                <Box className="comapny-type-box">
                  <Text className="experience-details-box-heading">Work Email</Text>
                  <Text title={filteredExperience?.email} className="experience-details-box-text">
                    {filteredExperience?.email}
                  </Text>
                </Box>
                <Box className="comapny-type-box">
                  <Text className="experience-details-box-heading">Tenure</Text>
                  <Text className="experience-details-box-text">
                    {filteredExperience?.dateOfJoining?.toString().substring(3, 15)} -{' '}
                    {filteredExperience?.dateOfLeaving
                      ? filteredExperience?.dateOfLeaving?.toString().substring(3, 15)
                      : 'Present'}
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
            {sentRequests.length > 0 && (
              <Box className="sent-reuest-box">
                <Title className="experience-details-box-heading referees-heading">Referees</Title>
                <Box className="requests-wrapper">
                  {sentRequests.map((request) => {
                    let date;

                    if (!request.isVerificationCompleted) {
                      date = formattedDate(String(request.createdAt));
                    } else {
                      date = formattedDate(String(request.updatedAt));
                    }

                    return (
                      <Box key={id} className="request-box referees-request-box">
                        <Text className="request-box-heading">
                          {request.name}
                          <br />
                          <small style={{ fontWeight: 500 }}>
                            {request.peerPost ? peerPost[request.peerPost] : '-'}
                          </small>
                        </Text>

                        <Text className="request-box-text">
                          {request.isVerificationCompleted ? 'Verified ' : 'Request sent '} on{' '}
                          <strong style={{ fontWeight: 500 }}>
                            {date[0]} {months[Number(date[1]) - 1]} {date[2]}
                          </strong>
                        </Text>
                        {request.isVerificationCompleted ? (
                          <Box className="request-status">
                            <Box className="request-box-icon">
                              <MdVerified color="#17a672" />
                            </Box>
                            <Text style={{ color: '#17a672' }} className="request-status-text verified-status">
                              Verified
                            </Text>
                          </Box>
                        ) : (
                          <Box className="request-status">
                            <Box className="request-box-icon">
                              <CgSandClock color="#ff7272" />
                            </Box>
                            <Text className="request-status-text pending-status">Pending</Text>
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}

            <Box className="experience-details-links">
              <Text className="details-link" onClick={() => handleOpenModal('Show Documents')}>
                Show Documents
              </Text>
              <Text className="details-link" onClick={() => handleOpenModal('Show Skills')}>
                Show Skills
              </Text>
            </Box>
            <Button
              disabled={filteredExperience?.noOfVerifications >= 2}
              className="green-btn"
              onClick={() => handleOpenModal('Verify Experience')}
            >
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
