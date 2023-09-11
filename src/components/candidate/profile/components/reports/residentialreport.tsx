import React from 'react';
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

export const ResidentialReport: React.FC<ChildComponentProps> = ({ ResidentialInfo }) => {
  return (
    <>
      <div className="disclaimer-box">
        <>
          {ResidentialInfo.map((resident, index) => {
            return (
              <React.Fragment key={index}>
                <div style={{ margin: '0' }} className="location">
                  <p>Location Accuracy</p>
                  <div className="location-date">
                    <p>Last updated</p>
                    <p>
                      {resident.updatedAt ? resident.updatedAt.substring(0, 10).split('-').reverse().join('-') : '-'}
                    </p>
                  </div>
                </div>
                <div className="table">
                  <div className="row">
                    <div className="cell">Description</div>
                    <div className="cell">Source</div>
                    <div className="cell">Location Resolution Logic</div>
                    <div className="cell">Legend</div>
                  </div>
                  <div className="row">
                    <div className="cell">
                      {resident.address_line_1} {resident.address_line_2} {resident.city} - {resident.pincode}
                    </div>
                    <div className="cell">Claimed Address</div>
                    <div className="cell">Azure Maps API</div>
                    <div className="cell">
                      <p className="red-legend"></p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="cell">
                      {resident.capturedLocation.latitude}, {resident.capturedLocation.longitude}
                    </div>
                    <div className="cell">Captured Address</div>
                    <div className="cell">Geo-Location API</div>
                    <div className="cell">
                      <p className="green-legend"></p>
                    </div>
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
          })}
        </>
      </div>
    </>
  );
};
