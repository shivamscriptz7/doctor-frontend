// 'use client';

// import { useState,useEffect } from 'react';
// import { Plus, Search, Download, Pill, Package, AlertTriangle, TrendingUp, Filter, Eye, Edit, ShoppingCart } from 'lucide-react';

// import {getMedicines} from '../../lib/commonApis';

// export default function PharmacyPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterCategory, setFilterCategory] = useState('all');
//   const [showExportMenu, setShowExportMenu] = useState(false);
//   const [allMedicines, setMedicines] = useState([]);
//   const categories = ['all', 'Painkiller', 'Antibiotic', 'Diabetes', 'Antacid', 'Blood Thinner', 'Antihistamine', 'Cholesterol'];

// const filteredMedicines = allMedicines.filter(med => {
//   const matchesSearch =
//     med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     med.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());

//   const matchesCategory =
//     filterCategory === 'all' || med.category === filterCategory;

//   return matchesSearch && matchesCategory;
// });


//    useEffect(() => {
//   getMedicines(10, 1)
//     .then(res => {
//       const apiData = res.data.map(item => ({
//         id: item.id,
//         name: item.name,
//         category: item.type || 'General',
//         stock: item.stock || 0,
//         minStock: item.minStock || 50,
//         price: item.price || 0,
//         expiry: item.expiryDate || '-',
//         manufacturer: item.manufacturer || '-',
//         status:
//           item.stock === 0
//             ? 'critical'
//             : item.stock < 100
//             ? 'low-stock'
//             : 'in-stock'
//       }));

//       // 🔥 static + api data append
//       setMedicines(prev => [...prev, ...apiData]);
//     })
//     .catch(err => console.error(err));
// }, []);


//  const stats = {
//   total: allMedicines.length,
//   inStock: allMedicines.filter(m => m.status === 'in-stock').length,
//   lowStock: allMedicines.filter(m => m.status === 'low-stock').length,
//   critical: allMedicines.filter(m => m.status === 'critical').length,
//   totalValue: allMedicines.reduce(
//     (sum, m) => sum + m.stock * m.price,
//     0
//   )
// };


//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'in-stock': return 'bg-green-100 text-green-700';
//       case 'low-stock': return 'bg-amber-100 text-amber-700';
//       case 'critical': return 'bg-red-100 text-red-700';
//       default: return 'bg-slate-100 text-slate-700';
//     }
//   };

//   const getStockIcon = (status) => {
//     switch(status) {
//       case 'in-stock': return <Package className="w-4 h-4" />;
//       case 'low-stock': return <TrendingUp className="w-4 h-4" />;
//       case 'critical': return <AlertTriangle className="w-4 h-4" />;
//       default: return <Package className="w-4 h-4" />;
//     }
//   };

//   return (
//     <div className="p-8">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h1 className="text-4xl font-bold text-slate-800 mb-2">Pharmacy</h1>
//             <p className="text-slate-600">Manage medicines and inventory</p>
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
//               Add Medicine  
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Total Medicines</p>
//             <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">In Stock</p>
//             <p className="text-2xl font-bold text-green-600">{stats.inStock}</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Low Stock</p>
//             <p className="text-2xl font-bold text-amber-600">{stats.lowStock}</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Critical</p>
//             <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Total Value</p>
//             <p className="text-2xl font-bold text-emerald-600">₹{stats.totalValue.toFixed(0)}</p>
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
//               placeholder="Search by medicine name, ID, or manufacturer..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//             />
//           </div>
          
//           <div className="flex items-center gap-3">
//             <select
//               value={filterCategory}
//               onChange={(e) => setFilterCategory(e.target.value)}
//               className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700 font-medium cursor-pointer"
//             >
//               {categories.map(cat => (
//                 <option key={cat} value={cat}>
//                   {cat === 'all' ? 'All Categories' : cat}
//                 </option>
//               ))}
//             </select>
            
