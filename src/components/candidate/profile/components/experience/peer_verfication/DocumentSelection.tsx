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

export const DocumentSelection: React.FC<{
  id: string;
  setSelectionPage: React.Dispatch<React.SetStateAction<number>>;
}> = ({ id, setSelectionPage }): JSX.Element => {
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
                <Checkbox />
                <Text className="verification-document-name">
                  <img src={pdfIcon} alt="pdf icon" /> {name}
                </Text>
              </Box>
            );
          })}
        </Box>
        <PageActionBtns cb={() => setSelectionPage(1)} />
      </Box>
    </>
  );
};
