
// // 'use client';

// // import { useState, useMemo } from 'react';
// // import { 
// //   Search, 
// //   Filter, 
// //   Download,
// //   ChevronDown,
// //   ChevronUp,
// //   ChevronsUpDown,
// //   User,
// //   Phone,
// //   Mail,
// //   MapPin,
// //   Calendar,
// //   Edit,
// //   Trash2,
// //   Eye,
// //   Plus,
// //   X,
// //   FileText,
// //   Sheet
// // } from 'lucide-react';

// // // Generate static patient data
// // const generatePatients = () => {
// //   const firstNames = ['Rajesh', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Anita', 'Rahul', 'Neha', 'Sanjay', 'Pooja', 'Arun', 'Kavita', 'Deepak', 'Meera', 'Suresh', 'Ritu', 'Manoj', 'Sunita', 'Ajay', 'Preeti'];
// //   const lastNames = ['Kumar', 'Sharma', 'Singh', 'Verma', 'Patel', 'Gupta', 'Reddy', 'Mehta', 'Joshi', 'Rao', 'Nair', 'Iyer', 'Chopra', 'Malhotra', 'Agarwal', 'Shah', 'Desai', 'Pillai', 'Menon', 'Sinha'];
// //   const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Chandigarh'];
// //   const areas = ['Sector 17', 'MG Road', 'Park Street', 'Anna Nagar', 'Koramangala', 'Banjara Hills', 'Civil Lines', 'Model Town', 'Vasant Vihar', 'Jubilee Hills'];

// //   const patients = [];
// //   for (let i = 1; i <= 150; i++) {
// //     const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
// //     const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
// //     const city = cities[Math.floor(Math.random() * cities.length)];
// //     const area = areas[Math.floor(Math.random() * areas.length)];

// //     const createdDate = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
// //     const updatedDate = new Date(createdDate.getTime() + Math.random() * 90 * 24 * 60 * 60 * 1000);

// //     patients.push({
// //       id: i,
// //       name: `${firstName} ${lastName}`,
// //       phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
// //       email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
// //       address: `${area}, ${city}`,
// //       created_date: createdDate.toISOString().split('T')[0],
// //       updated_date: updatedDate.toISOString().split('T')[0]
// //     });
// //   }
// //   return patients;
// // };

// // export default function PatientsPage() {
// //   const [patients] = useState(generatePatients());
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [itemsPerPage, setItemsPerPage] = useState(15);
// //   const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
// //   const [showFilters, setShowFilters] = useState(false);
// //   const [showExportMenu, setShowExportMenu] = useState(false);

// //   // Sorting
// //   const sortedPatients = useMemo(() => {
// //     let sortablePatients = [...patients];
// //     if (sortConfig.key) {
// //       sortablePatients.sort((a, b) => {
// //         const aValue = a[sortConfig.key];
// //         const bValue = b[sortConfig.key];

// //         if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
// //         if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
// //         return 0;
// //       });
// //     }
// //     return sortablePatients;
// //   }, [patients, sortConfig]);

// //   // Search filter
// //   const filteredPatients = useMemo(() => {
// //     return sortedPatients.filter(patient =>
// //       patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       patient.phone.includes(searchTerm) ||
// //       patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       patient.address.toLowerCase().includes(searchTerm.toLowerCase())
// //     );
// //   }, [sortedPatients, searchTerm]);

// //   // Pagination
// //   const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentPatients = filteredPatients.slice(indexOfFirstItem, indexOfLastItem);

// //   // Export to CSV (Excel compatible)
// //   const exportToExcel = () => {
// //     const headers = ['ID', 'Name', 'Phone', 'Email', 'Address', 'Created Date', 'Updated Date'];
// //     const csvData = [
// //       headers.join(','),
// //       ...filteredPatients.map(p => 
// //         `${p.id},"${p.name}","${p.phone}","${p.email}","${p.address}",${p.created_date},${p.updated_date}`
// //       )
// //     ].join('\n');

// //     const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
// //     const link = document.createElement('a');
// //     const url = URL.createObjectURL(blob);
// //     link.setAttribute('href', url);
// //     link.setAttribute('download', `patients_${new Date().toISOString().split('T')[0]}.csv`);
// //     link.style.visibility = 'hidden';
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //     setShowExportMenu(false);
// //   };

// //   // Export to PDF
// //   const exportToPDF = () => {
// //     // Create a simple HTML content for PDF
// //     const htmlContent = `
// //       <!DOCTYPE html>
// //       <html>
// //         <head>
// //           <title>Patients Report</title>
// //           <style>
// //             body { font-family: Arial, sans-serif; margin: 20px; }
// //             h1 { color: #059669; text-align: center; }
// //             table { width: 100%; border-collapse: collapse; margin-top: 20px; }
// //             th { background-color: #059669; color: white; padding: 12px; text-align: left; }
// //             td { padding: 10px; border-bottom: 1px solid #ddd; }
// //             tr:hover { background-color: #f5f5f5; }
// //             .header { text-align: center; margin-bottom: 30px; }
// //             .date { color: #666; font-size: 14px; }
// //           </style>
// //         </head>
// //         <body>
// //           <div class="header">
// //             <h1>MediCare Hospital - Patients Report</h1>
// //             <p class="date">Generated on: ${new Date().toLocaleDateString('en-IN', { 
// //               year: 'numeric', 
// //               month: 'long', 
// //               day: 'numeric' 
// //             })}</p>
// //             <p><strong>Total Patients: ${filteredPatients.length}</strong></p>
// //           </div>
// //           <table>
// //             <thead>
// //               <tr>
// //                 <th>ID</th>
// //                 <th>Name</th>
// //                 <th>Phone</th>
// //                 <th>Email</th>
// //                 <th>Address</th>
// //                 <th>Created</th>
// //                 <th>Updated</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               ${filteredPatients.map(patient => `
// //                 <tr>
// //                   <td>${patient.id}</td>
// //                   <td>${patient.name}</td>
// //                   <td>${patient.phone}</td>
// //                   <td>${patient.email}</td>
// //                   <td>${patient.address}</td>
// //                   <td>${patient.created_date}</td>
// //                   <td>${patient.updated_date}</td>
// //                 </tr>
// //               `).join('')}
// //             </tbody>
// //           </table>
// //         </body>
// //       </html>
// //     `;

// //     // Open in new window and trigger print
// //     const printWindow = window.open('', '', 'height=600,width=800');
// //     printWindow.document.write(htmlContent);
// //     printWindow.document.close();
// //     printWindow.focus();

// //     setTimeout(() => {
// //       printWindow.print();
// //       setShowExportMenu(false);
// //     }, 250);
// //   };

// //   const handleSort = (key) => {
// //     let direction = 'asc';
// //     if (sortConfig.key === key && sortConfig.direction === 'asc') {
// //       direction = 'desc';
// //     }
// //     setSortConfig({ key, direction });
// //   };

// //   const getSortIcon = (key) => {
// //     if (sortConfig.key !== key) {
// //       return <ChevronsUpDown className="w-4 h-4 text-slate-400" />;
// //     }
// //     return sortConfig.direction === 'asc' ? 
// //       <ChevronUp className="w-4 h-4 text-emerald-600" /> : 
// //       <ChevronDown className="w-4 h-4 text-emerald-600" />;
// //   };

// //   const getPageNumbers = () => {
// //     const pageNumbers = [];
// //     const maxVisible = 5;

// //     if (totalPages <= maxVisible) {
// //       for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
// //     } else {
// //       if (currentPage <= 3) {
// //         for (let i = 1; i <= 4; i++) pageNumbers.push(i);
// //         pageNumbers.push('...');
// //         pageNumbers.push(totalPages);
// //       } else if (currentPage >= totalPages - 2) {
// //         pageNumbers.push(1);
// //         pageNumbers.push('...');
// //         for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
// //       } else {
// //         pageNumbers.push(1);
// //         pageNumbers.push('...');
// //         pageNumbers.push(currentPage - 1);
// //         pageNumbers.push(currentPage);
// //         pageNumbers.push(currentPage + 1);
// //         pageNumbers.push('...');
// //         pageNumbers.push(totalPages);
// //       }
// //     }
// //     return pageNumbers;
// //   };

// //   return (
// //     <div className="p-8">
// //       {/* Header */}
// //       <div className="mb-8">
// //         <div className="flex items-center justify-between mb-4">
// //           <div>
// //             <h1 className="text-4xl font-bold text-slate-800 mb-2">Patients</h1>
// //             <p className="text-slate-600">Manage and view all patient records</p>
// //           </div>
// //           <div className="flex gap-3">
// //             {/* Export Dropdown */}
// //             <div className="relative">
// //               <button 
// //                 onClick={() => setShowExportMenu(!showExportMenu)}
// //                 className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 flex items-center gap-2 text-slate-700 font-medium shadow-sm hover:shadow-md"
// //               >
// //                 <Download className="w-4 h-4" />
// //                 Export
// //                 <ChevronDown className="w-4 h-4" />
// //               </button>

// //               {showExportMenu && (
// //                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 z-10 overflow-hidden">
// //                   <button
// //                     onClick={exportToExcel}
// //                     className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors flex items-center gap-3 text-slate-700"
// //                   >
// //                     <Sheet className="w-4 h-4 text-green-600" />
// //                     <span className="font-medium">Export to Excel</span>
// //                   </button>
// //                   <button
// //                     onClick={exportToPDF}
// //                     className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors flex items-center gap-3 text-slate-700 border-t border-slate-100"
// //                   >
// //                     <FileText className="w-4 h-4 text-red-600" />
// //                     <span className="font-medium">Export to PDF</span>
// //                   </button>
// //                 </div>
// //               )}
// //             </div>

// //             <button className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl">
// //               <Plus className="w-5 h-5" />
// //               Add Patient
// //             </button>
// //           </div>
// //         </div>

// //         {/* Stats */}
// //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
// //           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
// //             <p className="text-sm text-slate-600 mb-1">Total Patients</p>
// //             <p className="text-2xl font-bold text-slate-800">{patients.length}</p>
// //           </div>
// //           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
// //             <p className="text-sm text-slate-600 mb-1">Showing</p>
// //             <p className="text-2xl font-bold text-emerald-600">{currentPatients.length}</p>
// //           </div>
// //           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
// //             <p className="text-sm text-slate-600 mb-1">Current Page</p>
// //             <p className="text-2xl font-bold text-teal-600">{currentPage} / {totalPages}</p>
// //           </div>
// //           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
// //             <p className="text-sm text-slate-600 mb-1">Filtered Results</p>
// //             <p className="text-2xl font-bold text-cyan-600">{filteredPatients.length}</p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Search Bar */}
// //       <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
// //         <div className="flex flex-col lg:flex-row gap-4">
// //           <div className="flex-1 relative">
// //             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
// //             <input
// //               type="text"
// //               placeholder="Search by name, phone, email or address..."
// //               value={searchTerm}
// //               onChange={(e) => {
// //                 setSearchTerm(e.target.value);
// //                 setCurrentPage(1);
// //               }}
// //               className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
// //             />
// //             {searchTerm && (
// //               <button
// //                 onClick={() => setSearchTerm('')}
// //                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
// //               >
// //                 <X className="w-5 h-5" />
// //               </button>
// //             )}
// //           </div>

