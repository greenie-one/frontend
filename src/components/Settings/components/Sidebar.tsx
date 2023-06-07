import React from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { sidebarStyles } from '../styles/sidebarStyles';

import { BiUserCircle } from 'react-icons/bi';
import { RiSettings3Line } from 'react-icons/ri';
import { MdExitToApp, MdOutlineLock } from 'react-icons/md';

const settingsOptionsList = [
  {
    icon: <BiUserCircle />,
    text: 'Profile',
  },
  {
    icon: <RiSettings3Line />,
    text: 'General',
  },
  {
    icon: <MdOutlineLock />,
    text: 'Privacy',
  },
];

interface ISidebarPropsType {
  showDetailsId: number;
  setShowDetailsId: React.Dispatch<React.SetStateAction<number>>;
}

export const Sidebar: React.FC<ISidebarPropsType> = ({
  showDetailsId,
  setShowDetailsId,
}): JSX.Element => {
  const { classes } = sidebarStyles();
  const [authTokens, setAuthTokens, removeAuthTokens] = useLocalStorage({ key: 'auth-tokens' });

  return (
    <>
      <aside className={classes.settingsSidebar}>
        <ul className={classes.settingOptionsList}>
          {settingsOptionsList.map((option, index) => (
            <li
              key={index}
              className={`${classes.settingOptionItems} ${
                showDetailsId === index ? classes.activeOptionItems : null
              }`}
              onClick={() => setShowDetailsId(index)}
            >
              <span className={classes.settingOptionsIcon}>{option.icon}</span>
              <span className={classes.settingOptionsText}>{option.text}</span>
            </li>
          ))}
        </ul>
        <button className={classes.signOutBtn} onClick={() => removeAuthTokens()}>
          <span className={classes.signOutIcon}>
            <MdExitToApp />
          </span>
          <span className={classes.signOutText}>Sign Out</span>
        </button>
      </aside>
    </>
  );
};
