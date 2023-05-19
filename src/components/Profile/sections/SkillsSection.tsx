import { useState, useEffect } from 'react';
import { Text, Box, Button } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import '../styles/global.scss';
import noData from '../assets/noData.png';
import { SkillsCard } from '../components/SkillsCard';
import { Link } from 'react-router-dom';
import { MdOutlineEdit } from 'react-icons/md';

export const SkillsSection = () => {
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
          slidesToScroll={slidesToScroll()}
          align="start"
          styles={{ control: { opacity: 0 } }}
          breakpoints={[
            { maxWidth: 'sm', slideSize: '80%' },
            { maxWidth: 'md', slideSize: '50%' },
          ]}
        >
          {data.map((skill, id) => {
            return (
              <Carousel.Slide key={id}>
                <SkillsCard
                  skill={skill.skill}
                  percentage={skill.percentage}
                  isVerified={skill.isVerified}
                />
              </Carousel.Slide>
            );
          })}
        </Carousel>
      )}
      <Button className="see-all-btn">See All</Button>
    </section>
  );
};
