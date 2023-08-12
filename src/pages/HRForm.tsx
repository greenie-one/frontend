// import { useState } from 'react';
import { Layout } from '../components/candidate/profile/components/Layout';
import { useForm } from '@mantine/form';
import { List, FileButton, Textarea, Group, Stack, Title, TextInput, Button, Text } from '@mantine/core';
import '../components/candidate/profile/styles/_hrForm.scss';

export const HRForm: React.FC = (): JSX.Element => {
  //   const [files, setFiles] = useState<File[]>([]);
  interface FormData {
    email: string;
    name: string;
    phoneNumber: string;
    message: string;
    files: File[];
  }
  const form = useForm<FormData>({
    initialValues: {
      email: '',
      name: '',
      phoneNumber: '',
      message: '',
      files: [],
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    },
  });
  console.log(form.values);
  //   console.log(files);
  const handleFilesChange = (files: File[]) => {
    form.setFieldValue('files', files);
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Layout>
        <div className="hrFormContainer">
          <Title className="formHeading">Welcome to </Title>
          <Title className="formHeading">Greenie Company Dashboard</Title>
          <Text className="formText">Invite to get Pre-verified candidates</Text>
        </div>
        <form className="hrForm" onSubmit={onFormSubmit}>
          <Stack>
            <TextInput
              required
              //   className="inputClass"
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />

            <TextInput
              required
              //   className="inputClass"
              label="Email"
              placeholder="hello@gmail.com"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />
            <TextInput
              required
              //   className="inputClass"
              label="WhatsApp number"
              placeholder="Your WhatsApp number"
              maxLength={10}
              minLength={10}
              value={form.values.phoneNumber}
              onChange={(event) => form.setFieldValue('phoneNumber', event.currentTarget.value)}
              radius="md"
            />
            <div>
              <Group position="center">
                <FileButton onChange={handleFilesChange} multiple>
                  {(props) => (
                    <Button className="sendInvite" radius="xl" {...props}>
                      Bulk Upload
                    </Button>
                  )}
                </FileButton>
              </Group>

              {form.values.files.length > 0 && (
                <Text size="sm" mt="sm">
                  Picked files:
                </Text>
              )}

              <List size="sm" mt={5} withPadding>
                {form.values.files.map((file, index) => (
                  <List.Item key={index}>{file.name}</List.Item>
                ))}
              </List>
            </div>

            <div>
              <Title className="sendmessage">Send Message</Title>
              <Textarea
                label="Enter Your Message"
                className="text-area-input "
                minRows={8}
                maxLength={250}
                value={form.values.message}
                onChange={(event) => form.setFieldValue('message', event.currentTarget.value)}
              />
              <Group position="apart" mt="xl">
                <Button className="sendInvite" type="submit" radius="xl">
                  Send Invite
                </Button>
              </Group>
            </div>
          </Stack>
        </form>
      </Layout>
    </>
  );
};
