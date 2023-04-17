import { createStyles, Title, Text, rem, Box, Image } from "@mantine/core";

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
    },

    sectionSubHeading: {
        fontSize: "0.9rem",
        maxWidth: "55ch",
        marginBlockStart: "1rem",
    },
}));
