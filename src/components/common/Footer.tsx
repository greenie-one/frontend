import React from "react";
import { Link } from "react-router-dom";
import {
    createStyles,
    List,
    Title,
    Text,
    rem,
    Box,
    Flex,
    TextInput,
} from "@mantine/core";
import { BsInstagram } from "react-icons/bs";
import { FiLinkedin } from "react-icons/fi";
import { MdOutlineFacebook, MdVerified } from "react-icons/md";

import { Button } from "./Button";

export const Footer: React.FC = (): JSX.Element => {
    const { classes } = useStyles();

    return (
        <Box className={`${classes.root} app-padding-inline section`}>
            <footer className={classes.footer}>
                <Box className={classes.footerGridContainer}>
                    <Box className={classes.gridLeftContainer}>
                        <Link to={"/"}>
                            <Flex
                                justify="center"
                                align="center"
                                direction="row"
                                className={classes.footerHeading}
                                gap={"sm"}
                            >
                                <span className={""}>We</span>
                                <span className={classes.verified}>
                                    <MdVerified />
                                </span>
                                <span className={""}>Greenie</span>
                            </Flex>
                        </Link>
                        <Title order={1} className={classes.footerTagline}>
                            On a mission to disrupt traditional background
                            verification.
                        </Title>
                        <Flex
                            justify="flex-start"
                            align="center"
                            direction="row"
                            className={classes.footerSocialLinks}
                            gap="md"
                        >
                            <span className={classes.socialLinkIcons}>
                                <MdOutlineFacebook />
                            </span>
                            <span className={classes.socialLinkIcons}>
                                <BsInstagram />
                            </span>
                            <span className={classes.socialLinkIcons}>
                                <FiLinkedin />
                            </span>
                        </Flex>
                    </Box>
                    <Box className={classes.gridLeftContainer}>
                        <form className={classes.form}>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Your Name"
                                className={classes.formInput}
                            />
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Your Email"
                                className={classes.formInput}
                            />
                            <Button
                                variant="fill"
                                classNames={""}
                                outline={true}
                            >
                                Try For Free
                            </Button>
                        </form>
                    </Box>
                </Box>
                <Box className={classes.footerBottom}>
                    <span className={""}>
                        <Flex
                            justify="center"
                            align="flex-start"
                            direction="column"
                            className={""}
                        >
                            <Link to={"/"}>
                                <span className={classes.greenie}>Greenie</span>
                                <span className={classes.verifiedBottom}>
                                    <MdVerified />
                                </span>
                            </Link>
                            <Text>
                                &copy; 2023 Greenie. All rights reserved
                            </Text>
                        </Flex>
                    </span>
                    <Text className={classes.madeInIndiaText}>
                        Made In India
                    </Text>
                    <List className={classes.navOptionsList}>
                        <List.Item className={classes.navOptionsListItems}>
                            Learn
                        </List.Item>
                        <List.Item className={classes.navOptionsListItems}>
                            Pricing
                        </List.Item>
                        <List.Item className={classes.navOptionsListItems}>
                            About Us
                        </List.Item>
                        <List.Item className={classes.navOptionsListItems}>
                            Career
                        </List.Item>
                    </List>
                </Box>
            </footer>
        </Box>
    );
};

const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: "#191819",
        color: "#FFFFFF",
    },

    footer: {
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
    },

    footerGridContainer: {
        display: "grid",
        gridTemplateColumns: "1.8fr 1.2fr",
        gap: "2.5rem",
        alignItems: "start",
    },

    gridLeftContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "1.5rem",
    },

    footerHeading: {
        fontSize: rem(40),
        fontWeight: 700,
    },

    verified: {
        fontSize: rem(30),
        color: "#9FE870",
    },

    footerTagline: {
        fontWeight: 600,
        lineHeight: "1.1",
        fontSize: rem(34),
        letterSpacing: "0.01em",
        color: "#8E8E8E",
    },

    footerSocialLinks: {
        marginBlockStart: "1.5rem",
    },

    socialLinkIcons: {
        fontSize: "1.5rem",
        display: "grid",
        placeItems: "center",
        padding: "0.6rem",
        border: "1px solid #656565",
        borderRadius: "10px",
        color: "rgba(255, 255, 255, 0.8)",
        background: "linear-gradient(180deg, #FFFFFF 0%, #898989 100%);",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },

    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginInlineStart: "auto",
        gap: "1rem",
    },

    formInput: {
        backgroundColor: "#2B2B2B",
        borderRadius: "3rem",
        paddingInline: "1.35rem",
        paddingBlock: "0.9rem",
        color: "#FFFFFF",
        fontSize: rem(14),

        "::placeholder": {
            color: "#FFFFFF",
        },
    },

    footerBottom: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        fontSize: rem(13),
    },

    greenie: {
        fontSize: rem(20),
        fontWeight: 600,
    },

    verifiedBottom: {
        fontSize: rem(17),
        color: "#9FE870",
        marginInlineStart: "0.25rem",
        display: "inline-grid",
        placeItems: "center",
        transform: "translateY(2px)",
    },

    madeInIndiaText: {},

    navOptionsList: {
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        paddingInline: rem(20),
        color: "#FFFFFF",
        fontSize: rem(13),
    },

    navOptionsListItems: {
        cursor: "pointer",
        transition: "color 150ms linear",
        position: "relative",

        ":hover": {
            color: "#9FE870",
            transition: "color 150ms linear",
        },
    },
}));
