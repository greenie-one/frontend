import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createStyles, Box, Text, em, rem } from '@mantine/core';

import OwlCarousel from 'react-owl-carousel';

import { LandingHero } from '../components/Landing/Hero';
import { LandingFeatures } from '../components/Landing/Features';
import { LandingGreenieWorkings } from '../components/Landing/GreenieWorking';
import { LandingHiring } from '../components/Landing/Hiring';
import { LandingTestimonials } from '../components/Landing/Testimonials';

type TestimonialCardPropsType = {
  statement: string;
  name: string;
  designation: string;
};

const TestimonialCard: React.FC<TestimonialCardPropsType> = ({
  statement,
  name,
  designation,
}): JSX.Element => {
  const location = useLocation();
  const { classes } = useStyles();

  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1))
      if (elem) {
        elem.scrollIntoView({behavior: "smooth"})
      }
    } else {
      window.scrollTo({top:0,left:0, behavior: "smooth"})
    }
  }, [location])

  return (
    <Box className={classes.testimonialCard}>
      <Text className={classes.testimonialStatement}>"{statement}"</Text>
      <Box className={classes.testimonialCardName}>
        <Text className={classes.name}>{name}</Text>
        <Text className={classes.designation}>{designation}</Text>
      </Box>
    </Box>
  );
};

const testimonials = [
  {
    statement:
      "We've been blown away by how easy Greenie has made our hiring process. From Background checks to contract management, their platform streamlines everything and ensures that we're always making informed decisions",
    name: 'Rahul Kaushik',
    designation: '',
  },
  {
    statement:
      'As a small business owner, I was always worried about the risks involved in hiring, Greenie changed everything for us.We are more confident now to bring in new members in our team ',
    name: 'Sahil Gupte',
    designation: '',
  },
  {
    statement:
      'Greenie has been an absolute game changer for our HR team. Their platform is intuitive, easy to use and incredibly effective.',
    name: 'Swanand Wagh',
    designation: '',
  },
  {
    statement:
      'I feel powerful using Greenie. It gives me so much control over my data and personal information. I can store and share all my professional documents, thanks to Doc Depot.',
    name: 'Ratnesh Jain',
    designation: '',
  },
  {
    statement:
      'Greenie has completely transformed hiring process for my company. The platform is easy to use and provides peace of mind that our new hires have been completely vetted ',
    name: 'Bobby Kumar',
    designation: '',
  },
  {
    statement:
      'I was skeptical about using Greenie, but after giving it a try, I was blown away by how fast and accurate the verification process was.',
    name: 'Tanvi Tomar',
    designation: '',
  },
];

export const Landing = () => {
  const { classes } = useStyles();

  const options = {
    loop: true,
    center: true,
    items: 1,
    margin: 10,
    autoplay: true,
    dots: true,
    autoplayTimeout: 5000,
    smartSpeed: 450,
    nav: false,
    responsive: {
      640: {
        items: 2,
      },

      992: {
        items: 3,
      },
    },
  };

  return (
    <>
      <div className={`${classes.root} page`}>
        <LandingHero />
        <LandingFeatures />
        <LandingGreenieWorkings />
        <LandingHiring />
        <LandingTestimonials />
      </div>
      <section className={classes.testimonialCarouselSection}>
        <Box className={classes.testimonialCarouselContainer}>
          <OwlCarousel id="testimonials" className="owl-carousel owl-theme" {...options}>
            {testimonials.map((testimonial, id) => {
              return (
                <TestimonialCard
                  key={id}
                  statement={testimonial.statement}
                  name={testimonial.name}
                  designation={testimonial.designation}
                />
              );
            })}
          </OwlCarousel>
        </Box>
      </section>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    paddingBlockEnd: '0 !important',
  },

  testimonialCarouselSection: {
    height: '14rem',
    backgroundColor: '#17A672',
    paddingInline: '2rem',
    position: 'relative',
    zIndex: -1,

    [`@media screen and (max-width: ${em(480)})`]: {
      height: '10rem',
    },
  },

  testimonialCarouselContainer: {
    transform: 'translateY(-65%)',
    backgroundColor: 'transparent',
    borderTopLeftRadius: '15px',
    borderBottomLeftRadius: '15px',
    overflow: 'hidden',

    [`@media screen and (max-width: ${em(480)})`]: {
      transform: 'translateY(-60%)',
    },
  },

  testimonialCard: {
    backgroundColor: 'hsl(0, 0%, 100%)',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.15)',
    padding: '1.5rem',
    borderRadius: '15px',
    width: `min(100%, 30rem)`,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    [`@media screen and (max-width: ${em(480)})`]: {
      padding: '1rem',
    },
  },

  testimonialStatement: {
    fontSize: rem(15),
    lineHeight: 1.45,

    [`@media screen and (max-width: ${em(480)})`]: {
      fontSize: rem(14),
    },
  },

  testimonialCardName: {
    marginBlockStart: '1.3rem',
  },

  name: {
    fontSize: rem(15),
    fontWeight: 600,

    [`@media screen and (max-width: ${em(480)})`]: {
      fontSize: rem(13.5),
    },
  },

  designation: {
    fontSize: rem(12),

    [`@media screen and (max-width: ${em(480)})`]: {
      fontSize: rem(11.5),
    },
  },
}));
