import { Layout } from '../components/candidate/profile/components/Layout';
import { hasLength, isNotEmpty, useForm } from '@mantine/form';
import { Box, PasswordInput, Group, Stack, TextInput, Button, Tabs } from '@mantine/core';
import '../components/candidate/profile/styles/_hrForm.scss';
import { useNavigate } from 'react-router-dom';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../utils/functions/showNotification';
import { HttpClient } from '../utils/generic/httpClient';
import { BASE_URL, reportAPI } from '../assets/api/ApiList';
import { useGlobalContext } from '../context/GlobalContext';

type FormData = {
  email: string;
  password: string;
};

export const AdminForm: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { authClient } = useGlobalContext();

  const form = useForm<FormData>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: hasLength({ min: 9, max: 72 }, 'Password must have at least 9 characters'),
    },
  });

  const reportForm = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: isNotEmpty('This field is required!'),
    },
  });

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.validate().hasErrors) {
      return;
    }

    const requestBody = {
      email: form.values.email,
      password: form.values.password,
      roles: ['hr'],
    };

    showLoadingNotification({ title: 'Please Wait', message: 'Creating new account...' });
    const res = await HttpClient.callApiAuth<{ message: string }>(
      {
        url: `${BASE_URL}/utils/admin/create_account`,
        method: 'POST',
        body: requestBody,
      },
      authClient
    );

    if (res.ok) {
      showSuccessNotification({ title: 'Success', message: 'New account created' });
      form.reset();
    } else {
      showErrorNotification(res.error.code);
    }
  };

  const onGenerateReportFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (reportForm.validate().hasErrors) {
      return;
    }

    const emailId = reportForm.values.email;

    showLoadingNotification({ title: 'Please Wait', message: '' });

    try {
      const res = await HttpClient.callApiAuth<ReportData>(
        {
          url: `${reportAPI}?email=${emailId}`,
          method: 'GET',
        },
        authClient
      );

      if (res.ok) {
        navigate(`/screens?email=${emailId}`);
        showSuccessNotification({ title: 'Success', message: '' });
      } else {
        showErrorNotification(res.error.code);
        throw new Error(JSON.stringify(res.error));
      }
    } catch (err: unknown) {
      console.error('~ AdminForm.tsx ~ onGenerateReportFormSubmit(): ', JSON.parse(String(err)));
    }
  };

  return (
    <Layout>
      <Box className="page-container">
        <Tabs defaultValue="createAccount" color="dark">
          <Tabs.List className="tabList" position="center">
            <Tabs.Tab className="tabBtn" value="createAccount">
              Create an Account
            </Tabs.Tab>
            <Tabs.Tab className="tabBtn" value="generateReport">
              Generate Report
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="createAccount">
            <form className="hrForm adminForm" onSubmit={onFormSubmit}>
              <Stack>
                <TextInput
                  required
                  label="Email"
                  placeholder="hello@gmail.com"
                  value={form.values.email}
                  onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                  error={form.errors.email && 'Invalid email'}
                  radius="md"
                />
                <PasswordInput
                  required
                  label="Password"
                  placeholder="Enter password"
                  value={form.values.password}
                  onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                  radius="md"
                />

                <Group position="apart" mt="xl">
                  <Button className="sendInvite" type="submit" radius="xl">
                    Create Account
                  </Button>
                </Group>
              </Stack>
            </form>
          </Tabs.Panel>
          <Tabs.Panel value="generateReport">
            <form className="hrForm adminForm" onSubmit={onGenerateReportFormSubmit}>
              <Stack>
                <TextInput
                  required
                  label="Email or Phone"
                  placeholder="hello@gmail.com"
                  value={reportForm.values.email}
                  onChange={(event) => reportForm.setFieldValue('email', event.currentTarget.value)}
                  error={reportForm.errors.email && 'Invalid email'}
                  radius="md"
                />
                <Group position="apart" mt="xl">
                  <Button className="sendInvite" type="submit" radius="xl">
                    Generate Report
                  </Button>
                </Group>
              </Stack>
            </form>
          </Tabs.Panel>
        </Tabs>
      </Box>
    </Layout>
  );
};
