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
import { LandingFeatures } from "../components/Landing/Features";
import { LandingGreenieWorkings } from "../components/Landing/GreenieWorking";

export const Landing = () => {
    const { classes } = useStyles();

    return (
        <>
            <div className={`${classes.root} page`}>
                <LandingHero />
                <LandingFeatures />
                <LandingGreenieWorkings />
            </div>
        </>
    );
};

const useStyles = createStyles((theme) => ({
    root: {},
}));
