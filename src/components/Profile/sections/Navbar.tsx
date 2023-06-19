import { useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextInput, createStyles, Flex, List, Drawer, em, rem } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { MdVerified, MdOutlineMenuOpen, MdOutlineClose } from 'react-icons/md';
import { GoSearch } from 'react-icons/go';
import { AiOutlineBell, AiFillCaretDown } from 'react-icons/ai';
import JohnMarston from '../assets/johnMarston.png';
import { SearchList } from '../components/SearchList';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import { BiUserCircle } from 'react-icons/bi';
import { RiSettings3Line } from 'react-icons/ri';
import { MdExitToApp, MdOutlineLiveHelp, MdOutlineLock } from 'react-icons/md';
import { useSettingsContext } from '../../Settings/context/SettingsContext';
import { useProfileContext } from '../context/ProfileContext';
import { notifications } from '@mantine/notifications';
import { BsCheckLg } from 'react-icons/bs';

type DrawerState = {
  firstDrawerOpened: boolean;
  secondDrawerOpened: boolean;
};
type DrawerAction =
  | { type: 'OPEN_FIRST_DRAWER' }
  | { type: 'CLOSE_FIRST_DRAWER' }
  | { type: 'OPEN_SECOND_DRAWER' }
  | { type: 'CLOSE_SECOND_DRAWER' };

export const Navbar = () => {
  const { classes } = useStyles();
  const { classes: inputClasses } = inputStyles();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearchList, setShowSearchList] = useState<boolean>(false);
  const { setShowDetailsId } = useSettingsContext();
  const { isLoading, setIsLoading } = useProfileContext();
  const navigate = useNavigate();

  const removeAuthTokens = () => {
    setIsLoading(true);
    try {
      notifications.show({
        id: 'load-data',
        title: 'Signing Out',
        message: 'Please wait while we sign you out',
        loading: true,
        autoClose: false,
        withCloseButton: false,
        sx: { borderRadius: em(8) },
      });
      setTimeout(() => {
        localStorage.removeItem('auth-tokens');
        navigate('/auth');
      }, 600);

      setTimeout(() => {
        notifications.update({
          id: 'load-data',
          title: 'Signed Out',
          message: 'You have been successfully signed out',
          autoClose: 1200,
          withCloseButton: false,
          color: 'teal',
          icon: <BsCheckLg />,
          sx: { borderRadius: em(8) },
        });
      }, 1100);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const location = useLocation();
  const currentUrl = location.pathname + location.search;
  const isProfilePage = currentUrl === '/profile';
  const isProfileSettingsPage = currentUrl === '/profile/settings';
  let debouncedValue = useDebounce(searchQuery, 250);

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
      <nav className="navbar">
        <Link to={'/'} className="logo">
          <span className="greenie">Greenie</span>
          <span className="nav-verified">
            <MdVerified size={'20px'} color="#9fe870" />
          </span>
        </Link>
        <Box
          className="search"
          tabIndex={0}
          onFocus={() => setShowSearchList(true)}
          onBlur={() => setShowSearchList(false)}
        >
          <TextInput
            classNames={inputClasses}
            placeholder="Search"
            icon={<GoSearch />}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          {debouncedValue && showSearchList ? (
            <SearchList searchQuery={debouncedValue} setShowSearchList={setShowSearchList} />
          ) : null}
        </Box>
        <Box className="right-section">
          <AiOutlineBell size={'22px'} className="bell-icon" />
          <Link to={'/profile'}>
            <img className="profile-picture" src={JohnMarston} alt="Profile Piture" />
          </Link>

          <AiFillCaretDown />

          {!state.firstDrawerOpened && isProfilePage && (
            <span className={classes.menuOpenBtn}>
              <MdOutlineMenuOpen
                role="button"
                onClick={() => dispatch({ type: 'OPEN_FIRST_DRAWER' })}
              />
            </span>
          )}

          {!state.secondDrawerOpened && isProfileSettingsPage && (
            <span className={classes.menuOpenBtn}>
              <MdOutlineMenuOpen
                role="button"
                onClick={() => dispatch({ type: 'OPEN_SECOND_DRAWER' })}
              />
            </span>
          )}
        </Box>

        <Drawer
          opened={state.firstDrawerOpened}
          onClose={() => dispatch({ type: 'CLOSE_FIRST_DRAWER' })}
          withCloseButton={false}
          position="right"
          size="100%"
        >
          <nav
            className={classes.mobileNavOptionsContainer}
            onClick={() => dispatch({ type: 'CLOSE_FIRST_DRAWER' })}
          >
            <Flex justify="space-between" align="center" direction="row">
              <span className={classes.navHeading}>Profile</span>
              <span className={classes.menuCloseBtn}>
                <MdOutlineClose
                  role="button"
                  onClick={() => dispatch({ type: 'CLOSE_FIRST_DRAWER' })}
                />
              </span>
            </Flex>
            <List className={classes.navOptionsList}>
              <li>
                <Link to={'/profile'} className={classes.navOptionItems}>
                  <span className={classes.navOptionsIcon}>
                    <BiUserCircle />
                  </span>
                  <span className={classes.navOptionsText}>View Profile</span>
                </Link>
              </li>

              <li>
                <Link to={'/profile/settings'} className={classes.navOptionItems}>
                  <span className={classes.navOptionsIcon}>
                    <RiSettings3Line />
                  </span>
                  <span className={classes.navOptionsText}>Settings</span>
                </Link>
              </li>
              <li className={classes.navOptionItems}>
                <span className={classes.navOptionsIcon}>
                  <MdOutlineLiveHelp />
                </span>
                <span className={classes.navOptionsText}>Help</span>
              </li>
            </List>
            <button className={classes.signOutBtn} onClick={removeAuthTokens}>
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
              <Box className="drawer-right-section">
                <AiOutlineBell size={'22px'} className="bell-icon" />
                <img className="profile-picture" src={JohnMarston} alt="Profile Piture" />
              </Box>
              <span className={classes.menuCloseBtn}>
                <MdOutlineClose
                  role="button"
                  onClick={() => dispatch({ type: 'CLOSE_SECOND_DRAWER' })}
                />
              </span>
            </Flex>
            <Box onClick={() => dispatch({ type: 'CLOSE_SECOND_DRAWER' })}>
              <List className={classes.navOptionsList}>
                <li>
                  <Link
                    to={'/profile/settings'}
                    className={classes.navOptionItems}
                    onClick={() => setShowDetailsId(0)}
                  >
                    <span className={classes.navOptionsIcon2}>
                      <BiUserCircle />
                    </span>
                    <span className={classes.navOptionsText}>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/profile/settings'}
                    className={classes.navOptionItems}
                    onClick={() => setShowDetailsId(1)}
                  >
                    <span className={classes.navOptionsIcon2}>
                      <RiSettings3Line />
                    </span>
                    <span className={classes.navOptionsText}>General</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/profile/settings'}
                    className={classes.navOptionItems}
                    onClick={() => setShowDetailsId(2)}
                  >
                    <span className={classes.navOptionsIcon2}>
                      <MdOutlineLock />
                    </span>
                    <span className={classes.navOptionsText}>Privacy</span>
                  </Link>
                </li>
              </List>
              <button className={classes.signOutBtn} onClick={removeAuthTokens}>
                <span className={classes.navOptionsIcon2}>
                  <MdExitToApp />
                </span>
                <span className={classes.signOutText}>Sign Out</span>
              </button>
            </Box>
          </nav>
        </Drawer>
      </nav>
    </header>
  );
};