//             <button className="px-6 py-3 rounded-xl font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all duration-300 flex items-center gap-2">
//               <Filter className="w-5 h-5" />
//               More Filters
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Medicines Table */}
//       <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
//               <tr>
//                 <th className="px-6 py-4 text-left font-semibold text-slate-700">Medicine ID</th>
//                 <th className="px-6 py-4 text-left font-semibold text-slate-700">Name</th>
//                 <th className="px-6 py-4 text-left font-semibold text-slate-700">Category</th>
//                 <th className="px-6 py-4 text-left font-semibold text-slate-700">Stock</th>
//                 <th className="px-6 py-4 text-left font-semibold text-slate-700">Price (₹)</th>
//                 <th className="px-6 py-4 text-left font-semibold text-slate-700">Expiry</th>
//                 <th className="px-6 py-4 text-left font-semibold text-slate-700">Status</th>
//                 <th className="px-6 py-4 text-center font-semibold text-slate-700">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {filteredMedicines.map((medicine) => (
//                 <tr key={medicine.id} className="hover:bg-emerald-50/50 transition-colors">
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-2">
//                       <Pill className="w-4 h-4 text-emerald-600" />
//                       <span className="font-medium text-slate-800">{medicine.id}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <p className="font-semibold text-slate-800">{medicine.name}</p>
//                     <p className="text-xs text-slate-500">{medicine.manufacturer}</p>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
//                       {medicine.category}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <p className="font-bold text-slate-800">{medicine.stock}</p>
//                     <p className="text-xs text-slate-500">Min: {medicine.minStock}</p>
//                   </td>
//                   <td className="px-6 py-4 font-semibold text-slate-700">
//                     ₹{medicine.price.toFixed(2)}
//                   </td>
//                   <td className="px-6 py-4 text-slate-600">
//                     {medicine.expiry}
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 w-fit ${getStatusColor(medicine.status)}`}>
//                       {getStockIcon(medicine.status)}
//                       <span className="capitalize">{medicine.status.replace('-', ' ')}</span>
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center justify-center gap-2">
//                       <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
//                         <Eye className="w-4 h-4" />
//                       </button>
//                       <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit">
//                         <Edit className="w-4 h-4" />
//                       </button>
//                       <button className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors" title="Order">
//                         <ShoppingCart className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* No Results */}
//       {filteredMedicines.length === 0 && (
//         <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-slate-100 mt-6">
//           <Pill className="w-16 h-16 text-slate-300 mx-auto mb-4" />
//           <p className="text-slate-600 font-medium">No medicines found</p>
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














// last

// 'use client';

// import { useState, useEffect, useMemo } from 'react';
// import { 
//   Plus, Search, Download, Pill, Package, AlertTriangle, TrendingUp, Filter, 
//   Eye, Edit, ShoppingCart, X, Trash2, FileText, Sheet, ChevronDown
// } from 'lucide-react';

// import { getMedicines,createPharmacyApi,updatePharmacyApi,deletePharmacyApi } from '../../lib/commonApis';

// // Modal Component
// function Modal({ isOpen, onClose, title, children, size = 'md' }) {
//   if (!isOpen) return null;

//   const sizeClasses = {
//     sm: 'max-w-md',
//     md: 'max-w-2xl',
//     lg: 'max-w-4xl',
//   };

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

// export default function PharmacyPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterCategory, setFilterCategory] = useState('all');
//   const [showExportMenu, setShowExportMenu] = useState(false);
//   const [allMedicines, setMedicines] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(15);

//   // Modal states
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedMedicine, setSelectedMedicine] = useState(null);

//   // Form state
//   const [formData, setFormData] = useState({
//     name: '',
//     type: '',
//     stock: '',
//     minStock: '',
//     price: '',
//     expiryDate: '',
//     manufacturer: '',
//   });

//   const categories = ['all', 'Painkiller', 'Antibiotic', 'Diabetes', 'Antacid', 'Blood Thinner', 'Antihistamine', 'Cholesterol'];

//   useEffect(() => {
//     getMedicines(50, 1)
//       .then(res => {
//         const apiData = res.data.map(item => ({
//           id: item.id,
//           name: item.name,
//           category: item.type || 'General',
//           stock: item.stock || 0,
//           minStock: item.minStock || 50,
//           price: item.price || 0,
//           expiry: item.expiryDate || '-',
//           manufacturer: item.manufacturer || '-',
//           status:
//             item.stock === 0
//               ? 'critical'
//               : item.stock < 100
//               ? 'low-stock'
//               : 'in-stock'
//         }));
//         setMedicines(apiData);
//       })
//       .catch(err => console.error(err));
//   }, []);

//   // Handle form change
//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Add Medicine
//   const handleAddMedicine = async (e) => {
//     e.preventDefault();
    
//     const newMedicine = {
//       id: "1",
//       name: formData.name,
//       type: formData.type,
//       stock: parseInt(formData.stock),
//       minStock: parseInt(formData.minStock),
//       price: parseFloat(formData.price),
//       expiry: formData.expiryDate,
//       manufacturer: formData.manufacturer,
//       status: parseInt(formData.stock) === 0 ? 'critical' : parseInt(formData.stock) < 100 ? 'low-stock' : 'in-stock'
//     };
//     await createPharmacyApi(newMedicine);

//     setMedicines([...allMedicines, newMedicine]);
//     setShowAddModal(false);
//     resetForm();
//   };

//   // Edit Medicine
//   const handleEditClick = (medicine) => {
//     setSelectedMedicine(medicine);
//     setFormData({
//       name: medicine.name,
//       type: medicine.category,
//       stock: medicine.stock.toString(),
//       minStock: medicine.minStock.toString(),
//       price: medicine.price.toString(),
//       expiryDate: medicine.expiry,
//       manufacturer: medicine.manufacturer,
//     });
//     setShowEditModal(true);
//   };

//   const handleUpdateMedicine = async (e) => {
//     e.preventDefault();

//     const updatedMedicines = allMedicines.map(m =>
//       m.id === selectedMedicine.id
//         ? {
//             ...m,
//             name: formData.name,
//             category: formData.type,
//             stock: parseInt(formData.stock),
//             minStock: parseInt(formData.minStock),
//             price: parseFloat(formData.price),
//             expiry: formData.expiryDate,
//             manufacturer: formData.manufacturer,
//             status: parseInt(formData.stock) === 0 ? 'critical' : parseInt(formData.stock) < 100 ? 'low-stock' : 'in-stock'
//           }
//         : m
//     );

//     await updatePharmacyApi(selectedMedicine.id, formData);
    
//     setMedicines(updatedMedicines);
//     setShowEditModal(false);
//     setSelectedMedicine(null);
//     resetForm();
//   };

//   // Delete Medicine
//   const handleDeleteClick = (medicine) => {
//     setSelectedMedicine(medicine);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteMedicine = async () => {
//     setMedicines(allMedicines.filter(m => m.id !== selectedMedicine.id));
//     await deletePharmacyApi(selectedMedicine.id)
//     setShowDeleteModal(false);
//     setSelectedMedicine(null);
//   };

//   // View Medicine
//   const handleViewClick = (medicine) => {
//     setSelectedMedicine(medicine);
//     setShowViewModal(true);
//   };

//   const resetForm = () => {
//     setFormData({
//       name: '',
//       type: '',
//       stock: '',
//       minStock: '',
//       price: '',
//       expiryDate: '',
//       manufacturer: '',
//     });
//   };

//   // Filter and Search
//   const filteredMedicines = useMemo(() => {
//     return allMedicines.filter(med => {
//       const matchesSearch =
//         med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         med.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesCategory = filterCategory === 'all' || med.category === filterCategory;

//       return matchesSearch && matchesCategory;
//     });
//   }, [allMedicines, searchTerm, filterCategory]);

//   // Pagination
//   const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentMedicines = filteredMedicines.slice(indexOfFirstItem, indexOfLastItem);

//   // Stats
//   const stats = {
//     total: allMedicines.length,
//     inStock: allMedicines.filter(m => m.status === 'in-stock').length,
//     lowStock: allMedicines.filter(m => m.status === 'low-stock').length,
//     critical: allMedicines.filter(m => m.status === 'critical').length,
//     totalValue: allMedicines.reduce((sum, m) => sum + m.stock * m.price, 0)
//   };

//   // Export functions
//   const exportToExcel = () => {
//     const headers = ['ID', 'Name', 'Category', 'Stock', 'Min Stock', 'Price', 'Expiry', 'Manufacturer', 'Status'];
//     const csvData = [
//       headers.join(','),
//       ...filteredMedicines.map(m => 
//         `"${m.id}","${m.name}","${m.category}",${m.stock},${m.minStock},${m.price},"${m.expiry}","${m.manufacturer}","${m.status}"`
//       )
//     ].join('\n');

//     const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     link.setAttribute('href', URL.createObjectURL(blob));
//     link.setAttribute('download', `pharmacy_${new Date().toISOString().split('T')[0]}.csv`);
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     setShowExportMenu(false);
//   };

//   const exportToPDF = () => {
//     const htmlContent = `<!DOCTYPE html><html><head><title>Pharmacy Report</title><style>body{font-family:Arial,sans-serif;margin:20px}h1{color:#059669;text-align:center}table{width:100%;border-collapse:collapse;margin-top:20px}th{background-color:#059669;color:white;padding:12px;text-align:left}td{padding:10px;border-bottom:1px solid #ddd}tr:hover{background-color:#f5f5f5}.header{text-align:center;margin-bottom:30px}</style></head><body><div class="header"><h1>MediCare Hospital - Pharmacy Report</h1><p>Generated on: ${new Date().toLocaleDateString('en-IN')}</p><p><strong>Total Medicines: ${filteredMedicines.length}</strong></p></div><table><thead><tr><th>ID</th><th>Name</th><th>Category</th><th>Stock</th><th>Price</th><th>Expiry</th><th>Status</th></tr></thead><tbody>${filteredMedicines.map(m => `<tr><td>${m.id}</td><td>${m.name}</td><td>${m.category}</td><td>${m.stock}</td><td>₹${m.price}</td><td>${m.expiry}</td><td>${m.status}</td></tr>`).join('')}</tbody></table></body></html>`;
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
//     switch(status) {
//       case 'in-stock': return 'bg-green-100 text-green-700';
//       case 'low-stock': return 'bg-amber-100 text-amber-700';
//       case 'critical': return 'bg-red-100 text-red-700';
//       default: return 'bg-slate-100 text-slate-700';
//     }
//   };

//   const getStockIcon = (status) => {
//     switch(status) {
//       case 'in-stock': return <Package className="w-4 h-4" />;
//       case 'low-stock': return <TrendingUp className="w-4 h-4" />;
//       case 'critical': return <AlertTriangle className="w-4 h-4" />;
//       default: return <Package className="w-4 h-4" />;
//     }
//   };

//   return (
//     <div className="p-8">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h1 className="text-4xl font-bold text-slate-800 mb-2">Pharmacy</h1>
//             <p className="text-slate-600">Manage medicines and inventory</p>
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
//             <button onClick={() => setShowAddModal(true)} className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl">
//               <Plus className="w-5 h-5" />
//               Add Medicine  
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Total Medicines</p>
//             <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">In Stock</p>
//             <p className="text-2xl font-bold text-green-600">{stats.inStock}</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Low Stock</p>
//             <p className="text-2xl font-bold text-amber-600">{stats.lowStock}</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Critical</p>
//             <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Total Value</p>
//             <p className="text-2xl font-bold text-emerald-600">₹{stats.totalValue.toFixed(0)}</p>
//           </div>
//         </div>
//       </div>

//       {/* Search and Filter Bar */}
//       <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
//         <div className="flex flex-col lg:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//             <input type="text" placeholder="Search by medicine name, ID, or manufacturer..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//           </div>
//           <div className="flex items-center gap-3">
//             <select value={filterCategory} onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }} className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700 font-medium cursor-pointer">
//               {categories.map(cat => (
//                 <option key={cat} value={cat}>
//                   {cat === 'all' ? 'All Categories' : cat}
//                 </option>
//               ))}
//             </select>
//             <button className="px-6 py-3 rounded-xl font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all duration-300 flex items-center gap-2">
//               <Filter className="w-5 h-5" />
//               More Filters
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Medicines Table */}
//       <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-6">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
//               <tr>
//                 <th className="px-6 py-4 text-left font-semibold text-slate-700">Medicine ID</th>
//                 <th className="px-6 py-4 text-left font-semibold text-slate-700">Name</th>
//                 <th className="px-6 py-4 text-left font-semibold text-slate-700">Category</th>
//                 <th className="px-6 py-4 text-left font-semibold text-slate-700">Stock</th>
//                 <th className="px-6 py-4 text-left font-semibold text-slate-700">Price (₹)</th>
//                 <th className="px-6 py-4 text-left font-semibold text-slate-700">Expiry</th>
//                 <th className="px-6 py-4 text-left font-semibold text-slate-700">Status</th>
//                 <th className="px-6 py-4 text-center font-semibold text-slate-700">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {currentMedicines.length > 0 ? (
//                 currentMedicines.map((medicine) => (
//                   <tr key={medicine.id} className="hover:bg-emerald-50/50 transition-colors">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <Pill className="w-4 h-4 text-emerald-600" />
//                         <span className="font-medium text-slate-800">{medicine.id}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <p className="font-semibold text-slate-800">{medicine.name}</p>
//                       <p className="text-xs text-slate-500">{medicine.manufacturer}</p>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
//                         {medicine.category}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <p className="font-bold text-slate-800">{medicine.stock}</p>
//                       <p className="text-xs text-slate-500">Min: {medicine.minStock}</p>
//                     </td>
//                     <td className="px-6 py-4 font-semibold text-slate-700">
//                       ₹{medicine.price.toFixed(2)}
//                     </td>
//                     <td className="px-6 py-4 text-slate-600">{medicine.expiry}</td>
//                     <td className="px-6 py-4">
//                       <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 w-fit ${getStatusColor(medicine.status)}`}>
//                         {getStockIcon(medicine.status)}
//                         <span className="capitalize">{medicine.status.replace('-', ' ')}</span>
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center justify-center gap-2">
//                         <button onClick={() => handleViewClick(medicine)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
//                           <Eye className="w-4 h-4" />
//                         </button>
//                         <button onClick={() => handleEditClick(medicine)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit">
//                           <Edit className="w-4 h-4" />
//                         </button>
//                         <button onClick={() => handleDeleteClick(medicine)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={8} className="px-6 py-12 text-center">
//                     <Pill className="w-12 h-12 text-slate-300 mx-auto mb-4" />
//                     <p className="text-slate-600 font-medium">No medicines found</p>
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
//                 <span className="font-semibold text-slate-800">{Math.min(indexOfLastItem, filteredMedicines.length)}</span> of{' '}
//                 <span className="font-semibold text-slate-800">{filteredMedicines.length}</span> results
//               </p>
//               <div className="flex items-center gap-2">
//                 <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
//                   Previous
//                 </button>
//                 <div className="flex items-center gap-1">
//                   {getPageNumbers().map((pageNum, index) => (
//                     pageNum === '...' ? (
//                       <span key={`ellipsis-${index}`} className="px-3 py-2 text-slate-400">...</span>
//                     ) : (
//                       <button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === pageNum ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
//                         {pageNum}
//                       </button>
//                     )
//                   ))}
//                 </div>
//                 <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Add Medicine Modal */}
//       <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Medicine" size="md">
//         <form onSubmit={handleAddMedicine} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Medicine Name *</label>
//               <input type="text" name="name" value={formData.name} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="Enter medicine name" />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Category *</label>
//               <select name="type" value={formData.type} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700">
//                 <option value="">Select category</option>
//                 {categories.filter(c => c !== 'all').map(cat => (
//                   <option key={cat} value={cat}>{cat}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Stock Quantity *</label>
//               <input type="number" name="stock" value={formData.stock} onChange={handleFormChange} required min="0" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="0" />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Min Stock *</label>
//               <input type="number" name="minStock" value={formData.minStock} onChange={handleFormChange} required min="0" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="0" />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Price (₹) *</label>
//               <input type="number" name="price" value={formData.price} onChange={handleFormChange} required min="0" step="0.01" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="0.00" />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Expiry Date *</label>
//               <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">Manufacturer *</label>
//             <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="Enter manufacturer name" />
//           </div>
//           <div className="flex gap-3 pt-4">
//             <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">
//               Cancel
//             </button>
//             <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg">
//               Add Medicine
//             </button>
//           </div>
//         </form>
//       </Modal>

