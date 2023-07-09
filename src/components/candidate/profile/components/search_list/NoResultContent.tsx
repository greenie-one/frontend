import React from 'react';
import { Box, createStyles, rem } from '@mantine/core';
import noSearchData from '../../assets/noSearchData.png';

export const NoResultContent: React.FC = (): JSX.Element => {
  const { classes } = useStyles();

  return (
    <>
      <Box className={classes.NoResultContainer}>
        <span className={classes.noData}>
          <img src={noSearchData} alt="no-data" className={classes.noDataImg} />
        </span>
      </Box>
    </>
  );
};

const useStyles = createStyles(() => ({
  NoResultContainer: {
    position: 'absolute',
    top: `calc(100% + ${rem(5)})`,
    display: 'grid',
    placeItems: 'center',
    width: '150%',
    backgroundColor: '#FFFFFF',
    height: rem(300),
    borderRadius: '8px',
    boxShadow:
      '0px 45px 112px rgba(0, 0, 0, 0.06), 0px 22.7812px 48.825px rgba(0, 0, 0, 0.0405), 0px 9px 18.2px rgba(0, 0, 0, 0.03), 0px 1.96875px 6.475px rgba(0, 0, 0, 0.0195)',
  },

  noData: {
    aspectRatio: '1',
    display: 'grid',
    placeItems: 'center',
    width: rem(225),
  },

  noDataImg: {
    aspectRatio: '1',
    width: '100%',
    objectFit: 'contain',
  },
}));
