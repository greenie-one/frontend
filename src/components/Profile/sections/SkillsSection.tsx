import { useState } from 'react';
import { Text, Box } from '@mantine/core';
import '../styles/global.scss';
import noData from '../assets/noData.png';
import { SkillsCard } from '../components/SkillsCard';
import { Link } from 'react-router-dom';

export const SkillsSection = () => {
  const [data, setData] = useState([
    {
      id: 1,
      skillName: 'Software Engineering',
      verified: true,
      percentage: 78,
    },
    {
      id: 2,
      skillName: 'Software Engineering',
      verified: true,
      percentage: 78,
    },
    {
      id: 3,
      skillName: 'Software Engineering',
      verified: true,
      percentage: 78,
    },
  ]);
  return (
    <Box className="container">
      <Box className="header">
        <Box>
          <Text className="heading">{`Skills (${data.length})`}</Text>
          <Text className="subheading">All government IDs, personal verification IDs etc.</Text>
        </Box>
        <Link className="link" to={'/'}>
          See all skills
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
            <Box className="cards-wrapper" key={i.id}>
              <SkillsCard />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
