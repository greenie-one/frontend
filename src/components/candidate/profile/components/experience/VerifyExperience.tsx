import React, { useReducer, useState, useEffect } from 'react';
import { Title, Text, Box, Button, TextInput, Select, Divider } from '@mantine/core';
import { useForm, isNotEmpty, isEmail, hasLength } from '@mantine/form';
import { MdVerified, MdOutlineDelete } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { CgSandClock, CgProfile } from 'react-icons/cg';
import noData from '../../assets/noData.png';
import { useParams, useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import { showErrorNotification } from '../../../../../utils/functions/showNotification';
import { peerType } from '../../constants/SelectionOptions';
import { CreatePeerResponseType, Peer } from '../../types/ProfileGeneral';
import { PeerVerification } from './peer_verfication/PeerVerification';
import { useMediaQuery } from '@mantine/hooks';

export enum ReviewActionType {
  NEXT_STEP,
  PREVIOUS_STEP,
  RESET_STEP,
}

import { HttpClient, Result } from '../../../../../utils/generic/httpClient';
import { docDepotAPIList, peerVerificationAPIList, workExperienceAPiList } from '../../../../../assets/api/ApiList';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { ExperienceDocuments } from '../../types/ProfileGeneral';

import { Layout } from '../Layout';
import { ConfirmRequest } from './peer_verfication/ConfirmRequest';
import { RequestListType } from '../../../my_verifications/components/RequestList';

export const VerifyExperience: React.FC = () => {
  const navigate = useNavigate();
  const [experience, setExperience] = useState<WorkExperience | undefined>({} as WorkExperience);
  const [createPeerResponse, setCreatePeerResponse] = useState<CreatePeerResponseType[]>([]);

  const [sentRequests, setSentRequests] = useState<Array<RequestListType>>([]);
  const [addedPeers, setAddedPeers] = useState<Peer[]>([]);
  const [activePeer, setActivePeer] = useState<number>(0);
  const { authClient, scrollToTop, workExperienceData } = useGlobalContext();
  const authToken = authClient.getAccessToken();
  const [experienceDocuments, setExperienceDocuments] = useState<ExperienceDocuments[]>([]);
  const isTabScreen = useMediaQuery('(max-width: 700px)');
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

  const handleProceed = async () => {
    scrollToTop();
    verificationStepDispatch({ type: ReviewActionType.NEXT_STEP });
  };

  const checkDuplicateEmail = (email: string) => {
    for (const peers of addedPeers) {
      if (peers.email === email) return false;
    }

    for (const requests of sentRequests) {
      if (requests.email === email) return false;
    }

    return true;
  };

  const handleCreatePeer = async () => {
    if (peerVerificationForm.validate().hasErrors) return;
    if (!checkDuplicateEmail(peerVerificationForm.values.email)) {
      peerVerificationForm.setFieldError('email', 'Email already added! Please add another email.');
      return;
    }

    const newPeer: Peer = {
      name: peerVerificationForm.values.name,
      email: peerVerificationForm.values.email,
      phone: peerVerificationForm.values.contactNumber,
      peerType: peerVerificationForm.values.peerType,
      workExperience: String(experience?.id),
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

  const getExperienceDocument = async () => {
    const res: Result<ExperienceDocuments[]> = await HttpClient.callApiAuth(
      {
        url: `${docDepotAPIList.getAllDocuments}/work`,
        method: 'GET',
      },
      authClient
    );
    if (res.ok) {
      const filtered = res.value.filter((document) => document.workExperience === experience?.id);

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
      const workExperiences = res.value.workExperiences;
      const filteredExperience = workExperiences.find((exp: WorkExperience) => exp.id === id);

      setExperience(filteredExperience);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  const handleAllExperiencesPage = (): void => {
    navigate('/candidate/profile/experience/allExperiences');
  };

  const { id } = useParams();

  useEffect(() => {
    if (authToken) {
      getWorkExperience();
      getExperienceDocument();
      getSentRequests();
    }
  }, []);

  return (
    <Layout>
      <Box>
        <Box>
          {currentStep === 1 && (
            <Box className="mobile-see-peers-sidebar" style={{ marginTop: '6rem' }}>
              {addedPeers.map(({ name, peerType }, index) => {
                return (
                  <Box key={index}>
                    <Box className={activePeer === index ? 'peer active' : 'peer'}>
                      <Box className="border-left"></Box>
                      <Text className="peer-name">{name}</Text>
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
          )}
        </Box>
        <Box className="container" style={{ marginTop: isTabScreen && currentStep === 1 ? '0rem' : '7rem' }}>
          <Box className="top-header">
            <Box className="see-all-header">
              <Box className="go-back-btn" onClick={handleAllExperiencesPage}>
                <BsArrowLeft className="arrow-left-icon" size={'16px'} />
                <Text>Profile</Text>
                <AiOutlineRight className="arrow-right-icon" size={'16px'} />
              </Box>
              <Text>{`Work Experience (${workExperienceData?.length})`}</Text>
            </Box>
          </Box>
          {currentStep === 0 && (
            <Box className="add-peer-box">
              <Box className="experience-details">
                <Box className="experience-details-text-box">
                  <Text className="designation">{experience?.designation}</Text>
                  <Text className="company-name">{experience?.companyName}</Text>
                  {experience && experience.noOfVerifications > 0 ? (
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
                  clearable
                  searchable
                  nothingFound="No options"
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
                <Text className="add-peer-header-text">Peer</Text>
                <Text className="add-peer-header-text">Email</Text>
                <Text className="add-peer-header-text">Status</Text>
                <Text className="add-peer-header-text">Peer Type</Text>
                <Text className="add-peer-header-text">Action</Text>
              </Box>
              <Box className="added-peer-box">
                {addedPeers.length > 0 ? (
                  <Box className="add-peers">
                    {[...addedPeers].reverse().map(({ name, email, peerType }, index) => {
                      return (
                        <Box key={index} className="added-peers">
                          <Text className="peer-name">
                            <CgProfile className="profile-icon" />
                            <span>{name}</span>
                          </Text>

                          <Text className="peer-email">{email}</Text>
                          <Text className="peer-response">Waiting</Text>
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

              <Button
                disabled={addedPeers.length + sentRequests.length < 2}
                className="primaryBtn"
                onClick={handleProceed}
              >
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
                      <Box key={index}>
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

                <PeerVerification
                  experienceId={String(experience?.id)}
                  activePeer={activePeer}
                  addedPeers={addedPeers}
                  setActivePeer={setActivePeer}
                  verificationStepDispatch={verificationStepDispatch}
                  createPeerResponse={createPeerResponse}
                  setCreatePeerResponse={setCreatePeerResponse}
                />
              </Box>
              <Box className="see-peers-btn-wrapper select-attribute-btn-wrapper">
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
            <ConfirmRequest
              addedPeers={addedPeers}
              experience={experience}
              experienceDocuments={experienceDocuments}
              createPeerResponse={createPeerResponse}
              verificationStepDispatch={verificationStepDispatch}
            />
          )}
        </Box>
      </Box>
    </Layout>
  );
};
