import React from 'react';
import { Text, Box } from '@mantine/core';
import { ReportTop } from './ReportTop';
import './_report.scss';

type ChildComponentProps = {
  IdDetails: IdDetailsResponse | undefined;
};

export const PersonalIdentification: React.FC<ChildComponentProps> = ({ IdDetails }) => {
  return (
    <>
      <main className="report-container">
        <ReportTop />
        <div className="disclaimer-box">
          <span className="disclaimer-text">Personal Identification</span>
        </div>
        <div className="location">
          <p>Aadhaar Card</p>
          <div className="location-date">
            <p>Last updated</p>
            {/* {IdDetails.map(
              (id, index) =>
                id.id_type == 'AADHAR' && (
                  <p key={index}>{id.updatedAt.substring(0, 10).split('-').reverse().join('/')}</p>
                )
            )} */}

            <p>{IdDetails ? IdDetails.aadhar?.updatedAt.substring(0, 10).split('-').reverse().join('/') : '-'}</p>
          </div>
        </div>

        <Box className="add-peer-header">
          <Text className="add-peer-header-text">Particular</Text>
          <Text className="add-peer-header-text">Status</Text>
          <Text className="add-peer-header-text ">Status</Text>
          <Text className="add-peer-header-text">Remarks</Text>
        </Box>

        <Box className="added-peer-box">
          {IdDetails.map(
            (id, index) =>
              id.id_type == 'AADHAR' && (
                <Box key={index} className="added-peers ">
                  <Text className="peer-name title">Full Name</Text>
                  <Text className="peer-name">{id.fullName}</Text>
                  <Text className="peer-name text-verified">Matched</Text>
                  <Text className="peer-name">Test</Text>
                </Box>
              )
          )}
        </Box>

        <div className="location">
          <p>PAN Card</p>
          <div className="location-date">
            <p>Last updated</p>
            <p>{IdDetails ? IdDetails.pan?.updatedAt.substring(0, 10).split('-').reverse().join('/') : '-'}</p>
          </div>
          <div className="location-date">
            <p>Aadhaar Linked</p>
            {/* <p>{IdDetails[1]?.data?.aadhaar_linked_status == true ? 'Yes' : 'No'}</p> */}
          </div>
          <div className="location-date">
            <p>Validity</p>
            <p>02/03/2023</p>
          </div>
        </div>

        <Box className="add-peer-header">
          <Text className="add-peer-header-text">Particular</Text>
          <Text className="add-peer-header-text">Status</Text>
          <Text className="add-peer-header-text ">Status</Text>
          <Text className="add-peer-header-text">Remarks</Text>
        </Box>
        <Box className="added-peer-box">
          <Box className="added-peers ">
            <Text className="peer-name title">Full Name</Text>
            <Text className="peer-name">{IdDetails.aadhar.fullName ? IdDetails.aadhar.fullName : '-'}</Text>
            <Text className={`peer-name ${IdDetails.aadhar.fullName ? 'text-verified' : 'text-dispute'}`}>
              {IdDetails.aadhar.fullName ? 'Matched' : 'Not Matched'}
            </Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers ">
            <Text className="peer-name title">PAN Number</Text>
            <Text className="peer-name">{IdDetails.aadhar.id_number ? IdDetails.aadhar.id_number : '-'}</Text>

            <Text className={`peer-name ${IdDetails.aadhar.id_number ? 'text-verified' : 'text-dispute'}`}>
              {IdDetails.aadhar.id_number ? 'Matched' : 'Not Matched'}
            </Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers ">
            <Text className="peer-name title">DOB</Text>
            <Text className="peer-name">{IdDetails.aadhar.dob ? IdDetails.aadhar.dob : '-'}</Text>
            <Text className={`peer-name ${IdDetails.aadhar.dob ? 'text-verified' : 'text-dispute'}`}>
              {IdDetails.aadhar.dob ? 'Matched' : 'Not Matched'}
            </Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers ">
            <Text className="peer-name title">PAN type</Text>
            <Text className="peer-name">{id.panType ? id.panType : '-'}</Text>
            <Text className={`peer-name ${id.panType ? 'text-verified' : 'text-dispute'}`}>
              {id.panType ? 'Matched' : 'Not Matched'}
            </Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers ">
            <Text className="peer-name title">Phone Number</Text>
            <Text className="peer-name">{id.phoneNumber ? id.phoneNumber : '-'}</Text>
            <Text className={`peer-name ${id.phoneNumber ? 'text-verified' : 'text-dispute'}`}>
              {id.phoneNumber ? 'Matched' : 'Not Matched'}
            </Text>
            <Text className="peer-name">Test</Text>
          </Box>
        </Box>

        <div className="location">
          <p>Driving License</p>
          <div className="location-date">
            <p>Last updated</p>
            {IdDetails.map(
              (id, index) =>
                id.id_type == 'DRIVING_LICENSE' && (
                  <p key={index}>{id.updatedAt.substring(0, 10).split('-').reverse().join('/')}</p>
                )
            )}
          </div>
          <div className="location-date">
            <p>Date of Issue</p>
            <p></p>
          </div>
          <div className="location-date">
            <p>Date of Expiry</p>
            <p>02/03/2023</p>
          </div>
        </div>

        <Box className="add-peer-header">
          <Text className="add-peer-header-text">Particular</Text>
          <Text className="add-peer-header-text">Status</Text>
          <Text className="add-peer-header-text ">Status</Text>
          <Text className="add-peer-header-text">Remarks</Text>
        </Box>
        {IdDetails.map(
          (id, index) =>
            id.id_type == 'DRIVING_LICENSE' && (
              <Box key={index} className="added-peer-box">
                <Box className="added-peers ">
                  <Text className="peer-name title">Full Name</Text>
                  <Text className="peer-name">{id.fullName ? id.fullName : '-'}</Text>
                  <Text className={`peer-name ${id.fullName ? 'text-verified' : 'text-dispute'}`}>
                    {id.fullName ? 'Matched' : 'Not Matched'}
                  </Text>
                  <Text className="peer-name">{id.fullName ? 'API' : '-'}</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">Father’s Name</Text>
                  <Text className="peer-name">{id.fatherName ? id.fatherName : '-'}</Text>
                  <Text className={`peer-name ${id.fatherName ? 'text-verified' : 'text-dispute'}`}>
                    {id.fatherName ? 'Matched' : 'Not Matched'}
                  </Text>
                  <Text className="peer-name">{id.fatherName ? 'API' : '-'}</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">DL Number</Text>
                  <Text className="peer-name">{id.id_number ? id.id_number : '-'}</Text>
                  <Text className={`peer-name ${id.id_number ? 'text-verified' : 'text-dispute'}`}>
                    {id.id_number ? 'Matched' : 'Not Matched'}{' '}
                  </Text>
                  <Text className="peer-name">{id.id_number ? 'API' : '-'}</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">DOB</Text>
                  <Text className="peer-name">{id.dob ? id.dob : '-'}</Text>
                  <Text className={`peer-name ${id.dob ? 'text-verified' : 'text-dispute'}`}>
                    {id.dob ? 'Matched' : 'Not Matched'}
                  </Text>
                  <Text className="peer-name">{id.dob ? 'API' : '-'}</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">Vehicle type</Text>
                  <Text className="peer-name">{id.vehicleType ? id.vehicleType : '-'}</Text>
                  <Text className={`peer-name ${id.vehicleType ? 'text-verified' : 'text-dispute'}`}>
                    {id.vehicleType ? 'Matched' : 'Not Matched'}
                  </Text>
                  <Text className="peer-name">{id.vehicleType ? 'API' : '-'}</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">Phone Number</Text>
                  <Text className="peer-name">{id.phoneNumber ? id.phoneNumber : '-'}</Text>
                  <Text className={`peer-name ${id.phoneNumber ? 'text-verified' : 'text-dispute'}`}>
                    {id.phoneNumber ? 'Matched' : 'Not Matched'}
                  </Text>
                  <Text className="peer-name">{id.phoneNumber ? 'API' : '-'}</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">Blood Group</Text>
                  <Text className="peer-name">{id.bloodGroup ? id.bloodGroup : '-'}</Text>
                  <Text className={`peer-name ${id.bloodGroup ? 'text-verified' : 'text-dispute'}`}>
                    {id.bloodGroup ? 'Matched' : 'Not Matched'}
                  </Text>
                  <Text className="peer-name">{id.bloodGroup ? 'API' : '-'}</Text>
                </Box>
              </Box>
            )
        )}
      </main>
    </>
  );
};
