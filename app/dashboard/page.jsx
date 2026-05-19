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














// 'use client';

// import { useEffect, useState } from 'react';
// import { Download, Plus, Users, Calendar, Bed, DollarSign, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
// import { getCountApi, getRecentPatientApi, getRecentAppointmentApi } from '../lib/commonApis';

// export default function DashboardPage() {
//   const [stats, setStats] = useState({
//     totalPatients: 0,
//     todayAppointments: 0,
//     availableBeds: 0,
//     revenue: 0,
//   });
//   const [recentPatients, setRecentPatients] = useState([]);
//   const [upcomingAppointments, setUpcomingAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadDashboardData();
//   }, []);

//   const loadDashboardData = async () => {
//     setLoading(true);
//     try {
//       // Load all data in parallel
//       const [countsRes, patientsRes, appointmentsRes] = await Promise.all([
//         getCountApi(),
//         getRecentPatientApi(),
//         getRecentAppointmentApi(),
//       ]);

//       console.log('Dashboard API Responses:', { countsRes, patientsRes, appointmentsRes });

//       // Set stats
//       if (countsRes?.data) {
//         setStats({
//           totalPatients: countsRes.data.totalPatients || 0,
//           todayAppointments: countsRes.data.todayAppointments || 0,
//           availableBeds: countsRes.data.availableBeds || 0,
//           revenue: 124000, // Static for now (calculate from invoices if available)
//         });
//       }

//       // Set recent patients
//       const patientsData = patientsRes?.data || [];
//       setRecentPatients(Array.isArray(patientsData) ? patientsData.slice(0, 4) : []);

//       // Set upcoming appointments
//       const appointmentsData = appointmentsRes?.data || [];
//       setUpcomingAppointments(Array.isArray(appointmentsData) ? appointmentsData.slice(0, 3) : []);

//     } catch (err) {
//       console.error('Failed to load dashboard data:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusBadge = (status) => {
//     const statusLower = (status || '').toLowerCase();
//     switch(statusLower) {
//       case 'completed':
//         return 'bg-green-100 text-green-700';
//       case 'confirmed':
//       case 'scheduled':
//         return 'bg-blue-100 text-blue-700';
//       case 'cancelled':
//         return 'bg-red-100 text-red-700';
//       default:
//         return 'bg-amber-100 text-amber-700';
//     }
//   };

//   const getStatusIcon = (status) => {
//     const statusLower = (status || '').toLowerCase();
//     switch(statusLower) {
//       case 'completed':
//         return <CheckCircle className="w-3 h-3" />;
//       case 'cancelled':
//         return <XCircle className="w-3 h-3" />;
//       default:
//         return <Clock className="w-3 h-3" />;
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return '-';
//     const date = new Date(dateString);
//     return date.toLocaleString('en-US', { 
//       month: 'short', 
//       day: 'numeric',
//       hour: '2-digit', 
//       minute: '2-digit' 
//     });
//   };

