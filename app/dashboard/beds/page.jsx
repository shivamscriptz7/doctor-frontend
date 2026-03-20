// 'use client';

// import { useState } from 'react';
// import { Plus, Search, Download, BedDouble, User, Clock, Filter, CheckCircle, XCircle } from 'lucide-react';

// export default function BedsPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [showExportMenu, setShowExportMenu] = useState(false);

//   const beds = [
//     { id: 'B-101', ward: 'General Ward A', floor: '1st Floor', type: 'General', status: 'occupied', patient: 'Rajesh Kumar', admittedDate: '2024-01-10' },
//     { id: 'B-102', ward: 'General Ward A', floor: '1st Floor', type: 'General', status: 'available', patient: null, admittedDate: null },
//     { id: 'B-103', ward: 'General Ward A', floor: '1st Floor', type: 'General', status: 'occupied', patient: 'Priya Sharma', admittedDate: '2024-01-12' },
//     { id: 'B-104', ward: 'General Ward A', floor: '1st Floor', type: 'General', status: 'maintenance', patient: null, admittedDate: null },
//     { id: 'ICU-01', ward: 'ICU', floor: '2nd Floor', type: 'ICU', status: 'occupied', patient: 'Amit Patel', admittedDate: '2024-01-11' },
//     { id: 'ICU-02', ward: 'ICU', floor: '2nd Floor', type: 'ICU', status: 'occupied', patient: 'Sneha Verma', admittedDate: '2024-01-09' },
//     { id: 'ICU-03', ward: 'ICU', floor: '2nd Floor', type: 'ICU', status: 'available', patient: null, admittedDate: null },
//     { id: 'PVT-201', ward: 'Private Ward', floor: '3rd Floor', type: 'Private', status: 'occupied', patient: 'Vikram Singh', admittedDate: '2024-01-13' },
//     { id: 'PVT-202', ward: 'Private Ward', floor: '3rd Floor', type: 'Private', status: 'available', patient: null, admittedDate: null },
//     { id: 'PVT-203', ward: 'Private Ward', floor: '3rd Floor', type: 'Private', status: 'available', patient: null, admittedDate: null },
//     { id: 'B-201', ward: 'General Ward B', floor: '2nd Floor', type: 'General', status: 'occupied', patient: 'Anita Gupta', admittedDate: '2024-01-08' },
//     { id: 'B-202', ward: 'General Ward B', floor: '2nd Floor', type: 'General', status: 'available', patient: null, admittedDate: null },
//   ];

//   const filteredBeds = beds.filter(bed => {
//     const matchesSearch = 
//       bed.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       bed.ward.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (bed.patient && bed.patient.toLowerCase().includes(searchTerm.toLowerCase()));
    
//     const matchesFilter = filterStatus === 'all' || bed.status === filterStatus;
    
//     return matchesSearch && matchesFilter;
//   });

