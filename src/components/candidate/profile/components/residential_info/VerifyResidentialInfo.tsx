import { Title, Text, Box, Button, TextInput, Select, CopyButton } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { MdOutlineDelete, MdOutlineContentCopy } from 'react-icons/md';
import { CgSandClock, CgProfile } from 'react-icons/cg';
import location from '../../assets/location.png';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsCheckLg, BsArrowLeft } from 'react-icons/bs';
import { relations } from '../../constants/SelectionOptions';
import noData from '../../assets/noData.png';
import { ResidentialInfoPeerType } from '../../types/ProfileGeneral';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import { Layout } from '../Layout';
import { FcInfo } from 'react-icons/fc';

export const VerifyResidentialInfo: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [addedPeers, setAddedPeers] = useState<ResidentialInfoPeerType[]>([]);
  const link = 'https://greenie.verify34812';
  const { scrollToTop, residentialInfoVerificationForm, residentialInfoData } = useGlobalContext();

  const [residentialInfo, setResidentialInfo] = useState<ResidentialInfoResponse | null>(null);

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

  const handleNextStep = () => {
    if (addedPeers.length > 0) {
      setCurrentStep(1);
    }
  };

  const handleProceed = () => {
    scrollToTop();
  };

  const handleProfilePage = (): void => {
    navigate('/candidate/profile');
  };

  const handleAllAddressesScreen = () => {
    navigate('/candidate/profile/address/allAddresses');
  };

  const handleAddPeer = () => {
    if (!residentialInfoVerificationForm.validate().hasErrors) {
      const newPeer: ResidentialInfoPeerType = {
        name: residentialInfoVerificationForm.values.name,
        email: residentialInfoVerificationForm.values.email,
        phone: residentialInfoVerificationForm.values.phone,
        peerType: residentialInfoVerificationForm.values.peerType,
      };
      setAddedPeers((prevPeers) => [...prevPeers, newPeer]);
      residentialInfoVerificationForm.reset();
    }
  };

  const { id } = useParams();
  const filteredInfo = residentialInfoData.find((info: ResidentialInfoResponse) => info.id === id);

  useEffect(() => {
    if (filteredInfo) {
      setResidentialInfo(filteredInfo);
    }
  }, []);

  return (
    <>
      <Layout>
        <Box className="container" style={{ marginTop: '7rem' }}>
          <Box className="top-header">
            <Box className="see-all-header">
              <Box className="go-back-btn" onClick={handleProfilePage}>
                <BsArrowLeft className="arrow-left-icon" size={'16px'} />
                <Text>Profile</Text>
                <AiOutlineRight className="arrow-right-icon" size={'16px'} />
              </Box>
              <Text
                onClick={handleAllAddressesScreen}
              >{`Residential Information (${residentialInfoData.length})`}</Text>
            </Box>
          </Box>
          {currentStep === 0 && (
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
              <Title className="add-peer-title">Add personnels that will verify your address</Title>
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
              <Button className="add-peer-btn" leftIcon={<AiOutlinePlus size={'18px'} />} onClick={handleAddPeer}>
                Add Peer
              </Button>
              <Box className="residential-add-peer-header">
                <Text className="residential-peer-header-text">Peer</Text>
                <Text className="residential-peer-header-text">Email</Text>
                <Text className="residential-peer-header-text">Phone Number</Text>
                <Text className="residential-peer-header-text">Peer Type</Text>
                <Text className="residential-peer-header-text">Action</Text>
              </Box>
              {addedPeers.length > 0 ? (
                <Box className="residential-added-peer-box">
                  {[...addedPeers].reverse().map(({ name, email, peerType, phone }, index) => {
                    return (
                      <Box key={index} className="residential-added-peers">
                        <Text className="peer-name">
                          <CgProfile className="profile-icon" />
                          <span>{name}</span>
                        </Text>
                        <Text className="peer-email">{email}</Text>
                        <Text className="peer-phone">{phone}</Text>

                        <Text className="peer-type">{peerType}</Text>
                        <Text className="peer-remove" onClick={() => handleRemovePeer(index)}>
                          <MdOutlineDelete className="remove-icon" />
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

              <Button disabled={addedPeers.length < 1} className="primaryBtn" onClick={handleNextStep}>
                Proceed
              </Button>
            </Box>
          )}
          {currentStep === 1 && (
            <Box className="add-peer-box residential-info-peer-box">
              <Box className="residential-details">
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
              <Box className="residential-add-peer-header">
                <Text className="residential-peer-header-text">Peer</Text>
                <Text className="residential-peer-header-text">Email</Text>
                <Text className="residential-peer-header-text">Phone Number</Text>
                <Text className="residential-peer-header-text">Peer Type</Text>
                <Text className="residential-peer-header-text">Action</Text>
              </Box>
              <Box className="residential-added-peer-box">
                {[...addedPeers].reverse().map(({ name, email, peerType, phone }, index) => {
                  return (
                    <Box key={index} className="residential-added-peers">
                      <Text className="peer-name">
                        <CgProfile className="profile-icon" />
                        <span>{name}</span>
                      </Text>
                      <Text className="peer-email">{email}</Text>
                      <Text className="peer-phone">{phone}</Text>

                      <Text className="peer-type">{peerType}</Text>
                      <Text className="peer-remove" onClick={() => handleRemovePeer(index)}>
                        <MdOutlineDelete size={'20px'} />
                        <span>Remove</span>
                      </Text>
                    </Box>
                  );
                })}
              </Box>

              <Button disabled={addedPeers.length < 1} className="primaryBtn" onClick={handleProceed}>
                Proceed
              </Button>
            </Box>
          )}
        </Box>
      </Layout>
    </>
  );
};
