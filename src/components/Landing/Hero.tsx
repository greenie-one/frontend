import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createStyles, Title, Text, rem, Box, keyframes, em } from '@mantine/core';
import { _2ColumnLayout } from '../layouts/_2ColumnLayout';
import { Button } from '../common/Button';
import { motion } from 'framer-motion';
import { useAnimate, useTransform , useInView } from 'framer-motion';

import girlCheckingPhone from '../../assets/images/Landing/girl-checking-phone.png';
import popup1 from '../../assets/images/Landing/popup-illustration-1.svg';
import popup2 from '../../assets/images/Landing/popup-illustration-2.svg';
import popup3 from '../../assets/images/Landing/popup-illustration-3.svg';
import popup4 from '../../assets/images/Landing/upload-documents-hero.svg';
import popup5 from '../../assets/images/Landing/popup-illustration-5.svg';
import popup6 from '../../assets/images/Landing/popup-illustration-6.svg';

const popupAnimation = keyframes({
  from: { scale: '0.25' },
  to: { scale: '1' },
});

export const LandingHero = () => {
  const { classes } = useStyles();
  const [popupNo, setPopupNo] = useState<number>(-1);
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  const activatePopups = () => {
    let activePopup = 0;

    const activatePopupInterval = setInterval(() => {
      if (activePopup === 5) {
        clearInterval(activatePopupInterval);
        return;
      }

      setPopupNo(activePopup);
      activePopup = activePopup + 1;
    }, 1000);
  };

  useEffect(() => {
    if (isInView) {
      animate(
        'span',
        { scale:[0,1], transformOrigin:"top left" },
        { type: 'spring', bounce:0.4, bounceStiffness:400, duration:1.5}
      );
    }
  }, [isInView]);

  return (
    <section className={`${classes.root}`}>
      <_2ColumnLayout>
        <Box className={classes.heroContentContainer}>
          <Title order={1} className={classes.heroTitle}>
            <span className={classes.highlight}>Unlocking</span> <br/>The Future Of <br/> Background Verification
          </Title>
          <Text className={classes.heroText}>
          Experience verifications, document storage, contract creation, sharing of verification reports on our secure encrypted platform.
          </Text>
          <Box className={classes.heroActionBtn}>
            <Link to="/waitlist">
              <Button variant={'fill'} outline={true} classNames={classes.tryForFree}>
                Join The Waitlist
              </Button>
            </Link>
          </Box>
        </Box>
        <Box className={classes.heroIllustration}>
          <span className={classes.girlImageContainer} ref={scope}>
            <motion.img
              src={girlCheckingPhone}
              alt="girlCheckingPhone"
              className={''}
            />
            <motion.span initial={{ translateX:"45%",  translateY:"-20%" }} className={`${classes.popups} ${classes.popup5}`}>
              <img src={popup5} alt="popup5" />
            </motion.span>
            <motion.span initial={{ translateX:"50%",  translateY:"-35%" }} className={`${classes.popups} ${classes.popup4}`}>
              <img src={popup4} alt="popup4" />
            </motion.span>
            <motion.span initial={{ translateX:"50%",  translateY:"-45%" }} className={`${classes.popups} ${classes.popup6}`}>
              <img src={popup6} alt="popup6" />
            </motion.span>
            <motion.span initial={{ translateX:'-65%',  translateY:'-25%' }} className={`${classes.popups} ${classes.popup2}`}>
              <img src={popup2} alt="popup2" />
            </motion.span>
            <motion.span initial={{ translateX:'-45%',  translateY:'50%'}} className={`${classes.popups} ${classes.popup3}`}>
              <img src={popup3} alt="popup3" />
            </motion.span>
            <motion.span initial={{ translateX:"-32%",  translateY:"-50%" }}className={`${classes.popups} ${classes.popup1}`}>
              <img src={popup1} alt="popup1" />
            </motion.span>
          </span>
        </Box>
      </_2ColumnLayout>
    </section>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    alignItems: 'start',
  },

  highlight: {
    color: "#8cf078"
  },

  heroContentContainer: {
    paddingBlockStart: '1rem',
    //marginBlockStart: '2rem',

    [`@media screen and (max-width: ${em(1280)})`]: {
      gridRow: '2/3',
    },
  },

  heroTitle: {
    fontSize: '3rem',
    fontWeight: 800,

    [`@media screen and (max-width: ${em(1440)})`]: {
      fontSize: '2.6rem',
      width:"18ch"
    },


    [`@media screen and (max-width: ${em(1340)})`]: {
      fontSize: '2.6rem',
    },

    [`@media screen and (max-width: ${em(1280)})`]: {
      textAlign: 'center',
      maxWidth: '25ch',
      marginInline: 'auto',
    },


    [`@media screen and (max-width: ${em(768)})`]: {
      fontSize: '2.5rem',
    },

    [`@media screen and (max-width: ${em(540)})`]: {
      fontSize: '2 rem',
    },

    [`@media screen and (max-width: ${em(414)})`]: {
      fontSize: '1.5rem',
    },

    [`@media screen and (max-width: ${em(425)})`]: {
      fontSize: '1.7rem',
    },

    [`@media screen and (max-width: ${em(320)})`]: {
      fontSize: '1.5rem',
    },
  },

  heroText: {
    fontSize: '0.85rem',
    marginBlockStart: '1.2rem',
    marginBlockEnd: '1.25rem',
    maxWidth:"45ch",
    width:"100%",

    [`@media screen and (max-width: ${em(1280)})`]: {
      textAlign: 'center',
      marginInline: 'auto',
    },

    [`@media screen and (max-width: ${em(768)})`]: {
      marginBlockStart: '1.25rem',
    },

    [`@media screen and (max-width: ${em(540)})`]: {
      marginBlockStart: '1rem',
    },

    [`@media screen and (max-width: ${em(425)})`]: {
      fontSize: '0.825rem',
    },
  },

  heroActionBtn: {
    display: 'flex',
    gap: '1rem',

    [`@media screen and (max-width: ${em(1280)})`]: {
      justifyContent: 'center',
    },
  },

  tryForFree: {
    fontSize: rem(18),
    backgroundColor: '#8cf078 !important',
    borderColor: '#8cf078 !important',
    color: 'black !important',
  },

  heroIllustration: {
    zIndex: -1,
    width:"98%",

    [`@media screen and (max-width: ${em(1280)})`]: {
      gridRow: '1/2',
    },
  },

  girlImageContainer: {
    aspectRatio: '1',
    width: '80%',
    display: 'grid',
    placeItems: 'center',
    marginInlineStart: 'auto',
    position: 'relative',

    [`@media screen and (max-width: ${em(1280)})`]: {
      width: `min(80%, ${rem(450)})`,
      marginInlineEnd: 'auto',
    },
  },

  popups: {
    position: 'absolute',
    // animation: `${popupAnimation} 200ms ease-in-out`,
    transformOrigin: 'center'
  },

  popup1: {
    width: rem(270),
    transform: 'translateX(-40%) translateY(-50%)',
    top: 0,
    left: 0,

    [`@media screen and (max-width: ${em(768)})`]: {
      width: '40dvw'
    },
  },

  popup2: {
    width: rem(280),
    transform: 'translateX(-68.5%) translateY(-25%)',
    bottom: 0,

    [`@media screen and (max-width: ${em(768)})`]: {
      width: '40dvw',
    },
  },

  popup3: {
    width: rem(350),
    transform: 'translateX(-45%) translateY(50%)',
    bottom: 0,

    [`@media screen and (max-width: ${em(768)})`]: {
      width: '50dvw',
    },
  },

  popup4: {
    width: rem(225),
    right: 0,
    top: '50%',
    transform: 'translateX(50%) translateY(-35%)',

    [`@media screen and (max-width: ${em(768)})`]: {
      width: '32dvw',
    },
  },

  popup5: {
    width: rem(180),
    right: 0,
    top: '72%',
    transform: 'translateX(60%) translateY(-35%)',

    [`@media screen and (max-width: ${em(768)})`]: {
      width: '30dvw',
      transform: 'translateX(45%) translateY(-55%)',
    },
  },

  popup6: {
    width: rem(180),
    right: 0,
    top: '35%',
    transform: 'translateX(50%) translateY(-35%)',

    [`@media screen and (max-width: ${em(768)})`]: {
      width: '27dvw',
      transform: 'translateX(50%) translateY(-25%)',
    },
  },
}));
