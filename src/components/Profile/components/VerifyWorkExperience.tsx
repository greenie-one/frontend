import React, { useReducer, useState } from 'react';
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
} from '@mantine/core';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { useForm, UseFormReturnType, isNotEmpty, isEmail, hasLength } from '@mantine/form';
import { MdVerified, MdOutlineDelete } from 'react-icons/md';
import { GrAdd } from 'react-icons/gr';
import { CgSandClock } from 'react-icons/cg';
import tscLogo from '../assets/tscLogo.png';

const peerType = [
  { value: 'Line Manager', label: 'Line Manager' },
  { value: 'Reporting Manager', label: 'Reporting Manager' },
  { value: 'HR', label: 'HR' },
  { value: 'College', label: 'College' },
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
  response: string;
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
        response: 'waiting',
        contactNumber: peerVerificationForm.values.contactNumber,
      };

      setAddedPeers((prevPeers) => [...prevPeers, newPeer]);
      peerVerificationForm.values.name = '';
      peerVerificationForm.values.email = '';
      peerVerificationForm.values.peerType = '';
      peerVerificationForm.values.contactNumber = '';
    }
  };

  return (
    <>
      {currentStep === 0 && (
        <Box className="add-peer-box">
          <Box className="experience-details">
            <img src={tscLogo} alt="Company logo" />
            <Box className="experience-details-text-box">
              <Text>{designation}</Text>
              <Text>{companyName}</Text>
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
          <Button className="add-peer-btn" leftIcon={<GrAdd />} onClick={handleAddPeer}>
            Add Peer
          </Button>
          <Box className="add-peers">
            {addedPeers.reverse().map(({ name, email, response, peerType }, index) => {
              return (
                <Box key={index}>
                  <Text>{name}</Text>
                  <Text>{email}</Text>
                  <Text>{response}</Text>
                  <Text>{peerType}</Text>
                </Box>
              );
            })}
          </Box>
          <Button>Proceed</Button>
        </Box>
      )}
      {currentStep === 1 && (
        <Box className="see-peers-box">
          <Box className="see-peers-sidebar"></Box>
          <Box className="see-peers-main-box"></Box>
        </Box>
      )}
    </>
  );
};

const inputStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    marginTop: '10px',
    marginBottom: '10px',
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
