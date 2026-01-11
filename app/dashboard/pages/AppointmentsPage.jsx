'use client';

import { useState } from 'react';
import { Calendar, Clock, Plus, Search, Filter } from 'lucide-react';

export default function AppointmentsPage() {
  const [appointments] = useState([
    { id: 1, patient: 'Rajesh Kumar', doctor: 'Dr. Priya Sharma', time: '10:00 AM', date: '2024-01-15', status: 'confirmed', type: 'Consultation' },
    { id: 2, patient: 'Sneha Verma', doctor: 'Dr. Amit Patel', time: '11:30 AM', date: '2024-01-15', status: 'pending', type: 'Follow-up' },
    { id: 3, patient: 'Vikram Singh', doctor: 'Dr. Rajesh Kumar', time: '02:00 PM', date: '2024-01-15', status: 'confirmed', type: 'Emergency' },
    { id: 4, patient: 'Anita Gupta', doctor: 'Dr. Sneha Verma', time: '03:30 PM', date: '2024-01-15', status: 'completed', type: 'Check-up' },
    { id: 5, patient: 'Rahul Mehta', doctor: 'Dr. Priya Sharma', time: '04:00 PM', date: '2024-01-15', status: 'cancelled', type: 'Consultation' },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Appointments</h1>
            <p className="text-slate-600">Manage patient appointments and schedules</p>
          </div>
          <button className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg">
            <Plus className="w-5 h-5" />
            New Appointment
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Today's Total</p>
            <p className="text-2xl font-bold text-slate-800">{appointments.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Confirmed</p>
            <p className="text-2xl font-bold text-green-600">
              {appointments.filter(a => a.status === 'confirmed').length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-amber-600">
              {appointments.filter(a => a.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Completed</p>
            <p className="text-2xl font-bold text-blue-600">
              {appointments.filter(a => a.status === 'completed').length}
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search appointments..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
            />
          </div>
          <button className="px-6 py-3 rounded-xl font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all duration-300 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Patient</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Doctor</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Date</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Time</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Type</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-center font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-emerald-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                        {appointment.patient.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-800">{appointment.patient}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{appointment.doctor}</td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {appointment.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {appointment.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                      {appointment.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium">
                        View
                      </button>
                      <button className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}