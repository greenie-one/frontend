import { ProfileSettings } from './ProfileSettings';
import { GeneralSettings } from './GeneralSettings';
import { PrivacySettings } from './PrivacySettings';
import { useSettingsContext } from '../context/SettingsContext';

import { articleContentStyles } from '../styles/articleContentStyles';

export const ArticleContent = ({}): JSX.Element => {
  const { classes } = articleContentStyles();
  const { showDetailsId } = useSettingsContext();

  return (
    <>
      <article className={classes.settingsArticleContent}>
        {showDetailsId === 0 && <ProfileSettings />}
        {showDetailsId === 1 && <GeneralSettings />}
        {showDetailsId === 2 && <PrivacySettings />}
      </article>
    </>
  );
};
