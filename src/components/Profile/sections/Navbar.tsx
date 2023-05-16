import { Box, TextInput, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';
import { MdVerified } from 'react-icons/md';
import { GoSearch } from 'react-icons/go';
import { AiOutlineBell, AiFillCaretDown } from 'react-icons/ai';
import JohnMarston from '../assets/johnMarston.png';

export const Navbar = () => {
  const { classes: inputClasses } = inputStyles();
  return (
    <header>
      <nav className="navbar">
        <Link to={'/'} className="logo">
          <span className="greenie">Greenie</span>
          <span className="verified">
            <MdVerified size={'22px'} color="#9fe870" />
          </span>
        </Link>
        <Box>
          <TextInput classNames={inputClasses} placeholder="Search" icon={<GoSearch />} />
        </Box>
        <Box className="right-section">
          <AiOutlineBell size={'22px'} className="bell-icon" />
          <Box>
            <img className="profile-picture" src={JohnMarston} alt="Profile Piture" />
            <AiFillCaretDown />
          </Box>
        </Box>
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
  },
}));
