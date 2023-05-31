import React, { useEffect, useMemo, useState } from 'react';
import { Box, createStyles, em, rem } from '@mantine/core';
import profileThumbnail from '../../assets/johnMarston.png';
import { SearchResult } from './SearchListContent';
import { NoResultContent } from './NoResultContent';
import axios from 'axios';
import ApiList from '../../../../assets/api/ApiList';
import { useProfileContext } from '../../context/ProfileContext';

const searchResults = [
  {
    thumbnail: profileThumbnail,
    name: 'John Doe',
    verified: true,
    designation: 'Software Engineer at Wipro',
    rating: 4.5,
  },
  {
    thumbnail: profileThumbnail,
    name: 'John Ive',
    verified: true,
    designation: 'Software Engineer at Wipro',
    rating: 3.5,
  },
  {
    thumbnail: profileThumbnail,
    name: 'John M.',
    verified: false,
    designation: 'Software Engineer at Wipro',
    rating: 0,
  },
  {
    thumbnail: profileThumbnail,
    name: 'John Jacob',
    verified: true,
    designation: 'Software Engineer at Wipro',
    rating: 1,
  },
  {
    thumbnail: profileThumbnail,
    name: 'John Ive',
    verified: true,
    designation: 'Software Engineer at Wipro',
    rating: 3.5,
  },
  {
    thumbnail: profileThumbnail,
    name: 'John M.',
    verified: false,
    designation: 'Software Engineer at Wipro',
    rating: 0,
  },
  {
    thumbnail: profileThumbnail,
    name: 'John Jacob',
    verified: true,
    designation: 'Software Engineer at Wipro',
    rating: 1,
  },
  { thumbnail: profileThumbnail, name: 'JCB', verified: true, designation: 'Pune', rating: 4.5 },
];

interface ISearchListPropsType {
  searchQuery: string;
  setShowSearchList: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchList: React.FC<ISearchListPropsType> = ({
  searchQuery,
  setShowSearchList,
}): JSX.Element => {
  const { classes } = useStyles();

  const [profilesData, setProfilesData] = useState([]);
  const [fetchingData, setFetchingData] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const { authTokens } = useProfileContext();

  const fetchProfiles = useMemo(
    () => async () => {
      try {
        const res = await axios.get(`${ApiList.searchProfile}${searchQuery}`, {
          headers: {
            Authorization: `Bearer ${authTokens?.accessToken}`,
          },
        });

        if (res.data) {
          console.log(res.data);
          setProfilesData(res.data);
          setError(false);
        }
      } catch (err: any) {
        console.log('Error in searching profile: ', err);
        setError(true);
      } finally {
        setFetchingData(false);
      }
    },
    [searchQuery, authTokens]
  );

  useEffect(() => {
    const runFetchProfile = async () => {
      await fetchProfiles();
    };

    runFetchProfile();
  }, [fetchProfiles]);

  if (fetchingData) {
    return <></>;
  }
  if (error) {
    return <NoResultContent />;
  }
  if (profilesData && profilesData.length === 0) {
    return <NoResultContent />;
  }

  return (
    <Box className={classes.searchListContainer}>
      <SearchResult classes={classes} results={profilesData} />
    </Box>
  );
};

const useStyles = createStyles((theme) => ({
  searchListContainer: {
    position: 'absolute',
    top: `calc(100% + ${rem(5)})`,
    display: 'grid',
    width: '150%',
    backgroundColor: '#FFFFFF',
    maxHeight: rem(350),
    overflowY: 'auto',
    borderRadius: '8px',
    padding: '0.25rem',
    boxShadow:
      '0px 45px 112px rgba(0, 0, 0, 0.06), 0px 22.7812px 48.825px rgba(0, 0, 0, 0.0405), 0px 9px 18.2px rgba(0, 0, 0, 0.03), 0px 1.96875px 6.475px rgba(0, 0, 0, 0.0195)',
    ['&::-webkit-scrollbar']: {
      width: '3px',
    },
    ['&::-webkit-scrollbar-track']: {
      backgroundColor: 'transparent',
    },
    ['&::-webkit-scrollbar-thumb']: {
      background: 'linear-gradient(180deg, hsl(158, 76%, 37%, 0.8) 0%, hsl(110, 80%, 71%) 100%)',
      borderRadius: '1.5rem',
    },
  },

  searchList: {
    display: 'grid',
    border: '1px solid hsl(0, 0%, 100%, 0.05)',
  },

  searchListItem: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    paddingBlock: '0.5rem',
    paddingInline: '0.5rem',

    ['&:hover']: {
      backgroundColor: '#F5F5F5',
    },
  },

  profileThumbnail: {
    aspectRatio: '1',
    width: rem(40),
    display: 'grid',
    placeItems: 'center',
    borderRadius: '50%',
    overflow: 'hidden',
  },

  profileImg: {
    aspectRatio: '1',
    width: rem(40),
  },

  profileDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '0.3rem',
    flex: '1',
  },

  profileName: {
    fontSize: rem(14),
    fontWeight: 500,
    whiteSpace: 'nowrap',
    maxWidth: '8ch',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  verifiedIcon: {
    fontSize: rem(15),
    display: 'grid',
    placeItems: 'center',
  },

  designation: {
    fontSize: rem(14),
    fontWeight: 400,
    whiteSpace: 'nowrap',
    color: '#697082',
    maxWidth: '18ch',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  rating: {
    width: rem(40),
    fontSize: rem(14),
    fontWeight: 500,
    color: '#697082',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },

  starIcon: {
    fontSize: rem(16),
  },
}));