//   if (loading) {
//     return (
//       <div className="p-8 flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-emerald-500 mx-auto mb-4" />
//           <p className="text-slate-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8">
//       <div className="mb-8 flex items-center justify-between">
//         <div>
//           <h1 className="text-4xl font-bold text-slate-800 mb-2">Welcome back, Dr. Keshav</h1>
//           <p className="text-slate-600">Here's what's happening in your hospital today</p>
//         </div>
//         <div className="flex gap-3">
//           <button 
//             onClick={loadDashboardData}
//             className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-slate-700 font-medium"
//           >
//             <Download className="w-4 h-4" />
//             Refresh
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
//           { 
//             label: 'Total Patients', 
//             value: stats.totalPatients, 
//             change: '+12%', 
//             color: 'emerald',
//             icon: Users,
//             bgGradient: 'from-emerald-400 to-teal-500'
//           },
//           { 
//             label: 'Today Appointments', 
//             value: stats.todayAppointments, 
//             change: '+5%', 
//             color: 'blue',
//             icon: Calendar,
//             bgGradient: 'from-blue-400 to-cyan-500'
//           },
//           { 
//             label: 'Available Beds', 
//             value: stats.availableBeds, 
//             change: '-8%', 
//             color: 'amber',
//             icon: Bed,
//             bgGradient: 'from-amber-400 to-orange-500'
//           },
//           { 
//             label: 'Revenue', 
//             value: `₹${(stats.revenue / 1000).toFixed(0)}K`, 
//             change: '+18%', 
//             color: 'purple',
//             icon: DollarSign,
//             bgGradient: 'from-purple-400 to-pink-500'
//           },
//         ].map((stat, idx) => {
//           const Icon = stat.icon;
//           return (
//             <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
//               <div className="flex items-center justify-between mb-4">
//                 <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
//                 <div className={`w-12 h-12 bg-gradient-to-br ${stat.bgGradient} rounded-xl flex items-center justify-center shadow-lg`}>
//                   <Icon className="w-6 h-6 text-white" />
//                 </div>
//               </div>
//               <div className="flex items-end justify-between">
//                 <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
//                 <span className={`text-${stat.color}-600 text-sm font-semibold`}>{stat.change}</span>
//               </div>
//               <div className="mt-3 h-1 bg-slate-100 rounded-full overflow-hidden">
//                 <div className={`h-full bg-gradient-to-r ${stat.bgGradient} rounded-full`} style={{ width: '65%' }}></div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Two Column Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Patients */}
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold text-slate-800">Recent Patients</h2>
//             <a href="/dashboard/patients" className="text-emerald-600 text-sm font-semibold hover:text-emerald-700">View All</a>
//           </div>
//           <div className="space-y-4">
//             {recentPatients.length > 0 ? (
//               recentPatients.map((patient) => (
//                 <div key={patient.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-emerald-50/50 transition-colors border border-slate-100">
//                   <div className="flex items-center gap-4">
//                     <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
//                       {patient.name?.charAt(0).toUpperCase() || 'P'}
//                     </div>
//                     <div>
//                       <p className="font-semibold text-slate-800">{patient.name}</p>
//                       <p className="text-sm text-slate-500">{patient.phone}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-slate-500">{formatDate(patient.createdAt)}</p>
//                     <p className="text-sm font-medium text-slate-700 mt-1">{patient.address || '-'}</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-8 text-slate-400">
//                 <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
//                 <p>No recent patients</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Upcoming Appointments */}
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold text-slate-800">Recent Appointments</h2>
//             <a href="/dashboard/appointments" className="text-emerald-600 text-sm font-semibold hover:text-emerald-700">View Schedule</a>
//           </div>
//           <div className="space-y-4">
//             {upcomingAppointments.length > 0 ? (
//               upcomingAppointments.map((apt) => (
//                 <div key={apt.id} className="p-4 border-l-4 border-emerald-500 bg-emerald-50/50 rounded-r-xl hover:bg-emerald-50 transition-colors">
//                   <div className="flex justify-between items-start mb-2">
//                     <div>
//                       <p className="font-semibold text-slate-800">{apt.patient?.name || `Patient #${apt.patientId}`}</p>
//                       <p className="text-sm text-slate-600">{apt.doctor?.name || `Doctor #${apt.doctorId}`}</p>
//                     </div>
//                     <span className="text-sm font-medium text-emerald-600">{formatDate(apt.appointmentDate)}</span>
//                   </div>
//                   <div className="flex items-center gap-2 mt-3">
//                     <span className="inline-flex items-center gap-1 px-2 py-1 bg-white text-xs text-slate-700 rounded-full border border-slate-200 capitalize">
//                       {apt.type}
//                     </span>
//                     <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full capitalize ${getStatusBadge(apt.status)}`}>
//                       {getStatusIcon(apt.status)}
//                       {apt.status}
//                     </span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-8 text-slate-400">
//                 <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
//                 <p>No upcoming appointments</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





























// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   Download, Plus, Users, Calendar, Bed, DollarSign,
//   Clock, CheckCircle, XCircle, Loader2,
// } from 'lucide-react';
// import { getCountApi, getRecentPatientApi, getRecentAppointmentApi } from '../lib/commonApis';
// import AddPatientModal from '../modal/Addpatientmodal'; // ← import karein apne path ke hisaab se

// export default function DashboardPage() {
//   const [stats, setStats] = useState({
//     totalPatients: 0,
//     todayAppointments: 0,
//     availableBeds: 0,
//     revenue: 0,
//   });
//   const [recentPatients, setRecentPatients]         = useState([]);
//   const [upcomingAppointments, setUpcomingAppointments] = useState([]);
//   const [loading, setLoading]                       = useState(true);
//   const [showAddPatient, setShowAddPatient]          = useState(false); // ← new state
//   const [localStorageData, setLocalStorageData]          = useState(null);

//   useEffect(() => { loadDashboardData();
// const localStorageData = JSON.parse(localStorage.getItem('user'));
// console.log(localStorageData.name);
// setLocalStorageData(localStorageData);


//    }, []);

//   const loadDashboardData = async () => {
//     setLoading(true);
//     try {
//       const [countsRes, patientsRes, appointmentsRes] = await Promise.all([
//         getCountApi(),
//         getRecentPatientApi(),
//         getRecentAppointmentApi(),
//       ]);

//       if (countsRes?.data) {
//         setStats({
//           totalPatients:     countsRes.data.totalPatients     || 0,
//           todayAppointments: countsRes.data.todayAppointments || 0,
//           availableBeds:     countsRes.data.availableBeds     || 0,
//           revenue:           124000,
//         });
//       }

//       const patientsData     = patientsRes?.data     || [];
//       const appointmentsData = appointmentsRes?.data || [];
//       setRecentPatients(Array.isArray(patientsData)     ? patientsData.slice(0, 4)     : []);
//       setUpcomingAppointments(Array.isArray(appointmentsData) ? appointmentsData.slice(0, 3) : []);
//     } catch (err) {
//       console.error('Failed to load dashboard data:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Patient successfully added → stats refresh karo
//   const handlePatientAdded = () => {
//     loadDashboardData();
//   };

