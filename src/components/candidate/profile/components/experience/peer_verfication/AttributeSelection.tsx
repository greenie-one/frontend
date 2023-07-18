import React from 'react';
import { Text, Box, Checkbox, Divider } from '@mantine/core';
import { SelectionHeading } from './SelectionHeading';
import { PageActionBtns } from './PageActionBtns';
import { ReviewActionType } from '../VerifyExperience';
import { RiAddCircleLine } from 'react-icons/ri';
import { Peer } from '../../../types/ProfileGeneral';

type AttributeSelectionProps = {
  activePeer: number;
  addedPeers: Peer[];
  setActivePeer: React.Dispatch<React.SetStateAction<number>>;
  verificationStepDispatch: React.Dispatch<ReviewStepAction>;
};

const attributes = [
  { send: false, attribute: 'Job title' },
  { send: false, attribute: 'Reporting Manager' },
  { send: false, attribute: 'Work Experience in years' },
  { send: false, attribute: 'Attitude' },
  { send: false, attribute: 'Rehire status' },
  { send: false, attribute: 'Exit formalities' },
];

export const AttributeSelection: React.FC<AttributeSelectionProps> = ({
  activePeer,
  addedPeers,
  setActivePeer,
  verificationStepDispatch,
}): JSX.Element => {
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
            {attributes.map(({ attribute }, index) => {
              return (
                <Box key={index}>
                  <Box className="selected-attribute">
                    <Checkbox />
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
