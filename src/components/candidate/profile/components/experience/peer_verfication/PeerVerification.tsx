import React, { useState } from 'react';
import { Peer } from '../../../types/ProfileGeneral';

import { VerificationHeader } from './VerificationHeader';
import { DocumentSelection } from './DocumentSelection';
import { SkillSelection } from './SkillSelection';
import { AttributeSelection } from './AttributeSelection';
import { Box } from '@mantine/core';

type PeerVerificationProps = {
  experienceId: string;
  activePeer: number;
  addedPeers: Peer[];
  setActivePeer: React.Dispatch<React.SetStateAction<number>>;
  verificationStepDispatch: React.Dispatch<ReviewStepAction>;
};

export const PeerVerification: React.FC<PeerVerificationProps> = ({
  experienceId,
  activePeer,
  addedPeers,
  setActivePeer,
  verificationStepDispatch,
}): JSX.Element => {
  const [selectionPage, setSelectionPage] = useState<number>(0);

  return (
    <>
      <Box className="see-peers-select-doc-skills">
        <VerificationHeader selectionPage={selectionPage} setSelectionPage={setSelectionPage} />
        {selectionPage === 0 && <DocumentSelection id={experienceId} setSelectionPage={setSelectionPage} />}
        {selectionPage === 1 && <SkillSelection setSelectionPage={setSelectionPage} />}
        {selectionPage === 2 && (
          <AttributeSelection
            activePeer={activePeer}
            addedPeers={addedPeers}
            setActivePeer={setActivePeer}
            verificationStepDispatch={verificationStepDispatch}
          />
        )}
      </Box>
    </>
  );
};
