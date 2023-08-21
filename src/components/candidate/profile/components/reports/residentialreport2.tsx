import React from 'react';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import { Text, Box, Button } from '@mantine/core';
import { ReportTop } from './ReportTop';
import './_report.scss';

interface ChildComponentProps {
  ResidentialInfo: ResidentialType[];
  residentialPeer: PeersResponse[];
}

export const ResidentialReport2: React.FC<ChildComponentProps> = ({ residentialPeer, ResidentialInfo }) => {
  return (
    <>
      <main className="report-container">
        <ReportTop />
        <div className="disclaimer-box">
          <span className="disclaimer-text">Residential Information</span>
          {ResidentialInfo.map((resident, index) => (
            <>
              <div key={index} className="residential-address">
                <div className="residential-address-left left-residential">
                  <p>{resident.addressType} Address</p>
                  <p>
                    {' '}
                    {resident.address_line_1} {resident.address_line_2} {resident.city} - {resident.pincode}
                  </p>
                  {resident.isVerified ? (
                    <Button
                      leftIcon={<MdVerified color="#17A672" size={'16px'} />}
                      className="verified report-verifybtn"
                    >
                      Verified
                    </Button>
                  ) : (
                    <Button leftIcon={<CgSandClock size={'16px'} />} className="pending report-verifybtn">
                      Pending
                    </Button>
                  )}
                </div>
              </div>
              <div className="location">
                <p>About Residence</p>
                <div className="location-date">
                  <p>Last updated</p>
                  {/* <p>{resident.updatedAt}</p> */}
                </div>
              </div>
              <div key={index}>
                <Box className="basic-info-box-wrapper residence-wrapper">
                  <Box className="info-box">
                    <Text className="experience-details-box-heading">Address type</Text>
                    <Text className="experience-details-box-text">{resident.addressType} </Text>
                  </Box>
                  <Box className="info-box">
                    <Text className="experience-details-box-heading">Tenure</Text>
                    <Text className="experience-details-box-text">
                      {resident.start_date.substring(0, 4)} -{' '}
                      {resident.endDate ? resident.endDate.substring(0, 4) : 'Present'}
                    </Text>
                  </Box>
                  <Box className="info-box">
                    <Text className="experience-details-box-heading">Address Line 1</Text>
                    <Text className="experience-details-box-text">{resident.address_line_1} </Text>
                  </Box>
                  <Box className="info-box">
                    <Text className="experience-details-box-heading">Address Line 2</Text>
                    <Text className="experience-details-box-text">{resident.address_line_2}</Text>
                  </Box>
                </Box>
                <div className="location">
                  <p>Geographic Information</p>
                </div>

                <Box className="add-peer-header header-residential">
                  <Text className="add-peer-header-text">Particular</Text>
                  <Text className="add-peer-header-text">Value</Text>
                  <Text className="add-peer-header-text">Remarks</Text>
                </Box>

                <Box className="added-peer-box">
                  <Box className="add-peers">
                    <Box className="added-peers header-residential">
                      <Text className="peer-name title">Landmark</Text>
                      <Text className="peer-name">{resident.landmark}</Text>
                      <Text className="peer-name">{resident.landmark ? 'Geolocation API' : '-'} </Text>
                    </Box>
                    <Box className="added-peers header-residential">
                      <Text className="peer-name title">Pincode</Text>
                      <Text className="peer-name">{resident.pincode}</Text>
                      <Text className="peer-name">{resident.pincode ? 'Geolocation API' : '-'} </Text>
                    </Box>
                    <Box className="added-peers header-residential">
                      <Text className="peer-name title">City</Text>
                      <Text className="peer-name">{resident.city}</Text>
                      <Text className="peer-name">{resident.city ? 'Geolocation API' : '-'} </Text>
                    </Box>
                    <Box className="added-peers header-residential">
                      <Text className="peer-name title">State</Text>
                      <Text className="peer-name">{resident.state}</Text>
                      <Text className="peer-name">{resident.state ? 'Geolocation API' : '-'} </Text>
                    </Box>
                    <Box className="added-peers header-residential">
                      <Text className="peer-name title">Country</Text>
                      <Text className="peer-name">{resident.country}</Text>
                      <Text className="peer-name">{resident.country ? 'Geolocation API' : '-'} </Text>
                    </Box>
                  </Box>
                </Box>

                {residentialPeer.length &&
                  residentialPeer.map(
                    (peer, index) =>
                      peer.ref == resident.id && (
                        <>
                          <div className="peer-exp-name">
                            <p>Referees</p>
                          </div>

                          <Box className="add-peer-header work-header">
                            <Text className="add-peer-header-text">Status</Text>
                            <Text className="add-peer-header-text">Particular</Text>
                            <Text className="add-peer-header-text">Status</Text>
                            <Text className="add-peer-header-text">Remarks</Text>
                          </Box>

                          <Box className="added-peer-box">
                            <Box className="added-peers added-peers-exp ">
                              <Text className="peer-name title">{peer.name}</Text>
                              <Text className="peer-name">{peer.verificationBy}</Text>
                              <Text
                                className={`peer-name ${
                                  peer.isVerificationCompleted ? 'text-verified' : 'text-dispute'
                                }`}
                              >
                                {peer.isVerificationCompleted ? 'Approved' : 'Pending'}
                              </Text>
                              <Text className="peer-name name-wrap">
                                {peer.isVerificationCompleted ? 'Geolocation API' : 'No Remarks'}
                              </Text>
                            </Box>
                          </Box>
                        </>
                      )
                  )}
                <hr className="breakLine"></hr>
              </div>
            </>
          ))}
        </div>
      </main>
    </>
  );
};