//   const stats = {
//     total: beds.length,
//     occupied: beds.filter(b => b.status === 'occupied').length,
//     available: beds.filter(b => b.status === 'available').length,
//     maintenance: beds.filter(b => b.status === 'maintenance').length,
//   };

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'available': return 'bg-green-100 text-green-700 border-green-200';
//       case 'occupied': return 'bg-blue-100 text-blue-700 border-blue-200';
//       case 'maintenance': return 'bg-amber-100 text-amber-700 border-amber-200';
//       default: return 'bg-slate-100 text-slate-700 border-slate-200';
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch(status) {
//       case 'available': return <CheckCircle className="w-4 h-4" />;
//       case 'occupied': return <User className="w-4 h-4" />;
//       case 'maintenance': return <XCircle className="w-4 h-4" />;
//       default: return <BedDouble className="w-4 h-4" />;
//     }
//   };

//   return (
//     <div className="p-8">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h1 className="text-4xl font-bold text-slate-800 mb-2">Bed Management</h1>
//             <p className="text-slate-600">Track bed availability and patient allocations</p>
//           </div>
//           <div className="flex gap-3">
//             <div className="relative">
//               <button 
//                 onClick={() => setShowExportMenu(!showExportMenu)}
//                 className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 flex items-center gap-2 text-slate-700 font-medium shadow-sm hover:shadow-md"
//               >
//                 <Download className="w-4 h-4" />
//                 Export
//               </button>
              
//               {showExportMenu && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 z-10">
//                   <button className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors text-slate-700 rounded-t-xl">
//                     Export to Excel
//                   </button>
//                   <button className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors text-slate-700 border-t rounded-b-xl">
//                     Export to PDF
//                   </button>
//                 </div>
//               )}
//             </div>

//             <button className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl">
//               <Plus className="w-5 h-5" />
//               Allocate Bed
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Total Beds</p>
//             <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Occupied</p>
//             <p className="text-2xl font-bold text-blue-600">{stats.occupied}</p>
//             <p className="text-xs text-slate-500 mt-1">
//               {Math.round((stats.occupied / stats.total) * 100)}% Occupancy
//             </p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Available</p>
//             <p className="text-2xl font-bold text-green-600">{stats.available}</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Maintenance</p>
//             <p className="text-2xl font-bold text-amber-600">{stats.maintenance}</p>
//           </div>
//         </div>
//       </div>

//       {/* Search and Filter Bar */}
//       <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
//         <div className="flex flex-col lg:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search by bed ID, ward, or patient name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//             />
//           </div>
          
//           <div className="flex items-center gap-3">
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700 font-medium cursor-pointer"
//             >
//               <option value="all">All Status</option>
//               <option value="available">Available</option>
//               <option value="occupied">Occupied</option>
//               <option value="maintenance">Maintenance</option>
//             </select>
            
//             <button className="px-6 py-3 rounded-xl font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all duration-300 flex items-center gap-2">
//               <Filter className="w-5 h-5" />
//               More Filters
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Beds Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//         {filteredBeds.map((bed) => (
//           <div 
//             key={bed.id}
//             className={`bg-white rounded-xl p-5 shadow-md border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${getStatusColor(bed.status)}`}
//           >
//             {/* Bed Header */}
//             <div className="flex items-center justify-between mb-3">
//               <div className="flex items-center gap-2">
//                 <BedDouble className="w-5 h-5" />
//                 <span className="font-bold text-lg">{bed.id}</span>
//               </div>
//               <div className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-full text-xs font-semibold">
//                 {getStatusIcon(bed.status)}
//                 <span className="capitalize">{bed.status}</span>
//               </div>
//             </div>

//             {/* Bed Details */}
//             <div className="space-y-2 text-sm">
//               <div>
//                 <p className="text-slate-600">Ward</p>
//                 <p className="font-semibold text-slate-800">{bed.ward}</p>
//               </div>
              
//               <div>
//                 <p className="text-slate-600">Location</p>
//                 <p className="font-medium text-slate-700">{bed.floor}</p>
//               </div>

//               <div>
//                 <p className="text-slate-600">Type</p>
//                 <span className="inline-block px-2 py-0.5 bg-white rounded text-xs font-medium">
//                   {bed.type}
//                 </span>
//               </div>

//               {bed.status === 'occupied' && bed.patient && (
//                 <>
//                   <div className="pt-2 border-t border-current/20">
//                     <p className="text-slate-600 mb-1">Patient</p>
//                     <div className="flex items-center gap-2">
//                       <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
//                         {bed.patient.charAt(0)}
//                       </div>
//                       <p className="font-semibold text-slate-800">{bed.patient}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-1.5 text-slate-600">
//                     <Clock className="w-4 h-4" />
//                     <span className="text-xs">Since {bed.admittedDate}</span>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Action Button */}
//             <button className={`w-full mt-4 py-2 rounded-lg font-medium transition-colors ${
//               bed.status === 'available' 
//                 ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
//                 : 'bg-white hover:bg-slate-50 text-slate-700'
//             }`}>
//               {bed.status === 'available' ? 'Allocate' : 'View Details'}
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* No Results */}
//       {filteredBeds.length === 0 && (
//         <div className="text-center py-12">
//           <BedDouble className="w-16 h-16 text-slate-300 mx-auto mb-4" />
//           <p className="text-slate-600 font-medium">No beds found</p>
//           <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filters</p>
//         </div>
//       )}

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

// 'use client';

// import { useState, useEffect, useMemo } from 'react';
// import { Bed, Plus, Search, Filter, X, Edit, Trash2, Eye, Download, FileText, Sheet, ChevronDown } from 'lucide-react';
// import { getBedApi, createBedApi, updateBedApi, deleteBedApi } from '../../lib/commonApis';

// // Modal Component
// function Modal({ isOpen, onClose, title, children, size = 'md' }) {
//   if (!isOpen) return null;

//   const sizeClasses = {
//     sm: 'max-w-md',
//     md: 'max-w-2xl',
//     lg: 'max-w-4xl',
//   };

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
//       <div className="flex min-h-full items-center justify-center p-4">
//         <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]}`} onClick={(e) => e.stopPropagation()}>
//           <div className="flex items-center justify-between p-6 border-b border-slate-200">
//             <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
//             <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
//               <X className="w-5 h-5 text-slate-600" />
//             </button>
//           </div>
//           <div className="p-6">{children}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function BedsPage() {
//   const [beds, setBeds] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [showExportMenu, setShowExportMenu] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(16);

//   // Modal states
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedBed, setSelectedBed] = useState(null);

//   // Form state
//   const [formData, setFormData] = useState({
//     bedNumber: '',
//     ward: '',
//     bedType: '',
//     status: 'available',
//     patientId: '',
//   });

