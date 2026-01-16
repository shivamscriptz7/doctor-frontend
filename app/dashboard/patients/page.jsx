
// 'use client';

// import { useState, useMemo } from 'react';
// import { 
//   Search, 
//   Filter, 
//   Download,
//   ChevronDown,
//   ChevronUp,
//   ChevronsUpDown,
//   User,
//   Phone,
//   Mail,
//   MapPin,
//   Calendar,
//   Edit,
//   Trash2,
//   Eye,
//   Plus,
//   X,
//   FileText,
//   Sheet
// } from 'lucide-react';

// // Generate static patient data
// const generatePatients = () => {
//   const firstNames = ['Rajesh', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Anita', 'Rahul', 'Neha', 'Sanjay', 'Pooja', 'Arun', 'Kavita', 'Deepak', 'Meera', 'Suresh', 'Ritu', 'Manoj', 'Sunita', 'Ajay', 'Preeti'];
//   const lastNames = ['Kumar', 'Sharma', 'Singh', 'Verma', 'Patel', 'Gupta', 'Reddy', 'Mehta', 'Joshi', 'Rao', 'Nair', 'Iyer', 'Chopra', 'Malhotra', 'Agarwal', 'Shah', 'Desai', 'Pillai', 'Menon', 'Sinha'];
//   const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Chandigarh'];
//   const areas = ['Sector 17', 'MG Road', 'Park Street', 'Anna Nagar', 'Koramangala', 'Banjara Hills', 'Civil Lines', 'Model Town', 'Vasant Vihar', 'Jubilee Hills'];

//   const patients = [];
//   for (let i = 1; i <= 150; i++) {
//     const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
//     const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
//     const city = cities[Math.floor(Math.random() * cities.length)];
//     const area = areas[Math.floor(Math.random() * areas.length)];
    
//     const createdDate = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
//     const updatedDate = new Date(createdDate.getTime() + Math.random() * 90 * 24 * 60 * 60 * 1000);

//     patients.push({
//       id: i,
//       name: `${firstName} ${lastName}`,
//       phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
//       email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
//       address: `${area}, ${city}`,
//       created_date: createdDate.toISOString().split('T')[0],
//       updated_date: updatedDate.toISOString().split('T')[0]
//     });
//   }
//   return patients;
// };

// export default function PatientsPage() {
//   const [patients] = useState(generatePatients());
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(15);
//   const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
//   const [showFilters, setShowFilters] = useState(false);
//   const [showExportMenu, setShowExportMenu] = useState(false);

//   // Sorting
//   const sortedPatients = useMemo(() => {
//     let sortablePatients = [...patients];
//     if (sortConfig.key) {
//       sortablePatients.sort((a, b) => {
//         const aValue = a[sortConfig.key];
//         const bValue = b[sortConfig.key];
        
//         if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
//         if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }
//     return sortablePatients;
//   }, [patients, sortConfig]);

//   // Search filter
//   const filteredPatients = useMemo(() => {
//     return sortedPatients.filter(patient =>
//       patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       patient.phone.includes(searchTerm) ||
//       patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       patient.address.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [sortedPatients, searchTerm]);

//   // Pagination
//   const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentPatients = filteredPatients.slice(indexOfFirstItem, indexOfLastItem);

//   // Export to CSV (Excel compatible)
//   const exportToExcel = () => {
//     const headers = ['ID', 'Name', 'Phone', 'Email', 'Address', 'Created Date', 'Updated Date'];
//     const csvData = [
//       headers.join(','),
//       ...filteredPatients.map(p => 
//         `${p.id},"${p.name}","${p.phone}","${p.email}","${p.address}",${p.created_date},${p.updated_date}`
//       )
//     ].join('\n');

//     const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
//     link.setAttribute('href', url);
//     link.setAttribute('download', `patients_${new Date().toISOString().split('T')[0]}.csv`);
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     setShowExportMenu(false);
//   };

