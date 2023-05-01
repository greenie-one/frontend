import { Box, createStyles, em } from "@mantine/core";
import React from "react";

type _2ColumnLayoutProps = {
    children: string | JSX.Element | JSX.Element[];
    onClick?: () => any;
};

export const _2ColumnLayout: React.FC<_2ColumnLayoutProps> = ({
    children,
}): JSX.Element => {
    const { classes } = useStyles();

    return <Box className={classes.root}>{children}</Box>;
};

const useStyles = createStyles((theme) => ({
    root: {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "3rem",

        [`@media screen and (max-width: ${em(1280)})`]: {
            gridTemplateColumns: "1fr",
        },
    },
}));
