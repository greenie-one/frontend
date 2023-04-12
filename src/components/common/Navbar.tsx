import { Link } from "react-router-dom";
import { createStyles, List, Group, rem, Box, Flex } from "@mantine/core";
import { MdVerified } from "react-icons/md";
import { CustomButton } from "./CustomButton";

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
                </nav>
                <Group>
                    <CustomButton
                        variant={"transparent"}
                        border={false}
                        classNames={classes.signupBtn}
                    >
                        Signup
                    </CustomButton>
                    <CustomButton
                        variant={"fill"}
                        border={true}
                        classNames={null}
                    >
                        Try For Free
                    </CustomButton>
                </Group>
            </header>
        </Box>
    );
};

const useStyles = createStyles((theme) => ({
    root: {
        paddingBlock: rem(24),
        position: "fixed",
        inset: 0,
        bottom: "auto",
    },

    header: {
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "space-between",
        gap: "2rem",
        padding: "1rem",
        borderRadius: "5rem",
    },

    logo: {
        paddingInline: rem(20),
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
        justifyContent: "flex-end",
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
            borderTop: "1px solid #9FE870",
            transition: "width 200ms linear",
        },

        ":hover": {
            color: "#9FE870",
            transition: "color 150ms linear",
        },

        ":hover::after": {
            width: "100%",
            transition: "width 200ms linear",
        },
    },

    signupBtn: {
        transition: "border-color 100ms linear, color 150ms linear",

        ":hover": {
            borderColor: "#8CF078",
            color: "#8CF078",
            transition: "border-color 100ms linear, color 100ms linear",
        },
    },
}));
