import React from 'react';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import { Button } from '@mantine/core';
import { ReportTop } from './ReportTop';
import './_report.scss';
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import mapMarker from '../../assets/map-marker.png';
import mapMarkerGreen from '../../assets/map-marker-green.png';

type ChildComponentProps = {
  ResidentialInfo: ResidentialType[];
};

const marker = new Icon({
  iconUrl: mapMarker,
  iconSize: [25, 25],
});

const markerGreen = new Icon({
  iconUrl: mapMarkerGreen,
  iconSize: [25, 25],
});

const data = [
  ['1', '2', '3', '4'],
  ['1', '2', '3', '4'],
];

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
                      bounds={[
                        [resident.location.latitude, resident.location.longitude],
                        [resident.capturedLocation.latitude, resident.capturedLocation.longitude],
                      ]}
                      style={{ height: '20rem' }}
                      scrollWheelZoom={false}
                      maxZoom={15}
                      zoomControl={false}
                      attributionControl={false}
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
                        radius={500}
                      >
                        <Marker position={[resident.location.latitude, resident.location.longitude]} icon={marker}>
                          <Popup>
                            {resident.address_line_1} {resident.address_line_2} {resident.city} - {resident.pincode}
                          </Popup>
                        </Marker>
                      </Circle>
                      <Circle
                        center={[resident.capturedLocation.latitude, resident.capturedLocation.longitude]}
                        color={'#17A672'}
                        fillColor={'#17A672'}
                        fillOpacity={0.4}
                        radius={500}
                      >
                        <Marker
                          position={[resident.capturedLocation.latitude, resident.capturedLocation.longitude]}
                          icon={markerGreen}
                        >
                          <Popup>
                            {resident.capturedLocation.latitude}, {resident.capturedLocation.longitude}
                          </Popup>
                        </Marker>
                      </Circle>
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