//       {/* Edit Medicine Modal */}
//       <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Medicine" size="md">
//         <form onSubmit={handleUpdateMedicine} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Medicine Name *</label>
//               <input type="text" name="name" value={formData.name} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Category *</label>
//               <select name="type" value={formData.type} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700">
//                 <option value="">Select category</option>
//                 {categories.filter(c => c !== 'all').map(cat => (
//                   <option key={cat} value={cat}>{cat}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Stock Quantity *</label>
//               <input type="number" name="stock" value={formData.stock} onChange={handleFormChange} required min="0" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Min Stock *</label>
//               <input type="number" name="minStock" value={formData.minStock} onChange={handleFormChange} required min="0" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Price (₹) *</label>
//               <input type="number" name="price" value={formData.price} onChange={handleFormChange} required min="0" step="0.01" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Expiry Date *</label>
//               <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">Manufacturer *</label>
//             <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//           </div>
//           <div className="flex gap-3 pt-4">
//             <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">
//               Cancel
//             </button>
//             <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg">
//               Update Medicine
//             </button>
//           </div>
//         </form>
//       </Modal>

//       {/* Delete Confirmation Modal */}
//       <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Medicine" size="sm">
//         <div className="text-center">
//           <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
//             <Trash2 className="h-6 w-6 text-red-600" />
//           </div>
//           <h3 className="text-lg font-semibold text-slate-900 mb-2">Are you sure?</h3>
//           <p className="text-sm text-slate-600 mb-6">
//             Do you really want to delete <span className="font-semibold">{selectedMedicine?.name}</span>? This action cannot be undone.
//           </p>
//           <div className="flex gap-3">
//             <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">
//               Cancel
//             </button>
//             <button onClick={handleDeleteMedicine} className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold">
//               Delete
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* View Medicine Modal */}
//       <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Medicine Details" size="md">
//         {selectedMedicine && (
//           <div className="space-y-6">
//             <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
//               <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
//                 <Pill className="w-10 h-10 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-2xl font-bold text-slate-800">{selectedMedicine.name}</h3>
//                 <p className="text-slate-600">{selectedMedicine.id}</p>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-6">
//               <div>
//                 <p className="text-sm text-slate-600 mb-1">Category</p>
//                 <p className="font-semibold text-slate-800">{selectedMedicine.category}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-600 mb-1">Manufacturer</p>
//                 <p className="font-semibold text-slate-800">{selectedMedicine.manufacturer}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-600 mb-1">Stock Quantity</p>
//                 <p className="font-semibold text-slate-800">{selectedMedicine.stock} units</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-600 mb-1">Min Stock</p>
//                 <p className="font-semibold text-slate-800">{selectedMedicine.minStock} units</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-600 mb-1">Price per Unit</p>
//                 <p className="font-semibold text-slate-800">₹{selectedMedicine.price}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-600 mb-1">Expiry Date</p>
//                 <p className="font-semibold text-slate-800">{selectedMedicine.expiry}</p>
//               </div>
//               <div className="col-span-2">
//                 <p className="text-sm text-slate-600 mb-1">Status</p>
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1.5 ${getStatusColor(selectedMedicine.status)}`}>
//                   {getStockIcon(selectedMedicine.status)}
//                   <span className="capitalize">{selectedMedicine.status.replace('-', ' ')}</span>
//                 </span>
//               </div>
//             </div>
//             <div className="flex gap-3 pt-4 border-t border-slate-200">
//               <button onClick={() => { setShowViewModal(false); handleEditClick(selectedMedicine); }} className="flex-1 px-6 py-3 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors font-semibold">
//                 Edit Medicine
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





// 'use client';

// import { useState, useEffect, useMemo } from 'react';
// import { 
//   Plus, Search, Download, Pill, Package, AlertTriangle, TrendingUp, Filter, 
//   Eye, Edit, ShoppingCart, X, Trash2, FileText, Sheet, ChevronDown
// } from 'lucide-react';

// import { getMedicines } from '../../lib/commonApis';

// // Modal Component
// function Modal({ isOpen, onClose, title, children, size = 'md' }) {
//   if (!isOpen) return null;

//   const sizeClasses = {
//     sm: 'max-w-md',
//     md: 'max-w-2xl',
//     lg: 'max-w-4xl',
//   };

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

// export default function PharmacyPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterCategory, setFilterCategory] = useState('all');
//   const [showExportMenu, setShowExportMenu] = useState(false);
//   const [allMedicines, setMedicines] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(15);

//   // Modal states

//   // State mein add karo
// const [totalItems, setTotalItems] = useState(0);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedMedicine, setSelectedMedicine] = useState(null);

//   // Form state
//   const [formData, setFormData] = useState({
//     name: '',
//     type: '',
//     stock: '',
//     minStock: '',
//     price: '',
//     expiryDate: '',
//     manufacturer: '',
//   });

//   const categories = ['all', 'Painkiller', 'Antibiotic', 'Diabetes', 'Antacid', 'Blood Thinner', 'Antihistamine', 'Cholesterol'];

//   useEffect(() => {
//     getMedicines(50, 1)
//       .then(res => {
//         console.log('Pharmacy API Response:', res); // Debug log
        
//         // Handle different response structures
//        // ✅ Ab (sahi)
// const dataArray = res.data?.medicines || res.data || [];

// // useEffect mein set karo
// setTotalItems(res.data?.total || dataArray.length); // ← total API se
//         if (!Array.isArray(dataArray)) {
//           console.error('Expected array but got:', dataArray);
//           setMedicines([]);
//           return;
//         }
        
//         const apiData = dataArray.map(item => ({
//   id: item.id,
//   name: item.name,
//   category: item.type || 'General',
//   stock: item.quantity || 0,           // ← stock → quantity
//   minStock: item.minStock || 50,
//   price: item.price || 0,
//   expiry: item.expiryDate || '-',
//   manufacturer: item.manufacturer || '-',
//   status:
//     (item.quantity || 0) === 0
//       ? 'critical'
//       : (item.quantity || 0) < 100
//       ? 'low-stock'
//       : 'in-stock'
// }));
//         setMedicines(apiData);
//       })
//       .catch(err => {
//         console.error('Failed to load medicines:', err);
//         setMedicines([]);
//       });
//   }, []);

//   // Handle form change
//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Add Medicine
//   const handleAddMedicine = async (e) => {
//     e.preventDefault();
    
//     const newMedicine = {
//       id: `MED-${Date.now()}`,
//       name: formData.name,
//       category: formData.type,
//       stock: parseInt(formData.stock),
//       minStock: parseInt(formData.minStock),
//       price: parseFloat(formData.price),
//       expiry: formData.expiryDate,
//       manufacturer: formData.manufacturer,
//       status: parseInt(formData.stock) === 0 ? 'critical' : parseInt(formData.stock) < 100 ? 'low-stock' : 'in-stock'
//     };

//     setMedicines([...allMedicines, newMedicine]);
//     setShowAddModal(false);
//     resetForm();
//   };

//   // Edit Medicine
//   const handleEditClick = (medicine) => {
//     setSelectedMedicine(medicine);
//     setFormData({
//       name: medicine.name,
//       type: medicine.category,
//       stock: medicine.stock.toString(),
//       minStock: medicine.minStock.toString(),
//       price: medicine.price.toString(),
//       expiryDate: medicine.expiry,
//       manufacturer: medicine.manufacturer,
//     });
//     setShowEditModal(true);
//   };

//   const handleUpdateMedicine = async (e) => {
//     e.preventDefault();

//     const updatedMedicines = allMedicines.map(m =>
//       m.id === selectedMedicine.id
//         ? {
//             ...m,
//             name: formData.name,
//             category: formData.type,
//             stock: parseInt(formData.stock),
//             minStock: parseInt(formData.minStock),
//             price: parseFloat(formData.price),
//             expiry: formData.expiryDate,
//             manufacturer: formData.manufacturer,
//             status: parseInt(formData.stock) === 0 ? 'critical' : parseInt(formData.stock) < 100 ? 'low-stock' : 'in-stock'
//           }
//         : m
//     );

//     setMedicines(updatedMedicines);
//     setShowEditModal(false);
//     setSelectedMedicine(null);
//     resetForm();
//   };

//   // Delete Medicine
//   const handleDeleteClick = (medicine) => {
//     setSelectedMedicine(medicine);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteMedicine = async () => {
//     setMedicines(allMedicines.filter(m => m.id !== selectedMedicine.id));
//     setShowDeleteModal(false);
//     setSelectedMedicine(null);
//   };

//   // View Medicine
//   const handleViewClick = (medicine) => {
//     setSelectedMedicine(medicine);
//     setShowViewModal(true);
//   };

//   const resetForm = () => {
//     setFormData({
//       name: '',
//       type: '',
//       stock: '',
//       minStock: '',
//       price: '',
//       expiryDate: '',
//       manufacturer: '',
//     });
//   };

//   // Filter and Search
//   const filteredMedicines = useMemo(() => {
//     return allMedicines.filter(med => {
//       const matchesSearch =
//         med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         med.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesCategory = filterCategory === 'all' || med.category === filterCategory;

//       return matchesSearch && matchesCategory;
//     });
//   }, [allMedicines, searchTerm, filterCategory]);

//   // Pagination
  
// // ✅ Ab (agar server-side pagination ho)
// const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentMedicines = filteredMedicines.slice(indexOfFirstItem, indexOfLastItem);

//   // Stats
//   const stats = {
//     total: allMedicines.length,
//     inStock: allMedicines.filter(m => m.status === 'in-stock').length,
//     lowStock: allMedicines.filter(m => m.status === 'low-stock').length,
//     critical: allMedicines.filter(m => m.status === 'critical').length,
//     totalValue: allMedicines.reduce((sum, m) => sum + m.stock * m.price, 0)
//   };

//   // Export functions
//   const exportToExcel = () => {
//     const headers = ['ID', 'Name', 'Category', 'Stock', 'Min Stock', 'Price', 'Expiry', 'Manufacturer', 'Status'];
//     const csvData = [
//       headers.join(','),
//       ...filteredMedicines.map(m => 
//         `"${m.id}","${m.name}","${m.category}",${m.stock},${m.minStock},${m.price},"${m.expiry}","${m.manufacturer}","${m.status}"`
//       )
//     ].join('\n');

//     const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     link.setAttribute('href', URL.createObjectURL(blob));
//     link.setAttribute('download', `pharmacy_${new Date().toISOString().split('T')[0]}.csv`);
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     setShowExportMenu(false);
//   };

//   const exportToPDF = () => {
//     const htmlContent = `<!DOCTYPE html><html><head><title>Pharmacy Report</title><style>body{font-family:Arial,sans-serif;margin:20px}h1{color:#059669;text-align:center}table{width:100%;border-collapse:collapse;margin-top:20px}th{background-color:#059669;color:white;padding:12px;text-align:left}td{padding:10px;border-bottom:1px solid #ddd}tr:hover{background-color:#f5f5f5}.header{text-align:center;margin-bottom:30px}</style></head><body><div class="header"><h1>MediCare Hospital - Pharmacy Report</h1><p>Generated on: ${new Date().toLocaleDateString('en-IN')}</p><p><strong>Total Medicines: ${filteredMedicines.length}</strong></p></div><table><thead><tr><th>ID</th><th>Name</th><th>Category</th><th>Stock</th><th>Price</th><th>Expiry</th><th>Status</th></tr></thead><tbody>${filteredMedicines.map(m => `<tr><td>${m.id}</td><td>${m.name}</td><td>${m.category}</td><td>${m.stock}</td><td>₹${m.price}</td><td>${m.expiry}</td><td>${m.status}</td></tr>`).join('')}</tbody></table></body></html>`;
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
//     switch(status) {
//       case 'in-stock': return 'bg-green-100 text-green-700';
//       case 'low-stock': return 'bg-amber-100 text-amber-700';
//       case 'critical': return 'bg-red-100 text-red-700';
//       default: return 'bg-slate-100 text-slate-700';
//     }
//   };

//   const getStockIcon = (status) => {
//     switch(status) {
//       case 'in-stock': return <Package className="w-4 h-4" />;
//       case 'low-stock': return <TrendingUp className="w-4 h-4" />;
//       case 'critical': return <AlertTriangle className="w-4 h-4" />;
//       default: return <Package className="w-4 h-4" />;
//     }
//   };

//   return (
//     <div className="p-8">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h1 className="text-4xl font-bold text-slate-800 mb-2">Pharmacy</h1>
//             <p className="text-slate-600">Manage medicines and inventory</p>
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
//             <button onClick={() => setShowAddModal(true)} className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl">
//               <Plus className="w-5 h-5" />
//               Add Medicine  
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Total Medicines</p>
//             <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">In Stock</p>
//             <p className="text-2xl font-bold text-green-600">{stats.inStock}</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Low Stock</p>
//             <p className="text-2xl font-bold text-amber-600">{stats.lowStock}</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Critical</p>
//             <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Total Value</p>
//             <p className="text-2xl font-bold text-emerald-600">₹{stats.totalValue.toFixed(0)}</p>
//           </div>
//         </div>
//       </div>

//       {/* Search and Filter Bar */}
//       <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
//         <div className="flex flex-col lg:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//             <input type="text" placeholder="Search by medicine name, ID, or manufacturer..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//           </div>
//           <div className="flex items-center gap-3">
//             <select value={filterCategory} onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }} className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700 font-medium cursor-pointer">
//               {categories.map(cat => (
//                 <option key={cat} value={cat}>
//                   {cat === 'all' ? 'All Categories' : cat}
//                 </option>
//               ))}
//             </select>
//             <button className="px-6 py-3 rounded-xl font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all duration-300 flex items-center gap-2">
//               <Filter className="w-5 h-5" />
//               More Filters
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Medicines Table */}
//       <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-6">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
//               <tr>
//                 <th className="px-6 py-4 text-left font-semibold text-slate-700">Medicine ID</th>
//                 <th className="px-6 py-4 text-left font-semibold text-slate-700">Name</th>
//                 <th className="px-6 py-4 text-left font-semibold text-slate-700">Category</th>
//                 <th className="px-6 py-4 text-left font-semibold text-slate-700">Stock</th>
//                 <th className="px-6 py-4 text-left font-semibold text-slate-700">Price (₹)</th>
//                 <th className="px-6 py-4 text-left font-semibold text-slate-700">Expiry</th>
//                 <th className="px-6 py-4 text-left font-semibold text-slate-700">Status</th>
//                 <th className="px-6 py-4 text-center font-semibold text-slate-700">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {currentMedicines.length > 0 ? (
//                 currentMedicines.map((medicine) => (
//                   <tr key={medicine.id} className="hover:bg-emerald-50/50 transition-colors">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <Pill className="w-4 h-4 text-emerald-600" />
//                         <span className="font-medium text-slate-800">{medicine.id}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <p className="font-semibold text-slate-800">{medicine.name}</p>
//                       <p className="text-xs text-slate-500">{medicine.manufacturer}</p>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
//                         {medicine.category}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <p className="font-bold text-slate-800">{medicine.stock}</p>
//                       <p className="text-xs text-slate-500">Min: {medicine.minStock}</p>
//                     </td>
//                     <td className="px-6 py-4 font-semibold text-slate-700">
//                       ₹{medicine.price.toFixed(2)}
//                     </td>
//                     <td className="px-6 py-4 text-slate-600">{medicine.expiry}</td>
//                     <td className="px-6 py-4">
//                       <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 w-fit ${getStatusColor(medicine.status)}`}>
//                         {getStockIcon(medicine.status)}
//                         <span className="capitalize">{medicine.status.replace('-', ' ')}</span>
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center justify-center gap-2">
//                         <button onClick={() => handleViewClick(medicine)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
//                           <Eye className="w-4 h-4" />
//                         </button>
//                         <button onClick={() => handleEditClick(medicine)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit">
//                           <Edit className="w-4 h-4" />
//                         </button>
//                         <button onClick={() => handleDeleteClick(medicine)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={8} className="px-6 py-12 text-center">
//                     <Pill className="w-12 h-12 text-slate-300 mx-auto mb-4" />
//                     <p className="text-slate-600 font-medium">No medicines found</p>
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
//                 <span className="font-semibold text-slate-800">{Math.min(indexOfLastItem, filteredMedicines.length)}</span> of{' '}
//                 <span className="font-semibold text-slate-800">{filteredMedicines.length}</span> results
//               </p>
//               <div className="flex items-center gap-2">
//                 <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
//                   Previous
//                 </button>
//                 <div className="flex items-center gap-1">
//                   {getPageNumbers().map((pageNum, index) => (
//                     pageNum === '...' ? (
//                       <span key={`ellipsis-${index}`} className="px-3 py-2 text-slate-400">...</span>
//                     ) : (
//                       <button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === pageNum ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
//                         {pageNum}
//                       </button>
//                     )
//                   ))}
//                 </div>
//                 <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Add Medicine Modal */}
//       <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Medicine" size="md">
//         <form onSubmit={handleAddMedicine} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Medicine Name *</label>
//               <input type="text" name="name" value={formData.name} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="Enter medicine name" />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Category *</label>
//               <select name="type" value={formData.type} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700">
//                 <option value="">Select category</option>
//                 {categories.filter(c => c !== 'all').map(cat => (
//                   <option key={cat} value={cat}>{cat}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Stock Quantity *</label>
//               <input type="number" name="stock" value={formData.stock} onChange={handleFormChange} required min="0" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="0" />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Min Stock *</label>
//               <input type="number" name="minStock" value={formData.minStock} onChange={handleFormChange} required min="0" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="0" />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Price (₹) *</label>
//               <input type="number" name="price" value={formData.price} onChange={handleFormChange} required min="0" step="0.01" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="0.00" />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Expiry Date *</label>
//               <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">Manufacturer *</label>
//             <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="Enter manufacturer name" />
//           </div>
//           <div className="flex gap-3 pt-4">
//             <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">
//               Cancel
//             </button>
//             <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg">
//               Add Medicine
//             </button>
//           </div>
//         </form>
//       </Modal>