//   const statusOptions = ['all', 'available', 'occupied', 'maintenance'];
//   const bedTypes = ['General', 'ICU', 'Emergency', 'Maternity', 'Pediatric'];

//   // Load beds from API
//   useEffect(() => {
//     loadBeds();
//   }, []);

//   const loadBeds = async () => {
//     try {
//       const res = await getBedApi(50, 1);
//       const apiBeds = res.data.map(item => ({
//         id: item.id,
//         bedNumber: item.bedNumber,
//         ward: item.ward || '-',
//         bedType: item.bedType || 'General',
//         status: item.status || 'available',
//         patient: item.patient?.name || null,
//         patientId: item.patientId || null,
//         floor: item.floor || '-',
//         admittedDate: item.createdAt ? item.createdAt.split('T')[0] : '-',
//       }));
//       setBeds(apiBeds);
//     } catch (err) {
//       console.error('Failed to load beds:', err);
//     }
//   };

//   // Handle form change
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Add Bed
//   const handleAddBed = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         bedNumber: formData.bedNumber,
//         ward: formData.ward,
//         bedType: formData.bedType,
//         status: formData.status,
//         patientId: formData.patientId ? parseInt(formData.patientId) : null,
//       };
      
//       await createBedApi(payload);
//       await loadBeds();
//       setShowAddModal(false);
//       resetForm();
//     } catch (error) {
//       console.error('Failed to create bed:', error);
//       alert('Failed to create bed');
//     }
//   };

//   // Edit Bed
//   const handleEditClick = (bed) => {
//     setSelectedBed(bed);
//     setFormData({
//       bedNumber: bed.bedNumber,
//       ward: bed.ward,
//       bedType: bed.bedType,
//       status: bed.status,
//       patientId: bed.patientId?.toString() || '',
//     });
//     setShowEditModal(true);
//   };

//   const handleUpdateBed = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         bedNumber: formData.bedNumber,
//         ward: formData.ward,
//         bedType: formData.bedType,
//         status: formData.status,
//         patientId: formData.patientId ? parseInt(formData.patientId) : null,
//       };
      
//       await updateBedApi(selectedBed.id, payload);
//       await loadBeds();
//       setShowEditModal(false);
//       setSelectedBed(null);
//       resetForm();
//     } catch (error) {
//       console.error('Failed to update bed:', error);
//       alert('Failed to update bed');
//     }
//   };

//   // Delete Bed
//   const handleDeleteClick = (bed) => {
//     setSelectedBed(bed);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteBed = async () => {
//     try {
//       await deleteBedApi(selectedBed.id);
//       setBeds(prev => prev.filter(b => b.id !== selectedBed.id));
//       setShowDeleteModal(false);
//       setSelectedBed(null);
//     } catch (error) {
//       console.error('Failed to delete bed:', error);
//       alert('Failed to delete bed');
//     }
//   };

//   // View Bed
//   const handleViewClick = (bed) => {
//     setSelectedBed(bed);
//     setShowViewModal(true);
//   };

//   const resetForm = () => {
//     setFormData({
//       bedNumber: '',
//       ward: '',
//       bedType: '',
//       status: 'available',
//       patientId: '',
//     });
//   };

//   // Filter and Search
//   const filteredBeds = useMemo(() => {
//     return beds.filter(bed => {
//       const matchesSearch =
//         bed.bedNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         bed.ward.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (bed.patient && bed.patient.toLowerCase().includes(searchTerm.toLowerCase()));

//       const matchesStatus = filterStatus === 'all' || bed.status === filterStatus;

//       return matchesSearch && matchesStatus;
//     });
//   }, [beds, searchTerm, filterStatus]);

//   // Pagination
//   const totalPages = Math.ceil(filteredBeds.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentBeds = filteredBeds.slice(indexOfFirstItem, indexOfLastItem);

//   // Stats
//   const stats = {
//     total: beds.length,
//     occupied: beds.filter(b => b.status === 'occupied').length,
//     available: beds.filter(b => b.status === 'available').length,
//     maintenance: beds.filter(b => b.status === 'maintenance').length,
//   };

//   const occupancyRate = stats.total > 0 ? ((stats.occupied / stats.total) * 100).toFixed(0) : 0;

//   // Export functions
//   const exportToExcel = () => {
//     const headers = ['ID', 'Bed Number', 'Ward', 'Type', 'Status', 'Patient', 'Floor'];
//     const csvData = [
//       headers.join(','),
//       ...filteredBeds.map(b => 
//         `${b.id},"${b.bedNumber}","${b.ward}","${b.bedType}","${b.status}","${b.patient || 'N/A'}","${b.floor}"`
//       )
//     ].join('\n');

