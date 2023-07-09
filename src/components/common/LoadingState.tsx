import React from 'react';
import { createStyles, keyframes, rem } from '@mantine/core';

const getLoadingElements = (elementClass: string): JSX.Element[] => {
  const loadingElementsList = [];

  for (let i = 0; i < 12; i++) {
    loadingElementsList.push(<div className={elementClass}></div>);
  }

  return loadingElementsList;
};

const loadingAnimation = keyframes({
  '0%, 20%, 80%, 100%': {
    transform: 'scale(1)',
  },
  '50%': {
    transform: 'scale(1.5)',
  },
});

export const LoadingState: React.FC = (): JSX.Element => {
  const { classes } = useStyles();
  const loadingElements = getLoadingElements(classes.loadingElements);

  return (
    <div className={classes.loadingOverlay}>
      <div className={classes.loadingContainer}>
        {loadingElements.map((element, id) => (
          <React.Fragment key={id}>{element}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

const useStyles = createStyles((theme) => ({
  loadingOverlay: {
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100%',
    minHeight: '100dvh',
    background: 'hsl(300 2% 10% / 0.25)',
    display: 'grid',
    placeItems: 'center',
  },

  loadingContainer: {
    display: 'inline-block',
    position: 'relative',
    aspectRatio: '1',
    width: rem(80),
  },

  loadingElements: {
    position: 'absolute',
    aspectRatio: '1',
    width: rem(6),
    borderRadius: '50%',
    background: '#17A672',
    animation: `${loadingAnimation} 1.2s linear infinite`,

    ':nth-of-type(1)': {
      animationDelay: '0s',
      top: rem(37),
      left: rem(66),
    },

    ':nth-of-type(2)': {
      animationDelay: '-0.1s',
      top: rem(22),
      left: rem(62),
    },

    ':nth-of-type(3)': {
      animationDelay: '-0.2s',
      top: rem(11),
      left: rem(52),
    },

    ':nth-of-type(4)': {
      animationDelay: '-0.3s',
      top: rem(7),
      left: rem(37),
    },

    ':nth-of-type(5)': {
      animationDelay: '-0.4s',
      top: rem(11),
      left: rem(22),
    },

    ':nth-of-type(6)': {
      animationDelay: '-0.5s',
      top: rem(22),
      left: rem(11),
    },

    ':nth-of-type(7)': {
      animationDelay: '-0.6s',
      top: rem(37),
      left: rem(7),
    },

    ':nth-of-type(8)': {
      animationDelay: '-0.7s',
      top: rem(52),
      left: rem(11),
    },

    ':nth-of-type(9)': {
      animationDelay: '-0.8s',
      top: rem(62),
      left: rem(22),
    },

    ':nth-of-type(10)': {
      animationDelay: '-0.9s',
      top: rem(66),
      left: rem(37),
    },

    ':nth-of-type(11)': {
      animationDelay: '1s',
      top: rem(62),
      left: rem(52),
    },

    ':nth-of-type(12)': {
      animationDelay: '1.1s',
      top: rem(52),
      left: rem(62),
    },
  },
}));
