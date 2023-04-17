import { createStyles } from "@mantine/core";

import { LandingHero } from "../components/Landing/Hero";
import { LandingFeatures } from "../components/Landing/Features";
import { LandingGreenieWorkings } from "../components/Landing/GreenieWorking";
import { Hiring } from "../components/Landing/Hiring";

export const Landing = () => {
    const { classes } = useStyles();

    return (
        <>
            <div className={`${classes.root} page`}>
                <LandingHero />
                <LandingFeatures />
                <LandingGreenieWorkings />
                <Hiring />
            </div>
        </>
    );
};

const useStyles = createStyles((theme) => ({
    root: {},
}));