// //           <div className="flex items-center gap-3">
// //             <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">Show:</label>
// //             <select
// //               value={itemsPerPage}
// //               onChange={(e) => {
// //                 setItemsPerPage(Number(e.target.value));
// //                 setCurrentPage(1);
// //               }}
// //               className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700 font-medium cursor-pointer"
// //             >
// //               <option value={15}>15 per page</option>
// //               <option value={25}>25 per page</option>
// //               <option value={50}>50 per page</option>
// //               <option value={100}>100 per page</option>
// //               <option value={500}>500 per page</option>
// //               <option value={1000}>1000 per page</option>
// //               <option value={patients.length}>All ({patients.length})</option>
// //             </select>
// //           </div>

// //           <button
// //             onClick={() => setShowFilters(!showFilters)}
// //             className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
// //               showFilters ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300' : 'bg-slate-100 text-slate-700 border-2 border-transparent hover:border-slate-300'
// //             }`}
// //           >
// //             <Filter className="w-5 h-5" />
// //             Filters
// //           </button>
// //         </div>
// //       </div>

// //       {/* Table */}
// //       <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
// //         <div className="overflow-x-auto">
// //           <table className="w-full">
// //             <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
// //               <tr>
// //                 <th className="px-6 py-4 text-left">
// //                   <button onClick={() => handleSort('name')} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
// //                     <User className="w-4 h-4" />
// //                     Patient Name
// //                     {getSortIcon('name')}
// //                   </button>
// //                 </th>
// //                 <th className="px-6 py-4 text-left">
// //                   <button onClick={() => handleSort('phone')} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
// //                     <Phone className="w-4 h-4" />
// //                     Phone
// //                     {getSortIcon('phone')}
// //                   </button>
// //                 </th>
// //                 <th className="px-6 py-4 text-left">
// //                   <button onClick={() => handleSort('email')} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
// //                     <Mail className="w-4 h-4" />
// //                     Email
// //                     {getSortIcon('email')}
// //                   </button>
// //                 </th>
// //                 <th className="px-6 py-4 text-left">
// //                   <button onClick={() => handleSort('address')} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
// //                     <MapPin className="w-4 h-4" />
// //                     Address
// //                     {getSortIcon('address')}
// //                   </button>
// //                 </th>
// //                 <th className="px-6 py-4 text-left">
// //                   <button onClick={() => handleSort('created_date')} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
// //                     <Calendar className="w-4 h-4" />
// //                     Created
// //                     {getSortIcon('created_date')}
// //                   </button>
// //                 </th>
// //                 <th className="px-6 py-4 text-left">
// //                   <button onClick={() => handleSort('updated_date')} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
// //                     <Calendar className="w-4 h-4" />
// //                     Updated
// //                     {getSortIcon('updated_date')}
// //                   </button>
// //                 </th>
// //                 <th className="px-6 py-4 text-center">
// //                   <span className="font-semibold text-slate-700">Actions</span>
// //                 </th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-slate-100">
// //               {currentPatients.length > 0 ? (
// //                 currentPatients.map((patient) => (
// //                   <tr key={patient.id} className="hover:bg-emerald-50/50 transition-colors duration-200">
// //                     <td className="px-6 py-4">
// //                       <div className="flex items-center gap-3">
// //                         <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
// //                           {patient.name.charAt(0)}
// //                         </div>
// //                         <span className="font-semibold text-slate-800">{patient.name}</span>
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4 text-slate-600">{patient.phone}</td>
// //                     <td className="px-6 py-4 text-slate-600">{patient.email}</td>
// //                     <td className="px-6 py-4 text-slate-600">{patient.address}</td>
// //                     <td className="px-6 py-4 text-slate-600">{patient.created_date}</td>
// //                     <td className="px-6 py-4 text-slate-600">{patient.updated_date}</td>
// //                     <td className="px-6 py-4">
// //                       <div className="flex items-center justify-center gap-2">
// //                         <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
// //                           <Eye className="w-4 h-4" />
// //                         </button>
// //                         <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit">
// //                           <Edit className="w-4 h-4" />
// //                         </button>
// //                         <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
// //                           <Trash2 className="w-4 h-4" />
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))
// //               ) : (
// //                 <tr>
// //                   <td colSpan={7} className="px-6 py-12 text-center">
// //                     <div className="flex flex-col items-center gap-3">
// //                       <Search className="w-12 h-12 text-slate-300" />
// //                       <p className="text-slate-600 font-medium">No patients found</p>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* Pagination */}
// //         {totalPages > 1 && (
// //           <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
// //             <div className="flex items-center justify-between">
// //               <p className="text-sm text-slate-600">
// //                 Showing <span className="font-semibold text-slate-800">{indexOfFirstItem + 1}</span> to{' '}
// //                 <span className="font-semibold text-slate-800">{Math.min(indexOfLastItem, filteredPatients.length)}</span> of{' '}
// //                 <span className="font-semibold text-slate-800">{filteredPatients.length}</span> results
// //               </p>

// //               <div className="flex items-center gap-2">
// //                 <button
// //                   onClick={() => setCurrentPage(currentPage - 1)}
// //                   disabled={currentPage === 1}
// //                   className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
// //                     currentPage === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'
// //                   }`}
// //                 >
// //                   Previous
// //                 </button>

// //                 <div className="flex items-center gap-1">
// //                   {getPageNumbers().map((pageNum, index) => (
// //                     pageNum === '...' ? (
// //                       <span key={`ellipsis-${index}`} className="px-3 py-2 text-slate-400">...</span>
// //                     ) : (
// //                       <button
// //                         key={pageNum}
// //                         onClick={() => setCurrentPage(pageNum)}
// //                         className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
// //                           currentPage === pageNum ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'
// //                         }`}
// //                       >
// //                         {pageNum}
// //                       </button>
// //                     )
// //                   ))}
// //                 </div>

// //                 <button
// //                   onClick={() => setCurrentPage(currentPage + 1)}
// //                   disabled={currentPage === totalPages}
// //                   className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
// //                     currentPage === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'
// //                   }`}
// //                 >
// //                   Next
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Click outside to close export menu */}
// //       {showExportMenu && (
// //         <div 
// //           className="fixed inset-0 z-0" 
// //           onClick={() => setShowExportMenu(false)}
// //         />
// //       )}
// //     </div>
// //   );
// // }



// 'use client';

// import { useState, useMemo, useEffect } from 'react';
// import {
//   Search, Filter, Download, ChevronDown, ChevronUp, ChevronsUpDown,
//   User, Phone, Mail, MapPin, Calendar, Edit, Trash2, Eye, Plus, X, FileText, Sheet
// } from 'lucide-react';

// import { getPatients, createPatientApi, updatePatientApi, deletePatientApi } from '../../lib/commonApis';

// function Modal({ isOpen, onClose, title, children, size = 'md' }) {
//   if (!isOpen) return null;
//   const sizeClasses = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl' };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
//       <div
//         className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} border border-slate-100 flex flex-col max-h-[90vh]`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100 rounded-t-2xl flex-shrink-0">
//           <h2 className="text-lg font-bold text-slate-800">{title}</h2>
//           <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
//             <X className="w-5 h-5 text-slate-500" />
//           </button>
//         </div>
//         <div className="p-6 overflow-y-auto">{children}</div>
//       </div>
//     </div>
//   );
// }

// // ✅ Single reusable form for Add + Edit
// function PatientForm({ formData, onChange, onSubmit, onCancel, isEdit }) {
//   return (
//     <form onSubmit={onSubmit} className="space-y-4">
//       {[
//         { label: 'Patient Name', name: 'name', type: 'text', placeholder: 'Enter full name' },
//         { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+91 XXXXXXXXXX' },
//         { label: 'Email Address', name: 'email', type: 'email', placeholder: 'email@example.com' },
//       ].map(({ label, name, type, placeholder }) => (
//         <div key={name}>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">{label} *</label>
//           <input
//             type={type}
//             name={name}
//             value={formData[name]}
//             onChange={onChange}
//             onInput={name === 'phone' ? (e) => (e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10)) : undefined}
//             required
//             placeholder={placeholder}
//             className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//           />
//         </div>
//       ))}
//       <div>
//         <label className="block text-sm font-semibold text-slate-700 mb-2">Address *</label>
//         <textarea
//           name="address"
//           value={formData.address}
//           onChange={onChange}
//           required
//           rows="3"
//           placeholder={isEdit ? undefined : 'Enter full address'}
//           className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//         />
//       </div>
//       <div className="flex gap-3 pt-4">
//         <button type="button" onClick={onCancel} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">
//           Cancel
//         </button>
//         <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg">
//           {isEdit ? 'Update Patient' : 'Add Patient'}
//         </button>
//       </div>
//     </form>
//   );
// }

// const EMPTY_FORM = { name: '', email: '', phone: '', address: '', city: '', state: '', country: '', pincode: '' };

// const mapPatient = (item) => ({
//   id: item.id,
//   name: item.name,
//   phone: item.phone,
//   email: item.user?.email || item.email || '-',
//   address: item.address,
//   created_date: item.createdAt.split('T')[0],
//   updated_date: item.updatedAt.split('T')[0],
// });

// export default function PatientsPage() {
//   const [patients, setPatients] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [itemsPerPage, setItemsPerPage] = useState(15);
//   const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
//   const [showExportMenu, setShowExportMenu] = useState(false);

//   // ✅ Unified modal state
//   const [modal, setModal] = useState({ type: null }); // type: 'add' | 'edit' | 'delete' | 'view'
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [formData, setFormData] = useState(EMPTY_FORM);

//   // 1. State changes — in karke pehle waale replace karo
// const [currentPage, setCurrentPage] = useState(1);
// const [totalCount, setTotalCount] = useState(0);
// const ITEMS_PER_PAGE = 10;

//   const openModal = (type, patient = null) => {
//     setSelectedPatient(patient);
//     setFormData(
//       patient && type === 'edit'
//         ? { name: patient.name, phone: patient.phone, email: patient.email, address: patient.address.split(',')[0], city: '', state: '', country: '', pincode: '' }
//         : EMPTY_FORM
//     );
//     setModal({ type });
//   };

//   const closeModal = () => {
//     setModal({ type: null });
//     setSelectedPatient(null);
//     setFormData(EMPTY_FORM);
//   };

//   useEffect(() => {
//      fetchPatients(currentPage);
//     getPatients(10, 1)
//       .then(res => setPatients(res.data.data.map(mapPatient)))
//       .catch(err => console.error(err.message));
//   }, [currentPage]);



