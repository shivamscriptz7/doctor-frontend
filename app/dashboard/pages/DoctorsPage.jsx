'use client';

import { useState } from 'react';
import { Stethoscope, Plus, Search, Download } from 'lucide-react';

export default function DoctorsPage() {
  const [doctors] = useState([
    { id: 1, name: 'Dr. Rajesh Kumar', specialty: 'Cardiologist', experience: '15 years', patients: 245 },
    { id: 2, name: 'Dr. Priya Sharma', specialty: 'Neurologist', experience: '12 years', patients: 198 },
    { id: 3, name: 'Dr. Amit Patel', specialty: 'Orthopedic', experience: '10 years', patients: 312 },
    { id: 4, name: 'Dr. Sneha Verma', specialty: 'Pediatrician', experience: '8 years', patients: 289 },
  ]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Doctors</h1>
            <p className="text-slate-600">Manage all doctors in the hospital</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 flex items-center gap-2 text-slate-700 font-medium shadow-sm">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg">
              <Plus className="w-5 h-5" />
              Add Doctor
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Total Doctors</p>
            <p className="text-2xl font-bold text-slate-800">{doctors.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Specialties</p>
            <p className="text-2xl font-bold text-emerald-600">15</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">On Duty</p>
            <p className="text-2xl font-bold text-teal-600">28</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Available</p>
            <p className="text-2xl font-bold text-cyan-600">12</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search doctors by name or specialty..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
          />
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white">
                <Stethoscope className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">{doctor.name}</h3>
                <p className="text-emerald-600 font-medium">{doctor.specialty}</p>
              </div>
            </div>
            <div className="space-y-2 text-slate-600">
              <p><span className="font-semibold">Experience:</span> {doctor.experience}</p>
              <p><span className="font-semibold">Patients:</span> {doctor.patients}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors font-medium">
                View Profile
              </button>
              <button className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium">
                Schedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}