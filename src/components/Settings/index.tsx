import React, { useState } from 'react';
import { Navbar } from '../Profile/sections/Navbar';
import { settingsStyles } from './styles/settingsStyles';
import { Sidebar } from './components/Sidebar';
import { ArticleContent } from './components/ArticleContents';

export const Settings: React.FC = (): JSX.Element => {
  const { classes } = settingsStyles();
  const [showDetailsId, setShowDetailsId] = useState<number>(0);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className={classes.settingsMain}>
        <div className={classes.settingsPageContainer}>
          <Sidebar showDetailsId={showDetailsId} setShowDetailsId={setShowDetailsId} />
          <ArticleContent showDetailsId={showDetailsId} />
        </div>
      </main>
    </>
  );
};
