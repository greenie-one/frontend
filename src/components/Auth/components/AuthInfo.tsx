import { Title, Text, Box, createStyles, rem, em, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';
import { MdVerified } from 'react-icons/md';

export const AuthInfo = () => {
  const { classes } = useStyles();

  return (
    <>
      <Flex direction="row" align="flex-start" justify="start">
        <Link to={'/'}>
          <span className={classes.greenie}>Greenie</span>
          <span className={classes.verified}>
            <MdVerified />
          </span>
        </Link>
      </Flex>
      <Title className={classes.authLeftHeading}>
        Welcome to Greenie, your professional community{' '}
      </Title>
      <Text className={classes.authLeftText}>
        Our background verification app delivers reliable and comprehensive screening solutions,
        enabling you to make informed decisions with confidence. Trust and safety are guaranteed
        with our accurate and efficient background checks.
      </Text>
      <Box className={classes.authLeftTestimonial}>
        <Text className={classes.testimonialHeading}>
          Trust and safety are guaranteed with our accurate and efficient background checks.
        </Text>
        <Box className={classes.testimonial}>
          <Box className={classes.testimonialImage}></Box>
          <Box className={classes.testimonialTextBox}>
            <Text>Arthur Morgan</Text>
            <Text>@arthurmorgan</Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  greenie: {
    fontSize: rem(22.5),
    fontWeight: 700,
    color: '#FFFFFF',

    [`@media screen and (max-width: ${em(1024)})`]: {
      display: 'none',
    },
  },
  verified: {
    fontSize: rem(17),
    color: '#9FE870',
    marginInlineStart: '0.25rem',
    display: 'inline-grid',
    placeItems: 'center',
    transform: 'translateY(2px)',
    [`@media screen and (max-width: ${em(1024)})`]: {
      display: 'none',
    },
  },
  authLeftHeading: {
    fontSize: rem(45),
    lineHeight: rem(60),
    letterSpacing: em(-0.02),
    fontWeight: 700,
    color: '#FFFFFF',
    marginBottom: '1rem',

    [`@media screen and (max-width: ${em(1400)})`]: {
      fontSize: rem(40),
      lineHeight: rem(45),
    },
    [`@media screen and (max-width: ${em(1024)})`]: {
      color: '#191819',
      fontSize: rem(30),
      lineHeight: rem(40),
      margin: '0 auto',
      maxWidth: '414px',
    },
  },
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
    border: '2px solid black',
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
