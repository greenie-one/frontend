import { createStyles, Title, Text, rem, Box, Flex, em } from '@mantine/core';
import { _2ColumnLayout } from '../layouts/_2ColumnLayout';
import hiringDocuments from '../../assets/images/Landing/hiring-documents.png';
import cap from '../../assets/images/Landing/cap.svg';
import { MdVerified } from 'react-icons/md';

export const LandingHiring: React.FC = (): JSX.Element => {
  const { classes } = useStyles();

  return (
    <section className={`section ${classes.root}`}>
      <_2ColumnLayout>
        <Box className={''}>
          <Title order={1} className={classes.hiringTitle}>
            We make hiring super simple.
            <Flex
              justify="center"
              align="center"
              direction="row"
              className={classes.verifiedTextContainer}
            >
              <span className={classes.verified}>
                <MdVerified />
              </span>
              <span className={classes.verifiedText}>Verified</span>
              <span className={classes.capIconContainer}>
                <img src={cap} alt="cap" className={''} />
              </span>
            </Flex>
          </Title>
          <Text className={classes.hiringText}>
            Greenie's mission is to instill trust in the hiring process by verifying both candidates
            and companies. Our platform creates value for companies by allowing HR teams to access
            verification reports instantly, eliminating weeks of waiting. Simultaneously, we empower
            candidates by giving them total control over their personal data, democratizing
            verifications for all
          </Text>
        </Box>
        <Box className={classes.hiringIllustration}>
          <span className={classes.hiringImageContainer}>
            <img src={hiringDocuments} alt="hiringDocuments" className={''} />
          </span>
        </Box>
      </_2ColumnLayout>
    </section>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    alignItems: 'start',
    marginBlockEnd: '-6rem',
    marginBlockStart: '7.5rem',

    ['&.section']: {
      paddingBlockEnd: 0,
    },
  },

  hiringTitle: {
    fontSize: '2.5rem',
    // width: "max-content",

    position: 'relative',
    zIndex: -1,

    // [`@media screen and (max-width: ${em(1280)})`]: {
    //   textAlign: "center",
    //   marginInline: "auto",
    // },

    [`@media screen and (max-width: ${em(1120)})`]: {
      fontSize: rem(35),
    },

    [`@media screen and (max-width: ${em(768)})`]: {
      fontSize: rem(32),
    },

    [`@media screen and (max-width: ${em(480)})`]: {
      fontSize: rem(26),
      // width: "auto",
    },

    [`@media screen and (max-width: ${em(350)})`]: {
      fontSize: rem(26),
    },
  },

  verifiedTextContainer: {
    fontSize: '1.8rem',
    color: '#17A672',
    gap: '0.15rem',
    position: 'absolute',
    top: 0,
    left: '7rem',
    transform: 'translateY(-80%)',

    [`@media screen and (max-width: ${em(1120)})`]: {
      fontSize: '1.6rem',
      left: '6.25rem',
    },

    [`@media screen and (max-width: ${em(768)})`]: {
      fontSize: '1.4rem',
      left: '5.75rem',
    },

    [`@media screen and (max-width: ${em(480)})`]: {
      fontSize: '1.3rem',
      left: '4.5rem',
    },

    // [`@media screen and (max-width: ${em(426)})`]: {
    //   fontSize: '1.3rem',
    //   left: `calc(32% - 0dvw)`,
    // },

    [`@media screen and (max-width: ${em(350)})`]: {
      fontSize: '1.25rem',
    },
  },

  verified: {
    transform: 'translateY(-2px)',
    zIndex: -1,
  },

  verifiedText: {},

  capIconContainer: {
    display: 'inline-grid',
    placeItems: 'center',
    width: rem(20),
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%) translateY(4.75rem)',

    [`@media screen and (max-width: ${em(1120)})`]: {
      transform: 'translateX(-50%) translateY(4.5rem)',
    },

    [`@media screen and (max-width: ${em(540)})`]: {
      transform: 'translateX(-50%) translateY(4rem)',
    },

    [`@media screen and (max-width: ${em(480)})`]: {
      width: rem(17.5),
      transform: 'translateX(-50%) translateY(3.25rem)',
    },

    [`@media screen and (max-width: ${em(426)})`]: {
      width: rem(16),
      transform: 'translateX(-50%) translateY(3rem)',
    },

    [`@media screen and (max-width: ${em(350)})`]: {
      width: rem(15),
    },
  },

  hiringText: {
    fontSize: rem(17),
    marginBlockStart: '1.75rem',
    marginBlockEnd: '1.25rem',
    maxWidth: '40ch',

    [`@media screen and (max-width: ${em(1280)})`]: {
      textAlign: 'center',
      marginInline: 'auto',
      maxWidth: '80ch',
    },

    [`@media screen and (max-width: ${em(480)})`]: {
      fontSize: rem(15),
      marginBlockStart: '1.35rem',
    },

    [`@media screen and (max-width: ${em(320)})`]: {
      marginBlockStart: '1rem',
    },
  },

  hiringIllustration: {
    zIndex: -1,
    transform: `translateY(${rem(-80)})`,
  },

  hiringImageContainer: {
    aspectRatio: '1',
    display: 'grid',
    placeItems: 'center',
    marginInlineStart: 'auto',
    position: 'relative',
  },
}));
