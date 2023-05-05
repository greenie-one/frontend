import React, { useState } from 'react';
import { createStyles, Title, Text, Box, em, rem, keyframes } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { LandingSectionHeading } from './SectionHeading';
import { Button } from '../common/Button';

import workingIllustration1 from '../../assets/images/account-circle.png';
import workingIllustration2 from '../../assets/images/demography-1.png';
import workingIllustration3 from '../../assets/images/demography-2.png';
import workingIllustration4 from '../../assets/images/demography-3.png';

type WorkingsCardPropsType = {
  cardBg: string;
  title: string;
  titleColor: string;
  text: string;
  textColor: string;
  illustration: string;
};

const slideUp = keyframes({
  from: { translate: '0 25%' },
  to: { translate: '0 0' },
});

const WorkingsCard: React.FC<WorkingsCardPropsType> = ({
  cardBg,
  title,
  titleColor,
  text,
  textColor,
  illustration,
}): JSX.Element => {
  const { classes } = useStyles();

  return (
    <Box sx={{ backgroundColor: cardBg }} className={classes.workingsCard}>
      <Title sx={{ color: titleColor }} order={2} className={classes.workingsCardTitle}>
        {title}
      </Title>
      <Text sx={{ color: textColor }} className={classes.workingsCardText}>
        {text}
      </Text>
      <span className={classes.workingIllustration}>
        <img src={illustration} alt="illustration" className={''} />
      </span>
    </Box>
  );
};

const workingsCardContent = [
  {
    id: randomId(),
    cardBg: '#D8FFF1',
    title: 'Creating a greenie account is easier that boiling an egg.',
    titleColor: '#17A672',
    text: 'Instantly create an account with email ID. Verify it using Adhaar, Pan or a Driving License. Get a unique Greenie ID.  You are Sorted.',
    textColor: '#191819',
    illustration: workingIllustration1,
  },
  {
    id: randomId(),
    cardBg: '#A1FFDD',
    title: 'Upload & verify documents without getting reminder calls',
    titleColor: '#17A672',
    text: "Securely Upload documents on Doc-Depot and verify them using Greene\'s unique automation in real time.",
    textColor: '#191819',
    illustration: workingIllustration2,
  },
  {
    id: randomId(),
    cardBg: '#4BE4AD',
    title: 'Verify With Peers.',
    titleColor: '#018454',
    text: 'Take a Skill Test or verify skills by seamlessly collaborating with ex-HR\'s, colleagues or line managers and keep all verifications organized through Greenie\'s unique interface',
    textColor: '#191819',
    illustration: workingIllustration3,
  },
  {
    id: randomId(),
    cardBg: '#17A672',
    title: 'Own And Share Your Verification Report.',
    titleColor: '#A1FFDD',
    text: 'Share your verified documents with anyone, anywhere and anytime. Keep your Greenie ID handy for quick and easy sharing',
    textColor: '#FFFFFF',
    illustration: workingIllustration4,
  },
];

