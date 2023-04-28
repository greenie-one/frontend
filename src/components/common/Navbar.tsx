import { Link } from "react-router-dom";
import { createStyles, List, Group, rem, Box, Flex } from "@mantine/core";

import { MdVerified } from "react-icons/md";

import { Button } from "./Button";

export const Navbar = () => {
    const { classes } = useStyles();

    return (
        <Box className={`${classes.root} app-padding-inline`}>
            <header className={classes.header}>
                <Flex
                    justify="center"
                    align="center"
                    direction="row"
                    className={classes.logo}
                >
                    <Link to={"/"}>
                        <span className={classes.greenie}>Greenie</span>
                        <span className={classes.verified}>
                            <MdVerified />
                        </span>
                    </Link>
                </Flex>
                <nav className={classes.navOptionsContainer}>
                    <List className={classes.navOptionsList}>
                        <List.Item className={classes.navOptionsListItems}>
                            Features
                        </List.Item>
                        <List.Item className={classes.navOptionsListItems}>
                            Pricing
                        </List.Item>
                    </List>
                </nav>
                <Group>
                    <Button
                        variant={"fill"}
                        color={"#17A672"}
                        outline={true}
                        classNames={classes.tryBtn}
                    >
                        Try For Free
                    </Button>
                </Group>
            </header>
        </Box>
    );
};

const useStyles = createStyles((theme) => ({
    root: {
        position: "fixed",
        inset: 0,
        bottom: "auto",
        background:
            "linear-gradient(180deg, #ffffff 0%, #edfff9 44.79%, #ffffff 89.07%, #d7fff0 100%)",
        backgroundSize: "100dvw 100dvh",
    },

    header: {
        marginBlockStart: rem(20),
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.15)",
        display: "flex",
        justifyContent: "space-between",
        gap: "2rem",
        paddingBlock: "1rem",
        paddingInline: "1.6rem",
        borderRadius: "5rem",
    },

    logo: {
        paddingInline: rem(10),
    },

    greenie: {
        fontSize: rem(22.5),
        fontWeight: 700,
    },

    verified: {
        fontSize: rem(20),
        color: "#9FE870",
        marginInlineStart: "0.25rem",
    },

    navOptionsContainer: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    navOptionsList: {
        display: "flex",
        gap: rem(30),
        alignItems: "center",
        paddingInline: rem(20),
    },

    navOptionsListItems: {
        fontSize: rem(14),
        fontWeight: 500,
        cursor: "pointer",
        transition: "color 150ms linear",
        position: "relative",

        "::after": {
            content: '""',
            display: "block",
            position: "absolute",
            width: 0,
            bottom: "-2px",
            borderTop: "1px solid #17A672",
            transition: "width 200ms linear",
        },

        ":hover": {
            color: "#17A672",
            transition: "color 150ms linear",
        },

        ":hover::after": {
            width: "100%",
            transition: "width 200ms linear",
        },
    },

    tryBtn: {
        color: "white",
    },
}));
