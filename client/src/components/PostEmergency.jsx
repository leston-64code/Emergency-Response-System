// import { useState } from 'react';
// import { Button, Label, Modal, TextInput } from 'flowbite-react';
// import { FileInput } from 'flowbite-react';
// import MapComponent from './MapComponent';
// import axios from 'axios';
// import { Dropdown } from "flowbite-react";

// const PostEmergency = () => {
//     const [openModal, setOpenModal] = useState(true);
//     const [coordinates, setCoordinates] = useState({ latitude: '', longitude: '' });
//     const [formData, setFormData] = useState({
//         name: '',
//         phone: '',
//         files: []
//     });
//     const [imagePreviews, setImagePreviews] = useState([]);

//     const handleInputChange = (e) => {
//         const { id, value } = e.target;
//         setFormData(prevState => ({ ...prevState, [id]: value }));
//     };

//     const handleFileChange = (e) => {
//         const files = Array.from(e.target.files);
//         setFormData(prevState => ({ ...prevState, files }));
//         setImagePreviews(files.map(file => URL.createObjectURL(file)));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const data = new FormData();
//         data.append('name', formData.name);
//         data.append('phone', formData.phone);
//         data.append('latitude', coordinates.latitude);
//         data.append('longitude', coordinates.longitude);

//         for (let i = 0; i < formData.files.length; i++) {
//             data.append('files', formData.files[i]);
//         }

//         try {
//             const response = await axios.post('/api/emergency', data, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             console.log('Success:', response.data);
//             setOpenModal(false);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <>
//             <Button onClick={() => setOpenModal(true)}>Post Emergency</Button>
//             <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
//                 <Modal.Header />
//                 <Modal.Body>
//                     <form className="space-y-6" onSubmit={handleSubmit}>
//                         <h3 className="text-xl font-medium text-gray-900 dark:text-white">Post an Emergency</h3>
//                         <div>
//                             <div className="mb-2 block">
//                                 <Label htmlFor="location" value="Your location coordinates" />
//                             </div>
//                             <MapComponent setCoordinates={setCoordinates} />
//                         </div>
//                         <div>
//                             <div className="mb-2 block">
//                                 <Label htmlFor="name" value="Enter your name" />
//                             </div>
//                             <TextInput id="name" placeholder="Your name" required onChange={handleInputChange} />
//                         </div>
//                         <div>
//                             <div className="mb-2 block">
//                                 <Label htmlFor="phone" value="Enter your phone no" />
//                             </div>
//                             <TextInput id="phone" type="text" placeholder="Your phone number" required onChange={handleInputChange} />
//                         </div>
//                         <div>
//                             <div className="mb-2 block">
//                                 <Label htmlFor="multiple-file-upload" value="Upload multiple images" />
//                             </div>
//                             <FileInput id="multiple-file-upload" multiple onChange={handleFileChange} />
//                         </div>
//                         <div className="grid grid-cols-3 gap-2">
//                             {imagePreviews.map((src, index) => (
//                                 <img key={index} src={src} alt={`preview ${index}`} className="h-24 w-24 object-cover" />
//                             ))}
//                         </div>
//                         <Dropdown label="Small dropdown" size="sm">
//                             <Dropdown.Item>Dashboard</Dropdown.Item>
//                             <Dropdown.Item>Settings</Dropdown.Item>
//                             <Dropdown.Item>Earnings</Dropdown.Item>
//                             <Dropdown.Item>Sign out</Dropdown.Item>
//                         </Dropdown>


//                         <div className="w-full">
//                             <Button type="submit">Submit</Button>
//                         </div>
//                     </form>
//                 </Modal.Body>
//             </Modal>
//         </>
//     );
// };

// export default PostEmergency;


import { useState } from 'react';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { FileInput } from 'flowbite-react';
import MapComponent from './MapComponent';
import axios from 'axios';

const PostEmergency = () => {
    const [openModal, setOpenModal] = useState(true);
    const [coordinates, setCoordinates] = useState({ latitude: '', longitude: '' });
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        files: []
    });
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({ ...prevState, [id]: value }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prevState => ({ ...prevState, files: [...prevState.files, ...files] }));
        setImagePreviews(prevPreviews => [
            ...prevPreviews,
            ...files.map(file => URL.createObjectURL(file))
        ]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('phone', formData.phone);
        data.append('latitude', coordinates.latitude);
        data.append('longitude', coordinates.longitude);

        for (let i = 0; i < formData.files.length; i++) {
            data.append('files', formData.files[i]);
        }

        try {
            const response = await axios.post('/api/emergency', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Success:', response.data);
            setOpenModal(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Post Emergency</Button>
            <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
                <Modal.Header />
                <Modal.Body>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Post an Emergency</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Enter your name" />
                            </div>
                            <TextInput id="name" placeholder="Your name" required onChange={handleInputChange} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone" value="Enter your phone no" />
                            </div>
                            <TextInput id="phone" type="text" placeholder="Your phone number" required onChange={handleInputChange} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="multiple-file-upload" value="Upload multiple images" />
                            </div>
                            <input
                                type="file"
                                id="multiple-file-upload"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100"
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="camera-capture" value="Capture images using camera" />
                            </div>
                            <input
                                type="file"
                                id="camera-capture"
                                accept="image/*"
                                capture="environment"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-green-50 file:text-green-700
                                    hover:file:bg-green-100"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {imagePreviews.map((src, index) => (
                                <img key={index} src={src} alt={`preview ${index}`} className="h-24 w-24 object-cover" />
                            ))}
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="location" value="Your location coordinates" />
                            </div>
                            <MapComponent setCoordinates={setCoordinates} />
                        </div>
                        <div className="w-full">
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PostEmergency;

