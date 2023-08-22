import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  createStyles,
  Flex,
  List,
  Drawer,
  em,
  rem,
  Menu,
  Divider,
  Group,
  Text,
  Modal,
  Button,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, useLocation } from 'react-router-dom';
import { MdVerified, MdOutlineMenuOpen, MdOutlineClose } from 'react-icons/md';
import { AiOutlineBell, AiFillCaretDown } from 'react-icons/ai';
import emptyProfile from '../assets/emptyProfile.png';
import { BiUserCircle } from 'react-icons/bi';
import { RiSettings3Line } from 'react-icons/ri';
import { MdExitToApp, MdOutlineLiveHelp, MdOutlineLock } from 'react-icons/md';
import { showLoadingNotification, showSuccessNotification } from '../../../../utils/functions/showNotification';
import { useGlobalContext } from '../../../../context/GlobalContext';
import noNotification from '../assets/noNotifications.png';
import { confirmationModalStyle } from '../../../settings/styles/articleContentStyles';

export const HRNavbar = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { authClient, profileData } = useGlobalContext();
  const { classes: modalStyles } = confirmationModalStyle();
  const [opened, { open, close }] = useDisclosure(false);

  const removeAuthTokens = () => {
    showLoadingNotification({ title: 'Signing Out', message: 'Please wait while we sign you out' });

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

  const handleConfirmation = () => {
    close();
    removeAuthTokens();
  };

  const location = useLocation();
  const currentUrl = location.pathname + location.search;
  const isProfileSettingsPage = currentUrl === '/candidate/profile/settings';

  const drawerReducer = (state: DrawerState, action: DrawerAction): DrawerState => {
    switch (action.type) {
      case 'OPEN_FIRST_DRAWER':
        return {
          ...state,
          firstDrawerOpened: true,
        };
      case 'CLOSE_FIRST_DRAWER':
        return {
          ...state,
          firstDrawerOpened: false,
        };
      case 'OPEN_SECOND_DRAWER':
        return {
          ...state,
          secondDrawerOpened: true,
        };
      case 'CLOSE_SECOND_DRAWER':
        return {
          ...state,
          secondDrawerOpened: false,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(drawerReducer, {
    firstDrawerOpened: false,
    secondDrawerOpened: false,
  });

  return (
    <header>
      <Modal
        title="Confirmation"
        padding="xl"
        radius="lg"
        size="lg"
        centered
        classNames={modalStyles}
        onClose={close}
        opened={opened}
      >
        <Box className={modalStyles.confirmationMsgWrapper}>
          <Text className={modalStyles.confirmationMsg}>Are you sure you want to sign out?</Text>

          <Box className={modalStyles.modalBtnsContainer}>
            {[
              { variant: 'filled', text: 'Confirm', action: handleConfirmation },
              { variant: 'outline', text: 'Cancel', action: close },
            ].map((btns, idx) => (
              <Button
                key={idx}
                className={modalStyles.modalActionBtns}
                onClick={btns.action}
                size="sm"
                type="button"
                radius="xl"
                variant={btns.variant}
                color="teal"
              >
                {btns.text}
              </Button>
            ))}
          </Box>
        </Box>
      </Modal>
      <Box className="navbar">
        <Box className="nav-container">
          <Link to={'/'} className="logo">
            <span className="greenie">Greenie</span>
            <span className="nav-verified">
              <MdVerified size={'20px'} color="#9fe870" />
            </span>
          </Link>
          <Box className="right-section">
            <Menu trigger="hover" position="bottom-end">
              <Menu.Target>
                <Group className="bell-icon-box">
                  <AiOutlineBell size={'22px'} className="bell-icon" />
                </Group>
              </Menu.Target>
              <Menu.Dropdown className="notification-drop-down">
                <Box className="no-notification-box">
                  <img src={noNotification} alt="" />
                  <Text className="no-notification-text">Coming soon</Text>
                </Box>
              </Menu.Dropdown>
            </Menu>
            <Menu trigger="hover" position="bottom-end">
              <Menu.Target>
                {profileData?.profilePic ? (
                  <Group>
                    <img className="profile-picture" src={profileData?.profilePic} alt="Profile Piture" />
                    <AiFillCaretDown className="down-arrow-icon" />
                  </Group>
                ) : (
                  <Group>
                    <img className="profile-picture" src={emptyProfile} alt="Profile Piture" />
                    <AiFillCaretDown className="down-arrow-icon" />
                  </Group>
                )}
              </Menu.Target>
              <Menu.Dropdown className="profile-dropdown-menu">
                <List className="navOptionsList">
                  <li className="navOptionItems">
                    <span className="navOptionsIcon">
                      <BiUserCircle />
                    </span>
                    <span className="navOptionsText">View Profile</span>
                  </li>

                  <li className="navOptionItems">
                    <span className="navOptionsIcon">
                      <RiSettings3Line />
                    </span>
                    <span className="navOptionsText">Settings</span>
                  </li>
                  <li className="navOptionItems">
                    <span className="navOptionsIcon">
                      <MdOutlineLiveHelp />
                    </span>
                    <span className="navOptionsText">Help</span>
                  </li>
                  <Divider className="divider" my={'1rem'} />
                  <button className="navOptionItems" onClick={open}>
                    <span className="navOptionsIcon">
                      <MdExitToApp />
                    </span>
                    <span className="navOptionsText">Sign Out</span>
                  </button>
                </List>
              </Menu.Dropdown>
            </Menu>

            {!state.firstDrawerOpened && !isProfileSettingsPage && (
              <span className={classes.menuOpenBtn}>
                <MdOutlineMenuOpen role="button" onClick={() => dispatch({ type: 'OPEN_FIRST_DRAWER' })} />
              </span>
            )}

            {!state.secondDrawerOpened && isProfileSettingsPage && (
              <span className={classes.menuOpenBtn}>
                <MdOutlineMenuOpen role="button" onClick={() => dispatch({ type: 'OPEN_SECOND_DRAWER' })} />
              </span>
            )}
          </Box>
        </Box>
      </Box>

      <Drawer
        opened={state.firstDrawerOpened}
        onClose={() => dispatch({ type: 'CLOSE_FIRST_DRAWER' })}
        withCloseButton={false}
        position="right"
        size="80%"
      >
        <nav className={classes.mobileNavOptionsContainer} onClick={() => dispatch({ type: 'CLOSE_FIRST_DRAWER' })}>
          <Flex justify="space-between" align="center" direction="row">
            <span className={classes.navHeading}>Profile</span>
            <span className={classes.menuCloseBtn}>
              <MdOutlineClose role="button" onClick={() => dispatch({ type: 'CLOSE_FIRST_DRAWER' })} />
            </span>
          </Flex>
          <List className={classes.navOptionsList}>
            <li className={classes.navOptionItems}>
              <span className={classes.navOptionsIcon}>
                <BiUserCircle />
              </span>
              <span className={classes.navOptionsText}>View Profile</span>
            </li>

            <li className={classes.navOptionItems}>
              <span className={classes.navOptionsIcon}>
                <RiSettings3Line />
              </span>
              <span className={classes.navOptionsText}>Settings</span>
            </li>
            <li className={classes.navOptionItems}>
              <span className={classes.navOptionsIcon}>
                <MdOutlineLiveHelp />
              </span>
              <span className={classes.navOptionsText}>Help</span>
            </li>
          </List>
          <Divider className="divider" />
          <button className={classes.signOutBtn} onClick={open}>
            <span className={classes.signOut}>
              <MdExitToApp />
            </span>
            <span className={classes.signOutText}>Sign Out</span>
          </button>
        </nav>
      </Drawer>

      <Drawer
        opened={state.secondDrawerOpened}
        onClose={() => dispatch({ type: 'CLOSE_SECOND_DRAWER' })}
        withCloseButton={false}
        position="right"
        size="100%"
      >
        <nav className={classes.mobileNavOptionsContainer}>
          <Flex justify="space-between" align="center" direction="row" className={classes.logo}>
            <Box>
              <Link to={'/'}>
                <span className={classes.mobileGreenie}>Greenie</span>
                <span className={classes.mobileVerified}>
                  <MdVerified />
                </span>
              </Link>
            </Box>
            {profileData?.profilePic ? (
              <Box className="drawer-right-section">
                <AiOutlineBell size={'22px'} className="bell-icon" />
                <img className="profile-picture" src={profileData?.profilePic} alt="Profile Piture" />
              </Box>
            ) : (
              <Box className="drawer-right-section">
                <AiOutlineBell size={'22px'} className="bell-icon" />

                <img className="profile-picture" src={emptyProfile} alt="Profile Piture" />
              </Box>
            )}

            <span className={classes.menuCloseBtn}>
              <MdOutlineClose role="button" onClick={() => dispatch({ type: 'CLOSE_SECOND_DRAWER' })} />
            </span>
          </Flex>
          <Box onClick={() => dispatch({ type: 'CLOSE_SECOND_DRAWER' })}>
            <List className={classes.navOptionsList}>
              <li className={classes.navOptionItems}>
                <span className={classes.navOptionsIcon2}>
                  <BiUserCircle />
                </span>
                <span className={classes.navOptionsText}>Profile</span>
              </li>
              <li className={classes.navOptionItems}>
                <span className={classes.navOptionsIcon2}>
                  <RiSettings3Line />
                </span>
                <span className={classes.navOptionsText}>General</span>
              </li>
              <li className={classes.navOptionItems}>
                <span className={classes.navOptionsIcon2}>
                  <MdOutlineLock />
                </span>
                <span className={classes.navOptionsText}>Privacy</span>
              </li>
            </List>
            <Divider className="divider" />
            <button className={classes.signOutBtn} onClick={open}>
              <span className={classes.signOut}>
                <MdExitToApp />
              </span>
              <span className={classes.signOutText}>Sign Out</span>
            </button>
          </Box>
        </nav>
      </Drawer>
    </header>
  );
};

const useStyles = createStyles(() => ({
  logo: {
    paddingInline: '2rem',
    paddingBlock: '1rem',
  },

  mobileGreenie: {
    color: '#000000',
    fontFamily: 'Gilroy-Bold !important',
    fontSize: rem(20),
  },

  mobileVerified: {
    color: '#9FE870',
    marginLeft: '5px',
    fontSize: rem(20),
  },
  menuOpenBtn: {
    display: 'none',
    [`@media screen and (max-width: ${em(768)})`]: {
      display: 'block',
      marginLeft: '12px',
    },
  },
  mobileNavOptionsContainer: {
    display: 'none',

    [`@media screen and (max-width: ${em(768)})`]: {
      position: 'absolute',
      inset: '0',
      height: '100dvh',
      width: '100%',
      background: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      paddingBlock: '1.5rem',
      paddingInline: '2.5rem',
    },

    [`@media screen and (max-width: ${em(540)})`]: {
      paddingInline: '2rem',
      paddingBlock: '1rem',
    },
  },

  navHeading: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '24px',
    letterSpacing: '-0.02em',
    color: '#282828',
  },

  menuCloseBtn: {
    fontSize: rem(20),
    color: '#697082',
  },

  navOptionsList: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: rem(6),
  },

  navOptionItems: {
    color: '#697082',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
    paddingInline: em(8),
    paddingBlock: em(8),
    borderRadius: em(8),
    transition: 'background 150ms linear',

    ['&:hover']: {
      background: '#F5F5F5',
    },
  },

  navOptionsIcon: {
    color: 'inherit',
    display: 'grid',
    placeItems: 'center',
    fontSize: rem(20),
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    background: '#F5F5F5',
  },

  navOptionsIcon2: {
    color: 'inherit',
    display: 'grid',
    placeItems: 'center',
    fontSize: rem(25),
    height: '40px',
    width: '40px',
  },

  navOptionsText: {
    color: 'inherit',
    fontSize: rem(15),
    fontWeight: 500,
  },

  signOut: {
    color: 'inherit',
    display: 'grid',
    placeItems: 'center',
    fontSize: rem(20),
    height: '50px',
    width: '50px',
    borderRadius: '50%',
    background: '#F5F5F5',
  },

  signOutBtn: {
    width: '100%',
    color: '#697082',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '8px',
    paddingInline: em(15),
    paddingBlock: em(12),
    borderRadius: em(8),
    transition: 'background 150ms linear',
    border: '2px solid #ffffff',

    ['&:hover']: {
      background: '#f5f5f5',
    },
  },

  signOutText: {
    color: 'inherit',
    fontSize: rem(15),
    fontWeight: 500,
  },
}));
