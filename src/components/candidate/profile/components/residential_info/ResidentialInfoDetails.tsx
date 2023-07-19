import { Box, Text, Title, Button, Modal, Checkbox } from '@mantine/core';
import { MdVerified, MdAddLocationAlt } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import location from '../../assets/location.png';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { Navbar } from '../Navbar';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight, AiOutlineHome } from 'react-icons/ai';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';

type VerificationType = 'MySelf' | 'Peer';

export const ResidentialInfoDetails: React.FC = () => {
  const navigate = useNavigate();
  const [modalStep, setModalStep] = useState<number>(1);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [residential, setResidentialInfo] = useState<ResidentialInfoResponse>({
    address_line_1: '',
    address_line_2: '',
    landmark: '',
    pincode: 0,
    city: '',
    start_date: null,
    end_date: null,
    state: '',
    country: '',
    address_type: '',
    isVerified: false,
    residentialInfoId: '',
  });
  const { residentialInfoData } = useGlobalContext();
  const { id } = useParams();
  const filteredInfo = residentialInfoData.find((info: ResidentialInfoResponse) => info.residentialInfoId === id);

  const handleAggree = () => {
    if (checked) {
      setModalStep(2);
    }
  };

  const handleProfilePage = (): void => {
    navigate('/candidate/profile');
  };

  const handleAllAddressesScreen = () => {
    navigate('/candidate/profile/address/allAddresses');
  };

  const handleGoToVerification = (choice: VerificationType) => {
    if (choice === 'MySelf') {
      navigate(`/candidate/profile/address/${id}/verify/me`);
      close();
    }
    if (choice === 'Peer') {
      close();
      navigate(`/candidate/profile/address/${id}/verify`);
    }
  };

  useEffect(() => {
    if (filteredInfo) {
      setResidentialInfo(filteredInfo);
    }
  }, []);

  return (
    <>
      <Navbar />
      {modalStep === 1 && (
        <Modal className="modal" size={'60%'} fullScreen={isMobile} opened={opened} onClose={close} centered>
          <Box className="disclaimer-modal">
            <Title className="disclaimer-heading">Undertaking</Title>
            <Text className="disclaimer-subHeading">Verifying Address on Greenie</Text>
            <Button className="primaryBtn" disabled={!checked} onClick={handleAggree}>
              I Agree
            </Button>
            <Box className="checkbox-box">
              <Checkbox checked={checked} onChange={() => setChecked(!checked)} className="checkbox" color="teal" />
              <Text className="tearms-conditions">
                I undertake and understand that by adding my address on Greenie, I am providing accurate and true
                information. I acknowledge that this information will be used solely for the intended purpose of address
                verification. I consent to the collection and processing of my data for this purpose and I am aware that
                I can delete this data anytime I desire.
              </Text>
            </Box>
            <Text className="policy">Click to view - Undertaking and Data and Privacy Policy</Text>
          </Box>
        </Modal>
      )}
      {modalStep === 2 && (
        <Modal className="modal" size={'60%'} fullScreen={isMobile} opened={opened} onClose={close} centered>
          <Box className="residential-info-modal">
            <Title className="residential-info-modal-title">Disclaimer</Title>
            <Text className="address">
              {residential.address_line_1}, {residential.address_line_2}, {residential.landmark}, {residential.city},{' '}
              {residential.pincode}
            </Text>
            <Box className="residential-info-modal-box">
              <Box className="residential-info-modal-choice-box" onClick={() => handleGoToVerification('MySelf')}>
                <Box className="residential-info-modal-icon">
                  <AiOutlineHome size={'20px'} />
                </Box>

                <Text className="text">Yes, I will verify myself</Text>
              </Box>
              <Box className="residential-info-modal-choice-box" onClick={() => handleGoToVerification('Peer')}>
                <Box className="residential-info-modal-icon">
                  <MdAddLocationAlt size={'20px'} />
                </Box>

                <Text className="text">No, I do not reside here</Text>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
      <main className="profile">
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
          <Box className="info-detail-box">
            <Box className=""></Box>
            <Box className="info-detail-top-box">
              <Box className="location">
                <img className="location=img" src={location} alt="Location" />
              </Box>
              <Box className="address-box">
                <Box className="address">
                  {residential?.address_line_1}, {residential?.address_line_2}, {residential?.landmark},{' '}
                  {residential?.city} {residential?.pincode}
                </Box>
                {residential?.isVerified ? (
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
            <Box className="wrapper">
              <Title className="title">Other information</Title>
              <Box className="other-info-box">
                <Box className="detail-box">
                  <Title className="title">Address Type</Title>
                  <Text className="detail">{residential?.address_type}</Text>
                </Box>
                <Box className="detail-box">
                  <Title className="title">Tenure</Title>
                  <Text className="detail">
                    {residential?.start_date?.toString().substring(0, 4)} -{' '}
                    {residential?.end_date?.toString().substring(0, 4)}{' '}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box className="wrapper">
              <Title className="title">About Residence</Title>
              <Box className="about-info-box">
                <Box className="detail-box">
                  <Title className="title">Address line 1</Title>
                  <Text className="detail">{residential?.address_line_1}</Text>
                </Box>
                <Box className="detail-box">
                  <Title className="title">Address line 2</Title>
                  <Text className="detail">{residential?.address_line_2}</Text>
                </Box>
              </Box>
            </Box>
            <Box className="wrapper">
              <Title className="title">Geographic Information</Title>
              <Box className="geo-info-box">
                <Box className="detail-box">
                  <Title className="title">Landmark</Title>
                  <Text className="detail">{residential?.landmark}</Text>
                </Box>
                <Box className="detail-box">
                  <Title className="title">Pincode</Title>
                  <Text className="detail">{residential?.pincode}</Text>
                </Box>
                <Box className="detail-box">
                  <Title className="title">City</Title>
                  <Text className="detail">{residential?.city}</Text>
                </Box>
                <Box className="detail-box">
                  <Title className="title">State</Title>
                  <Text className="detail">{residential?.state}</Text>
                </Box>
                <Box className="detail-box">
                  <Title className="title">Country</Title>
                  <Text className="detail">{residential?.country}</Text>
                </Box>
                <Box className="detail-box">
                  <Title className="title">Google maps</Title>
                  <Text className="detail details-link">Click to locate</Text>
                </Box>
              </Box>
            </Box>
            <Box className="experience-details-links">
              <Text className="details-link">Show Documents</Text>
              <Text className="details-link">Show Skills</Text>
            </Box>
            <Button className="green-btn" onClick={() => open()}>
              Get Verified
            </Button>
          </Box>
        </Box>
      </main>
    </>
  );
};
