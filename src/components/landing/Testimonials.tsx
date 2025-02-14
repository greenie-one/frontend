import React from 'react';
import { createStyles, Title, Text, rem, Box, em } from '@mantine/core';

import { _2ColumnLayout } from '../layouts/_2ColumnLayout';
import testimonialIllustration from '../../assets/images/Landing/young-indian-manager.png';

export const LandingTestimonials: React.FC = (): JSX.Element => {
  const { classes } = useStyles();

  return (
    <>
      <section className={`section ${classes.root}`}>
        <_2ColumnLayout>
          <Box className={classes.testimonialContent}>
            <Title order={1} className={classes.testimonialTitle}>
              Happy Greenie Users
            </Title>
            <Text className={classes.testimonialText}>
              Select few users got a chance to test our beta version. They share their success stories of using Greenie
              and optimizing their hiring process.
            </Text>
          </Box>
          <Box className={classes.testimonialIllustration}>
            <span className={classes.testimonialImageContainer}>
              <img
                src={testimonialIllustration}
                alt="testimonialIllustration"
                className={classes.testimonialIllustrationImage}
              />
            </span>
          </Box>
        </_2ColumnLayout>
      </section>
    </>
  );
};

const useStyles = createStyles(() => ({
  root: {
    paddingBlockEnd: '0 !important',
  },

  testimonialContent: {
    marginBlockStart: '4rem',

    [`@media screen and (max-width: ${em(1280)})`]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
  },

  testimonialTitle: {
    fontSize: '2.5rem',

    [`@media screen and (max-width: ${em(1120)})`]: {
      fontSize: rem(35),
    },

    [`@media screen and (max-width: ${em(768)})`]: {
      fontSize: rem(32),
      textAlign: 'center',
    },

    [`@media screen and (max-width: ${em(480)})`]: {
      fontSize: rem(30),
    },

    [`@media screen and (max-width: ${em(350)})`]: {
      fontSize: rem(28),
    },
  },

  testimonialText: {
    fontSize: rem(17),
    marginBlockStart: '1.75rem',
    marginBlockEnd: '1.25rem',
    maxWidth: '50ch',

    [`@media screen and (max-width: ${em(1280)})`]: {
      textAlign: 'center',
    },

    [`@media screen and (max-width: ${em(768)})`]: {
      textAlign: 'center',
    },

    [`@media screen and (max-width: ${em(480)})`]: {
      fontSize: rem(15),
      marginBlockStart: '1.35rem',
    },

    [`@media screen and (max-width: ${em(320)})`]: {
      marginBlockStart: '1rem',
    },
  },

  testimonialIllustration: {},

  testimonialImageContainer: {
    display: 'grid',
    placeItems: 'center',
    marginInlineStart: 'auto',
    position: 'relative',

    [`@media screen and (max-width: ${em(480)})`]: {
      marginBlockStart: '-3rem',
    },
  },

  testimonialIllustrationImage: {
    height: '30rem',
    zIndex: -1,

    [`@media screen and (max-width: ${em(768)})`]: {
      height: '25rem',
    },

    [`@media screen and (max-width: ${em(480)})`]: {
      height: '20rem',
    },
  },
}));
