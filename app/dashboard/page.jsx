// 


// 'use client';

// import { Download, Plus } from 'lucide-react';

// export default function DashboardPage() {
//   const recentPatients = [
//     { id: 1, name: 'Sarah Johnson', condition: 'Follow-up', time: '10:30 AM', status: 'waiting' },
//     { id: 2, name: 'Michael Chen', condition: 'Emergency', time: '11:00 AM', status: 'inProgress' },
//     { id: 3, name: 'Emily Rodriguez', condition: 'Check-up', time: '11:30 AM', status: 'completed' },
//     { id: 4, name: 'David Kim', condition: 'Surgery Prep', time: '12:00 PM', status: 'waiting' },
//   ];

//   const upcomingAppointments = [
//     { patient: 'James Wilson', doctor: 'Dr. Smith', time: '2:00 PM', type: 'Cardiology' },
//     { patient: 'Lisa Anderson', doctor: 'Dr. Johnson', time: '2:30 PM', type: 'Neurology' },
//     { patient: 'Robert Brown', doctor: 'Dr. Davis', time: '3:00 PM', type: 'Orthopedics' },
//   ];

//   return (
//     <div className="p-8">
//       <div className="mb-8 flex items-center justify-between">
//         <div>
//           <h1 className="text-4xl font-bold text-slate-800 mb-2">Welcome back, Dr. Smith</h1>
//           <p className="text-slate-600">Here's what's happening in your hospital today</p>
//         </div>
//         <div className="flex gap-3">
//           <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-slate-700 font-medium">
//             <Download className="w-4 h-4" />
//             Export
//           </button>
//           <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 font-medium shadow-lg">
//             <Plus className="w-4 h-4" />
//             Add New
//           </button>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {[
//           { label: 'Total Patients', value: '1,248', change: '+12%', color: 'emerald' },
//           { label: 'Appointments', value: '86', change: '+5%', color: 'blue' },
//           { label: 'Available Beds', value: '42', change: '-8%', color: 'amber' },
//           { label: 'Revenue', value: '$124K', change: '+18%', color: 'purple' },
//         ].map((stat, idx) => (
//           <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
//             <p className="text-slate-600 text-sm font-medium mb-1">{stat.label}</p>
//             <div className="flex items-end justify-between">
//               <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
//               <span className={`text-${stat.color}-600 text-sm font-semibold`}>{stat.change}</span>
//             </div>
//             <div className="mt-3 h-1 bg-slate-100 rounded-full overflow-hidden">
//               <div className={`h-full bg-${stat.color}-500 rounded-full`} style={{ width: '65%' }}></div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Two Column Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Patients */}
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold text-slate-800">Recent Patients</h2>
//             <button className="text-emerald-600 text-sm font-semibold hover:text-emerald-700">View All</button>
//           </div>
//           <div className="space-y-4">
//             {recentPatients.map((patient) => (
//               <div key={patient.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
//                     {patient.name.charAt(0)}
//                   </div>
//                   <div>
//                     <p className="font-semibold text-slate-800">{patient.name}</p>
//                     <p className="text-sm text-slate-500">{patient.condition}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm font-medium text-slate-700">{patient.time}</p>
//                   <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
//                     patient.status === 'completed' ? 'bg-green-100 text-green-700' :
//                     patient.status === 'inProgress' ? 'bg-blue-100 text-blue-700' :
//                     'bg-amber-100 text-amber-700'
//                   }`}>
//                     {patient.status === 'completed' ? 'Completed' :
//                      patient.status === 'inProgress' ? 'In Progress' : 'Waiting'}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Upcoming Appointments */}
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold text-slate-800">Upcoming</h2>
//             <button className="text-emerald-600 text-sm font-semibold hover:text-emerald-700">View Schedule</button>
//           </div>
//           <div className="space-y-4">
//             {upcomingAppointments.map((apt, idx) => (
//               <div key={idx} className="p-4 border-l-4 border-emerald-500 bg-emerald-50/50 rounded-r-xl">
//                 <div className="flex justify-between items-start mb-2">
//                   <p className="font-semibold text-slate-800">{apt.patient}</p>
//                   <span className="text-sm font-medium text-emerald-600">{apt.time}</span>
//                 </div>
//                 <p className="text-sm text-slate-600 mb-1">{apt.doctor}</p>
//                 <span className="inline-block px-2 py-1 bg-white text-xs text-slate-700 rounded-full">
//                   {apt.type}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { Download, Plus, Users, Calendar, Bed, DollarSign, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { getCountApi, getRecentPatientApi, getRecentAppointmentApi } from '../lib/commonApis';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    availableBeds: 0,
    revenue: 0,
  });
  const [recentPatients, setRecentPatients] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Load all data in parallel
      const [countsRes, patientsRes, appointmentsRes] = await Promise.all([
        getCountApi(),
        getRecentPatientApi(),
        getRecentAppointmentApi(),
      ]);

      console.log('Dashboard API Responses:', { countsRes, patientsRes, appointmentsRes });

      // Set stats
      if (countsRes?.data) {
        setStats({
          totalPatients: countsRes.data.totalPatients || 0,
          todayAppointments: countsRes.data.todayAppointments || 0,
          availableBeds: countsRes.data.availableBeds || 0,
          revenue: 124000, // Static for now (calculate from invoices if available)
        });
      }

      // Set recent patients
      const patientsData = patientsRes?.data || [];
      setRecentPatients(Array.isArray(patientsData) ? patientsData.slice(0, 4) : []);

      // Set upcoming appointments
      const appointmentsData = appointmentsRes?.data || [];
      setUpcomingAppointments(Array.isArray(appointmentsData) ? appointmentsData.slice(0, 3) : []);

    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusLower = (status || '').toLowerCase();
    switch(statusLower) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'confirmed':
      case 'scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-amber-100 text-amber-700';
    }
  };

  const getStatusIcon = (status) => {
    const statusLower = (status || '').toLowerCase();
    switch(statusLower) {
      case 'completed':
        return <CheckCircle className="w-3 h-3" />;
      case 'cancelled':
        return <XCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-500 mx-auto mb-4" />
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Welcome back, Dr. Keshav</h1>
          <p className="text-slate-600">Here's what's happening in your hospital today</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={loadDashboardData}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-slate-700 font-medium"
          >
            <Download className="w-4 h-4" />
            Refresh
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
          { 
            label: 'Total Patients', 
            value: stats.totalPatients, 
            change: '+12%', 
            color: 'emerald',
            icon: Users,
            bgGradient: 'from-emerald-400 to-teal-500'
          },
          { 
            label: 'Today Appointments', 
            value: stats.todayAppointments, 
            change: '+5%', 
            color: 'blue',
            icon: Calendar,
            bgGradient: 'from-blue-400 to-cyan-500'
          },
          { 
            label: 'Available Beds', 
            value: stats.availableBeds, 
            change: '-8%', 
            color: 'amber',
            icon: Bed,
            bgGradient: 'from-amber-400 to-orange-500'
          },
          { 
            label: 'Revenue', 
            value: `₹${(stats.revenue / 1000).toFixed(0)}K`, 
            change: '+18%', 
            color: 'purple',
            icon: DollarSign,
            bgGradient: 'from-purple-400 to-pink-500'
          },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.bgGradient} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
                <span className={`text-${stat.color}-600 text-sm font-semibold`}>{stat.change}</span>
              </div>
              <div className="mt-3 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${stat.bgGradient} rounded-full`} style={{ width: '65%' }}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Patients */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Recent Patients</h2>
            <a href="/dashboard/patients" className="text-emerald-600 text-sm font-semibold hover:text-emerald-700">View All</a>
          </div>
          <div className="space-y-4">
            {recentPatients.length > 0 ? (
              recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-emerald-50/50 transition-colors border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      {patient.name?.charAt(0).toUpperCase() || 'P'}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{patient.name}</p>
                      <p className="text-sm text-slate-500">{patient.phone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">{formatDate(patient.createdAt)}</p>
                    <p className="text-sm font-medium text-slate-700 mt-1">{patient.address || '-'}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400">
                <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No recent patients</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Recent Appointments</h2>
            <a href="/dashboard/appointments" className="text-emerald-600 text-sm font-semibold hover:text-emerald-700">View Schedule</a>
          </div>
          <div className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((apt) => (
                <div key={apt.id} className="p-4 border-l-4 border-emerald-500 bg-emerald-50/50 rounded-r-xl hover:bg-emerald-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-slate-800">{apt.patient?.name || `Patient #${apt.patientId}`}</p>
                      <p className="text-sm text-slate-600">{apt.doctor?.name || `Doctor #${apt.doctorId}`}</p>
                    </div>
                    <span className="text-sm font-medium text-emerald-600">{formatDate(apt.appointmentDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-white text-xs text-slate-700 rounded-full border border-slate-200 capitalize">
                      {apt.type}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full capitalize ${getStatusBadge(apt.status)}`}>
                      {getStatusIcon(apt.status)}
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400">
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No upcoming appointments</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}