// const fetchPatients = async (page) => {
//   try {
//     const res = await getPatients(ITEMS_PER_PAGE, page);
//     setPatients(res.data.data.map(mapPatient));
//     setTotalCount(res.data.meta.total); // ← API se total count lo
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// // 3. refreshPatients bhi update karo
// const refreshPatients = async () => {
//   await fetchPatients(currentPage);
// };

// // 4. Yeh frontend-only calculations hatao (ya sirf search ke liye rakho)
// // totalPages ab backend se calculate hoga:
// const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);


//   // const refreshPatients = async () => {
//   //   const res = await getPatients(10, 1);
//   //   setPatients(res.data.data.map(mapPatient));
//   // };

//   const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (modal.type === 'edit') {
//         await updatePatientApi(selectedPatient.id, formData);
//       } else {
//         await createPatientApi(formData);
//       }
//       await refreshPatients();
//       closeModal();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDeletePatient = async () => {
//     if (!selectedPatient) return;
//     try {
//       await deletePatientApi(selectedPatient.id);
//       setPatients(prev => prev.filter(p => p.id !== selectedPatient.id));
//       closeModal();
//     } catch (error) {
//       alert(error.message || 'Failed to delete patient');
//     }
//   };

//   // Sorting, filtering, pagination — untouched
//   const sortedPatients = useMemo(() => {
//     let list = [...patients];
//     if (sortConfig.key) {
//       list.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
//         if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }
//     return list;
//   }, [patients, sortConfig]);

//   const filteredPatients = useMemo(() =>
//     sortedPatients.filter(p =>
//       p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       p.phone.includes(searchTerm) ||
//       p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       p.address.toLowerCase().includes(searchTerm.toLowerCase())
//     ), [sortedPatients, searchTerm]);

 
// //   const totalPages = totalMeta.totalPages;
// // const totalCount = totalMeta.total;
// const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
// const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalCount);

//   const exportToExcel = () => {
//     const headers = ['ID', 'Name', 'Phone', 'Email', 'Address', 'Created Date', 'Updated Date'];
//     const csvData = [headers.join(','), ...filteredPatients.map(p => `${p.id},"${p.name}","${p.phone}","${p.email}","${p.address}",${p.created_date},${p.updated_date}`)].join('\n');
//     const link = document.createElement('a');
//     link.setAttribute('href', URL.createObjectURL(new Blob([csvData], { type: 'text/csv;charset=utf-8;' })));
//     link.setAttribute('download', `patients_${new Date().toISOString().split('T')[0]}.csv`);
//     document.body.appendChild(link); link.click(); document.body.removeChild(link);
//     setShowExportMenu(false);
//   };

//   const exportToPDF = () => {
//     const htmlContent = `<!DOCTYPE html><html><head><title>Patients Report</title><style>body{font-family:Arial,sans-serif;margin:20px}h1{color:#059669;text-align:center}table{width:100%;border-collapse:collapse;margin-top:20px}th{background-color:#059669;color:white;padding:12px;text-align:left}td{padding:10px;border-bottom:1px solid #ddd}tr:hover{background-color:#f5f5f5}.header{text-align:center;margin-bottom:30px}.date{color:#666;font-size:14px}</style></head><body><div class="header"><h1>MediCare Hospital - Patients Report</h1><p class="date">Generated on: ${new Date().toLocaleDateString('en-IN')}</p><p><strong>Total Patients: ${filteredPatients.length}</strong></p></div><table><thead><tr><th>ID</th><th>Name</th><th>Phone</th><th>Email</th><th>Address</th><th>Created</th><th>Updated</th></tr></thead><tbody>${filteredPatients.map(p => `<tr><td>${p.id}</td><td>${p.name}</td><td>${p.phone}</td><td>${p.email}</td><td>${p.address}</td><td>${p.created_date}</td><td>${p.updated_date}</td></tr>`).join('')}</tbody></table></body></html>`;
//     const w = window.open('', '', 'height=600,width=800');
//     w.document.write(htmlContent); w.document.close(); w.focus();
//     setTimeout(() => { w.print(); setShowExportMenu(false); }, 250);
//   };

//   const handleSort = (key) => setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));

//   const getSortIcon = (key) => {
//     if (sortConfig.key !== key) return <ChevronsUpDown className="w-4 h-4 text-slate-400" />;
//     return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4 text-emerald-600" /> : <ChevronDown className="w-4 h-4 text-emerald-600" />;
//   };

