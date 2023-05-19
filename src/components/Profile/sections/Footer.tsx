import '../styles/global.scss';
import { Box, Text, List } from '@mantine/core';
import { RiFacebookCircleLine } from 'react-icons/ri';
import { FaInstagram } from 'react-icons/fa';
import { AiOutlineLinkedin } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer">
      <Box className="left-box">
        <Box className="footer-logo">
          <Text className="text">We</Text>
          <MdVerified color="#8CF078" style={{ marginInline: '4px' }} size={'18px'} />
          <Text className="text">Greenie</Text>
        </Box>
        <Text className="mission-text">
          On a mission to disrupt traditional background verification.
        </Text>
        <Text className="copy-right">2023 Greenie. All rights reserved</Text>
      </Box>
      <Box className="right-box">
        <nav className="footer-nav">
          <List className="footer-links">
            <Link to={''}>
              <List.Item className="footer-link">Learn</List.Item>
            </Link>
            <Link to={''}>
              <List.Item className="footer-link">Pricing</List.Item>
            </Link>
            <Link to={''}>
              <List.Item className="footer-link">About us</List.Item>
            </Link>
            <Link to={''}>
              <List.Item className="footer-link">Career</List.Item>
            </Link>
          </List>
        </nav>
        <List className="footer-socials">
          <List.Item className="footer-social-icon">
            <RiFacebookCircleLine color="#898989" size={'22px'} />
          </List.Item>
          <List.Item className="footer-social-icon">
            <FaInstagram color="#898989" size={'22px'} />
          </List.Item>
          <List.Item className="footer-social-icon">
            <AiOutlineLinkedin color="#898989" size={'22px'} />
          </List.Item>
        </List>
      </Box>
    </footer>
  );
};
