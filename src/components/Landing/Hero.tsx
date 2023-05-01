import { useEffect, useState } from "react";
import {
    createStyles,
    Title,
    Text,
    rem,
    Box,
    keyframes,
    em,
} from "@mantine/core";
import { _2ColumnLayout } from "../layouts/_2ColumnLayout";
import { Button } from "../common/Button";

import girlCheckingPhone from "../../assets/images/girl-checking-phone.png";
import popup1 from "../../assets/images/popup-illustration-1.svg";
import popup2 from "../../assets/images/popup-illustration-2.svg";
import popup3 from "../../assets/images/popup-illustration-3.svg";
import popup4 from "../../assets/images/popup-illustration-4.svg";
import popup5 from "../../assets/images/popup-illustration-5.svg";
import popup6 from "../../assets/images/popup-illustration-6.svg";

const popupAnimation = keyframes({
    from: { scale: "0.25" },
    to: { scale: "1" },
});

export const LandingHero = () => {
    const { classes } = useStyles();
    const [popupNo, setPopupNo] = useState<number>(-1);

    const activatePopups = () => {
        let activePopup = 0;

        const activatePopupInterval = setInterval(() => {
            if (activePopup === 5) {
                clearInterval(activatePopupInterval);
                return;
            }

            setPopupNo(activePopup);
            activePopup = activePopup + 1;
        }, 1000);
    };

    useEffect(() => {
        const activatePopupTimeout = setTimeout(() => {
            activatePopups();
            clearTimeout(activatePopupTimeout);
        }, 150);
    }, []);

    return (
        <section className={`${classes.root} section`}>
            <_2ColumnLayout>
                <Box className={classes.heroContentContainer}>
                    <Title order={1} className={classes.heroTitle}>
                        Unlocking the Future of Background Verification
                    </Title>
                    <Text className={classes.heroText}>
                        Streamlining background checks with State-of-the-Art
                        technology redefining trust in the verification industry
                    </Text>
                    <Box className={classes.heroActionBtn}>
                        <Button variant={"fill"} outline={true} classNames={""}>
                            Try For Free
                        </Button>
                        {/* <Button
                            variant={"outline"}
                            outline={true}
                            classNames={""}
                        >
                            Signup
                        </Button> */}
                    </Box>
                </Box>
                <Box className={classes.heroIllustration}>
                    <span className={classes.girlImageContainer}>
                        <img
                            src={girlCheckingPhone}
                            alt="girlCheckingPhone"
                            className={""}
                        />
                        {popupNo >= 4 ? (
                            <span
                                className={`${classes.popups} ${classes.popup1}`}
                            >
                                <img src={popup1} alt="popup1" />
                            </span>
                        ) : null}
                        {popupNo >= 3 ? (
                            <span
                                className={`${classes.popups} ${classes.popup2}`}
                            >
                                <img src={popup2} alt="popup2" />
                            </span>
                        ) : null}
                        {popupNo >= 2 ? (
                            <span
                                className={`${classes.popups} ${classes.popup3}`}
                            >
                                <img src={popup3} alt="popup3" />
                            </span>
                        ) : null}
                        {popupNo >= 0 ? (
                            <span
                                className={`${classes.popups} ${classes.popup4}`}
                            >
                                <img src={popup4} alt="popup4" />
                            </span>
                        ) : null}
                        {popupNo >= 1 ? (
                            <span
                                className={`${classes.popups} ${classes.popup5}`}
                            >
                                <img src={popup5} alt="popup5" />
                            </span>
                        ) : null}
                        {popupNo >= 0 ? (
                            <span
                                className={`${classes.popups} ${classes.popup6}`}
                            >
                                <img src={popup6} alt="popup6" />
                            </span>
                        ) : null}
                    </span>
                </Box>
            </_2ColumnLayout>
        </section>
    );
};

const useStyles = createStyles((theme) => ({
    root: {
        alignItems: "start",
    },

    heroContentContainer: {
        paddingBlockStart: "1rem",
        marginBlockStart: "2rem",

        [`@media screen and (max-width: ${em(1280)})`]: {
            gridRow: "2/3",
        },
    },

    heroTitle: {
        fontSize: "2.5rem",

        [`@media screen and (max-width: ${em(1280)})`]: {
            textAlign: "center",
            maxWidth: "25ch",
            marginInline: "auto",
        },

        [`@media screen and (max-width: ${em(768)})`]: {
            fontSize: "2rem",
        },

        [`@media screen and (max-width: ${em(540)})`]: {
            fontSize: "1.75rem",
        },

        [`@media screen and (max-width: ${em(414)})`]: {
            fontSize: "1.5rem",
        },
    },

    heroText: {
        fontSize: "0.9rem",
        marginBlockStart: "1.75rem",
        marginBlockEnd: "1.25rem",

        [`@media screen and (max-width: ${em(1280)})`]: {
            textAlign: "center",
            marginInline: "auto",
        },

        [`@media screen and (max-width: ${em(768)})`]: {
            marginBlockStart: "1.25rem",
        },

        [`@media screen and (max-width: ${em(540)})`]: {
            marginBlockStart: "1rem",
        },
    },

    heroActionBtn: {
        display: "flex",
        gap: "1rem",

        [`@media screen and (max-width: ${em(1280)})`]: {
            justifyContent: "center",
        },
    },

    heroIllustration: {
        zIndex: -1,

        [`@media screen and (max-width: ${em(1280)})`]: {
            gridRow: "1/2",
        },
    },

    girlImageContainer: {
        aspectRatio: "1",
        width: "80%",
        display: "grid",
        placeItems: "center",
        marginInlineStart: "auto",
        position: "relative",

        [`@media screen and (max-width: ${em(1280)})`]: {
            width: `min(80%, ${rem(450)})`,
            marginInlineEnd: "auto",
        },
    },

    popups: {
        position: "absolute",
        animation: `${popupAnimation} 200ms ease-in-out`,
        transformOrigin: "center",
    },

    popup1: {
        width: rem(300),
        transform: "translateX(-40%) translateY(-50%)",
        top: 0,
        left: 0,

        [`@media screen and (max-width: ${em(768)})`]: {
            width: "35dvw",
        },
    },

    popup2: {
        width: rem(280),
        transform: "translateX(-68.5%) translateY(-25%)",
        bottom: 0,

        [`@media screen and (max-width: ${em(768)})`]: {
            width: "40dvw",
        },
    },

    popup3: {
        width: rem(350),
        transform: "translateX(-45%) translateY(50%)",
        bottom: 0,

        [`@media screen and (max-width: ${em(768)})`]: {
            width: "50dvw",
        },
    },

    popup4: {
        width: rem(225),
        right: 0,
        top: "50%",
        transform: "translateX(50%) translateY(-35%)",

        [`@media screen and (max-width: ${em(768)})`]: {
            width: "32dvw",
        },
    },

    popup5: {
        width: rem(180),
        right: 0,
        top: "72%",
        transform: "translateX(60%) translateY(-35%)",

        [`@media screen and (max-width: ${em(768)})`]: {
            width: "30dvw",
            transform: "translateX(45%) translateY(-55%)",
        },
    },

    popup6: {
        width: rem(180),
        right: 0,
        top: "35%",
        transform: "translateX(50%) translateY(-35%)",

        [`@media screen and (max-width: ${em(768)})`]: {
            width: "27dvw",
            transform: "translateX(50%) translateY(-25%)",
        },
    },
}));
