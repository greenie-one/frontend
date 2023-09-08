import { Box, Text, Title, Button, Modal, Checkbox } from '@mantine/core';
import { MdVerified, MdAddLocationAlt } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import location from '../../assets/location.png';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight, AiOutlineHome } from 'react-icons/ai';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { Layout } from '../Layout';
import { UndertakingText } from '../UndertakingText';
import { DeleteConfirmationModal } from '../../../../common/GenericModals';
import { HttpClient } from '../../../../../utils/generic/httpClient';
import { addressVerificationAPIList } from '../../../../../assets/api/ApiList';
import { showErrorNotification } from '../../../../../utils/functions/showNotification';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import mapMarker from '../../assets/map-marker.png';
import { Icon } from 'leaflet';

const marker = new Icon({
  iconUrl: mapMarker,
  iconSize: [40, 40],
});

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

type VerificationType = 'MySelf' | 'Peer';

export const ResidentialInfoDetails: React.FC = () => {
  const navigate = useNavigate();
  const [modalStep, setModalStep] = useState<number>(1);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [residential, setResidentialInfo] = useState<ResidentialInfoResponse | null>(null);
  const { residentialInfoData, scrollToTop, deleteResidentialInfo, authClient } = useGlobalContext();
  const { id } = useParams();
  const filteredInfo = residentialInfoData.find((info: ResidentialInfoResponse) => info.id === id);

  const [sentRequests, setSentRequests] = useState<Array<GetAddressVerificationResponse>>([]);

  const handleAggree = () => {
    if (checked) {
      setModalStep(2);
    }
  };

  const [deleteModalOpened, { open: deleteModalOpen, close: deleteModalClose }] = useDisclosure(false);

  const handleDeleteResidentialInfo = (): void => {
    if (residential) {
      deleteResidentialInfo(residential.id);
      deleteModalClose();
      navigate('/candidate/profile');
    }
  };

  const handleProfilePage = (): void => {
    navigate('/candidate/profile');
  };

  const handleAllAddressesScreen = () => {
    navigate('/candidate/profile/address/allAddresses');
    scrollToTop();
  };

  const handleGoToVerification = (choice: VerificationType) => {
    if (choice === 'MySelf') {
      navigate(`/candidate/profile/location/${id}/verify/me`);
      close();
      scrollToTop();
    }
    if (choice === 'Peer') {
      close();
      navigate(`/candidate/profile/address/${id}/verify`);
      scrollToTop();
    }
  };

  const getRequests = async () => {
    const res = await HttpClient.callApiAuth<Array<GetAddressVerificationResponse>>(
      {
        url: addressVerificationAPIList.getRequests,
        method: 'GET',
      },
      authClient
    );

    if (res.ok) {
      const requests = res.value;
      const filteredRequests = requests.filter((req) => req.ref === id);
      setSentRequests(filteredRequests);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  useEffect(() => {
    if (filteredInfo) {
      setResidentialInfo(filteredInfo);
      getRequests();
    }
  }, [filteredInfo]);

  return (
    <>
      {modalStep === 1 && (
        <Modal
          className="modal"
          size={'60%'}
          fullScreen={isMobile}
          opened={opened}
          onClose={close}
          centered
          radius={'lg'}
        >
          <Box className="disclaimer-modal">
            <Title className="disclaimer-heading">Undertaking</Title>
            <Text className="disclaimer-subHeading">Verifying Address on Greenie</Text>

            <Box className="checkbox-box">
              <Checkbox checked={checked} onChange={() => setChecked(!checked)} className="checkbox" color="teal" />
              <Text className="terms-conditions">
                I undertake and understand that by adding my address on Greenie, I am providing accurate and true
                information. I acknowledge that this information will be used solely for the intended purpose of address
                verification. I consent to the collection and processing of my data for this purpose and I am aware that
                I can delete this data anytime I desire.
              </Text>
            </Box>
            <UndertakingText />
            <Button className="primaryBtn" disabled={!checked} onClick={handleAggree}>
              I Agree
            </Button>
          </Box>
        </Modal>
      )}
      {modalStep === 2 && (
        <Modal
          className="modal"
          size={'60%'}
          fullScreen={isMobile}
          opened={opened}
          onClose={close}
          centered
          radius={'lg'}
        >
          <Box className="residential-info-modal">
            <Title className="residential-info-modal-title">Disclaimer</Title>
            <Text className="address">
              {residential?.address_line_1}, {residential?.address_line_2}, {residential?.landmark}, {residential?.city}
              , {residential?.pincode}
            </Text>
            <Box className="residential-info-modal-box">
              <Box className="residential-info-modal-choice-box" onClick={() => handleGoToVerification('MySelf')}>
                <Box className="residential-info-modal-icon">
                  <AiOutlineHome size={'20px'} />
                </Box>

                <Text className="text">Confirm my location</Text>
              </Box>
              <Box className="residential-info-modal-choice-box" onClick={() => handleGoToVerification('Peer')}>
                <Box className="residential-info-modal-icon">
                  <MdAddLocationAlt size={'20px'} />
                </Box>

                <Text className="text">Ask someone here to confirm</Text>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
      <DeleteConfirmationModal
        opened={deleteModalOpened}
        deleteText="Residential Address"
        close={deleteModalClose}
        cb={() => handleDeleteResidentialInfo()}
      />
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
          <Box className="info-detail-box">
            <Box className="info-detail-top-box">
              <Box className="address-container">
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

              <Button
                disabled={sentRequests.length > 0 || residential?.isVerified}
                className="green-btn"
                onClick={() => open()}
              >
                Get Verified
              </Button>
            </Box>

            <Box style={{ height: '15rem', borderRadius: '2px', overflow: 'hidden' }} className="wrapper">
              {residential?.location ? (
                <MapContainer
                  key={JSON.stringify([residential?.location.latitude, residential?.location.longitude])}
                  center={[residential?.location.latitude, residential?.location.longitude]}
                  zoom={14}
                  scrollWheelZoom={false}
                  style={{ height: '15rem', zIndex: '1' }}
                  maxZoom={15}
                  zoomControl={false}
                  attributionControl={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[residential?.location.latitude, residential?.location.longitude]} icon={marker}>
                    <Popup>
                      {residential?.address_line_1}, {residential?.address_line_2}, {residential?.landmark},{' '}
                      {residential?.city} {residential?.pincode}
                    </Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <></>
              )}
            </Box>
            <Box className="wrapper">
              <Title className="title">Other information</Title>
              <Box className="other-info-box">
                <Box className="detail-box">
                  <Title className="title">Address Type</Title>
                  <Text className="detail">{residential?.addressType}</Text>
                </Box>
                <Box className="detail-box">
                  <Title className="title">Tenure</Title>
                  <Text className="detail">
                    {formattedDate(String(residential?.start_date))} to{' '}
                    {residential?.end_date ? formattedDate(String(residential.end_date)) : 'Present'}{' '}
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
                          <small style={{ fontWeight: 500 }}>{request.verificationBy}</small>
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
                              <CgSandClock color="#fab005" />
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

            <Button
              className="green-btn"
              style={{ background: 'rgb(105, 112, 130)', marginTop: '2rem' }}
              onClick={(event) => {
                event.stopPropagation();
                deleteModalOpen();
              }}
            >
              Delete Address
            </Button>
          </Box>
        </Box>
      </Layout>
    </>
  );
};
