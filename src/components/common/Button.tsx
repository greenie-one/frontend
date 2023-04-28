import { createStyles, rem, em } from "@mantine/core";

type ButtonProps = {
    children: string | JSX.Element | JSX.Element[];
    variant: "fill" | "outline";
    color?: "#8CF078" | "#17A672";
    classNames: string | null;
    outline: boolean;
    onClick?: () => any;
};

export const Button: React.FC<ButtonProps> = ({
    children,
    variant,
    color = "#8CF078",
    classNames,
    outline,
    onClick,
}) => {
    const { classes } = useStyles({ color });

    return (
        <button
            className={`${classes.customButton} ${classes[variant]} ${
                outline ? "" : classes.noOutline
            } ${classNames}`}
            onClick={onClick ? onClick : () => null}
        >
            {children}
        </button>
    );
};

const useStyles = createStyles((theme, { color }) => ({
    customButton: {
        borderRadius: "3rem",
        fontSize: rem(13),
        fontWeight: 600,
        paddingInline: em(22),
        paddingBlock: em(11),
    },

    outline: {
        backgroundColor: "transparent",
        border: "1px solid #040404",
    },

    fill: {
        backgroundColor: color,
        border: `1px solid ${color}`,
    },

    noOutline: {
        border: "1px solid transparent",
    },
}));