//     const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     link.setAttribute('href', URL.createObjectURL(blob));
//     link.setAttribute('download', `beds_${new Date().toISOString().split('T')[0]}.csv`);
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     setShowExportMenu(false);
//   };

//   const exportToPDF = () => {
//     const htmlContent = `<!DOCTYPE html><html><head><title>Bed Management Report</title><style>body{font-family:Arial,sans-serif;margin:20px}h1{color:#059669;text-align:center}table{width:100%;border-collapse:collapse;margin-top:20px}th{background-color:#059669;color:white;padding:12px;text-align:left}td{padding:10px;border-bottom:1px solid #ddd}tr:hover{background-color:#f5f5f5}.header{text-align:center;margin-bottom:30px}</style></head><body><div class="header"><h1>MediCare Hospital - Bed Management Report</h1><p>Generated on: ${new Date().toLocaleDateString('en-IN')}</p><p><strong>Total Beds: ${filteredBeds.length}</strong></p></div><table><thead><tr><th>Bed Number</th><th>Ward</th><th>Type</th><th>Status</th><th>Patient</th></tr></thead><tbody>${filteredBeds.map(b => `<tr><td>${b.bedNumber}</td><td>${b.ward}</td><td>${b.bedType}</td><td>${b.status}</td><td>${b.patient || 'N/A'}</td></tr>`).join('')}</tbody></table></body></html>`;
//     const printWindow = window.open('', '', 'height=600,width=800');
//     printWindow.document.write(htmlContent);
//     printWindow.document.close();
//     printWindow.focus();
//     setTimeout(() => { printWindow.print(); setShowExportMenu(false); }, 250);
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

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'available': return 'border-green-300 bg-green-50';
//       case 'occupied': return 'border-blue-300 bg-blue-50';
//       case 'maintenance': return 'border-amber-300 bg-amber-50';
//       default: return 'border-slate-300 bg-slate-50';
//     }
//   };

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case 'available': return 'bg-green-100 text-green-700';
//       case 'occupied': return 'bg-blue-100 text-blue-700';
//       case 'maintenance': return 'bg-amber-100 text-amber-700';
//       default: return 'bg-slate-100 text-slate-700';
//     }
//   };

//   return (
//     <div className="p-8">
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h1 className="text-4xl font-bold text-slate-800 mb-2">Bed Management</h1>
//             <p className="text-slate-600">Monitor and manage hospital bed allocation</p>
//           </div>
//           <div className="flex gap-3">
//             <div className="relative">
//               <button onClick={() => setShowExportMenu(!showExportMenu)} className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 flex items-center gap-2 text-slate-700 font-medium shadow-sm hover:shadow-md">
//                 <Download className="w-4 h-4" />
//                 Export
//                 <ChevronDown className="w-4 h-4" />
//               </button>
//               {showExportMenu && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 z-10 overflow-hidden">
//                   <button onClick={exportToExcel} className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors flex items-center gap-3 text-slate-700">
//                     <Sheet className="w-4 h-4 text-green-600" />
//                     <span className="font-medium">Export to Excel</span>
//                   </button>
//                   <button onClick={exportToPDF} className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors flex items-center gap-3 text-slate-700 border-t border-slate-100">
//                     <FileText className="w-4 h-4 text-red-600" />
//                     <span className="font-medium">Export to PDF</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//             <button onClick={() => setShowAddModal(true)} className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg">
//               <Plus className="w-5 h-5" />
//               Add Bed
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Total Beds</p>
//             <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Occupied</p>
//             <p className="text-2xl font-bold text-blue-600">{stats.occupied}</p>
//             <p className="text-xs text-slate-500 mt-1">{occupancyRate}% occupancy</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Available</p>
//             <p className="text-2xl font-bold text-green-600">{stats.available}</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Maintenance</p>
//             <p className="text-2xl font-bold text-amber-600">{stats.maintenance}</p>
//           </div>
//         </div>
//       </div>

//       {/* Search and Filter */}
//       <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
//         <div className="flex gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search by bed number, ward, or patient..."
//               value={searchTerm}
//               onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
//               className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//             />
//           </div>
//           <select
//             value={filterStatus}
//             onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
//             className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700 font-medium cursor-pointer"
//           >
//             {statusOptions.map(status => (
//               <option key={status} value={status}>
//                 {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Beds Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//         {currentBeds.length > 0 ? (
//           currentBeds.map((bed) => (
//             <div key={bed.id} className={`bg-white rounded-2xl p-6 shadow-lg border-2 ${getStatusColor(bed.status)} hover:shadow-xl transition-all duration-300`}>
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
//                     <Bed className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-slate-800">{bed.bedNumber}</h3>
//                     <p className="text-sm text-slate-600">{bed.ward}</p>
//                   </div>
//                 </div>
//                 <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(bed.status)}`}>
//                   {bed.status}
//                 </span>
//               </div>
              
