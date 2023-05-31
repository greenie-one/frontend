import { useEffect, useRef, useState } from 'react';
import { Box, TextInput, createStyles, Flex, List, Drawer, em, rem } from '@mantine/core';
import { Link } from 'react-router-dom';
import { MdVerified, MdOutlineMenuOpen, MdOutlineClose } from 'react-icons/md';
import { GoSearch } from 'react-icons/go';
import { AiOutlineBell, AiFillCaretDown } from 'react-icons/ai';
import JohnMarston from '../assets/johnMarston.png';
import { useDisclosure } from '@mantine/hooks';
import { SearchList } from '../components/SearchList';
import { useDebounce } from '../hooks/useDebounce';

export const Navbar = () => {
  const { classes } = useStyles();
  const { classes: inputClasses } = inputStyles();
  const [opened, { open, close }] = useDisclosure(false);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearchList, setShowSearchList] = useState<boolean>(false);

  let debouncedValue = useDebounce(searchQuery, 250);

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
          <img className="profile-picture" src={JohnMarston} alt="Profile Piture" />
          <AiFillCaretDown />

          {!opened ? (
            <span className={classes.menuOpenBtn}>
              <MdOutlineMenuOpen role="button" onClick={open} />
            </span>
          ) : null}
        </Box>

        <Drawer
          opened={opened}
          onClose={close}
          withCloseButton={false}
          overlayProps={{ opacity: 0, blur: 0 }}
        >
          <nav className={classes.mobileNavOptionsContainer}>
            <Flex justify="space-between" align="center" direction="row">
              <Link to={'/'}>
                <span className={classes.mobileGreenie}>Greenie</span>
                <span className={classes.mobileVerified}>
                  <MdVerified />
                </span>
              </Link>
              <span className={classes.menuCloseBtn}>
                <MdOutlineClose role="button" onClick={close} />
              </span>
            </Flex>
            <List className={classes.mobileNavOptionsList}>
              <Link to="/#features" onClick={close}>
                <List.Item className={classes.mobileNavOptionsListItems}>Features</List.Item>
              </Link>
              <Link to="/waitlist" onClick={close}>
                <List.Item className={classes.mobileNavOptionsListItems}>Pricing</List.Item>
              </Link>
            </List>
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
      width: '80%',
      maxWidth: rem(280),
      backgroundColor: '#047A4F',
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

  mobileGreenie: {
    color: 'white',
    fontFamily: 'Gilroy-Bold !important',
  },

  mobileVerified: {
    color: 'white',
    marginLeft: '5px',
  },

  menuCloseBtn: {
    fontSize: rem(20),
    color: 'white',
  },

  mobileNavOptionsList: {
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'flex-start',
  },

  mobileNavOptionsListItems: {
    fontSize: rem(16),
    cursor: 'pointer',
    position: 'relative',

    '::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: 0,
      bottom: '-2px',
      borderTop: '1px solid #8CF078',
      transition: 'width 200ms linear',
    },

    ':hover': {
      color: '#8CF078',
      transition: 'color 150ms linear',
    },

    ':hover::after': {
      width: '100%',
      transition: 'width 200ms linear',
    },
  },

  mobileHeaderBtnsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBlockStart: '0.35rem',
  },

  mobileTryBtn: {
    color: '#FFFFFF',
    fontSize: rem(16),

    backgroundColor: '#17A672 !important',
    borderColor: '#17A672 !important',

    [`@media screen and (max-width: ${em(480)})`]: {
      fontSize: rem(14),
    },
  },

  exploreBtn: {
    borderColor: '#FFFFFF !important',
    color: '#FFFFFF',
    fontSize: rem(14),

    [`@media screen and (max-width: ${em(480)})`]: {
      fontSize: rem(13),
    },
  },
}));
