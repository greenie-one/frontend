import { useState } from 'react';
import { Text, Box } from '@mantine/core';
import '../styles/global.scss';
import noData from '../assets/noData.png';
import { ResidentialInfoCard } from '../components/ResidentialInfoCard';
import { Link } from 'react-router-dom';

export const ResidentialInfo = () => {
  const [data, setData] = useState([
    {
      id: 1,
      address: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
      dates: '2017-2020(3y 4m)',
      verified: true,
    },
    {
      id: 2,
      address: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
      dates: '2017-2020(3y 4m)',
      verified: true,
    },
    {
      id: 3,
      address: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
      dates: '2017-2020(3y 4m)',
      verified: true,
    },
  ]);
  return (
    <Box className="container">
      <Box className="header">
        <Box>
          <Text className="heading">{`Residential Information (${data.length})`}</Text>
          <Text className="subheading">All government IDs, personal verification IDs etc.</Text>
        </Box>
        <Link className="link" to={'/'}>
          See all addresses
        </Link>
      </Box>

      {data.length === 0 ? (
        <Box className="no-data-wrapper">
          {' '}
          <img className="no-data" src={noData} alt="No data" />
        </Box>
      ) : (
        <Box>
          {data.map((i) => (
            <Box key={i.id} className="cards-wrapper">
              <ResidentialInfoCard />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
