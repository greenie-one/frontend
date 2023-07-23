import { Text, Box, Button, Tooltip } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import { useState, useEffect } from 'react';
import { showErrorNotification } from '../../../../../utils/functions/showNotification';
import { HttpClient } from '../../../../../utils/generic/httpClient';
import { peerVerificationAPIList } from '../../../../../assets/api/ApiList';
import { useGlobalContext } from '../../../../../context/GlobalContext';

export const ExperienceCard: React.FC<ExperienceCardProp> = ({
  position,
  companyName,
  isVerified,
  companyStartYear,
  companyEndYear,
  id,
}) => {
  const { authClient } = useGlobalContext();
  const [tooltipLabel, setToolTipLabel] = useState<string>('');
  const getSentRequests = async () => {
    const res = await HttpClient.callApiAuth<SentRequestsResponseType[]>(
      {
        url: peerVerificationAPIList.getSentRequest,
        method: 'GET',
      },
      authClient
    );

    if (res.ok) {
      const filteredData = res.value.filter((request) => request.workExperience === id);
      const extractedData = filteredData.map(({ name, isVerificationCompleted }) => ({
        name,
        isVerificationCompleted,
      }));
      const tooltipLabel = extractedData
        .map((item) => `${item.name}: ${item.isVerificationCompleted ? 'Completed' : 'Pending'}`)
        .join('\n | ');
      setToolTipLabel(tooltipLabel);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  useEffect(() => {
    getSentRequests();
  }, [authClient]);

  return (
    <Box className="experience-card">
      <Box>
        <Text className="companyName">{companyName.substring(0, 25)}</Text>
        <Text className="position">{position.substring(0, 25)}</Text>
      </Box>

      {isVerified ? (
        <Tooltip
          label={tooltipLabel}
          withArrow
          color="teal"
          openDelay={500}
          styles={{
            tooltip: {
              fontSize: 12,
            },
          }}
        >
          <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified">
            Verified
          </Button>
        </Tooltip>
      ) : (
        <Tooltip
          label={tooltipLabel}
          withArrow
          color="teal"
          openDelay={500}
          styles={{
            tooltip: {
              fontSize: 10,
            },
          }}
        >
          <Button leftIcon={<CgSandClock size={'16px'} />} className="pending">
            Pending
          </Button>
        </Tooltip>
      )}

      <Box className="tenure-box">
        <Text className="since-text">Since</Text>

        {companyEndYear === null ? (
          <Text> {companyStartYear?.toString().substring(3, 15)} - Present</Text>
        ) : (
          <Text className="tenure">
            {companyStartYear?.toString().substring(3, 15)} - {companyEndYear?.toString().substring(3, 15)}
          </Text>
        )}
      </Box>
    </Box>
  );
};