//               <div className="space-y-2 mb-4">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-slate-600">Type:</span>
//                   <span className="font-semibold text-slate-800">{bed.bedType}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-slate-600">Floor:</span>
//                   <span className="font-semibold text-slate-800">{bed.floor}</span>
//                 </div>
//                 {bed.status === 'occupied' && bed.patient && (
//                   <>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-slate-600">Patient:</span>
//                       <span className="font-semibold text-slate-800 truncate ml-2">{bed.patient}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-slate-600">Admitted:</span>
//                       <span className="font-semibold text-slate-800">{bed.admittedDate}</span>
//                     </div>
//                   </>
//                 )}
//               </div>

//               <div className="flex gap-2">
//                 <button onClick={() => handleViewClick(bed)} className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center gap-1">
//                   <Eye className="w-4 h-4" />
//                   View
//                 </button>
//                 <button onClick={() => handleEditClick(bed)} className="flex-1 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium flex items-center justify-center gap-1">
//                   <Edit className="w-4 h-4" />
//                   Edit
//                 </button>
//                 <button onClick={() => handleDeleteClick(bed)} className="px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-4 text-center py-12 bg-white rounded-2xl shadow-lg border border-slate-100">
//             <Bed className="w-12 h-12 text-slate-300 mx-auto mb-4" />
//             <p className="text-slate-600 font-medium">No beds found</p>
//           </div>
//         )}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="bg-white rounded-2xl shadow-lg border border-slate-100 px-6 py-4">
//           <div className="flex items-center justify-between">
//             <p className="text-sm text-slate-600">
//               Showing <span className="font-semibold text-slate-800">{indexOfFirstItem + 1}</span> to{' '}
//               <span className="font-semibold text-slate-800">{Math.min(indexOfLastItem, filteredBeds.length)}</span> of{' '}
//               <span className="font-semibold text-slate-800">{filteredBeds.length}</span> results
//             </p>
//             <div className="flex items-center gap-2">
//               <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
//                 Previous
//               </button>
//               <div className="flex items-center gap-1">
//                 {getPageNumbers().map((pageNum, index) => (
//                   pageNum === '...' ? (
//                     <span key={`ellipsis-${index}`} className="px-3 py-2 text-slate-400">...</span>
//                   ) : (
//                     <button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === pageNum ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
//                       {pageNum}
//                     </button>
//                   )
//                 ))}
//               </div>
//               <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Bed Modal */}
//       <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Bed" size="md">
//         <form onSubmit={handleAddBed} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Bed Number *</label>
//               <input type="text" name="bedNumber" value={formData.bedNumber} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="B-101" />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Ward *</label>
//               <input type="text" name="ward" value={formData.ward} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="General" />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Bed Type *</label>
//               <select name="bedType" value={formData.bedType} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700">
//                 <option value="">Select type</option>
//                 {bedTypes.map(type => (
//                   <option key={type} value={type}>{type}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Status *</label>
//               <select name="status" value={formData.status} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700">
//                 <option value="available">Available</option>
//                 <option value="occupied">Occupied</option>
//                 <option value="maintenance">Maintenance</option>
//               </select>
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">Patient ID (Optional)</label>
//             <input type="number" name="patientId" value={formData.patientId} onChange={handleFormChange} className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="Only if occupied" />
//             <p className="text-xs text-slate-500 mt-1">Required only when status is "Occupied"</p>
//           </div>
//           <div className="flex gap-3 pt-4">
//             <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">
//               Cancel
//             </button>
//             <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg">
//               Add Bed
//             </button>
//           </div>
//         </form>
//       </Modal>

//       {/* Edit Bed Modal */}
//       <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Bed" size="md">
//         <form onSubmit={handleUpdateBed} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Bed Number *</label>
//               <input type="text" name="bedNumber" value={formData.bedNumber} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Ward *</label>
//               <input type="text" name="ward" value={formData.ward} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Bed Type *</label>
//               <select name="bedType" value={formData.bedType} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700">
//                 <option value="">Select type</option>
//                 {bedTypes.map(type => (
//                   <option key={type} value={type}>{type}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Status *</label>
//               <select name="status" value={formData.status} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700">
//                 <option value="available">Available</option>
//                 <option value="occupied">Occupied</option>
//                 <option value="maintenance">Maintenance</option>
//               </select>
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">Patient ID (Optional)</label>
//             <input type="number" name="patientId" value={formData.patientId} onChange={handleFormChange} className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//             <p className="text-xs text-slate-500 mt-1">Required only when status is "Occupied"</p>
//           </div>
//           <div className="flex gap-3 pt-4">
//             <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">
//               Cancel
//             </button>
//             <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg">
//               Update Bed
//             </button>
//           </div>
//         </form>
//       </Modal>

