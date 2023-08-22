import React from 'react';
import { Text, Box } from '@mantine/core';
import { ReportTop } from './ReportTop';
import './_report.scss';

type ChildComponentProps = {
  IdDetails: IdDetailsResponse;
};

export const PersonalIdentification: React.FC<ChildComponentProps> = ({ IdDetails }) => {
  return (
    <>
      <main className="report-container">
        <ReportTop />
        <div className="disclaimer-box">
          <span className="disclaimer-text">Personal Identification</span>
        </div>
        {IdDetails.aadhar ? (
          <>
            <div className="location">
              <p>Aadhaar Card</p>
              <div className="location-date">
                <p>Last updated</p>
                <p>{IdDetails.aadhar?.updatedAt.substring(0, 10).split('-').reverse().join('-')}</p>
              </div>
            </div>
            {IdDetails.aadhar ? (
              <>
                {' '}
                <Box className="add-peer-header">
                  <Text className="add-peer-header-text">Particular</Text>
                  <Text className="add-peer-header-text">Value</Text>
                  <Text className="add-peer-header-text ">Status</Text>
                  <Text className="add-peer-header-text">Remarks</Text>
                </Box>
                <Box className="added-peer-box">
                  <Box className="added-peers ">
                    <Text className="peer-name title">Full Name</Text>
                    <Text className="peer-name">{IdDetails.aadhar?.fullName ? IdDetails.aadhar.fullName : '-'}</Text>
                    <Text className="peer-name text-verified">
                      {' '}
                      {IdDetails.aadhar?.fullName ? 'Matched' : 'Not Matched'}
                    </Text>
                    <Text className="peer-name">API Verification</Text>
                  </Box>
                </Box>
              </>
            ) : null}
          </>
        ) : (
          <>
            <div className="location">
              <p>Aadhaar Card</p>
            </div>
            <Box className="added-peer-box">
              <Box
                style={{ borderRadius: '1rem', fontWeight: '500', marginTop: '1rem' }}
                className="added-peers added-peers-exp "
              >
                Aadhar Not Verified
              </Box>
            </Box>
          </>
        )}

        {IdDetails.pan ? (
          <>
            <div className="location">
              <p>PAN Card</p>
              <div className="location-date">
                <p>Aadhaar Linked</p>
                <p>{IdDetails.pan?.aadharLinked == true ? 'Yes' : 'No'}</p>
              </div>
              <div className="location-date">
                <p>Last updated</p>
                <p>{IdDetails.pan?.updatedAt.substring(0, 10).split('-').reverse().join('-')}</p>
              </div>
            </div>
            <Box className="add-peer-header">
              <Text className="add-peer-header-text">Particular</Text>
              <Text className="add-peer-header-text">Value</Text>
              <Text className="add-peer-header-text ">Status</Text>
              <Text className="add-peer-header-text">Remarks</Text>
            </Box>
            {IdDetails.pan ? (
              <Box className="added-peer-box">
                <Box className="added-peers ">
                  <Text className="peer-name title">Full Name</Text>
                  <Text className="peer-name">{IdDetails.pan?.fullName ? IdDetails.pan.fullName : '-'}</Text>
                  <Text className={`peer-name ${IdDetails.pan?.fullName ? 'text-verified' : 'text-dispute'}`}>
                    {IdDetails.pan?.fullName ? 'Matched' : 'Not Matched'}
                  </Text>
                  <Text className="peer-name">API Verification</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">PAN Number</Text>
                  <Text className="peer-name">{IdDetails.pan?.id_number ? IdDetails.pan.id_number : '-'}</Text>

                  <Text className={`peer-name ${IdDetails.pan?.id_number ? 'text-verified' : 'text-dispute'}`}>
                    {IdDetails.pan?.id_number ? 'Matched' : 'Not Matched'}
                  </Text>
                  <Text className="peer-name">API Verification</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">DOB</Text>
                  <Text className="peer-name">{IdDetails.pan?.dob ? IdDetails.pan?.dob : '-'}</Text>

                  <Text className={`peer-name ${IdDetails.pan?.dob ? 'text-verified' : 'text-dispute'}`}>
                    {IdDetails.pan?.dob ? 'Matched' : 'Not Matched'}
                  </Text>
                  <Text className="peer-name">API Verification</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">PAN Type</Text>
                  <Text className="peer-name">{IdDetails.pan?.pan_type ? IdDetails.pan.pan_type : '-'}</Text>
                  <Text className={`peer-name ${IdDetails.pan?.pan_type ? 'text-verified' : 'text-dispute'}`}>
                    {IdDetails.pan?.pan_type ? 'Matched' : 'Not Matched'}
                  </Text>
                  <Text className="peer-name">API Verification</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">Phone Number</Text>
                  <Text className="peer-name">{IdDetails.pan?.phoneNumber ? IdDetails.pan.phoneNumber : '-'}</Text>
                  <Text className={`peer-name ${IdDetails.pan?.phoneNumber ? 'text-verified' : 'text-dispute'}`}>
                    {IdDetails.pan?.phoneNumber ? 'Matched' : 'Not Matched'}
                  </Text>
                  <Text className="peer-name">API Verification</Text>
                </Box>
              </Box>
            ) : null}
          </>
        ) : (
          <>
            <div className="location">
              <p>PAN Card</p>
            </div>
            <Box className="added-peer-box">
              <Box
                style={{ borderRadius: '1rem', fontWeight: '500', marginTop: '1rem' }}
                className="added-peers added-peers-exp "
              >
                PAN Not Verified
              </Box>
            </Box>
          </>
        )}
        {IdDetails.dl ? (
          <>
            <div className="location">
              <p>Driving License</p>
              <div className="location-date">
                <p>Date of Issue</p>
                <p>{IdDetails.dl?.dateOfIssue}</p>
              </div>
              <div className="location-date">
                <p>Date of Expiry</p>
                <p>{IdDetails.dl?.dateOfExpiry}</p>
              </div>
              <div className="location-date">
                <p>Last updated</p>
                <p>{IdDetails.dl ? IdDetails.dl?.updatedAt.substring(0, 10).split('-').reverse().join('-') : '-'}</p>
              </div>
            </div>
            <Box className="add-peer-header">
              <Text className="add-peer-header-text">Particular</Text>
              <Text className="add-peer-header-text">Status</Text>
              <Text className="add-peer-header-text ">Status</Text>
              <Text className="add-peer-header-text">Remarks</Text>
            </Box>
            {IdDetails.dl ? (
              <Box className="added-peer-box">
                <Box className="added-peers ">
                  <Text className="peer-name title">Full Name</Text>
                  <Text className="peer-name">{IdDetails.dl?.fullName ? IdDetails.dl.fullName : '-'}</Text>
                  <Text className={`peer-name ${IdDetails.dl?.fullName ? 'text-verified' : 'text-dispute'}`}>
                    {IdDetails.dl?.fullName ? 'Matched' : 'Not Matched'}
                  </Text>
                  <Text className="peer-name">API Verification</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">Father&apos;s Name</Text>
                  <Text className="peer-name">{IdDetails.dl?.fatherName ? IdDetails.dl?.fatherName : '-'}</Text>
                  <Text className={`peer-name ${IdDetails.dl?.fatherName ? 'text-verified' : 'text-dispute'}`}>
                    {IdDetails.dl?.fatherName ? 'Matched' : 'Not Matched'}
                  </Text>
                  <Text className="peer-name">API Verification</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">DL Number</Text>
                  <Text className="peer-name">{IdDetails.dl?.id_number ? IdDetails.dl?.id_number : '-'}</Text>
                  <Text className={`peer-name ${IdDetails.dl?.id_number ? 'text-verified' : 'text-dispute'}`}>
                    {IdDetails.dl?.id_number ? 'Matched' : 'Not Matched'}{' '}
                  </Text>
                  <Text className="peer-name">API Verification</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">DOB</Text>
                  <Text className="peer-name">{IdDetails.dl?.dob ? IdDetails.dl?.dob : '-'}</Text>
                  <Text className={`peer-name ${IdDetails.dl?.dob ? 'text-verified' : 'text-dispute'}`}>
                    {IdDetails.dl?.dob ? 'Matched' : 'Not Matched'}
                  </Text>
                  <Text className="peer-name">API Verification</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">Vehicle type</Text>
                  <Text className="peer-name">
                    {IdDetails.dl?.VehicleType.length
                      ? IdDetails.dl.VehicleType.map((type, id) => (
                          <React.Fragment key={id}>
                            {id > 0 ? ', ' : ''}
                            {type}
                          </React.Fragment>
                        ))
                      : '-'}
                  </Text>
                  <Text className={`peer-name ${IdDetails.dl?.VehicleType ? 'text-verified' : 'text-dispute'}`}>
                    {IdDetails.dl?.VehicleType.length ? 'Matched' : 'Not Matched'}
                  </Text>
                  <Text className="peer-name">API Verification</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">Phone Number</Text>
                  <Text className="peer-name">{IdDetails.dl?.phoneNumber ? IdDetails.dl?.phoneNumber : '-'}</Text>
                  <Text className={`peer-name ${IdDetails.dl?.phoneNumber ? 'text-verified' : 'text-dispute'}`}>
                    {IdDetails.dl?.phoneNumber ? 'Matched' : 'Not Matched'}
                  </Text>
                  <Text className="peer-name">API Verification</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">Blood Group</Text>
                  <Text className="peer-name">{IdDetails.dl?.bloodGroup ? IdDetails.dl?.bloodGroup : '-'}</Text>
                  <Text className={`peer-name ${IdDetails.dl?.bloodGroup ? 'text-verified' : 'text-dispute'}`}>
                    {IdDetails.dl?.bloodGroup ? 'Matched' : 'Not Matched'}
                  </Text>
                  <Text className="peer-name">API Verification</Text>
                </Box>
              </Box>
            ) : null}
          </>
        ) : (
          <>
            <div className="location">
              <p>Driving License</p>
            </div>
            <Box className="added-peer-box">
              <Box
                style={{ borderRadius: '1rem', fontWeight: '500', marginTop: '1rem' }}
                className="added-peers added-peers-exp "
              >
                Driving License Not Verified
              </Box>
            </Box>
          </>
        )}
      </main>
    </>
  );
};
