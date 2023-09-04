import { createStyles, Modal, Button, Group, Box, Title, rem, Chip } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import check from '../../components/candidate/profile/assets/check.png';
import { postUserFeedback } from './handleFeedbackProcess';
import { useGlobalContext } from '../../context/GlobalContext';

const feedbackType = {
  aadhar: 'Aadhar Verification',
  pan: 'PAN Verification',
  driving_license: 'Driving License Verification',
  add_work_exp: 'Add Experience',
  add_work_peer: 'Add Experience Verification Peer',
  add_residential_info: 'Add Address Information',
  add_residential_peer: 'Add Address Verification Peer',
};

type FeedbackProps = {
  opened: boolean;
  close: () => void;
  feedback: keyof typeof feedbackType;
  onFeedbackOver: () => void;
};

export const CandidateFeedback: React.FC<FeedbackProps> = ({
  opened,
  close,
  feedback,
  onFeedbackOver,
}): JSX.Element => {
  const { authClient } = useGlobalContext();
  const { classes } = useStyles();
  const isMobile = useMediaQuery('(max-width: 50em)');

  const experienceChips = ['Bad', 'Poor', 'Alright', 'Good', 'Loved it'];
  const referSomeoneChips = ['Nope', 'Maybe', 'Alright', 'I will', 'Already Referred'];

  const feedbackForm = useForm({
    initialValues: {
      flowExperience: '',
      referToSomeone: '',
      message: '',
    },
  });

  const submitFeedback = async () => {
    const response = await postUserFeedback(feedback, authClient, feedbackForm.values);
    if (response.status) {
      close();
      onFeedbackOver();
    } else {
      if (response.code === 'GR0061') {
        close();
        onFeedbackOver();
      } else {
        close();
      }
    }
  };

  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={close}
        closeOnEscape={true}
        fullScreen={isMobile}
        withCloseButton={false}
        closeOnClickOutside={false}
        transitionProps={{ transition: 'fade', duration: 200 }}
        overlayProps={{
          blur: 3,
        }}
      >
        <Box className={classes.modalBody}>
          <Title className={classes.modalTitle} order={3} align="center">
            We are Listening <img src={check} width={20} alt="tick" />
          </Title>
          <Box className={classes.feedbackGroup}>
            <p className={classes.feedbackTitle}>How was your experience of {feedbackType[feedback]} flow ?</p>
            <Chip.Group {...feedbackForm.getInputProps('flowExperience')}>
              <Group position="center">
                {experienceChips.map((data) => {
                  return (
                    <Chip key={data} value={data} color="teal">
                      {data}
                    </Chip>
                  );
                })}
              </Group>
            </Chip.Group>
          </Box>
          <Box className={classes.feedbackGroup}>
            <p className={classes.feedbackTitle}>How likely are you to refer Greenie to someone ?</p>
            <Chip.Group {...feedbackForm.getInputProps('referToSomeone')}>
              <Group position="center">
                {referSomeoneChips.map((data) => {
                  return (
                    <Chip key={data} value={data} color="teal">
                      {data}
                    </Chip>
                  );
                })}
              </Group>
            </Chip.Group>
          </Box>
          <Box className={classes.suggestionsGroup}>
            <p className={classes.feedbackTitle}>Any suggestions for us</p>
            <textarea
              className={classes.suggestionBox}
              onChange={(event) => feedbackForm.setFieldValue('message', event.target.value)}
            ></textarea>
          </Box>
          <Group position="center">
            <Button
              color="teal"
              onClick={submitFeedback}
              className={classes.formSubmitBtn}
              disabled={feedbackForm.values.flowExperience === '' || feedbackForm.values.referToSomeone === ''}
            >
              Submit Feedback
            </Button>
          </Group>
        </Box>
      </Modal>
    </>
  );
};

const useStyles = createStyles(() => ({
  modalBody: {
    width: '45rem',
    paddingBlock: '1rem 2rem',
    paddingInline: '2rem',
  },

  modalTitle: {
    fontWeight: 700,
    color: '#191919',
    fontSize: rem(24),
    marginBlockEnd: '1rem',
  },

  feedbackGroup: {
    marginBlock: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
  },

  feedbackTitle: {
    fontSize: rem(16),
    fontWeight: 500,
    color: '#191919',
  },

  suggestionsGroup: {
    width: '100%',
    marginBlockStart: '2rem',
  },

  suggestionBox: {
    marginBlockStart: '6px',
    width: '100%',
    height: '10rem',
    border: '1px solid',
    borderColor: '#CED4DA',
    borderRadius: '8px',
    padding: '0.5em 0.75em',
    color: '#191919',

    '&:focus': {
      border: 0,
      outline: '1px solid #12B886',
    },
  },

  formSubmitBtn: {
    marginBlockStart: '1rem',
    borderRadius: '3rem',
  },
}));
