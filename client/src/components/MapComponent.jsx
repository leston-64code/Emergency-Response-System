// // MapComponent.jsx
// import  { useEffect, useRef } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet.locatecontrol/dist/L.Control.Locate.css';
// import 'leaflet.locatecontrol';

// const MapComponent = () => {
//     const mapRef = useRef(null); // Use a ref to keep track of the map instance

//     useEffect(() => {
//         if (mapRef.current) {
//             // If the map is already initialized, return to avoid re-initialization
//             return;
//         }

//         // Initialize the map and store the instance in the ref
//         mapRef.current = L.map('map').setView([51.505, -0.09], 13);

//         // Add OpenStreetMap tile layer
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         }).addTo(mapRef.current);

//         // Add locate control to the map
//         L.control.locate({
//             position: 'topright',
//             strings: {
//                 title: "Show me where I am"
//             },
//             locateOptions: {
//                 enableHighAccuracy: true,
//                 timeout: 5000,
//                 maximumAge: 0
//             }
//         }).addTo(mapRef.current);

//         // Clean up the map instance on component unmount
//         return () => {
//             if (mapRef.current) {
//                 mapRef.current.remove();
//                 mapRef.current = null;
//             }
//         };
//     }, []);

//     return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
// };

// export default MapComponent;





import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.css';
import 'leaflet.locatecontrol';

const MapComponent = ({ setCoordinates }) => {
    const mapRef = useRef(null);
    const [coordinates, setLocalCoordinates] = useState({ latitude: '', longitude: '' });

    useEffect(() => {
        if (mapRef.current) {
            return;
        }

        const map = L.map('map').setView([51.505, -0.09], 13);
        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const locateControl = L.control.locate({
            position: 'topright',
            strings: {
                title: "Show me where I am"
            },
            locateOptions: {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        }).addTo(map);

        map.on('locationfound', (e) => {
            const { lat, lng } = e.latlng;
            setLocalCoordinates({ lat, lng });
            console.log(e.latlng)
            setCoordinates({ lat, lng });
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [setCoordinates]);

    return (
        <div>
            <div id="map" style={{ height: '400px', width: '100%' }}></div>
            <div>
                <p>Latitude: {coordinates.lat}</p>
                <p>Longitude: {coordinates.lng}</p>
            </div>
        </div>
    );
};

export default MapComponent;



// import  { useEffect, useRef, useState } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet.locatecontrol/dist/L.Control.Locate.css';
// import 'leaflet.locatecontrol';

// const MapComponent = ({ setCoordinates }) => {
//     const mapRef = useRef(null);
//     const [coordinates, setLocalCoordinates] = useState({ latitude: '', longitude: '' });

//     useEffect(() => {
//         if (mapRef.current) {
//             return;
//         }

//         // Initialize the map and store the instance in the ref
//         const map = L.map('map').setView([51.505, -0.09], 13);
//         mapRef.current = map;

//         // Add OpenStreetMap tile layer
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         }).addTo(map);

//         // Add locate control to the map
//         const locateControl = L.control.locate({
//             position: 'topright',
//             strings: {
//                 title: "Show me where I am"
//             },
//             locateOptions: {
//                 enableHighAccuracy: true,
//                 timeout: 5000,
//                 maximumAge: 0
//             }
//         }).addTo(map);

//         // Event listener for location found
//         map.on('locationfound', (e) => {
//             const { lat, lng } = e.latlng;
//             setLocalCoordinates({ latitude: lat, longitude: lng });
//             setCoordinates({ latitude: lat, longitude: lng });
//         });

//         // Trigger locate control once on mount
//         locateControl.start();

//         // Clean up the map instance on component unmount
//         return () => {
//             if (mapRef.current) {
//                 mapRef.current.remove();
//                 mapRef.current = null;
//             }
//         };
//     }, [setCoordinates]);

//     return (
//         <div>
//             <div id="map" style={{ height: '400px', width: '100%' }}></div>
//             <div>
//                 <p>Latitude: {coordinates.latitude}</p>
//                 <p>Longitude: {coordinates.longitude}</p>
//             </div>
//         </div>
//     );
// };

// export default MapComponent;
