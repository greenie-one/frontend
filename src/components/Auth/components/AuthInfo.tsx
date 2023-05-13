import { Title, Text, Box, createStyles, rem, em, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';
import { MdVerified } from 'react-icons/md';
import testimonialImg from '../assets/testimonialImg.png';
import '../styles/authInfo.scss';

export const AuthInfo = () => {
  const { classes } = useStyles();

  return (
    <>
      <div className="logo">
        <Link to={'/'}>
          <span className="greenie">Greenie</span>
          <span>
            <MdVerified className="verified" />
          </span>
        </Link>
      </div>
      <Title className="authInfoHeading">Welcome to Greenie, your professional community </Title>
      <Text className="authInfoText">
        Our background verification app delivers reliable and comprehensive screening solutions,
        enabling you to make informed decisions with confidence. Trust and safety are guaranteed
        with our accurate and efficient background checks.
      </Text>
      <Box className="authInfoTestimonialBox">
        <Text className="testimonialHeading">
          Trust and safety are guaranteed with our accurate and efficient background checks.
        </Text>
        <Box className="testimonialImageBox">
          <Box className="testimonialImage">
            <img src={testimonialImg} alt="testimonial img" />
          </Box>
          <Box className="testimonialNameBox">
            <Text className="testimonialName">Arthur Morgan</Text>
            <Text className="testimonialHandle">@arthurmorgan</Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  authLeftText: {
    fontWeight: 400,
    fontSize: '0.95rem',
    lineHeight: rem(22),
    color: '#FFFFFF',
    marginBottom: '2rem',

    [`@media screen and (max-width: ${em(1024)})`]: {
      display: 'none',
    },
  },
  authLeftTestimonial: {
    background: '#FFFFFF',
    boxShadow: ' 0px 4px 34px rgba(0, 0, 0, 0.1)',
    borderRadius: rem(20),
    padding: '1.25rem',
    [`@media screen and (max-width: ${em(1024)})`]: {
      display: 'none',
    },
  },
  testimonial: {
    display: 'grid',
    gridTemplateColumns: '0.15fr 0.75fr',
  },
  testimonialHeading: {
    fontSize: '1rem',
    fontWeight: 400,
    marginBottom: '1rem',
  },
  testimonialImage: {
    borderRadius: rem(20),
    height: '89px',
    width: '85px',
  },
  testimonialTextBox: {
    fontSize: '0.75rem',
    marginLeft: '1rem',
    marginTop: '0.5rem',
    color: '#697082',
  },
}));
