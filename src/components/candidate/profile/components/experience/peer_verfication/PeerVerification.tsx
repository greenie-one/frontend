import React, { useEffect, useState } from 'react';
import { CreatePeerResponseType, Peer } from '../../../types/ProfileGeneral';

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
  setCreatePeerResponse: React.Dispatch<React.SetStateAction<CreatePeerResponseType[]>>;
  createPeerResponse: CreatePeerResponseType[];
};

export const PeerVerification: React.FC<PeerVerificationProps> = ({
  experienceId,
  activePeer,
  addedPeers,
  setActivePeer,
  verificationStepDispatch,
  createPeerResponse,
  setCreatePeerResponse,
}): JSX.Element => {
  const [selectionPage, setSelectionPage] = useState<number>(0);

  useEffect(() => {
    addedPeers.forEach((peer) => {
      setCreatePeerResponse((_list) => [
        ..._list,
        {
          name: peer.name,
          email: peer.email,
          phone: peer.phone,
          ref: experienceId,
          verificationBy: peer.peerType,
          selectedFields: [],
          documents: [],
          skills: [],
        },
      ]);
    });
  }, [addedPeers.length]);

  return (
    <>
      <Box className="see-peers-select-doc-skills">
        <VerificationHeader selectionPage={selectionPage} setSelectionPage={setSelectionPage} />
        {selectionPage === 0 && (
          <DocumentSelection
            id={experienceId}
            setSelectionPage={setSelectionPage}
            activePeer={activePeer}
            createPeerResponse={createPeerResponse}
            setCreatePeerResponse={setCreatePeerResponse}
          />
        )}
        {selectionPage === 1 && (
          <SkillSelection
            setSelectionPage={setSelectionPage}
            activePeer={activePeer}
            createPeerResponse={createPeerResponse}
            setCreatePeerResponse={setCreatePeerResponse}
            workExperienceID={experienceId}
          />
        )}
        {selectionPage === 2 && (
          <AttributeSelection
            id={experienceId}
            activePeer={activePeer}
            addedPeers={addedPeers}
            setActivePeer={setActivePeer}
            verificationStepDispatch={verificationStepDispatch}
            createPeerResponse={createPeerResponse}
            setCreatePeerResponse={setCreatePeerResponse}
            setSelectionPage={setSelectionPage}
          />
        )}
      </Box>
    </>
  );
};
