import { sidebarStyles } from '../styles/sidebarStyles';
import { Box, List } from '@mantine/core';
import { BiUserCircle } from 'react-icons/bi';
import { RiSettings3Line } from 'react-icons/ri';
import { MdExitToApp, MdOutlineLock } from 'react-icons/md';
import { useSettingsContext } from '../context/SettingsContext';
import { useGlobalContext } from '../../../context/GlobalContext';
import { showLoadingNotification, showSuccessNotification } from '../../../utils/functions/showNotification';
import { useNavigate } from 'react-router-dom';
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
  const { authClient } = useGlobalContext();
  const navigate = useNavigate();

  const removeAuthTokens = () => {
    showLoadingNotification({
      title: 'Signing Out',
      message: 'Please wait while we sign you out',
    });

    setTimeout(() => {
      authClient.deleteTokens();
      navigate('/auth');
    }, 600);

    setTimeout(() => {
      showSuccessNotification({
        title: 'Signed Out !',
        message: 'You have been successfully signed out',
      });
    }, 1100);
  };

  return (
    <>
      <Box className={classes.settingsSidebar}>
        <List className={classes.settingOptionsList}>
          {settingsOptionsList.map((option, index) => (
            <li
              key={index}
              className={`${classes.settingOptionItems} ${showDetailsId === index ? classes.activeOptionItems : null}`}
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
