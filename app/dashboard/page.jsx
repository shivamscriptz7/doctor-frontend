// 


'use client';

import { Download, Plus } from 'lucide-react';

export default function DashboardPage() {
  const recentPatients = [
    { id: 1, name: 'Sarah Johnson', condition: 'Follow-up', time: '10:30 AM', status: 'waiting' },
    { id: 2, name: 'Michael Chen', condition: 'Emergency', time: '11:00 AM', status: 'inProgress' },
    { id: 3, name: 'Emily Rodriguez', condition: 'Check-up', time: '11:30 AM', status: 'completed' },
    { id: 4, name: 'David Kim', condition: 'Surgery Prep', time: '12:00 PM', status: 'waiting' },
  ];

  const upcomingAppointments = [
    { patient: 'James Wilson', doctor: 'Dr. Smith', time: '2:00 PM', type: 'Cardiology' },
    { patient: 'Lisa Anderson', doctor: 'Dr. Johnson', time: '2:30 PM', type: 'Neurology' },
    { patient: 'Robert Brown', doctor: 'Dr. Davis', time: '3:00 PM', type: 'Orthopedics' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Welcome back, Dr. Smith</h1>
          <p className="text-slate-600">Here's what's happening in your hospital today</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-slate-700 font-medium">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 font-medium shadow-lg">
            <Plus className="w-4 h-4" />
            Add New
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Patients', value: '1,248', change: '+12%', color: 'emerald' },
          { label: 'Appointments', value: '86', change: '+5%', color: 'blue' },
          { label: 'Available Beds', value: '42', change: '-8%', color: 'amber' },
          { label: 'Revenue', value: '$124K', change: '+18%', color: 'purple' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
            <p className="text-slate-600 text-sm font-medium mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
              <span className={`text-${stat.color}-600 text-sm font-semibold`}>{stat.change}</span>
            </div>
            <div className="mt-3 h-1 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full bg-${stat.color}-500 rounded-full`} style={{ width: '65%' }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Patients */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Recent Patients</h2>
            <button className="text-emerald-600 text-sm font-semibold hover:text-emerald-700">View All</button>
          </div>
          <div className="space-y-4">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                    {patient.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{patient.name}</p>
                    <p className="text-sm text-slate-500">{patient.condition}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-700">{patient.time}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                    patient.status === 'completed' ? 'bg-green-100 text-green-700' :
                    patient.status === 'inProgress' ? 'bg-blue-100 text-blue-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {patient.status === 'completed' ? 'Completed' :
                     patient.status === 'inProgress' ? 'In Progress' : 'Waiting'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Upcoming</h2>
            <button className="text-emerald-600 text-sm font-semibold hover:text-emerald-700">View Schedule</button>
          </div>
          <div className="space-y-4">
            {upcomingAppointments.map((apt, idx) => (
              <div key={idx} className="p-4 border-l-4 border-emerald-500 bg-emerald-50/50 rounded-r-xl">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-slate-800">{apt.patient}</p>
                  <span className="text-sm font-medium text-emerald-600">{apt.time}</span>
                </div>
                <p className="text-sm text-slate-600 mb-1">{apt.doctor}</p>
                <span className="inline-block px-2 py-1 bg-white text-xs text-slate-700 rounded-full">
                  {apt.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}