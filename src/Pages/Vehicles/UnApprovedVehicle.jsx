import React from 'react';
import VehicleTable from '../../Components/vehicles/VehicleTable'; // Assuming this path is correct

const UnApprovedVehicle = () => {
    const data = [
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Not Approved', image: '/bike.png' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Not Approved', image: '/Car.jpg' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Not Approved', image: '/bike.png' },
        { id: 4, name: 'John Doe', email: 'john@example.com', status: 'Not Approved', image: '/bike.png' },
        { id: 5, name: 'Jane Smith', email: 'jane@example.com', status: 'Not Approved', image: '/Car.jpg' },
        { id: 6, name: 'Bob Johnson', email: 'bob@example.com', status: 'Not Approved', image: '/bike.png' },
        { id: 7, name: 'John Doe', email: 'john@example.com', status: 'Not Approved', image: '/bike.png' },
        { id: 8, name: 'Jane Smith', email: 'jane@example.com', status: 'Not Approved', image: '/Car.jpg' },
        { id: 9, name: 'Bob Johnson', email: 'bob@example.com', status: 'Not Approved', image: '/bike.png' },
    ];

    return (
        // Main page container with a light background and responsive padding
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            {/* Content wrapper with a max-width for larger screens, centered */}
            <div className="max-w-full xl:max-w-7xl mx-auto">
                
                {/* Page Header Section */}

                <div className=" rounded-lg shadow-sm p-6 mb-6 flex flex-col justify-center items-center bg-[#e7fde5] w-full ">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-center">
            <div className=''>
              <h1 className="text-2xl font-bold text-gray-900"> Vehicle Listing</h1>
              <p className="mt-1 text-gray-500"> Approve the vehicle if it's legitimate.</p>
            </div>
            
          </div>
        </div>
                

                {/* Vehicle Table Component */}
                {/* The VehicleTable component might already have a top margin (e.g., mt-4). 
                    If not, you could add a div wrapper here with margin if needed. */}
                <VehicleTable VehicleData={data} />
            </div>
        </div>
    );
};

export default UnApprovedVehicle;