//   const getStatusBadge = (status) => {
//     switch ((status || '').toLowerCase()) {
//       case 'completed':  return 'bg-green-100 text-green-700';
//       case 'confirmed':
//       case 'scheduled':  return 'bg-blue-100 text-blue-700';
//       case 'cancelled':  return 'bg-red-100 text-red-700';
//       default:           return 'bg-amber-100 text-amber-700';
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch ((status || '').toLowerCase()) {
//       case 'completed': return <CheckCircle className="w-3 h-3" />;
//       case 'cancelled': return <XCircle className="w-3 h-3" />;
//       default:          return <Clock className="w-3 h-3" />;
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return '-';
//     return new Date(dateString).toLocaleString('en-US', {
//       month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
//     });
//   };

//   if (loading) {
//     return (
//       <div className="p-8 flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-emerald-500 mx-auto mb-4" />
//           <p className="text-slate-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8">
//       {/* Header */}
//       <div className="mb-8 flex items-center justify-between">
//         <div>
//           <h1 className="text-4xl font-bold text-slate-800 mb-2">Welcome back, Dr.{localStorageData.name}</h1>
//           <p className="text-slate-600">Here's what's happening in your hospital today</p>
//         </div>
//         <div className="flex gap-3">
//           <button
//             onClick={loadDashboardData}
//             className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-slate-700 font-medium"
//           >
//             <Download className="w-4 h-4" />
//             Refresh
//           </button>
//           {/* ── "Add New" → opens AddPatientModal ── */}
//           <button
//             onClick={() => setShowAddPatient(true)}
//             className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 font-medium shadow-lg"
//           >
//             <Plus className="w-4 h-4" />
//             Add New
//           </button>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {[
//           { label: 'Total Patients',      value: stats.totalPatients,                          change: '+12%', icon: Users,       bgGradient: 'from-emerald-400 to-teal-500',  color: 'emerald' },
//           { label: 'Today Appointments',  value: stats.todayAppointments,                      change: '+5%',  icon: Calendar,    bgGradient: 'from-blue-400 to-cyan-500',     color: 'blue'    },
//           { label: 'Available Beds',      value: stats.availableBeds,                          change: '-8%',  icon: Bed,         bgGradient: 'from-amber-400 to-orange-500',  color: 'amber'   },
//           { label: 'Revenue',             value: `₹${(stats.revenue / 1000).toFixed(0)}K`,    change: '+18%', icon: DollarSign,  bgGradient: 'from-purple-400 to-pink-500',   color: 'purple'  },
//         ].map((stat, idx) => {
//           const Icon = stat.icon;
//           return (
//             <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
//               <div className="flex items-center justify-between mb-4">
//                 <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
//                 <div className={`w-12 h-12 bg-gradient-to-br ${stat.bgGradient} rounded-xl flex items-center justify-center shadow-lg`}>
//                   <Icon className="w-6 h-6 text-white" />
//                 </div>
//               </div>
//               <div className="flex items-end justify-between">
//                 <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
//                 <span className={`text-${stat.color}-600 text-sm font-semibold`}>{stat.change}</span>
//               </div>
//               <div className="mt-3 h-1 bg-slate-100 rounded-full overflow-hidden">
//                 <div className={`h-full bg-gradient-to-r ${stat.bgGradient} rounded-full`} style={{ width: '65%' }} />
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Two columns */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Patients */}
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold text-slate-800">Recent Patients</h2>
//             <a href="/dashboard/patients" className="text-emerald-600 text-sm font-semibold hover:text-emerald-700">View All</a>
//           </div>
//           <div className="space-y-4">
//             {recentPatients.length > 0 ? recentPatients.map((patient) => (
//               <div key={patient.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-emerald-50/50 transition-colors border border-slate-100">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
//                     {patient.name?.charAt(0).toUpperCase() || 'P'}
//                   </div>
//                   <div>
//                     <p className="font-semibold text-slate-800">{patient.name}</p>
//                     <p className="text-sm text-slate-500">{patient.phone}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-xs text-slate-500">{formatDate(patient.createdAt)}</p>
//                   <p className="text-sm font-medium text-slate-700 mt-1">{patient.address || '-'}</p>
//                 </div>
//               </div>
//             )) : (
//               <div className="text-center py-8 text-slate-400">
//                 <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
//                 <p>No recent patients</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Upcoming Appointments */}
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold text-slate-800">Recent Appointments</h2>
//             <a href="/dashboard/appointments" className="text-emerald-600 text-sm font-semibold hover:text-emerald-700">View Schedule</a>
//           </div>
//           <div className="space-y-4">
//             {upcomingAppointments.length > 0 ? upcomingAppointments.map((apt) => (
//               <div key={apt.id} className="p-4 border-l-4 border-emerald-500 bg-emerald-50/50 rounded-r-xl hover:bg-emerald-50 transition-colors">
//                 <div className="flex justify-between items-start mb-2">
//                   <div>
//                     <p className="font-semibold text-slate-800">{apt.patient?.name || `Patient #${apt.patientId}`}</p>
//                     <p className="text-sm text-slate-600">{apt.doctor?.name || `Doctor #${apt.doctorId}`}</p>
//                   </div>
//                   <span className="text-sm font-medium text-emerald-600">{formatDate(apt.appointmentDate)}</span>
//                 </div>
//                 <div className="flex items-center gap-2 mt-3">
//                   <span className="inline-flex items-center gap-1 px-2 py-1 bg-white text-xs text-slate-700 rounded-full border border-slate-200 capitalize">{apt.type}</span>
//                   <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full capitalize ${getStatusBadge(apt.status)}`}>
//                     {getStatusIcon(apt.status)} {apt.status}
//                   </span>
//                 </div>
//               </div>
//             )) : (
//               <div className="text-center py-8 text-slate-400">
//                 <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
//                 <p>No upcoming appointments</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ── Add Patient Modal ── */}
//       <AddPatientModal
//         isOpen={showAddPatient}
//         onClose={() => setShowAddPatient(false)}
//         onSuccess={handlePatientAdded} // stats refresh hoga add ke baad
//       />
//     </div>
//   );
// }



























// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   Download, Plus, Users, Calendar, Bed, DollarSign,
//   Clock, CheckCircle, XCircle, Loader2, Building2, Sparkles,Shield ,Stethoscope
// } from 'lucide-react';
// import { getCountApi, getRecentPatientApi, getRecentAppointmentApi } from '../lib/commonApis';
// import AddPatientModal from '../modal/Addpatientmodal';

// // ─── Hospital name mapping (hospitalId → name) ───────────────────────────────
// // Agar aapke paas API ho hospital fetch karne ki, use kar sakte hain.
// // Abhi ke liye hospitalId se map kar rahe hain.
// const HOSPITAL_MAP = {
//   1: 'City Care Hospital',
//   2: 'MediCare Super Speciality Hospital',
//   3: 'Apollo Wellness Center',
// };

// const ROLE_LABEL = {
//   doctor:  'Dr.',
//   admin:   'Admin',
//   nurse:   'Nurse',
//   patient: '',
// };

// export default function DashboardPage() {
//   const [stats, setStats] = useState({
//     totalPatients: 0,
//     todayAppointments: 0,
//     availableBeds: 0,
//     revenue: 0,
//   });
//   const [recentPatients, setRecentPatients]             = useState([]);
//   const [upcomingAppointments, setUpcomingAppointments] = useState([]);
//   const [loading, setLoading]                           = useState(true);
//   const [showAddPatient, setShowAddPatient]              = useState(false);
//   const [user, setUser]                                  = useState(null);

//   useEffect(() => {
//     try {
//       const stored = JSON.parse(localStorage.getItem('user'));
//       if (stored) setUser(stored);
//     } catch (e) {
//       console.error('LocalStorage parse error:', e);
//     }
//     loadDashboardData();
//   }, []);

//   const loadDashboardData = async () => {
//     setLoading(true);
//     try {
//       const [countsRes, patientsRes, appointmentsRes] = await Promise.all([
//         getCountApi(),
//         getRecentPatientApi(),
//         getRecentAppointmentApi(),
//       ]);

//       if (countsRes?.data) {
//         setStats({
//           totalPatients:     countsRes.data.totalPatients     || 0,
//           todayAppointments: countsRes.data.todayAppointments || 0,
//           availableBeds:     countsRes.data.availableBeds     || 0,
//           revenue:           124000,
//         });
//       }

//       const patientsData     = patientsRes?.data     || [];
//       const appointmentsData = appointmentsRes?.data || [];
//       setRecentPatients(Array.isArray(patientsData)         ? patientsData.slice(0, 4)     : []);
//       setUpcomingAppointments(Array.isArray(appointmentsData) ? appointmentsData.slice(0, 3) : []);
//     } catch (err) {
//       console.error('Failed to load dashboard data:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePatientAdded = () => loadDashboardData();

//   // ── Derived from localStorage ────────────────────────────────────────────
//   const userName     = user?.name     || 'User';
//   const userRole     = user?.role     || 'doctor';
//   const hospitalId   = user?.hospitalId;
//   const hospitalName = HOSPITAL_MAP[hospitalId] || `Hospital #${hospitalId || '—'}`;
//   const rolePrefix   = ROLE_LABEL[userRole] ?? '';

//   // ── Greeting based on time ───────────────────────────────────────────────
//   const getGreeting = () => {
//     const h = new Date().getHours();
//     if (h < 12) return 'Shubh Prabhat 🌅';   // Good Morning
//     if (h < 17) return 'Namaskar 🙏';          // Good Afternoon
//     return 'Shubh Sandhya 🌙';                 // Good Evening
//   };

