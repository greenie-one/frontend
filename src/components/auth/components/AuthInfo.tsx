import { Title, Text, Box } from '@mantine/core';

import greenieLogo from '../assets/greenieLogo.png';
import testimonialImg from '../assets/testimonialImg.png';
import '../styles/authInfo.scss';

export const AuthInfo = () => {
  return (
    <>
      <Box className="logo">
        <img src={greenieLogo} alt="greenie-logo" />
      </Box>

      <Title className="authInfoHeading">Welcome to Greenie, your professional community </Title>
      <Text className="authInfoText">
        Our background verification app delivers reliable and comprehensive screening solutions, enabling you to make
        informed decisions with confidence. Trust and safety are guaranteed with our accurate and efficient background
        checks.
      </Text>

      <Box className="authInfoTestimonialBox">
        <Text className="testimonialHeading">
          Trust and safety are guaranteed with our accurate and efficient background checks.
        </Text>
        <Box className="testimonialImageBox">
          <Box className="testimonialImage">
            <img src={testimonialImg} alt="testimonial img" />
          </Box>
          <Box className="testimonialNameBox">
            <Text className="testimonialName">Arthur Morgan</Text>
            <Text className="testimonialHandle">@arthurmorgan</Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};
