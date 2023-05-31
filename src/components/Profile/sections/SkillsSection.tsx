import { useEffect, useState } from 'react';
import { Text, Box, Button, Modal } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import '../styles/global.scss';
import noData from '../assets/noData.png';
import { SkillsCard } from '../components/SkillsCard';
import { Link } from 'react-router-dom';
import { MdOutlineEdit } from 'react-icons/md';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { SkillModal } from '../components/SkillModal';
import { useProfileContext } from '../context/ProfileContext';
import axios from 'axios';
import ApiList from '../../../assets/api/ApiList';

interface ISkillDataType {
  createdAt: string;
  designation: string;
  isVerified: boolean;
  skillRate: number;
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
}

export const SkillsSection = () => {
  const screenSize = useMediaQuery('(min-width: 990px)');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);

  const [skillData, setSkillData] = useState<ISkillDataType[]>([]);

  const { authTokens } = useProfileContext();

  const getSkills = async () => {
    try {
      const res = await axios.get(ApiList.skill, {
        headers: {
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });

      if (res.data && authTokens?.accessToken) {
        setSkillData(res.data);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const runGetSkills = async () => {
      await getSkills();
    };

    runGetSkills();
  }, [authTokens]);

  return (
    <section className="skills-section container">
      <Modal
        className="modal"
        size={'65%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={close}
        title="Add Skills"
      >
        <SkillModal closeModal={close} getSkillsFn={getSkills} />
      </Modal>
      <Box className="header">
        <Box>
          <Text className="heading">{`Skills (${skillData.length})`}</Text>
          <Text className="subheading">All government IDs, personal verification IDs etc.</Text>
        </Box>
        <Box className="header-links">
          {skillData.length > 0 && (
            <Link className="link" to={'/'}>
              See all documents
            </Link>
          )}

          <Button leftIcon={<MdOutlineEdit />} onClick={open} className="edit-btn">
            Edit Section
          </Button>
        </Box>
      </Box>

      {skillData.length === 0 ? (
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
          styles={{ control: { display: 'none' } }}
          breakpoints={[
            { maxWidth: 'sm', slideSize: '80%' },
            { maxWidth: 'md', slideSize: '50%' },
          ]}
        >
          {skillData.map((skill: any, id) => {
            return (
              <Carousel.Slide key={id}>
                <SkillsCard
                  skill={skill.designation}
                  percentage={skill.skillRate / 5}
                  isVerified={skill.isVerified}
                />
              </Carousel.Slide>
            );
          })}
        </Carousel>
      )}
      {skillData.length > 0 && <Button className="see-all-btn">See All</Button>}
    </section>
  );
};
