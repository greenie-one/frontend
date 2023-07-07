import { createStyles, rem, em } from '@mantine/core';

export const sidebarStyles = createStyles((theme) => ({
  settingsSidebar: {
    padding: '1rem',
    background: '#FFFFFF',
    borderRadius: em(15),
    maxHeight: rem(560),

    [`@media screen and (max-width: ${rem(768)})`]: {
      display: 'none',
    },
  },

  settingOptionsList: {
    display: 'grid',
    gap: rem(6),
    paddingBlockEnd: '1rem',
    borderBottom: '1px solid #D1D4DB',
  },

  settingOptionItems: {
    color: '#697082',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    paddingInline: em(15),
    paddingBlock: em(12),
    borderRadius: em(8),
    transition: 'background 150ms linear',

    ['&:hover']: {
      background: '#F4F4F4',
      transition: 'background 150ms linear',
    },
  },

  activeOptionItems: {
    background: '#F4F4F4',
  },

  settingOptionsIcon: {
    color: 'inherit',
    display: 'grid',
    placeItems: 'center',
    fontSize: rem(20),
  },

  settingOptionsText: {
    color: 'inherit',
    fontSize: rem(15),
    fontWeight: 500,
  },

  signOutBtn: {
    width: '100%',
    color: '#697082',
    marginBlockStart: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '8px',
    paddingInline: em(15),
    paddingBlock: em(12),
    borderRadius: em(8),
    transition: 'background 150ms linear',

    ['&:hover']: {
      background: '#F4F4F4',
      transition: 'background 150ms linear',
    },
  },

  signOutIcon: {
    color: 'inherit',
    fontSize: rem(18),
  },

  signOutText: {
    color: 'inherit',
    fontSize: rem(15),
    fontWeight: 500,
  },
}));
