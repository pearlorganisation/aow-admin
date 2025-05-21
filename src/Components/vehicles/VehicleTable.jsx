import React, { useState, useEffect } from 'react';

// --- ImageModal Component ---
const ImageModal = ({ isOpen, onClose, imageUrl, altText }) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;




    return (
        <div
            // --- MODAL BACKDROP CHANGES ---
            className="fixed inset-0 backdrop-blur-sm bg-opacity-75  flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out"
            onClick={onClose} // Close on backdrop click
            role="dialog"
            aria-modal="true"
            aria-labelledby="image-modal-title"
        >
            <div
                className="bg-[#00000029] p-4 sm:p-6 rounded-lg shadow-xl max-w-xl md:max-w-2xl lg:max-w-3xl w-full max-h-[90vh] relative flex flex-col"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
            >
                <div className="flex justify-between items-center mb-3">
                    <h2 id="image-modal-title" className="text-lg font-semibold text-gray-800 sr-only">
                        {altText || "Enlarged Vehicle Image"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="ml-auto text-gray-500 hover:text-gray-800 text-3xl leading-none font-semibold"
                        aria-label="Close image viewer"
                    >
                        ×
                    </button>
                </div>
                <div className="flex-grow overflow-auto flex items-center justify-center">
                    <img
                        src={imageUrl}
                        alt={altText || "Enlarged vehicle image"}
                        className="max-w-full max-h-[calc(90vh-80px)] object-contain rounded"
                    />
                </div>
            </div>
        </div>
    );
};
// --- End of ImageModal Component ---


const VehicleTable = ({ VehicleData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const [selectedImageAlt, setSelectedImageAlt] = useState('');
    
    const hanldeDelete = (id)=>{
       VehicleData =  VehicleData.filter(VehicleData.id !=id )

    }

    const handleImageClick = (imageUrl, altText) => {
        setSelectedImageUrl(imageUrl);
        setSelectedImageAlt(altText);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="overflow-x-auto shadow-md sm:rounded-lg mt-4">
                <table className="min-w-full text-sm">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">S.No</th>
                            <th scope="col" className="px-6 py-3 text-left">Email</th>
                            <th scope="col" className="px-6 py-3 text-left">Vehicle Name</th>
                            <th scope="col" className="px-6 py-3 text-center">Vehicle Image</th>
                            <th scope="col" className="px-6 py-3 text-center">Status</th>
                            <th scope="col" className="px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {VehicleData?.map((vehicle, index) => (
                            <tr
                                key={index}
                                className="border-b odd:bg-white even:bg-gray-50 hover:bg-gray-100 text-center text-gray-700"
                            >
                                <td className="px-6 py-4 font-medium">{index + 1}</td>
                                <td className="px-6 py-4 text-left">{vehicle.email}</td>
                                <td className="px-6 py-4 text-left">{vehicle.name}</td>
                                <td className="px-6 py-4">
                                    <img
                                        src={vehicle.image || '/bike.png'}
                                        alt={vehicle.name || 'vehicle'}
                                        className="w-16 h-12 object-cover mx-auto rounded-md cursor-pointer hover:opacity-80 transition-opacity duration-150 ease-in-out"
                                        onClick={() => handleImageClick(vehicle.image || '/bike.png', vehicle.name || 'Vehicle Image')}
                                    />
                                </td>
                                <td className="px-6 py-4 text-red-500">{vehicle.status}</td>
                                <td className="px-6 py-4 space-x-2 whitespace-nowrap">
                                    <button className="bg-green-500  text-white px-3 py-1 rounded hover:bg-green-600 transition-colors duration-150 ease-in-out">
                                        Approve
                                    </button>
                                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-150 ease-in-out">
                                        Reject
                                    </button>
                                    <button onClick={ ()=>hanldeDelete(vehicle.id)} className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors duration-150 ease-in-out">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {(!VehicleData || VehicleData.length === 0) && (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                    No vehicle data available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <ImageModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                imageUrl={selectedImageUrl}
                altText={selectedImageAlt}
            />
        </>
    );
};

export default VehicleTable;