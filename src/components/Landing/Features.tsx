import React from "react";
import { createStyles, getStylesRef, Title, Text, Box } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { LandingSectionHeading } from "./SectionHeading";

type FeaturesCardPropsType = {
    cardBg: string;
    title: string;
    titleColor: string;
    text: string;
    textColor: string;
};

const FeaturesCard: React.FC<FeaturesCardPropsType> = ({
    cardBg,
    title,
    titleColor,
    text,
    textColor,
}): JSX.Element => {
    const { classes } = useStyles();

    return (
        <Box sx={{ backgroundColor: cardBg }} className={classes.featuresCard}>
            <Title
                sx={{ color: titleColor }}
                order={2}
                className={classes.featuresCardTitle}
            >
                {title}
            </Title>
            <Text
                sx={{ color: textColor }}
                className={classes.featuresCardText}
            >
                {text}
            </Text>
        </Box>
    );
};

const featuresCardContent = [
    {
        id: randomId(),
        cardBg: "#C7FFBC",
        title: "Instantly verify all documents at one place.",
        titleColor: "#260A30",
        text: "Streamlining background checks with State-of-the-Art technology redefining trust in the verification industry",
        textColor: "#000000",
    },
    {
        id: randomId(),
        cardBg: "#17A672",
        title: "Improve turn around time.",
        titleColor: "#FFFFFF",
        text: "Streamlining background checks with State-of-the-Art technology redefining trust in the verification industry",
        textColor: "#FFFFFF",
    },
    {
        id: randomId(),
        cardBg: "#17A672",
        title: "Live tracking.",
        titleColor: "#FFFFFF",
        text: "Streamlining background checks with State-of-the-Art technology redefining trust in the verification industry",
        textColor: "#FFFFFF",
    },
    {
        id: randomId(),
        cardBg: "#C7FFBC",
        title: "Control over data.",
        titleColor: "#310805",
        text: "Streamlining background checks with State-of-the-Art technology redefining trust in the verification industry",
        textColor: "#000000",
    },
];

export const LandingFeatures = () => {
    const { classes } = useStyles();

    return (
        <section className={`${classes.root} section`}>
            <LandingSectionHeading
                heading={"It is super simple, with Greenie"}
                subheading={
                    "Streamlining background checks with State-of-the-Art technology redefining trust in the verification industry"
                }
            />
            <Box className={classes.featureGrid}>
                {featuresCardContent.map((cardContent) => {
                    return (
                        <FeaturesCard
                            key={cardContent.id}
                            cardBg={cardContent.cardBg}
                            title={cardContent.title}
                            titleColor={cardContent.titleColor}
                            text={cardContent.text}
                            textColor={cardContent.textColor}
                        />
                    );
                })}
                <Box className={classes.manyMore}>...and many more</Box>
            </Box>
        </section>
    );
};

const useStyles = createStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: "3rem",
    },

    featureGrid: {
        marginBlockStart: "0.5rem",
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gridTemplateRows: "repeat(8, 4rem)",
        gap: "1rem",
        zIndex: -1,
    },

    featuresCard: {
        padding: "2rem",
        borderRadius: "1rem",

        ":nth-of-type(1)": {
            gridColumn: "1/4",
            gridRow: "1/5",

            [`& .${getStylesRef("featuresCardText")}`]: {
                maxWidth: "30ch",
            },
        },

        ":nth-of-type(2)": {
            gridColumn: "4/6",
            gridRow: "1/5",
        },

        ":nth-of-type(3)": {
            gridColumn: "1/3",
            gridRow: "5/9",
        },

        ":nth-of-type(4)": {
            gridColumn: "3/6",
            gridRow: "5/8",

            [`& .${getStylesRef("featuresCardText")}`]: {
                maxWidth: "25ch",
            },
        },
    },

    featuresCardTitle: {
        fontSize: "2.2rem",
        lineHeight: "1.1",

        ":nth-of-type(1)": {
            maxWidth: "20ch",
        },

        ":nth-of-type(4)": {
            maxWidth: "20ch",
        },
    },

    featuresCardText: {
        ref: getStylesRef("featuresCardText"),

        fontSize: "0.9rem",
        maxWidth: "20ch",
        marginBlockStart: "1rem",
    },

    manyMore: {
        gridColumn: "3/6",
        gridRow: "8/9",
        paddingInline: "2rem",
        display: "grid",
        placeItems: "center",
        borderRadius: "1rem",
        border: "2px solid #17A672",
        backgroundColor: "#FFFFFF",
        color: "#17A672",
        fontWeight: 700,
        fontSize: "1.75rem",
    },
}));
