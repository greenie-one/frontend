import { createStyles, rem, em } from '@mantine/core';

type ButtonProps = {
  children: string | JSX.Element | JSX.Element[];
  variant: 'fill' | 'outline';
  classNames: string | null;
  outline: boolean;
  onClick?: () => any;
};

export const Button: React.FC<ButtonProps> = ({ children, variant, classNames, outline, onClick }) => {
  const { classes } = useStyles();

  return (
    <button
      className={`${classes.customButton} ${classes[variant]} ${outline ? '' : classes.noOutline} ${classNames}`}
      onClick={onClick ? onClick : () => null}
    >
      {children}
    </button>
  );
};

const useStyles = createStyles((theme) => ({
  customButton: {
    borderRadius: '3rem',
    fontSize: rem(13),
    fontWeight: 600,
    paddingInline: em(22),
    paddingBlock: em(11),
  },

  outline: {
    backgroundColor: 'transparent',
    border: '1px solid #040404',
  },

  fill: {
    backgroundColor: '#8CF078',
    border: `1px solid #8CF078`,
  },

  noOutline: {
    border: '1px solid transparent',
  },
}));
