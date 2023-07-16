import React, { useReducer, useState, useRef } from 'react';
import { Title, Text, Box, Button, TextInput, Select, Divider, Checkbox, Modal } from '@mantine/core';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { useForm, isNotEmpty, isEmail, hasLength } from '@mantine/form';
import { MdVerified, MdOutlineDelete } from 'react-icons/md';
import { AiOutlinePlus, AiFillInfoCircle } from 'react-icons/ai';
import { RiAddCircleLine } from 'react-icons/ri';
import { CgSandClock, CgProfile } from 'react-icons/cg';
import tscLogo from '../../assets/tscLogo.png';
import noData from '../../assets/noData.png';
import { useProfileContext } from '../../context/ProfileContext';
// import pdfIcon from '../../assets/pdfIcon.png';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../../utils/functions/showNotification';
import { peerType } from '../../constants/SelectionOptions';
import { Peer, WorkExperienceVerification } from '../../types/ProfileGeneral';
export enum ReviewActionType {
  NEXT_STEP,
  PREVIOUS_STEP,
  RESET_STEP,
}
import { peerVerificationAPIList } from '../../../../../assets/api/ApiList';
import { HttpClient, Result } from '../../../../../utils/generic/httpClient';
import { useGlobalContext } from '../../../../../context/GlobalContext';

const attributes = [
  { send: false, attribute: 'Job title' },
  { send: false, attribute: 'Reporting Manager' },
  { send: false, attribute: 'Work Experience in years' },
  { send: false, attribute: 'Attitude' },
  { send: false, attribute: 'Rehire status' },
  { send: false, attribute: 'Exit formalities' },
];

