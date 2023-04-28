import { createStyles, Box, Text, rem } from "@mantine/core";

import OwlCarousel from "react-owl-carousel";

import { LandingHero } from "../components/Landing/Hero";
import { LandingFeatures } from "../components/Landing/Features";
import { LandingGreenieWorkings } from "../components/Landing/GreenieWorking";
import { LandingHiring } from "../components/Landing/Hiring";
import { LandingTestimonials } from "../components/Landing/Testimonials";

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
    const { classes } = useStyles();

    return (
        <Box className={classes.testimonialCard}>
            <Text className={classes.testimonialStatement}>"{statement}"</Text>
            <Text className={classes.name}>{name}</Text>
            <Text className={classes.designation}>{designation}</Text>
        </Box>
    );
};

const testimonials = [
    {
        statement:
            "Greenie: Simplifying background verifications, rewarding hassle-free process. Be in control. Streamline with ease.",
        name: "John Doe",
        designation: "Founder and CEO, Greenie",
    },
    {
        statement:
            "Greenie: Simplifying background verifications, rewarding hassle-free process. Be in control. Streamline with ease.",
        name: "John Doe",
        designation: "Founder and CEO, Greenie",
    },
    {
        statement:
            "Greenie: Simplifying background verifications, rewarding hassle-free process. Be in control. Streamline with ease.",
        name: "John Doe",
        designation: "Founder and CEO, Greenie",
    },
    {
        statement:
            "Greenie: Simplifying background verifications, rewarding hassle-free process. Be in control. Streamline with ease.",
        name: "John Doe",
        designation: "Founder and CEO, Greenie",
    },
    {
        statement:
            "Greenie: Simplifying background verifications, rewarding hassle-free process. Be in control. Streamline with ease.",
        name: "John Doe",
        designation: "Founder and CEO, Greenie",
    },
    {
        statement:
            "Greenie: Simplifying background verifications, rewarding hassle-free process. Be in control. Streamline with ease.",
        name: "John Doe",
        designation: "Founder and CEO, Greenie",
    },
    {
        statement:
            "Greenie: Simplifying background verifications, rewarding hassle-free process. Be in control. Streamline with ease.",
        name: "John Doe",
        designation: "Founder and CEO, Greenie",
    },
    {
        statement:
            "Greenie: Simplifying background verifications, rewarding hassle-free process. Be in control. Streamline with ease.",
        name: "John Doe",
        designation: "Founder and CEO, Greenie",
    },
    {
        statement:
            "Greenie: Simplifying background verifications, rewarding hassle-free process. Be in control. Streamline with ease.",
        name: "John Doe",
        designation: "Founder and CEO, Greenie",
    },
    {
        statement:
            "Greenie: Simplifying background verifications, rewarding hassle-free process. Be in control. Streamline with ease.",
        name: "John Doe",
        designation: "Founder and CEO, Greenie",
    },
];

export const Landing = () => {
    const { classes } = useStyles();

    const options = {
        loop: true,
        center: false,
        items: 3,
        margin: -150,
        autoplay: true,
        dots: false,
        autoplayTimeout: 5000,
        smartSpeed: 450,
        nav: false,
        responsive: {
            0: {
                items: 1,
            },

            640: {
                items: 2,
            },

            992: {
                items: 2,
            },
        },
    };

    return (
        <>
            {/* <div className={`${classes.root} page`}>
                <LandingHero />
                <LandingFeatures />
                <LandingGreenieWorkings />
                <LandingHiring />
                <LandingTestimonials />
            </div>
            <section className={classes.testimonialCarouselSection}>
                <Box className={classes.testimonialCarouselContainer}>
                    <OwlCarousel
                        id="testimonials"
                        className="owl-carousel owl-theme"
                        {...options}
                    >
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
            </section> */}
        </>
    );
};

const useStyles = createStyles((theme) => ({
    root: {
        paddingBlockEnd: "0 !important",
    },

    testimonialCarouselSection: {
        height: "14rem",
        backgroundColor: "#17A672",
        paddingInlineStart: "var(--app-padding-inline)",
        position: "relative",
        zIndex: -1,
    },

    testimonialCarouselContainer: {
        transform: "translateY(-65%)",
        backgroundColor: "transparent",
        borderTopLeftRadius: "15px",
        borderBottomLeftRadius: "15px",
        overflow: "hidden",
    },

    testimonialCard: {
        backgroundColor: "hsl(0, 0%, 100%)",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.15)",
        padding: "1.5rem",
        borderRadius: "15px",
        width: "30rem",
    },

    testimonialStatement: {
        fontSize: rem(16),
        lineHeight: 1.4,
    },

    name: {
        fontSize: rem(14.5),
        fontWeight: 600,
        marginBlockStart: "1.25rem",
    },

    designation: {
        fontSize: rem(12),
    },
}));
