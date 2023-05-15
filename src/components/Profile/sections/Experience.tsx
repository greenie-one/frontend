import { useState } from 'react';
import { Text, Box } from '@mantine/core';
import '../styles/global.scss';
import noData from '../assets/noData.png';
import { WorkExperienceCard } from '../components/WorkExperienceCard';

export const Experience = () => {
  const [data, setData] = useState([]);
  return (
    <Box className="container">
      <Text className="heading">{`Work Experience (${data.length})`}</Text>
      <Text className="subheading">All government IDs, personal verification IDs etc.</Text>

      {data.length === 0 ? (
        <Box className="no-data-wrapper">
          {' '}
          <img className="no-data" src={noData} alt="No data" />
        </Box>
      ) : (
        <Box className="cards-wrapper">
          {data.map((i) => (
            <WorkExperienceCard />
          ))}
        </Box>
      )}
    </Box>
  );
};