//       {/* Edit Medicine Modal */}
//       <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Medicine" size="md">
//         <form onSubmit={handleUpdateMedicine} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Medicine Name *</label>
//               <input type="text" name="name" value={formData.name} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Category *</label>
//               <select name="type" value={formData.type} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700">
//                 <option value="">Select category</option>
//                 {categories.filter(c => c !== 'all').map(cat => (
//                   <option key={cat} value={cat}>{cat}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Stock Quantity *</label>
//               <input type="number" name="stock" value={formData.stock} onChange={handleFormChange} required min="0" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Min Stock *</label>
//               <input type="number" name="minStock" value={formData.minStock} onChange={handleFormChange} required min="0" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Price (₹) *</label>
//               <input type="number" name="price" value={formData.price} onChange={handleFormChange} required min="0" step="0.01" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Expiry Date *</label>
//               <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">Manufacturer *</label>
//             <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//           </div>
//           <div className="flex gap-3 pt-4">
//             <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">
//               Cancel
//             </button>
//             <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg">
//               Update Medicine
//             </button>
//           </div>
//         </form>
//       </Modal>

//       {/* Delete Confirmation Modal */}
//       <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Medicine" size="sm">
//         <div className="text-center">
//           <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
//             <Trash2 className="h-6 w-6 text-red-600" />
//           </div>
//           <h3 className="text-lg font-semibold text-slate-900 mb-2">Are you sure?</h3>
//           <p className="text-sm text-slate-600 mb-6">
//             Do you really want to delete <span className="font-semibold">{selectedMedicine?.name}</span>? This action cannot be undone.
//           </p>
//           <div className="flex gap-3">
//             <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">
//               Cancel
//             </button>
//             <button onClick={handleDeleteMedicine} className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold">
//               Delete
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* View Medicine Modal */}
//       <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Medicine Details" size="md">
//         {selectedMedicine && (
//           <div className="space-y-6">
//             <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
//               <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
//                 <Pill className="w-10 h-10 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-2xl font-bold text-slate-800">{selectedMedicine.name}</h3>
//                 <p className="text-slate-600">{selectedMedicine.id}</p>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-6">
//               <div>
//                 <p className="text-sm text-slate-600 mb-1">Category</p>
//                 <p className="font-semibold text-slate-800">{selectedMedicine.category}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-600 mb-1">Manufacturer</p>
//                 <p className="font-semibold text-slate-800">{selectedMedicine.manufacturer}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-600 mb-1">Stock Quantity</p>
//                 <p className="font-semibold text-slate-800">{selectedMedicine.stock} units</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-600 mb-1">Min Stock</p>
//                 <p className="font-semibold text-slate-800">{selectedMedicine.minStock} units</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-600 mb-1">Price per Unit</p>
//                 <p className="font-semibold text-slate-800">₹{selectedMedicine.price}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-600 mb-1">Expiry Date</p>
//                 <p className="font-semibold text-slate-800">{selectedMedicine.expiry}</p>
//               </div>
//               <div className="col-span-2">
//                 <p className="text-sm text-slate-600 mb-1">Status</p>
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1.5 ${getStatusColor(selectedMedicine.status)}`}>
//                   {getStockIcon(selectedMedicine.status)}
//                   <span className="capitalize">{selectedMedicine.status.replace('-', ' ')}</span>
//                 </span>
//               </div>
//             </div>
//             <div className="flex gap-3 pt-4 border-t border-slate-200">
//               <button onClick={() => { setShowViewModal(false); handleEditClick(selectedMedicine); }} className="flex-1 px-6 py-3 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors font-semibold">
//                 Edit Medicine
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











// 'use client';

// import { useState, useEffect, useMemo, useCallback } from 'react';
// import { 
//   Plus, Search, Download, Pill, Package, AlertTriangle, TrendingUp, Filter, 
//   Eye, Edit, X, Trash2, FileText, Sheet, ChevronDown, Loader2
// } from 'lucide-react';

// import { getMedicines, createPharmacyApi, updatePharmacyApi, deletePharmacyApi } from '../../lib/commonApis';

// // ── Modal Component ───────────────────────────────────────────────────────────
// function Modal({ isOpen, onClose, title, children, size = 'md' }) {
//   if (!isOpen) return null;

//   const sizeClasses = {
//     sm: 'max-w-md',
//     md: 'max-w-2xl',
//     lg: 'max-w-4xl',
//   };

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

// // ── Main Component ────────────────────────────────────────────────────────────
// export default function PharmacyPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterCategory, setFilterCategory] = useState('all');
//   const [showExportMenu, setShowExportMenu] = useState(false);
//   const [allMedicines, setMedicines] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(15);
//   const [totalItems, setTotalItems] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [toast, setToast] = useState('');

//   // Modal states
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedMedicine, setSelectedMedicine] = useState(null);

//   // Form state
//   const [formData, setFormData] = useState({
//     name: '',
//     type: '',
//     strength: '',
//     quantity:'',
//     manufacturer: '',
//     isActive: true,
//   });

//   const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

//   const categories = ['all', 'tablet', 'capsule', 'syrup', 'injection', 'drops', 'cream'];

//   // ── Load Medicines ────────────────────────────────────────────────────────
//   const loadMedicines = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await getMedicines(10, currentPage);
//       console.log('Pharmacy API Response:', res);
      
//       const dataArray = res.data?.medicines || res.data || [];
//       setTotalItems(res.data?.total);
      
//       if (!Array.isArray(dataArray)) {
//         console.error('Expected array but got:', dataArray);
//         setMedicines([]);
//         return;
//       }
      
//       const apiData = dataArray.map(item => ({
//         id: item.id,
//         name: item.name,
//         category: item.type || 'General',
//         stock: item.quantity || 0,
//         minStock: item.minStock || 50,
//         price: item.price || 0,
//         expiry: item.expiryDate || '-',
//         manufacturer: item.manufacturer || '-',
//         strength: item.strength || '-',
//         isActive: item.isActive !== undefined ? item.isActive : true,
//         status:
//           (item.quantity || 0) === 0
//             ? 'critical'
//             : (item.quantity || 0) < 100
//             ? 'low-stock'
//             : 'in-stock'
//       }));
      
//       setMedicines(apiData);
//     } catch (err) {
//       console.error('Failed to load medicines:', err);
//       showToast('❌ Failed to load medicines');
//       setMedicines([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage]);

//   useEffect(() => {
//     loadMedicines();
//   }, [loadMedicines]);

//   // ── Form Handlers ─────────────────────────────────────────────────────────
//   const handleFormChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({ 
//       ...formData, 
//       [name]: type === 'checkbox' ? checked : value 
//     });
//   };

//   const resetForm = () => {
//     setFormData({
//       name: '',
//       type: '',
//       strength: '',
//       manufacturer: '',
//       quantity: '',
//       price: '',
//       isActive: true,
//     });
//   };

//   // ── Add Medicine ──────────────────────────────────────────────────────────
//   const handleAddMedicine = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     try {
//       const payload = {
//         name: formData.name,
//         type: formData.type,
//         strength: formData.strength,
//         manufacturer: formData.manufacturer,
//         isActive: formData.isActive,
//         quantity:formData.quantity,
//         price:formData.price
//       };

//       await createPharmacyApi(payload);
//       await loadMedicines();
//       setShowAddModal(false);
//       resetForm();
//       setCurrentPage(1);
//       showToast('✅ Medicine added successfully!');
//     } catch (err) {
//       console.error('Create error:', err);
//       showToast('❌ Failed to add medicine');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ── Edit Medicine ─────────────────────────────────────────────────────────
//   const handleEditClick = (medicine) => {
//     console.log(medicine,'medicine');
    
//     setSelectedMedicine(medicine);
//     setFormData({
//       name: medicine.name,
//       type: medicine.category,
//       strength: medicine.strength,
//       manufacturer: medicine.manufacturer,
//       quantity:medicine.stock,
//       price:medicine.price,
//       isActive: medicine.isActive
//     });
//     setShowEditModal(true);
//   };

//   const handleUpdateMedicine = async (e) => {
//     e.preventDefault();
//     if (!selectedMedicine) return;
//     setIsSubmitting(true);

//     try {
//       const payload = {
//         name: formData.name,
//         type: formData.type,
//         strength: formData.strength,
//         manufacturer: formData.manufacturer,
//         quantity:formData.quantity,
//         price:formData.price,
//         isActive: formData.isActive,
//       };

//       await updatePharmacyApi(selectedMedicine.id, payload);
//       await loadMedicines();
//       setShowEditModal(false);
//       setSelectedMedicine(null);
//       resetForm();
//       showToast('✅ Medicine updated successfully!');
//     } catch (err) {
//       console.error('Update error:', err);
//       showToast('❌ Failed to update medicine');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ── Delete Medicine ───────────────────────────────────────────────────────
//   const handleDeleteClick = (medicine) => {
//     setSelectedMedicine(medicine);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteMedicine = async () => {
//     if (!selectedMedicine) return;
//     setIsSubmitting(true);

//     try {
//       await deletePharmacyApi(selectedMedicine.id);
//       await loadMedicines();
//       setShowDeleteModal(false);
//       setSelectedMedicine(null);
//       showToast('🗑️ Medicine deleted');
//     } catch (err) {
//       console.error('Delete error:', err);
//       showToast('❌ Failed to delete medicine');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ── View Medicine ─────────────────────────────────────────────────────────
//   const handleViewClick = (medicine) => {
//     setSelectedMedicine(medicine);
//     setShowViewModal(true);
//   };

//   // ── Filter and Search ─────────────────────────────────────────────────────
//   const filteredMedicines = useMemo(() => {
//     return allMedicines.filter(med => {
//       const matchesSearch =
//         med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (med.id?.toString() || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
//         med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesCategory = filterCategory === 'all' || med.category === filterCategory;

//       return matchesSearch && matchesCategory;
//     });
//   }, [allMedicines, searchTerm, filterCategory]);

//   // ── Pagination ────────────────────────────────────────────────────────────
//   const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentMedicines = filteredMedicines.slice(indexOfFirstItem, indexOfLastItem);

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

//   // ── Stats ─────────────────────────────────────────────────────────────────
//   const stats = {
//     total: allMedicines.length,
//     inStock: allMedicines.filter(m => m.status === 'in-stock').length,
//     lowStock: allMedicines.filter(m => m.status === 'low-stock').length,
//     critical: allMedicines.filter(m => m.status === 'critical').length,
//     totalValue: allMedicines.reduce((sum, m) => sum + m.stock * m.price, 0)
//   };

//   // ── Export Functions ──────────────────────────────────────────────────────
//   const exportToExcel = () => {
//     const headers = ['ID', 'Name', 'Type', 'Strength', 'Manufacturer', 'Stock', 'Price', 'Status'];
//     const csvData = [
//       headers.join(','),
//       ...filteredMedicines.map(m => 
//         `"${m.id}","${m.name}","${m.category}","${m.strength}","${m.manufacturer}",${m.stock},${m.price},"${m.status}"`
//       )
//     ].join('\n');

//     const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     link.setAttribute('href', URL.createObjectURL(blob));
//     link.setAttribute('download', `pharmacy_${new Date().toISOString().split('T')[0]}.csv`);
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     setShowExportMenu(false);
//   };

//   const exportToPDF = () => {
//     const htmlContent = `<!DOCTYPE html><html><head><title>Pharmacy Report</title><style>body{font-family:Arial,sans-serif;margin:20px}h1{color:#059669;text-align:center}table{width:100%;border-collapse:collapse;margin-top:20px}th{background-color:#059669;color:white;padding:12px;text-align:left}td{padding:10px;border-bottom:1px solid #ddd}tr:hover{background-color:#f5f5f5}</style></head><body><div class="header"><h1>MediCare Hospital - Pharmacy Report</h1><p>Generated on: ${new Date().toLocaleDateString('en-IN')}</p><p><strong>Total Medicines: ${filteredMedicines.length}</strong></p></div><table><thead><tr><th>ID</th><th>Name</th><th>Type</th><th>Stock</th><th>Price</th><th>Status</th></tr></thead><tbody>${filteredMedicines.map(m => `<tr><td>${m.id}</td><td>${m.name}</td><td>${m.category}</td><td>${m.stock}</td><td>₹${m.price}</td><td>${m.status}</td></tr>`).join('')}</tbody></table></body></html>`;
//     const printWindow = window.open('', '', 'height=600,width=800');
//     printWindow.document.write(htmlContent);
//     printWindow.document.close();
//     printWindow.focus();
//     setTimeout(() => { printWindow.print(); setShowExportMenu(false); }, 250);
//   };

//   // ── Helper Functions ──────────────────────────────────────────────────────
//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'in-stock': return 'bg-green-100 text-green-700';
//       case 'low-stock': return 'bg-amber-100 text-amber-700';
//       case 'critical': return 'bg-red-100 text-red-700';
//       default: return 'bg-slate-100 text-slate-700';
//     }
//   };

//   const getStockIcon = (status) => {
//     switch(status) {
//       case 'in-stock': return <Package className="w-4 h-4" />;
//       case 'low-stock': return <TrendingUp className="w-4 h-4" />;
//       case 'critical': return <AlertTriangle className="w-4 h-4" />;
//       default: return <Package className="w-4 h-4" />;
//     }
//   };

//   // ══════════════════════════════════════════════════════════════════════════
//   // RENDER
//   // ══════════════════════════════════════════════════════════════════════════
//   return (
//     <div className="p-8">
//       {/* Toast */}
//       {toast && (
//         <div className="fixed top-6 right-6 z-[100] bg-slate-800 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium">
//           {toast}
//         </div>
//       )}

//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h1 className="text-4xl font-bold text-slate-800 mb-2">Pharmacy</h1>
//             <p className="text-slate-600">Manage medicines and inventory</p>
//           </div>
//           <div className="flex gap-3">
//             <div className="relative">
//               <button onClick={() => setShowExportMenu(!showExportMenu)} className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 text-slate-700 font-medium shadow-sm">
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
//             <button onClick={() => setShowAddModal(true)} className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 font-semibold shadow-lg">
//               <Plus className="w-5 h-5" />
//               Add Medicine  
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Total Medicines</p>
//             <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">In Stock</p>
//             <p className="text-2xl font-bold text-green-600">{stats.inStock}</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Low Stock</p>
//             <p className="text-2xl font-bold text-amber-600">{stats.lowStock}</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Critical</p>
//             <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//             <p className="text-sm text-slate-600 mb-1">Total Value</p>
//             <p className="text-2xl font-bold text-emerald-600">₹{stats.totalValue.toFixed(0)}</p>
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
//               placeholder="Search by medicine name, ID, or manufacturer..." 
//               value={searchTerm} 
//               onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} 
//               className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700" 
//             />
//           </div>
//           <select 
//             value={filterCategory} 
//             onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }} 
//             className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 text-slate-700 font-medium cursor-pointer"
//           >
//             {categories.map(cat => (
//               <option key={cat} value={cat}>
//                 {cat === 'all' ? 'All Types' : cat}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Medicines Table */}
//       <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-6">
//         {loading ? (
//           <div className="py-16 text-center">
//             <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-2" />
//             <p className="text-slate-400 text-sm">Loading medicines...</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
//                 <tr>
//                   <th className="px-6 py-4 text-left font-semibold text-slate-700">ID</th>
//                   <th className="px-6 py-4 text-left font-semibold text-slate-700">Name</th>
//                   <th className="px-6 py-4 text-left font-semibold text-slate-700">Type</th>
//                   <th className="px-6 py-4 text-left font-semibold text-slate-700">Strength</th>
//                   <th className="px-6 py-4 text-left font-semibold text-slate-700">Manufacturer</th>
//                   <th className="px-6 py-4 text-left font-semibold text-slate-700">Stock</th>
//                   <th className="px-6 py-4 text-left font-semibold text-slate-700">Status</th>
//                   <th className="px-6 py-4 text-center font-semibold text-slate-700">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {currentMedicines.length > 0 ? (
//                   currentMedicines.map((medicine) => (
//                     <tr key={medicine.id} className="hover:bg-emerald-50/50 transition-colors">
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-2">
//                           <Pill className="w-4 h-4 text-emerald-600" />
//                           <span className="font-medium text-slate-800">{medicine.id}</span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <p className="font-semibold text-slate-800">{medicine.name}</p>
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium capitalize">
//                           {medicine.category}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-slate-700">{medicine.strength}</td>
//                       <td className="px-6 py-4 text-slate-600 text-sm">{medicine.manufacturer}</td>
//                       <td className="px-6 py-4">
//                         <p className="font-bold text-slate-800">{medicine.stock}</p>
//                         <p className="text-xs text-slate-500">Min: {medicine.minStock}</p>
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 w-fit ${getStatusColor(medicine.status)}`}>
//                           {getStockIcon(medicine.status)}
//                           <span className="capitalize">{medicine.status.replace('-', ' ')}</span>
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center justify-center gap-2">
//                           <button onClick={() => handleViewClick(medicine)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
//                             <Eye className="w-4 h-4" />
//                           </button>
//                           <button onClick={() => handleEditClick(medicine)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit">
//                             <Edit className="w-4 h-4" />
//                           </button>
//                           <button onClick={() => handleDeleteClick(medicine)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={8} className="px-6 py-12 text-center">
//                       <Pill className="w-12 h-12 text-slate-300 mx-auto mb-4" />
//                       <p className="text-slate-600 font-medium">No medicines found</p>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
//             <div className="flex items-center justify-between">
//               <p className="text-sm text-slate-600">
//                 Showing <span className="font-semibold">{indexOfFirstItem + 1}</span> to{' '}
//                 <span className="font-semibold">{Math.min(indexOfLastItem, filteredMedicines.length)}</span> of{' '}
//                 <span className="font-semibold">{filteredMedicines.length}</span>
//               </p>
//               <div className="flex items-center gap-2">
//                 <button 
//                   onClick={() => setCurrentPage(currentPage - 1)} 
//                   disabled={currentPage === 1} 
//                   className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'}`}
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
//                         className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === pageNum ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'}`}
//                       >
//                         {pageNum}
//                       </button>
//                     )
//                   ))}
//                 </div>
//                 <button 
//                   onClick={() => setCurrentPage(currentPage + 1)} 
//                   disabled={currentPage === totalPages} 
//                   className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'}`}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* MODALS */}
//       {/* Add Medicine Modal */}
//       <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); resetForm(); }} title="Add New Medicine" size="md">
//         <form onSubmit={handleAddMedicine} className="space-y-4">
//           <div>
//             <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Medicine Name *</label>
//             <input 
//               type="text" 
//               name="name" 
//               value={formData.name} 
//               onChange={handleFormChange} 
//               required 
//               className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" 
//               placeholder="e.g., Paracetamol" 
//             />
//           </div>
          
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Type *</label>
//               <select 
//                 name="type" 
//                 value={formData.type} 
//                 onChange={handleFormChange} 
//                 required 
//                 className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
//               >
//                 <option value="">Select type</option>
//                 {categories.filter(c => c !== 'all').map(cat => (
//                   <option key={cat} value={cat}>{cat}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Strength *</label>
//               <input 
//                 type="text" 
//                 name="strength" 
//                 value={formData.strength} 
//                 onChange={handleFormChange} 
//                 required 
//                 className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" 
//                 placeholder="e.g., 500mg" 
//               />
//             </div>