//   const getPageNumbers = () => {
//     const pages = [];
//     if (totalPages <= 5) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
//     else if (currentPage <= 3) { for (let i = 1; i <= 4; i++) pages.push(i); pages.push('...'); pages.push(totalPages); }
//     else if (currentPage >= totalPages - 2) { pages.push(1); pages.push('...'); for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i); }
//     else { pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages); }
//     return pages;
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
//             <div className="relative">
//               <button onClick={() => setShowExportMenu(!showExportMenu)} className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 flex items-center gap-2 text-slate-700 font-medium shadow-sm hover:shadow-md">
//                 <Download className="w-4 h-4" /> Export <ChevronDown className="w-4 h-4" />
//               </button>
//               {showExportMenu && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 z-10 overflow-hidden">
//                   <button onClick={exportToExcel} className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors flex items-center gap-3 text-slate-700">
//                     <Sheet className="w-4 h-4 text-green-600" /><span className="font-medium">Export to Excel</span>
//                   </button>
//                   <button onClick={exportToPDF} className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors flex items-center gap-3 text-slate-700 border-t border-slate-100">
//                     <FileText className="w-4 h-4 text-red-600" /><span className="font-medium">Export to PDF</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//             <button onClick={() => openModal('add')} className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl">
//               <Plus className="w-5 h-5" /> Add Patient
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           {[
//             { label: 'Total Patients', value: patients.length, color: 'text-slate-800' },
//             { label: 'Showing', value: currentPatients.length, color: 'text-emerald-600' },
//             { label: 'Current Page', value: `${currentPage} / ${totalPages}`, color: 'text-teal-600' },
//             { label: 'Filtered Results', value: filteredPatients.length, color: 'text-cyan-600' },
//           ].map(({ label, value, color }) => (
//             <div key={label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//               <p className="text-sm text-slate-600 mb-1">{label}</p>
//               <p className={`text-2xl font-bold ${color}`}>{value}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
//         <div className="flex flex-col lg:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//             <input type="text" placeholder="Search by name, phone, email or address..." value={searchTerm}
//               onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
//               className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//             />
//             {searchTerm && (
//               <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600">
//                 <X className="w-5 h-5" />
//               </button>
//             )}
//           </div>
//           <div className="flex items-center gap-3">
//             <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">Show:</label>
//             <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
//               className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700 font-medium cursor-pointer">
//               <option value={15}>15 per page</option>
//               <option value={25}>25 per page</option>
//               <option value={50}>50 per page</option>
//               <option value={100}>100 per page</option>
//               <option value={patients.length}>All ({patients.length})</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-6">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
//               <tr>
//                 {[
//                   { key: 'name', icon: <User className="w-4 h-4" />, label: 'Patient Name' },
//                   { key: 'phone', icon: <Phone className="w-4 h-4" />, label: 'Phone' },
//                   { key: 'email', icon: <Mail className="w-4 h-4" />, label: 'Email' },
//                   { key: 'address', icon: <MapPin className="w-4 h-4" />, label: 'Address' },
//                   { key: 'created_date', icon: <Calendar className="w-4 h-4" />, label: 'Created' },
//                   { key: 'updated_date', icon: <Calendar className="w-4 h-4" />, label: 'Updated' },
//                 ].map(({ key, icon, label }) => (
//                   <th key={key} className="px-6 py-4 text-left">
//                     <button onClick={() => handleSort(key)} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
//                       {icon} {label} {getSortIcon(key)}
//                     </button>
//                   </th>
//                 ))}
//                 <th className="px-6 py-4 text-center"><span className="font-semibold text-slate-700">Actions</span></th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {currentPatients.length > 0 ? currentPatients.map((patient) => (
//                 <tr key={patient.id} className="hover:bg-emerald-50/50 transition-colors duration-200">
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
//                         {patient.name.charAt(0)}
//                       </div>
//                       <span className="font-semibold text-slate-800">{patient.name}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-slate-600">{patient.phone}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.email}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.address}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.created_date}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.updated_date}</td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center justify-center gap-2">
//                       <button onClick={() => openModal('view', patient)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View"><Eye className="w-4 h-4" /></button>
//                       <button onClick={() => openModal('edit', patient)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
//                       <button onClick={() => openModal('delete', patient)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
//                     </div>
//                   </td>
//                 </tr>
//               )) : (
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
//        {totalPages > 1 && (
//   <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
//     <div className="flex items-center justify-between">
//       <p className="text-sm text-slate-600">
//         Showing <span className="font-semibold text-slate-800">
//           {(currentPage - 1) * ITEMS_PER_PAGE + 1}
//         </span> to{' '}
//         <span className="font-semibold text-slate-800">
//           {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)}
//         </span> of{' '}
//         <span className="font-semibold text-slate-800">{totalCount}</span> results
//       </p>
//       <div className="flex items-center gap-2">
//         <button
//           onClick={() => setCurrentPage(p => p - 1)}
//           disabled={currentPage === 1}
//           className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
//             currentPage === 1
//               ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
//               : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'
//           }`}
//         >
//           Previous
//         </button>
//         <div className="flex items-center gap-1">
//           {getPageNumbers().map((pageNum, index) =>
//             pageNum === '...' ? (
//               <span key={`e-${index}`} className="px-3 py-2 text-slate-400">...</span>
//             ) : (
//               <button
//                 key={pageNum}
//                 onClick={() => setCurrentPage(pageNum)}
//                 className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
//                   currentPage === pageNum
//                     ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
//                     : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'
//                 }`}
//               >
//                 {pageNum}
//               </button>
//             )
//           )}
//         </div>
//         <button
//           onClick={() => setCurrentPage(p => p + 1)}
//           disabled={currentPage === totalPages}
//           className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
//             currentPage === totalPages
//               ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
//               : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   </div>
// )}
//       </div>

//       {/* ✅ Single Add/Edit Modal */}
//       <Modal
//         isOpen={modal.type === 'add' || modal.type === 'edit'}
//         onClose={closeModal}
//         title={modal.type === 'edit' ? 'Edit Patient' : 'Add New Patient'}
//         size="md"
//       >
//         <PatientForm
//           formData={formData}
//           onChange={handleFormChange}
//           onSubmit={handleSubmit}
//           onCancel={closeModal}
//           isEdit={modal.type === 'edit'}
//         />
//       </Modal>

//       {/* Delete Modal */}
//       <Modal isOpen={modal.type === 'delete'} onClose={closeModal} title="Delete Patient" size="sm">
//         <div className="text-center">
//           <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
//             <Trash2 className="h-6 w-6 text-red-600" />
//           </div>
//           <h3 className="text-lg font-semibold text-slate-900 mb-2">Are you sure?</h3>
//           <p className="text-sm text-slate-600 mb-6">
//             Do you really want to delete <span className="font-semibold">{selectedPatient?.name}</span>? This action cannot be undone.
//           </p>
//           <div className="flex gap-3">
//             <button onClick={closeModal} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">Cancel</button>
//             <button onClick={handleDeletePatient} className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold">Delete</button>
//           </div>
//         </div>
//       </Modal>

//       {/* View Modal */}
//       <Modal isOpen={modal.type === 'view'} onClose={closeModal} title="Patient Details" size="md">
//         {selectedPatient && (
//           <div className="space-y-6">
//             <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
//               <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
//                 {selectedPatient.name.charAt(0)}
//               </div>
//               <div>
//                 <h3 className="text-2xl font-bold text-slate-800">{selectedPatient.name}</h3>
//                 <p className="text-slate-600">ID: #{selectedPatient.id}</p>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-6">
//               {[
//                 { label: 'Phone Number', value: selectedPatient.phone },
//                 { label: 'Email Address', value: selectedPatient.email },
//                 { label: 'Address', value: selectedPatient.address, full: true },
//                 { label: 'Created Date', value: selectedPatient.created_date },
//                 { label: 'Updated Date', value: selectedPatient.updated_date },
//               ].map(({ label, value, full }) => (
//                 <div key={label} className={full ? 'col-span-2' : ''}>
//                   <p className="text-sm text-slate-600 mb-1">{label}</p>
//                   <p className="font-semibold text-slate-800">{value}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="flex gap-3 pt-4 border-t border-slate-200">
//               <button onClick={() => { closeModal(); openModal('edit', selectedPatient); }} className="flex-1 px-6 py-3 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors font-semibold">Edit Patient</button>
//               <button onClick={closeModal} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">Close</button>
//             </div>
//           </div>
//         )}
//       </Modal>

//       {showExportMenu && <div className="fixed inset-0 z-0" onClick={() => setShowExportMenu(false)} />}
//     </div>
//   );
// }


// 'use client';

// import { useState, useMemo, useEffect } from 'react';
// import {
//   Search, Filter, Download, ChevronDown, ChevronUp, ChevronsUpDown,
//   User, Phone, Mail, MapPin, Calendar, Edit, Trash2, Eye, Plus, X, FileText, Sheet
// } from 'lucide-react';

// import { getPatients, createPatientApi, updatePatientApi, deletePatientApi } from '../../lib/commonApis';

// function Modal({ isOpen, onClose, title, children, size = 'md' }) {
//   if (!isOpen) return null;
//   const sizeClasses = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl' };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
//       <div
//         className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} border border-slate-100 flex flex-col max-h-[90vh]`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100 rounded-t-2xl flex-shrink-0">
//           <h2 className="text-lg font-bold text-slate-800">{title}</h2>
//           <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
//             <X className="w-5 h-5 text-slate-500" />
//           </button>
//         </div>
//         <div className="p-6 overflow-y-auto">{children}</div>
//       </div>
//     </div>
//   );
// }

// function PatientForm({ formData, onChange, onSubmit, onCancel, isEdit }) {
//   return (
//     <form onSubmit={onSubmit} className="space-y-4">
//       {[
//         { label: 'Patient Name', name: 'name', type: 'text', placeholder: 'Enter full name' },
//         { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+91 XXXXXXXXXX' },
//         { label: 'Email Address', name: 'email', type: 'email', placeholder: 'email@example.com' },
//         { label: 'Age', name: 'age', type: 'text', placeholder: 'i.e: 25 years' },
//         { label: 'Gender', name: 'gender', type: 'text', placeholder: 'Male/Female' },
//       ].map(({ label, name, type, placeholder }) => (
//         <div key={name}>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">{label} *</label>
//           <input
//             type={type}
//             name={name}
//             value={formData[name]}
//             onChange={onChange}
//             onInput={name === 'phone' ? (e) => (e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10)) : undefined}
//             required
//             placeholder={placeholder}
//             className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//           />
//         </div>
//       ))}
//       <div>
//         <label className="block text-sm font-semibold text-slate-700 mb-2">Address *</label>
//         <textarea
//           name="address"
//           value={formData.address}
//           onChange={onChange}
//           required
//           rows="3"
//           placeholder={isEdit ? undefined : 'Enter full address'}
//           className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//         />
//       </div>
//       <div className="flex gap-3 pt-4">
//         <button type="button" onClick={onCancel} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">
//           Cancel
//         </button>
//         <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg">
//           {isEdit ? 'Update Patient' : 'Add Patient'}
//         </button>
//       </div>
//     </form>
//   );
// }

// const EMPTY_FORM = { name: '', email: '',age:'',gender:'', phone: '', address: '', city: '', state: '', country: '', pincode: '' };

// const mapPatient = (item) => ({
//   id: item.id,
//   name: item.name,
//   phone: item.phone,
//   email: item.user?.email || item.email || '-',
//   age:item.age,
//   gender:item.gender,
//   address: item.address,
//   created_date: item.createdAt.split('T')[0],
//   updated_date: item.updatedAt.split('T')[0],
// });

// export default function PatientsPage() {
//   const [patients, setPatients] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [totalMeta, setTotalMeta] = useState({ total: 0, totalPages: 1 });
//   const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
//   const [showExportMenu, setShowExportMenu] = useState(false);

//   const [modal, setModal] = useState({ type: null });
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [formData, setFormData] = useState(EMPTY_FORM);

//   const openModal = (type, patient = null) => {
//     setSelectedPatient(patient);
//     setFormData(
//       patient && type === 'edit'
//         ? { name: patient.name, phone: patient.phone, email: patient.email,age:patient.age,gender:patient.gender, address: patient.address.split(',')[0], city: '', state: '', country: '', pincode: '' }
//         : EMPTY_FORM
//     );
//     setModal({ type });
//   };

//   const closeModal = () => {
//     setModal({ type: null });
//     setSelectedPatient(null);
//     setFormData(EMPTY_FORM);
//   };

//   // ✅ Server-side fetch with page + limit
//   const fetchPatients = async (page = 1, limit = itemsPerPage) => {
//     try {
//       const res = await getPatients(limit, page);
//       setPatients(res.data.data.map(mapPatient));
//       setTotalMeta({
//         total: res.data.meta.total,
//         totalPages: res.data.meta.totalPages,
//       });
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   // ✅ Re-fetch whenever page or limit changes
//   useEffect(() => {
//     fetchPatients(currentPage, itemsPerPage);
//   }, [currentPage, itemsPerPage]);

//   const refreshPatients = () => fetchPatients(currentPage, itemsPerPage);

//   const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (modal.type === 'edit') {
//         await updatePatientApi(selectedPatient.id, formData);
//       } else {
//         await createPatientApi(formData);
//       }
//       await refreshPatients();
//       closeModal();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDeletePatient = async () => {
//     if (!selectedPatient) return;
//     try {
//       await deletePatientApi(selectedPatient.id);
//       await refreshPatients();
//       closeModal();
//     } catch (error) {
//       alert(error.message || 'Failed to delete patient');
//     }
//   };

//   // ✅ Client-side sort on current page data
//   const sortedPatients = useMemo(() => {
//     let list = [...patients];
//     if (sortConfig.key) {
//       list.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
//         if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }
//     return list;
//   }, [patients, sortConfig]);

//   // ✅ Client-side search filter on current page data only
//   const filteredPatients = useMemo(() =>
//     sortedPatients.filter(p =>
//       p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       p.phone.includes(searchTerm) ||
//       p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       p.address.toLowerCase().includes(searchTerm.toLowerCase())
//     ), [sortedPatients, searchTerm]);

//   // ✅ Use server meta for pagination — NO client-side slice
//   const totalPages = totalMeta.totalPages;
//   const totalCount = totalMeta.total;
//   const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
//   const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalCount);

//   const exportToExcel = () => {
//     const headers = ['ID', 'Name', 'Phone', 'Email', 'Address', 'Created Date', 'Updated Date'];
//     const csvData = [headers.join(','), ...filteredPatients.map(p => `${p.id},"${p.name}","${p.phone}","${p.email}","${p.address}",${p.created_date},${p.updated_date}`)].join('\n');
//     const link = document.createElement('a');
//     link.setAttribute('href', URL.createObjectURL(new Blob([csvData], { type: 'text/csv;charset=utf-8;' })));
//     link.setAttribute('download', `patients_${new Date().toISOString().split('T')[0]}.csv`);
//     document.body.appendChild(link); link.click(); document.body.removeChild(link);
//     setShowExportMenu(false);
//   };

//   const exportToPDF = () => {
//     const htmlContent = `<!DOCTYPE html><html><head><title>Patients Report</title><style>body{font-family:Arial,sans-serif;margin:20px}h1{color:#059669;text-align:center}table{width:100%;border-collapse:collapse;margin-top:20px}th{background-color:#059669;color:white;padding:12px;text-align:left}td{padding:10px;border-bottom:1px solid #ddd}tr:hover{background-color:#f5f5f5}.header{text-align:center;margin-bottom:30px}.date{color:#666;font-size:14px}</style></head><body><div class="header"><h1>MediCare Hospital - Patients Report</h1><p class="date">Generated on: ${new Date().toLocaleDateString('en-IN')}</p><p><strong>Total Patients: ${filteredPatients.length}</strong></p></div><table><thead><tr><th>ID</th><th>Name</th><th>Phone</th><th>Email</th><th>Address</th><th>Created</th><th>Updated</th></tr></thead><tbody>${filteredPatients.map(p => `<tr><td>${p.id}</td><td>${p.name}</td><td>${p.phone}</td><td>${p.email}</td><td>${p.address}</td><td>${p.created_date}</td><td>${p.updated_date}</td></tr>`).join('')}</tbody></table></body></html>`;
//     const w = window.open('', '', 'height=600,width=800');
//     w.document.write(htmlContent); w.document.close(); w.focus();
//     setTimeout(() => { w.print(); setShowExportMenu(false); }, 250);
//   };

//   const handleSort = (key) => setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));

//   const getSortIcon = (key) => {
//     if (sortConfig.key !== key) return <ChevronsUpDown className="w-4 h-4 text-slate-400" />;
//     return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4 text-emerald-600" /> : <ChevronDown className="w-4 h-4 text-emerald-600" />;
//   };

//   const getPageNumbers = () => {
//     const pages = [];
//     if (totalPages <= 5) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
//     else if (currentPage <= 3) { for (let i = 1; i <= 4; i++) pages.push(i); pages.push('...'); pages.push(totalPages); }
//     else if (currentPage >= totalPages - 2) { pages.push(1); pages.push('...'); for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i); }
//     else { pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages); }
//     return pages;
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
//             <div className="relative">
//               <button onClick={() => setShowExportMenu(!showExportMenu)} className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 flex items-center gap-2 text-slate-700 font-medium shadow-sm hover:shadow-md">
//                 <Download className="w-4 h-4" /> Export <ChevronDown className="w-4 h-4" />
//               </button>
//               {showExportMenu && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 z-10 overflow-hidden">
//                   <button onClick={exportToExcel} className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors flex items-center gap-3 text-slate-700">
//                     <Sheet className="w-4 h-4 text-green-600" /><span className="font-medium">Export to Excel</span>
//                   </button>
//                   <button onClick={exportToPDF} className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors flex items-center gap-3 text-slate-700 border-t border-slate-100">
//                     <FileText className="w-4 h-4 text-red-600" /><span className="font-medium">Export to PDF</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//             <button onClick={() => openModal('add')} className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl">
//               <Plus className="w-5 h-5" /> Add Patient
//             </button>
//           </div>
//         </div>

//         {/* Stats — using server meta */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           {[
//             { label: 'Total Patients', value: totalMeta.total, color: 'text-slate-800' },
//             { label: 'Showing', value: filteredPatients.length, color: 'text-emerald-600' },
//             { label: 'Current Page', value: `${currentPage} / ${totalPages}`, color: 'text-teal-600' },
//             { label: 'Filtered Results', value: filteredPatients.length, color: 'text-cyan-600' },
//           ].map(({ label, value, color }) => (
//             <div key={label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//               <p className="text-sm text-slate-600 mb-1">{label}</p>
//               <p className={`text-2xl font-bold ${color}`}>{value}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
//         <div className="flex flex-col lg:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//             <input type="text" placeholder="Search by name, phone, email or address..." value={searchTerm}
//               onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
//               className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//             />
//             {searchTerm && (
//               <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600">
//                 <X className="w-5 h-5" />
//               </button>
//             )}
//           </div>
//           <div className="flex items-center gap-3">
//             <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">Show:</label>
//             <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
//               className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700 font-medium cursor-pointer">
//               <option value={10}>10 per page</option>
//               <option value={25}>25 per page</option>
//               <option value={50}>50 per page</option>
//               <option value={100}>100 per page</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-6">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
//               <tr>
//                 {[
//                   { key: 'name', icon: <User className="w-4 h-4" />, label: 'Patient Name' },
//                   { key: 'phone', icon: <Phone className="w-4 h-4" />, label: 'Phone' },
//                   { key: 'email', icon: <Mail className="w-4 h-4" />, label: 'Email' },
//                   { key: 'address', icon: <MapPin className="w-4 h-4" />, label: 'Address' },
//                   { key: 'created_date', icon: <Calendar className="w-4 h-4" />, label: 'Created' },
//                   { key: 'updated_date', icon: <Calendar className="w-4 h-4" />, label: 'Updated' },
//                 ].map(({ key, icon, label }) => (
//                   <th key={key} className="px-6 py-4 text-left">
//                     <button onClick={() => handleSort(key)} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
//                       {icon} {label} {getSortIcon(key)}
//                     </button>
//                   </th>
//                 ))}
//                 <th className="px-6 py-4 text-center"><span className="font-semibold text-slate-700">Actions</span></th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {/* ✅ filteredPatients directly — no slice */}
//               {filteredPatients.length > 0 ? filteredPatients.map((patient) => (
//                 <tr key={patient.id} className="hover:bg-emerald-50/50 transition-colors duration-200">
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
//                         {patient.name.charAt(0)}
//                       </div>
//                       <span className="font-semibold text-slate-800">{patient.name}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-slate-600">{patient.phone}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.email}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.address}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.created_date}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.updated_date}</td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center justify-center gap-2">
//                       <button onClick={() => openModal('view', patient)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View"><Eye className="w-4 h-4" /></button>
//                       <button onClick={() => openModal('edit', patient)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
//                       <button onClick={() => openModal('delete', patient)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
//                     </div>
//                   </td>
//                 </tr>
//               )) : (
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

//         {/* ✅ Pagination using server meta */}
//         {totalPages > 1 && (
//           <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
//             <div className="flex items-center justify-between">
//               <p className="text-sm text-slate-600">
//                 Showing <span className="font-semibold text-slate-800">{indexOfFirstItem}</span> to{' '}
//                 <span className="font-semibold text-slate-800">{indexOfLastItem}</span> of{' '}
//                 <span className="font-semibold text-slate-800">{totalCount}</span> results
//               </p>
//               <div className="flex items-center gap-2">
//                 <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}
//                   className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
//                   Previous
//                 </button>
//                 <div className="flex items-center gap-1">
//                   {getPageNumbers().map((pageNum, index) =>
//                     pageNum === '...' ? (
//                       <span key={`e-${index}`} className="px-3 py-2 text-slate-400">...</span>
//                     ) : (
//                       <button key={pageNum} onClick={() => setCurrentPage(pageNum)}
//                         className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === pageNum ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
//                         {pageNum}
//                       </button>
//                     )
//                   )}
//                 </div>
//                 <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}
//                   className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Add / Edit Modal */}
//       <Modal
//         isOpen={modal.type === 'add' || modal.type === 'edit'}
//         onClose={closeModal}
//         title={modal.type === 'edit' ? 'Edit Patient' : 'Add New Patient'}
//         size="md"
//       >
//         <PatientForm
//           formData={formData}
//           onChange={handleFormChange}
//           onSubmit={handleSubmit}
//           onCancel={closeModal}
//           isEdit={modal.type === 'edit'}
//         />
//       </Modal>

//       {/* Delete Modal */}
//       <Modal isOpen={modal.type === 'delete'} onClose={closeModal} title="Delete Patient" size="sm">
//         <div className="text-center">
//           <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
//             <Trash2 className="h-6 w-6 text-red-600" />
//           </div>
//           <h3 className="text-lg font-semibold text-slate-900 mb-2">Are you sure?</h3>
//           <p className="text-sm text-slate-600 mb-6">
//             Do you really want to delete <span className="font-semibold">{selectedPatient?.name}</span>? This action cannot be undone.
//           </p>
//           <div className="flex gap-3">
//             <button onClick={closeModal} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">Cancel</button>
//             <button onClick={handleDeletePatient} className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold">Delete</button>
//           </div>
//         </div>
//       </Modal>

//       {/* View Modal */}
//       <Modal isOpen={modal.type === 'view'} onClose={closeModal} title="Patient Details" size="md">
//         {selectedPatient && (
//           <div className="space-y-6">
//             <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
//               <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
//                 {selectedPatient.name.charAt(0)}
//               </div>
//               <div>
//                 <h3 className="text-2xl font-bold text-slate-800">{selectedPatient.name}</h3>
//                 <p className="text-slate-600">ID: #{selectedPatient.id}</p>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-6">
//               {[
//                 { label: 'Phone Number', value: selectedPatient.phone },
//                 { label: 'Email Address', value: selectedPatient.email },
//                 { label: 'Address', value: selectedPatient.address, full: true },
//                 { label: 'Created Date', value: selectedPatient.created_date },
//                 { label: 'Updated Date', value: selectedPatient.updated_date },
//               ].map(({ label, value, full }) => (
//                 <div key={label} className={full ? 'col-span-2' : ''}>
//                   <p className="text-sm text-slate-600 mb-1">{label}</p>
//                   <p className="font-semibold text-slate-800">{value}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="flex gap-3 pt-4 border-t border-slate-200">
//               <button onClick={() => { closeModal(); openModal('edit', selectedPatient); }} className="flex-1 px-6 py-3 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors font-semibold">Edit Patient</button>
//               <button onClick={closeModal} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">Close</button>
//             </div>
//           </div>
//         )}
//       </Modal>

//       {showExportMenu && <div className="fixed inset-0 z-0" onClick={() => setShowExportMenu(false)} />}
//     </div>
//   );
// }









// 'use client';

// import { useState, useMemo, useEffect } from 'react';
// import {
//   Search, Filter, Download, ChevronDown, ChevronUp, ChevronsUpDown,
//   User, Phone, Mail, MapPin, Calendar, Edit, Trash2, Eye, Plus, X, FileText, Sheet
// } from 'lucide-react';

// import { getPatients, createPatientApi, updatePatientApi, deletePatientApi } from '../../lib/commonApis';

// function Modal({ isOpen, onClose, title, children, size = 'md' }) {
//   if (!isOpen) return null;
//   const sizeClasses = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl' };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
//       <div
//         className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} border border-slate-100 flex flex-col max-h-[90vh]`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100 rounded-t-2xl flex-shrink-0">
//           <h2 className="text-lg font-bold text-slate-800">{title}</h2>
//           <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
//             <X className="w-5 h-5 text-slate-500" />
//           </button>
//         </div>
//         <div className="p-6 overflow-y-auto">{children}</div>
//       </div>
//     </div>
//   );
// }

// function GenderDropdown({ value, onChange }) {
//   const [open, setOpen] = useState(false);
//   const options = ['Male', 'Female', 'Transgender'];

//   const handleSelect = (opt) => {
//     onChange({ target: { name: 'gender', value: opt } });
//     setOpen(false);
//   };

//   return (
//     <div className="relative">
//       <button
//         type="button"
//         onClick={() => setOpen(!open)}
//         className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl text-left flex items-center justify-between transition-all duration-300 ${
//           open ? 'border-emerald-500 bg-white' : 'border-transparent hover:border-emerald-200'
//         } text-slate-700`}
//       >
//         <span className={value ? 'text-slate-700' : 'text-slate-400'}>
//           {value || 'Select Gender'}
//         </span>
//         <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180 text-emerald-600' : ''}`} />
//       </button>
//       {open && (
//         <div className="absolute z-20 w-full mt-1 bg-white border border-emerald-100 rounded-xl shadow-xl overflow-hidden">
//           {options.map((opt) => (
//             <button
//               key={opt}
//               type="button"
//               onClick={() => handleSelect(opt)}
//               className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors duration-150 flex items-center gap-2 ${
//                 value === opt
//                   ? 'bg-emerald-500 text-white'
//                   : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
//               }`}
//             >
//               {value === opt && <span className="w-2 h-2 rounded-full bg-white inline-block" />}
//               {opt}
//             </button>
//           ))}
//         </div>
//       )}
//       {/* hidden native input for form required validation */}
//       <input type="text" name="gender" value={value} onChange={() => {}} required className="sr-only" />
//     </div>
//   );
// }

// function PatientForm({ formData, onChange, onSubmit, onCancel, isEdit }) {
//   // Age handler — only numeric, max 3 digits, 1-120
//   const handleAgeInput = (e) => {
//     const val = e.target.value.replace(/\D/g, '').slice(0, 3);
//     onChange({ target: { name: 'age', value: val } });
//   };

//   return (
//     <form onSubmit={onSubmit} className="space-y-4">
//       {/* Row 1: Name + Phone */}
//       <div className="grid grid-cols-2 gap-4">
//         {[
//           { label: 'Patient Name', name: 'name', type: 'text', placeholder: 'Enter full name' },
//           { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+91 XXXXXXXXXX' },
//         ].map(({ label, name, type, placeholder }) => (
//           <div key={name}>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">{label} *</label>
//             <input
//               type={type}
//               name={name}
//               value={formData[name]}
//               onChange={onChange}
//               onInput={name === 'phone' ? (e) => (e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10)) : undefined}
//               required
//               placeholder={placeholder}
//               className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Row 2: Email + Age (numeric) */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={onChange}
//             required
//             placeholder="email@example.com"
//             className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">Age *</label>
//           <input
//             type="number"
//             name="age"
//             value={formData.age}
//             onChange={handleAgeInput}
//             required
//             min={1}
//             max={120}
//             placeholder="e.g. 25"
//             className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//           />
//         </div>
//       </div>

//       {/* Row 3: Gender dropdown (half width) */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">Gender *</label>
//           <GenderDropdown value={formData.gender} onChange={onChange} />
//         </div>
//         <div />
//       </div>

//       {/* Address — full width */}
//       <div>
//         <label className="block text-sm font-semibold text-slate-700 mb-2">Address *</label>
//         <textarea
//           name="address"
//           value={formData.address}
//           onChange={onChange}
//           required
//           rows="3"
//           placeholder={isEdit ? undefined : 'Enter full address'}
//           className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//         />
//       </div>

//       <div className="flex gap-3 pt-4">
//         <button type="button" onClick={onCancel} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">
//           Cancel
//         </button>
//         <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg">
//           {isEdit ? 'Update Patient' : 'Add Patient'}
//         </button>
//       </div>
//     </form>
//   );
// }

// const EMPTY_FORM = { name: '', email: '', age: '', gender: '', phone: '', address: '', city: '', state: '', country: '', pincode: '' };

// const mapPatient = (item) => ({
//   id: item.id,
//   name: item.name,
//   phone: item.phone,
//   email: item.user?.email || item.email || '-',
//   age: item.age,
//   gender: item.gender,
//   address: item.address,
//   created_date: item.createdAt.split('T')[0],
//   updated_date: item.updatedAt.split('T')[0],
// });

// export default function PatientsPage() {
//   const [patients, setPatients] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [totalMeta, setTotalMeta] = useState({ total: 0, totalPages: 1 });
//   const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
//   const [showExportMenu, setShowExportMenu] = useState(false);

//   const [modal, setModal] = useState({ type: null });
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [formData, setFormData] = useState(EMPTY_FORM);

//   const openModal = (type, patient = null) => {
//     setSelectedPatient(patient);
//     setFormData(
//       patient && type === 'edit'
//         ? {
//             name: patient.name,
//             phone: patient.phone,
//             email: patient.email,
//             age: patient.age != null ? String(patient.age) : '',
//             gender: patient.gender || '',
//             address: patient.address.split(',')[0],
//             city: '', state: '', country: '', pincode: '',
//           }
//         : EMPTY_FORM
//     );
//     setModal({ type });
//   };

//   const closeModal = () => {
//     setModal({ type: null });
//     setSelectedPatient(null);
//     setFormData(EMPTY_FORM);
//   };

//   const fetchPatients = async (page = 1, limit = itemsPerPage) => {
//     try {
//       const res = await getPatients(limit, page);
//       setPatients(res.data.data.map(mapPatient));
//       setTotalMeta({
//         total: res.data.meta.total,
//         totalPages: res.data.meta.totalPages,
//       });
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchPatients(currentPage, itemsPerPage);
//   }, [currentPage, itemsPerPage]);

//   const refreshPatients = () => fetchPatients(currentPage, itemsPerPage);

//   const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // age as Number for DB, gender stays string
//       const payload = { ...formData, age: formData.age !== '' ? Number(formData.age) : null };
//       if (modal.type === 'edit') {
//         await updatePatientApi(selectedPatient.id, payload);
//       } else {
//         await createPatientApi(payload);
//       }
//       await refreshPatients();
//       closeModal();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDeletePatient = async () => {
//     if (!selectedPatient) return;
//     try {
//       await deletePatientApi(selectedPatient.id);
//       await refreshPatients();
//       closeModal();
//     } catch (error) {
//       alert(error.message || 'Failed to delete patient');
//     }
//   };

//   const sortedPatients = useMemo(() => {
//     let list = [...patients];
//     if (sortConfig.key) {
//       list.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
//         if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }
//     return list;
//   }, [patients, sortConfig]);

//   const filteredPatients = useMemo(() =>
//     sortedPatients.filter(p =>
//       p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       p.phone.includes(searchTerm) ||
//       p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       p.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (p.age && String(p.age).includes(searchTerm)) ||
//       (p.gender && p.gender.toLowerCase().includes(searchTerm.toLowerCase()))
//     ), [sortedPatients, searchTerm]);

//   const totalPages = totalMeta.totalPages;
//   const totalCount = totalMeta.total;
//   const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
//   const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalCount);

//   // ── Export: CSV now includes Age & Gender ──
//   const exportToExcel = () => {
//     const headers = ['ID', 'Name', 'Phone', 'Email', 'Age', 'Gender', 'Address', 'Created Date', 'Updated Date'];
//     const csvData = [
//       headers.join(','),
//       ...filteredPatients.map(p =>
//         `${p.id},"${p.name}","${p.phone}","${p.email}","${p.age || '-'}","${p.gender || '-'}","${p.address}",${p.created_date},${p.updated_date}`
//       ),
//     ].join('\n');
//     const link = document.createElement('a');
//     link.setAttribute('href', URL.createObjectURL(new Blob([csvData], { type: 'text/csv;charset=utf-8;' })));
//     link.setAttribute('download', `patients_${new Date().toISOString().split('T')[0]}.csv`);
//     document.body.appendChild(link); link.click(); document.body.removeChild(link);
//     setShowExportMenu(false);
//   };

//   // ── Export: PDF now includes Age & Gender columns ──
//   const exportToPDF = () => {
//     const htmlContent = `<!DOCTYPE html><html><head><title>Patients Report</title><style>
//       body{font-family:Arial,sans-serif;margin:20px}
//       h1{color:#059669;text-align:center}
//       table{width:100%;border-collapse:collapse;margin-top:20px}
//       th{background-color:#059669;color:white;padding:10px;text-align:left;font-size:13px}
//       td{padding:9px;border-bottom:1px solid #ddd;font-size:13px}
//       tr:hover{background-color:#f5f5f5}
//       .header{text-align:center;margin-bottom:30px}
//       .date{color:#666;font-size:14px}
//     </style></head><body>
//       <div class="header">
//         <h1>MediCare Hospital - Patients Report</h1>
//         <p class="date">Generated on: ${new Date().toLocaleDateString('en-IN')}</p>
//         <p><strong>Total Patients: ${filteredPatients.length}</strong></p>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th><th>Name</th><th>Phone</th><th>Email</th>
//             <th>Age</th><th>Gender</th><th>Address</th><th>Created</th><th>Updated</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${filteredPatients.map(p => `
//             <tr>
//               <td>${p.id}</td>
//               <td>${p.name}</td>
//               <td>${p.phone}</td>
//               <td>${p.email}</td>
//               <td>${p.age || '-'}</td>
//               <td>${p.gender || '-'}</td>
//               <td>${p.address}</td>
//               <td>${p.created_date}</td>
//               <td>${p.updated_date}</td>
//             </tr>`).join('')}
//         </tbody>
//       </table>
//     </body></html>`;
//     const w = window.open('', '', 'height=600,width=900');
//     w.document.write(htmlContent); w.document.close(); w.focus();
//     setTimeout(() => { w.print(); setShowExportMenu(false); }, 250);
//   };

//   const handleSort = (key) => setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));

//   const getSortIcon = (key) => {
//     if (sortConfig.key !== key) return <ChevronsUpDown className="w-4 h-4 text-slate-400" />;
//     return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4 text-emerald-600" /> : <ChevronDown className="w-4 h-4 text-emerald-600" />;
//   };

//   const getPageNumbers = () => {
//     const pages = [];
//     if (totalPages <= 5) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
//     else if (currentPage <= 3) { for (let i = 1; i <= 4; i++) pages.push(i); pages.push('...'); pages.push(totalPages); }
//     else if (currentPage >= totalPages - 2) { pages.push(1); pages.push('...'); for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i); }
//     else { pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages); }
//     return pages;
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
//             <div className="relative">
//               <button onClick={() => setShowExportMenu(!showExportMenu)} className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 flex items-center gap-2 text-slate-700 font-medium shadow-sm hover:shadow-md">
//                 <Download className="w-4 h-4" /> Export <ChevronDown className="w-4 h-4" />
//               </button>
//               {showExportMenu && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 z-10 overflow-hidden">
//                   <button onClick={exportToExcel} className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors flex items-center gap-3 text-slate-700">
//                     <Sheet className="w-4 h-4 text-green-600" /><span className="font-medium">Export to Excel</span>
//                   </button>
//                   <button onClick={exportToPDF} className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors flex items-center gap-3 text-slate-700 border-t border-slate-100">
//                     <FileText className="w-4 h-4 text-red-600" /><span className="font-medium">Export to PDF</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//             <button onClick={() => openModal('add')} className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl">
//               <Plus className="w-5 h-5" /> Add Patient
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           {[
//             { label: 'Total Patients', value: totalMeta.total, color: 'text-slate-800' },
//             { label: 'Showing', value: filteredPatients.length, color: 'text-emerald-600' },
//             { label: 'Current Page', value: `${currentPage} / ${totalPages}`, color: 'text-teal-600' },
//             { label: 'Filtered Results', value: filteredPatients.length, color: 'text-cyan-600' },
//           ].map(({ label, value, color }) => (
//             <div key={label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//               <p className="text-sm text-slate-600 mb-1">{label}</p>
//               <p className={`text-2xl font-bold ${color}`}>{value}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
//         <div className="flex flex-col lg:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//             <input type="text" placeholder="Search by name, phone, email, age, gender or address..." value={searchTerm}
//               onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
//               className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//             />
//             {searchTerm && (
//               <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600">
//                 <X className="w-5 h-5" />
//               </button>
//             )}
//           </div>
//           <div className="flex items-center gap-3">
//             <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">Show:</label>
//             <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
//               className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700 font-medium cursor-pointer">
//               <option value={10}>10 per page</option>
//               <option value={25}>25 per page</option>
//               <option value={50}>50 per page</option>
//               <option value={100}>100 per page</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Table — Age & Gender columns added */}
//       <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-6">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
//               <tr>
//                 {[
//                   { key: 'name', icon: <User className="w-4 h-4" />, label: 'Patient Name' },
//                   { key: 'phone', icon: <Phone className="w-4 h-4" />, label: 'Phone' },
//                   { key: 'email', icon: <Mail className="w-4 h-4" />, label: 'Email' },
//                   { key: 'age', icon: <User className="w-4 h-4" />, label: 'Age' },
//                   { key: 'gender', icon: <User className="w-4 h-4" />, label: 'Gender' },
//                   { key: 'address', icon: <MapPin className="w-4 h-4" />, label: 'Address' },
//                   { key: 'created_date', icon: <Calendar className="w-4 h-4" />, label: 'Created' },
//                   { key: 'updated_date', icon: <Calendar className="w-4 h-4" />, label: 'Updated' },
//                 ].map(({ key, icon, label }) => (
//                   <th key={key} className="px-6 py-4 text-left">
//                     <button onClick={() => handleSort(key)} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
//                       {icon} {label} {getSortIcon(key)}
//                     </button>
//                   </th>
//                 ))}
//                 <th className="px-6 py-4 text-center"><span className="font-semibold text-slate-700">Actions</span></th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {filteredPatients.length > 0 ? filteredPatients.map((patient) => (
//                 <tr key={patient.id} className="hover:bg-emerald-50/50 transition-colors duration-200">
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
//                         {patient.name.charAt(0)}
//                       </div>
//                       <span className="font-semibold text-slate-800">{patient.name}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-slate-600">{patient.phone}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.email}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.age || '-'}</td>
//                   <td className="px-6 py-4 text-slate-600">
//                     {patient.gender ? (
//                       <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
//                         patient.gender.toLowerCase() === 'male'
//                           ? 'bg-blue-100 text-blue-700'
//                           : patient.gender.toLowerCase() === 'female'
//                           ? 'bg-pink-100 text-pink-700'
//                           : 'bg-slate-100 text-slate-600'
//                       }`}>
//                         {patient.gender}
//                       </span>
//                     ) : '-'}
//                   </td>
//                   <td className="px-6 py-4 text-slate-600">{patient.address}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.created_date}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.updated_date}</td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center justify-center gap-2">
//                       <button onClick={() => openModal('view', patient)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View"><Eye className="w-4 h-4" /></button>
//                       <button onClick={() => openModal('edit', patient)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
//                       <button onClick={() => openModal('delete', patient)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
//                     </div>
//                   </td>
//                 </tr>
//               )) : (
//                 <tr>
//                   <td colSpan={9} className="px-6 py-12 text-center">
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
//                 Showing <span className="font-semibold text-slate-800">{indexOfFirstItem}</span> to{' '}
//                 <span className="font-semibold text-slate-800">{indexOfLastItem}</span> of{' '}
//                 <span className="font-semibold text-slate-800">{totalCount}</span> results
//               </p>
//               <div className="flex items-center gap-2">
//                 <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}
//                   className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
//                   Previous
//                 </button>
//                 <div className="flex items-center gap-1">
//                   {getPageNumbers().map((pageNum, index) =>
//                     pageNum === '...' ? (
//                       <span key={`e-${index}`} className="px-3 py-2 text-slate-400">...</span>
//                     ) : (
//                       <button key={pageNum} onClick={() => setCurrentPage(pageNum)}
//                         className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === pageNum ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
//                         {pageNum}
//                       </button>
//                     )
//                   )}
//                 </div>
//                 <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}
//                   className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Add / Edit Modal */}
//       <Modal
//         isOpen={modal.type === 'add' || modal.type === 'edit'}
//         onClose={closeModal}
//         title={modal.type === 'edit' ? 'Edit Patient' : 'Add New Patient'}
//         size="md"
//       >
//         <PatientForm
//           formData={formData}
//           onChange={handleFormChange}
//           onSubmit={handleSubmit}
//           onCancel={closeModal}
//           isEdit={modal.type === 'edit'}
//         />
//       </Modal>

//       {/* Delete Modal */}
//       <Modal isOpen={modal.type === 'delete'} onClose={closeModal} title="Delete Patient" size="sm">
//         <div className="text-center">
//           <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
//             <Trash2 className="h-6 w-6 text-red-600" />
//           </div>
//           <h3 className="text-lg font-semibold text-slate-900 mb-2">Are you sure?</h3>
//           <p className="text-sm text-slate-600 mb-6">
//             Do you really want to delete <span className="font-semibold">{selectedPatient?.name}</span>? This action cannot be undone.
//           </p>
//           <div className="flex gap-3">
//             <button onClick={closeModal} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">Cancel</button>
//             <button onClick={handleDeletePatient} className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold">Delete</button>
//           </div>
//         </div>
//       </Modal>

//       {/* View Modal — Age & Gender added in 2-col grid */}
//       <Modal isOpen={modal.type === 'view'} onClose={closeModal} title="Patient Details" size="md">
//         {selectedPatient && (
//           <div className="space-y-6">
//             <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
//               <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
//                 {selectedPatient.name.charAt(0)}
//               </div>
//               <div>
//                 <h3 className="text-2xl font-bold text-slate-800">{selectedPatient.name}</h3>
//                 <p className="text-slate-600">ID: #{selectedPatient.id}</p>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-6">
//               {[
//                 { label: 'Phone Number', value: selectedPatient.phone },
//                 { label: 'Email Address', value: selectedPatient.email },
//                 { label: 'Age', value: selectedPatient.age || '-' },
//                 { label: 'Gender', value: selectedPatient.gender || '-' },
//                 { label: 'Address', value: selectedPatient.address, full: true },
//                 { label: 'Created Date', value: selectedPatient.created_date },
//                 { label: 'Updated Date', value: selectedPatient.updated_date },
//               ].map(({ label, value, full }) => (
//                 <div key={label} className={full ? 'col-span-2' : ''}>
//                   <p className="text-sm text-slate-600 mb-1">{label}</p>
//                   <p className="font-semibold text-slate-800">{value}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="flex gap-3 pt-4 border-t border-slate-200">
//               <button onClick={() => { closeModal(); openModal('edit', selectedPatient); }} className="flex-1 px-6 py-3 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors font-semibold">Edit Patient</button>
//               <button onClick={closeModal} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">Close</button>
//             </div>
//           </div>
//         )}
//       </Modal>

//       {showExportMenu && <div className="fixed inset-0 z-0" onClick={() => setShowExportMenu(false)} />}
//     </div>
//   );
// }






'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Search, Filter, Download, ChevronDown, ChevronUp, ChevronsUpDown,
  User, Phone, Mail, MapPin, Calendar, Edit, Trash2, Eye, Plus, X, FileText, Sheet
} from 'lucide-react';

import { getPatients, createPatientApi, updatePatientApi, deletePatientApi } from '../../lib/commonApis';

function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null;
  const sizeClasses = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} border border-slate-100 flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100 rounded-t-2xl flex-shrink-0">
          <h2 className="text-lg font-bold text-slate-800">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function GenderDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const options = ['MALE', 'FEMALE', 'OTHER'];

  const handleSelect = (opt) => {
    onChange({ target: { name: 'gender', value: opt } });
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl text-left flex items-center justify-between transition-all duration-300 ${
          open ? 'border-emerald-500 bg-white' : 'border-transparent hover:border-emerald-200'
        } text-slate-700`}
      >
        <span className={value ? 'text-slate-700' : 'text-slate-400'}>
          {value || 'Select Gender'}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180 text-emerald-600' : ''}`} />
      </button>
      {open && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-emerald-100 rounded-xl shadow-xl overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => handleSelect(opt)}
              className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors duration-150 flex items-center gap-2 ${
                value === opt
                  ? 'bg-emerald-500 text-white'
                  : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              {value === opt && <span className="w-2 h-2 rounded-full bg-white inline-block" />}
              {opt}
            </button>
          ))}
        </div>
      )}
      {/* hidden native input for form required validation */}
      <input type="text" name="gender" value={value} onChange={() => {}} required className="sr-only" />
    </div>
  );
}

