// import { Carousel } from "flowbite-react";
// import { useParams } from "react-router-dom";
// import { getBaseUrl } from "../utils/getBaseUrl";
// import axios from "axios"
// import { useEffect, useState } from "react";

// const EventDetailsPage = () => {

//     const { id } = useParams()
//     const [incident, setIncident] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);


//     useEffect(() => {
//         const fetchIncident = async () => {
//             try {
//                 const response = await axios.get(`${getBaseUrl()}/api/incident/getincident/${id}`);
//                 setIncident(response.data.incident);
//             } catch (err) {
//                 setError('Failed to fetch incident details');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchIncident();
//     }, [id]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;
//     if (!incident) return <div>No incident found</div>;



//     return (
//         <div className="w-screen h-screen flex flex-column flex-wrap">

//             <div className="w-full h-[50%] flex flex-row border-[1px] border-green-500">
//                 <div className="w-[50%] h-[100%] border-[1px] border-red-600">

//                     <Carousel slideInterval={1500}>
//                         {
//                             incident?.images?.map((ele, index) => {
//                                 return <img src={ele} key={index} />
//                             })
//                         }
//                     </Carousel>

//                 </div>
//                 <div className="w-[50%] h-[100%] border-[1px] border-blue-600">
//                     {/* insert map logic here */}
//                 </div>
//             </div>


//             <div className="w-full h-[50%] flex flex-row">
//                 <div className="w-[33.33%] h-full border-[1px] border-black">
//                 </div>
//                 <div className="w-[33.33%] h-full border-[1px] border-black"></div>
//                 <div className="w-[33.33%] h-full border-[1px] border-black"></div>
//             </div>


//         </div>
//     )
// }

// export default EventDetailsPage



// import { Carousel } from "flowbite-react";
// import { useParams } from "react-router-dom";
// import { getBaseUrl } from "../utils/getBaseUrl";
// import axios from "axios";
// import { useEffect, useRef, useState } from "react";
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// const EventDetailsPage = () => {

//     const { id } = useParams();
//     const [incident, setIncident] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const mapsRef = useRef(null); // Reference for the map container

//     useEffect(() => {
//         const fetchIncident = async () => {
//             try {
//                 const response = await axios.get(`${getBaseUrl()}/api/incident/getincident/${id}`);
//                 setIncident(response.data.incident);
//             } catch (err) {
//                 setError('Failed to fetch incident details');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchIncident();
//     }, [id]);

//     useEffect(() => {
//         if (!loading && incident) {
//             const map = L.map(mapsRef.current).setView([incident.latitude, incident.longitude], 13);

//             L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//                 attribution: '© OpenStreetMap contributors'
//             }).addTo(map);

//             L.marker([incident.latitude, incident.longitude]).addTo(map)
//                 .bindPopup('Incident Location')
//                 .openPopup();
//         }
//     }, [loading, incident]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;
//     if (!incident) return <div>No incident found</div>;

//     return (
//         <div className="w-screen h-screen flex flex-column flex-wrap">
//             <div className="w-full h-[50%] flex flex-row border-[1px] border-green-500">
//                 <div className="w-[50%] h-[100%] border-[1px] border-red-600">
//                     <Carousel slideInterval={1500}>
//                         {
//                             incident?.images?.map((ele, index) => (
//                                 <img src={ele} key={index} alt={`Incident image ${index + 1}`} />
//                             ))
//                         }
//                     </Carousel>
//                 </div>
//                 <div className="w-[50%] h-[100%] border-[1px] border-blue-600">
//                     <div id="map" ref={mapsRef} style={{ width: '100%', height: '100%' }}></div>
//                 </div>
//             </div>
//             <div className="w-full h-[50%] flex flex-row">
//                 <div className="w-[33.33%] h-full border-[1px] border-black"></div>
//                 <div className="w-[33.33%] h-full border-[1px] border-black"></div>
//                 <div className="w-[33.33%] h-full border-[1px] border-black"></div>
//             </div>
//         </div>
//     );
// };

// export default EventDetailsPage;













import { Carousel } from "flowbite-react";
import { useParams } from "react-router-dom";
import { getBaseUrl } from "../utils/getBaseUrl";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

const EventDetailsPage = () => {
    const { id } = useParams();
    const [incident, setIncident] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const mapRef = useRef(null); // Reference for the map container
    const leafletMap = useRef(null); // Reference for the Leaflet map instance

    useEffect(() => {
        const fetchIncident = async () => {
            try {
                const response = await axios.get(`${getBaseUrl()}/api/incident/getincident/${id}`);
                setIncident(response.data.incident);
            } catch (err) {
                setError('Failed to fetch incident details');
            } finally {
                setLoading(false);
            }
        };

        fetchIncident();
    }, [id]);

    useEffect(() => {
        if (!loading && incident) {
            // Initialize the map only if it hasn't been initialized already
            if (leafletMap.current === null) {
                leafletMap.current = L.map(mapRef.current).setView([incident.latitude, incident.longitude], 13);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors'
                }).addTo(leafletMap.current);

                L.marker([incident.latitude, incident.longitude]).addTo(leafletMap.current)
                    .bindPopup('Incident Location')
                    .openPopup();

                // Assuming you have start and end coordinates for the directions
                const startCoords = [12.8076, 74.8883]; // Replace with actual start coordinates
                const endCoords = [incident.latitude, incident.longitude];

                L.Routing.control({
                    waypoints: [
                        L.latLng(startCoords[0], startCoords[1]),
                        L.latLng(endCoords[0], endCoords[1])
                    ],
                    routeWhileDragging: true
                }).addTo(leafletMap.current);
            }
        }

        // Cleanup function to remove the map instance
        return () => {
            if (leafletMap.current !== null) {
                leafletMap.current.remove();
                leafletMap.current = null;
            }
        };
    }, [loading, incident]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!incident) return <div>No incident found</div>;

    return (
        <div className="w-screen h-screen flex flex-column flex-wrap">
            <div className="w-full h-[50%] flex flex-row border-[1px] border-green-500">
                <div className="w-[50%] h-[100%] border-[1px] border-red-600">
                    <Carousel slideInterval={1500}>
                        {
                            incident?.images?.map((ele, index) => (
                                <img src={ele} key={index} alt={`Incident image ${index + 1}`} />
                            ))
                        }
                    </Carousel>
                </div>
                <div className="w-[50%] h-[100%] border-[1px] border-blue-600">
                    <div id="map" ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
                </div>
            </div>
            <div className="w-full h-[50%] flex flex-row">
                <div className="w-[33.33%] h-full border-[1px] border-black"></div>
                <div className="w-[33.33%] h-full border-[1px] border-black"></div>
                <div className="w-[33.33%] h-full border-[1px] border-black"></div>
            </div>
        </div>
    );
};

export default EventDetailsPage;