//             <div>
//             <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Manufacturer *</label>
//             <input 
//               type="text" 
//               name="manufacturer" 
//               value={formData.manufacturer} 
//               onChange={handleFormChange} 
//               required 
//               className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" 
//               placeholder="e.g., Lal Lab Ltd" 
//             />
//           </div>

//            <div>
//             <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Quantity *</label>
//             <input 
//               type="number" 
//               name="quantity" 
//               value={formData.quantity} 
//               onChange={handleFormChange} 
//               required 
//               className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" 
//               placeholder="e.g., 100" 
//             />
//           </div>

//             <div>
//             <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Price *</label>
//             <input 
//               type="number" 
//               name="price" 
//               value={formData.price} 
//               onChange={handleFormChange} 
//               required 
//               className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" 
//               placeholder="e.g., 100" 
//             />
//           </div>


//           <div className="flex items-center gap-2">
//             <input 
//               type="checkbox" 
//               name="isActive" 
//               checked={formData.isActive} 
//               onChange={handleFormChange} 
//               className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" 
//             />
//             <label className="text-sm font-medium text-slate-700">Is Active</label>
//           </div>
//           </div>
          
          

//           <div className="flex gap-3 pt-4">
//             <button 
//               type="button" 
//               onClick={() => { setShowAddModal(false); resetForm(); }} 
//               className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button 
//               type="submit" 
//               disabled={isSubmitting} 
//               className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg disabled:opacity-60"
//             >
//               {isSubmitting ? 'Adding...' : 'Add Medicine'}
//             </button>
//           </div>
//         </form>
//       </Modal>

