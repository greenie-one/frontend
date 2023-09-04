import { Title, Text, Box, Button, TextInput, Select, Modal, CopyButton } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { CgSandClock } from 'react-icons/cg';
import location from '../../assets/location.png';
import { BsArrowLeft, BsCheckLg } from 'react-icons/bs';
import { relations } from '../../constants/SelectionOptions';
import { ResidentialInfoPeerType } from '../../types/ProfileGeneral';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import { Layout } from '../Layout';
import { FcInfo } from 'react-icons/fc';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { HttpClient } from '../../../../../utils/generic/httpClient';
import { showErrorNotification } from '../../../../../utils/functions/showNotification';
import { addressVerificationAPIList } from '../../../../../assets/api/ApiList';
import classes from './styles/styles.module.css';
import { MdOutlineContentCopy } from 'react-icons/md';
import { feedbackExistCheck } from '../../../../../utils/functions/handleFeedbackProcess';
import { CandidateFeedback } from '../../../../../utils/functions/CandidateFeedback';

const PeerInfoLabels: Array<{ id: keyof ResidentialInfoPeerType; label: string }> = [
  { id: 'name', label: 'Name' },
  { id: 'peerType', label: 'Peer Relation' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone Number' },
];

const ShowPeerDetails = ({ label, value }: { label: string; value: string }) => {
  return (
    <Box className={classes.informationGroup}>
      <Text className={classes.informationLabel}>{label}:</Text>
      <Text className={classes.informationValue}>{value}</Text>
    </Box>
  );
};

export const VerifyResidentialInfo: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isMobile = useMediaQuery('(max-width: 800px)');
  const [opened, { open, close }] = useDisclosure(false);
  const [fbOpened, { open: fbOpen, close: fbClose }] = useDisclosure(false);

  const { scrollToTop, residentialInfoVerificationForm, residentialInfoData, authClient } = useGlobalContext();
  const filteredInfo = residentialInfoData.find((info: ResidentialInfoResponse) => info.id === id);

  const [link, setLink] = useState<string>('');
  const [peer, setPeer] = useState<ResidentialInfoPeerType>({} as ResidentialInfoPeerType);
  const [residentialInfo, setResidentialInfo] = useState<ResidentialInfoResponse | null>(null);

  const handleProceed = async () => {
    if (!id) return;

    const requestBody: CreateAddressVerificationRequest = {
      name: peer.name,
      email: peer.email,
      phone: peer.phone,
      ref: id,
      verificationBy: peer.peerType,
    };

    const res = await HttpClient.callApiAuth<{ link: string }>(
      {
        url: `${addressVerificationAPIList.createPeer}`,
        method: 'POST',
        body: requestBody,
      },
      authClient
    );

    if (res.ok) {
      setLink(res.value.link);
      scrollToTop();

      residentialInfoVerificationForm.reset();
      close();
      const feedbackGiven = await feedbackExistCheck('add_residential_peer', authClient);
      if (feedbackGiven) {
        fbOpen();
      } else {
        console.info('Feedback Completed!');
      }
    } else {
      close();
      showErrorNotification(res.error.code);
    }
  };

  const handleAddPeer = () => {
    if (!residentialInfoVerificationForm.validate().hasErrors) {
      let newPeer: ResidentialInfoPeerType = {} as ResidentialInfoPeerType;

      Object.keys(residentialInfoVerificationForm.values).forEach((key) => {
        newPeer = {
          ...newPeer,
          [key]: residentialInfoVerificationForm.values[key],
        };
      });

      setPeer(newPeer);
      open();
    }
  };

  useEffect(() => {
    if (filteredInfo) {
      setResidentialInfo(filteredInfo);
    }
  }, [filteredInfo]);

  return (
    <>
      <Layout>
        <Box className="container" style={{ marginTop: '7rem' }}>
          <Box className="top-header">
            <Box className="see-all-header">
              <Box className="go-back-btn" onClick={() => navigate('/candidate/profile')}>
                <BsArrowLeft className="arrow-left-icon" size={'16px'} />
                <Text>Profile</Text>
                <AiOutlineRight className="arrow-right-icon" size={'16px'} />
              </Box>
              <Text
                onClick={() => navigate('/candidate/profile/address/allAddresses')}
              >{`Residential Information (${residentialInfoData.length})`}</Text>
            </Box>
          </Box>
          <Box className="add-peer-box residential-info-peer-box">
            <Box className="residential-details ">
              <Box className="location">
                <img src={location} alt="location icon" />
              </Box>

              <Box className="residential-details-text-box">
                <Text className="address">
                  {residentialInfo?.address_line_1}, {residentialInfo?.address_line_2}, {residentialInfo?.landmark},
                  {residentialInfo?.city}, {residentialInfo?.pincode}
                </Text>

                <Button leftIcon={<CgSandClock size={'16px'} />} className="pending">
                  Pending
                </Button>
              </Box>
            </Box>
            {!link ? (
              <>
                <Title className="add-peer-title">Add a person that will verify your address</Title>
                <Box className="pro-tip-box">
                  <Box className="icon-box">
                    <FcInfo color="#1991ff" />
                    <Text className="pro-tip">Pro tip</Text>
                  </Box>
                  <Text className="tip">
                    For accurate address verification, ensure you enter the name of the actual resident who lives at the
                    specified location. This will help validate the address effectively on Greenie.
                  </Text>
                </Box>
                <Box className="add-peers-inputs">
                  <TextInput
                    withAsterisk
                    label="Name"
                    className="inputClass"
                    {...residentialInfoVerificationForm.getInputProps('name')}
                  />
                  <Select
                    clearable
                    searchable
                    nothingFound="No options"
                    withAsterisk
                    label="Peer relation"
                    data={relations}
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
                    {...residentialInfoVerificationForm.getInputProps('peerType')}
                  />
                  <TextInput
                    withAsterisk
                    label="Email"
                    className="inputClass"
                    {...residentialInfoVerificationForm.getInputProps('email')}
                  />
                  <TextInput
                    withAsterisk
                    label="Contact number"
                    className="inputClass"
                    maxLength={10}
                    minLength={10}
                    {...residentialInfoVerificationForm.getInputProps('phone')}
                  />
                </Box>
                <Text className="add-peer-sub-text">
                  To ensure thorough verification, OTPs will be sent to verify all credentials.
                </Text>
                <Button className="primaryBtn" onClick={handleAddPeer}>
                  Proceed
                </Button>
              </>
            ) : (
              <>
                <Title className="add-peer-title">
                  Verification sent <BsCheckLg color="#17a672" />{' '}
                </Title>
                <Text className="add-peer-text">Share this link with your peer to verify the location.</Text>
                <CopyButton value={link} timeout={2000}>
                  {({ copied, copy }) => (
                    <Box className="copy-box">
                      <label>Here is your verification link</label>
                      <Text className="copy-link">{link}</Text>
                      <Box className="copy-btn" onClick={copy}>
                        <MdOutlineContentCopy />
                        {copied ? <Text className="copy-text">Copied</Text> : <Text className="copy-text">Copy</Text>}
                      </Box>
                    </Box>
                  )}
                </CopyButton>
                <Box className="pro-tip-box">
                  <Box className="icon-box">
                    <FcInfo color="#1991ff" />
                    <Text className="pro-tip">Pro tip</Text>
                  </Box>
                  <Text className="tip">Share this link with your peer to verify the location.</Text>
                </Box>
                <Button className="primaryBtn" onClick={() => navigate('/candidate/profile/myVerification')}>
                  See Requests
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Layout>
      <Modal
        size={'60%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={close}
        centered
        title="Confirmation"
        styles={{
          title: {
            fontWeight: 600,
          },
        }}
        radius={'lg'}
      >
        <Box className={classes.container}>
          <Text className={classes.confirmationMsg}>
            You are about to send a verification request. Please confirm the details.
          </Text>
          <Box className={classes.confirmPeerDetails}>
            {PeerInfoLabels.map((info, idx) => (
              <ShowPeerDetails key={idx} label={info.label} value={peer[info.id]} />
            ))}
          </Box>
          <Box className={classes.confirmationBtnWrapper}>
            <Button className={classes.confirmBtn} onClick={handleProceed}>
              Confirm
            </Button>
            <Button className={classes.cancelBtn} onClick={close}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <CandidateFeedback
        opened={fbOpened}
        close={fbClose}
        feedback="add_residential_peer"
        onFeedbackOver={() => console.info('Feedback Completed!')}
      />
    </>
  );
};
