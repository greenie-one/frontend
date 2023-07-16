import React, { createContext, useContext, useEffect, useState } from 'react';
import { useForm, isNotEmpty } from '@mantine/form';
import { HttpClient, Result } from '../../../../utils/generic/httpClient';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { docDepotAPIList } from '../../../../assets/api/ApiList';
import {
  showErrorNotification,
  showSuccessNotification,
  showLoadingNotification,
} from '../../../../utils/functions/showNotification';

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
  const [forceRender, setForceRender] = useState<boolean>(false);

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
    showLoadingNotification({ title: 'Please Wait', message: 'Wait while we move your document' });
    const res: Result<UpdateDocumentResponseType> = await HttpClient.callApiAuth(
      {
        url: `${docDepotAPIList.updateDocument}/${id}`,
        method: 'PATCH',
        body: { type: type },
      },
      authClient
    );
    if (res.ok) {
      setForceRender(!forceRender);
      showSuccessNotification({ title: 'Success !', message: 'Document moved to another folder !' });
    } else {
      showErrorNotification(res.error.code);
    }
  };

  const deleteDocument = async (id: string) => {
    showLoadingNotification({ title: 'Please Wait', message: 'Wait while we delete the document' });
    const res: Result<DeleteDocumentResponseType> = await HttpClient.callApiAuth(
      {
        url: `${docDepotAPIList.deleteDocument}/${id}`,
        method: 'DELETE',
      },
      authClient
    );
    if (res.ok) {
      setForceRender(!forceRender);
      showSuccessNotification({ title: 'Success !', message: 'Document deleted successfully !' });
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
  }, [forceRender]);

  return (
    <DocDepotContext.Provider
      value={{
        documentForm,
        deleteDocument,
        moveDocument,
        experienceDocuments,
        educationDocuments,
        otherDocuments,
        forceRender,
        setForceRender,
      }}
    >
      {children}
    </DocDepotContext.Provider>
  );
};