function PatientForm({ formData, onChange, onSubmit, onCancel, isEdit }) {
  // Age handler — only numeric, max 3 digits, 1-120
  const handleAgeInput = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 3);
    onChange({ target: { name: 'age', value: val } });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Row 1: Name + Phone */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Patient Name', name: 'name', type: 'text', placeholder: 'Enter full name' },
          { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+91 XXXXXXXXXX' },
        ].map(({ label, name, type, placeholder }) => (
          <div key={name}>
            <label className="block text-sm font-semibold text-slate-700 mb-2">{label} *</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={onChange}
              onInput={name === 'phone' ? (e) => (e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10)) : undefined}
              required
              placeholder={placeholder}
              className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
            />
          </div>
        ))}
      </div>

      {/* Row 2: Email + Age (numeric) */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
            placeholder="email@example.com"
            className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Age *</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleAgeInput}
            required
            min={1}
            max={120}
            placeholder="e.g. 25"
            className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
          />
        </div>
      </div>

      {/* Row 3: Gender dropdown (half width) */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Gender *</label>
          <GenderDropdown value={formData.gender} onChange={onChange} />
        </div>
        <div />
      </div>

      {/* Address — full width */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Address *</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={onChange}
          required
          rows="2"
          placeholder="Enter full address"
          className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
        />
      </div>

      {/* Row 4: City + Pincode */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
          <input type="text" name="city" value={formData.city} onChange={onChange} placeholder="e.g. Bengaluru"
            className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Pincode</label>
          <input type="text" name="pincode" value={formData.pincode} onChange={onChange} placeholder="e.g. 560001"
            onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
        </div>
      </div>

      {/* Row 5: State + Country */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">State</label>
          <input type="text" name="state" value={formData.state} onChange={onChange} placeholder="e.g. Karnataka"
            className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Country</label>
          <input type="text" name="country" value={formData.country} onChange={onChange} placeholder="e.g. India"
            className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button type="button" onClick={onCancel} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">
          Cancel
        </button>
        <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg">
          {isEdit ? 'Update Patient' : 'Add Patient'}
        </button>
      </div>
    </form>
  );
}

const EMPTY_FORM = { name: '', email: '', age: '', gender: '', phone: '', address: '', city: '', state: '', country: '', pincode: '' };

const mapPatient = (item) => ({
  id: item.id,
  name: item.name,
  phone: item.phone,
  email: item.user?.email || item.email || '-',
  age: item.age,
  gender: item.gender,
  address: item.address || '-',
  city: item.city || '-',
  state: item.state || '-',
  country: item.country || '-',
  pincode: item.pincode || '-',
  created_date: item.createdAt.split('T')[0],
  updated_date: item.updatedAt.split('T')[0],
});

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalMeta, setTotalMeta] = useState({ total: 0, totalPages: 1 });
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [showExportMenu, setShowExportMenu] = useState(false);

  const [modal, setModal] = useState({ type: null });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const openModal = (type, patient = null) => {
    setSelectedPatient(patient);
    setFormData(
      patient && type === 'edit'
        ? {
            name: patient.name,
            phone: patient.phone,
            email: patient.email,
            age: patient.age != null ? String(patient.age) : '',
            gender: patient.gender || '',
            address: patient.address === '-' ? '' : patient.address,
            city:    patient.city    === '-' ? '' : (patient.city    || ''),
            state:   patient.state   === '-' ? '' : (patient.state   || ''),
            country: patient.country === '-' ? '' : (patient.country || ''),
            pincode: patient.pincode === '-' ? '' : (patient.pincode || ''),
          }
        : EMPTY_FORM
    );
    setModal({ type });
  };

  const closeModal = () => {
    setModal({ type: null });
    setSelectedPatient(null);
    setFormData(EMPTY_FORM);
  };

  const fetchPatients = async (page = 1, limit = itemsPerPage) => {
    try {
      const res = await getPatients(limit, page);
      setPatients(res.data.data.map(mapPatient));
      setTotalMeta({
        total: res.data.meta.total,
        totalPages: res.data.meta.totalPages,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchPatients(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const refreshPatients = () => fetchPatients(currentPage, itemsPerPage);

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // age as Number for DB, gender stays string
      const payload = {
        ...formData,
        age: formData.age !== '' ? Number(formData.age) : null,
        gender: formData.gender || null,
      };
      if (modal.type === 'edit') {
        await updatePatientApi(selectedPatient.id, payload);
      } else {
        await createPatientApi(payload);
      }
      await refreshPatients();
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePatient = async () => {
    if (!selectedPatient) return;
    try {
      await deletePatientApi(selectedPatient.id);
      await refreshPatients();
      closeModal();
    } catch (error) {
      alert(error.message || 'Failed to delete patient');
    }
  };

  const sortedPatients = useMemo(() => {
    let list = [...patients];
    if (sortConfig.key) {
      list.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return list;
  }, [patients, sortConfig]);

  const filteredPatients = useMemo(() =>
    sortedPatients.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.age && String(p.age).includes(searchTerm)) ||
      (p.gender && p.gender.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [sortedPatients, searchTerm]);

  const totalPages = totalMeta.totalPages;
  const totalCount = totalMeta.total;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
  const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalCount);

  // ── Export: CSV now includes Age & Gender ──
  const exportToExcel = () => {
    const headers = ['ID', 'Name', 'Phone', 'Email', 'Age', 'Gender', 'Address', 'City', 'State', 'Country', 'Pincode', 'Created Date', 'Updated Date'];
    const csvData = [
      headers.join(','),
      ...filteredPatients.map(p =>
        `${p.id},"${p.name}","${p.phone}","${p.email}","${p.age || '-'}","${p.gender || '-'}","${p.address}","${p.city || '-'}","${p.state || '-'}","${p.country || '-'}","${p.pincode || '-'}",${p.created_date},${p.updated_date}`
      ),
    ].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(new Blob([csvData], { type: 'text/csv;charset=utf-8;' })));
    link.setAttribute('download', `patients_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    setShowExportMenu(false);
  };

  // ── Export: PDF now includes Age & Gender columns ──
  const exportToPDF = () => {
    const htmlContent = `<!DOCTYPE html><html><head><title>Patients Report</title><style>
      body{font-family:Arial,sans-serif;margin:20px}
      h1{color:#059669;text-align:center}
      table{width:100%;border-collapse:collapse;margin-top:20px}
      th{background-color:#059669;color:white;padding:10px;text-align:left;font-size:13px}
      td{padding:9px;border-bottom:1px solid #ddd;font-size:13px}
      tr:hover{background-color:#f5f5f5}
      .header{text-align:center;margin-bottom:30px}
      .date{color:#666;font-size:14px}
    </style></head><body>
      <div class="header">
        <h1>MediCare Hospital - Patients Report</h1>
        <p class="date">Generated on: ${new Date().toLocaleDateString('en-IN')}</p>
        <p><strong>Total Patients: ${filteredPatients.length}</strong></p>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Phone</th><th>Email</th>
            <th>Age</th><th>Gender</th><th>Address</th><th>City</th><th>State</th><th>Country</th><th>Pincode</th><th>Created</th><th>Updated</th>
          </tr>
        </thead>
        <tbody>
          ${filteredPatients.map(p => `
            <tr>
              <td>${p.id}</td>
              <td>${p.name}</td>
              <td>${p.phone}</td>
              <td>${p.email}</td>
              <td>${p.age || '-'}</td>
              <td>${p.gender || '-'}</td>
              <td>${p.address}</td>
              <td>${p.city || '-'}</td>
              <td>${p.state || '-'}</td>
              <td>${p.country || '-'}</td>
              <td>${p.pincode || '-'}</td>
              <td>${p.created_date}</td>
              <td>${p.updated_date}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </body></html>`;
    const w = window.open('', '', 'height=600,width=900');
    w.document.write(htmlContent); w.document.close(); w.focus();
    setTimeout(() => { w.print(); setShowExportMenu(false); }, 250);
  };

  const handleSort = (key) => setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <ChevronsUpDown className="w-4 h-4 text-slate-400" />;
    return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4 text-emerald-600" /> : <ChevronDown className="w-4 h-4 text-emerald-600" />;
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else if (currentPage <= 3) { for (let i = 1; i <= 4; i++) pages.push(i); pages.push('...'); pages.push(totalPages); }
    else if (currentPage >= totalPages - 2) { pages.push(1); pages.push('...'); for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i); }
    else { pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages); }
    return pages;
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
                <Download className="w-4 h-4" /> Export <ChevronDown className="w-4 h-4" />
              </button>
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 z-10 overflow-hidden">
                  <button onClick={exportToExcel} className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors flex items-center gap-3 text-slate-700">
                    <Sheet className="w-4 h-4 text-green-600" /><span className="font-medium">Export to Excel</span>
                  </button>
                  <button onClick={exportToPDF} className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors flex items-center gap-3 text-slate-700 border-t border-slate-100">
                    <FileText className="w-4 h-4 text-red-600" /><span className="font-medium">Export to PDF</span>
                  </button>
                </div>
              )}
            </div>
            <button onClick={() => openModal('add')} className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl">
              <Plus className="w-5 h-5" /> Add Patient
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Patients', value: totalMeta.total, color: 'text-slate-800' },
            { label: 'Showing', value: filteredPatients.length, color: 'text-emerald-600' },
            { label: 'Current Page', value: `${currentPage} / ${totalPages}`, color: 'text-teal-600' },
            { label: 'Filtered Results', value: filteredPatients.length, color: 'text-cyan-600' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <p className="text-sm text-slate-600 mb-1">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input type="text" placeholder="Search by name, phone, email, age, gender or address..." value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">Show:</label>
            <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700 font-medium cursor-pointer">
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table — Age & Gender columns added */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
              <tr>
                {[
                  { key: 'name', icon: <User className="w-4 h-4" />, label: 'Patient Name' },
                  { key: 'phone', icon: <Phone className="w-4 h-4" />, label: 'Phone' },
                  { key: 'email', icon: <Mail className="w-4 h-4" />, label: 'Email' },
                  { key: 'age', icon: <User className="w-4 h-4" />, label: 'Age' },
                  { key: 'gender', icon: <User className="w-4 h-4" />, label: 'Gender' },
                  { key: 'address', icon: <MapPin className="w-4 h-4" />, label: 'Address' },
                  { key: 'created_date', icon: <Calendar className="w-4 h-4" />, label: 'Created' },
                  { key: 'updated_date', icon: <Calendar className="w-4 h-4" />, label: 'Updated' },
                ].map(({ key, icon, label }) => (
                  <th key={key} className="px-6 py-4 text-left">
                    <button onClick={() => handleSort(key)} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
                      {icon} {label} {getSortIcon(key)}
                    </button>
                  </th>
                ))}
                <th className="px-6 py-4 text-center"><span className="font-semibold text-slate-700">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.length > 0 ? filteredPatients.map((patient) => (
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
                  <td className="px-6 py-4 text-slate-600">{patient.age || '-'}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {patient.gender ? (
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        patient.gender === 'MALE'
                          ? 'bg-blue-100 text-blue-700'
                          : patient.gender === 'FEMALE'
                          ? 'bg-pink-100 text-pink-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {patient.gender}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{patient.address}</td>
                  <td className="px-6 py-4 text-slate-600">{patient.created_date}</td>
                  <td className="px-6 py-4 text-slate-600">{patient.updated_date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openModal('view', patient)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => openModal('edit', patient)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => openModal('delete', patient)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center">
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
                Showing <span className="font-semibold text-slate-800">{indexOfFirstItem}</span> to{' '}
                <span className="font-semibold text-slate-800">{indexOfLastItem}</span> of{' '}
                <span className="font-semibold text-slate-800">{totalCount}</span> results
              </p>
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((pageNum, index) =>
                    pageNum === '...' ? (
                      <span key={`e-${index}`} className="px-3 py-2 text-slate-400">...</span>
                    ) : (
                      <button key={pageNum} onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === pageNum ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
                        {pageNum}
                      </button>
                    )
                  )}
                </div>
                <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modal.type === 'add' || modal.type === 'edit'}
        onClose={closeModal}
        title={modal.type === 'edit' ? 'Edit Patient' : 'Add New Patient'}
        size="md"
      >
        <PatientForm
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          isEdit={modal.type === 'edit'}
        />
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={modal.type === 'delete'} onClose={closeModal} title="Delete Patient" size="sm">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Are you sure?</h3>
          <p className="text-sm text-slate-600 mb-6">
            Do you really want to delete <span className="font-semibold">{selectedPatient?.name}</span>? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button onClick={closeModal} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">Cancel</button>
            <button onClick={handleDeletePatient} className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold">Delete</button>
          </div>
        </div>
      </Modal>

      {/* View Modal — Age & Gender added in 2-col grid */}
      <Modal isOpen={modal.type === 'view'} onClose={closeModal} title="Patient Details" size="md">
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
              {[
                { label: 'Phone Number', value: selectedPatient.phone },
                { label: 'Email Address', value: selectedPatient.email },
                { label: 'Age', value: selectedPatient.age || '-' },
                { label: 'Gender', value: selectedPatient.gender || '-' },
                { label: 'Address', value: selectedPatient.address, full: true },
                { label: 'City', value: selectedPatient.city || '-' },
                { label: 'Pincode', value: selectedPatient.pincode || '-' },
                { label: 'State', value: selectedPatient.state || '-' },
                { label: 'Country', value: selectedPatient.country || '-' },
                { label: 'Created Date', value: selectedPatient.created_date },
                { label: 'Updated Date', value: selectedPatient.updated_date },
              ].map(({ label, value, full }) => (
                <div key={label} className={full ? 'col-span-2' : ''}>
                  <p className="text-sm text-slate-600 mb-1">{label}</p>
                  <p className="font-semibold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <button onClick={() => { closeModal(); openModal('edit', selectedPatient); }} className="flex-1 px-6 py-3 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors font-semibold">Edit Patient</button>
              <button onClick={closeModal} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">Close</button>
            </div>
          </div>
        )}
      </Modal>

      {showExportMenu && <div className="fixed inset-0 z-0" onClick={() => setShowExportMenu(false)} />}
    </div>
  );
}