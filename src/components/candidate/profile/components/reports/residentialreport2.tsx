import React from 'react';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import { Text, Box, Button } from '@mantine/core';
import { ReportTop } from './ReportTop';
import './_report.scss';
import { ResidentialReport } from './residentialreport';

type ChildComponentProps = {
  ResidentialInfo: ResidentialType[];
  residentialPeer: PeersResponse[];
};

export const ResidentialReport2: React.FC<ChildComponentProps> = ({ residentialPeer, ResidentialInfo }) => {
  return (
    <>
      <main className="report-container">
        <ReportTop />
        <div className="disclaimer-box">
          <span className="disclaimer-text">Residential Information</span>
          {ResidentialInfo.length > 0 ? (
            <>
              {ResidentialInfo.map((resident, index) => (
                <>
                  <div key={index} className="residential-address">
                    <div
                      style={{
                        border: '1px solid #e1e1e1',
                        maxWidth: '24rem',
                        width: 'max-content',
                        padding: '1.5rem',
                        borderRadius: '15px',
                      }}
                      className="residential-address-left left-residential"
                    >
                      <p>{resident.addressType} Address</p>
                      <p style={{ marginBottom: '1rem' }}>
                        {' '}
                        {resident.address_line_1} {resident.address_line_2} {resident.city} - {resident.pincode}
                      </p>

                      {resident.isVerified ? (
                        <Button
                          style={{ border: '1px solid', borderRadius: '34px', padding: '2px 8px' }}
                          leftIcon={<MdVerified color="#17A672" size={'16px'} />}
                          className="verified report-verifybtn"
                        >
                          Verified
                        </Button>
                      ) : residentialPeer.filter((peer) => peer.ref === resident.id).length > 0 ? (
                        <Button
                          style={{ border: '1px solid', borderRadius: '34px', padding: '2px 8px' }}
                          leftIcon={<CgSandClock size={'16px'} />}
                          className="pending report-verifybtn"
                        >
                          Pending
                        </Button>
                      ) : (
                        <Button
                          style={{ color: '#ff7272', border: '1px solid', borderRadius: '34px', padding: '2px 8px' }}
                          className="pending report-verifybtn"
                        >
                          Not Verified
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="location">
                    <p>About Residence</p>
                    <div className="location-date">
                      <p>Last updated</p>
                      <p>
                        {resident.updatedAt ? resident.updatedAt.substring(0, 10).split('-').reverse().join('-') : '-'}
                      </p>
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
                          {resident.end_date ? resident.end_date.substring(0, 4) : 'Present'}
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
                          <Text className="peer-name">{resident.landmark ? 'Geo-Location API' : '-'} </Text>
                        </Box>
                        <Box className="added-peers header-residential">
                          <Text className="peer-name title">Pincode</Text>
                          <Text className="peer-name">{resident.pincode}</Text>
                          <Text className="peer-name">{resident.pincode ? 'Geo-Location API' : '-'} </Text>
                        </Box>
                        <Box className="added-peers header-residential">
                          <Text className="peer-name title">City</Text>
                          <Text className="peer-name">{resident.city}</Text>
                          <Text className="peer-name">{resident.city ? 'Geo-Location API' : '-'} </Text>
                        </Box>
                        <Box className="added-peers header-residential">
                          <Text className="peer-name title">State</Text>
                          <Text className="peer-name">{resident.state}</Text>
                          <Text className="peer-name">{resident.state ? 'Geo-Location API' : '-'} </Text>
                        </Box>
                        <Box className="added-peers header-residential">
                          <Text className="peer-name title">Country</Text>
                          <Text className="peer-name">{resident.country}</Text>
                          <Text className="peer-name">{resident.country ? 'Geo-Location API' : '-'} </Text>
                        </Box>
                      </Box>
                    </Box>
                    <div className="peer-exp-name">
                      <p>Referees</p>
                    </div>
                    {residentialPeer.filter((peer) => peer.ref == resident.id).length ? (
                      residentialPeer
                        .filter((peer) => peer.ref == resident.id)
                        .map((peer, index) => (
                          <React.Fragment key={index}>
                            <Box
                              style={{ gridTemplateColumns: '1.5fr 0.75fr 1.5fr 0.75fr 1fr' }}
                              className="add-peer-header work-header"
                            >
                              <Text className="add-peer-header-text">Particular</Text>
                              <Text className="add-peer-header-text">Peer Relation</Text>
                              <Text className="add-peer-header-text">Peer Details</Text>
                              <Text className="add-peer-header-text">Status</Text>
                              <Text className="add-peer-header-text">Remarks</Text>
                            </Box>
                            <Box className="added-peer-box">
                              <Box
                                style={{ gridTemplateColumns: '1.5fr 0.75fr 1.5fr 0.75fr 1fr' }}
                                className="added-peers added-peers-exp "
                              >
                                <Text className="peer-name title">{peer.name}</Text>
                                <Text className="peer-name">{peer.verificationBy}</Text>
                                <Text
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    gap: '10px',
                                  }}
                                  className="peer-name"
                                >
                                  <span>
                                    Email:
                                    <br />
                                    <a href={`mailto:${peer.email}`}>{peer.email}</a>
                                  </span>

                                  <span>
                                    Phone:
                                    <br />
                                    <a href={`tel:+${peer.phone}`}>{peer.phone}</a>
                                  </span>
                                </Text>
                                <Text
                                  style={
                                    peer.isReal
                                      ? {
                                          color:
                                            peer.isReal.state === 'REJECTED'
                                              ? '#ff7272'
                                              : peer.isReal.state === 'ACCEPTED'
                                              ? '#17A672'
                                              : '#FAB005',
                                          border: '0',
                                          fontSize: '14px',
                                        }
                                      : { border: '0', fontSize: '14px' }
                                  }
                                  className={`peer-name ${peer.isVerificationCompleted ? 'text-verified' : 'pending'}`}
                                >
                                  {peer.isReal
                                    ? peer.isReal.state === 'PENDING'
                                      ? 'Pending'
                                      : peer.isReal.state === 'ACCEPTED'
                                      ? 'Approved'
                                      : 'Rejected'
                                    : peer.isVerificationCompleted
                                    ? 'Approved'
                                    : 'Pending'}
                                </Text>

                                <Text className="peer-name name-wrap">
                                  {peer.isReal ? (
                                    <>
                                      {peer.isReal.state === 'PENDING' && 'No Remarks'}
                                      {peer.isReal.state === 'ACCEPTED' && 'Geo-Location API'}
                                      {peer.isReal.state === 'REJECTED' &&
                                        `${peer.isReal.dispute_type}${
                                          peer.isReal.dispute_reason ? ` - ${peer.isReal.dispute_reason}` : ''
                                        }`}
                                    </>
                                  ) : peer.isVerificationCompleted ? (
                                    'Geo-Location API'
                                  ) : (
                                    'No Remarks'
                                  )}
                                </Text>
                              </Box>
                            </Box>
                            {peer.isVerificationCompleted ? (
                              peer.isReal ? (
                                peer.isReal.state === 'ACCEPTED' ? (
                                  <ResidentialReport ResidentialInfo={[resident]} />
                                ) : (
                                  <></>
                                )
                              ) : (
                                <ResidentialReport ResidentialInfo={[resident]} />
                              )
                            ) : (
                              <></>
                            )}
                          </React.Fragment>
                        ))
                    ) : resident.isVerified ? (
                      <React.Fragment key={index}>
                        <Box className="add-peer-header work-header">
                          <Text className="add-peer-header-text">Particular</Text>
                          <Text className="add-peer-header-text">Peer Relation</Text>

                          <Text className="add-peer-header-text">Status</Text>
                          <Text className="add-peer-header-text">Remarks</Text>
                        </Box>
                        <Box className="added-peer-box">
                          <Box className="added-peers added-peers-exp ">
                            <Text className="peer-name title">Self Verified</Text>
                            <Text className="peer-name">Self</Text>
                            <Text className="peer-name text-verified">Approved</Text>
                            <Text className="peer-name name-wrap">Geo-Location API</Text>
                          </Box>
                        </Box>
                        <ResidentialReport ResidentialInfo={[resident]} />
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={index}>
                        <Box className="add-peer-header work-header">
                          <Text className="add-peer-header-text">Particular</Text>
                          <Text className="add-peer-header-text">Peer Relation</Text>

                          <Text className="add-peer-header-text">Status</Text>
                          <Text className="add-peer-header-text">Remarks</Text>
                        </Box>
                        <Box className="added-peer-box">
                          <Box className="added-peers added-peers-exp ">
                            <Text className="peer-name title">No Referee</Text>
                            <Text className="peer-name">-</Text>
                            <Text className={`peer-name`}>-</Text>
                            <Text className="peer-name name-wrap">-</Text>
                          </Box>
                        </Box>
                        <div className="disclaimer-box">
                          <div style={{ margin: '0' }} className="location">
                            <p>Location Accuracy</p>
                          </div>
                          <Box className="added-peer-box">
                            <Box
                              style={{
                                height: '4rem',
                                borderRadius: '1rem',
                                fontWeight: '500',
                                marginTop: '1rem',
                                gridTemplateColumns: '1fr',
                                fontSize: '1rem',
                              }}
                              className="added-peers added-peers-exp "
                            >
                              Address Not Verified Yet.
                            </Box>
                          </Box>
                        </div>
                      </React.Fragment>
                    )}

                    <hr className="breakLine"></hr>
                  </div>
                </>
              ))}
            </>
          ) : (
            <Box className="added-peer-box">
              <Box
                style={{
                  height: '5rem',
                  borderRadius: '1rem',
                  fontWeight: '500',
                  marginTop: '1rem',
                  gridTemplateColumns: '1fr',
                  fontSize: '1rem',
                }}
                className="added-peers added-peers-exp "
              >
                No Residential Address Added
              </Box>
            </Box>
          )}
        </div>
      </main>
    </>
  );
};
