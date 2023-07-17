import React, { useReducer, useState, useRef, useEffect } from 'react';
import { Title, Text, Box, Button, TextInput, Select, Divider, Checkbox, Modal } from '@mantine/core';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { useForm, isNotEmpty, isEmail, hasLength } from '@mantine/form';
import { MdVerified, MdOutlineDelete } from 'react-icons/md';
import { AiOutlinePlus, AiFillInfoCircle } from 'react-icons/ai';
import { RiAddCircleLine } from 'react-icons/ri';
import { CgSandClock, CgProfile } from 'react-icons/cg';
import tscLogo from '../../assets/tscLogo.png';
import noData from '../../assets/noData.png';
import pdfIcon from '../../assets/pdfIcon.png';
import { useParams, useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import {
  showErrorNotification,
  // showLoadingNotification,
  // showSuccessNotification,
} from '../../../../../utils/functions/showNotification';
import { peerType } from '../../constants/SelectionOptions';
import { Peer } from '../../types/ProfileGeneral';
export enum ReviewActionType {
  NEXT_STEP,
  PREVIOUS_STEP,
  RESET_STEP,
}
// import { peerVerificationAPIList } from '../../../../../assets/api/ApiList';
import { HttpClient, Result } from '../../../../../utils/generic/httpClient';
import { docDepotAPIList, workExperienceAPiList } from '../../../../../assets/api/ApiList';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { ExperienceDocuments } from '../../types/ProfileGeneral';
import { Navbar } from '../Navbar';

const attributes = [
  { send: false, attribute: 'Job title' },
  { send: false, attribute: 'Reporting Manager' },
  { send: false, attribute: 'Work Experience in years' },
  { send: false, attribute: 'Attitude' },
  { send: false, attribute: 'Rehire status' },
  { send: false, attribute: 'Exit formalities' },
];

const expertiseList: {
  [key: string]: string;
} = {
  AMATEUR: 'Amateur',
  BEGINNER: 'Beginner',
  HIGHLY_COMPETENT: 'Highly Competent',
  EXPERT: 'Expert',
  SUPER_SPECIALIST: 'Super Specialist',
  MASTER: 'Master',
};

export const VerifyExperience: React.FC = () => {
  const navigate = useNavigate();
  const [experience, setExperience] = useState<WorkExperience | undefined>({} as WorkExperience);

  const [addedPeers, setAddedPeers] = useState<Peer[]>([]);
  const [activePeer, setActivePeer] = useState<number>(0);
  const [selectionPage, setSelectionPage] = useState<'Document' | 'Skill' | 'Attributes'>('Document');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { authClient, skillData, scrollToTop, workExperienceData } = useGlobalContext();
  const authToken = authClient.getAccessToken();

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const [opened, { open, close }] = useDisclosure(false);
  const [experienceDocuments, setExperienceDocuments] = useState<ExperienceDocuments[]>([]);

  const backgroundStyle = {
    backgroundImage: `url(${tscLogo})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const VerifiationStepReducer = (state: ReviewStepState, action: ReviewStepAction): ReviewStepState => {
    switch (action.type) {
      case ReviewActionType.NEXT_STEP:
        return { currentStep: state.currentStep + 1 };
      case ReviewActionType.PREVIOUS_STEP:
        return { currentStep: state.currentStep - 1 };
      case ReviewActionType.RESET_STEP:
        return { currentStep: 0 };
      default:
        return state;
    }
  };

  const [verifificationStepState, verificationStepDispatch] = useReducer(VerifiationStepReducer, {
    currentStep: 0,
  });

  const { currentStep } = verifificationStepState;

  const peerVerificationForm = useForm<PeerVerificationFormType>({
    initialValues: {
      name: '',
      email: '',
      peerType: '',
      contactNumber: '',
    },

    validate: {
      name: isNotEmpty("Please enter peer's name"),
      email: isEmail('Please enter valid email address'),
      peerType: isNotEmpty('Please select peer type'),
      contactNumber: hasLength(10, 'Please enter valid phone number'),
    },
  });

  const handleProceed = async () => {
    if (addedPeers.length < 2) {
      showErrorNotification('NO_PEERS');
    }
    // if (addedPeers.length > 1) {
    //   for (const peer of addedPeers) {
    //     const requestBody = {
    //       name: peer.name,
    //       email: peer.email,
    //       phone: peer.phone,
    //       peerType: peer.peerType,
    //       workExperience: peer.workExperience,
    //     };
    //     showLoadingNotification({ title: 'Please wait !', message: 'Please wait while we add peers to the list' });
    //     const res: Result<addPeerResponse> = await HttpClient.callApiAuth(
    //       {
    //         url: `${peerVerificationAPIList.createPeer}`,
    //         method: 'POST',
    //         body: requestBody,
    //       },
    //       authClient
    //     );
    //     if (res.ok) {

    //       showSuccessNotification({ title: 'Success !', message: 'Your Peers have been added sucessfully' });
    //     } else {
    //       showErrorNotification(res.error.code);
    //     }
    //   }
    // }
    scrollToTop();
    verificationStepDispatch({ type: ReviewActionType.NEXT_STEP });
  };

  const handleCreatePeer = async () => {
    const newPeer: Peer = {
      name: peerVerificationForm.values.name,
      email: peerVerificationForm.values.email,
      phone: peerVerificationForm.values.contactNumber,
      peerType: peerVerificationForm.values.peerType,
      workExperience: String(experience?.workExpId),
    };
    setAddedPeers((prevPeers) => [...prevPeers, newPeer]);
    peerVerificationForm.reset();
  };

  const handleRemovePeer = (index: number) => {
    if (index < 0 || index >= addedPeers.length) {
      return;
    }
    setAddedPeers((prevPeer) => {
      const newPeer = [...prevPeer];
      newPeer.splice(index, 1);
      return newPeer;
    });
  };

  const handleSeeRequest = () => {
    close();
    scrollToTop();
    navigate('/candidate/profile');
  };

  const getExperienceDocument = async () => {
    const res: Result<ExperienceDocuments[]> = await HttpClient.callApiAuth(
      {
        url: `${docDepotAPIList.getAllDocuments}/work`,
        method: 'GET',
      },
      authClient
    );
    if (res.ok) {
      const filtered = res.value.filter((document) => document.workExperience === experience?.workExpId);
      setExperienceDocuments(filtered);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  const getWorkExperience = async () => {
    const res = await HttpClient.callApiAuth<workExperienceResponse>(
      {
        url: `${workExperienceAPiList.getWorkExperience}`,
        method: 'GET',
      },
      authClient
    );

    if (res.ok) {
      const workExperiences = res.value.workExperinces;
      const filteredExperience = workExperiences.find((exp: WorkExperience) => exp.workExpId === id);

      setExperience(filteredExperience);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  const handleAllExperiencesPage = (): void => {
    navigate('/candidate/profile/experience/allExperiences');
  };

  const { id } = useParams();
  // const filteredExperience = workExperienceData.find((exp: WorkExperience) => exp.workExpId === id);

  useEffect(() => {
    if (authToken) {
      getWorkExperience();
      getExperienceDocument();
    }
  }, []);

  return (
    <>
      <Modal size={isTablet ? '80%' : '60%'} fullScreen={isMobile} opened={opened} onClose={close} centered>
        <Box className="verify-experience-modal">
          <Title className="heading">Your request has been sent</Title>
          <Text className="subHeading">Verifying your work experience</Text>
          <Box className="modal-experience-details">
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
          <Button className="green-btn" onClick={handleSeeRequest}>
            See request
          </Button>
          <Box className="note">
            <AiFillInfoCircle className="info-icon" size={'18px'} />
            <Text className="note-heading">Note</Text>
            <Text className="text">Candidates cannot see this verification process or its results.</Text>
          </Box>
        </Box>
      </Modal>
      <Navbar />
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
          {currentStep === 0 && (
            <Box className="add-peer-box">
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
              <Title className="add-peer-title">Add Peers to verify</Title>
              <Box className="add-peers-inputs">
                <TextInput
                  withAsterisk
                  label="Name"
                  className="inputClass"
                  {...peerVerificationForm.getInputProps('name')}
                />
                <Select
                  withAsterisk
                  label="Peer type"
                  data={peerType}
                  styles={() => ({
                    item: {
                      '&[data-selected]': {
                        '&, &:hover': {
                          backgroundColor: '#17a672',
                          color: 'white',
                        },
                      },
                    },
                  })}
                  className="inputClass"
                  {...peerVerificationForm.getInputProps('peerType')}
                />
                <TextInput
                  withAsterisk
                  label="Official email id"
                  className="inputClass"
                  {...peerVerificationForm.getInputProps('email')}
                />
                <TextInput
                  withAsterisk
                  label="Contact number"
                  className="inputClass"
                  maxLength={10}
                  minLength={10}
                  {...peerVerificationForm.getInputProps('contactNumber')}
                />
              </Box>
              <Button className="add-peer-btn" leftIcon={<AiOutlinePlus size={'18px'} />} onClick={handleCreatePeer}>
                Add Peer
              </Button>
              <Box className="add-peer-header">
                <Text>Peer</Text>
                <Text>Email</Text>
                <Text>Peer Type</Text>
                <Text>Action</Text>
              </Box>
              <Box className="added-peer-box">
                {addedPeers.length > 0 ? (
                  <Box className="add-peers">
                    {addedPeers.reverse().map(({ name, email, peerType }, index) => {
                      return (
                        <Box key={index} className="added-peers">
                          <Text className="peer-name">
                            <CgProfile className="profile-icon" />
                            <span>{name}</span>
                          </Text>
                          <Text className="peer-email">{email}</Text>
                          {peerType === 'LINE_MANAGER' && <Text className="peer-type">Line Manager</Text>}
                          {peerType === 'REPORTING_MANAGER' && <Text className="peer-type">Reporting Manager</Text>}
                          {peerType === 'HR' && <Text className="peer-type">HR</Text>}
                          {peerType === 'COLLEAGUE' && <Text className="peer-type">Colleague</Text>}
                          {peerType === 'CXO' && <Text className="peer-type">CXO</Text>}

                          <Text className="peer-remove" onClick={() => handleRemovePeer(index)}>
                            <MdOutlineDelete size={'20px'} />
                            <span>Remove</span>
                          </Text>
                        </Box>
                      );
                    })}
                  </Box>
                ) : (
                  <Box className="peer-no-data-wrapper">
                    <img src={noData} alt="No data" />
                  </Box>
                )}
              </Box>

              <Button disabled={addedPeers.length < 2} className="primaryBtn" onClick={handleProceed}>
                Proceed
              </Button>
            </Box>
          )}
          {currentStep === 1 && (
            <Box className="see-peers">
              <Box className="see-peers-box">
                <Box className="see-peers-sidebar">
                  <Text className="select-peer-heading">Select Peer</Text>
                  {addedPeers.map(({ name, peerType }, index) => {
                    return (
                      <Box key={index} onClick={() => setActivePeer(index)}>
                        <Box className={activePeer === index ? 'peer active' : 'peer'}>
                          <Box className="border-left"></Box>
                          <Text className="peer-name">{name}</Text>
                          {peerType === 'LINE_MANAGER' && <Text className="peer-type">Line Manager</Text>}
                          {peerType === 'REPORTING_MANAGER' && <Text className="peer-type">Reporting Manager</Text>}
                          {peerType === 'HR' && <Text className="peer-type">HR</Text>}
                          {peerType === 'COLLEAGUE' && <Text className="peer-type">Colleague</Text>}
                          {peerType === 'CXO' && <Text className="peer-type">CXO</Text>}
                        </Box>
                        {addedPeers.length - 1 !== index && <Divider color="#ebebeb" />}
                      </Box>
                    );
                  })}
                </Box>

                {activePeer === null ? (
                  <Box className="see-peers-main-box">
                    <img src={noData} alt="No data" />
                  </Box>
                ) : (
                  <Box className="see-peers-select-doc-skills">
                    <Box className="doc-skill-selector">
                      <Box
                        onClick={() => setSelectionPage('Document')}
                        className={selectionPage === 'Document' ? 'selector active' : 'selector'}
                      >
                        Document
                      </Box>
                      {/* --- Check Here --- */}
                      <Box
                        onClick={() => setSelectionPage('Skill')}
                        className={selectionPage === 'Skill' ? 'selector active' : 'selector'}
                      >
                        Skill
                      </Box>
                      <Box
                        onClick={() => setSelectionPage('Attributes')}
                        className={selectionPage === 'Attributes' ? 'selector active' : 'selector'}
                      >
                        Attributes
                      </Box>
                    </Box>
                    {selectionPage === 'Document' && (
                      <Box className="documents-action-section">
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
                        <Box className="documents-action-nav">
                          <Box className="document-action-heading-box">
                            <Text className="document-action-heading">Documents</Text>
                            <Text className="document-action-sub-heading">
                              Select the documents you want the peer to review
                            </Text>
                          </Box>

                          <Box className="document-action-selector">
                            <Button
                              leftIcon={<AiOutlinePlus />}
                              className="document-action"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              Add files
                            </Button>
                          </Box>
                        </Box>
                        <Box className="selected-documents">
                          {experienceDocuments.map(({ name, _id }) => {
                            return (
                              <Box className="document" key={_id}>
                                <img className="pdf-icon" src={pdfIcon} alt="pdf icon" />
                                <Text className="document-name">{name.substring(0, 15)}...</Text>
                              </Box>
                            );
                          })}
                        </Box>
                      </Box>
                    )}
                    {selectionPage === 'Skill' && (
                      <Box className="documents-action-section">
                        <Box className="documents-action-nav">
                          <Box className="document-action-heading-box">
                            <Text className="document-action-heading">Skills</Text>
                            <Text className="document-action-sub-heading">
                              Select the skill you want the peer to review
                            </Text>
                          </Box>
                        </Box>
                        <Box>
                          <Box className="selected-attribute-header">
                            <Checkbox checked indeterminate readOnly />
                            <Text>Select Skills To Verify</Text>
                          </Box>

                          <Box className="selected-skills">
                            {skillData
                              .filter((skill) => skill.workExperience === experience?.workExpId)
                              .map((skill, idx) => {
                                return (
                                  <Box key={idx}>
                                    <Box className="selected-skill">
                                      <Checkbox />
                                      <Text>{skill.skillName}</Text>
                                      {skill.expertise && (
                                        <Text className="add-skill-rate">{expertiseList[skill.expertise]}</Text>
                                      )}
                                    </Box>
                                  </Box>
                                );
                              })}
                          </Box>
                        </Box>
                      </Box>
                    )}
                    {selectionPage === 'Attributes' && (
                      <Box className="documents-action-section">
                        <Box className="documents-action-nav">
                          <Box className="document-action-heading-box">
                            <Text className="document-action-heading">Attributes</Text>
                            <Text className="document-action-sub-heading">
                              Select the attributes you want the peer to review
                            </Text>
                          </Box>
                        </Box>

                        <Box>
                          <Box className="selected-attribute-header">
                            <Checkbox checked indeterminate readOnly />
                            <Text>Name</Text>
                          </Box>
                          <Box className="selected-attributes">
                            {attributes.map(({ attribute }, index) => {
                              return (
                                <Box key={index}>
                                  <Box className="selected-attribute">
                                    <Checkbox />
                                    <Text>{attribute}</Text>
                                  </Box>
                                  {attributes.length - 1 !== index && <Divider color="#ebebeb" />}
                                </Box>
                              );
                            })}
                          </Box>
                          <Box className="action-btn">
                            <RiAddCircleLine className="action-icon" />
                            <Text className="action-text">Add more</Text>
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
              <Box className="see-peers-btn-wrapper">
                <Button
                  className="green-btn"
                  onClick={() => verificationStepDispatch({ type: ReviewActionType.NEXT_STEP })}
                >
                  Confirm and send request
                </Button>
                <Button
                  className="cancel-btn"
                  onClick={() => verificationStepDispatch({ type: ReviewActionType.PREVIOUS_STEP })}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
          {currentStep === 2 && (
            <Box className="confirm-request-box">
              <Box className="document-action-heading-box">
                <Text className="document-action-heading">Confirm your work experience</Text>
                <Text className="document-action-sub-heading">
                  The following skills are part of your work experience
                </Text>
              </Box>

              <Box className="peers-list">
                <Text className="document-action-heading">Requesting</Text>
                <Box className="requesting-peers">
                  {addedPeers.map(({ name, peerType }, index) => {
                    return (
                      <Box key={index} className="requesting-peer">
                        <Box className="profile-picture"></Box>
                        <Box className="requesting-peer-text-box">
                          <Text className="name">{name}</Text>
                          {peerType === 'LINE_MANAGER' && <Text className="peer-type">Line Manager</Text>}
                          {peerType === 'REPORTING_MANAGER' && <Text className="peer-type">Reporting Manager</Text>}
                          {peerType === 'HR' && <Text className="peer-type">HR</Text>}
                          {peerType === 'COLLEAGUE' && <Text className="peer-type">Colleague</Text>}
                          {peerType === 'CXO' && <Text className="peer-type">CXO</Text>}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              <Box className="details-box">
                <Text className="document-action-heading">To verify</Text>
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
              </Box>
              <Box className="document-list">
                <Text className="document-action-heading">With Documents</Text>
                <Box>
                  {addedPeers.map((peer, index) => {
                    return (
                      <Box key={index} className="docs-wrapper">
                        {experienceDocuments.map((document, index) => {
                          return (
                            <Box className="document" key={index}>
                              <img className="pdf-icon" src={pdfIcon} alt="pdf icon" />
                              <Text className="document-name">{document.name.substring(0, 15)}...</Text>
                            </Box>
                          );
                        })}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              <Box className="skills-list">
                <Text className="document-action-heading">Skills</Text>
                <Box className="add-skills-wrapper">
                  {skillData
                    .filter((skill) => skill.workExperience === experience?.workExpId)
                    .map((skill: Skill, index: number) => {
                      const { expertise, skillName } = skill;
                      return (
                        <Box key={index} className="add-skill-box">
                          <Text className="add-skill-name">{skillName}</Text>
                          {expertise && <Text className="add-skill-rate">{expertiseList[expertise]}</Text>}
                        </Box>
                      );
                    })}
                </Box>
              </Box>

              <Box className="see-peers-btn-wrapper">
                <Button className="green-btn" onClick={open}>
                  Confirm and send request
                </Button>
                <Button
                  className="cancel-btn"
                  onClick={() => verificationStepDispatch({ type: ReviewActionType.PREVIOUS_STEP })}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </main>
    </>
  );
};