//       {/* Edit Medicine Modal */}
//       <Modal isOpen={showEditModal} onClose={() => { setShowEditModal(false); resetForm(); }} title="Edit Medicine" size="md">
//         <form onSubmit={handleUpdateMedicine} className="space-y-4">
//           <div>
//             <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Medicine Name *</label>
//             <input 
//               type="text" 
//               name="name" 
//               value={formData.name} 
//               onChange={handleFormChange} 
//               required 
//               className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" 
//             />
//           </div>
          
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Type *</label>
//               <select 
//                 name="type" 
//                 value={formData.type} 
//                 onChange={handleFormChange} 
//                 required 
//                 className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
//               >
//                 <option value="">Select type</option>
//                 {categories.filter(c => c !== 'all').map(cat => (
//                   <option key={cat} value={cat}>{cat}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Strength *</label>
//               <input 
//                 type="text" 
//                 name="strength" 
//                 value={formData.strength} 
//                 onChange={handleFormChange} 
//                 required 
//                 className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" 
//               />
//             </div>


//              <div>
//             <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Manufacturer *</label>
//             <input 
//               type="text" 
//               name="manufacturer" 
//               value={formData.manufacturer} 
//               onChange={handleFormChange} 
//               required 
//               className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" 
//             />
//           </div>

