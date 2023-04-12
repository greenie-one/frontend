import {
    createStyles,
    Title,
    Text,
    Button,
    Container,
    Group,
    rem,
    Box,
} from "@mantine/core";
import { LandingHero } from "../components/Landing/Hero";

export const Landing = () => {
    const { classes } = useStyles();

    return (
        <>
            <div className={`${classes.root} page`}>
                <LandingHero />
            </div>
        </>
    );
};

const useStyles = createStyles((theme) => ({
    root: {},
}));