//       {/* Delete Confirmation Modal */}
//       <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Bed" size="sm">
//         <div className="text-center">
//           <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
//             <Trash2 className="h-6 w-6 text-red-600" />
//           </div>
//           <h3 className="text-lg font-semibold text-slate-900 mb-2">Are you sure?</h3>
//           <p className="text-sm text-slate-600 mb-6">
//             Do you really want to delete bed <span className="font-semibold">{selectedBed?.bedNumber}</span>? This action cannot be undone.
//           </p>
//           <div className="flex gap-3">
//             <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">
//               Cancel
//             </button>
//             <button onClick={handleDeleteBed} className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold">
//               Delete
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* View Bed Modal */}
//       <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Bed Details" size="md">
//         {selectedBed && (
//           <div className="space-y-6">
//             <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
//               <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
//                 <Bed className="w-10 h-10 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-2xl font-bold text-slate-800">{selectedBed.bedNumber}</h3>
//                 <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize inline-block mt-1 ${getStatusBadge(selectedBed.status)}`}>
//                   {selectedBed.status}
//                 </span>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-6">
//               <div>
//                 <p className="text-sm text-slate-600 mb-1">Ward</p>
//                 <p className="font-semibold text-slate-800">{selectedBed.ward}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-600 mb-1">Bed Type</p>
//                 <p className="font-semibold text-slate-800">{selectedBed.bedType}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-600 mb-1">Floor</p>
//                 <p className="font-semibold text-slate-800">{selectedBed.floor}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-600 mb-1">Status</p>
//                 <p className="font-semibold text-slate-800 capitalize">{selectedBed.status}</p>
//               </div>
//               {selectedBed.status === 'occupied' && (
//                 <>
//                   <div>
//                     <p className="text-sm text-slate-600 mb-1">Patient</p>
//                     <p className="font-semibold text-slate-800">{selectedBed.patient || 'N/A'}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-slate-600 mb-1">Admitted Date</p>
//                     <p className="font-semibold text-slate-800">{selectedBed.admittedDate}</p>
//                   </div>
//                 </>
//               )}
//             </div>
//             <div className="flex gap-3 pt-4 border-t border-slate-200">
//               <button onClick={() => { setShowViewModal(false); handleEditClick(selectedBed); }} className="flex-1 px-6 py-3 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors font-semibold">
//                 Edit Bed
//               </button>
//               <button onClick={() => setShowViewModal(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </Modal>

//       {showExportMenu && <div className="fixed inset-0 z-0" onClick={() => setShowExportMenu(false)} />}
//     </div>
//   );
// }

'use client';

import { useState, useEffect, useMemo } from 'react';
import { Bed, Plus, Search, Filter, X, Edit, Trash2, Eye, Download, FileText, Sheet, ChevronDown } from 'lucide-react';
import { getBedApi, createBedApi, updateBedApi, deleteBedApi } from '../../lib/commonApis';

// // Modal Component
function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
  };

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

