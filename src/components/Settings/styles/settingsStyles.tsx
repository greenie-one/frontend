import { createStyles, rem } from '@mantine/core';

export const settingsStyles = createStyles((theme) => ({
  settingsMain: {
    paddingBlockStart: rem(128),
    paddingBlockEnd: '4.5rem',
    background: '#F9F9F9',
    minHeight: '100dvh',
  },

  settingsPageContainer: {
    paddingInline: '5rem',
    display: 'grid',
    gridTemplateColumns: '15rem 1fr',
    gap: '2rem',
    gridAutoFlow: 'column-reverse',

    [`@media screen and (max-width: ${rem(768)})`]: {
      gridTemplateColumns: '100%',
      paddingInline: '0.5rem',
    },
  },
}));