//            <div>
//             <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Quantity *</label>
//             <input 
//               type="number" 
//               name="quantity" 
//               value={formData.quantity} 
//               onChange={handleFormChange} 
//               required 
//               className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" 
//               placeholder="e.g., 100" 
//             />
//           </div>

                    
// <div className="flex items-center gap-2">
//             <input 
//               type="checkbox" 
//               name="isActive" 
//               checked={formData.isActive} 
//               onChange={handleFormChange} 
//               className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" 
//             />
//             <label className="text-sm font-medium text-slate-700">Is Active</label>
//           </div>
//  <div>
//             <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Price *</label>
//             <input 
//               type="number" 
//               name="price" 
//               value={formData.price} 
//               onChange={handleFormChange} 
//               required 
//               className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" 
//               placeholder="e.g., 100" 
//             />
//           </div>

//           </div>
          
         



          

//           <div className="flex gap-3 pt-4">
//             <button 
//               type="button" 
//               onClick={() => { setShowEditModal(false); resetForm(); }} 
//               className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button 
//               type="submit" 
//               disabled={isSubmitting} 
//               className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg disabled:opacity-60"
//             >
//               {isSubmitting ? 'Updating...' : 'Update Medicine'}
//             </button>
//           </div>
//         </form>
//       </Modal>

