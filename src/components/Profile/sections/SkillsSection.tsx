import {
  Text,
  Box,
  Button,
  Modal,
  createStyles,
  em,
  rem,
  Select,
  TextInput,
  Title,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import '../styles/global.scss';
import noData from '../assets/noData.png';
import { SkillsCard } from '../components/SkillsCard';
import { MdOutlineEdit } from 'react-icons/md';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { useProfileContext } from '../context/ProfileContext';
import { AiOutlinePlus } from 'react-icons/ai';

const skillRate = [
  { value: '0', label: 'Amature' },
  { value: '1', label: 'Intermediate' },
  { value: '2', label: 'Expert' },
];

export const SkillsSection = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const { classes: inputClasses } = inputStyles();
  const { skillForm, detailsPage, dispatchDetailsPage } = useProfileContext();

  const { skillData, addSkill } = useProfileContext();

  const handleToggleSkillsDetails = (): void => {
    dispatchDetailsPage({
      type: 'SET_SEE_ALL_SKILLS',
      payload: !detailsPage.seeAllSkills,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addSkill();
    close();
  };

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
        <form onSubmit={handleSubmit}>
          <Box className="input-section border-bottom">
            <Title className="title">Skill name</Title>
            <TextInput
              withAsterisk
              data-autofocus
              label="Eg. Frontend, Backend"
              classNames={inputClasses}
              {...skillForm.getInputProps('designation')}
            />
          </Box>
          <Box className="input-section border-bottom">
            <Title className="title">Expertise</Title>
            <Select
              withAsterisk
              data={skillRate}
              label="Select your expertise"
              classNames={inputClasses}
              {...skillForm.getInputProps('skillRate')}
            />
          </Box>
          <Box className="location-wrapper">
            <Box className="btn-wrapper">
              <Button color="teal" type="submit">
                Save
              </Button>
              <Button type="button" variant="default" onClick={close}>
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
      <Box className="header">
        <Box>
          <Text className="heading">{`Skills (${skillData.length})`}</Text>
          <Text className="subheading">All government IDs, personal verification IDs etc.</Text>
        </Box>
        {skillData.length > 0 && (
          <>
            <Box className="header-links">
              <Text className="link" onClick={handleToggleSkillsDetails}>
                See all documents
              </Text>
              <Button leftIcon={<MdOutlineEdit />} onClick={open} className="edit-btn">
                Edit Section
              </Button>
            </Box>
            <Box className="edit-icon" onClick={open}>
              <MdOutlineEdit size={'22px'} className="btn" />
            </Box>
          </>
        )}
      </Box>

      {skillData.length === 0 ? (
        <Box className="no-data-wrapper">
          <img className="no-data" src={noData} alt="No data" />
          <Button leftIcon={<AiOutlinePlus />} onClick={open} className="add-records">
            Add records
          </Button>
        </Box>
      ) : (
        <Carousel
          withIndicators={false}
          slideSize="33.33%"
          slideGap={24}
          loop={false}
          slidesToScroll={1}
          align="start"
          styles={{ control: { display: 'none' } }}
          breakpoints={[
            { maxWidth: 'sm', slideSize: '80%' },
            { maxWidth: 'md', slideSize: '50%' },
          ]}
        >
          {skillData.reverse().map(({ designation, skillRate, isVerified }, id) => {
            return (
              <Carousel.Slide key={id}>
                <SkillsCard skill={designation} skillRate={skillRate} isVerified={isVerified} />
              </Carousel.Slide>
            );
          })}
        </Carousel>
      )}
      {skillData.length > 0 && (
        <Button onClick={handleToggleSkillsDetails} className="see-all-btn">
          See All
        </Button>
      )}
    </section>
  );
};

const inputStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    marginTop: '10px',
    marginBottom: '10px',
  },

  input: {
    height: '58px',
    paddingTop: '18px',
    fontSize: '16px',
    fontWeight: 500,
    borderRadius: '8px',
    border: '1px solid #D1D4DB',
    lineHeight: '19px',
    letterSpacing: '-0.02em',
    color: '#697082',

    [`@media screen and (max-width: ${em(1024)})`]: {
      height: '46px',
      borderRadius: '6px',
      fontSize: '10px',
      lineHeight: '12px',
      margin: '0 auto',
    },
  },

  innerInput: {
    height: rem(54),
    paddingTop: rem(28),

    [`@media screen and (max-width: ${em(1024)})`]: {
      paddingTop: rem(8),
    },
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: '12px',
    paddingLeft: '14px',
    paddingTop: '7px',
    lineHeight: '14.52px',
    letterSpacing: '-0.02em',
    zIndex: 1,
    color: '#697082',

    [`@media screen and (max-width: ${em(1024)})`]: {
      fontSize: '10px',
      lineHeight: '10px',
      paddingTop: '8px',
    },
  },
}));
