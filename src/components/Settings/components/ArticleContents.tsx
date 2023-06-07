import React from 'react';
import { ProfileSettings } from './ProfileSettings';
import { GeneralSettings } from './GeneralSettings';
import { PrivacySettings } from './PrivacySettings';

import { articleContentStyles } from '../styles/articleContentStyles';

interface IArticleContentPropsType {
  showDetailsId: number;
}

export const ArticleContent: React.FC<IArticleContentPropsType> = ({
  showDetailsId,
}): JSX.Element => {
  const { classes } = articleContentStyles();

  return (
    <>
      <article className={classes.settingsArticleContent}>
        {showDetailsId === 0 ? <ProfileSettings /> : null}
        {showDetailsId === 1 ? <GeneralSettings /> : null}
        {showDetailsId === 2 ? <PrivacySettings /> : null}
      </article>
    </>
  );
};
