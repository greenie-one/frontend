import React from 'react';
import { Text, Box, Checkbox, Divider } from '@mantine/core';
import { SelectionHeading } from './SelectionHeading';
import { PageActionBtns } from './PageActionBtns';
import { ReviewActionType } from '../VerifyExperience';
import { CreatePeerResponseType, Peer } from '../../../types/ProfileGeneral';

type AttributeSelectionProps = {
  activePeer: number;
  addedPeers: Peer[];
  setActivePeer: React.Dispatch<React.SetStateAction<number>>;
  verificationStepDispatch: React.Dispatch<ReviewStepAction>;
  setCreatePeerResponse: React.Dispatch<React.SetStateAction<CreatePeerResponseType[]>>;
  createPeerResponse: CreatePeerResponseType[];
  setSelectionPage: React.Dispatch<React.SetStateAction<number>>;
};

const attributesList = [
  { id: 'department', attrName: 'Department' },
  { id: 'dateOfJoining', attrName: 'Date of Joining' },
  { id: 'dateOfLeaving', attrName: 'Date of Leaving' },
  { id: 'companyName', attrName: 'Company Name' },
  { id: 'workType', attrName: 'Work Type' },
  { id: 'workMode', attrName: 'Mode of Work' },
  { id: 'salary', attrName: 'Salary' },
];

export const AttributeSelection: React.FC<AttributeSelectionProps> = ({
  activePeer,
  addedPeers,
  setActivePeer,
  verificationStepDispatch,
  createPeerResponse,
  setCreatePeerResponse,
  setSelectionPage,
}): JSX.Element => {
  const handleMark = (event: React.ChangeEvent<HTMLInputElement>, attr: string) => {
    const updatedList = [];

    for (let i = 0; i < createPeerResponse.length; i++) {
      const peer = createPeerResponse[i];

      if (i !== activePeer) {
        updatedList.push(peer);
        continue;
      }

      let attrList = peer.optionalVerificationFields;
      if (event.target.checked) {
        attrList.push(attr);
      } else {
        attrList = attrList.filter((_attr) => _attr !== attr);
      }

      peer.optionalVerificationFields = attrList;
      updatedList.push(peer);
    }

    setCreatePeerResponse(updatedList);
  };

  return (
    <>
      <Box className="documents-action-section">
        <SelectionHeading heading="Attributes" subHeading="Select the attributes you want the peer to review" />
        <Box>
          <Box className="selected-attribute-header">
            <Checkbox checked indeterminate readOnly />
            <Text>Name</Text>
          </Box>
          <Box className="selected-attributes">
            {attributesList.map(({ id, attrName }, idx) => {
              return (
                <Box key={idx}>
                  <Box className="selected-attribute">
                    <Checkbox
                      checked={createPeerResponse[activePeer].optionalVerificationFields.includes(id)}
                      onChange={(event) => handleMark(event, id)}
                    />
                    <Text>{attrName}</Text>
                  </Box>
                  {attributesList.length - 1 !== idx && <Divider color="#ebebeb" />}
                </Box>
              );
            })}
          </Box>

          <PageActionBtns
            cb={
              addedPeers.indexOf(addedPeers[activePeer]) === addedPeers.length - 1
                ? () => verificationStepDispatch({ type: ReviewActionType.NEXT_STEP })
                : () => {
                    setActivePeer(activePeer + 1), setSelectionPage(0);
                  }
            }
          />
        </Box>
      </Box>
    </>
  );
};
