import React, { useState } from 'react';
import { Search, Filter, Download, RefreshCw } from 'lucide-react';
import VehicleTable from '../../Components/vehicles/VehicleTable';

const ApprovedVehicles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Approved', image: '/bike.png' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Approved', image: '/Car.jpg' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Approved', image: '/bike.png' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Approved', image: '/bike.png' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', status: 'Approved', image: '/Car.jpg' },
    { id: 6, name: 'Diana Miller', email: 'diana@example.com', status: 'Approved', image: '/bike.png' },
    { id: 7, name: 'Edward Davis', email: 'edward@example.com', status: 'Approved', image: '/bike.png' },
    { id: 8, name: 'Fiona Taylor', email: 'fiona@example.com', status: 'Approved', image: '/Car.jpg' },
    { id: 9, name: 'George Robinson', email: 'george@example.com', status: 'Approved', image: '/bike.png' },
  ];

  const filteredData = data.filter(vehicle => 
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    vehicle.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className=" rounded-lg shadow-sm p-6 mb-6 flex flex-col justify-center items-center bg-[#e7fde5] w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className=''>
              <h1 className="text-2xl font-bold text-gray-900">Approved Vehicle Listing</h1>
              <p className="mt-1 text-gray-500">Manage all vehicles approved by the admin</p>
            </div>
            
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or email..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <div>
                <button className="flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200">
                  <Filter size={18} className="mr-2 text-gray-600" />
                  <span>Filter</span>
                </button>
              </div>
              <div>
                <select className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="all">All Vehicles</option>
                  <option value="car">Cars</option>
                  <option value="bike">Bikes</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Total Vehicles</h2>
                <p className="text-2xl font-bold text-gray-900">{data.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3">
                <div className="w-6 h-6 bg-green-600 rounded-full" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Cars</h2>
                <p className="text-2xl font-bold text-gray-900">{data.filter(v => v.image.includes('Car')).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-purple-100 p-3">
                <div className="w-6 h-6 bg-purple-600 rounded-full" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Bikes</h2>
                <p className="text-2xl font-bold text-gray-900">{data.filter(v => v.image.includes('bike')).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {filteredData.length > 0 ? (
            <VehicleTable VehicleData={filteredData} />
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Search size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No vehicles found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovedVehicles;