import { createStyles, Button } from "@mantine/core";

type CustomButtonProps = {
    children: string | JSX.Element | JSX.Element[];
    variant: "fill" | "transparent";
    classNames: string | null;
    border: boolean;
};

export const CustomButton: React.FC<CustomButtonProps> = ({
    children,
    variant,
    classNames,
    border,
}) => {
    const { classes } = useStyles();

    return (
        <Button
            variant="subtle"
            color="dark"
            className={`${classNames} ${classes.customButton} ${
                classes[variant]
            } ${border ? null : classes.noBorder}`}
        >
            {children}
        </Button>
    );
};

const useStyles = createStyles((theme) => ({
    customButton: {
        borderRadius: "3rem",
        border: "1px solid",
    },

    transparent: {
        backgroundColor: "transparent",
        ":hover": {
            backgroundColor: "transparent",
        },
        borderColor: "#000000",
    },

    fill: {
        backgroundColor: "#8CF078",
        ":hover": {
            backgroundColor: "#8CF078",
        },
        borderColor: "#8CF078",
    },

    noBorder: {
        borderColor: "transparent",
    },
}));
