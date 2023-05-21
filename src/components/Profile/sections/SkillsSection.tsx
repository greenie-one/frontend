import { useState, useEffect } from 'react';
import { Text, Box, Button } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import '../styles/global.scss';
import noData from '../assets/noData.png';
import { SkillsCard } from '../components/SkillsCard';
import { Link } from 'react-router-dom';
import { MdOutlineEdit } from 'react-icons/md';
import { useMediaQuery } from '@mantine/hooks';

export const SkillsSection = () => {
  const screenSize = useMediaQuery('(min-width: 990px)');

  const [data, setData] = useState([
    {
      id: 1,
      skill: 'Software Engineering',
      isVerified: true,
      percentage: 78,
    },
    {
      id: 2,
      skill: 'Software Engineering',
      isVerified: true,
      percentage: 78,
    },
    {
      id: 3,
      skill: 'Software Engineering',
      isVerified: true,
      percentage: 78,
    },
  ]);
  return (
    <section className="skills-section container">
      <Box className="header">
        <Box>
          <Text className="heading">{`Skills (${data.length})`}</Text>
          <Text className="subheading">All government IDs, personal verification IDs etc.</Text>
        </Box>
        {data.length > 0 ? (
          <Box className="header-links">
            <Link className="link" to={'/'}>
              See all experiences
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
          <img className="no-data" src={noData} alt="No data" />
        </Box>
      ) : (
        <Carousel
          withIndicators={false}
          slideSize="33.33%"
          slideGap={24}
          loop={false}
          slidesToScroll={screenSize ? 0 : 1}
          align="start"
          styles={{ control: { opacity: 0 } }}
          breakpoints={[
            { maxWidth: 'sm', slideSize: '80%' },
            { maxWidth: 'md', slideSize: '50%' },
          ]}
        >
          {data.map(({ skill, percentage, isVerified }, id) => {
            return (
              <Carousel.Slide key={id}>
                <SkillsCard skill={skill} percentage={percentage} isVerified={isVerified} />
              </Carousel.Slide>
            );
          })}
        </Carousel>
      )}
      <Button className="see-all-btn">See All</Button>
    </section>
  );
};
