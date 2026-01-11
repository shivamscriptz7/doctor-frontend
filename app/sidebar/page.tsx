// // app/dashboard/page.jsx
// // Example: Complete page implementation with the sidebar

// 'use client';

// import { useState } from 'react';
// import { 
//   Activity, 
//   Calendar, 
//   Users, 
//   FileText, 
//   Pill, 
//   Stethoscope,
//   BedDouble,
//   DollarSign,
//   Settings,
//   ChevronLeft,
//   ChevronRight,
//   Plus,
//   Bell,
//   LogOut,
//   Search,
//   Filter,
//   Download
// } from 'lucide-react';

// export default function DashboardPage() {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [activeItem, setActiveItem] = useState('dashboard');

//   const menuItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: Activity, badge: null },
//     { id: 'appointments', label: 'Appointments', icon: Calendar, badge: '12' },
//     { id: 'patients', label: 'Patients', icon: Users, badge: null },
//     { id: 'doctors', label: 'Doctors', icon: Stethoscope, badge: null },
//     { id: 'departments', label: 'Departments', icon: FileText, badge: null },
//     { id: 'pharmacy', label: 'Pharmacy', icon: Pill, badge: '3' },
//     { id: 'beds', label: 'Bed Management', icon: BedDouble, badge: null },
//     { id: 'billing', label: 'Billing', icon: DollarSign, badge: null },
//   ];

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
//     <div className="flex h-screen bg-slate-50">
//       {/* Sidebar */}
//       <aside
//         className={`relative bg-gradient-to-b from-emerald-600 to-teal-700 text-white transition-all duration-500 ease-out flex flex-col shadow-2xl ${
//           isCollapsed ? 'w-20' : 'w-72'
//         }`}
//       >
//         {/* Logo Section */}
//         <div className="p-6 border-b border-emerald-500/30 relative overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
//           <div className="relative flex items-center gap-3">
//             <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
//               <Activity className="w-6 h-6 text-emerald-600" strokeWidth={2.5} />
//             </div>
//             {!isCollapsed && (
//               <div className="overflow-hidden">
//                 <h1 className="font-bold text-xl tracking-tight animate-fadeIn">MediCare</h1>
//                 <p className="text-xs text-emerald-100 animate-fadeIn" style={{ animationDelay: '100ms' }}>
//                   Hospital System
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Quick Actions */}
//         {!isCollapsed && (
//           <div className="px-4 py-4 animate-slideDown">
//             <button className="w-full bg-white hover:bg-emerald-50 text-emerald-700 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group">
//               <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
//               <span>New Patient</span>
//             </button>
//           </div>
//         )}

//         {/* Navigation */}
//         <nav className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500/50 scrollbar-track-transparent">
//           <ul className="space-y-1">
//             {menuItems.map((item, index) => {
//               const Icon = item.icon;
//               const isActive = activeItem === item.id;
              
//               return (
//                 <li
//                   key={item.id}
//                   className="animate-slideRight"
//                   style={{ animationDelay: `${index * 50}ms` }}
//                 >
//                   <button
//                     onClick={() => setActiveItem(item.id)}
//                     className={`w-full group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
//                       isActive
//                         ? 'bg-white text-emerald-700 shadow-lg'
//                         : 'text-emerald-50 hover:bg-emerald-500/30 hover:text-white'
//                     }`}
//                   >
//                     {isActive && (
//                       <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-white rounded-xl animate-pulse" />
//                     )}
//                     <Icon
//                       className={`relative w-5 h-5 transition-transform duration-300 ${
//                         isActive ? 'scale-110' : 'group-hover:scale-110'
//                       }`}
//                       strokeWidth={2}
//                     />
//                     {!isCollapsed && (
//                       <>
//                         <span className="relative flex-1 text-left font-medium">
//                           {item.label}
//                         </span>
//                         {item.badge && (
//                           <span
//                             className={`relative px-2 py-0.5 text-xs font-bold rounded-full ${
//                               isActive
//                                 ? 'bg-emerald-600 text-white'
//                                 : 'bg-white/20 text-white'
//                             }`}
//                           >
//                             {item.badge}
//                           </span>
//                         )}
//                       </>
//                     )}
//                     {isCollapsed && item.badge && (
//                       <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
//                         {item.badge}
//                       </div>
//                     )}
//                   </button>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         {/* Bottom Section */}
//         <div className="p-3 border-t border-emerald-500/30 space-y-2">
//           <button className="w-full group flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-50 hover:bg-emerald-500/30 hover:text-white transition-all duration-300">
//             <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" strokeWidth={2} />
//             {!isCollapsed && <span className="flex-1 text-left font-medium">Notifications</span>}
//           </button>
          
