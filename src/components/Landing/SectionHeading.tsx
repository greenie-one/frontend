import { createStyles, Title, Text, em, rem, Box, Image } from "@mantine/core";

type LandingSectionHeadingProps = {
    heading: string;
    subheading: string;
};

export const LandingSectionHeading: React.FC<LandingSectionHeadingProps> = ({
    heading,
    subheading,
}): JSX.Element => {
    const { classes } = useStyles();

    return (
        <>
            <Box className={`${classes.root}`}>
                <Title order={1} className={classes.sectionHeading}>
                    {heading}
                </Title>
                <Text className={classes.sectionSubHeading}>{subheading}</Text>
            </Box>
        </>
    );
};

const useStyles = createStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },

    sectionHeading: {
        fontSize: rem(45),

        [`@media screen and (max-width: ${em(1120)})`]: {
            fontSize: rem(40),
        },

        [`@media screen and (max-width: ${em(768)})`]: {
            fontSize: rem(36),
        },

        [`@media screen and (max-width: ${em(480)})`]: {
            fontSize: rem(32),
        },

        [`@media screen and (max-width: ${em(350)})`]: {
            fontSize: rem(28),
        },
    },

    sectionSubHeading: {
        fontSize: "0.9rem",
        maxWidth: "55ch",
        marginBlockStart: "1rem",

        [`@media screen and (max-width: ${em(480)})`]: {
            fontSize: "0.875rem",
            marginBlockStart: "0.75rem",
        },
    },
}));
