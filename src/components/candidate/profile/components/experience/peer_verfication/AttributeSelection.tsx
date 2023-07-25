import React, { useEffect } from 'react';
import { Text, Box, Checkbox, Divider } from '@mantine/core';
import { SelectionHeading } from './SelectionHeading';
import { PageActionBtns } from './PageActionBtns';
import { ReviewActionType } from '../VerifyExperience';
import { CreatePeerResponseType, Peer } from '../../../types/ProfileGeneral';
import { useGlobalContext } from '../../../../../../context/GlobalContext';

type AttributeSelectionProps = {
  id: string;
  activePeer: number;
  addedPeers: Peer[];
  setActivePeer: React.Dispatch<React.SetStateAction<number>>;
  verificationStepDispatch: React.Dispatch<ReviewStepAction>;
  setCreatePeerResponse: React.Dispatch<React.SetStateAction<CreatePeerResponseType[]>>;
  createPeerResponse: CreatePeerResponseType[];
  setSelectionPage: React.Dispatch<React.SetStateAction<number>>;
};

const attributesList = [
  { id: 'companyId', attrName: 'Company Id' },
  { id: 'dateOfJoining', attrName: 'Date of Joining' },
  { id: 'dateOfLeaving', attrName: 'Date of Leaving' },
  { id: 'department', attrName: 'Department' },
  { id: 'salary', attrName: 'Salary' },
  { id: 'workType', attrName: 'Work Type' },
  { id: 'workMode', attrName: 'Mode of Work' },
];

export const AttributeSelection: React.FC<AttributeSelectionProps> = ({
  id,
  activePeer,
  addedPeers,
  setActivePeer,
  verificationStepDispatch,
  createPeerResponse,
  setCreatePeerResponse,
  setSelectionPage,
}): JSX.Element => {
  const { workExperienceData } = useGlobalContext();
  const currentWorkExperience = workExperienceData.find((exp) => exp.id === id);

  // let validAttributesList = Object.keys(currentWorkExperience).map(key => {
  //   if (currentWorkExperience[key]) {

  //   }
  // })

  const peerType = addedPeers[activePeer].peerType;

  const updateAttrList = (checked: boolean, attr: string) => {
    const updatedList = [];

    for (let i = 0; i < createPeerResponse.length; i++) {
      const peer = createPeerResponse[i];

      if (i !== activePeer) {
        updatedList.push(peer);
        continue;
      }

      let attrList = peer.selectedFields;
      if (checked) {
        attrList.push(attr);
      } else {
        attrList = attrList.filter((_attr) => _attr !== attr);
      }

      peer.selectedFields = attrList;
      updatedList.push(peer);
    }

    setCreatePeerResponse(updatedList);
  };

  useEffect(() => {
    if (peerType === 'HR') {
      updateAttrList(true, 'salary');
    }
    updateAttrList(true, 'companyName');
  }, [activePeer]);

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
            <Box>
              <Box className="selected-attribute">
                <Checkbox checked indeterminate readOnly />
                <Text>Company Name</Text>
              </Box>
              <Divider color="#ebebeb" />
            </Box>
            {attributesList.map(({ id, attrName }, idx) => {
              if (currentWorkExperience[id]) {
                return (
                  <Box key={idx}>
                    <Box className="selected-attribute">
                      {peerType === 'HR' && id === 'salary' ? (
                        <Checkbox checked indeterminate readOnly />
                      ) : (
                        <Checkbox
                          checked={createPeerResponse[activePeer].selectedFields.includes(id)}
                          onChange={(event) => updateAttrList(event.target.checked, id)}
                        />
                      )}
                      <Text>{attrName}</Text>
                    </Box>
                    {attributesList.length - 1 !== idx && <Divider color="#ebebeb" />}
                  </Box>
                );
              } else {
                return <React.Fragment key={idx}></React.Fragment>;
              }
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
