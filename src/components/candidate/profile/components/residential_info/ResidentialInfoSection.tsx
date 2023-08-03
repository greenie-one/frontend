import { Text, Box, Button, Modal } from '@mantine/core';
import { MdOutlineEdit } from 'react-icons/md';
import noData from '../../assets/noData.png';
import { AiOutlinePlus } from 'react-icons/ai';
import { ResidentialInfoCard } from './ResidentialInfoCard';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { SearchBox } from './components/SearchBox';
import { useDisclosure } from '@mantine/hooks';

export const ResidentialInfoSection = () => {
  const navigate = useNavigate();
  const { residentialInfoData, scrollToTop } = useGlobalContext();

  const [searchModalOpened, { open: searchModalOpen, close: searchModalClose }] = useDisclosure(false);

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
      <Modal opened={searchModalOpened} onClose={searchModalClose}>
        <SearchBox innerComponent={false} />
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
              return (
                <Box key={index} onClick={() => handleDetailsPage(info.id)}>
                  <ResidentialInfoCard {...info} />
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
