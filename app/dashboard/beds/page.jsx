'use client';

import { useState } from 'react';
import { Plus, Search, Download, BedDouble, User, Clock, Filter, CheckCircle, XCircle } from 'lucide-react';

export default function BedsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showExportMenu, setShowExportMenu] = useState(false);

  const beds = [
    { id: 'B-101', ward: 'General Ward A', floor: '1st Floor', type: 'General', status: 'occupied', patient: 'Rajesh Kumar', admittedDate: '2024-01-10' },
    { id: 'B-102', ward: 'General Ward A', floor: '1st Floor', type: 'General', status: 'available', patient: null, admittedDate: null },
    { id: 'B-103', ward: 'General Ward A', floor: '1st Floor', type: 'General', status: 'occupied', patient: 'Priya Sharma', admittedDate: '2024-01-12' },
    { id: 'B-104', ward: 'General Ward A', floor: '1st Floor', type: 'General', status: 'maintenance', patient: null, admittedDate: null },
    { id: 'ICU-01', ward: 'ICU', floor: '2nd Floor', type: 'ICU', status: 'occupied', patient: 'Amit Patel', admittedDate: '2024-01-11' },
    { id: 'ICU-02', ward: 'ICU', floor: '2nd Floor', type: 'ICU', status: 'occupied', patient: 'Sneha Verma', admittedDate: '2024-01-09' },
    { id: 'ICU-03', ward: 'ICU', floor: '2nd Floor', type: 'ICU', status: 'available', patient: null, admittedDate: null },
    { id: 'PVT-201', ward: 'Private Ward', floor: '3rd Floor', type: 'Private', status: 'occupied', patient: 'Vikram Singh', admittedDate: '2024-01-13' },
    { id: 'PVT-202', ward: 'Private Ward', floor: '3rd Floor', type: 'Private', status: 'available', patient: null, admittedDate: null },
    { id: 'PVT-203', ward: 'Private Ward', floor: '3rd Floor', type: 'Private', status: 'available', patient: null, admittedDate: null },
    { id: 'B-201', ward: 'General Ward B', floor: '2nd Floor', type: 'General', status: 'occupied', patient: 'Anita Gupta', admittedDate: '2024-01-08' },
    { id: 'B-202', ward: 'General Ward B', floor: '2nd Floor', type: 'General', status: 'available', patient: null, admittedDate: null },
  ];

  const filteredBeds = beds.filter(bed => {
    const matchesSearch = 
      bed.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.ward.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bed.patient && bed.patient.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterStatus === 'all' || bed.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: beds.length,
    occupied: beds.filter(b => b.status === 'occupied').length,
    available: beds.filter(b => b.status === 'available').length,
    maintenance: beds.filter(b => b.status === 'maintenance').length,
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return 'bg-green-100 text-green-700 border-green-200';
      case 'occupied': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'maintenance': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'available': return <CheckCircle className="w-4 h-4" />;
      case 'occupied': return <User className="w-4 h-4" />;
      case 'maintenance': return <XCircle className="w-4 h-4" />;
      default: return <BedDouble className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Bed Management</h1>
            <p className="text-slate-600">Track bed availability and patient allocations</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <button 
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 flex items-center gap-2 text-slate-700 font-medium shadow-sm hover:shadow-md"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 z-10">
                  <button className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors text-slate-700 rounded-t-xl">
                    Export to Excel
                  </button>
                  <button className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors text-slate-700 border-t rounded-b-xl">
                    Export to PDF
                  </button>
                </div>
              )}
            </div>

            <button className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl">
              <Plus className="w-5 h-5" />
              Allocate Bed
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Total Beds</p>
            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Occupied</p>
            <p className="text-2xl font-bold text-blue-600">{stats.occupied}</p>
            <p className="text-xs text-slate-500 mt-1">
              {Math.round((stats.occupied / stats.total) * 100)}% Occupancy
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Available</p>
            <p className="text-2xl font-bold text-green-600">{stats.available}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Maintenance</p>
            <p className="text-2xl font-bold text-amber-600">{stats.maintenance}</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by bed ID, ward, or patient name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700 font-medium cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
            </select>
            
            <button className="px-6 py-3 rounded-xl font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all duration-300 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Beds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBeds.map((bed) => (
          <div 
            key={bed.id}
            className={`bg-white rounded-xl p-5 shadow-md border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${getStatusColor(bed.status)}`}
          >
            {/* Bed Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BedDouble className="w-5 h-5" />
                <span className="font-bold text-lg">{bed.id}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-full text-xs font-semibold">
                {getStatusIcon(bed.status)}
                <span className="capitalize">{bed.status}</span>
              </div>
            </div>

            {/* Bed Details */}
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-slate-600">Ward</p>
                <p className="font-semibold text-slate-800">{bed.ward}</p>
              </div>
              
              <div>
                <p className="text-slate-600">Location</p>
                <p className="font-medium text-slate-700">{bed.floor}</p>
              </div>

              <div>
                <p className="text-slate-600">Type</p>
                <span className="inline-block px-2 py-0.5 bg-white rounded text-xs font-medium">
                  {bed.type}
                </span>
              </div>

              {bed.status === 'occupied' && bed.patient && (
                <>
                  <div className="pt-2 border-t border-current/20">
                    <p className="text-slate-600 mb-1">Patient</p>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {bed.patient.charAt(0)}
                      </div>
                      <p className="font-semibold text-slate-800">{bed.patient}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">Since {bed.admittedDate}</span>
                  </div>
                </>
              )}
            </div>

            {/* Action Button */}
            <button className={`w-full mt-4 py-2 rounded-lg font-medium transition-colors ${
              bed.status === 'available' 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                : 'bg-white hover:bg-slate-50 text-slate-700'
            }`}>
              {bed.status === 'available' ? 'Allocate' : 'View Details'}
            </button>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredBeds.length === 0 && (
        <div className="text-center py-12">
          <BedDouble className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">No beds found</p>
          <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Click outside to close export menu */}
      {showExportMenu && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowExportMenu(false)}
        />
      )}
    </div>
  );
}