export const LandingGreenieWorkings = () => {
  const { classes } = useStyles();

  const [activeWorkingBtn, setActiveWorkingBtn] = useState<number>(0);

  return (
    <section className={`${classes.root} section`}>
      <LandingSectionHeading heading={'The Greenie Journey'} subheading={''} />
      <Box className={classes.workingsBtnContainer}>
        {['1. Create Greenie Account', '2. Verify Documents', '3. Send or Receive Request', '4. Share ID'].map(
          (text, id) => {
            return (
              <Button
                key={id}
                variant={'outline'}
                classNames={`${classes.workingsBtn} ${
                  activeWorkingBtn === id ? classes.activeWorkingBtn : ''
                }`}
                outline={activeWorkingBtn === id}
                onClick={() => setActiveWorkingBtn(id)}
              >
                {text}
              </Button>
            );
          }
        )}
      </Box>
      <Box className={classes.workingCardsContainer}>
        {workingsCardContent.map((cardContent, id) => {
          return activeWorkingBtn >= id ? (
            <WorkingsCard
              key={cardContent.id}
              cardBg={cardContent.cardBg}
              title={cardContent.title}
              titleColor={cardContent.titleColor}
              text={cardContent.text}
              textColor={cardContent.textColor}
              illustration={cardContent.illustration}
            />
          ) : (
            <React.Fragment key={id}></React.Fragment>
          );
        })}
      </Box>
    </section>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '2rem',
  },

  workingsBtnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',

    [`@media screen and (max-width: ${em(992)})`]: {
      columnGap: '4rem',
      rowGap: '1rem',
      display: 'grid',
      gridTemplateColumns: 'max-content max-content',
    },

    [`@media screen and (max-width: ${em(480)})`]: {
      columnGap: '2rem',
    },

    [`@media screen and (max-width: ${em(480)})`]: {
      columnGap: '0.5rem',
    },
  },

  workingsBtn: {
    transition: 'border-color 100ms linear, color 150ms linear',
    fontSize: rem(14.5),

    ':hover': {
      border: '1px solid #17A672',
      color: '#17A672',
      transition: 'border-color 100ms linear, color 100ms linear',
    },

    ':nth-of-type(1)': {
      [`@media screen and (max-width: ${em(992)})`]: {
        marginInlineEnd: 'auto',
      },
    },

    ':nth-of-type(2)': {
      [`@media screen and (max-width: ${em(992)})`]: {
        marginInlineStart: 'auto',
      },
    },

    ':nth-of-type(3)': {
      [`@media screen and (max-width: ${em(992)})`]: {
        marginInlineEnd: 'auto',
      },
    },

    ':nth-of-type(4)': {
      [`@media screen and (max-width: ${em(992)})`]: {
        marginInlineStart: 'auto',
      },
    },

    [`@media screen and (max-width: ${em(480)})`]: {
      paddingInline: '0.75rem !important',
      paddingBlock: '0.5rem !important',
      fontSize: rem(12.5),
    },
  },

  activeWorkingBtn: {
    border: '1px solid #17A672',
    color: '#17A672',
  },

  workingCardsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridAutoRows: '1fr',
    marginBlockStart: '1rem',
  },

  workingsCard: {
    padding: '3rem',
    borderRadius: '2rem',
    marginInline: 'auto',
    gridRow: '1/2',
    gridColumn: '1/2',
    zIndex: -1,
    animation: `${slideUp} 500ms ease`,
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gridTemplateRows: 'max-content max-content',
    gap: '1rem',

    [`@media screen and (max-width: ${em(992)})`]: {
      padding: '2rem',
      borderRadius: '1.33rem',
    },

    [`@media screen and (max-width: ${em(640)})`]: {
      padding: '1.5rem',
      borderRadius: '1rem',
    },

    [`@media screen and (max-width: ${em(480)})`]: {
      padding: '1.25rem',
      rowGap: '0.5rem',
      columnGap: '1rem',
    },

    ':nth-of-type(1)': {
      width: '85%',
    },

    ':nth-of-type(2)': {
      width: '90%',
      transform: 'translateY(10%)',
    },

    ':nth-of-type(3)': {
      width: '95%',
      transform: 'translateY(20%)',
    },

    ':nth-of-type(4)': {
      width: '100%',
      transform: 'translateY(30%)',
    },
  },

  workingsCardTitle: {
    fontSize: '2.25dvw',
    lineHeight: '1.1',
    maxWidth: '17ch',
    gridColumn: '1/2',
    

    [`@media screen and (max-width: ${em(768)})`]: {
      fontSize: rem(18),
    },

    [`@media screen and (max-width: ${em(480)})`]: {
      gridColumn: '1/3',
      maxWidth: '100%',
    },
  },

  workingsCardText: {
    fontSize: '0.9rem',
    maxWidth: '40ch',
    gridColumn: '1/2',

    [`@media screen and (max-width: ${em(768)})`]: {
      fontSize: '0.875rem',
      lineHeight: '1.3',
    },

    [`@media screen and (max-width: ${em(540)})`]: {
      fontSize: '0.85rem',
    },

    [`@media screen and (max-width: ${em(414)})`]: {
      fontSize: '0.8rem',
    },
  },

  workingIllustration: {
    display: 'grid',
    placeItems: 'center',
    aspectRatio: '1',
    width: '15dvw',
    alignSelf: 'center',
    gridColumn: '2/3',
    gridRow: '1/3',

    [`@media screen and (max-width: ${em(768)})`]: {
      width: rem(120),
    },

    [`@media screen and (max-width: ${em(480)})`]: {
      gridRow: '2/3',
      width: rem(90),
    },
  },
}));
