import { Button } from '@mantine/core';
import React from 'react';
import { CgSandClock } from 'react-icons/cg';
import { MdVerified } from 'react-icons/md';

const statusIndex: Record<'ACCEPTED' | 'REJECTED' | 'PENDING', number> = {
  ACCEPTED: 0,
  PENDING: 1,
  REJECTED: 2,
};

export const GetExperienceTag: React.FC<{ peerDetails: Array<SentRequestsResponseType> }> = ({ peerDetails }) => {
  const statusCount: Array<number> = [0, 0, 0];
  const totalPeers = peerDetails.length;

  if (totalPeers < 2) {
    return (
      <Button style={{ color: '#ff7272', borderColor: '#ff7272' }} className="verified">
        Not Verified
      </Button>
    );
  }

  for (const peer of peerDetails) {
    if (peer.isReal) {
      statusCount[statusIndex[peer.isReal.state]] += 1;
    } else {
      if (peer.isVerificationCompleted) {
        statusCount[statusIndex['ACCEPTED']] += 1;
      } else {
        statusCount[statusIndex['PENDING']] += 1;
      }
    }
  }

  const acceptedRequests = statusCount[0];
  const pendingRequests = statusCount[1];
  const rejectedRequests = statusCount[2];

  if (rejectedRequests === totalPeers) {
    return (
      <Button style={{ color: '#ff7272', borderColor: '#ff7272' }} className="verified">
        Not Verified
      </Button>
    );
  }

  if (acceptedRequests === totalPeers) {
    return (
      <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified">
        Verified
      </Button>
    );
  }

  if (pendingRequests > 0) {
    return (
      <Button leftIcon={<CgSandClock size={'16px'} />} className="pending">
        Pending
      </Button>
    );
  }

  return (
    <Button style={{ color: '#1991ff', borderColor: '#1991ff' }} className="verified">
      Partially Verified
    </Button>
  );
};
