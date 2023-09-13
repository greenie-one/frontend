import { Text, Box, Button, Modal } from '@mantine/core';
import { MdOutlineEdit } from 'react-icons/md';
import noData from '../../assets/noData.png';
import { AiOutlinePlus } from 'react-icons/ai';
import { ResidentialInfoCard } from './ResidentialInfoCard';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { SearchBox } from './components/SearchBox';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { FcInfo } from 'react-icons/fc';
import { useEffect, useState } from 'react';
import { HttpClient } from '../../../../../utils/generic/httpClient';
import { addressVerificationAPIList } from '../../../../../assets/api/ApiList';

export const ResidentialInfoSection = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { residentialInfoData, scrollToTop, authClient } = useGlobalContext();

  const [searchModalOpened, { open: searchModalOpen, close: searchModalClose }] = useDisclosure(false);
  const [sentRequests, setSentRequests] = useState<Array<GetAddressVerificationResponse>>([]);

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
      setSentRequests(requests);
    } else {
      setSentRequests([]);
    }
  };

  useEffect(() => {
    if (residentialInfoData.length) {
      getRequests();
    } else {
      setSentRequests([]);
    }
  }, [residentialInfoData.length]);

  const handleToggleResidentialDetails = (): void => {
    navigate('/candidate/profile/address/allAddresses');
    scrollToTop();
  };

  const handleDetailsPage = (id: string) => {
    navigate(`/candidate/profile/address/${id}`);
    scrollToTop();
  };

  return (
    <section className="residential-info container">
      <Box className="header">
        <Box>
          <Text className="heading">{`Residential Information (${residentialInfoData?.length})`}</Text>
          <Text className="subheading">All your permanent and temporary addresses</Text>
        </Box>

        {residentialInfoData?.length > 0 && (
          <>
            <Box className="header-links">
              <Text className="link" onClick={handleToggleResidentialDetails}>
                See All Addresses
              </Text>
              <Button leftIcon={<MdOutlineEdit />} onClick={searchModalOpen} className="edit-btn">
                Add Address
              </Button>
            </Box>
            <Box className="edit-icon" onClick={searchModalOpen}>
              <MdOutlineEdit size={'22px'} className="btn" />
            </Box>
          </>
        )}
      </Box>
      <Modal
        title="Add Residential Information"
        radius={'lg'}
        className="modal"
        size={'60%'}
        fullScreen={isMobile}
        opened={searchModalOpened}
        onClose={searchModalClose}
      >
        <Box className="search-box-container">
          <Text className="search-box-label">Enter your location</Text>
          <Box className="pro-tip-box">
            <Box className="icon-box">
              <FcInfo color="#1991ff" />
              <Text className="pro-tip">Pro tip</Text>
            </Box>
            <Text className="tip">
              Search for a precise address, however if you encounter difficulty in locating your address, rest assured
              that the system will identify accuracy within 250 meters radius.
            </Text>
          </Box>
          <SearchBox innerComponent={false} />
        </Box>
      </Modal>

      {residentialInfoData?.length === 0 ? (
        <Box className="no-data-wrapper">
          <img className="no-data" src={noData} alt="No data" />
          <Button leftIcon={<AiOutlinePlus />} onClick={searchModalOpen} className="add-records">
            Add Address
          </Button>
        </Box>
      ) : (
        <Box className="section-cards-wrapper ">
          {[...residentialInfoData]
            ?.reverse()
            ?.slice(0, 3)
            ?.map((info, index) => {
              const peerDetail = sentRequests.find((request) => request.ref === info.id);
              const verificationStatus: 'notVerified' | 'pending' | 'rejected' | 'verified' =
                peerDetail === undefined
                  ? info.isVerified
                    ? 'verified'
                    : 'notVerified'
                  : peerDetail.isReal.state === 'PENDING'
                  ? 'pending'
                  : peerDetail.isReal.state === 'REJECTED'
                  ? 'rejected'
                  : 'verified';

              return (
                <Box key={index} onClick={() => handleDetailsPage(info.id)}>
                  <ResidentialInfoCard {...info} verificationStatus={verificationStatus} />
                </Box>
              );
            })}
        </Box>
      )}
      {residentialInfoData?.length > 0 && (
        <Button className="see-all-btn" onClick={handleToggleResidentialDetails}>
          See All
        </Button>
      )}
    </section>
  );
};
