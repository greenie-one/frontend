import { Modal, Button, Group, useMantineTheme, Box, Title, Textarea, Chip } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import check from '../../components/candidate/profile/assets/check.png';

type FeedbackProps = {
  flowName: string;
};

export const CandidateFeedback: React.FC<FeedbackProps> = ({ flowName }): JSX.Element => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 50em)');
  const [opened, { open, close }] = useDisclosure(false);

  const experienceChips = ['Bad', 'Poor', 'Alright', 'Good', 'Loved it'];
  const referSomeoneChips = ['Nope', 'Maybe', 'Alright', 'I will', 'Already Refered'];

  const feedbackForm = useForm({
    initialValues: {
      experience: '',
      referSomeone: '',
      feedback: '',
    },
  });

  const submitFeedback = () => {
    close();
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
          color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        <Box sx={{ margin: '.5rem .25rem' }}>
          <Title order={3} align="center">
            We are Listening <img src={check} width={20} alt="tick" />
          </Title>
          <Box sx={{ margin: '1.25rem 0 1rem' }}>
            <p>How was your experience of {flowName} flow ?</p>
            <Chip.Group {...feedbackForm.getInputProps('experience')}>
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
          <Box sx={{ margin: '1rem 0' }}>
            <p>How likely are you to refer Greenie to someone ?</p>
            <Chip.Group {...feedbackForm.getInputProps('referSomeone')}>
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
          <Box>
            <p>Any suggestions for us</p>
            <Textarea {...feedbackForm.getInputProps('feedback')} />
          </Box>
          <Button
            color="teal"
            onClick={submitFeedback}
            sx={{ marginTop: '1rem' }}
            disabled={feedbackForm.values.experience === '' || feedbackForm.values.referSomeone === ''}
          >
            Submit
          </Button>
        </Box>
      </Modal>

      <Group position="center">
        <Button onClick={open}>Open modal</Button>
      </Group>
    </>
  );
};
