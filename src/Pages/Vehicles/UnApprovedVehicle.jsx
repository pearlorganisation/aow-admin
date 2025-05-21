import React from 'react';
import VehicleTable from '../../Components/vehicles/vehicleTable';
import { VehicleData } from '../../Components/Data/Vehicle';
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
    <div className="flex flex-col justify-center p-6">
      <h1 className="text-2xl font-semibold mb-2">Vehicle Listing</h1>
      <p className="mb-4 text-gray-600">Approve the vehicle if it's legitimate.</p>
      <VehicleTable VehicleData={data} />
    </div>
  );
};

export default UnApprovedVehicle;
