import { createStyles, Button } from "@mantine/core";

type CustomButtonProps = {
    children: string | JSX.Element | JSX.Element[];
    variant: "fill" | "outline";
    classNames: string | null;
    outline: boolean;
    onClick?: () => any;
};

export const CustomButton: React.FC<CustomButtonProps> = ({
    children,
    variant,
    classNames,
    outline,
    onClick,
}) => {
    const { classes } = useStyles();

    return (
        <Button
            variant="subtle"
            color="dark"
            className={`${classes.customButton} ${classes[variant]} ${
                outline ? "" : classes.noOutline
            } ${classNames}`}
            onClick={onClick ? onClick : () => null}
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

    outline: {
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

    noOutline: {
        borderColor: "transparent",
    },
}));
