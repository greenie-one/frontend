import { Link } from "react-router-dom";
import { createStyles, Title, Text, rem, Box, Image } from "@mantine/core";
import { CustomButton } from "../common/CustomButton";

import girlCheckingPhone from "../../assets/images/girl-checking-phone.png";
import popup1 from "../../assets/images/popup-illustration-1.png";
import popup2 from "../../assets/images/popup-illustration-2.png";
import popup3 from "../../assets/images/popup-illustration-3.png";
import popup4 from "../../assets/images/popup-illustration-4.svg";
import popup5 from "../../assets/images/popup-illustration-5.svg";
import popup6 from "../../assets/images/popup-illustration-6.svg";

export const LandingHero = () => {
    const { classes } = useStyles();

    return (
        <section className={`${classes.root} section`}>
            <Box className={classes.heroContentContainer}>
                <Title order={1} className={classes.heroTitle}>
                    Unlocking the Future of Background Verification
                </Title>
                <Text className={classes.heroText}>
                    Streamlining background checks with State-of-the-Art
                    technology redefining trust in the verification industry
                </Text>
                <Box className={classes.heroActionBtn}>
                    <CustomButton
                        variant={"fill"}
                        border={true}
                        classNames={null}
                    >
                        Try For Free
                    </CustomButton>
                    <CustomButton
                        variant={"transparent"}
                        border={true}
                        classNames={null}
                    >
                        Signup
                    </CustomButton>
                </Box>
            </Box>
            <Box className={""}>
                <span className={classes.girlImageContainer}>
                    <img
                        src={girlCheckingPhone}
                        alt="girlCheckingPhone"
                        className={""}
                    />
                    <span className={classes.popups}>
                        <img src={popup1} alt="popup1" className={""} />
                    </span>
                    <span className={classes.popups}>
                        <img src={popup2} alt="popup2" className={""} />
                    </span>
                    <span className={classes.popups}>
                        <img src={popup3} alt="popup3" className={""} />
                    </span>
                    <span className={classes.popups}>
                        <img src={popup4} alt="popup4" className={""} />
                    </span>
                    <span className={classes.popups}>
                        <img src={popup5} alt="popup5" className={""} />
                    </span>
                    <span className={classes.popups}>
                        <img src={popup6} alt="popup6" className={""} />
                    </span>
                </span>
            </Box>
        </section>
    );
};

const useStyles = createStyles((theme) => ({
    root: {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "3rem",
        alignItems: "start",
    },

    heroContentContainer: {
        paddingBlockStart: "1rem",
    },

    heroTitle: {
        fontSize: "2.5rem",
    },

    heroText: {
        fontSize: "0.9rem",
        marginBlockStart: "1.75rem",
        marginBlockEnd: "1.25rem",
    },

    heroActionBtn: {
        display: "flex",
        gap: "1rem",
    },

    girlImageContainer: {
        aspectRatio: "1",
        width: "80%",
        display: "grid",
        placeItems: "center",
        marginInlineStart: "auto",
        position: "relative",
    },

    popups: {
        position: "absolute",

        ":nth-of-type(1)": {
            width: rem(300),
            transform: "translateX(-40%) translateY(-50%)",
            top: 0,
            left: 0,
        },

        ":nth-of-type(2)": {
            width: rem(280),
            transform: "translateX(-68.5%) translateY(-25%)",
            bottom: 0,
        },

        ":nth-of-type(3)": {
            width: rem(350),
            transform: "translateX(-45%) translateY(50%)",
            bottom: 0,
        },

        ":nth-of-type(4)": {
            width: rem(225),
            right: 0,
            top: "50%",
            transform: "translateX(50%) translateY(-35%)",
        },

        ":nth-of-type(5)": {
            width: rem(180),
            right: 0,
            top: "72%",
            transform: "translateX(60%) translateY(-35%)",
        },

        ":nth-of-type(6)": {
            width: rem(180),
            right: 0,
            top: "35%",
            transform: "translateX(50%) translateY(-35%)",
        },
    },
}));
