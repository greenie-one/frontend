import { useLocalStorage } from '@mantine/hooks';
import { sidebarStyles } from '../styles/sidebarStyles';
import { Box, List } from '@mantine/core';
import { BiUserCircle } from 'react-icons/bi';
import { RiSettings3Line } from 'react-icons/ri';
import { MdExitToApp, MdOutlineLock } from 'react-icons/md';
import { useSettingsContext } from '../context/SettingsContext';

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

export const Sidebar = (): JSX.Element => {
  const { classes } = sidebarStyles();
  const { showDetailsId, setShowDetailsId } = useSettingsContext();
  const [authTokens, setAuthTokens, removeAuthTokens] = useLocalStorage({ key: 'auth-tokens' });

  return (
    <>
      <Box className={classes.settingsSidebar}>
        <List className={classes.settingOptionsList}>
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
        </List>
        <button className={classes.signOutBtn} onClick={() => removeAuthTokens()}>
          <span className={classes.signOutIcon}>
            <MdExitToApp />
          </span>
          <span className={classes.signOutText}>Sign Out</span>
        </button>
      </Box>
    </>
  );
};