const inputStyles = createStyles((theme) => ({
  input: {
    background: '#F8F8F8',
    borderRadius: '90px',
    border: 'none',
    outline: 'none',
    width: '150%',
    height: '46px',
    color: '#A4A4A4',

    [`@media screen and (max-width: ${em(1024)})`]: {
      width: '125%',
    },
    [`@media screen and (max-width: ${em(830)})`]: {
      width: '100%',
    },
    [`@media screen and (max-width: ${em(768)})`]: {
      display: 'none',
    },
  },
}));

const useStyles = createStyles((theme) => ({
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

  mobileNavOptionsList: {
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'flex-start',
  },

  navOptionsList: {
    display: 'grid',
    gap: rem(6),
    paddingBlockEnd: '1rem',
    borderBottom: '1px solid #D1D4DB',
  },

  navOptionItems: {
    color: '#697082',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
    paddingInline: em(15),
    paddingBlock: em(12),
    borderRadius: em(8),
    border: '2px solid #ffffff',
    transition: 'background 150ms linear',

    ['&:hover']: {
      border: '2px solid #f4f4f4',
      transition: 'background 150ms linear',
    },
  },

  navOptionsIcon: {
    color: 'inherit',
    display: 'grid',
    placeItems: 'center',
    fontSize: rem(20),
    height: '50px',
    width: '50px',
    borderRadius: '50%',
    background: '#F5F5F5',
  },

  navOptionsIcon2: {
    color: 'inherit',
    display: 'grid',
    placeItems: 'center',
    fontSize: rem(25),
    height: '50px',
    width: '50px',
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

    ['&:hover']: {
      background: '#F4F4F4',
      transition: 'background 150ms linear',
    },
  },

  signOutIcon: {
    color: 'inherit',
    fontSize: rem(18),
  },

  signOutText: {
    color: 'inherit',
    fontSize: rem(15),
    fontWeight: 500,
  },
}));
