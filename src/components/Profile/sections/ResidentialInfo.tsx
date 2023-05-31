import { useEffect, useState } from 'react';
import { Text, Box, Button, Modal } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { MdOutlineEdit } from 'react-icons/md';
import '../styles/global.scss';
import noData from '../assets/noData.png';
import { ResidentialInfoCard } from '../components/ResidentialInfoCard';
import { Link } from 'react-router-dom';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { ResidentialInfoModal } from '../components/ResidentialInfoModal';
import { useProfileContext } from '../context/ProfileContext';
import axios from 'axios';
import ApiList from '../../../assets/api/ApiList';

export const ResidentialInfo = () => {
  const screenSize = useMediaQuery('(min-width: 990px)');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);

  const [residentialInfoData, setResidentialInfoData] = useState([]);
  const { authTokens } = useProfileContext();

  const getResidentialInfo = async () => {
    try {
      const res = await axios.get(ApiList.residentialInfo, {
        headers: {
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });

      if (res.data && authTokens?.accessToken) {
        setResidentialInfoData(res.data.residentialInfo);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const runGetResidentialInfo = async () => {
      await getResidentialInfo();
    };

    runGetResidentialInfo();
  }, [authTokens]);

  return (
    <section className="residential-info container">
      <Modal
        className="modal"
        size={'65%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={close}
        title="Add residential information"
      >
        <ResidentialInfoModal closeModal={close} getResidentialInfoFn={getResidentialInfo} />
      </Modal>
      <Box className="header">
        <Box>
          <Text className="heading">{`Residential Information (${residentialInfoData.length})`}</Text>
          <Text className="subheading">All government IDs, personal verification IDs etc.</Text>
        </Box>
        {residentialInfoData.length > 0 ? (
          <Box className="header-links">
            <Link className="link" to={'/'}>
              See all addresses
            </Link>
            <Button leftIcon={<MdOutlineEdit />} onClick={open} className="edit-btn">
              Edit Section
            </Button>
          </Box>
        ) : (
          <Box></Box>
        )}
      </Box>

      {residentialInfoData.length === 0 ? (
        <Box className="no-data-wrapper">
          {' '}
          <img className="no-data" src={noData} alt="No data" />
        </Box>
      ) : (
        <Carousel
          withIndicators={false}
          slideSize="33.30%"
          slideGap={24}
          loop={false}
          slidesToScroll={screenSize ? 0 : 1}
          align="start"
          styles={{ control: { display: 'none' } }}
          breakpoints={[
            { maxWidth: 'xs', slideSize: '80%' },
            { maxWidth: 'md', slideSize: '50%' },
          ]}
        >
          {residentialInfoData.map(({ id, address, tenure, isVerified }) => {
            return (
              <Carousel.Slide key={id}>
                <ResidentialInfoCard address={address} tenure={tenure} isVerified={isVerified} />
              </Carousel.Slide>
            );
          })}
        </Carousel>
      )}
      {residentialInfoData.length > 0 && <Button className="see-all-btn">See All</Button>}
    </section>
  );
};
