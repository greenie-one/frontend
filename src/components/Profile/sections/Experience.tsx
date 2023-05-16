import { useState } from 'react';
import { Text, Box } from '@mantine/core';
import '../styles/global.scss';
import noData from '../assets/noData.png';
import { WorkExperienceCard } from '../components/WorkExperienceCard';
import { Link } from 'react-router-dom';
import markC from '../assets/markC.png';

export const Experience = () => {
  const [data, setData] = useState([
    {
      id: 1,
      position: 'Software Engineering',
      companyLogo: '',
      companyName: 'Tata Consultancy Services',
      verified: true,
      dates: '2017-2020(3y 4m)',
      verifierName: 'Mark C.',
      verifierImg: markC,
      verifierTestimonial:
        "Superb! I'm rather impressed by John's great mindset for a startup. I will follow his valuable advice for sure!! Thanks",
    },
    {
      id: 2,
      position: 'Software Engineering',
      companyLogo: '',
      companyName: 'Tata Consultancy Services',
      verified: true,
      dates: '2017-2020(3y 4m)',
      verifierName: 'Mark C.',
      verifierImg: markC,
      verifierTestimonial:
        "Superb! I'm rather impressed by John's great mindset for a startup. I will follow his valuable advice for sure!! Thanks",
    },
    {
      id: 3,
      position: 'Software Engineering',
      companyLogo: '',
      companyName: 'Tata Consultancy Services',
      verified: true,
      dates: '2017-2020(3y 4m)',
      verifierName: 'Mark C.',
      verifierImg: markC,
      verifierTestimonial:
        "Superb! I'm rather impressed by John's great mindset for a startup. I will follow his valuable advice for sure!! Thanks",
    },
  ]);
  return (
    <Box className="container">
      <Box className="header">
        <Box>
          <Text className="heading">{`Work Experience (${data.length})`}</Text>
          <Text className="subheading">All government IDs, personal verification IDs etc.</Text>
        </Box>
        <Link className="link" to={'/'}>
          See all experiences
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
              <WorkExperienceCard />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