//   // Export to PDF
//   const exportToPDF = () => {
//     // Create a simple HTML content for PDF
//     const htmlContent = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Patients Report</title>
//           <style>
//             body { font-family: Arial, sans-serif; margin: 20px; }
//             h1 { color: #059669; text-align: center; }
//             table { width: 100%; border-collapse: collapse; margin-top: 20px; }
//             th { background-color: #059669; color: white; padding: 12px; text-align: left; }
//             td { padding: 10px; border-bottom: 1px solid #ddd; }
//             tr:hover { background-color: #f5f5f5; }
//             .header { text-align: center; margin-bottom: 30px; }
//             .date { color: #666; font-size: 14px; }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <h1>MediCare Hospital - Patients Report</h1>
//             <p class="date">Generated on: ${new Date().toLocaleDateString('en-IN', { 
//               year: 'numeric', 
//               month: 'long', 
//               day: 'numeric' 
//             })}</p>
//             <p><strong>Total Patients: ${filteredPatients.length}</strong></p>
//           </div>
//           <table>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Phone</th>
//                 <th>Email</th>
//                 <th>Address</th>
//                 <th>Created</th>
//                 <th>Updated</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${filteredPatients.map(patient => `
//                 <tr>
//                   <td>${patient.id}</td>
//                   <td>${patient.name}</td>
//                   <td>${patient.phone}</td>
//                   <td>${patient.email}</td>
//                   <td>${patient.address}</td>
//                   <td>${patient.created_date}</td>
//                   <td>${patient.updated_date}</td>
//                 </tr>
//               `).join('')}
//             </tbody>
//           </table>
//         </body>
//       </html>
//     `;

//     // Open in new window and trigger print
//     const printWindow = window.open('', '', 'height=600,width=800');
//     printWindow.document.write(htmlContent);
//     printWindow.document.close();
//     printWindow.focus();
    
//     setTimeout(() => {
//       printWindow.print();
//       setShowExportMenu(false);
//     }, 250);
//   };

//   const handleSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const getSortIcon = (key) => {
//     if (sortConfig.key !== key) {
//       return <ChevronsUpDown className="w-4 h-4 text-slate-400" />;
//     }
//     return sortConfig.direction === 'asc' ? 
//       <ChevronUp className="w-4 h-4 text-emerald-600" /> : 
//       <ChevronDown className="w-4 h-4 text-emerald-600" />;
//   };

//   const getPageNumbers = () => {
//     const pageNumbers = [];
//     const maxVisible = 5;
    
//     if (totalPages <= maxVisible) {
//       for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
//     } else {
//       if (currentPage <= 3) {
//         for (let i = 1; i <= 4; i++) pageNumbers.push(i);
//         pageNumbers.push('...');
//         pageNumbers.push(totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pageNumbers.push(1);
//         pageNumbers.push('...');
//         for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
//       } else {
//         pageNumbers.push(1);
//         pageNumbers.push('...');
//         pageNumbers.push(currentPage - 1);
//         pageNumbers.push(currentPage);
//         pageNumbers.push(currentPage + 1);
//         pageNumbers.push('...');
//         pageNumbers.push(totalPages);
//       }
//     }
//     return pageNumbers;
//   };

//   return (
//     <div className="p-8">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h1 className="text-4xl font-bold text-slate-800 mb-2">Patients</h1>
//             <p className="text-slate-600">Manage and view all patient records</p>
//           </div>
//           <div className="flex gap-3">
//             {/* Export Dropdown */}
//             <div className="relative">
//               <button 
//                 onClick={() => setShowExportMenu(!showExportMenu)}
//                 className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 flex items-center gap-2 text-slate-700 font-medium shadow-sm hover:shadow-md"
//               >
//                 <Download className="w-4 h-4" />
//                 Export
//                 <ChevronDown className="w-4 h-4" />
//               </button>
              
//               {showExportMenu && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 z-10 overflow-hidden">
//                   <button
//                     onClick={exportToExcel}
//                     className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors flex items-center gap-3 text-slate-700"
//                   >
//                     <Sheet className="w-4 h-4 text-green-600" />
//                     <span className="font-medium">Export to Excel</span>
//                   </button>
//                   <button
//                     onClick={exportToPDF}
//                     className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors flex items-center gap-3 text-slate-700 border-t border-slate-100"
//                   >
//                     <FileText className="w-4 h-4 text-red-600" />
//                     <span className="font-medium">Export to PDF</span>
//                   </button>
//                 </div>
//               )}
//             </div>

//             <button className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl">
//               <Plus className="w-5 h-5" />
//               Add Patient
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Total Patients</p>
//             <p className="text-2xl font-bold text-slate-800">{patients.length}</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Showing</p>
//             <p className="text-2xl font-bold text-emerald-600">{currentPatients.length}</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Current Page</p>
//             <p className="text-2xl font-bold text-teal-600">{currentPage} / {totalPages}</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Filtered Results</p>
//             <p className="text-2xl font-bold text-cyan-600">{filteredPatients.length}</p>
//           </div>
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
//         <div className="flex flex-col lg:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search by name, phone, email or address..."
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//             />
//             {searchTerm && (
//               <button
//                 onClick={() => setSearchTerm('')}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             )}
//           </div>

