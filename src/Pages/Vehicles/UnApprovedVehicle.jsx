import React from 'react';
import VehicleTable from '../../Components/vehicles/vehicleTable';
import { VehicleData } from '../../Components/Data/Vehicle';
const UnApprovedVehicle = () => {
  

  return (
    <div className="flex flex-col justify-center p-6">
      <h1 className="text-2xl font-semibold mb-2">Vehicle Listing</h1>
      <p className="mb-4 text-gray-600">Approve the vehicle if it's legitimate.</p>
      <VehicleTable VehicleData={VehicleData} />
    </div>
  );
};

export default UnApprovedVehicle;
