import React, { useEffect, useRef, useState } from 'react';
import { Text, Box, Button, Checkbox } from '@mantine/core';
import { docDepotAPIList } from '../../../../../../assets/api/ApiList';
import { useGlobalContext } from '../../../../../../context/GlobalContext';
import { HttpClient } from '../../../../../../utils/generic/httpClient';
import { showErrorNotification } from '../../../../../../utils/functions/showNotification';
import { ExperienceDocuments } from '../../../types/ProfileGeneral';
import { SelectionHeading } from './SelectionHeading';
import { PageActionBtns } from './PageActionBtns';
import { AiOutlinePlus } from 'react-icons/ai';
import pdfIcon from '../../../assets/pdfIcon.png';
import { CreatePeerResponseType } from '../../../types/ProfileGeneral';

export const DocumentSelection: React.FC<{
  id: string;
  setSelectionPage: React.Dispatch<React.SetStateAction<number>>;
  activePeer: number;
  setCreatePeerResponse: React.Dispatch<React.SetStateAction<CreatePeerResponseType[]>>;
  createPeerResponse: CreatePeerResponseType[];
}> = ({ id, setSelectionPage, activePeer, setCreatePeerResponse, createPeerResponse }): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { authClient } = useGlobalContext();

  const [experienceDocuments, setExperienceDocuments] = useState<ExperienceDocuments[]>();

  const getExperienceDocument = async () => {
    const res = await HttpClient.callApiAuth<ExperienceDocuments[]>(
      {
        url: `${docDepotAPIList.getAllDocuments}/work`,
        method: 'GET',
      },
      authClient
    );
    if (res.ok) {
      const filtered = res.value.filter((document) => document.workExperience === id);
      setExperienceDocuments(filtered);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  useEffect(() => {
    getExperienceDocument();
  }, [id]);

  const handleMark = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const updatedList = [];

    for (let i = 0; i < createPeerResponse.length; i++) {
      const peer = createPeerResponse[i];

      if (i !== activePeer) {
        updatedList.push(peer);
        continue;
      }

      let docList = peer.documents;
      if (event.target.checked) {
        docList.push(id);
      } else {
        docList = docList.filter((_id) => _id !== id);
      }

      peer.documents = docList;
      updatedList.push(peer);
    }

    setCreatePeerResponse(updatedList);
  };

  return (
    <>
      <Box className="documents-action-section">
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
        <SelectionHeading heading="Documents" subHeading="Select the documents you want the peer to review">
          <Box className="document-action-selector">
            <Button
              leftIcon={<AiOutlinePlus />}
              className="document-action"
              onClick={() => fileInputRef.current?.click()}
            >
              Add files
            </Button>
          </Box>
        </SelectionHeading>
        <Box className="selected-attribute-header">
          <Checkbox checked indeterminate readOnly />
          <Text>Select documents To Verify</Text>
        </Box>
        <Box className="selected-attributes">
          {experienceDocuments?.map(({ name, _id }) => {
            return (
              <Box key={_id} className="selected-attribute">
                <Checkbox
                  checked={createPeerResponse[activePeer].documents.includes(_id)}
                  onChange={(event) => handleMark(event, _id)}
                />
                <Box className="document">
                  <img src={pdfIcon} className="pdf-icon" alt="pdf icon" />
                  <Text className="verification-document-name">{name}</Text>
                </Box>
              </Box>
            );
          })}
        </Box>
        <PageActionBtns cb={() => setSelectionPage(1)} />
      </Box>
    </>
  );
};
