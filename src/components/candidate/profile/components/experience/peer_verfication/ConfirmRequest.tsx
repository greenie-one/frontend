import { Text, Box, Button } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import { ExperienceDocuments, Peer } from '../../../types/ProfileGeneral';
import { PeerDetails } from './PeerDetails';
import { CreatePeerResponseType } from '../../../types/ProfileGeneral';
import { ReviewActionType } from '../VerifyExperience';

type ConfrimRequestPropsType = {
  addedPeers: Peer[];
  experience: WorkExperience | undefined;
  experienceDocuments: ExperienceDocuments[];
  createPeerResponse: CreatePeerResponseType[];
  handleCreatePeerRequest: () => void;
  verificationStepDispatch: React.Dispatch<ReviewStepAction>;
};

export const ConfirmRequest: React.FC<ConfrimRequestPropsType> = ({
  addedPeers,
  experience,
  experienceDocuments,
  createPeerResponse,
  handleCreatePeerRequest,
  verificationStepDispatch,
}) => {
  return (
    <>
      <Box className="confirm-request-box">
        <Box className="document-action-heading-box">
          <Text className="document-action-heading">Confirm your work experience</Text>
          <Text className="document-action-sub-heading">
            The following documents and skills are part of your work experience
          </Text>
        </Box>
        <Box className="details-box">
          <Text className="document-action-heading">To verify</Text>
          <Box className="experience-details">
            <Box className="experience-details-text-box">
              <Text className="designation">{experience?.designation}</Text>
              <Text className="company-name">{experience?.companyName}</Text>
              {experience?.isVerified ? (
                <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified">
                  Verified
                </Button>
              ) : (
                <Button leftIcon={<CgSandClock size={'16px'} />} className="pending">
                  Pending
                </Button>
              )}
            </Box>
          </Box>
        </Box>
        {addedPeers.map((peer, index) => {
          return (
            <PeerDetails
              key={index}
              Peer={peer}
              experienceDocuments={experienceDocuments}
              createPeerResponse={createPeerResponse}
              indexNumber={index}
              experience={experience}
            />
          );
        })}
      </Box>
      <Box className="see-peers-btn-wrapper">
        <Button className="green-btn" onClick={handleCreatePeerRequest}>
          Confirm and send
        </Button>
        <Button
          className="cancel-btn"
          onClick={() => verificationStepDispatch({ type: ReviewActionType.PREVIOUS_STEP })}
        >
          Cancel
        </Button>
      </Box>
    </>
  );
};
