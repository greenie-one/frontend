import React, { useState } from "react";
import {
    createStyles,
    getStylesRef,
    Title,
    Text,
    Box,
    Grid,
    rem,
} from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { LandingSectionHeading } from "./SectionHeading";
import { CustomButton } from "../common/CustomButton";

type WorkingsCardPropsType = {
    cardBg: string;
    title: string;
    titleColor: string;
    text: string;
    textColor: string;
};

const WorkingsCard: React.FC<WorkingsCardPropsType> = ({
    cardBg,
    title,
    titleColor,
    text,
    textColor,
}): JSX.Element => {
    const { classes } = useStyles();

    return (
        <Box sx={{ backgroundColor: cardBg }} className={classes.workingsCard}>
            <Title
                sx={{ color: titleColor }}
                order={2}
                className={classes.workingsCardTitle}
            >
                {title}
            </Title>
            <Text
                sx={{ color: textColor }}
                className={classes.workingsCardText}
            >
                {text}
            </Text>
        </Box>
    );
};

const workingsCardContent = [
    {
        id: randomId(),
        cardBg: "#D8FFF1",
        title: "Create greenie account in less than 10 secs.",
        titleColor: "#17A672",
        text: "It is very simple and easy to create your greenie account.",
        textColor: "#191819",
    },
    {
        id: randomId(),
        cardBg: "#A1FFDD",
        title: "Verify all your documents only once.",
        titleColor: "#17A672",
        text: "Verify all your documents and get a unique Greenie ID that will save all your documents in a repository. Upload your documents and forget about it.",
        textColor: "#191819",
    },
    {
        id: randomId(),
        cardBg: "#4BE4AD",
        title: "Go ahead and share your Greenie ID.",
        titleColor: "#018454",
        text: "Share your Greenie ID your recruiters, your organisations or anywhere you would want to verify your documents and background.",
        textColor: "#191819",
    },
    {
        id: randomId(),
        cardBg: "#17A672",
        title: "Take control of your background verification",
        titleColor: "#A1FFDD",
        text: "You have all control to grant access to any of the documents that you uploaded online. Recruiters you request you to reveal only the documents to verify. You control your background verification and track it live.",
        textColor: "#FFFFFF",
    },
];

export const LandingGreenieWorkings = () => {
    const { classes } = useStyles();

    const [activeWorkingBtn, setActiveWorkingBtn] = useState<number>(0);

    return (
        <section className={`${classes.root} section`}>
            <LandingSectionHeading
                heading={"How Greenie works"}
                subheading={
                    "Streamlining background checks with State-of-the-Art technology redefining trust in the verification industry"
                }
            />
            <Box className={classes.workingsBtnContainer}>
                {[
                    "Create Greenie Account",
                    "Verify Documents",
                    "Share Your ID",
                    "Accept Request",
                ].map((text, id) => {
                    return (
                        <CustomButton
                            key={id}
                            variant={"outline"}
                            classNames={`${classes.workingsBtn} ${
                                activeWorkingBtn === id
                                    ? classes.activeWorkingBtn
                                    : ""
                            }`}
                            outline={activeWorkingBtn === id}
                            onClick={() => setActiveWorkingBtn(id)}
                        >
                            {text}
                        </CustomButton>
                    );
                })}
            </Box>
            <Box className={classes.workingCardsContainer}>
                {workingsCardContent.map((cardContent, id) => {
                    return activeWorkingBtn >= id ? (
                        <WorkingsCard
                            key={cardContent.id}
                            cardBg={cardContent.cardBg}
                            title={cardContent.title}
                            titleColor={cardContent.titleColor}
                            text={cardContent.text}
                            textColor={cardContent.textColor}
                        />
                    ) : (
                        <React.Fragment key={id}></React.Fragment>
                    );
                })}
            </Box>
        </section>
    );
};

const useStyles = createStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: "2.5rem",
    },

    workingsBtnContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
    },

    workingsBtn: {
        transition: "border-color 100ms linear, color 150ms linear",

        ":hover": {
            borderColor: "#17A672",
            color: "#17A672",
            transition: "border-color 100ms linear, color 100ms linear",
        },
    },

    activeWorkingBtn: {
        borderColor: "#17A672",
        color: "#17A672",
    },

    workingCardsContainer: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gridAutoRows: "1fr",
        marginBlockStart: "1rem",
    },

    workingsCard: {
        padding: "3rem",
        borderRadius: "2rem",
        marginInline: "auto",
        gridRow: "1/2",
        gridColumn: "1/2",

        ":nth-of-type(1)": {
            width: "85%",
        },

        ":nth-of-type(2)": {
            width: "90%",
            transform: "translateY(10%)",
        },

        ":nth-of-type(3)": {
            width: "95%",
            transform: "translateY(20%)",
        },

        ":nth-of-type(4)": {
            width: "100%",
            transform: "translateY(30%)",
        },
    },

    workingsCardTitle: {
        fontSize: "2.2rem",
        lineHeight: "1.1",
        maxWidth: "17ch",
    },

    workingsCardText: {
        fontSize: "0.9rem",
        maxWidth: "40ch",
        marginBlockStart: "1rem",
    },
}));