export const VerifyExperience: React.FC<WorkExperienceVerification> = ({
  workExpId,
  designation,
  companyName,
  isVerified,
}) => {
  const [addedPeers, setAddedPeers] = useState<Peer[]>([]);
  const [activePeer, setActivePeer] = useState<number>(0);
  const [selectionPage, setSelectionPage] = useState<'Document' | 'Skill' | 'Attributes'>('Document');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { authClient } = useGlobalContext();

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const [opened, { open, close }] = useDisclosure(false);

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

  const { setCandidateActivePage, skillData, setSelectedExperience, scrollToTop, selectedSkills, setSelectedSkills } =
    useProfileContext();

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

  const handleCreatePeer = async () => {
    if (
      !peerVerificationForm.validateField('name').hasError &&
      !peerVerificationForm.validateField('email').hasError &&
      !peerVerificationForm.validateField('peerType').hasError &&
      !peerVerificationForm.validateField('contactNumber').hasError
    ) {
      const requestBody = {
        name: peerVerificationForm.values.name,
        email: peerVerificationForm.values.email,
        phone: peerVerificationForm.values.contactNumber,
        peerType: peerVerificationForm.values.peerType,
        workExperience: workExpId,
      };
      showLoadingNotification({ title: 'Please wait !', message: 'Please wait while we add peer to the list' });
      const res: Result<addPeerResponse> = await HttpClient.callApiAuth(
        {
          url: `${peerVerificationAPIList.createPeer}`,
          method: 'POST',
          body: requestBody,
        },
        authClient
      );
      if (res.ok) {
        showSuccessNotification({ title: 'Success !', message: 'Peer added succesfully' });
        const newPeer: Peer = res.value;
        setAddedPeers((prevPeers) => [...prevPeers, newPeer]);
        peerVerificationForm.values.name = '';
        peerVerificationForm.values.contactNumber = '';
        peerVerificationForm.values.email = '';
        peerVerificationForm.values.peerType = '';
      } else {
        showErrorNotification(res.error.code);
      }
    }
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

  const handleProceed = () => {
    showLoadingNotification({ title: 'Please wait !', message: 'We are adding your peers' });
    if (addedPeers.length < 2) {
      showErrorNotification('NO_PEERS');
    }
    if (addedPeers.length >= 2) {
      scrollToTop();
      verificationStepDispatch({ type: ReviewActionType.NEXT_STEP });
      showSuccessNotification({ title: 'Success !', message: 'Your Peers have been added sucessfully' });
    }
  };

  const handleSeeRequest = () => {
    setSelectedExperience(null);
    setCandidateActivePage('Profile');
    close();
    scrollToTop();
    setSelectedSkills([]);
  };

  // const getPeer = async () => {
  //   const res = await HttpClient.callApiAuth(
  //     { url: `${peerVerificationAPIList.getSinglePeer}/64b0cecd27491902aaa1c1d5`, method: 'GET' },
  //     authClient
  //   );
  //   if (res.ok) {
  //     console.log(res.value);
  //   } else {
  //     console.log(res.error.message);
  //   }
  // };

  // const handleUploadDocument = () => {};

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
      {currentStep === 0 && (
        <Box className="add-peer-box">
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
                {addedPeers.reverse().map(({ name, email, peerType, _id }, index) => {
                  return (
                    <Box key={_id} className="added-peers">
                      <Text className="peer-name">
                        <CgProfile className="profile-icon" />
                        <span>{name}</span>
                      </Text>
                      <Text className="peer-email">{email}</Text>

                      <Text className="peer-type">{peerType}</Text>
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
                      <Text className="peer-type">{peerType}</Text>
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
                      {/* {addedPeers[activePeer].map((peer: Peer, index: number) => {
                        return (
                          <Box className="document" key={index}>
                            <img className="pdf-icon" src={pdfIcon} alt="pdf icon" />
                            <Text className="document-name">{peer.name.substring(0, 15)}...</Text>
                          </Box>
                        );
                      })} */}
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
                          .filter((skill) => skill.workExperience === workExpId)
                          .map((skill, idx) => {
                            return (
                              <Box key={idx}>
                                <Box className="selected-skill">
                                  <Checkbox />
                                  <Text>{skill.skillName}</Text>
                                  <Text>{skill.expertise}</Text>
                                </Box>
                                {/* {addedPeers[activePeer].skills.length - 1 !== index && <Divider color="#ebebeb" />} */}
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
                        <Text className="document-action-heading">Skills</Text>
                        <Text className="document-action-sub-heading">
                          Select the skill you want the peer to review
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
            <Button className="cancel-btn">Cancel</Button>
          </Box>
        </Box>
      )}
      {currentStep === 2 && (
        <Box className="confirm-request-box">
          <Box className="document-action-heading-box">
            <Text className="document-action-heading">Confirm your work experience</Text>
            <Text className="document-action-sub-heading">The following skills are part of your work experience</Text>
          </Box>

          <Box className="peers-list">
            <Text className="document-action-heading">Requesting</Text>
            <Box className="requesting-peers">
              {addedPeers.map((peer, index) => {
                return (
                  <Box key={index} className="requesting-peer">
                    <Box className="profile-picture"></Box>
                    <Box className="requesting-peer-text-box">
                      <Text className="name">{peer.name}</Text> <Text className="designation">{peer.peerType}</Text>{' '}
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
          </Box>
          <Box className="document-list">
            <Text className="document-action-heading">With Documents</Text>
            <Box>
              {addedPeers.map((peer, index) => {
                return (
                  <Box key={index} className="docs-wrapper">
                    {/* {peer.documents.map((document, index) => {
                      return (
                        <Box className="document" key={index}>
                          <img className="pdf-icon" src={pdfIcon} alt="pdf icon" />
                          <Text className="document-name">{document.name.substring(0, 15)}...</Text>
                        </Box>
                      );
                    })} */}
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box className="skills-list">
            <Text className="document-action-heading">Skills</Text>
            <Box className="add-skills-wrapper">
              {selectedSkills.map((skill: Skill, index: number) => {
                const { expertise, skillName } = skill;
                return (
                  <Box key={index} className="add-skill-box">
                    <Text className="add-skill-name">{skillName}</Text>
                    {expertise === 'AMATEUR' && <Text className="add-skill-rate">Amature</Text>}
                    {expertise === 'BEGINNER' && <Text className="add-skill-rate">Beginner</Text>}
                    {expertise === 'HIGHLY_COMPETENT' && <Text className="add-skill-rate">Highly Competent</Text>}
                    {expertise === 'EXPERT' && <Text className="add-skill-rate">Expert</Text>}
                    {expertise === 'SUPER_SPECIALIST' && <Text className="add-skill-rate">Super Specialist</Text>}
                    {expertise === 'MASTER' && <Text className="add-skill-rate">Master</Text>}
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Box className="see-peers-btn-wrapper">
            <Button className="green-btn" onClick={open}>
              Confirm and send request
            </Button>
            <Button className="cancel-btn" onClick={() => setSelectedExperience(null)}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};
