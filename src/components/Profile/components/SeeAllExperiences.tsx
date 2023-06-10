import '../styles/global.scss';
import { useProfileContext } from '../context/ProfileContext';
import { Text, Modal, Box, Button, Title, Divider } from '@mantine/core';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';

export const SeeAllExperiences = () => {
  const {
    handleToggleWorkExperienceDetails,
    workExperienceData,
    deleteWorkExperience,
    updateWorkExperience,
  } = useProfileContext();

  const handleUpdate = (id: string) => {
    updateWorkExperience(id);
    close();
  };

  return (
    <section className="container">
      <Box className="see-all-header">
        <Box className="go-back-btn" onClick={handleToggleWorkExperienceDetails}>
          <BsArrowLeft className="arrow-left-icon" size={'16px'} />
          <Text>Profile</Text>
          <AiOutlineRight className="arrow-right-icon" size={'16px'} />
        </Box>
        <Text>{`Work Experience (${workExperienceData.length})`}</Text>
      </Box>
      <Box>
        {workExperienceData.map(
          (
            {
              _id,
              designation,
              companyName,
              companyStartDate,
              companyEndDate,
              isVerified,
              companyId,
              workMode,
              workType,
              email,
              verifiedBy,
            },
            index
          ) => {
            return (
              <Box key={index} className="see-all-card">
                <Box className="see-all-card-header">
                  <Box className="header-content">
                    <Box className="company-logo"></Box>
                    <Box className="see-all-card-header-text-box">
                      <Text className="designation">{designation}</Text>
                      <Text className="companyName">{companyName}</Text>
                      {isVerified ? (
                        <Button
                          leftIcon={<MdVerified color="#8CF078" size={'16px'} />}
                          className="verified"
                        >
                          Verified
                        </Button>
                      ) : (
                        <Button
                          leftIcon={<CgSandClock color="#FF7272" size={'16px'} />}
                          className="pending"
                        >
                          Pending
                        </Button>
                      )}
                    </Box>
                  </Box>
                  <Box className="button-wrappers">
                    {!isVerified && <Button className="get-verified">Get Verified</Button>}

                    <Box className="icon" onClick={() => deleteWorkExperience(_id)}>
                      <RiDeleteBin6Line size={'22px'} className="btn" />
                    </Box>
                    <Box className="icon">
                      <RiEdit2Line size={'22px'} className="btn" />
                    </Box>
                  </Box>
                </Box>
                <Divider my="sm" color="#e1e1e1" />
                <Box className="see-all-info-wrapper">
                  <Box>
                    <Text className="see-all-heading">Company ID</Text>
                    <Text className="detail">{companyId}</Text>
                  </Box>
                  <Box>
                    <Text className="see-all-heading">Work Type</Text>
                    <Text className="detail">{workType}</Text>
                  </Box>
                  <Box>
                    <Text className="see-all-heading">Mode of Work</Text>
                    <Text className="detail">{workMode}</Text>
                  </Box>
                  <Box>
                    <Text className="see-all-heading">Employment since</Text>
                    <Text className="detail">
                      {companyStartDate.toLocaleString().substring(0, 4)}-
                      {companyEndDate.toLocaleString().substring(0, 4)}
                    </Text>
                  </Box>
                  <Box>
                    <Text className="see-all-heading">Work Email</Text>
                    <Text className="detail">{email}</Text>
                  </Box>
                </Box>

                {isVerified && (
                  <Box>
                    <Divider my="sm" color="#e1e1e1" />
                    <Box className="see-all-peer-verification">
                      <Title className="see-all-heading">Peer Verification</Title>
                      <Title className="see-all-heading">Verified By</Title>
                      <Box className="verified-by-box">
                        {verifiedBy?.map(
                          ({ verifierName, verifierDesignation, description }, index) => {
                            return (
                              <Box className="verifier-card" key={index}>
                                <Box className="verifiedByImg"></Box>
                                <Text className="verifier-name">{verifierName}</Text>
                                <Text className="verifier-designation">{verifierDesignation}</Text>
                                <Text className="view-details">View details</Text>
                              </Box>
                            );
                          }
                        )}
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            );
          }
        )}
      </Box>
    </section>
  );
};
