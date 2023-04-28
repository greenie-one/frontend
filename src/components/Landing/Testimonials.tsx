import React from "react";
import { createStyles, Title, Text, rem, Box, Flex } from "@mantine/core";

import { _2ColumnLayout } from "../layouts/_2ColumnLayout";
import testimonialIllustration from "../../assets/images/young-indian-manager.png";

export const LandingTestimonials: React.FC = (): JSX.Element => {
    const { classes } = useStyles();

    return (
        <>
            <section className={`section ${classes.root}`}>
                <_2ColumnLayout>
                    <Box className={classes.testimonialContent}>
                        <Title order={1} className={classes.testimonialTitle}>
                            What people say about Greenie
                        </Title>
                        <Text className={classes.testimonialText}>
                            Over 5000 people share their success stories about
                            how they optimised their hiring processes with
                            greenie.
                        </Text>
                    </Box>
                    <Box className={classes.testimonialIllustration}>
                        <span className={classes.testimonialImageContainer}>
                            <img
                                src={testimonialIllustration}
                                alt="testimonialIllustration"
                                className={classes.testimonialIllustrationImage}
                            />
                        </span>
                    </Box>
                </_2ColumnLayout>
            </section>
        </>
    );
};

const useStyles = createStyles((theme) => ({
    root: {
        paddingBlockEnd: "0 !important",
    },

    testimonialContent: {
        marginBlockStart: "4rem",
    },

    testimonialTitle: {
        fontSize: "2.5rem",
    },

    testimonialText: {
        fontSize: rem(17),
        marginBlockStart: "1.75rem",
        marginBlockEnd: "1.25rem",
        maxWidth: "40ch",
    },

    testimonialIllustration: {},

    testimonialImageContainer: {
        display: "grid",
        placeItems: "center",
        marginInlineStart: "auto",
        position: "relative",
    },

    testimonialIllustrationImage: {
        height: "30rem",
        zIndex: -1,
    },
}));
