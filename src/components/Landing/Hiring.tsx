import React from "react";
import { createStyles, Title, Text, rem, Box, Flex } from "@mantine/core";
import { MdVerified } from "react-icons/md";

import { _2ColumnLayout } from "../layouts/_2ColumnLayout";

import cap from "../../assets/images/cap.svg";
import hiringDocuments from "../../assets/images/hiring-documents.png";

export const Hiring: React.FC = (): JSX.Element => {
    const { classes } = useStyles();

    return (
        <section className={`section ${classes.root}`}>
            <_2ColumnLayout>
                <Box className={""}>
                    <Title order={1} className={classes.hiringTitle}>
                        We make hiring super simple.
                        <Flex
                            justify="center"
                            align="center"
                            direction="row"
                            className={classes.verifiedTextContainer}
                        >
                            <span className={classes.verified}>
                                <MdVerified />
                            </span>
                            <span className={classes.verifiedText}>
                                Verified
                            </span>
                        </Flex>
                        <span className={classes.capIconContainer}>
                            <img src={cap} alt="cap" className={""} />
                        </span>
                    </Title>
                    <Text className={classes.hiringText}>
                        Streamlining background checks with State-of-the-Art
                        technology redefining trust in the verification
                        industry, streamlining background checks with
                        State-of-the-Art technology redefining trust in the
                        verification industry
                    </Text>
                </Box>
                <Box className={classes.hiringIllustration}>
                    <span className={classes.hiringImageContainer}>
                        <img
                            src={hiringDocuments}
                            alt="hiringDocuments"
                            className={""}
                        />
                    </span>
                </Box>
            </_2ColumnLayout>
        </section>
    );
};

const useStyles = createStyles((theme) => ({
    root: {
        alignItems: "start",
        marginBlockEnd: "-6rem",
        marginBlockStart: "7.5rem",

        ["&.section"]: {
            paddingBlockEnd: 0,
        },
    },

    hiringTitle: {
        fontSize: "2.5rem",
        position: "relative",
        zIndex: -1,
    },

    verifiedTextContainer: {
        fontSize: "1.8rem",
        color: "#17A672",
        gap: "0.15rem",
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-100%) translateY(-85%)",
    },

    verified: {
        transform: "translateY(-2px)",
        zIndex: -1,
    },

    verifiedText: {},

    capIconContainer: {
        display: "inline-grid",
        placeItems: "center",
        width: rem(20),
        position: "absolute",
        top: 0,
        transform: "translateX(2.125rem) translateY(2.6rem)",
    },

    hiringText: {
        fontSize: "0.9rem",
        marginBlockStart: "1.75rem",
        marginBlockEnd: "1.25rem",
    },

    hiringIllustration: {
        zIndex: -1,
        transform: `translateY(${rem(-80)})`,
    },

    hiringImageContainer: {
        aspectRatio: "1",
        display: "grid",
        placeItems: "center",
        marginInlineStart: "auto",
        position: "relative",
    },
}));
