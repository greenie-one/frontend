import React from 'react';
import { createStyles, getStylesRef, Title, Text, em, rem, Box } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { LandingSectionHeading } from './SectionHeading';

import documentVerified from '../../assets/images/document-verified.svg';
import clock from '../../assets/images/clock.svg';
import liveTracking from '../../assets/images/live-tracking.svg';
import dataControll from '../../assets/images/data-controll.svg';
import dataControllMobile from '../../assets/images/data-controll-mobile.svg';

type FeaturesCardPropsType = {
  id: string;
  cardBg: string;
  title: string;
  titleColor: string;
  text: string;
  textColor: string;
  illustrationSmall: string;
  illustrationLarge: string;
};

const FeaturesCard: React.FC<FeaturesCardPropsType> = ({
  id,
  cardBg,
  title,
  titleColor,
  text,
  textColor,
  illustrationSmall,
  illustrationLarge,
}): JSX.Element => {
  const { classes } = useStyles();

  return (
    <Box sx={{ backgroundColor: cardBg }} className={classes.featuresCard}>
      <Title sx={{ color: titleColor }} order={2} className={classes.featuresCardTitle}>
        {title}
      </Title>
      <Text sx={{ color: textColor }} className={classes.featuresCardText}>
        {text}
      </Text>
      <span className={`${classes.featuresCardIllustration} ${id}`}>
        <img
          src={illustrationSmall}
          alt="illustration"
          className={classes.featuresCardIllustrationSmall}
        />
        <img
          src={illustrationLarge}
          alt="illustration"
          className={classes.featuresCardIllustrationLarge}
        />
      </span>
    </Box>
  );
};

const featuresCardContent = [
  {
    id: randomId(),
    cardBg: '#17A672',
    title: '"Doc Depot" Your Professional Document Locker.',
    titleColor: '#FFFFFF',
    text: 'Your Data Is Safe With Us, We Have Locked It Up With Blockchain Encryption And Handed You The Keys.',
    textColor: '#FFFFFF',
    illustrationSmall: documentVerified,
    illustrationLarge: documentVerified,
  },
  {
    id: randomId(),
    cardBg: '#47DAA4',
    title: 'Speedy Onboarding.',
    titleColor: '#FFFFFF',
    text: "Greenie Provides HR's With 100% Verified Candidates Using State-Of-The Art Technology. Just Crack Interview, Finalize Salary And Join.",
    textColor: '#FFFFFF',
    illustrationSmall: clock,
    illustrationLarge: clock,
  },
  {
    id: randomId(),
    cardBg: '#85D1B5',
    title: ' Create, Upload and Share Documents.',
    titleColor: '#FFFFFF',
    text: "Greenie's Contract Creation Tool Creates Rock Solid Contracts Or Upload An Existing Contract For Seamless Sharing.",
    textColor: '#FFFFFF',
    illustrationSmall: liveTracking,
    illustrationLarge: liveTracking,
  },
  {
    id: randomId(),
    cardBg: '#A0E2E1',
    title: 'Instantly Verify All Documents At Once.',
    titleColor: '#310805',
    text: ' Verify Identity, Income, Experience And Skills Under 100 Seconds.',
    textColor: '#191819',
    illustrationSmall: dataControllMobile,
    illustrationLarge: dataControll,
  },
];

