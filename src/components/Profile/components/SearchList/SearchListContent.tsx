import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import { GrStar } from 'react-icons/gr';

import dummyThumbnail from '../../assets/johnMarston.png';

interface ISearchListObject {
  createdAt: string;
  descriptionTags: string[];
  firstName: string;
  lastName: string;
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
  thumbnail: string | undefined;
  designation: string | undefined;
  rating: number | undefined;
  verified: boolean | undefined;
}

interface ISearchListContentType {
  results: ISearchListObject[];
  classes: any;
}

export const SearchResult: React.FC<ISearchListContentType> = ({ results, classes }): JSX.Element => {
  console.log(results);

  return (
    <ul className={classes.searchList}>
      {results.map((profile, idx) => {
        return (
          <Link to="/profile" key={idx}>
            <li className={classes.searchListItem}>
              <span className={classes.profileThumbnail}>
                <img
                  src={profile?.thumbnail || dummyThumbnail}
                  alt={profile.firstName}
                  className={classes.profileImg}
                />
              </span>
              <Box className={classes.profileDetails}>
                <span className={classes.profileName}>
                  {profile.firstName} {profile.lastName}
                </span>
                {profile.verified ? (
                  <span className={classes.verifiedIcon}>
                    <MdVerified color="#9FE870" />
                  </span>
                ) : null}
                {profile?.designation ? <Box className={classes.designation}>{'Software Developer'}</Box> : null}
              </Box>
              <span className={classes.rating}>
                {profile?.rating ? (
                  <>
                    <GrStar color="#17A672" className={classes.starIcon} />
                    {4.5}
                  </>
                ) : null}
              </span>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};