export default function BedsPage() {
  const [beds, setBeds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(16);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedBed, setSelectedBed] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    bedNumber: '',
    ward: '',
    bedType: '',
    status: 'available',
    patientId: '',
  });

  const statusOptions = ['all', 'available', 'occupied', 'maintenance'];
  const bedTypes = ['General', 'ICU', 'Emergency', 'Maternity', 'Pediatric'];

  // Load beds from API
  useEffect(() => {
    loadBeds();
  }, []);

  const loadBeds = async () => {
    try {
      // ✅ Fix
const res = await getBedApi(50, 1);
const raw = res.data?.beds || res.data || [];
const apiBeds = raw.map(item => ({
        id: item.id,
        bedNumber: item.bedNumber,
        ward: item.ward || '-',
        bedType: item.bedType || 'General',
        status: item.status || 'available',
        patient: item.patient?.name || null,
        patientId: item.patientId || null,
        floor: item.floor || '-',
        admittedDate: item.createdAt ? item.createdAt.split('T')[0] : '-',
      }));
      setBeds(apiBeds);
    } catch (err) {
      console.error('Failed to load beds:', err);
    }
  };

  // Handle form change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add Bed
  const handleAddBed = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        bedNumber: formData.bedNumber,
        ward: formData.ward,
        bedType: formData.bedType,
        status: formData.status,
        patientId: formData.patientId ? parseInt(formData.patientId) : null,
      };
      
      await createBedApi(payload);
      await loadBeds();
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      console.error('Failed to create bed:', error);
      alert('Failed to create bed');
    }
  };

  // Edit Bed
  const handleEditClick = (bed) => {
    setSelectedBed(bed);
    setFormData({
      bedNumber: bed.bedNumber,
      ward: bed.ward,
      bedType: bed.bedType,
      status: bed.status,
      patientId: bed.patientId?.toString() || '',
    });
    setShowEditModal(true);
  };

  const handleUpdateBed = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        bedNumber: formData.bedNumber,
        ward: formData.ward,
        bedType: formData.bedType,
        status: formData.status,
        patientId: formData.patientId ? parseInt(formData.patientId) : null,
      };
      
      await updateBedApi(selectedBed.id, payload);
      await loadBeds();
      setShowEditModal(false);
      setSelectedBed(null);
      resetForm();
    } catch (error) {
      console.error('Failed to update bed:', error);
      alert('Failed to update bed');
    }
  };

  // Delete Bed
  const handleDeleteClick = (bed) => {
    setSelectedBed(bed);
    setShowDeleteModal(true);
  };

  const handleDeleteBed = async () => {
    try {
      await deleteBedApi(selectedBed.id);
      setBeds(prev => prev.filter(b => b.id !== selectedBed.id));
      setShowDeleteModal(false);
      setSelectedBed(null);
    } catch (error) {
      console.error('Failed to delete bed:', error);
      alert('Failed to delete bed');
    }
  };

  // View Bed
  const handleViewClick = (bed) => {
    setSelectedBed(bed);
    setShowViewModal(true);
  };

  const resetForm = () => {
    setFormData({
      bedNumber: '',
      ward: '',
      bedType: '',
      status: 'available',
      patientId: '',
    });
  };

  // Filter and Search
  const filteredBeds = useMemo(() => {
    return beds.filter(bed => {
      const matchesSearch =
        bed.bedNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bed.ward.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (bed.patient && bed.patient.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = filterStatus === 'all' || bed.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [beds, searchTerm, filterStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredBeds.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBeds = filteredBeds.slice(indexOfFirstItem, indexOfLastItem);

  // Stats
  const stats = {
    total: beds.length,
    occupied: beds.filter(b => b.status === 'occupied').length,
    available: beds.filter(b => b.status === 'available').length,
    maintenance: beds.filter(b => b.status === 'maintenance').length,
  };

  const occupancyRate = stats.total > 0 ? ((stats.occupied / stats.total) * 100).toFixed(0) : 0;

  // Export functions
  const exportToExcel = () => {
    const headers = ['ID', 'Bed Number', 'Ward', 'Type', 'Status', 'Patient', 'Floor'];
    const csvData = [
      headers.join(','),
      ...filteredBeds.map(b => 
        `${b.id},"${b.bedNumber}","${b.ward}","${b.bedType}","${b.status}","${b.patient || 'N/A'}","${b.floor}"`
      )
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', `beds_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportMenu(false);
  };

  const exportToPDF = () => {
    const htmlContent = `<!DOCTYPE html><html><head><title>Bed Management Report</title><style>body{font-family:Arial,sans-serif;margin:20px}h1{color:#059669;text-align:center}table{width:100%;border-collapse:collapse;margin-top:20px}th{background-color:#059669;color:white;padding:12px;text-align:left}td{padding:10px;border-bottom:1px solid #ddd}tr:hover{background-color:#f5f5f5}.header{text-align:center;margin-bottom:30px}</style></head><body><div class="header"><h1>MediCare Hospital - Bed Management Report</h1><p>Generated on: ${new Date().toLocaleDateString('en-IN')}</p><p><strong>Total Beds: ${filteredBeds.length}</strong></p></div><table><thead><tr><th>Bed Number</th><th>Ward</th><th>Type</th><th>Status</th><th>Patient</th></tr></thead><tbody>${filteredBeds.map(b => `<tr><td>${b.bedNumber}</td><td>${b.ward}</td><td>${b.bedType}</td><td>${b.status}</td><td>${b.patient || 'N/A'}</td></tr>`).join('')}</tbody></table></body></html>`;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); setShowExportMenu(false); }, 250);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'border-green-300 bg-green-50';
      case 'occupied': return 'border-blue-300 bg-blue-50';
      case 'maintenance': return 'border-amber-300 bg-amber-50';
      default: return 'border-slate-300 bg-slate-50';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700';
      case 'occupied': return 'bg-blue-100 text-blue-700';
      case 'maintenance': return 'bg-amber-100 text-amber-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Bed Management</h1>
            <p className="text-slate-600">Monitor and manage hospital bed allocation</p>
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
            <button onClick={() => setShowAddModal(true)} className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg">
              <Plus className="w-5 h-5" />
              Add Bed
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
            <p className="text-xs text-slate-500 mt-1">{occupancyRate}% occupancy</p>
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

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by bed number, ward, or patient..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
            className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700 font-medium cursor-pointer"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Beds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {currentBeds.length > 0 ? (
          currentBeds.map((bed) => (
            <div key={bed.id} className={`bg-white rounded-2xl p-6 shadow-lg border-2 ${getStatusColor(bed.status)} hover:shadow-xl transition-all duration-300`}>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bed className="w-6 h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl font-bold text-slate-800">{bed.bedNumber}</h3>
                      <p className="text-sm text-slate-600 truncate">{bed.ward}</p>
                    </div>
                  </div>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(bed.status)}`}>
                  {bed.status}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Type:</span>
                  <span className="font-semibold text-slate-800">{bed.bedType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Floor:</span>
                  <span className="font-semibold text-slate-800">{bed.floor}</span>
                </div>
                {bed.status === 'occupied' && bed.patient && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Patient:</span>
                      <span className="font-semibold text-slate-800 truncate ml-2">{bed.patient}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Admitted:</span>
                      <span className="font-semibold text-slate-800">{bed.admittedDate}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-2">
                <button onClick={() => handleViewClick(bed)} className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center gap-1">
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button onClick={() => handleEditClick(bed)} className="flex-1 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium flex items-center justify-center gap-1">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button onClick={() => handleDeleteClick(bed)} className="px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center py-12 bg-white rounded-2xl shadow-lg border border-slate-100">
            <Bed className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 font-medium">No beds found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing <span className="font-semibold text-slate-800">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-semibold text-slate-800">{Math.min(indexOfLastItem, filteredBeds.length)}</span> of{' '}
              <span className="font-semibold text-slate-800">{filteredBeds.length}</span> results
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

      {/* Add Bed Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Bed" size="md">
        <form onSubmit={handleAddBed} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-semibold text-slate-700 mb-2">Bed Number *</label>
               <input type="text" name="bedNumber" value={formData.bedNumber} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="B-101" />
           </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Ward *</label>
              <input type="text" name="ward" value={formData.ward} onChange={handleFormChange} required className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" placeholder="General" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Bed Type *</label>
              <select name="bedType" value={formData.bedType} onChange={handleFormChange} required className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm">
                <option value="">Select type</option>
                {bedTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Status *</label>
              <select name="status" value={formData.status} onChange={handleFormChange} required className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm">
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Patient ID (Optional)</label>
            <input type="number" name="patientId" value={formData.patientId} onChange={handleFormChange} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" placeholder="Only if occupied" />
            <p className="text-xs text-slate-500 mt-1">Required only when status is "Occupied"</p>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg">
              Add Bed
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Bed Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Bed" size="md">
        <form onSubmit={handleUpdateBed} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Bed Number *</label>
              <input type="text" name="bedNumber" value={formData.bedNumber} onChange={handleFormChange} required className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Ward *</label>
              <input type="text" name="ward" value={formData.ward} onChange={handleFormChange} required className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Bed Type *</label>
              <select name="bedType" value={formData.bedType} onChange={handleFormChange} required className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm">
                <option value="">Select type</option>
                {bedTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Status *</label>
              <select name="status" value={formData.status} onChange={handleFormChange} required className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm">
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Patient ID (Optional)</label>
            <input type="number" name="patientId" value={formData.patientId} onChange={handleFormChange} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" />
            <p className="text-xs text-slate-500 mt-1">Required only when status is "Occupied"</p>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg">
              Update Bed
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Bed" size="sm">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="text-slate-700 font-semibold">Delete Bed {selectedBed?.bedNumber}?</p>
            <p className="text-slate-500 text-sm mt-1">This action cannot be undone.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button onClick={handleDeleteBed} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* View Bed Modal */}
      <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Bed Details" size="md">
        {selectedBed && (
          <div className="space-y-0.5">
            <div className="flex justify-between py-2.5 border-b border-slate-50">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bed Number</span>
              <span className="text-sm text-slate-700 font-medium">{selectedBed.bedNumber}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-slate-50">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ward</span>
              <span className="text-sm text-slate-700 font-medium">{selectedBed.ward}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-slate-50">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bed Type</span>
              <span className="text-sm text-slate-700 font-medium">{selectedBed.bedType}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-slate-50">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Floor</span>
              <span className="text-sm text-slate-700 font-medium">{selectedBed.floor}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-slate-50">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</span>
              <span className={`text-sm font-semibold capitalize px-2.5 py-1 rounded-lg ${getStatusBadge(selectedBed.status)}`}>{selectedBed.status}</span>
            </div>
            {selectedBed.status === 'occupied' && (
              <>
                <div className="flex justify-between py-2.5 border-b border-slate-50">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Patient</span>
                  <span className="text-sm text-slate-700 font-medium">{selectedBed.patient || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Admitted Date</span>
                  <span className="text-sm text-slate-700 font-medium">{selectedBed.admittedDate}</span>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>

      {showExportMenu && <div className="fixed inset-0 z-0" onClick={() => setShowExportMenu(false)} />}
    </div>
  );
}