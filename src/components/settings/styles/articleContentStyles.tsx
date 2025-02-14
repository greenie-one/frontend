import { createStyles, rem, em } from '@mantine/core';

export const articleContentStyles = createStyles(() => ({
  settingsArticleContent: {
    padding: '2rem',
    background: '#FFFFFF',
    borderRadius: em(15),
  },
}));

export const detailsFormStyles = createStyles(() => ({
  detailsForm: {
    display: 'grid',
    alignItems: 'start',
    gap: '3rem',
  },

  profiledetailsForm: {
    display: 'flex',
    gap: '3rem',
  },

  detailsCategory: {
    display: 'grid',
    alignItems: 'start',
    gap: rem(14),
    maxWidth: rem(420),
  },

  detailsCategoryTitle: {
    fontSize: rem(15),
    color: '#191819',
    marginBlockEnd: rem(2),
    marginTop: rem(24),
  },

  textarea: {
    ['& textarea']: {
      height: rem(180),
      paddingBlockStart: rem(32),
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      color: '#697082',

      ['&::-webkit-scrollbar']: {
        display: 'none',
      },
    },
  },

  formSubmitBtn: {
    width: rem(140),
    fontSize: rem(15),
    fontWeight: 500,
    marginBlockStart: rem(40),
  },
  downloadBtn: {
    marginBlockStart: rem(0),
  },
}));

export const detailsInputStyles = createStyles(() => ({
  input: {
    maxWidth: rem(420),
    paddingBlockStart: rem(18),
    height: rem(60),
    fontSize: rem(14),
    fontWeight: 500,
    borderRadius: rem(8),
    color: '#697082',

    [`@media screen and (max-width: ${rem(768)})`]: {
      maxWidth: '100vw',
    },
  },

  innerInput: {
    maxWidth: rem(420),
    height: rem(60),
    paddingBlockStart: rem(18),
  },

  rightSection: {
    left: '23.5rem',
    top: '0.5rem',
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: rem(12),
    fontWeight: 400,
    zIndex: 1,
    paddingBlock: rem(8),
    paddingInline: rem(14),
    color: '#697082',
  },
}));

export const confirmationModalStyle = createStyles(() => ({
  body: {
    display: 'grid',
    placeItems: 'center',
    marginBlockStart: rem(10),
    paddingBlockEnd: rem(50),
  },

  title: {
    color: '#282828',
    fontSize: rem(18),
    fontWeight: 600,
  },

  confirmationMsgWrapper: {
    display: 'grid',
    placeItems: 'center',
    gap: rem(35),
  },
  downloadMsgWrapper: {
    display: 'grid',
    placeItems: 'center',
    gap: rem(25),
  },

  confirmationMsg: {
    maxWidth: '30ch',
    textAlign: 'center',
    color: '#191819',
    fontSize: rem(16),
    fontWeight: 500,
  },

  modalBtnsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: rem(20),
  },

  modalActionBtns: {
    width: rem(140),
    fontSize: rem(15),
    fontWeight: 500,
  },
}));

export const profileSettingsStyles = createStyles(() => ({
  profileChipsWrapper: {
    maxWidth: rem(640),
  },

  chipIcon: {
    ['& label']: {
      color: '#697082 !important',
      fontSize: rem(13),
      fontWeight: 500,

      ['&[data-checked]:not([data-disabled])']: {
        border: '1px solid #17A672',

        ['& span']: {
          color: '#17A672',
        },
      },
    },
  },
}));

export const generalSettingsStyles = createStyles(() => ({}));

export const privacySettingsStyles = createStyles(() => ({
  accountActionBtnsContainer: {
    display: 'grid',
    gap: rem(12),
    alignItems: 'start',
  },

  accountActionBtns: {
    width: 'max-content',
    color: '#697082',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginInline: em(25),
    marginBlock: em(12),
  },

  accountActionIcon: {
    color: 'inherit',
    display: 'grid',
    placeItems: 'center',
    fontSize: rem(19),
  },

  accountActionText: {
    color: 'inherit',
    fontSize: rem(15),
    fontWeight: 500,
  },
}));