//   // ── Status helpers ───────────────────────────────────────────────────────
//   const getStatusBadge = (status) => {
//     switch ((status || '').toLowerCase()) {
//       case 'completed':  return 'bg-green-100 text-green-700';
//       case 'confirmed':
//       case 'scheduled':  return 'bg-blue-100 text-blue-700';
//       case 'cancelled':  return 'bg-red-100 text-red-700';
//       default:           return 'bg-amber-100 text-amber-700';
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch ((status || '').toLowerCase()) {
//       case 'completed': return <CheckCircle className="w-3 h-3" />;
//       case 'cancelled': return <XCircle className="w-3 h-3" />;
//       default:          return <Clock className="w-3 h-3" />;
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return '-';
//     return new Date(dateString).toLocaleString('en-US', {
//       month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
//     });
//   };

//   if (loading) {
//     return (
//       <div className="p-8 flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-emerald-500 mx-auto mb-4" />
//           <p className="text-slate-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8">

//       {/* ── Header ─────────────────────────────────────────────────────────── */}
//       <div className="mb-8">

//         {/* Hospital name chip */}
//         <div className="flex items-center gap-2 mb-3">
//           <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full w-fit">
//             <Building2 className="w-4 h-4 text-emerald-600" />
//             <span className="text-sm font-semibold text-emerald-700">{hospitalName}</span>
//           </div>
//           <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-full w-fit">
//             <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
//             <span className="text-xs font-medium text-slate-600 capitalize">{userRole}</span>
//           </div>
//         </div>

//         <div className="flex items-start justify-between">
//           <div>
//             {/* Greeting */}
//             <p className="text-sm font-medium text-slate-500 mb-1">{getGreeting()}</p>

//             {/* Main welcome heading */}
//             <h1 className="text-4xl font-bold text-slate-800 mb-1">
//               Welcome back,{' '}
//               <span className="text-emerald-600">{rolePrefix} {userName}</span>
//             </h1>

//             {/* Sub line */}
//             <p className="text-slate-500 text-base">
//               Here's what's happening at{' '}
//               <span className="font-semibold text-slate-700">{hospitalName}</span> today
//             </p>
//           </div>

//           {/* Action buttons */}
//           <div className="flex gap-3 mt-1">
//             <button
//               onClick={loadDashboardData}
//               className="px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2 text-slate-700 font-medium shadow-sm"
//             >
//               <Download className="w-4 h-4" />
//               Refresh
//             </button>
//             <button
//               onClick={() => setShowAddPatient(true)}
//               className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 font-semibold shadow-lg"
//             >
//               <Plus className="w-4 h-4" />
//               Add New Patient
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ── Hindi Slogan Banner ─────────────────────────────────────────────── */}
//       <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-[1.5px] shadow-xl">
//         <div className="relative rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 px-8 py-5 flex items-center justify-between overflow-hidden">

//           {/* Background decoration circles */}
//           <div className="absolute -top-6 -left-6 w-28 h-28 bg-white/10 rounded-full" />
//           <div className="absolute -bottom-8 left-32 w-36 h-36 bg-white/5 rounded-full" />
//           <div className="absolute -top-4 right-40 w-20 h-20 bg-white/10 rounded-full" />
//           <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />

//           {/* Left — Slogan */}
//           <div className="relative z-10">
//             <div className="flex items-center gap-2 mb-2">
//               <Sparkles className="w-4 h-4 text-yellow-300" />
//               <span className="text-xs font-bold text-emerald-100 uppercase tracking-widest">
//                 Government of India Initiative
//               </span>
//             </div>
//             <h2 className="text-2xl font-extrabold text-white mb-1 tracking-tight">
//               बेटी बचाओ, बेटी पढ़ाओ
//             </h2>
//             <p className="text-sm text-emerald-100 font-medium">
//               Save the Daughter, Educate the Daughter
//             </p>
//             <p className="text-xs text-emerald-200 mt-1.5 max-w-md leading-relaxed">
//               हर बेटी का स्वास्थ्य हमारी जिम्मेदारी — स्वस्थ बेटी, समृद्ध भारत 🇮🇳
//             </p>
//           </div>

//           {/* ── Slogan Banner ── */}


//           {/* Right — decorative icon group */}
//         <div className="relative z-10 flex flex-col items-center gap-1 text-white/80">
// <div className="text-5xl leading-none select-none">🏥</div>
//   <div className="flex gap-3 mt-2">
//     <div className="text-center">
//       <div className="text-lg font-bold text-white">विशेषज्ञ</div>
//       <div className="text-xs text-emerald-200">Expert Maternal Care</div>
//     </div>
//     <div className="w-px bg-white/30 self-stretch" />
//     <div className="text-center">
//       <div className="text-lg font-bold text-white">24/7</div>
//       <div className="text-xs text-emerald-200">Round the Clock</div>
//     </div>
//     <div className="w-px bg-white/30 self-stretch" />
//     <div className="text-center">
//       <div className="text-lg font-bold text-white">सुरक्षित</div>
//       <div className="text-xs text-emerald-200">Safe & Assured Delivery</div>
//     </div>
//   </div>
// </div>
//         </div>
//       </div>

