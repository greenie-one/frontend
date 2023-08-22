import { useRef, useState } from 'react';
import { Footer } from '../components/candidate/profile/components/Footer';
import { HRNavbar } from '../components/candidate/profile/components/HRNavbar';
import { hasLength, isNotEmpty, useForm } from '@mantine/form';
import { Textarea, Group, Stack, Title, TextInput, Button, Text } from '@mantine/core';
import '../components/candidate/profile/styles/_hrForm.scss';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../utils/functions/showNotification';
import { VscDebugRestart } from 'react-icons/vsc';
import { MdOutlineDelete } from 'react-icons/md';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { HttpClient } from '../utils/generic/httpClient';
import { useGlobalContext } from '../context/GlobalContext';
import { BASE_URL } from '../assets/api/ApiList';
import axios from 'axios';

type FormData = {
  email: string;
  name: string;
  phone: string;
  message: string;
};

export const HRForm: React.FC = (): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { authClient } = useGlobalContext();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<string>('');

  const form = useForm<FormData>({
    initialValues: {
      email: '',
      name: '',
      phone: '',
      message: '',
    },

    validate: {
      name: isNotEmpty('Name is required!'),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      phone: hasLength(10, 'Invalid Phonw Number! Length must be 10'),
    },
  });

  const handleUploadDocument = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInputTarget = event.target as typeof event.target & {
      files: Array<File>;
    };
    showLoadingNotification({ title: 'Please wait !', message: 'Please wait while we add your document' });

    if (fileInputTarget.files && fileInputTarget.files[0]) {
      if (fileInputTarget.files[0].size > 5 * 1024 * 1024) {
        showErrorNotification('SIZE_EXCEEDS');
      } else {
        const documentFile = fileInputTarget.files[0];
        setSelectedFile(documentFile);

        const documentURL = URL.createObjectURL(documentFile);
        setFileURL(documentURL);

        showSuccessNotification({ title: 'File selected ', message: '' });
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSubmitDocument = async () => {
    if (selectedFile === null) {
      showErrorNotification('Please select a file to upload!');
      return;
    }

    showLoadingNotification({ title: 'Please wait !', message: 'Please wait while we submit your document' });

    const formData = new FormData();
    formData.append('document', selectedFile);
    const authToken = authClient.getAccessToken();

    try {
      const res = await axios.post(`${BASE_URL}/utils/leads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (res.data) {
        showSuccessNotification({ title: 'Success', message: 'Document submitted successfully!' });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
          setSelectedFile(null);
        }
      }
    } catch (err: unknown) {
      console.error('~ HRForm.tsx ~ handleSubmitDocument(): ', err);
    }
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.validate().hasErrors) {
      return;
    }

    showLoadingNotification({ title: 'Please Wait', message: 'We are submitting your request...' });
    const requestBody = form.values;

    try {
      const res = await HttpClient.callApiAuth<{ success: boolean }>(
        {
          url: `${BASE_URL}/googleSheets/addData`,
          method: 'POST',
          body: requestBody,
        },
        authClient
      );

      if (res.ok) {
        showSuccessNotification({ title: 'Success', message: 'Invitation added successfully!' });
        form.reset();
      } else {
        showErrorNotification(res.error.code);
        throw new Error(JSON.stringify(res.error));
      }
    } catch (err: unknown) {
      console.error('~ HRForm.tsx ~ onFormSubmit ~ 107: ', JSON.parse(String(err)));
    }
  };

  return (
    <>
      <HRNavbar />
      <main className="profile">
        <div className="hrFormWrapper">
          <div className="hrFormContainer">
            <Title className="formHeading">Welcome to </Title>
            <Title className="formHeading">Greenie Company Dashboard</Title>
            <Text className="formText">Invite to get Pre-verified candidates</Text>
          </div>
          <form className="hrForm" onSubmit={onFormSubmit}>
            <Stack>
              <TextInput
                withAsterisk
                label="Name"
                placeholder="Your name"
                {...form.getInputProps('name')}
                radius="md"
              />
              <TextInput
                withAsterisk
                label="Email"
                placeholder="name@example.com"
                {...form.getInputProps('email')}
                radius="md"
              />
              <TextInput
                withAsterisk
                label="WhatsApp Number"
                placeholder="WhatsApp number"
                {...form.getInputProps('phone')}
                radius="md"
              />
              <div>
                <Title className="sendMessage">Send Message</Title>
                <Textarea
                  label="Enter Your Message..."
                  className="text-area-input "
                  minRows={8}
                  maxLength={250}
                  {...form.getInputProps('message')}
                />
                <Group position="apart" mt="xl">
                  <Button className="sendInvite" type="submit" radius="xl">
                    Send a Personalized Invite
                  </Button>
                </Group>
              </div>
            </Stack>
          </form>
          <span className="dividerText">OR</span>
          <div className="bulkUploadContainer">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept=".xls, .xlsx, .csv"
              onChange={handleUploadDocument}
            />
            {selectedFile === null && (
              <>
                <Group position="center">
                  <Button radius={'xl'} className="addDocumentBtn" onClick={() => fileInputRef.current?.click()}>
                    Upload Information in Bulk
                  </Button>
                </Group>
                <Text className="limit">
                  (Only <strong className="filesFormate">.xls, .xlsx, .csv</strong> files of size less than{' '}
                  <strong>5 MB</strong>)
                </Text>
              </>
            )}
            {selectedFile !== null && (
              <div className="inputFileNameBox">
                <Text className="label">File Uploaded -</Text>
                <div className="fileInfoBox">
                  <Text className="inputFileName">
                    <span className="fileIcon">
                      <RiFileExcel2Fill />
                    </span>
                    <a href={fileURL} target="_blank" rel="noopener noreferrer">
                      {selectedFile?.name.substring(0, 50)}
                    </a>
                  </Text>
                  <div className="iconGroup">
                    <VscDebugRestart className="add-document-icon" onClick={() => fileInputRef.current?.click()} />
                    <MdOutlineDelete className="add-document-icon" onClick={() => setSelectedFile(null)} />
                  </div>
                </div>
              </div>
            )}
            {selectedFile !== null && (
              <Button radius={'xl'} className="addDocumentBtn" onClick={handleSubmitDocument}>
                Submit Uploaded Document
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
