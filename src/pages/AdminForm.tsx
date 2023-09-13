import { Layout } from '../components/candidate/profile/components/Layout';
import { hasLength, isEmail, useForm } from '@mantine/form';
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
import { useState } from 'react';

type FormData = {
  email: string;
  password: string;
};

export const AdminForm: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { authClient } = useGlobalContext();

  const [inputValue, setInputValue] = useState<'email' | 'phone' | 'greenieId'>('email');

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
      phone: '',
      greenieId: '',
    },
    validate: {
      email: isEmail('This field is required!'),
      phone: hasLength({ min: 10, max: 10 }, 'Phone number must of 10 digits'),
      greenieId: hasLength({ min: 8, max: 8 }, 'Greenie ID must of 8 characters'),
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

    if (reportForm.validateField(inputValue).hasError) {
      return;
    }

    const query =
      inputValue === 'email'
        ? `${encodeURIComponent('email')}=${encodeURIComponent(reportForm.values.email.trim())}`
        : inputValue === 'phone'
        ? `${encodeURIComponent('phone')}=${encodeURIComponent('+91' + reportForm.values.phone.slice(-10))}`
        : `${encodeURIComponent('greenieId')}=${encodeURIComponent(reportForm.values.greenieId.trim())}`;

    showLoadingNotification({ title: 'Please Wait', message: '' });

    try {
      const res = await HttpClient.callApiAuth<ReportData>(
        {
          url: `${reportAPI}?${query}`,
          method: 'GET',
        },
        authClient
      );

      if (res.ok) {
        navigate(`/screens?${query}`);
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
                  error={form.errors.password && 'Password must be at least 9 characters long'}
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
                <Box>
                  <TextInput
                    required
                    label={`Enter Candidate ${
                      inputValue === 'email' ? 'Email' : inputValue === 'phone' ? 'Phone Number' : 'Greenie ID'
                    }`}
                    placeholder={
                      inputValue === 'email'
                        ? 'hello@gmail.com'
                        : inputValue === 'phone'
                        ? '9876543210'
                        : 'Greenie ID Here'
                    }
                    value={
                      inputValue === 'email'
                        ? reportForm.values.email
                        : inputValue === 'phone'
                        ? reportForm.values.phone
                        : reportForm.values.greenieId
                    }
                    onChange={(event) => reportForm.setFieldValue(inputValue, event.currentTarget.value)}
                    error={
                      inputValue === 'email'
                        ? reportForm.errors.email && 'Invalid email'
                        : inputValue === 'phone'
                        ? reportForm.errors.phone && 'Invalid phone number'
                        : reportForm.errors.greenieId && 'Invalid greenie ID'
                    }
                    radius="md"
                  />
                  {inputValue === 'email' && (
                    <>
                      <button
                        type="button"
                        style={{
                          color: '#697082',
                          fontWeight: '500',
                          fontSize: '0.825rem',
                          borderBottom: '1px solid #697082',
                          marginBlock: '1rem',
                        }}
                        onClick={() => {
                          reportForm.clearErrors();
                          reportForm.reset();
                          setInputValue('phone');
                        }}
                      >
                        Use Phone Number
                      </button>
                      <button
                        type="button"
                        style={{
                          color: '#697082',
                          fontWeight: '500',
                          fontSize: '0.825rem',
                          borderBottom: '1px solid #697082',
                          marginBlock: '1rem',
                        }}
                        onClick={() => {
                          reportForm.clearErrors();
                          reportForm.reset();
                          setInputValue('greenieId');
                        }}
                      >
                        Use Greenie ID
                      </button>
                    </>
                  )}
                  {inputValue === 'phone' && (
                    <>
                      <button
                        type="button"
                        style={{
                          color: '#697082',
                          fontWeight: '500',
                          fontSize: '0.825rem',
                          borderBottom: '1px solid #697082',
                          marginBlock: '1rem',
                        }}
                        onClick={() => {
                          reportForm.clearErrors();
                          reportForm.reset();
                          setInputValue('email');
                        }}
                      >
                        Use Email
                      </button>
                      <button
                        type="button"
                        style={{
                          color: '#697082',
                          fontWeight: '500',
                          fontSize: '0.825rem',
                          borderBottom: '1px solid #697082',
                          marginBlock: '1rem',
                        }}
                        onClick={() => {
                          reportForm.clearErrors();
                          reportForm.reset();
                          setInputValue('greenieId');
                        }}
                      >
                        Use Greenie ID
                      </button>
                    </>
                  )}
                  {inputValue === 'greenieId' && (
                    <>
                      <button
                        type="button"
                        style={{
                          color: '#697082',
                          fontWeight: '500',
                          fontSize: '0.825rem',
                          borderBottom: '1px solid #697082',
                          marginBlock: '1rem',
                        }}
                        onClick={() => {
                          reportForm.clearErrors();
                          reportForm.reset();
                          setInputValue('email');
                        }}
                      >
                        Use Email
                      </button>
                      <button
                        type="button"
                        style={{
                          color: '#697082',
                          fontWeight: '500',
                          fontSize: '0.825rem',
                          borderBottom: '1px solid #697082',
                          marginBlock: '1rem',
                        }}
                        onClick={() => {
                          reportForm.clearErrors();
                          reportForm.reset();
                          setInputValue('phone');
                        }}
                      >
                        Use Phone Number
                      </button>
                    </>
                  )}
                </Box>
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