//       {/* ── Stats ──────────────────────────────────────────────────────────── */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {[
//           { label: 'Total Patients',     value: stats.totalPatients,                       change: '+12%', icon: Users,      bgGradient: 'from-emerald-400 to-teal-500',  color: 'emerald' },
//           { label: 'Today Appointments', value: stats.todayAppointments,                   change: '+5%',  icon: Calendar,   bgGradient: 'from-blue-400 to-cyan-500',     color: 'blue'    },
//           { label: 'Available Beds',     value: stats.availableBeds,                       change: '-8%',  icon: Bed,        bgGradient: 'from-amber-400 to-orange-500',  color: 'amber'   },
//           { label: 'Revenue',            value: `₹${(stats.revenue / 1000).toFixed(0)}K`, change: '+18%', icon: DollarSign, bgGradient: 'from-purple-400 to-pink-500',   color: 'purple'  },
//         ].map((stat, idx) => {
//           const Icon = stat.icon;
//           return (
//             <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
//               <div className="flex items-center justify-between mb-4">
//                 <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
//                 <div className={`w-12 h-12 bg-gradient-to-br ${stat.bgGradient} rounded-xl flex items-center justify-center shadow-lg`}>
//                   <Icon className="w-6 h-6 text-white" />
//                 </div>
//               </div>
//               <div className="flex items-end justify-between">
//                 <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
//                 <span className={`text-${stat.color}-600 text-sm font-semibold`}>{stat.change}</span>
//               </div>
//               <div className="mt-3 h-1 bg-slate-100 rounded-full overflow-hidden">
//                 <div className={`h-full bg-gradient-to-r ${stat.bgGradient} rounded-full`} style={{ width: '65%' }} />
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* ── Two columns ────────────────────────────────────────────────────── */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* Recent Patients */}
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold text-slate-800">Recent Patients</h2>
//             <a href="/dashboard/patients" className="text-emerald-600 text-sm font-semibold hover:text-emerald-700">View All</a>
//           </div>
//           <div className="space-y-4">
//             {recentPatients.length > 0 ? recentPatients.map((patient) => (
//               <div key={patient.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-emerald-50/50 transition-colors border border-slate-100">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
//                     {patient.name?.charAt(0).toUpperCase() || 'P'}
//                   </div>
//                   <div>
//                     <p className="font-semibold text-slate-800">{patient.name}</p>
//                     <p className="text-sm text-slate-500">{patient.phone}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-xs text-slate-500">{formatDate(patient.createdAt)}</p>
//                   <p className="text-sm font-medium text-slate-700 mt-1">{patient.address || '-'}</p>
//                 </div>
//               </div>
//             )) : (
//               <div className="text-center py-8 text-slate-400">
//                 <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
//                 <p>No recent patients</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Upcoming Appointments */}
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold text-slate-800">Recent Appointments</h2>
//             <a href="/dashboard/appointments" className="text-emerald-600 text-sm font-semibold hover:text-emerald-700">View Schedule</a>
//           </div>
//           <div className="space-y-4">
//             {upcomingAppointments.length > 0 ? upcomingAppointments.map((apt) => (
//               <div key={apt.id} className="p-4 border-l-4 border-emerald-500 bg-emerald-50/50 rounded-r-xl hover:bg-emerald-50 transition-colors">
//                 <div className="flex justify-between items-start mb-2">
//                   <div>
//                     <p className="font-semibold text-slate-800">{apt.patient?.name || `Patient #${apt.patientId}`}</p>
//                     <p className="text-sm text-slate-600">{apt.doctor?.name || `Doctor #${apt.doctorId}`}</p>
//                   </div>
//                   <span className="text-sm font-medium text-emerald-600">{formatDate(apt.appointmentDate)}</span>
//                 </div>
//                 <div className="flex items-center gap-2 mt-3">
//                   <span className="inline-flex items-center gap-1 px-2 py-1 bg-white text-xs text-slate-700 rounded-full border border-slate-200 capitalize">{apt.type}</span>
//                   <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full capitalize ${getStatusBadge(apt.status)}`}>
//                     {getStatusIcon(apt.status)} {apt.status}
//                   </span>
//                 </div>
//               </div>
//             )) : (
//               <div className="text-center py-8 text-slate-400">
//                 <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
//                 <p>No upcoming appointments</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ── Add Patient Modal ── */}
//       <AddPatientModal
//         isOpen={showAddPatient}
//         onClose={() => setShowAddPatient(false)}
//         onSuccess={handlePatientAdded}
//       />
//     </div>
//   );
// }





























'use client';

import { useEffect, useState } from 'react';
import {
  Download, Plus, Users, Calendar, Bed, DollarSign,
  Clock, CheckCircle, XCircle, Loader2, Building2,
  Shield, Stethoscope,Sparkles
} from 'lucide-react';
import { getCountApi, getRecentPatientApi, getRecentAppointmentApi } from '../lib/commonApis';
import AddPatientModal from '../modal/Addpatientmodal';

