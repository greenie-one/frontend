import { Text, Box, Button, Modal } from '@mantine/core';
import noData from '../assets/noData.png';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import markC from '../assets/markC.png';
import { MdOutlineEdit } from 'react-icons/md';
import tscLogo from '../assets/tscLogo.png';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import '../styles/global.scss';
import { WorkExperienceCard } from '../components/WorkExperienceCard';
import { WorkExperienceModal } from '../components/WorkExperienceModal';
import { useProfileContext } from '../context/ProfileContext';
import axios from 'axios';
import ApiList from '../../../assets/api/ApiList';
import { useLocalStorage } from '@mantine/hooks';

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

interface WorkExperience {
  image: string | null;
  designation: string;
  email: string;
  companyName: string;
  companyId: string;
  isVerified: boolean;
  description: string;
  companyStartYear: string;
  companyEndYear: string;
  verifiedBy: string | null;
}

export const Experience = () => {
  const screenSize = useMediaQuery('(min-width: 990px)');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const [authTokens, setAuthTokens] = useLocalStorage<AuthTokens>({ key: 'auth-tokens' });
  const [workExperienceData, setWorkExperienceData] = useState<WorkExperience[]>([]);

  const getWorkExperience = async () => {
    try {
      const res = await axios.get(ApiList.workExperience, {
        headers: {
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });
      if (res.data && authTokens?.accessToken) {
        setWorkExperienceData(res.data);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getWorkExperience();
  }, []);

  const [data, setData] = useState([
    {
      id: 1,
      position: 'Software Engineering',
      companyLogo: tscLogo,
      companyName: 'Tata Consultancy Services',
      isVerified: true,
      tenure: '2017-2020(3y 4m)',
      verifierName: 'Mark C.',
      verifierImg: markC,
      verifierTestimonial:
        "Superb! I'm rather impressed by John's great mindset for a startup. I will follow his valuable advice for sure!! Thanks",
    },
    {
      id: 2,
      position: 'Software Engineering',
      companyLogo: tscLogo,
      companyName: 'Tata Consultancy Services',
      isVerified: true,
      tenure: '2017-2020(3y 4m)',
      verifierName: 'Mark C.',
      verifierImg: markC,
      verifierTestimonial:
        "Superb! I'm rather impressed by John's great mindset for a startup. I will follow his valuable advice for sure!! Thanks",
    },
    {
      id: 3,
      position: 'Software Engineering',
      companyLogo: tscLogo,
      companyName: 'Tata Consultancy Services',
      isVerified: true,
      tenure: '2017-2020(3y 4m)',
      verifierName: 'Mark C.',
      verifierImg: markC,
      verifierTestimonial:
        "Superb! I'm rather impressed by John's great mindset for a startup. I will follow his valuable advice for sure!! Thanks",
    },
  ]);
  return (
    <section className="experience-section container">
      <Modal
        className="modal"
        size={'65%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={close}
        title="Add work experience"
      >
        <WorkExperienceModal />
      </Modal>
      <Box className="header">
        <Box>
          <Text className="heading">{`Work Experience (${data.length})`}</Text>
          <Text className="subheading">All government IDs, personal verification IDs etc.</Text>
        </Box>
        {data.length > 0 ? (
          <Box className="header-links">
            <Link className="link" to={'/'}>
              See all experiences
            </Link>
            <Button leftIcon={<MdOutlineEdit />} onClick={open} className="edit-btn">
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
          slidesToScroll={screenSize ? 0 : 1}
          align="start"
          styles={{ control: { display: 'none' } }}
          breakpoints={[
            { maxWidth: 'xs', slideSize: '80%' },
            { maxWidth: 'md', slideSize: '50%' },
          ]}
        >
          {data.map(
            ({
              id,
              position,
              companyLogo,
              companyName,
              isVerified,
              tenure,
              verifierName,
              verifierImg,
              verifierTestimonial,
            }) => {
              return (
                <Carousel.Slide key={id}>
                  <WorkExperienceCard
                    position={position}
                    companyLogo={companyLogo}
                    companyName={companyName}
                    isVerified={isVerified}
                    tenure={tenure}
                    verifierName={verifierName}
                    verifierImg={verifierImg}
                    verifierTestimonial={verifierTestimonial}
                  />
                </Carousel.Slide>
              );
            }
          )}
        </Carousel>
      )}
      <Button className="see-all-btn">See All</Button>
    </section>
  );
};
