import { useEffect, useState } from 'react';
import Card from '../components/Card'
import PostEmergency from '../components/PostEmergency'
import { getBaseUrl } from '../utils/getBaseUrl';
import axios from "axios"

const Home = () => {

    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const response = await axios.get(`${getBaseUrl()}/api/incident/getall`);
                setIncidents(response.data.incidents);
                // console.log(incidents)
            } catch (error) {
                console.error('Error fetching incidents:', error);
            }
        };

        fetchIncidents();
    }, []);

    return (
        <>
            <div className='flex flex-row flex-wrap space-x-5 justify-evenly space-y-5'>
                {
                    incidents?.map((ele, index) => {
                        return <Card incident={ele} key={index} />
                    })
                }
            </div>
            <PostEmergency />
        </>
    )
}

export default Home
