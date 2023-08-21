import React from 'react';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import { Button } from '@mantine/core';
import { ReportTop } from './ReportTop';
import './_report.scss';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type ChildComponentProps = {
  ResidentialInfo: ResidentialType[];
};

export const ResidentialReport: React.FC<ChildComponentProps> = ({ ResidentialInfo }) => {
  return (
    <>
      <main className="report-container">
        <ReportTop />

        <div className="disclaimer-box">
          <span className="disclaimer-text">Residential Information</span>
          {ResidentialInfo.map((resident, index) => {
            if (resident.isVerified) {
              return (
                <React.Fragment key={index}>
                  <div className="residential-address">
                    <div className="residential-address-left left-residential">
                      <p>{resident.addressType} Address</p>
                      <p>
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
                    <p>Location Accuracy</p>
                    <div className="location-date">
                      <p>Last updated</p>
                      <p>02/03/2023</p>
                    </div>
                  </div>
                  <div style={{ height: '20rem' }} className="map-box-container">
                    <MapContainer
                      style={{ height: '20rem' }}
                      center={[resident.location.latitude, resident.location.longitude]}
                      zoom={12}
                      scrollWheelZoom={false}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Circle
                        center={[resident.location.latitude, resident.location.longitude]}
                        color={'#CC1034'}
                        fillColor={'#CC1034'}
                        fillOpacity={0.4}
                        radius={2000}
                      ></Circle>
                      <Circle
                        center={[resident.capturedLocation.latitude, resident.capturedLocation.longitude]}
                        color={'#7dd71d'}
                        fillColor={'#7dd71d'}
                        fillOpacity={0.4}
                        radius={2000}
                      ></Circle>
                    </MapContainer>
                  </div>
                </React.Fragment>
              );
            } else {
              return <React.Fragment key={index}></React.Fragment>;
            }
          })}
        </div>
      </main>
    </>
  );
};
