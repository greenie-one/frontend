import { useState, useEffect } from 'react';
import { Text, Box, Button } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { MdOutlineEdit } from 'react-icons/md';
import '../styles/global.scss';
import noData from '../assets/noData.png';
import { ResidentialInfoCard } from '../components/ResidentialInfoCard';
import { Link } from 'react-router-dom';

export const ResidentialInfo = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const slidesToScroll = (): number => {
    if (screenWidth > 990) {
      return 0;
    }
    return 1;
  };
  const [data, setData] = useState([
    {
      id: 1,
      address: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
      tenure: '2017-2020(3y 4m)',
      isVerified: true,
    },
    {
      id: 2,
      address: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
      tenure: '2017-2020(3y 4m)',
      isVerified: true,
    },
    {
      id: 3,
      address: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
      tenure: '2017-2020(3y 4m)',
      isVerified: true,
    },
  ]);
  return (
    <section className="residential-info container">
      <Box className="header">
        <Box>
          <Text className="heading">{`Residential Information (${data.length})`}</Text>
          <Text className="subheading">All government IDs, personal verification IDs etc.</Text>
        </Box>
        {data.length > 0 ? (
          <Box className="header-links">
            <Link className="link" to={'/'}>
              See all addresses
            </Link>
            <Button leftIcon={<MdOutlineEdit />} className="edit-btn">
              Edit Section
            </Button>
          </Box>
        ) : (
          <Box></Box>
        )}
      </Box>

      {data.length === 0 ? (
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
          slidesToScroll={slidesToScroll()}
          align="start"
          styles={{ control: { opacity: 0 } }}
          breakpoints={[
            { maxWidth: 'xs', slideSize: '80%' },
            { maxWidth: 'md', slideSize: '50%' },
          ]}
        >
          {data.map(({ id, address, tenure, isVerified }) => {
            return (
              <Carousel.Slide key={id}>
                <ResidentialInfoCard address={address} tenure={tenure} isVerified={isVerified} />
              </Carousel.Slide>
            );
          })}
        </Carousel>
      )}
      <Button className="see-all-btn">See All</Button>
    </section>
  );
};
