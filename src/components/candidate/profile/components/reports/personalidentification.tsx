import React from 'react';
import { Text, Box } from '@mantine/core';
import { ReportTop } from './ReportTop';
import './_report.scss';

interface ChildComponentProps {
  IdDetails: IdDetails[];
}

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
            {IdDetails.map(
              (id, index) =>
                id.id_type == 'AADHAR' && (
                  <p key={index}>{id.updatedAt.substring(0, 10).split('-').reverse().join('/')}</p>
                )
            )}
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
            {IdDetails.map(
              (id, index) =>
                id.id_type == 'PAN' && <p key={index}>{id.updatedAt.substring(0, 10).split('-').reverse().join('/')}</p>
            )}
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
        {IdDetails.map(
          (id, index) =>
            id.id_type == 'PAN' && (
              <Box key={index} className="added-peer-box">
                <Box className="added-peers ">
                  <Text className="peer-name title">Full Name</Text>
                  <Text className="peer-name">{id.fullName}</Text>
                  <Text className="peer-name text-verified">Matched</Text>
                  <Text className="peer-name">Test</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">PAN Number</Text>
                  <Text className="peer-name">{id.id_number}</Text>
                  <Text className="peer-name text-verified">Matched</Text>
                  <Text className="peer-name">Test</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">DOB</Text>
                  <Text className="peer-name">{id.dob}</Text>
                  <Text className="peer-name text-verified">Matched</Text>
                  <Text className="peer-name">Test</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">PAN type</Text>
                  <Text className="peer-name"></Text>
                  <Text className="peer-name text-verified">Matched</Text>
                  <Text className="peer-name">Test</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">Phone Number</Text>
                  <Text className="peer-name"></Text>
                  <Text className="peer-name text-verified">Matched</Text>
                  <Text className="peer-name">Test</Text>
                </Box>
              </Box>
            )
        )}

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
                  <Text className="peer-name">{id.fullName}</Text>
                  <Text className="peer-name text-verified">Matched</Text>
                  <Text className="peer-name">Test</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">Father’s Name</Text>
                  <Text className="peer-name"></Text>
                  <Text className="peer-name text-verified">Matched</Text>
                  <Text className="peer-name">Test</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">DL Number</Text>
                  <Text className="peer-name">{id.id_number}</Text>
                  <Text className="peer-name text-verified">Matched</Text>
                  <Text className="peer-name">Test</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">DOB</Text>
                  <Text className="peer-name">{id.dob}</Text>
                  <Text className="peer-name text-verified">Matched</Text>
                  <Text className="peer-name">Test</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">Vehicle type</Text>
                  <Text className="peer-name"></Text>
                  <Text className="peer-name text-verified">Matched</Text>
                  <Text className="peer-name">Test</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">Phone Number</Text>
                  <Text className="peer-name"></Text>
                  <Text className="peer-name text-verified">Matched</Text>
                  <Text className="peer-name">Test</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">Blood Group</Text>
                  <Text className="peer-name"></Text>
                  <Text className="peer-name text-verified">Matched</Text>
                  <Text className="peer-name">Test</Text>
                </Box>
              </Box>
            )
        )}
      </main>
    </>
  );
};