//       {/* Delete Confirmation Modal */}
//       <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Medicine" size="sm">
//         <div className="text-center space-y-4">
//           <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto">
//             <Trash2 className="w-6 h-6 text-red-500" />
//           </div>
//           <div>
//             <p className="text-slate-700 font-semibold">Delete {selectedMedicine?.name}?</p>
//             <p className="text-slate-500 text-sm mt-1">This action cannot be undone.</p>
//           </div>
//           <div className="flex gap-3">
//             <button 
//               onClick={() => setShowDeleteModal(false)} 
//               className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button 
//               onClick={handleDeleteMedicine} 
//               disabled={isSubmitting} 
//               className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
//             >
//               {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
//               Delete
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* View Medicine Modal */}
//       <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Medicine Details" size="md">
//         {selectedMedicine && (
//           <div className="space-y-6">
//             <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
//               <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
//                 <Pill className="w-10 h-10 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-2xl font-bold text-slate-800">{selectedMedicine.name}</h3>
//                 <p className="text-slate-600">ID: {selectedMedicine.id}</p>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-6">
//               <div>
//                 <p className="text-sm text-slate-600 mb-1">Type</p>
//                 <p className="font-semibold text-slate-800 capitalize">{selectedMedicine.category}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-600 mb-1">Strength</p>
//                 <p className="font-semibold text-slate-800">{selectedMedicine.strength}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-600 mb-1">Manufacturer</p>
//                 <p className="font-semibold text-slate-800">{selectedMedicine.manufacturer}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-600 mb-1">Stock Quantity</p>
//                 <p className="font-semibold text-slate-800">{selectedMedicine.stock} units</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-600 mb-1">Price per Unit</p>
//                 <p className="font-semibold text-slate-800">₹{selectedMedicine.price}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-600 mb-1">Status</p>
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1.5 ${getStatusColor(selectedMedicine.status)}`}>
//                   {getStockIcon(selectedMedicine.status)}
//                   <span className="capitalize">{selectedMedicine.status.replace('-', ' ')}</span>
//                 </span>
//               </div>
//             </div>
//             <div className="flex gap-3 pt-4 border-t border-slate-200">
//               <button 
//                 onClick={() => { setShowViewModal(false); handleEditClick(selectedMedicine); }} 
//                 className="flex-1 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-semibold hover:bg-emerald-100 transition-colors"
//               >
//                 Edit Medicine
//               </button>
//               <button 
//                 onClick={() => setShowViewModal(false)} 
//                 className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors"
//               >
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

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Plus, Search, Download, Pill, Package, AlertTriangle, TrendingUp,
  Eye, Edit, X, Trash2, FileText, Sheet, ChevronDown, Loader2,
  ChevronsUpDown, ChevronUp
} from 'lucide-react';

import { getMedicines, createPharmacyApi, updatePharmacyApi, deletePharmacyApi } from '../../lib/commonApis';

// ── Modal ─────────────────────────────────────────────────────────────────────
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

// ── Shared Medicine Form ───────────────────────────────────────────────────────
const CATEGORIES = ['tablet', 'capsule', 'syrup', 'injection', 'drops', 'cream'];
const EMPTY_FORM = { name: '', type: '', strength: '', manufacturer: '', quantity: '', price: '', isActive: true };

function MedicineForm({ formData, onChange, onSubmit, onCancel, isEdit, isSubmitting }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Medicine Name *</label>
        <input
          type="text" name="name" value={formData.name} onChange={onChange} required
          placeholder="e.g., Paracetamol"
          className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Type *</label>
          <select
            name="type" value={formData.type} onChange={onChange} required
            className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
          >
            <option value="">Select type</option>
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Strength *</label>
          <input
            type="text" name="strength" value={formData.strength} onChange={onChange} required
            placeholder="e.g., 500mg"
            className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Manufacturer *</label>
          <input
            type="text" name="manufacturer" value={formData.manufacturer} onChange={onChange} required
            placeholder="e.g., Lal Lab Ltd"
            className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Quantity *</label>
          <input
            type="number" name="quantity" value={formData.quantity} onChange={onChange} required
            placeholder="e.g., 100"
            className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Price *</label>
          <input
            type="number" name="price" value={formData.price} onChange={onChange} required
            placeholder="e.g., 100"
            className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
          />
        </div>
        <div className="flex items-center gap-2 mt-6">
          <input
            type="checkbox" name="isActive" checked={formData.isActive} onChange={onChange}
            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
          />
          <label className="text-sm font-medium text-slate-700">Is Active</label>
        </div>
      </div>
      <div className="flex gap-3 pt-4">
        <button type="button" onClick={onCancel} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg disabled:opacity-60">
          {isSubmitting ? (isEdit ? 'Updating...' : 'Adding...') : (isEdit ? 'Update Medicine' : 'Add Medicine')}
        </button>
      </div>
    </form>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const getStatusColor = (status) => ({
  'in-stock': 'bg-green-100 text-green-700',
  'low-stock': 'bg-amber-100 text-amber-700',
  'critical': 'bg-red-100 text-red-700',
}[status] ?? 'bg-slate-100 text-slate-700');

const getStockIcon = (status) => ({
  'in-stock': <Package className="w-4 h-4" />,
  'low-stock': <TrendingUp className="w-4 h-4" />,
  'critical': <AlertTriangle className="w-4 h-4" />,
}[status] ?? <Package className="w-4 h-4" />);

const mapMedicine = (item) => ({
  id: item.id,
  name: item.name,
  category: item.type || 'General',
  stock: item.quantity || 0,
  minStock: item.minStock || 50,
  price: item.price || 0,
  expiry: item.expiryDate || '-',
  manufacturer: item.manufacturer || '-',
  strength: item.strength || '-',
  isActive: item.isActive !== undefined ? item.isActive : true,
  status: (item.quantity || 0) === 0 ? 'critical' : (item.quantity || 0) < 100 ? 'low-stock' : 'in-stock',
});

// ── Main Component ────────────────────────────────────────────────────────────
export default function PharmacyPage() {
  const [medicines, setMedicines] = useState([]);
  const [totalMeta, setTotalMeta] = useState({ total: 0, totalPages: 1 });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [toast, setToast] = useState('');

  // ✅ Unified modal state
  const [modal, setModal] = useState({ type: null }); // 'add' | 'edit' | 'delete' | 'view'
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const openModal = (type, medicine = null) => {
    setSelectedMedicine(medicine);
    setFormData(medicine && (type === 'edit')
      ? { name: medicine.name, type: medicine.category, strength: medicine.strength, manufacturer: medicine.manufacturer, quantity: medicine.stock, price: medicine.price, isActive: medicine.isActive }
      : EMPTY_FORM
    );
    setModal({ type });
  };

  const closeModal = () => {
    setModal({ type: null });
    setSelectedMedicine(null);
    setFormData(EMPTY_FORM);
  };

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const loadMedicines = useCallback(async (page = currentPage) => {
    setLoading(true);
    try {
      const res = await getMedicines(itemsPerPage, page);
      console.log(res,'resssss');
      
      const raw = res.data?.medicines || res.data || [];
      if (!Array.isArray(raw)) { setMedicines([]); return; }
      setMedicines(raw.map(mapMedicine));
      setTotalMeta({
        total: res.data?.total || raw.length,
        totalPages: res.data?.totalPages || Math.ceil((res.data?.total || raw.length) / itemsPerPage),
      });
    } catch (err) {
      console.error('Failed to load medicines:', err);
      showToast('❌ Failed to load medicines');
      setMedicines([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => { loadMedicines(currentPage); }, [currentPage]);

  // ── Form Handler ──────────────────────────────────────────────────────────
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // ── Submit (Add / Edit) ───────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      name: formData.name, type: formData.type, strength: formData.strength,
      manufacturer: formData.manufacturer, quantity: formData.quantity,
      price: formData.price, isActive: formData.isActive,
    };
    try {
      if (modal.type === 'edit') {
        await updatePharmacyApi(selectedMedicine.id, payload);
        showToast('✅ Medicine updated successfully!');
      } else {
        await createPharmacyApi(payload);
        setCurrentPage(1);
        showToast('✅ Medicine added successfully!');
      }
      await loadMedicines(modal.type === 'edit' ? currentPage : 1);
      closeModal();
    } catch (err) {
      console.error(err);
      showToast(`❌ Failed to ${modal.type === 'edit' ? 'update' : 'add'} medicine`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!selectedMedicine) return;
    setIsSubmitting(true);
    try {
      await deletePharmacyApi(selectedMedicine.id);
      await loadMedicines(currentPage);
      showToast('🗑️ Medicine deleted');
      closeModal();
    } catch (err) {
      console.error(err);
      showToast('❌ Failed to delete medicine');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Filter + Search (client-side on current page) ─────────────────────────
  const filteredMedicines = useMemo(() =>
    medicines.filter(med => {
      const matchesSearch =
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (med.id?.toString() || '').includes(searchTerm) ||
        med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || med.category === filterCategory;
      return matchesSearch && matchesCategory;
    }), [medicines, searchTerm, filterCategory]);

  // ✅ Server-side pagination — no slice
  const totalPages = totalMeta.totalPages;
  const totalCount = totalMeta.total;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
  const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalCount);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else if (currentPage <= 3) { for (let i = 1; i <= 4; i++) pages.push(i); pages.push('...'); pages.push(totalPages); }
    else if (currentPage >= totalPages - 2) { pages.push(1); pages.push('...'); for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i); }
    else { pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages); }
    return pages;
  };

  // ── Stats ─────────────────────────────────────────────────────────────────
  const stats = useMemo(() => ({
    total: totalCount,
    inStock: medicines.filter(m => m.status === 'in-stock').length,
    lowStock: medicines.filter(m => m.status === 'low-stock').length,
    critical: medicines.filter(m => m.status === 'critical').length,
    totalValue: medicines.reduce((sum, m) => sum + m.stock * m.price, 0),
  }), [medicines, totalCount]);

  // ── Export ────────────────────────────────────────────────────────────────
  const exportToExcel = () => {
    const headers = ['Sr.No','ID', 'Name', 'Type', 'Strength', 'Manufacturer', 'Stock', 'Price', 'Status'];
    const csv = [headers.join(','), ...filteredMedicines.map((m,i) =>
      `"${(currentPage - 1) * itemsPerPage + i + 1}", "${m.id}","${m.name}","${m.category}","${m.strength}","${m.manufacturer}",${m.stock},${m.price},"${m.status}"`
    )].join('\n');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    link.download = `pharmacy_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    setShowExportMenu(false);
  };

  const exportToPDF = () => {
    const html = `<!DOCTYPE html><html><head><title>Pharmacy Report</title><style>body{font-family:Arial,sans-serif;margin:20px}h1{color:#059669;text-align:center}table{width:100%;border-collapse:collapse;margin-top:20px}th{background-color:#059669;color:white;padding:12px;text-align:left}td{padding:10px;border-bottom:1px solid #ddd}tr:hover{background-color:#f5f5f5}</style></head><body><h1>MediCare Hospital - Pharmacy Report</h1><p>Generated: ${new Date().toLocaleDateString('en-IN')} | Total: ${filteredMedicines.length}</p><table><thead><tr><th>Sr.No</th><th>ID</th><th>Name</th><th>Type</th><th>Stock</th><th>Price</th><th>Status</th></tr></thead><tbody>${filteredMedicines.map((m,i) => `<tr> <td>${(currentPage - 1) * itemsPerPage + i + 1}</td><td>${m.id}</td><td>${m.name}</td><td>${m.category}</td><td>${m.stock}</td><td>₹${m.price}</td><td>${m.status}</td></tr>`).join('')}</tbody></table></body></html>`;
    const w = window.open('', '', 'height=600,width=800');
    w.document.write(html); w.document.close(); w.focus();
    setTimeout(() => { w.print(); setShowExportMenu(false); }, 250);
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="p-8">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-[100] bg-slate-800 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Pharmacy</h1>
            <p className="text-slate-600">Manage medicines and inventory</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <button onClick={() => setShowExportMenu(!showExportMenu)} className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 text-slate-700 font-medium shadow-sm">
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
            <button onClick={() => openModal('add')} className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 font-semibold shadow-lg">
              <Plus className="w-5 h-5" /> Add Medicine
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          {[
            { label: 'Total Medicines', value: stats.total, color: 'text-slate-800' },
            { label: 'In Stock', value: stats.inStock, color: 'text-green-600' },
            { label: 'Low Stock', value: stats.lowStock, color: 'text-amber-600' },
            { label: 'Critical', value: stats.critical, color: 'text-red-600' },
            { label: 'Total Value', value: `₹${stats.totalValue.toFixed(0)}`, color: 'text-emerald-600' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <p className="text-sm text-slate-600 mb-1">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text" placeholder="Search by medicine name, ID, or manufacturer..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }}
            className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 text-slate-700 font-medium cursor-pointer"
          >
            <option value="all">All Types</option>
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-6">
        {loading ? (
          <div className="py-16 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">Loading medicines...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
                <tr>
                  {['Sr.No','ID', 'Name', 'Type', 'Strength', 'Manufacturer', 'Stock', 'Status', 'Actions'].map((h, i) => (
                    <th key={h} className={`px-6 py-4 font-semibold text-slate-700 ${i === 7 ? 'text-center' : 'text-left'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* ✅ filteredMedicines directly — no slice */}
                {filteredMedicines.length > 0 ? filteredMedicines.map((medicine,index) => (
                  <tr key={medicine.id} className="hover:bg-emerald-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800">{index+indexOfFirstItem }</td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Pill className="w-4 h-4 text-emerald-600" />
                        <span className="font-medium text-slate-800">{medicine.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-800">{medicine.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium capitalize">{medicine.category}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{medicine.strength}</td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{medicine.manufacturer}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{medicine.stock}</p>
                      <p className="text-xs text-slate-500">Min: {medicine.minStock}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 w-fit ${getStatusColor(medicine.status)}`}>
                        {getStockIcon(medicine.status)}
                        <span className="capitalize">{medicine.status.replace('-', ' ')}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openModal('view', medicine)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => openModal('edit', medicine)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => openModal('delete', medicine)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <Pill className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-600 font-medium">No medicines found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ✅ Pagination — server meta */}
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
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((pageNum, index) =>
                    pageNum === '...' ? (
                      <span key={`e-${index}`} className="px-3 py-2 text-slate-400">...</span>
                    ) : (
                      <button key={pageNum} onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === pageNum ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
                        {pageNum}
                      </button>
                    )
                  )}
                </div>
                <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Add / Edit Modal — single shared form */}
      <Modal
        isOpen={modal.type === 'add' || modal.type === 'edit'}
        onClose={closeModal}
        title={modal.type === 'edit' ? 'Edit Medicine' : 'Add New Medicine'}
        size="md"
      >
        <MedicineForm
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          isEdit={modal.type === 'edit'}
          isSubmitting={isSubmitting}
        />
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={modal.type === 'delete'} onClose={closeModal} title="Delete Medicine" size="sm">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="text-slate-700 font-semibold">Delete {selectedMedicine?.name}?</p>
            <p className="text-slate-500 text-sm mt-1">This action cannot be undone.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={closeModal} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
            <button onClick={handleDelete} disabled={isSubmitting} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />} Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal isOpen={modal.type === 'view'} onClose={closeModal} title="Medicine Details" size="md">
        {selectedMedicine && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                <Pill className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">{selectedMedicine.name}</h3>
                <p className="text-slate-600">ID: {selectedMedicine.id}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Type', value: selectedMedicine.category },
                { label: 'Strength', value: selectedMedicine.strength },
                { label: 'Manufacturer', value: selectedMedicine.manufacturer },
                { label: 'Stock Quantity', value: `${selectedMedicine.stock} units` },
                { label: 'Price per Unit', value: `₹${selectedMedicine.price}` },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-sm text-slate-600 mb-1">{label}</p>
                  <p className="font-semibold text-slate-800 capitalize">{value}</p>
                </div>
              ))}
              <div>
                <p className="text-sm text-slate-600 mb-1">Status</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1.5 ${getStatusColor(selectedMedicine.status)}`}>
                  {getStockIcon(selectedMedicine.status)}
                  <span className="capitalize">{selectedMedicine.status.replace('-', ' ')}</span>
                </span>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <button onClick={() => { closeModal(); openModal('edit', selectedMedicine); }} className="flex-1 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-semibold hover:bg-emerald-100 transition-colors">Edit Medicine</button>
              <button onClick={closeModal} className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors">Close</button>
            </div>
          </div>
        )}
      </Modal>

      {showExportMenu && <div className="fixed inset-0 z-0" onClick={() => setShowExportMenu(false)} />}
    </div>
  );
}