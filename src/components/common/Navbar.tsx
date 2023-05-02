import { useState } from "react";
import { Link } from "react-router-dom";

import { useDisclosure } from "@mantine/hooks";
import {
  createStyles,
  Drawer,
  List,
  Group,
  em,
  rem,
  Box,
  Flex,
} from "@mantine/core";

import { MdOutlineMenuOpen, MdVerified, MdOutlineClose } from "react-icons/md";

import { Button } from "./Button";

export const Navbar = () => {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);

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
        <Group className={classes.headerBtnsContainer}>
          <Button variant={"fill"} outline={true} classNames={classes.tryBtn}>
            Try Greenie
          </Button>
        </Group>
        {!opened ? (
          <span className={classes.menuBtn}>
            <MdOutlineMenuOpen
              role="button"
              className={classes.menuBtnIcon}
              onClick={open}
            />
          </span>
        ) : null}
        <Drawer
          opened={opened}
          onClose={close}
          withCloseButton={false}
          overlayProps={{ opacity: 0, blur: 0 }}
        >
          <nav className={classes.mobileNavOptionsContainer}>
            <Flex
              justify="space-between"
              align="center"
              direction="row"
              className={classes.mobileLogo}
            >
              <Link to={"/"}>
                <span className={`${classes.greenie} ${classes.mobileGreenie}`}>
                  Greenie
                </span>
                <span
                  className={`${classes.verified} ${classes.mobileVerified}`}
                >
                  <MdVerified />
                </span>
              </Link>
              <span className={classes.menuCloseBtn}>
                <MdOutlineClose role="button" onClick={close} />
              </span>
            </Flex>
            <List className={classes.mobileNavOptionsList}>
              <List.Item className={classes.mobileNavOptionsListItems}>
                Features
              </List.Item>
              <List.Item className={classes.mobileNavOptionsListItems}>
                Pricing
              </List.Item>
              <List.Item className={classes.mobileNavOptionsListItems}>
                About Us
              </List.Item>
            </List>
            <Group className={classes.mobileHeaderBtnsContainer}>
              <Button
                variant={"fill"}
                outline={true}
                classNames={classes.mobileTryBtn}
              >
                Try For Free
              </Button>
              <Button
                variant={"outline"}
                outline={true}
                classNames={classes.exploreBtn}
              >
                Explore
              </Button>
            </Group>
          </nav>
        </Drawer>
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

    [`@media screen and (max-width: ${em(768)})`]: {
      paddingBlock: "1rem",
      paddingInline: "0",
      borderRadius: 0,
      marginBlockStart: 0,
      boxShadow: "none",
    },
  },

  logo: {
    paddingInline: rem(10),
  },

  greenie: {
    fontSize: rem(22.5),
    fontWeight: 700,

    [`@media screen and (max-width: ${em(768)})`]: {
      fontSize: rem(20),
    },
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

    [`@media screen and (max-width: ${em(768)})`]: {
      display: "none",
    },
  },

  navOptionsList: {
    display: "flex",
    gap: rem(30),
    alignItems: "center",
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

  headerBtnsContainer: {
    [`@media screen and (max-width: ${em(768)})`]: {
      display: "none",
    },
  },

  tryBtn: {
    color: "white",
    backgroundColor: "#17A672 !important",
    borderColor: "#17A672 !important",
  },

  menuBtn: {
    display: "none",

    [`@media screen and (max-width: ${em(768)})`]: {
      display: "grid",
      placeItems: "center",
      fontSize: rem(24),
    },
  },

  menuBtnIcon: {},

  mobileLogo: {},

  mobileGreenie: {
    color: "white",
  },

  mobileVerified: {
    color: "white",
  },

  menuCloseBtn: {
    fontSize: rem(20),
    color: "white",
  },

  mobileNavOptionsContainer: {
    display: "none",

    [`@media screen and (max-width: ${em(768)})`]: {
      position: "absolute",
      inset: "0",
      height: "100dvh",
      width: "80%",
      maxWidth: rem(280),
      backgroundColor: "#047A4F",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      paddingBlock: "1.5rem",
      paddingInline: "2.5rem",
    },

    [`@media screen and (max-width: ${em(540)})`]: {
      paddingInline: "2rem",
      paddingBlock: "1rem",
    },
  },

  mobileNavOptionsList: {
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "flex-start",
  },

  mobileNavOptionsListItems: {
    fontSize: rem(16),
    cursor: "pointer",
    position: "relative",

    "::after": {
      content: '""',
      display: "block",
      position: "absolute",
      width: 0,
      bottom: "-2px",
      borderTop: "1px solid #8CF078",
      transition: "width 200ms linear",
    },

    ":hover": {
      color: "#8CF078",
      transition: "color 150ms linear",
    },

    ":hover::after": {
      width: "100%",
      transition: "width 200ms linear",
    },
  },

  mobileHeaderBtnsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBlockStart: "0.35rem",
  },

  mobileTryBtn: {
    color: "#000000",
    fontSize: rem(14),

    [`@media screen and (max-width: ${em(480)})`]: {
      fontSize: rem(13),
    },
  },

  exploreBtn: {
    borderColor: "#FFFFFF !important",
    color: "#FFFFFF",
    fontSize: rem(14),

    [`@media screen and (max-width: ${em(480)})`]: {
      fontSize: rem(13),
    },
  },
}));
