import { Text, Box, Button } from '@mantine/core';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import { MdVerified, MdDelete } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import location from '../../assets/location.png';
import { useDisclosure } from '@mantine/hooks';
import { DeleteConfirmationModal } from '../../../../common/GenericModals';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { Navbar } from '../Navbar';
import { useNavigate } from 'react-router-dom';

export const AllResidentialInfo = () => {
  const { residentialInfoData, deleteResidentialInfo } = useGlobalContext();

  const [deleteModalOpened, { open: deleteModalOpen, close: deleteModalClose }] = useDisclosure(false);

  const navigate = useNavigate();

  const handleProfilePage = (): void => {
    navigate('/candidate/profile');
  };

  const handleGoToDetails = (id: string) => {
    navigate(`/candidate/profile/address/${id}`);
  };

  const handleAllAddressesScreen = () => {
    navigate('/candidate/profile/address/allAddresses');
  };

  const handleDeleteResidentialInfo = (_id: string): void => {
    deleteResidentialInfo(_id);
    deleteModalClose();
  };

  return (
    <>
      <Navbar />
      <main className="profile">
        <section className="container" style={{ marginTop: '7rem' }}>
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

          <Box className="residential-info-wrapper">
            {residentialInfoData.map((info, index) => {
              return (
                <Box className="residential-card" key={index} onClick={() => handleGoToDetails(info.residentialInfoId)}>
                  <Box className="top-box">
                    <Box className="location">
                      <img className="location=img" src={location} alt="Location" />
                    </Box>
                    <Box className="address-box">
                      <Box className="address">
                        {info.address_line_1}, {info.address_line_2}, {info.landmark}, {info.city} {info.pincode}
                      </Box>
                      {info.isVerified ? (
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
                  <Box className="card-footer">
                    <Box>
                      <Text className="since-text">Since</Text>
                      <Text className="tenure">
                        {info.start_date?.toString().substring(0, 4)} - {info.end_date?.toString().substring(0, 4)}
                      </Text>
                    </Box>

                    <Button
                      className="delete-btn"
                      onClick={(event) => {
                        event.stopPropagation();
                        deleteModalOpen();
                      }}
                    >
                      <MdDelete />
                    </Button>
                  </Box>
                  <DeleteConfirmationModal
                    opened={deleteModalOpened}
                    close={deleteModalClose}
                    cb={() => handleDeleteResidentialInfo(info.residentialInfoId)}
                  />
                </Box>
              );
            })}
          </Box>
        </section>
      </main>
    </>
  );
};
