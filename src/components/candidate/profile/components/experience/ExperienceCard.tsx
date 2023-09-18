import { Text, Box, Tooltip } from '@mantine/core';
import { useState, useEffect } from 'react';
import { showErrorNotification } from '../../../../../utils/functions/showNotification';
import { HttpClient } from '../../../../../utils/generic/httpClient';
import { peerVerificationAPIList } from '../../../../../assets/api/ApiList';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { GetExperienceTag } from '../../../../../utils/functions/GetExperienceTag';

export const ExperienceCard: React.FC<ExperienceCardProp> = ({
  position,
  companyName,
  companyStartYear,
  companyEndYear,
  id,
}) => {
  const { authClient } = useGlobalContext();
  const [tooltipLabel, setToolTipLabel] = useState<string>('');
  const [sentRequests, setSentRequests] = useState<Array<SentRequestsResponseType>>([]);

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
      setSentRequests(filteredData);
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
  }, [authClient, id]);

  return (
    <Box className="experience-card">
      <Box>
        <Text className="companyName">{companyName.substring(0, 25)}</Text>
        <Text className="position">{position.substring(0, 25)}</Text>
      </Box>
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
        <GetExperienceTag peerDetails={sentRequests} />
      </Tooltip>

      <Box className="tenure-box">
        <Text className="since-text">Since</Text>

        {companyEndYear === null ? (
          <Text className="tenure"> {companyStartYear?.toString().substring(0, 10)} - Present</Text>
        ) : (
          <Text className="tenure">
            {companyStartYear?.toString().substring(0, 10)} - {companyEndYear?.toString().substring(0, 10)}
          </Text>
        )}
      </Box>
    </Box>
  );
};
