import React, { createContext, useContext, useEffect, useState } from 'react';
import { useForm, isNotEmpty } from '@mantine/form';
import { HttpClient, Result } from '../../../../utils/generic/httpClient';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { docDepotAPIList } from '../../../../assets/api/ApiList';
import { showErrorNotification, showSuccessNotification } from '../../../../utils/functions/showNotification';

const DocDepotContext = createContext<DocDepotContextType>({} as DocDepotContextType);
export const useDocDepotContext = () => useContext(DocDepotContext);

export const DocDepotContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const documentForm = useForm<DocDepotFormType>({
    initialValues: {
      name: '',
      type: '',
      private_url: '',
    },

    validate: {
      name: isNotEmpty('Please select document'),
      type: isNotEmpty('Please select document type'),
    },
  });
  const { authClient } = useGlobalContext();
  const authTokens = authClient.getAccessToken();
  const [educationDocuments, setEducationDocument] = useState<DocumentResponseType[]>([]);
  const [experienceDocuments, setExperienceDocument] = useState<DocumentResponseType[]>([]);
  const [otherDocuments, setOtherDocument] = useState<DocumentResponseType[]>([]);

  const getExperienceDocument = async () => {
    const res: Result<DocumentResponseType[]> = await HttpClient.callApiAuth(
      {
        url: `${docDepotAPIList.getAllDocuments}/work`,
        method: 'GET',
      },
      authClient
    );
    if (res.ok) {
      setExperienceDocument(res.value);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  const getEducationDocument = async () => {
    const res: Result<DocumentResponseType[]> = await HttpClient.callApiAuth(
      {
        url: `${docDepotAPIList.getAllDocuments}/education`,
        method: 'GET',
      },
      authClient
    );
    if (res.ok) {
      setEducationDocument(res.value);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  const getOtherDocument = async () => {
    const res: Result<DocumentResponseType[]> = await HttpClient.callApiAuth(
      {
        url: `${docDepotAPIList.getAllDocuments}/other`,
        method: 'GET',
      },
      authClient
    );
    if (res.ok) {
      setOtherDocument(res.value);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  const moveDocument = async (id: string, type: string) => {
    const res: Result<UpdateDocumentResponseType> = await HttpClient.callApiAuth(
      {
        url: `${docDepotAPIList.updateDocument}/${id}`,
        method: 'PATCH',
        body: { type: type },
      },
      authClient
    );
    if (res.ok) {
      showSuccessNotification({ title: 'Success !', message: 'Document moved to another folder !' });
    } else {
      showErrorNotification(res.error.code);
    }
  };

  const deleteDocument = async (id: string) => {
    const res: Result<DeleteDocumentResponseType> = await HttpClient.callApiAuth(
      {
        url: `${docDepotAPIList.deleteDocument}/${id}`,
        method: 'DELETE',
      },
      authClient
    );
    if (res.ok) {
      showSuccessNotification({ title: 'Success !', message: 'Document deleted successfully !' });
      close();
    } else {
      showErrorNotification(res.error.code);
    }
  };

  useEffect(() => {
    if (authTokens) {
      getExperienceDocument();
      getEducationDocument();
      getOtherDocument();
    }
  }, []);

  return (
    <DocDepotContext.Provider
      value={{
        documentForm,
        deleteDocument,
        moveDocument,
        experienceDocuments,
        educationDocuments,
        otherDocuments,
      }}
    >
      {children}
    </DocDepotContext.Provider>
  );
};
