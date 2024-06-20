import  { useState } from 'react';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { FileInput } from 'flowbite-react';
import MapComponent from './MapComponent';

const PostEmergency = () => {
    const [openModal, setOpenModal] = useState(true);
    const [coordinates, setCoordinates] = useState({ latitude: '', longitude: '' });

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Post Emergency</Button>
            <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Post an Emergency</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Enter your name" />
                            </div>
                            <TextInput id="name" placeholder="Your name" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone" value="Enter your phone no" />
                            </div>
                            <TextInput id="phone" type="text" placeholder="Your phone number" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="multiple-file-upload" value="Upload multiple images" />
                            </div>
                            <FileInput id="multiple-file-upload" multiple />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="location" value="Your location coordinates" />
                            </div>
                            <MapComponent setCoordinates={setCoordinates} />
                            {/* <div>
                                <p>Latitude: {coordinates.lat}</p>
                                <p>Longitude: {coordinates.lng}</p>
                            </div> */}
                        </div>
                        <div className="w-full">
                            <Button>Submit</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PostEmergency;