const ROLE_LABEL = {
  doctor:  'Dr.',
  admin:   'Admin',
  nurse:   'Nurse',
  patient: '',
};

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    availableBeds: 0,
    revenue: 0,
  });
  const [recentPatients, setRecentPatients]             = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading]                           = useState(true);
  const [showAddPatient, setShowAddPatient]              = useState(false);
  const [user, setUser]                                  = useState(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('user'));
      if (stored) setUser(stored);
    } catch (e) {
      console.error('LocalStorage parse error:', e);
    }
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [countsRes, patientsRes, appointmentsRes] = await Promise.all([
        getCountApi(),
        getRecentPatientApi(),
        getRecentAppointmentApi(),
      ]);
      if (countsRes?.data) {
        setStats({
          totalPatients:     countsRes.data.totalPatients     || 0,
          todayAppointments: countsRes.data.todayAppointments || 0,
          availableBeds:     countsRes.data.availableBeds     || 0,
          revenue:           124000,
        });
      }
      const patientsData     = patientsRes?.data     || [];
      const appointmentsData = appointmentsRes?.data || [];
      setRecentPatients(Array.isArray(patientsData)         ? patientsData.slice(0, 4)     : []);
      setUpcomingAppointments(Array.isArray(appointmentsData) ? appointmentsData.slice(0, 3) : []);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePatientAdded = () => loadDashboardData();

  // ── Derived from localStorage ─────────────────────────────────────────────
  const userName     = user?.name           || 'User';
  const userRole     = user?.role           || 'doctor';
  const rolePrefix   = ROLE_LABEL[userRole] ?? '';
  // hospital.name direct from nested object — fallback chain
  const hospitalName = user?.hospital?.name || (user?.hospitalId ? `Hospital #${user.hospitalId}` : 'Hospital');

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Shubh Prabhat 🌅';
    if (h < 17) return 'Namaskar 🙏';
    return 'Shubh Sandhya 🌙';
  };

  const getStatusBadge = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'completed':  return 'bg-green-100 text-green-700';
      case 'confirmed':
      case 'scheduled':  return 'bg-blue-100 text-blue-700';
      case 'cancelled':  return 'bg-red-100 text-red-700';
      default:           return 'bg-amber-100 text-amber-700';
    }
  };

  const getStatusIcon = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'completed': return <CheckCircle className="w-3 h-3" />;
      case 'cancelled': return <XCircle className="w-3 h-3" />;
      default:          return <Clock className="w-3 h-3" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-500 mx-auto mb-4" />
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {/* ── Header ── */}
      <div className="mb-6 sm:mb-8">

        {/* Hospital chip + role badge */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
            <Building2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-emerald-700 truncate max-w-[180px] sm:max-w-none">
              {hospitalName}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-full">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse flex-shrink-0" />
            <span className="text-xs font-medium text-slate-600 capitalize">{userRole}</span>
          </div>
        </div>

        {/* Welcome row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-500 mb-1">{getGreeting()}</p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-1 leading-tight">
              Welcome back,{' '}
              <span className="text-emerald-600">{rolePrefix} {userName}</span>
            </h1>
            <p className="text-slate-500 text-sm sm:text-base">
              Here's what's happening at{' '}
              <span className="font-semibold text-slate-700">{hospitalName}</span> today
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={loadDashboardData}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-slate-700 font-medium shadow-sm text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => setShowAddPatient(true)}
              className="flex-1 sm:flex-none px-3 sm:px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Patient</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Slogan Banner ── */}
      <div
        className="relative mb-6 sm:mb-8 overflow-hidden rounded-2xl shadow-xl"
        style={{ background: 'linear-gradient(135deg, #085041 0%, #0F6E56 50%, #085041 100%)' }}
      >
        {/* BG decoration circles */}
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.04)' }} />
        <div className="absolute -bottom-12 left-1/3 w-52 h-52 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.03)' }} />
        <div className="absolute -top-5 right-1/4 w-24 h-24 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.04)' }} />

        <div className="relative z-10 px-5 sm:px-8 lg:px-10 py-6 sm:py-8">

          {/* Tricolor strip */}
          {/* <div className="flex mb-4 sm:mb-5 rounded overflow-hidden w-fit">
            <div className="w-8 sm:w-9 h-1.5" style={{ background: '#FF9933' }} />
            <div className="w-8 sm:w-9 h-1.5" style={{ background: '#ffffff' }} />
            <div className="w-8 sm:w-9 h-1.5" style={{ background: '#138808' }} />
          </div> */}

          {/* Content: stacks on mobile, row on md+ */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 sm:gap-6">

            {/* Left — slogan */}
            {/* <div className="flex-1 min-w-0">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 border"
                style={{ background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.2)' }}
              >
                <span className="text-xs" style={{ color: '#9FE1CB', letterSpacing: '0.07em' }}>
                  Government of India Initiative
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white leading-snug mb-1">
                सुरक्षित माँ, स्वस्थ शिशु
              </h2>
              <div className="flex items-center gap-2 my-1.5">
                <div className="h-px w-6 sm:w-8 rounded" style={{ background: 'rgba(255,255,255,0.3)' }} />
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>—</span>
                <div className="h-px w-6 sm:w-8 rounded" style={{ background: 'rgba(255,255,255,0.3)' }} />
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white leading-snug">
                सुरक्षित कल का भारत 🇮🇳
              </h2>
              <p className="text-xs sm:text-sm mt-2 sm:mt-3" style={{ color: '#9FE1CB', lineHeight: '1.7' }}>
                खुशहाल परिवार से बनता है समृद्ध भारत
              </p>
            </div> */}

            <div className="relative z-10">
  <div className="flex items-center gap-2 mb-2">
    <Sparkles className="w-4 h-4 text-yellow-300" />
    <span className="text-xs font-bold text-emerald-100 uppercase tracking-widest">
      Government of India Initiative
    </span>
  </div>
  <h2 className="text-2xl font-extrabold text-white mb-1 tracking-tight">
    सुरक्षित माँ, स्वस्थ शिशु — सुरक्षित कल का भारत 🇮🇳
  </h2>
  <p className="text-sm text-emerald-100 font-medium">
    Safe Mother, Healthy Child — Secure Future of India
  </p>
  <p className="text-xs text-emerald-200 mt-1.5 max-w-md leading-relaxed">
    खुशहाल परिवार से बनता है समृद्ध भारत 🌸
  </p>
</div>

            {/* Vertical divider — md+ only */}
            <div
              className="hidden md:block flex-shrink-0 w-px h-24"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            />

            {/* Right — 3 stats */}
            <div className="flex flex-row md:flex-col gap-3 sm:gap-4 flex-shrink-0 flex-wrap">
              {[
                { icon: <Stethoscope className="w-4 h-4 text-emerald-300" />, value: 'विशेषज्ञ देखभाल', label: 'Expert Maternal Care'     },
                { icon: <Clock       className="w-4 h-4 text-emerald-300" />, value: '24/7',             label: 'Round the Clock Support' },
                { icon: <Shield      className="w-4 h-4 text-emerald-300" />, value: 'सुरक्षित प्रसव',  label: 'Safe & Assured Delivery' },
              ].map(s => (
                <div key={s.value} className="flex items-center gap-2 sm:gap-3">
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.1)' }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-medium text-white leading-none">{s.value}</div>
                    <div className="text-xs mt-0.5 hidden sm:block" style={{ color: '#9FE1CB' }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        {[
          { label: 'Total Patients',     value: stats.totalPatients,                       change: '+12%', icon: Users,      bgGradient: 'from-emerald-400 to-teal-500',  color: 'emerald' },
          { label: 'Today Appointments', value: stats.todayAppointments,                   change: '+5%',  icon: Calendar,   bgGradient: 'from-blue-400 to-cyan-500',     color: 'blue'    },
          { label: 'Available Beds',     value: stats.availableBeds,                       change: '-8%',  icon: Bed,        bgGradient: 'from-amber-400 to-orange-500',  color: 'amber'   },
          { label: 'Revenue',            value: `₹${(stats.revenue / 1000).toFixed(0)}K`, change: '+18%', icon: DollarSign, bgGradient: 'from-purple-400 to-pink-500',   color: 'purple'  },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-tight pr-2">{stat.label}</p>
                <div className={`w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-br ${stat.bgGradient} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-xl sm:text-3xl font-bold text-slate-800">{stat.value}</h3>
                <span className={`text-${stat.color}-600 text-xs sm:text-sm font-semibold`}>{stat.change}</span>
              </div>
              <div className="mt-2 sm:mt-3 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${stat.bgGradient} rounded-full`} style={{ width: '65%' }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Two columns ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

        {/* Recent Patients */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-2xl font-bold text-slate-800">Recent Patients</h2>
            <a href="/dashboard/patients" className="text-emerald-600 text-xs sm:text-sm font-semibold hover:text-emerald-700 flex-shrink-0 ml-2">
              View All
            </a>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {recentPatients.length > 0 ? recentPatients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-3 sm:p-4 bg-slate-50 rounded-xl hover:bg-emerald-50/50 transition-colors border border-slate-100 gap-2">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold shadow-md flex-shrink-0 text-sm sm:text-base">
                    {patient.name?.charAt(0).toUpperCase() || 'P'}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 text-sm sm:text-base truncate">{patient.name}</p>
                    <p className="text-xs sm:text-sm text-slate-500 truncate">{patient.phone}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-slate-500 whitespace-nowrap">{formatDate(patient.createdAt)}</p>
                  <p className="text-xs sm:text-sm font-medium text-slate-700 mt-1 truncate max-w-[80px] sm:max-w-[120px]">{patient.address || '-'}</p>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-slate-400">
                <Users className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No recent patients</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-2xl font-bold text-slate-800">Recent Appointments</h2>
            <a href="/dashboard/appointments" className="text-emerald-600 text-xs sm:text-sm font-semibold hover:text-emerald-700 flex-shrink-0 ml-2">
              View Schedule
            </a>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {upcomingAppointments.length > 0 ? upcomingAppointments.map((apt) => (
              <div key={apt.id} className="p-3 sm:p-4 border-l-4 border-emerald-500 bg-emerald-50/50 rounded-r-xl hover:bg-emerald-50 transition-colors">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 text-sm sm:text-base truncate">
                      {apt.patient?.name || `Patient #${apt.patientId}`}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 truncate">
                      {apt.doctor?.name || `Doctor #${apt.doctorId}`}
                    </p>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-emerald-600 flex-shrink-0 whitespace-nowrap">
                    {formatDate(apt.appointmentDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-3 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-white text-xs text-slate-700 rounded-full border border-slate-200 capitalize">
                    {apt.type}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full capitalize ${getStatusBadge(apt.status)}`}>
                    {getStatusIcon(apt.status)} {apt.status}
                  </span>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-slate-400">
                <Calendar className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No upcoming appointments</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Add Patient Modal ── */}
      <AddPatientModal
        isOpen={showAddPatient}
        onClose={() => setShowAddPatient(false)}
        onSuccess={handlePatientAdded}
      />
    </div>
  );
}