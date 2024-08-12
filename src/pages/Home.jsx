import React, { useState, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Define your locations with zoom levels
const locations = {
  'Pakuwon Tower': { lat: -7.2610202, lng: 112.7384933, zoom: 18 },
  'Surabaya': { lat: -7.2575, lng: 112.7521, zoom: 12 },
  'East Java': { lat: -7.3460, lng: 112.6214, zoom: 8 },
  'Indonesia': { lat: -0.7893, lng: 113.9213, zoom: 5 },
};

const MapView = ({ position, zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo([position.lat, position.lng], zoom, {
      duration: 1.25, // Duration in seconds
      animate: true,
    });
  }, [position, zoom, map]);

  return null;
};

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState(locations['Pakuwon Tower']); // Default to Pakuwon Tower

  const handleHover = useCallback((location) => {
    setCurrentLocation(locations[location]);
  }, []);

  return (
    <div className='grid grid-cols-3 h-screen'>
      <div className='flex flex-col items-start justify-center'>
        <div className='container flex flex-col gap-4'>
          <div
            className='flex flex-col cursor-pointer hover:text-blue-500'
            onMouseEnter={() => handleHover('Pakuwon Tower')}
          >
            <p className='text-xs opacity-60'>Building</p>
            <h2 className='font-bold'>Pakuwon Tower</h2>
          </div>
          <div
            className='flex flex-col cursor-pointer hover:text-blue-500'
            onMouseEnter={() => handleHover('Surabaya')}
          >
            <p className='text-xs opacity-60'>City</p>
            <h2 className='font-bold'>Surabaya</h2>
          </div>
          <div
            className='flex flex-col cursor-pointer hover:text-blue-500'
            onMouseEnter={() => handleHover('East Java')}
          >
            <p className='text-xs opacity-60'>Province</p>
            <h2 className='font-bold'>East Java</h2>
          </div>
          <div
            className='flex flex-col cursor-pointer hover:text-blue-500'
            onMouseEnter={() => handleHover('Indonesia')}
          >
            <p className='text-xs opacity-60'>Country</p>
            <h2 className='font-bold'>Indonesia</h2>
          </div>
        </div>
      </div>
      <div className='col-span-2 bg-stone-50'>
        <MapContainer
          center={[currentLocation.lat, currentLocation.lng]}
          zoom={currentLocation.zoom}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapView position={{ lat: currentLocation.lat, lng: currentLocation.lng }} zoom={currentLocation.zoom} />
          <Marker position={[currentLocation.lat, currentLocation.lng]}>
            <Popup>
              {`Lng: ${currentLocation.lng}, Lat: ${currentLocation.lat}`}
            </Popup>
          </Marker>
        </MapContainer>
        <p>Current coordinates: {`Lng: ${currentLocation.lng}, Lat: ${currentLocation.lat}`}</p>
      </div>
    </div>
  );
}
