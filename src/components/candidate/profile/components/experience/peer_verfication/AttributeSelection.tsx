import React from 'react';
import { Text, Box, Checkbox, Divider } from '@mantine/core';
import { SelectionHeading } from './SelectionHeading';
import { PageActionBtns } from './PageActionBtns';
import { ReviewActionType } from '../VerifyExperience';
import { RiAddCircleLine } from 'react-icons/ri';
import { CreatePeerResponseType, Peer } from '../../../types/ProfileGeneral';

type AttributeSelectionProps = {
  activePeer: number;
  addedPeers: Peer[];
  setActivePeer: React.Dispatch<React.SetStateAction<number>>;
  verificationStepDispatch: React.Dispatch<ReviewStepAction>;
  setCreatePeerResponse: React.Dispatch<React.SetStateAction<CreatePeerResponseType[]>>;
  createPeerResponse: CreatePeerResponseType[];
};

const attributes = [
  'Job title',
  'Company Type',
  'Company Name',
  'LinkedIn URL',
  'Department',
  'Salary (CTC)',
  'Work Email',
  'Company ID',
  'Job Start Date',
  'Job End Date',
  'Mode of Work',
  'Work Type',
];

export const AttributeSelection: React.FC<AttributeSelectionProps> = ({
  activePeer,
  addedPeers,
  setActivePeer,
  verificationStepDispatch,
  createPeerResponse,
  setCreatePeerResponse,
}): JSX.Element => {
  const handleMark = (event: React.ChangeEvent<HTMLInputElement>, attr: string) => {
    const updatedList = [];

    for (let i = 0; i < createPeerResponse.length; i++) {
      const peer = createPeerResponse[i];

      if (i !== activePeer) {
        updatedList.push(peer);
        continue;
      }

      let attrList = peer.verificationFields;
      if (event.target.checked) {
        attrList.push(attr);
      } else {
        attrList = attrList.filter((_attr) => _attr !== attr);
      }

      peer.verificationFields = attrList;
      updatedList.push(peer);
    }

    setCreatePeerResponse(updatedList);
  };

  return (
    <>
      <Box className="documents-action-section">
        <SelectionHeading
          heading="Attributes"
          subHeading="Select the attributes you want the peer to review"
        ></SelectionHeading>
        <Box>
          <Box className="selected-attribute-header">
            <Checkbox checked indeterminate readOnly />
            <Text>Name</Text>
          </Box>
          <Box className="selected-attributes">
            {attributes.map((attribute, index) => {
              return (
                <Box key={index}>
                  <Box className="selected-attribute">
                    <Checkbox
                      checked={createPeerResponse[activePeer].verificationFields.includes(attribute)}
                      onChange={(event) => handleMark(event, attribute)}
                    />
                    <Text>{attribute}</Text>
                  </Box>
                  {attributes.length - 1 !== index && <Divider color="#ebebeb" />}
                </Box>
              );
            })}
          </Box>
          <Box className="action-btn">
            <RiAddCircleLine className="action-icon" />
            <Text className="action-text">Add more</Text>
          </Box>
          <PageActionBtns
            cb={
              addedPeers.indexOf(addedPeers[activePeer]) === addedPeers.length - 1
                ? () => verificationStepDispatch({ type: ReviewActionType.NEXT_STEP })
                : () => setActivePeer(activePeer + 1)
            }
          />
        </Box>
      </Box>
    </>
  );
};
