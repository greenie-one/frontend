// import { useState } from 'react';
import { Layout } from '../components/candidate/profile/components/Layout';
import { useForm } from '@mantine/form';
import { PasswordInput, Group, Stack, TextInput, Button, Text } from '@mantine/core';
import '../components/candidate/profile/styles/_hrForm.scss';

export const AdminForm: React.FC = (): JSX.Element => {
  interface FormData {
    email: string;
    password: string;
  }
  const form = useForm<FormData>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    },
  });

  const reportForm = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    },
  });
  //   console.log(form.values);
  //   console.log(reportForm.values);
  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const onGenerateReportFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Layout>
        <div>
          <div className="hrFormContainer adminContainer">
            <Text className="formText">Create Account</Text>
          </div>
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
                  Generate Account
                </Button>
              </Group>
            </Stack>
          </form>
          <div className="hrFormContainer reportContainer">
            <Text className="formText">Enter Email for Report Generation</Text>
            <form className="hrForm adminForm" onSubmit={onGenerateReportFormSubmit}>
              <Stack>
                <TextInput
                  required
                  label="Email"
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
          </div>
        </div>
      </Layout>
    </>
  );
};