//           <div className="flex items-center gap-3">
//             <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">Show:</label>
//             <select
//               value={itemsPerPage}
//               onChange={(e) => {
//                 setItemsPerPage(Number(e.target.value));
//                 setCurrentPage(1);
//               }}
//               className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700 font-medium cursor-pointer"
//             >
//               <option value={15}>15 per page</option>
//               <option value={25}>25 per page</option>
//               <option value={50}>50 per page</option>
//               <option value={100}>100 per page</option>
//               <option value={500}>500 per page</option>
//               <option value={1000}>1000 per page</option>
//               <option value={patients.length}>All ({patients.length})</option>
//             </select>
//           </div>

//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
//               showFilters ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300' : 'bg-slate-100 text-slate-700 border-2 border-transparent hover:border-slate-300'
//             }`}
//           >
//             <Filter className="w-5 h-5" />
//             Filters
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
//               <tr>
//                 <th className="px-6 py-4 text-left">
//                   <button onClick={() => handleSort('name')} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
//                     <User className="w-4 h-4" />
//                     Patient Name
//                     {getSortIcon('name')}
//                   </button>
//                 </th>
//                 <th className="px-6 py-4 text-left">
//                   <button onClick={() => handleSort('phone')} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
//                     <Phone className="w-4 h-4" />
//                     Phone
//                     {getSortIcon('phone')}
//                   </button>
//                 </th>
//                 <th className="px-6 py-4 text-left">
//                   <button onClick={() => handleSort('email')} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
//                     <Mail className="w-4 h-4" />
//                     Email
//                     {getSortIcon('email')}
//                   </button>
//                 </th>
//                 <th className="px-6 py-4 text-left">
//                   <button onClick={() => handleSort('address')} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
//                     <MapPin className="w-4 h-4" />
//                     Address
//                     {getSortIcon('address')}
//                   </button>
//                 </th>
//                 <th className="px-6 py-4 text-left">
//                   <button onClick={() => handleSort('created_date')} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
//                     <Calendar className="w-4 h-4" />
//                     Created
//                     {getSortIcon('created_date')}
//                   </button>
//                 </th>
//                 <th className="px-6 py-4 text-left">
//                   <button onClick={() => handleSort('updated_date')} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
//                     <Calendar className="w-4 h-4" />
//                     Updated
//                     {getSortIcon('updated_date')}
//                   </button>
//                 </th>
//                 <th className="px-6 py-4 text-center">
//                   <span className="font-semibold text-slate-700">Actions</span>
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {currentPatients.length > 0 ? (
//                 currentPatients.map((patient) => (
//                   <tr key={patient.id} className="hover:bg-emerald-50/50 transition-colors duration-200">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
//                           {patient.name.charAt(0)}
//                         </div>
//                         <span className="font-semibold text-slate-800">{patient.name}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-slate-600">{patient.phone}</td>
//                     <td className="px-6 py-4 text-slate-600">{patient.email}</td>
//                     <td className="px-6 py-4 text-slate-600">{patient.address}</td>
//                     <td className="px-6 py-4 text-slate-600">{patient.created_date}</td>
//                     <td className="px-6 py-4 text-slate-600">{patient.updated_date}</td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center justify-center gap-2">
//                         <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
//                           <Eye className="w-4 h-4" />
//                         </button>
//                         <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit">
//                           <Edit className="w-4 h-4" />
//                         </button>
//                         <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={7} className="px-6 py-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <Search className="w-12 h-12 text-slate-300" />
//                       <p className="text-slate-600 font-medium">No patients found</p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
//             <div className="flex items-center justify-between">
//               <p className="text-sm text-slate-600">
//                 Showing <span className="font-semibold text-slate-800">{indexOfFirstItem + 1}</span> to{' '}
//                 <span className="font-semibold text-slate-800">{Math.min(indexOfLastItem, filteredPatients.length)}</span> of{' '}
//                 <span className="font-semibold text-slate-800">{filteredPatients.length}</span> results
//               </p>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setCurrentPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
//                     currentPage === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'
//                   }`}
//                 >
//                   Previous
//                 </button>

//                 <div className="flex items-center gap-1">
//                   {getPageNumbers().map((pageNum, index) => (
//                     pageNum === '...' ? (
//                       <span key={`ellipsis-${index}`} className="px-3 py-2 text-slate-400">...</span>
//                     ) : (
//                       <button
//                         key={pageNum}
//                         onClick={() => setCurrentPage(pageNum)}
//                         className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
//                           currentPage === pageNum ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'
//                         }`}
//                       >
//                         {pageNum}
//                       </button>
//                     )
//                   ))}
//                 </div>

//                 <button
//                   onClick={() => setCurrentPage(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
//                     currentPage === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'
//                   }`}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Click outside to close export menu */}
//       {showExportMenu && (
//         <div 
//           className="fixed inset-0 z-0" 
//           onClick={() => setShowExportMenu(false)}
//         />
//       )}
//     </div>
//   );
// }




'use client';

import { useState, useMemo, useEffect } from 'react';
import { 
  Search, Filter, Download, ChevronDown, ChevronUp, ChevronsUpDown,
  User, Phone, Mail, MapPin, Calendar, Edit, Trash2, Eye, Plus, X, FileText, Sheet
} from 'lucide-react';

 


// Generate static patient data
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

// Modal Component
function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]}`} onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  // const [patients, setPatients] = useState(generatePatients());
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [showFilters, setShowFilters] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

    useEffect(() => {
    setPatients(generatePatients());
  }, []);

  // Handle form change
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add Patient
  const handleAddPatient = (e) => {
    e.preventDefault();
    const newPatient = {
      id: patients.length + 1,
      ...formData,
      created_date: new Date().toISOString().split('T')[0],
      updated_date: new Date().toISOString().split('T')[0]
    };
    setPatients([...patients, newPatient]);
    setShowAddModal(false);
    setFormData({ name: '', phone: '', email: '', address: '' });
  };

  // Edit Patient
  const handleEditClick = (patient) => {
    setSelectedPatient(patient);
    setFormData({
      name: patient.name,
      phone: patient.phone,
      email: patient.email,
      address: patient.address
    });
    setShowEditModal(true);
  };

  const handleUpdatePatient = (e) => {
    e.preventDefault();
    const updatedPatients = patients.map(p =>
      p.id === selectedPatient.id
        ? { ...p, ...formData, updated_date: new Date().toISOString().split('T')[0] }
        : p
    );
    setPatients(updatedPatients);
    setShowEditModal(false);
    setSelectedPatient(null);
    setFormData({ name: '', phone: '', email: '', address: '' });
  };

  // Delete Patient
  const handleDeleteClick = (patient) => {
    setSelectedPatient(patient);
    setShowDeleteModal(true);
  };

  const handleDeletePatient = () => {
    setPatients(patients.filter(p => p.id !== selectedPatient.id));
    setShowDeleteModal(false);
    setSelectedPatient(null);
  };

  // View Patient
  const handleViewClick = (patient) => {
    setSelectedPatient(patient);
    setShowViewModal(true);
  };

  // Rest of your existing code for sorting, filtering, pagination, export...
  const sortedPatients = useMemo(() => {
    let sortablePatients = [...patients];
    if (sortConfig.key) {
      sortablePatients.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortablePatients;
  }, [patients, sortConfig]);

  const filteredPatients = useMemo(() => {
    return sortedPatients.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedPatients, searchTerm]);

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstItem, indexOfLastItem);

  const exportToExcel = () => {
    const headers = ['ID', 'Name', 'Phone', 'Email', 'Address', 'Created Date', 'Updated Date'];
    const csvData = [
      headers.join(','),
      ...filteredPatients.map(p => `${p.id},"${p.name}","${p.phone}","${p.email}","${p.address}",${p.created_date},${p.updated_date}`)
    ].join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', `patients_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportMenu(false);
  };

  const exportToPDF = () => {
    const htmlContent = `<!DOCTYPE html><html><head><title>Patients Report</title><style>body{font-family:Arial,sans-serif;margin:20px}h1{color:#059669;text-align:center}table{width:100%;border-collapse:collapse;margin-top:20px}th{background-color:#059669;color:white;padding:12px;text-align:left}td{padding:10px;border-bottom:1px solid #ddd}tr:hover{background-color:#f5f5f5}.header{text-align:center;margin-bottom:30px}.date{color:#666;font-size:14px}</style></head><body><div class="header"><h1>MediCare Hospital - Patients Report</h1><p class="date">Generated on: ${new Date().toLocaleDateString('en-IN')}</p><p><strong>Total Patients: ${filteredPatients.length}</strong></p></div><table><thead><tr><th>ID</th><th>Name</th><th>Phone</th><th>Email</th><th>Address</th><th>Created</th><th>Updated</th></tr></thead><tbody>${filteredPatients.map(patient => `<tr><td>${patient.id}</td><td>${patient.name}</td><td>${patient.phone}</td><td>${patient.email}</td><td>${patient.address}</td><td>${patient.created_date}</td><td>${patient.updated_date}</td></tr>`).join('')}</tbody></table></body></html>`;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); setShowExportMenu(false); }, 250);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <ChevronsUpDown className="w-4 h-4 text-slate-400" />;
    return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4 text-emerald-600" /> : <ChevronDown className="w-4 h-4 text-emerald-600" />;
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
            <div className="relative">
              <button onClick={() => setShowExportMenu(!showExportMenu)} className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 flex items-center gap-2 text-slate-700 font-medium shadow-sm hover:shadow-md">
                <Download className="w-4 h-4" />
                Export
                <ChevronDown className="w-4 h-4" />
              </button>
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 z-10 overflow-hidden">
                  <button onClick={exportToExcel} className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors flex items-center gap-3 text-slate-700">
                    <Sheet className="w-4 h-4 text-green-600" />
                    <span className="font-medium">Export to Excel</span>
                  </button>
                  <button onClick={exportToPDF} className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors flex items-center gap-3 text-slate-700 border-t border-slate-100">
                    <FileText className="w-4 h-4 text-red-600" />
                    <span className="font-medium">Export to PDF</span>
                  </button>
                </div>
              )}
            </div>
            <button onClick={() => setShowAddModal(true)} className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl">
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
            <input type="text" placeholder="Search by name, phone, email or address..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">Show:</label>
            <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700 font-medium cursor-pointer">
              <option value={15}>15 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
              <option value={patients.length}>All ({patients.length})</option>
            </select>
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${showFilters ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300' : 'bg-slate-100 text-slate-700 border-2 border-transparent hover:border-slate-300'}`}>
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-6">
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
                currentPatients.map((patient) => (
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
                        <button onClick={() => handleViewClick(patient)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleEditClick(patient)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteClick(patient)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
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
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((pageNum, index) => (
                    pageNum === '...' ? (
                      <span key={`ellipsis-${index}`} className="px-3 py-2 text-slate-400">...</span>
                    ) : (
                      <button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === pageNum ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
                        {pageNum}
                      </button>
                    )
                  ))}
                </div>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Patient Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Patient" size="md">
        <form onSubmit={handleAddPatient} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Patient Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="Enter full name" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="+91 XXXXXXXXXX" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
            <input type="email" name="email" value={formData.email} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="email@example.com" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Address *</label>
            <textarea name="address" value={formData.address} onChange={handleFormChange} required rows="3" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="Enter full address"></textarea>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">
              Cancel
            </button>
            <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg">
              Add Patient
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Patient Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Patient" size="md">
        <form onSubmit={handleUpdatePatient} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Patient Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
            <input type="email" name="email" value={formData.email} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Address *</label>
            <textarea name="address" value={formData.address} onChange={handleFormChange} required rows="3" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"></textarea>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">
              Cancel
            </button>
            <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg">
              Update Patient
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Patient" size="sm">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Are you sure?</h3>
          <p className="text-sm text-slate-600 mb-6">
            Do you really want to delete <span className="font-semibold">{selectedPatient?.name}</span>? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">
              Cancel
            </button>
            <button onClick={handleDeletePatient} className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold">
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* View Patient Modal */}
      <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Patient Details" size="md">
        {selectedPatient && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {selectedPatient.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">{selectedPatient.name}</h3>
                <p className="text-slate-600">ID: #{selectedPatient.id}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-600 mb-1">Phone Number</p>
                <p className="font-semibold text-slate-800">{selectedPatient.phone}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Email Address</p>
                <p className="font-semibold text-slate-800">{selectedPatient.email}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-slate-600 mb-1">Address</p>
                <p className="font-semibold text-slate-800">{selectedPatient.address}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Created Date</p>
                <p className="font-semibold text-slate-800">{selectedPatient.created_date}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Updated Date</p>
                <p className="font-semibold text-slate-800">{selectedPatient.updated_date}</p>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <button onClick={() => { setShowViewModal(false); handleEditClick(selectedPatient); }} className="flex-1 px-6 py-3 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors font-semibold">
                Edit Patient
              </button>
              <button onClick={() => setShowViewModal(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {showExportMenu && <div className="fixed inset-0 z-0" onClick={() => setShowExportMenu(false)} />}
    </div>
  );
}