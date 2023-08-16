import React from 'react';
import { MdVerified } from 'react-icons/md';
import { Text, Box } from '@mantine/core';
import './_report.scss';

interface ChildComponentProps {
  IdDetails: IdDetails[];
}

export const PersonalIdentification: React.FC<ChildComponentProps> = ({ IdDetails }) => {
  return (
    <>
      <main className="report-container">
        <div className="report-container-head report-res">
          <div>
            <div className="report-header">
              <span className="greenie">Greenie</span>
              <span className="verified report-verifybtn">
                <MdVerified />
              </span>
            </div>
            <p className="greenie-text">www.greenie.one</p>
          </div>
          <div>
            <p>Background Verification Report</p>
          </div>
        </div>

        <div className="disclaimer-box">
          <span className="disclaimer-text">Personal Identification</span>
        </div>
        <div className="location">
          <p>Aadhaar Card</p>
          <div className="location-date">
            <p>Last updated</p>
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
          {IdDetails.map(
            (id, index) =>
              id.idType == 'AADHAR' && (
                <Box key={index} className="added-peers ">
                  <Text className="peer-name title">Full Name</Text>
                  <Text className="peer-name">{id.data.user_full_name}</Text>
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
            <p>02/03/2023</p>
          </div>
          <div className="location-date">
            <p>Aadhaar Linked</p>
            <p>{IdDetails[1]?.data?.aadhaar_linked_status == true ? 'Yes' : 'No'}</p>
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
            id.idType == 'PAN' && (
              <Box key={index} className="added-peer-box">
                <Box className="added-peers ">
                  <Text className="peer-name title">Full Name</Text>
                  <Text className="peer-name">{id.data.user_full_name}</Text>
                  <Text className="peer-name text-verified">Matched</Text>
                  <Text className="peer-name">Test</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">PAN Number</Text>
                  <Text className="peer-name">{id.data.pan_number}</Text>
                  <Text className="peer-name text-verified">Matched</Text>
                  <Text className="peer-name">Test</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">DOB</Text>
                  <Text className="peer-name">{id.data.user_dob}</Text>
                  <Text className="peer-name text-verified">Matched</Text>
                  <Text className="peer-name">Test</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">PAN type</Text>
                  <Text className="peer-name">{id.data.pan_type}</Text>
                  <Text className="peer-name text-verified">Matched</Text>
                  <Text className="peer-name">Test</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">Phone Number</Text>
                  <Text className="peer-name">{id.data.user_phone_number}</Text>
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
            <p>02/03/2023</p>
          </div>
          <div className="location-date">
            <p>Date of Issue</p>
            <p>Yes</p>
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
            id.idType == 'DRIVING_LICENSE' && (
              <Box key={index} className="added-peer-box">
                <Box className="added-peers ">
                  <Text className="peer-name title">Full Name</Text>
                  <Text className="peer-name">{id.data.user_full_name}</Text>
                  <Text className="peer-name text-verified">Matched</Text>
                  <Text className="peer-name">Test</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">Father’s Name</Text>
                  <Text className="peer-name">{id.data.father_or_husband}</Text>
                  <Text className="peer-name text-verified">Matched</Text>
                  <Text className="peer-name">Test</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">DL Number</Text>
                  <Text className="peer-name">{id.data.dl_number}</Text>
                  <Text className="peer-name text-verified">Matched</Text>
                  <Text className="peer-name">Test</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">DOB</Text>
                  <Text className="peer-name">{id.data.user_dob}</Text>
                  <Text className="peer-name text-verified">Matched</Text>
                  <Text className="peer-name">Test</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">Vehicle type</Text>
                  <Text className="peer-name">Test</Text>
                  <Text className="peer-name text-verified">Matched</Text>
                  <Text className="peer-name">Test</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">Phone Number</Text>
                  <Text className="peer-name">Test</Text>
                  <Text className="peer-name text-verified">Matched</Text>
                  <Text className="peer-name">Test</Text>
                </Box>
                <Box className="added-peers ">
                  <Text className="peer-name title">Blood Group</Text>
                  <Text className="peer-name">{id.data.user_blood_group}</Text>
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
