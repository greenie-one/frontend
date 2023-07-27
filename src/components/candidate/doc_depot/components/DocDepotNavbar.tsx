import { useEffect, useState } from 'react';
import { Box, Button, Title, TextInput, createStyles, em, Modal, Select, Divider } from '@mantine/core';
import { GoSearch } from 'react-icons/go';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { docDepotAPIList } from '../../../../assets/api/ApiList';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { useRef } from 'react';
import {
  showErrorNotification,
  showSuccessNotification,
  showLoadingNotification,
} from '../../../../utils/functions/showNotification';
import axios from 'axios';
import { HttpClient, Result } from '../../../../utils/generic/httpClient';
import { useDocDepotContext } from '../context/DocDepotContext';

export const DocDepotNavbar = () => {
  const { classes: inputClasses } = inputStyles();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const { documentForm, docDepotActivePage } = useDocDepotContext();
  const [workExperienceSelect, setWorkExperienceSelect] = useState<Array<{ value: string; label: string }>>([]);
  const { authClient, setForceRender, forceRender, workExperienceData } = useGlobalContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const authToken = authClient.getAccessToken();

  const uploadDocument = async (event: React.ChangeEvent<HTMLInputElement>) => {
    showLoadingNotification({ title: 'Please wait !', message: 'Please wait while we add your document' });
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > 5 * 1024 * 1024) {
        showErrorNotification('SIZE_EXCEEDS');
      } else {
        const formData = new FormData();
        formData.append('document', event.target.files[0]);
        open();
        documentForm.values.name = event.target.files[0].name;
        try {
          const res = await axios.post(`${docDepotAPIList.uploadDocument}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${authToken}`,
            },
          });
          documentForm.setFieldValue('privateUrl', res.data.url);
          showSuccessNotification({ title: 'Success !', message: 'File selected successfully' });
        } catch (error: unknown) {
          showErrorNotification('GR0000');
        }
      }
    }
  };

  const handleCreateDocument = async () => {
    showLoadingNotification({ title: 'Please wait !', message: 'Wait while we upload your document' });
    let requestBody: { [key: string]: string } = {
      name: documentForm.values.name,
      type: documentForm.values.type,
      privateUrl: documentForm.values.privateUrl,
    };

    if (documentForm.values.type === 'work') {
      requestBody = { ...requestBody, workExperience: documentForm.values.workExperience };
    }

    const res: Result<UpdateDocumentResponseType> = await HttpClient.callApiAuth(
      {
        url: `${docDepotAPIList.addDocument}`,
        method: 'POST',
        body: requestBody,
      },
      authClient
    );
    if (res.ok) {
      close();
      setForceRender(!forceRender);
      showSuccessNotification({ title: 'Success !', message: 'Document added to successfully' });
      documentForm.reset();
    } else {
      showErrorNotification(res.error.code);
    }
  };

  useEffect(() => {
    setWorkExperienceSelect([]);

    workExperienceData.forEach((experience) => {
      setWorkExperienceSelect((current) => [
        ...current,
        {
          value: experience.id,
          label: `${experience.companyName} (${experience.designation})`,
        },
      ]);
    });
  }, [documentForm.values.type]);

  return (
    <>
      <Modal
        size={'50%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={close}
        centered
        title="Upload documents"
        radius={'lg'}
      >
        <Box className="modal">
          <Box className="document-modal">
            <Box className="input-section">
              <Title className="title">Document name</Title>
              <TextInput label="Document name" readOnly className="inputClass" value={documentForm.values.name} />
            </Box>
            <Box className="input-section">
              <Title className="title">Document type</Title>
              <Select
                clearable
                searchable
                withAsterisk
                className="inputClass"
                nothingFound="No options"
                label="Select document type"
                styles={() => ({
                  item: {
                    '&[data-selected]': {
                      '&, &:hover': {
                        backgroundColor: '#17a672',
                        color: 'white',
                      },
                    },
                  },
                })}
                data={[
                  { value: 'id', label: 'ID' },
                  { value: 'work', label: 'Work document' },
                  { value: 'education', label: 'Education document' },
                  { value: 'other', label: 'Others' },
                ]}
                {...documentForm.getInputProps('type')}
              />
            </Box>
            {documentForm.values.type === 'work' ? (
              <Box className="input-section">
                <Title className="title">Work Experience</Title>
                <Select
                  clearable
                  searchable
                  withAsterisk
                  className="inputClass"
                  nothingFound="No options"
                  label="Select document type"
                  styles={() => ({
                    item: {
                      '&[data-selected]': {
                        '&, &:hover': {
                          backgroundColor: '#17a672',
                          color: 'white',
                        },
                      },
                    },
                  })}
                  data={workExperienceSelect}
                  {...documentForm.getInputProps('workExperience')}
                />
              </Box>
            ) : (
              <></>
            )}
            <Divider my={'1rem'} />
            {documentForm.values.type !== '' ? (
              <Button className="green-btn" onClick={handleCreateDocument}>
                Upload
              </Button>
            ) : (
              <Button disabled className="green-btn">
                Upload
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
      <Box className="doc-depot-navbar">
        <Title className="title">Doc Depot</Title>
        <Box className="search" tabIndex={0}>
          <TextInput classNames={inputClasses} className="search-input" placeholder="Search" icon={<GoSearch />} />
        </Box>
        {docDepotActivePage === 0 && (
          <Button className="green-outline-btn" onClick={openFileInput}>
            Upload
          </Button>
        )}

        <input type="file" accept=".pdf" ref={fileInputRef} style={{ display: 'none' }} onChange={uploadDocument} />
      </Box>
    </>
  );
};

const inputStyles = createStyles(() => ({
  input: {
    background: '#ffffff',
    border: '1px solid #ebebeb',
    borderRadius: '40px',
    color: '#A4A4A4',

    [`@media screen and (max-width: ${em(768)})`]: {
      display: 'none',
    },
  },
}));