//           <button className="w-full group flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-50 hover:bg-emerald-500/30 hover:text-white transition-all duration-300">
//             <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" strokeWidth={2} />
//             {!isCollapsed && <span className="flex-1 text-left font-medium">Settings</span>}
//           </button>

//           <button className="w-full group flex items-center gap-3 px-4 py-3 rounded-xl text-red-100 hover:bg-red-500/30 hover:text-white transition-all duration-300">
//             <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
//             {!isCollapsed && <span className="flex-1 text-left font-medium">Logout</span>}
//           </button>
//         </div>

//         {/* Collapse Toggle */}
//         <button
//           onClick={() => setIsCollapsed(!isCollapsed)}
//           className="absolute -right-3 top-24 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-all duration-300 hover:scale-110 z-10"
//         >
//           {isCollapsed ? (
//             <ChevronRight className="w-4 h-4" />
//           ) : (
//             <ChevronLeft className="w-4 h-4" />
//           )}
//         </button>
//       </aside>

//       {/* Main Content Area */}
//       <main className="flex-1 overflow-y-auto">
//         <div className="p-8">
//           {/* Header */}
//           <div className="mb-8 flex items-center justify-between">
//             <div>
//               <h1 className="text-4xl font-bold text-slate-800 mb-2">
//                 Welcome back, Dr. Shivam
//               </h1>
//               <p className="text-slate-600">
//                 Here's what's happening in your hospital today
//               </p>
//             </div>
//             <div className="flex gap-3">
//               <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-slate-700 font-medium">
//                 <Download className="w-4 h-4" />
//                 Export
//               </button>
//               <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 font-medium shadow-lg">
//                 <Plus className="w-4 h-4" />
//                 Add New
//               </button>
//             </div>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {[
//               { label: 'Total Patients', value: '1,248', change: '+12%', color: 'emerald', trend: 'up' },
//               { label: 'Appointments', value: '86', change: '+5%', color: 'blue', trend: 'up' },
//               { label: 'Available Beds', value: '42', change: '-8%', color: 'amber', trend: 'down' },
//               { label: 'Revenue', value: '$124K', change: '+18%', color: 'purple', trend: 'up' },
//             ].map((stat, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100"
//               >
//                 <p className="text-slate-600 text-sm font-medium mb-1">{stat.label}</p>
//                 <div className="flex items-end justify-between">
//                   <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
//                   <span className={`text-${stat.color}-600 text-sm font-semibold`}>
//                     {stat.change}
//                   </span>
//                 </div>
//                 <div className="mt-3 h-1 bg-slate-100 rounded-full overflow-hidden">
//                   <div className={`h-full bg-${stat.color}-500 rounded-full`} style={{ width: '65%' }}></div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Two Column Layout */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Recent Patients */}
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-bold text-slate-800">Recent Patients</h2>
//                 <button className="text-emerald-600 text-sm font-semibold hover:text-emerald-700">
//                   View All
//                 </button>
//               </div>
//               <div className="space-y-4">
//                 {recentPatients.map((patient) => (
//                   <div key={patient.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
//                         {patient.name.charAt(0)}
//                       </div>
//                       <div>
//                         <p className="font-semibold text-slate-800">{patient.name}</p>
//                         <p className="text-sm text-slate-500">{patient.condition}</p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-sm font-medium text-slate-700">{patient.time}</p>
//                       <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
//                         patient.status === 'completed' ? 'bg-green-100 text-green-700' :
//                         patient.status === 'inProgress' ? 'bg-blue-100 text-blue-700' :
//                         'bg-amber-100 text-amber-700'
//                       }`}>
//                         {patient.status === 'completed' ? 'Completed' :
//                          patient.status === 'inProgress' ? 'In Progress' : 'Waiting'}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Upcoming Appointments */}
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-bold text-slate-800">Upcoming</h2>
//                 <button className="text-emerald-600 text-sm font-semibold hover:text-emerald-700">
//                   View Schedule
//                 </button>
//               </div>
//               <div className="space-y-4">
//                 {upcomingAppointments.map((apt, idx) => (
//                   <div key={idx} className="p-4 border-l-4 border-emerald-500 bg-emerald-50/50 rounded-r-xl">
//                     <div className="flex justify-between items-start mb-2">
//                       <p className="font-semibold text-slate-800">{apt.patient}</p>
//                       <span className="text-sm font-medium text-emerald-600">{apt.time}</span>
//                     </div>
//                     <p className="text-sm text-slate-600 mb-1">{apt.doctor}</p>
//                     <span className="inline-block px-2 py-1 bg-white text-xs text-slate-700 rounded-full">
//                       {apt.type}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }

//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes slideRight {
//           from {
//             opacity: 0;
//             transform: translateX(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         .animate-fadeIn {
//           animation: fadeIn 0.5s ease-out forwards;
//         }

//         .animate-slideDown {
//           animation: slideDown 0.6s ease-out forwards;
//         }

//         .animate-slideRight {
//           animation: slideRight 0.6s ease-out forwards;
//           opacity: 0;
//         }

//         .scrollbar-thin::-webkit-scrollbar {
//           width: 6px;
//         }

//         .scrollbar-thumb-emerald-500\/50::-webkit-scrollbar-thumb {
//           background-color: rgba(16, 185, 129, 0.5);
//           border-radius: 3px;
//         }

//         .scrollbar-track-transparent::-webkit-scrollbar-track {
//           background-color: transparent;
//         }
//       `}</style>
//     </div>
//   );
// }


'use client';

import { useState,useEffect } from 'react';
import { 
  Activity, 
  Calendar, 
  Users, 
  FileText, 
  Pill, 
  Stethoscope,
  BedDouble,
  DollarSign,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  Bell,
  LogOut,
  Download,
  Search,
  Filter,
  X,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  User,
  Phone,
  Mail,
  MapPin,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { useRouter } from 'next/navigation';


// Import Patient Listing Component (inline)
const PatientListingContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [showFilters, setShowFilters] = useState(false);

  // Static patient data generator
  const generatePatients = () => {
    const firstNames = ['Rajesh', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Anita', 'Rahul', 'Neha', 'Sanjay', 'Pooja', 'Arun', 'Kavita', 'Deepak', 'Meera', 'Suresh', 'Ritu', 'Manoj', 'Sunita', 'Ajay', 'Preeti'];
    const lastNames = ['Kumar', 'Sharma', 'Singh', 'Verma', 'Patel', 'Gupta', 'Reddy', 'Mehta', 'Joshi', 'Rao', 'Nair', 'Iyer', 'Chopra', 'Malhotra', 'Agarwal', 'Shah', 'Desai', 'Pillai', 'Menon', 'Sinha'];
    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Chandigarh'];
    const areas = ['Sector 17', 'MG Road', 'Park Street', 'Anna Nagar', 'Koramangala', 'Banjara Hills', 'Civil Lines', 'Model Town', 'Vasant Vihar', 'Jubilee Hills'];

    const patients = [];
    for (let i = 1; i <= 150; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const area = areas[Math.floor(Math.random() * areas.length)];
      
      const createdDate = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
      const updatedDate = new Date(createdDate.getTime() + Math.random() * 90 * 24 * 60 * 60 * 1000);

      patients.push({
        id: i,
        name: `${firstName} ${lastName}`,
        phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
        address: `${area}, ${city}`,
        created_date: createdDate.toISOString().split('T')[0],
        updated_date: updatedDate.toISOString().split('T')[0]
      });
    }
    return patients;
  };

  const [patients] = useState(generatePatients());

  // Sorting
  const sortedPatients = [...patients].sort((a:any, b:any) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Search filter
  const filteredPatients = sortedPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstItem, indexOfLastItem);

  const handleSort = (key:any) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key:any) => {
    if (sortConfig.key !== key) {
      return <ChevronsUpDown className="w-4 h-4 text-slate-400" />;
    }
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-emerald-600" /> : 
      <ChevronDown className="w-4 h-4 text-emerald-600" />;
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pageNumbers.push(i);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Patients</h1>
            <p className="text-slate-600">Manage and view all patient records</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 flex items-center gap-2 text-slate-700 font-medium shadow-sm hover:shadow-md">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl">
              <Plus className="w-5 h-5" />
              Add Patient
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Total Patients</p>
            <p className="text-2xl font-bold text-slate-800">{patients.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Showing</p>
            <p className="text-2xl font-bold text-emerald-600">{currentPatients.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Current Page</p>
            <p className="text-2xl font-bold text-teal-600">{currentPage} / {totalPages}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Filtered Results</p>
            <p className="text-2xl font-bold text-cyan-600">{filteredPatients.length}</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, phone, email or address..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">Show:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700 font-medium cursor-pointer"
            >
              <option value={15}>15 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
              <option value={500}>500 per page</option>
              <option value={1000}>1000 per page</option>
              <option value={patients.length}>All ({patients.length})</option>
            </select>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
              showFilters ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300' : 'bg-slate-100 text-slate-700 border-2 border-transparent hover:border-slate-300'
            }`}
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <button onClick={() => handleSort('name')} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
                    <User className="w-4 h-4" />
                    Patient Name
                    {getSortIcon('name')}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button onClick={() => handleSort('phone')} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
                    <Phone className="w-4 h-4" />
                    Phone
                    {getSortIcon('phone')}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button onClick={() => handleSort('email')} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
                    <Mail className="w-4 h-4" />
                    Email
                    {getSortIcon('email')}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button onClick={() => handleSort('address')} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
                    <MapPin className="w-4 h-4" />
                    Address
                    {getSortIcon('address')}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button onClick={() => handleSort('created_date')} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
                    <Calendar className="w-4 h-4" />
                    Created
                    {getSortIcon('created_date')}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button onClick={() => handleSort('updated_date')} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
                    <Calendar className="w-4 h-4" />
                    Updated
                    {getSortIcon('updated_date')}
                  </button>
                </th>
                <th className="px-6 py-4 text-center">
                  <span className="font-semibold text-slate-700">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentPatients.length > 0 ? (
                currentPatients.map((patient, index) => (
                  <tr key={patient.id} className="hover:bg-emerald-50/50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          {patient.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-slate-800">{patient.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{patient.phone}</td>
                    <td className="px-6 py-4 text-slate-600">{patient.email}</td>
                    <td className="px-6 py-4 text-slate-600">{patient.address}</td>
                    <td className="px-6 py-4 text-slate-600">{patient.created_date}</td>
                    <td className="px-6 py-4 text-slate-600">{patient.updated_date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Search className="w-12 h-12 text-slate-300" />
                      <p className="text-slate-600 font-medium">No patients found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing <span className="font-semibold text-slate-800">{indexOfFirstItem + 1}</span> to{' '}
                <span className="font-semibold text-slate-800">{Math.min(indexOfLastItem, filteredPatients.length)}</span> of{' '}
                <span className="font-semibold text-slate-800">{filteredPatients.length}</span> results
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    currentPage === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'
                  }`}
                >
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {getPageNumbers().map((pageNum:any, index) => (
                    pageNum === '...' ? (
                      <span key={`ellipsis-${index}`} className="px-3 py-2 text-slate-400">...</span>
                    ) : (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                          currentPage === pageNum ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    currentPage === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Dashboard Content
const DashboardContent = () => {
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
};

// Main Layout Component
export default function HospitalDashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const router = useRouter();

  useEffect(() => {
    console.log(activeItem,'active');
    
  if (activeItem === 'patients') {
    router.push('/patients');
  }
}, [activeItem]);


  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity, badge: null },
    { id: 'appointments', label: 'Appointments', icon: Calendar, badge: '12' },
    { id: 'patients', label: 'Patients', icon: Users, badge: null },
    { id: 'doctors', label: 'Doctors', icon: Stethoscope, badge: null },
    { id: 'departments', label: 'Departments', icon: FileText, badge: null },
    { id: 'pharmacy', label: 'Pharmacy', icon: Pill, badge: '3' },
    { id: 'beds', label: 'Bed Management', icon: BedDouble, badge: null },
    { id: 'billing', label: 'Billing', icon: DollarSign, badge: null },
  ];
  const renderContent = () => {
    switch (activeItem) {
      case 'patients':
        return <PatientListingContent />;
      case 'dashboard':
        return <DashboardContent />;
      default:
        return (
          <div className="p-8 flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                {menuItems.find(item => item.id === activeItem)?.label}
              </h2>
              <p className="text-slate-600">This page is under development</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`relative bg-gradient-to-b from-emerald-600 to-teal-700 text-white transition-all duration-500 ease-out flex flex-col shadow-2xl ${
          isCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-emerald-500/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="relative flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
              <Activity className="w-6 h-6 text-emerald-600" strokeWidth={2.5} />
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <h1 className="font-bold text-xl tracking-tight">MediCare</h1>
                <p className="text-xs text-emerald-100">Hospital System</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="px-4 py-4">
            <button className="w-full bg-white hover:bg-emerald-50 text-emerald-700 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group">
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>New Patient</span>
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500/50 scrollbar-track-transparent">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveItem(item.id)}
                    className={`w-full group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-white text-emerald-700 shadow-lg'
                        : 'text-emerald-50 hover:bg-emerald-500/30 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-white rounded-xl animate-pulse" />
                    )}
                    <Icon
                      className={`relative w-5 h-5 transition-transform duration-300 ${
                        isActive ? 'scale-110' : 'group-hover:scale-110'
                      }`}
                      strokeWidth={2}
                    />
                    {!isCollapsed && (
                      <>
                        <span className="relative flex-1 text-left font-medium">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span
                            className={`relative px-2 py-0.5 text-xs font-bold rounded-full ${
                              isActive
                                ? 'bg-emerald-600 text-white'
                                : 'bg-white/20 text-white'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                    {isCollapsed && item.badge && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                        {item.badge}
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="p-3 border-t border-emerald-500/30 space-y-2">
          <button className="w-full group flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-50 hover:bg-emerald-500/30 hover:text-white transition-all duration-300">
            <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" strokeWidth={2} />
            {!isCollapsed && <span className="flex-1 text-left font-medium">Notifications</span>}
          </button>
          
          <button className="w-full group flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-50 hover:bg-emerald-500/30 hover:text-white transition-all duration-300">
            <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" strokeWidth={2} />
            {!isCollapsed && <span className="flex-1 text-left font-medium">Settings</span>}
          </button>

          <button className="w-full group flex items-center gap-3 px-4 py-3 rounded-xl text-red-100 hover:bg-red-500/30 hover:text-white transition-all duration-300">
            <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
            {!isCollapsed && <span className="flex-1 text-left font-medium">Logout</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-all duration-300 hover:scale-110 z-10"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thumb-emerald-500\/50::-webkit-scrollbar-thumb {
          background-color: rgba(16, 185, 129, 0.5);
          border-radius: 3px;
        }

        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background-color: transparent;
        }
      `}</style>
    </div>
  );
}