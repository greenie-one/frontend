import { Box, Text, List } from '@mantine/core';
import { RiFacebookCircleLine } from 'react-icons/ri';
import { FaInstagram } from 'react-icons/fa';
import { AiOutlineLinkedin } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';
import { Link } from 'react-router-dom';
import privacyPolicy from '../../../auth/assets/Privacy Policy-Greenie.pdf';
import termsAndConditions from '../../../auth/assets/terms_and_conditions-greenie.pdf';

export const Footer = () => {
  return (
    <footer className="footer">
      <Box className="footer-container">
        <Box className="left-box">
          <Box className="footer-logo">
            <Text className="text">We</Text>
            <MdVerified color="#8CF078" style={{ marginInline: '4px' }} size={'18px'} />
            <Text className="text">Greenie</Text>
          </Box>
          <Text className="mission-text">Fastest Onboarding Platform Of Pre-verified Candidates</Text>
        </Box>
        <Box className="right-box">
          <nav className="footer-nav">
            <List className="footer-links">
              <Link to={privacyPolicy} download={'Privacy Policy'}>
                <List.Item className="footer-link">Privacy Policy</List.Item>
              </Link>
              <Link to={termsAndConditions} download={'Terms and Conditions'}>
                <List.Item className="footer-link">Terms and Conditions</List.Item>
              </Link>
              <Link to={''}>
                <List.Item className="footer-link">Help</List.Item>
              </Link>
              <Link to={`mailto:office@greenie.one`}>
                <List.Item className="footer-link">office@greenie.</List.Item>
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
        <Text className="copy-right">{new Date().getFullYear()} Greenie. All rights reserved</Text>
      </Box>
    </footer>
  );
};
