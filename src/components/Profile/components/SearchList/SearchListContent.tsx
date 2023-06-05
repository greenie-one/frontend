import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import { GrStar } from 'react-icons/gr';

interface ISearchListObject {
  thumbnail: string;
  name: string;
  verified: boolean;
  designation: string;
  rating: number;
}

interface ISearchListContentType {
  results: ISearchListObject[];
  classes: any;
}

export const SearchResult: React.FC<ISearchListContentType> = ({
  results,
  classes,
}): JSX.Element => {
  console.log(results);

  return (
    <ul className={classes.searchList}>
      {results.map((profile, idx) => {
        return (
          <Link to="/profile" key={idx}>
            <li className={classes.searchListItem}>
              <span className={classes.profileThumbnail}>
                <img src={profile.thumbnail} alt={profile.name} className={classes.profileImg} />
              </span>
              <Box className={classes.profileDetails}>
                <span className={classes.profileName}>{profile.name}</span>
                {profile.verified ? (
                  <span className={classes.verifiedIcon}>
                    <MdVerified color="#9FE870" />
                  </span>
                ) : null}
                <Box className={classes.designation}>{profile.designation}</Box>
              </Box>
              <span className={classes.rating}>
                <GrStar color="#17A672" className={classes.starIcon} />
                {profile.rating}
              </span>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};