export const LandingFeatures = () => {
  const { classes } = useStyles();

  return (
    <section className={`${classes.root} section`}>
      <LandingSectionHeading heading={"It's Super Simple With Greenie"} subheading={''} />
      <Box className={classes.featureGrid}>
        {featuresCardContent.map((cardContent, id) => {
          return (
            <FeaturesCard
              key={cardContent.id}
              id={`landingFeaturesIllustration${id}`}
              cardBg={cardContent.cardBg}
              title={cardContent.title}
              titleColor={cardContent.titleColor}
              text={cardContent.text}
              textColor={cardContent.textColor}
              illustrationSmall={cardContent.illustrationSmall}
              illustrationLarge={cardContent.illustrationLarge}
            />
          );
        })}
        <Box className={classes.manyMore}>...and many more</Box>
      </Box>
    </section>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '3rem',
  },

  featureGrid: {
    marginBlockStart: '0.5rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(8, 5rem)',
    gap: '1rem',
    zIndex: -1,

    [`@media screen and (max-width: ${em(992)})`]: {
      display: 'block',
    },
  },

  featuresCard: {
    padding: '2rem',
    borderRadius: '1rem',
    position: 'relative',

    [`@media screen and (max-width: ${em(992)})`]: {
      marginBlock: '1.5rem',
    },

    [`@media screen and (max-width: ${em(540)})`]: {
      minHeight: rem(300),
    },

    [`@media screen and (max-width: ${em(480)})`]: {
      padding: '1.5rem',
    },

    ':nth-of-type(1)': {
      gridColumn: '1/4',
      gridRow: '1/5',
      marginBlock: 0,

      [`& .${getStylesRef('featuresCardText')}`]: {
        maxWidth: '30ch',

        [`@media screen and (max-width: ${em(480)})`]: {
          maxWidth: '100%',
        },
      },
    },

    ':nth-of-type(2)': {
      gridColumn: '4/6',
      gridRow: '1/5',
    },

    ':nth-of-type(3)': {
      gridColumn: '1/3',
      gridRow: '5/9',
    },

    ':nth-of-type(4)': {
      gridColumn: '3/6',
      gridRow: '5/8',

      [`& .${getStylesRef('featuresCardText')}`]: {
        maxWidth: '25ch',

        [`@media screen and (max-width: ${em(480)})`]: {
          maxWidth: '100%',
        },
      },
    },
  },

  featuresCardTitle: {
    fontSize: '2rem',
    lineHeight: '1.1',

    ':nth-of-type(1)': {
      maxWidth: '20ch',
    },

    ':nth-of-type(4)': {
      maxWidth: '20ch',
    },

    [`@media screen and (max-width: ${em(1120)})`]: {
      fontSize: '1.8rem',
    },

    [`@media screen and (max-width: ${em(768)})`]: {
      fontSize: '1.65rem',
    },

    [`@media screen and (max-width: ${em(540)})`]: {
      fontSize: '1.5rem',
    },

    [`@media screen and (max-width: ${em(480)})`]: {
      fontSize: '1.35rem',
    },

    [`@media screen and (max-width: ${em(350)})`]: {
      fontSize: '1.25rem',
    },
  },

  featuresCardText: {
    ref: getStylesRef('featuresCardText'),

    fontSize: '0.9rem',
    maxWidth: '20ch',
    marginBlockStart: '1rem',

    [`@media screen and (max-width: ${em(480)})`]: {
      fontSize: '0.85rem',
      marginBlockStart: '0.75rem',
      maxWidth: '100%',
    },

    [`@media screen and (max-width: ${em(350)})`]: {
      fontSize: '0.825rem',
    },
  },

  featuresCardIllustration: {
    position: 'absolute',
    right: '2rem',
  },

  featuresCardIllustrationSmall: {
    display: 'none',

    [`@media screen and (max-width: ${em(992)})`]: {
      display: 'block',
    },
  },

  featuresCardIllustrationLarge: {
    [`@media screen and (max-width: ${em(992)})`]: {
      display: 'none',
    },
  },

  manyMore: {
    gridColumn: '3/6',
    gridRow: '8/9',
    paddingInline: '2rem',
    display: 'grid',
    placeItems: 'center',
    borderRadius: '1rem',
    border: '2px solid #17A672',
    backgroundColor: '#FFFFFF',
    color: '#17A672',
    fontWeight: 700,
    fontSize: '1.75rem',

    [`@media screen and (max-width: ${em(640)})`]: {
      fontSize: '1.6rem',
      borderRadius: '0.75rem',
    },

    [`@media screen and (max-width: ${em(480)})`]: {
      fontSize: '1.35rem',
      borderRadius: '0.5rem',
    },
  },
}));
