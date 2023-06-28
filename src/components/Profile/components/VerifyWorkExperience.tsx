import React, { useReducer, useState, CSSProperties } from 'react';
import {
  Title,
  Text,
  Box,
  Button,
  TextInput,
  Select,
  createStyles,
  em,
  rem,
  Modal,
  Divider,
} from '@mantine/core';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { useForm, isNotEmpty, isEmail, hasLength } from '@mantine/form';
import { MdVerified, MdOutlineDelete } from 'react-icons/md';
import { AiOutlinePlus, AiFillInfoCircle } from 'react-icons/ai';
import { BsArrowLeft, BsCheckLg } from 'react-icons/bs';
import { CgSandClock, CgProfile } from 'react-icons/cg';
import { FaExclamation } from 'react-icons/fa';
import tscLogo from '../assets/tscLogo.png';
import noData from '../assets/noData.png';
import { notifications } from '@mantine/notifications';
import { useProfileContext } from '../context/ProfileContext';

const peerType = [
  { value: 'Line Manager', label: 'Line Manager' },
  { value: 'Reporting Manager', label: 'Reporting Manager' },
  { value: 'HR', label: 'HR' },
  { value: 'Colleague', label: 'Colleague' },
  { value: 'CXO', label: 'CXO' },
];

type PeerVerificationFormType = {
  name: string;
  peerType: string;
  email: string;
  contactNumber: string;
};

type Peer = {
  name: string;
  email: string;
  status: string;
  peerType: string;
  contactNumber: string;
};

interface IWorkExperience {
  _id: string;
  image: string | null;
  designation: string;
  companyName: string;
  isVerified: boolean;
}

enum ReviewActionType {
  NEXT_STEP,
  PREVIOUS_STEP,
  RESET_STEP,
}

type ReviewStepState = {
  currentStep: number;
};

type ReviewStepAction = { type: ReviewActionType };

