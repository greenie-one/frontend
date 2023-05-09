import React from 'react';
import { Link } from 'react-router-dom';
import { createStyles, List, Title, Text, em, rem, Box, Flex, TextInput } from '@mantine/core';
import { BsInstagram } from 'react-icons/bs';
import { FiLinkedin } from 'react-icons/fi';
import { MdOutlineMail, MdOutlineFacebook, MdVerified } from 'react-icons/md';

import { Button } from './Button';

export const Footer: React.FC = (): JSX.Element => {
  const { classes } = useStyles();

  return (
    <Box className={`${classes.root} app-padding-inline section`}>
      <footer className={classes.footer}>
        <Box className={classes.footerGridContainer}>
          <Box className={classes.gridLeftContainer}>
            <Link to={'/'}>
              <Flex
                justify="center"
                align="center"
                direction="row"
                className={classes.footerHeading}
                gap={'sm'}
              >
                <span className={classes.footerHeadingTexts}>We</span>
                <span className={classes.verified}>
                  <MdVerified />
                </span>
                <span className={classes.footerHeadingTexts}>Greenie</span>
              </Flex>
            </Link>
            <Title order={1} className={classes.footerTagline}>
              On a mission to disrupt traditional background verification.
            </Title>
            <Flex
              justify="flex-start"
              align="center"
              direction="row"
              className={classes.footerSocialLinks}
              gap="md"
            >
              {/* <span className={classes.socialLinkIcons}>
                                <MdOutlineFacebook />
                            </span> */}
              <a
                href="https://instagram.com/greenie.one?igshid=ZDdkNTZiNTM="
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={classes.socialLinkIcons}>
                  <BsInstagram />
                </span>
              </a>
              <a
                href="https://www.linkedin.com/company/gogreenie/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={classes.socialLinkIcons}>
                  <FiLinkedin />
                </span>
              </a>
              <a href="mailto:office@greenie.one"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={classes.socialLinkIcons}>
                  <MdOutlineMail />
                </span>
              </a>
            </Flex>
          </Box>
          <Box className={classes.gridLeftContainer}>
            {/* <form className={classes.form}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                className={classes.formInput}
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                className={classes.formInput}
              />

              <textarea
                name="message"
                id="message"
                rows={6}
                className={`${classes.formInput} ${classes.messageInput}`}
                placeholder="Your Message..."
              ></textarea>
              <Button variant="fill" classNames={classes.formSubmitBtn} outline={true}>
                Get In Touch
              </Button>
            </form> */}
          </Box>
        </Box>
        <Box className={classes.footerBottom}>
          <span className={classes.footerBottomLogoContainer}>
            <Flex
              justify="center"
              align={{ base: 'center', md: 'flex-start' }}
              direction={{ base: 'row', md: 'column' }}
              className={classes.footerBottomLogo}
              gap={{ base: '0.5rem' }}
            >
              <Link to={'/'}>
                <span className={classes.greenie}>Greenie</span>
                <span className={classes.verifiedBottom}>
                  <MdVerified />
                </span>
              </Link>
              <Text>&copy; 2023 Greenie. All rights reserved</Text>
            </Flex>
          </span>
          <Text className={classes.madeInIndiaText}>Made In India</Text>
          <List className={classes.navOptionsList}>
              <Link to="/#features">
                <List.Item className={classes.navOptionsListItems}>
                    Features
                </List.Item>
              </Link>
              <Link to="/waitlist">
                <List.Item className={classes.navOptionsListItems}>
                    Pricing
                </List.Item>
              </Link>
              {/* <List.Item className={classes.navOptionsListItems}>
                  About Us
              </List.Item>
              <List.Item className={classes.navOptionsListItems}>
                  Career
              </List.Item> */}
          </List>
        </Box>
      </footer>
    </Box>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: '#191819',
    color: '#FFFFFF',
  },

  footer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    paddingBottom:"2rem"
  },

  footerGridContainer: {
    display: 'grid',
    gridTemplateColumns: '1.8fr 1.2fr',
    gap: '4rem',
    alignItems: 'start',

    [`@media screen and (max-width: ${em(992)})`]: {
      gridTemplateColumns: '1fr',
    },
  },

  gridLeftContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1.5rem',

    [`@media screen and (max-width: ${em(1280)})`]: {
      gap: rem(20),
    },

    [`@media screen and (max-width: ${em(992)})`]: {
      alignItems: 'center',
    },

    [`@media screen and (max-width: ${em(480)})`]: {
      gap: rem(15),
    },
  },

  footerHeading: {
    fontSize: rem(40),
    fontWeight: 700,

    [`@media screen and (max-width: ${em(1280)})`]: {
      fontSize: rem(36),
    },

    [`@media screen and (max-width: ${em(768)})`]: {
      fontSize: rem(32),
    },

    [`@media screen and (max-width: ${em(480)})`]: {
      fontSize: rem(30),
    },
  },

  footerHeadingTexts: {
    
  },

  verified: {
    fontSize: rem(30),
    color: '#9FE870',

    [`@media screen and (max-width: ${em(1280)})`]: {
      fontSize: rem(26),
    },

    [`@media screen and (max-width: ${em(768)})`]: {
      fontSize: rem(22),
    },
  },

  footerTagline: {
    fontWeight: 600,
    lineHeight: '1.1',
    fontSize: rem(34),
    letterSpacing: '0.01em',
    color: '#8E8E8E',
    maxWidth: '30ch',
    

    [`@media screen and (max-width: ${em(1280)})`]: {
      fontSize: rem(30),
    },

    [`@media screen and (max-width: ${em(992)})`]: {
      textAlign: 'center',
    },

    [`@media screen and (max-width: ${em(768)})`]: {
      fontSize: rem(26),
    },

    [`@media screen and (max-width: ${em(480)})`]: {
      fontSize: rem(24),
    },
  },

  footerSocialLinks: {
    marginBlockStart: '1.5rem',

    [`@media screen and (max-width: ${em(1280)})`]: {
      marginBlockStart: '1.2rem',
    },

    [`@media screen and (max-width: ${em(768)})`]: {
      marginBlockStart: '1rem',
    },

    [`@media screen and (max-width: ${em(768)})`]: {
      marginBlockStart: '0.5rem',
    },
  },

  socialLinkIcons: {
    fontSize: '1.5rem',
    display: 'grid',
    placeItems: 'center',
    padding: '0.6rem',
    border: '1px solid #656565',
    borderRadius: '10px',
    color: 'rgba(255, 255, 255, 0.8)',
    background: 'linear-gradient(180deg, #FFFFFF 0%, #898989 100%);',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',

    [`@media screen and (max-width: ${em(1280)})`]: {
      fontSize: rem(20),
    },

    [`@media screen and (max-width: ${em(768)})`]: {
      fontSize: rem(16),
      padding: '0.5rem',
    },
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginInlineStart: 'auto',
    gap: '1rem',
    width: '100%',

    [`@media screen and (max-width: ${em(992)})`]: {
      marginInlineEnd: 'auto',
    },

    [`@media screen and (max-width: ${em(480)})`]: {
      gap: '0.75rem',
    },

    [`@media screen and (max-width: ${em(350)})`]: {
      width: '100%',
    },
  },

  formInput: {
    backgroundColor: '#2B2B2B',
    borderRadius: '3rem',
    paddingInline: '1.35rem',
    paddingBlock: '0.9rem',
    color: '#FFFFFF',
    fontSize: rem(14),
    width: '100%',

    '::placeholder': {
      color: '#FFFFFF',
    },

    [`@media screen and (max-width: ${em(992)})`]: {
      width: rem(310),
    },

    [`@media screen and (max-width: ${em(640)})`]: {
      paddingBlock: '0.8rem',
    },

    [`@media screen and (max-width: ${em(992)})`]: {
      width: '100%',
    },
  },

  messageInput: {
    borderRadius: '16px',
    outline: 'none',
    border: 0,
  },

  formSubmitBtn: {
    fontSize: rem(15),
    [`@media screen and (max-width: ${em(992)})`]: {
      fontSize: rem(14),
    },
  },

  footerBottom: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    fontSize: rem(13),

    [`@media screen and (max-width: ${em(992)})`]: {
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      gap: '1rem',
      placeItems: 'center',
    },

    [`@media screen and (max-width: ${em(768)})`]: {
      gridTemplateColumns: '1fr',
    },
  },

  footerBottomLogoContainer: {
    [`@media screen and (max-width: ${em(992)})`]: {
      marginInlineStart: 'auto',
    },

    [`@media screen and (max-width: ${em(768)})`]: {
      marginInlineEnd: 'auto',
    },
  },

  footerBottomLogo: {
    [`@media screen and (max-width: ${em(540)})`]: {
      flexDirection: 'column',
      gap: '0',
    },
  },

  greenie: {
    fontSize: rem(20),
    fontWeight: 600,
    
  },

  verifiedBottom: {
    fontSize: rem(17),
    color: '#9FE870',
    marginInlineStart: '0.25rem',
    display: 'inline-grid',
    placeItems: 'center',
    transform: 'translateY(2px)',
  },

  madeInIndiaText: {
    [`@media screen and (max-width: ${em(992)})`]: {
      marginInlineEnd: 'auto',
    },

    [`@media screen and (max-width: ${em(768)})`]: {
      marginInlineStart: 'auto',
    },
  },

  navOptionsList: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    paddingInline: rem(20),
    color: '#FFFFFF',
    fontSize: rem(13),

    [`@media screen and (max-width: ${em(992)})`]: {
      width: '100%',
      gridColumn: '1/-1',
      gridRow: '1/span 1',
      justifyContent: 'flex-start',
      paddingInlineStart: rem(4),
    },

    [`@media screen and (max-width: ${em(768)})`]: {
      justifyContent: 'center',
      paddingInline: rem(20),
    },
  },

  navOptionsListItems: {
    cursor: 'pointer',
    transition: 'color 150ms linear',
    position: 'relative',

    ':hover': {
      color: '#9FE870',
      transition: 'color 150ms linear',
    },
  },
}));
