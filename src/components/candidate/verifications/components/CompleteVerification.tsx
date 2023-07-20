import { Text, Box, Title, createStyles, em, rem, getStylesRef } from '@mantine/core';
import { Link } from 'react-router-dom';
import { featuresCardContent } from '../constants/FeaturesContent';

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
        <img src={illustrationSmall} alt="illustration" className={classes.featuresCardIllustrationSmall} />
        <img src={illustrationLarge} alt="illustration" className={classes.featuresCardIllustrationLarge} />
      </span>
    </Box>
  );
};

export const CompleteVerification = () => {
  const { classes } = useStyles();

  return (
    <main className="profile">
      <Box className="container">
        <Box className="verification-feature-box">
          <Title className="title">Thanks for taking time and verifying</Title>
          <Text className="text">Your insights helps with keep Greenie updated and profiles verified</Text>
          <Text className="question-text">Greenie is a one stop platform for all verifications.</Text>
          <Text className="question-text">Give it a try</Text>
          <Link to={'/auth'}>
            <Text className="policy">Create an account</Text>
          </Link>

          <section id="features" className={`${classes.root} section`}>
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
        </Box>
      </Box>
    </main>
  );
};

const useStyles = createStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '0rem',
  },

  featureGrid: {
    marginTop: '-3rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(7, 5rem)',
    gap: '1rem',
    zIndex: 1,

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
      minHeight: rem(260),
    },

    [`@media screen and (max-width: ${em(540)})`]: {
      minHeight: rem(300),
    },

    [`@media screen and (max-width: ${em(480)})`]: {
      padding: '1.5rem',
    },

    ':nth-of-type(1)': {
      gridColumn: '1/4',
      gridRow: '1/4',
      marginBlock: 0,

      [`& .${getStylesRef('featuresCardText')}`]: {
        maxWidth: '25ch !important',

        [`@media screen and (max-width: ${em(480)})`]: {
          maxWidth: '100%',
        },
      },
    },

    ':nth-of-type(2)': {
      gridColumn: '4/6',
      gridRow: '1/4',
    },

    ':nth-of-type(3)': {
      gridColumn: '1/3',
      gridRow: '4/8',
    },

    ':nth-of-type(4)': {
      gridColumn: '3/6',
      gridRow: '4/7',

      [`& .${getStylesRef('featuresCardText')}`]: {
        maxWidth: '25ch',

        [`@media screen and (max-width: ${em(992)})`]: {
          maxWidth: '30ch',
        },

        [`@media screen and (max-width: ${em(480)})`]: {
          maxWidth: '100%',
        },
      },
    },
  },

  featuresCardTitle: {
    fontSize: '1.6rem',
    lineHeight: '1.1',

    ':nth-of-type(1)': {
      maxWidth: '20ch',

      [`@media screen and (max-width: ${em(992)})`]: {
        maxWidth: '30ch',
      },
    },

    ':nth-of-type(4)': {
      maxWidth: '20ch',

      [`@media screen and (max-width: ${em(992)})`]: {
        maxWidth: '30ch',
      },
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
    maxWidth: '45ch !important',
    marginBlockStart: '1rem',

    [`@media screen and (max-width: ${em(992)})`]: {
      maxWidth: '30ch',
    },

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
    gridRow: '7/8',
    paddingInline: '2rem',
    display: 'grid',
    placeItems: 'center',
    borderRadius: '1rem',
    border: '2px solid #17A672',
    backgroundColor: '#FFFFFF',
    color: '#17A672',
    fontWeight: 700,
    fontSize: '1.5rem',

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