const VerifiationStepReducer = (
  state: ReviewStepState,
  action: ReviewStepAction
): ReviewStepState => {
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

export const VerifyWorkExperience: React.FC<IWorkExperience> = ({
  _id,
  image,
  designation,
  companyName,
  isVerified,
}) => {
  const [verifificationStepState, verificationStepDispatch] = useReducer(VerifiationStepReducer, {
    currentStep: 0,
  });
  const { currentStep } = verifificationStepState;
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const [opened, { open, close }] = useDisclosure(false);
  const { classes: inputClasses } = inputStyles();
  const [addedPeers, setAddedPeers] = useState<Peer[]>([]);
  const [activePeer, setActivePeer] = useState(0);
  const [backgroundStyle, setBackgroundStyle] = useState<CSSProperties>({
    backgroundImage: `url(${tscLogo})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  });
  const { detailsPage, dispatchDetailsPage, setSelectedCard, scrollToTop } = useProfileContext();

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

  const handleAddPeer = () => {
    if (
      !peerVerificationForm.validateField('name').hasError &&
      !peerVerificationForm.validateField('email').hasError &&
      !peerVerificationForm.validateField('peerType').hasError &&
      !peerVerificationForm.validateField('contactNumber').hasError
    ) {
      const newPeer: Peer = {
        name: peerVerificationForm.values.name,
        email: peerVerificationForm.values.email,
        peerType: peerVerificationForm.values.peerType,
        status: 'Waiting',
        contactNumber: peerVerificationForm.values.contactNumber,
      };

      setAddedPeers((prevPeers) => [...prevPeers, newPeer]);
      peerVerificationForm.values.name = '';
      peerVerificationForm.values.email = '';
      peerVerificationForm.values.peerType = '';
      peerVerificationForm.values.contactNumber = '';
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
    if (addedPeers.length < 2) {
      notifications.show({
        id: 'load-data',
        title: 'Insufficient number of peers !',
        message: 'Please add atleast 2 peers',
        autoClose: 2200,
        withCloseButton: false,
        color: 'red',
        icon: <FaExclamation />,
        sx: { borderRadius: em(8) },
      });
    }
    if (addedPeers.length >= 2) {
      verificationStepDispatch({ type: ReviewActionType.NEXT_STEP });
      notifications.show({
        id: 'load-data',
        title: 'Peers added',
        message: 'Peers added to the list',
        autoClose: 2200,
        withCloseButton: false,
        color: 'teal',
        icon: <BsCheckLg />,
        sx: { borderRadius: em(8) },
      });
    }
  };

  const handleSeeRequest = () => {
    setSelectedCard(null);
    dispatchDetailsPage({
      type: 'SET_SEE_ALL_WORKEXPERIENCE',
      payload: !detailsPage.seeAllWorkExperience,
    });
    close();
    scrollToTop();
  };

  return (
    <>
      <Modal
        size={isTablet ? '85%' : '65%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={close}
        centered
      >
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
            </Box>
          </Box>
          <Button className="green-btn" onClick={handleSeeRequest}>
            See request
          </Button>
          <Box className="note">
            <AiFillInfoCircle className="info-icon" size={'18px'} />
            <Text className="note-heading">Note</Text>
            <Text className="text">
              Candidates cannot see this verification process or its results.
            </Text>
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
            </Box>
          </Box>
          <Title className="add-peer-title">Add Peers to verify</Title>
          <Box className="add-peers-inputs">
            <TextInput
              withAsterisk
              label="Name"
              classNames={inputClasses}
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
              classNames={inputClasses}
              {...peerVerificationForm.getInputProps('peerType')}
            />
            <TextInput
              withAsterisk
              label="Official email id"
              classNames={inputClasses}
              {...peerVerificationForm.getInputProps('email')}
            />
            <TextInput
              withAsterisk
              label="Contact number"
              classNames={inputClasses}
              {...peerVerificationForm.getInputProps('contactNumber')}
            />
          </Box>
          <Button
            className="add-peer-btn"
            leftIcon={<AiOutlinePlus size={'18px'} />}
            onClick={handleAddPeer}
          >
            Add Peer
          </Button>
          <Box className="add-peer-header">
            <Text>Peer</Text>
            <Text>Email</Text>
            <Text>Status</Text>
            <Text>Peer Type</Text>
            <Text>Action</Text>
          </Box>

          {addedPeers.length > 0 ? (
            <Box className="add-peers">
              {addedPeers.reverse().map(({ name, email, status, peerType }, index) => {
                return (
                  <Box key={index} className="added-peers">
                    <Text className="peer-name">
                      <CgProfile className="profile-icon" />
                      <span>{name}</span>
                    </Text>
                    <Text className="peer-email">{email}</Text>
                    <Text className="peer-response">{status}</Text>
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
              {addedPeers.reverse().map(({ name, peerType }, index) => {
                return (
                  <Box key={index}>
                    <Box className="peer">
                      <Text className="peer-name">{name}</Text>
                      <Text className="peer-type">{peerType}</Text>
                    </Box>
                    {addedPeers.length - 1 !== index && <Divider color="#ebebeb" />}
                  </Box>
                );
              })}
            </Box>
            <Box className="see-peers-main-box">
              <img src={noData} alt="No data" />
            </Box>
          </Box>
          <Box className="see-peers-btn-wrapper">
            <Button className="green-btn" onClick={open}>
              Confirm and send request
            </Button>
            <Button className="cancel-btn">Cancel</Button>
          </Box>
        </Box>
      )}
    </>
  );
};

const inputStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: '58px',
    paddingTop: '18px',
    fontSize: '16px',
    fontWeight: 500,
    borderRadius: '8px',
    border: '1px solid #D1D4DB',
    lineHeight: '19px',
    letterSpacing: '-0.02em',
    color: '#697082',

    [`@media screen and (max-width: ${em(1024)})`]: {
      height: '46px',
      borderRadius: '6px',
      fontSize: '10px',
      lineHeight: '12px',
      margin: '0 auto',
    },
  },

  selectInput: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '19px',
    letterSpacing: '-0.02em',
    color: '#697082',
  },

  innerInput: {
    height: rem(54),
    paddingTop: rem(28),

    [`@media screen and (max-width: ${em(1024)})`]: {
      paddingTop: rem(8),
    },
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: '12px',
    paddingLeft: '14px',
    paddingTop: '7px',
    lineHeight: '14.52px',
    letterSpacing: '-0.02em',
    zIndex: 1,
    color: '#697082',

    [`@media screen and (max-width: ${em(1024)})`]: {
      fontSize: '10px',
      lineHeight: '10px',
      paddingTop: '8px',
    },
  },
}));
