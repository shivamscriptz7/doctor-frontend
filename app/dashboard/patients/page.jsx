// 'use client';

// import { useState, useMemo, useEffect } from 'react';
// import {
//   Search, Filter, Download, ChevronDown, ChevronUp, ChevronsUpDown,
//   User, Phone, Mail, MapPin, Calendar, Edit, Trash2, Eye, Plus, X, FileText, Sheet
// } from 'lucide-react';
// import { getPatients, createPatientApi, updatePatientApi, deletePatientApi,countPatientApi } from '../../lib/commonApis';
// import { showToast } from '../../lib/notification';

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
//         className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden`}
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
//   const options = ['MALE', 'FEMALE', 'OTHER'];

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
//            {/* Row 6: Father Name + Disease */}
// <div className="grid grid-cols-2 gap-4">
//   <div>
//     <label className="block text-sm font-semibold text-slate-700 mb-2">Father Name</label>
//     <input
//       type="text"
//       name="fatherName"
//       value={formData.fatherName}
//       onChange={onChange}
//       placeholder="e.g. Ramesh Sharma"
//       className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//     />
//   </div>
//   <div>
//     <label className="block text-sm font-semibold text-slate-700 mb-2">Disease</label>
//     <input
//       type="text"
//       name="disease"
//       value={formData.disease}
//       onChange={onChange}
//       placeholder="e.g. Diabetes, Hypertension"
//       className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//     />
//   </div>

// </div>

//       {/* Row 2: Email + Age (numeric) */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address 99</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={onChange}
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
//           rows="2"
//           placeholder="Enter full address"
//           className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//         />
//       </div>

//       {/* Row 4: City + Pincode */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
//           <input type="text" name="city" value={formData.city} onChange={onChange} placeholder="e.g. Bengaluru"
//             className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">Pincode</label>
//           <input type="text" name="pincode" value={formData.pincode} onChange={onChange} placeholder="e.g. 560001"
//             onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6))}
//             className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//         </div>
//       </div>

//       {/* Row 5: State + Country */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">State</label>
//           <input type="text" name="state" value={formData.state} onChange={onChange} placeholder="e.g. Karnataka"
//             className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">Country</label>
//           <input type="text" name="country" value={formData.country} onChange={onChange} placeholder="e.g. India"
//             className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//         </div>
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

// const EMPTY_FORM = { name: '', email: '', age: '', gender: '', status: '', phone: '', address: '', city: '', state: '', country: '', pincode: '' , fatherName: '', disease: ''};

// const mapPatient = (item) => ({
//   id: item.id,
//   name: item.name,
//   phone: item.phone,
//   email: item.user?.email || item.email || '-',
//   age: item.age,
//   gender: item.gender,
//   status: item.status,
//   address: item.address || '-',
//   city: item.city || '-',
//   state: item.state || '-',
//   country: item.country || '-',
//   pincode: item.pincode || '-',
//   fatherName: item.fatherName || '-',
//   disease: item.disease || '-',
//   patientNumber: item.patientNumber || '-',
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
//             status: patient.status || '', 
//             address: patient.address === '-' ? '' : patient.address,
//             city:    patient.city    === '-' ? '' : (patient.city    || ''),
//             state:   patient.state   === '-' ? '' : (patient.state   || ''),
//             country: patient.country === '-' ? '' : (patient.country || ''),
//             pincode: patient.pincode === '-' ? '' : (patient.pincode || ''),
//             fatherName: patient.fatherName === '-' ? '' : (patient.fatherName || ''),
//             disease: patient.disease === '-' ? '' : (patient.disease || ''),
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


//   const [total, setTotal] = useState(0);
//   const [today, setToday] = useState(0);
//   const [visited, setVisited] = useState(0);
//   const [unvisited, setUnvisited] = useState(0);

//   useEffect(() => {
// handleCountData();
//     fetchPatients(currentPage, itemsPerPage);
//   }, [currentPage, itemsPerPage]);

//   const handleCountData = async()=>{
//      countPatientApi()
//       .then(res => {
//         const data = res.data;

//         setTotal(data.totalPatients);
//         setToday(data.todayPatients);
//         setVisited(data.visitedPatients);
//         setUnvisited(data.unvisitedPatients);
//       })
//       .catch(err => console.error(err));
//   }

//   const refreshPatients = () => fetchPatients(currentPage, itemsPerPage);

//   const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // age as Number for DB, gender stays string
//       const payload = {
//         ...formData,
//         age: formData.age !== '' ? Number(formData.age) : null,
//         gender: formData.gender || null,
//         status: formData.status || null,
//       };
//       if (modal.type === 'edit') {
//         await updatePatientApi(selectedPatient.id, payload);
//         showToast('success','Updated','Patient updated successfully.');
//         handleCountData();

//       } else {
//         await createPatientApi(payload);
//         showToast('success','Created','Patient created successfully.');
//         handleCountData();
//       }
//       await refreshPatients();
//       closeModal();
//     } catch (error) {
//         showToast('error','Failed','Failed to created Patient.');

//       console.error(error);
//     }
//   };

//   const handleDeletePatient = async () => {
//     if (!selectedPatient) return;
//     try {
//       await deletePatientApi(selectedPatient.id);
//         showToast('success','Deleted','Patient deleted successfully.');
//         handleCountData();
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
//     const headers = ['ID', 'Name', 'Phone', 'Email', 'Age', 'Gender', 'Address', 'City', 'State', 'Country', 'Pincode', 'Created Date', 'Updated Date'];
//     const csvData = [
//       headers.join(','),
//       ...filteredPatients.map(p =>
//         `${p.id},"${p.name}","${p.phone}","${p.email}","${p.age || '-'}","${p.gender || '-'}","${p.status || '-'}","${p.address}","${p.city || '-'}","${p.state || '-'}","${p.country || '-'}","${p.pincode || '-'}",${p.created_date},${p.updated_date}`
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
//             <th>Age</th><th>Gender</th><th>Status</th><th>Address</th><th>City</th><th>State</th><th>Country</th><th>Pincode</th><th>Created</th><th>Updated</th>
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
//               <td>${p.status || '-'}</td>
//               <td>${p.address}</td>
//               <td>${p.city || '-'}</td>
//               <td>${p.state || '-'}</td>
//               <td>${p.country || '-'}</td>
//               <td>${p.pincode || '-'}</td>
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
//              { label: 'Total Patients', value: total, color: 'text-slate-800' },
//     { label: 'Today Patients', value: today, color: 'text-emerald-600' },
//     { label: 'Visited Patients', value: visited, color: 'text-blue-600' },
//     { label: 'Unvisited Patients', value: unvisited, color: 'text-red-500' },
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
//                   { key: 'patientNumber', icon: <User className="w-4 h-4" />, label: 'Patient Id' },
//                   { key: 'name', icon: <User className="w-4 h-4" />, label: 'Patient Name' },
//                   { key: 'phone', icon: <Phone className="w-4 h-4" />, label: 'Phone' },
//                   { key: 'email', icon: <Mail className="w-4 h-4" />, label: 'Email' },
//                   { key: 'age', icon: <User className="w-4 h-4" />, label: 'Age' },
//                   { key: 'gender', icon: <User className="w-4 h-4" />, label: 'Gender' },
//                   { key: 'status', icon: <User className="w-4 h-4" />, label: 'Status' },
//                   { key: 'address', icon: <MapPin className="w-4 h-4" />, label: 'Address' },
//                   { key: 'created_date', icon: <Calendar className="w-4 h-4" />, label: 'Created' },
//                   { key: 'updated_date', icon: <Calendar className="w-4 h-4" />, label: 'Updated' },
//                   { key: 'fatherName', icon: <User className="w-4 h-4" />, label: 'Father Name' },
//                   { key: 'disease', icon: <FileText className="w-4 h-4" />, label: 'Disease' },
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

//                   <td className="px-6 py-4 text-slate-600">{patient.patientNumber}</td>

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
//                         patient.gender === 'MALE'
//                           ? 'bg-blue-100 text-blue-700'
//                           : patient.gender === 'FEMALE'
//                           ? 'bg-pink-100 text-pink-700'
//                           : 'bg-purple-100 text-purple-700'
//                       }`}>
//                         {patient.gender}
//                       </span>
//                     ) : '-'}
//                   </td>
//                   <td className="px-6 py-4 text-slate-600">{patient.status || '-'}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.address}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.created_date}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.updated_date}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.fatherName || '-'}</td>
// <td className="px-6 py-4 text-slate-600">{patient.disease || '-'}</td>
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
//                   <td colSpan={12} className="px-6 py-12 text-center">
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
//                  { label: 'Status', value: selectedPatient.status || '-' },
//                 { label: 'Address', value: selectedPatient.address, full: true },
//                 { label: 'City', value: selectedPatient.city || '-' },
//                 { label: 'Pincode', value: selectedPatient.pincode || '-' },
//                 { label: 'State', value: selectedPatient.state || '-' },
//                 { label: 'Country', value: selectedPatient.country || '-' },
//                 { label: 'Created Date', value: selectedPatient.created_date },
//                 { label: 'Updated Date', value: selectedPatient.updated_date },
//                 { label: 'Father Name', value: selectedPatient.fatherName || '-' },
// { label: 'Disease', value: selectedPatient.disease || '-' },
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
//   Search, Download, ChevronDown, ChevronUp, ChevronsUpDown,
//   User, Phone, Mail, MapPin, Calendar, Edit, Trash2, Eye, Plus, X, FileText, Sheet, Printer
// } from 'lucide-react';

// import { getPatients, createPatientApi, updatePatientApi, deletePatientApi, countPatientApi } from '../../lib/commonApis';
// import { showToast } from '../../lib/notification';

// // ─── Print Patient ────────────────────────────────────────────────────────────
// const printPatient = (patient) => {
//   const html = `<!DOCTYPE html><html><head><title>Patient Card - ${patient.name}</title>
//   <style>
//     * { box-sizing: border-box; margin: 0; padding: 0; }
//     body { font-family: Arial, sans-serif; margin: 30px; color: #1e293b; background: #fff; }
//     .header { text-align: center; border-bottom: 2px solid #059669; padding-bottom: 16px; margin-bottom: 24px; }
//     .header h1 { color: #059669; font-size: 22px; margin-bottom: 4px; }
//     .header p { color: #64748b; font-size: 13px; }
//     .avatar { width: 60px; height: 60px; background: linear-gradient(135deg, #34d399, #0d9488);
//       border-radius: 50%; display: flex; align-items: center; justify-content: center;
//       font-size: 26px; font-weight: bold; color: white; margin: 0 auto 12px; line-height: 60px; text-align: center; }
//     .patient-name { font-size: 20px; font-weight: bold; text-align: center; margin-bottom: 4px; }
//     .patient-id { text-align: center; color: #64748b; font-size: 13px; margin-bottom: 20px; }
//     .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
//     .field { background: #f8fafc; border-radius: 10px; padding: 12px 14px; border: 1px solid #e2e8f0; }
//     .field-label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; font-weight: 600; }
//     .field-value { font-size: 14px; font-weight: 600; color: #1e293b; }
//     .full { grid-column: span 2; }
//     .badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; }
//     .male { background: #dbeafe; color: #1d4ed8; }
//     .female { background: #fce7f3; color: #be185d; }
//     .other { background: #ede9fe; color: #6d28d9; }
//     .footer { text-align: center; margin-top: 24px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px; }
//     @media print { body { margin: 15px; } }
//   </style></head><body>
//   <div class="header">
//     <h1>&#127973; MediCare Hospital</h1>
//     <p>Patient Record &nbsp;|&nbsp; Generated: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
//   </div>
//   <div class="avatar">${patient.name.charAt(0).toUpperCase()}</div>
//   <div class="patient-name">${patient.name}</div>
//   <div class="patient-id">Patient ID: ${patient.patientNumber || ('#' + patient.id)}</div>
//   <div class="grid">
//     <div class="field"><div class="field-label">Phone</div><div class="field-value">${patient.phone}</div></div>
//     <div class="field"><div class="field-label">Email</div><div class="field-value">${patient.email}</div></div>
//     <div class="field"><div class="field-label">Age</div><div class="field-value">${patient.age || '-'}</div></div>
//     <div class="field"><div class="field-label">Gender</div><div class="field-value">
//       <span class="badge ${(patient.gender || '').toLowerCase()}">${patient.gender || '-'}</span>
//     </div></div>
//     <div class="field"><div class="field-label">Father Name</div><div class="field-value">${patient.fatherName || '-'}</div></div>
//     <div class="field"><div class="field-label">Disease</div><div class="field-value">${patient.disease || '-'}</div></div>
//     <div class="field full"><div class="field-label">Address</div><div class="field-value">${patient.address}</div></div>
//     <div class="field"><div class="field-label">City</div><div class="field-value">${patient.city || '-'}</div></div>
//     <div class="field"><div class="field-label">Pincode</div><div class="field-value">${patient.pincode || '-'}</div></div>
//     <div class="field"><div class="field-label">State</div><div class="field-value">${patient.state || '-'}</div></div>
//     <div class="field"><div class="field-label">Country</div><div class="field-value">${patient.country || '-'}</div></div>
//     <div class="field"><div class="field-label">Registered On</div><div class="field-value">${patient.created_date}</div></div>
//     <div class="field"><div class="field-label">Last Updated</div><div class="field-value">${patient.updated_date}</div></div>
//   </div>
//   <div class="footer">MediCare Hospital Management System &nbsp;|&nbsp; Confidential Patient Record</div>
//   </body></html>`;

//   const w = window.open('', '', 'height=700,width=800');
//   w.document.write(html);
//   w.document.close();
//   w.focus();
//   setTimeout(() => { w.print(); }, 300);
// };

// // ─── Modal ────────────────────────────────────────────────────────────────────
// function Modal({ isOpen, onClose, title, children, size = 'md' }) {
//   if (!isOpen) return null;
//   const sizeClasses = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl' };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
//       <div
//         className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden`}
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

// // ─── Gender Dropdown ──────────────────────────────────────────────────────────
// function GenderDropdown({ value, onChange }) {
//   const [open, setOpen] = useState(false);
//   const options = ['MALE', 'FEMALE', 'OTHER'];

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
//       <input type="text" name="gender" value={value} onChange={() => {}} required className="sr-only" />
//     </div>
//   );
// }

// // ─── Status Dropdown ──────────────────────────────────────────────────────────
// const PATIENT_STATUSES = [
//   { value: 'REGISTERED',      label: 'Registered',      color: 'bg-slate-100 text-slate-700' },
//   { value: 'ADMITTED',        label: 'Admitted',        color: 'bg-yellow-100 text-yellow-700' },
//   { value: 'UNDER_TREATMENT', label: 'Under Treatment', color: 'bg-orange-100 text-orange-700' },
//   { value: 'CRITICAL',        label: 'Critical',        color: 'bg-red-100 text-red-700' },
//   { value: 'STABLE',          label: 'Stable',          color: 'bg-teal-100 text-teal-700' },
//   { value: 'RECOVERED',       label: 'Recovered',       color: 'bg-emerald-100 text-emerald-700' },
//   { value: 'DISCHARGED',      label: 'Discharged',      color: 'bg-blue-100 text-blue-700' },
//   { value: 'REFERRED',        label: 'Referred',        color: 'bg-purple-100 text-purple-700' },
//   { value: 'DECEASED',        label: 'Deceased',        color: 'bg-gray-200 text-gray-600' },
// ];

// function StatusDropdown({ value, onChange }) {
//   const [open, setOpen] = useState(false);
//   const selected = PATIENT_STATUSES.find(s => s.value === value);

//   const handleSelect = (opt) => {
//     onChange({ target: { name: 'status', value: opt } });
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
//           {selected ? selected.label : 'Select Status'}
//         </span>
//         <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180 text-emerald-600' : ''}`} />
//       </button>
//       {open && (
//         <div className="absolute z-20 w-full mt-1 bg-white border border-emerald-100 rounded-xl shadow-xl overflow-hidden">
//           {PATIENT_STATUSES.map((opt) => (
//             <button
//               key={opt.value}
//               type="button"
//               onClick={() => handleSelect(opt.value)}
//               className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors duration-150 flex items-center gap-2 ${
//                 value === opt.value
//                   ? 'bg-emerald-500 text-white'
//                   : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
//               }`}
//             >
//               {value === opt.value && <span className="w-2 h-2 rounded-full bg-white inline-block" />}
//               {opt.label}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // Status badge for listing/view
// function StatusBadge({ status }) {
//   const s = PATIENT_STATUSES.find(x => x.value === status);
//   if (!s) return <span className="text-slate-500">-</span>;
//   return (
//     <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${s.color}`}>
//       {s.label}
//     </span>
//   );
// }

// // ─── Patient Form ─────────────────────────────────────────────────────────────
// function PatientForm({ formData, onChange, onSubmit, onCancel, isEdit }) {
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

//       {/* Row 2: Father Name + Disease */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">Father Name</label>
//           <input
//             type="text"
//             name="fatherName"
//             value={formData.fatherName}
//             onChange={onChange}
//             placeholder="e.g. Ramesh Sharma"
//             className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">Disease</label>
//           <input
//             type="text"
//             name="disease"
//             value={formData.disease}
//             onChange={onChange}
//             placeholder="e.g. Diabetes, Hypertension"
//             className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//           />
//         </div>
//       </div>

//       {/* Row 3: Email + Age */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={onChange}
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

//       {/* Row 4: Gender + Status */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">Gender *</label>
//           <GenderDropdown value={formData.gender} onChange={onChange} />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
//           <StatusDropdown value={formData.status} onChange={onChange} />
//         </div>
//       </div>

//       {/* Address */}
//       <div>
//         <label className="block text-sm font-semibold text-slate-700 mb-2">Address *</label>
//         <textarea
//           name="address"
//           value={formData.address}
//           onChange={onChange}
//           required
//           rows="2"
//           placeholder="Enter full address"
//           className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//         />
//       </div>

//       {/* Row 5: City + Pincode */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
//           <input type="text" name="city" value={formData.city} onChange={onChange} placeholder="e.g. Bengaluru"
//             className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">Pincode</label>
//           <input type="text" name="pincode" value={formData.pincode} onChange={onChange} placeholder="e.g. 560001"
//             onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6))}
//             className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//         </div>
//       </div>

//       {/* Row 6: State + Country */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">State</label>
//           <input type="text" name="state" value={formData.state} onChange={onChange} placeholder="e.g. Karnataka"
//             className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">Country</label>
//           <input type="text" name="country" value={formData.country} onChange={onChange} placeholder="e.g. India"
//             className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//         </div>
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

// // ─── Constants ────────────────────────────────────────────────────────────────
// const EMPTY_FORM = {
//   name: '', email: '', age: '', gender: '', status: '', phone: '',
//   address: '', city: '', state: '', country: '', pincode: '',
//   fatherName: '', disease: ''
// };

// const mapPatient = (item) => ({
//   id: item.id,
//   name: item.name,
//   phone: item.phone,
//   email: item.user?.email || item.email || '-',
//   age: item.age,
//   gender: item.gender,
//   status: item.status || null,
//   address: item.address || '-',
//   city: item.city || '-',
//   state: item.state || '-',
//   country: item.country || '-',
//   pincode: item.pincode || '-',
//   fatherName: item.fatherName || '-',
//   disease: item.disease || '-',
//   patientNumber: item.patientNumber || '-',
//   created_date: item.createdAt.split('T')[0],
//   updated_date: item.updatedAt.split('T')[0],
// });

// // ─── Main Page ────────────────────────────────────────────────────────────────
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

//   const [total, setTotal] = useState(0);
//   const [today, setToday] = useState(0);
//   const [visited, setVisited] = useState(0);
//   const [unvisited, setUnvisited] = useState(0);

//   // ── Modal helpers ──────────────────────────────────────────────────────────
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
//             status: patient.status || '',
//             address: patient.address === '-' ? '' : patient.address,
//             city:       patient.city       === '-' ? '' : (patient.city       || ''),
//             state:      patient.state      === '-' ? '' : (patient.state      || ''),
//             country:    patient.country    === '-' ? '' : (patient.country    || ''),
//             pincode:    patient.pincode    === '-' ? '' : (patient.pincode    || ''),
//             fatherName: patient.fatherName === '-' ? '' : (patient.fatherName || ''),
//             disease:    patient.disease    === '-' ? '' : (patient.disease    || ''),
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

//   // ── API calls ──────────────────────────────────────────────────────────────
//   const fetchPatients = async (page = 1, limit = itemsPerPage) => {
//     try {
//       const res = await getPatients(limit, page);
//       setPatients(res.data.data.map(mapPatient));
//       setTotalMeta({ total: res.data.meta.total, totalPages: res.data.meta.totalPages });
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   const handleCountData = async () => {
//     countPatientApi()
//       .then(res => {
//         const data = res.data;
//         setTotal(data.totalPatients);
//         setToday(data.todayPatients);
//         setVisited(data.visitedPatients);
//         setUnvisited(data.unvisitedPatients);
//       })
//       .catch(err => console.error(err));
//   };

//   useEffect(() => {
//     handleCountData();
//     fetchPatients(currentPage, itemsPerPage);
//   }, [currentPage, itemsPerPage]);

//   const refreshPatients = () => fetchPatients(currentPage, itemsPerPage);

//   const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         ...formData,
//         age: formData.age !== '' ? Number(formData.age) : null,
//         gender: formData.gender || null,
//         status: formData.status || null,
//       };

//       if (modal.type === 'edit') {
//         await updatePatientApi(selectedPatient.id, payload);
//         showToast('success', 'Updated', 'Patient updated successfully.');
//         handleCountData();
//         await refreshPatients();
//         closeModal();
//       } else {
//         const res = await createPatientApi(payload);
//         showToast('success', 'Created', 'Patient created successfully.');
//         handleCountData();
//         await refreshPatients();
//         closeModal();
//         // ── Auto print after create ──
//         const created = mapPatient(res?.data?.data || res?.data);
//         printPatient(created);
//       }
//     } catch (error) {
//       showToast('error', 'Failed', 'Failed to save Patient.');
//       console.error(error);
//     }
//   };

//   const handleDeletePatient = async () => {
//     if (!selectedPatient) return;
//     try {
//       await deletePatientApi(selectedPatient.id);
//       showToast('success', 'Deleted', 'Patient deleted successfully.');
//       handleCountData();
//       await refreshPatients();
//       closeModal();
//     } catch (error) {
//       alert(error.message || 'Failed to delete patient');
//     }
//   };

//   // ── Sorting & Filtering ────────────────────────────────────────────────────
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
//       (p.gender && p.gender.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (p.fatherName && p.fatherName.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (p.disease && p.disease.toLowerCase().includes(searchTerm.toLowerCase()))
//     ), [sortedPatients, searchTerm]);

//   const totalPages = totalMeta.totalPages;
//   const totalCount = totalMeta.total;
//   const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
//   const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalCount);

//   // ── Export ─────────────────────────────────────────────────────────────────
//   const exportToExcel = () => {
//     const headers = ['ID', 'Patient No', 'Name', 'Phone', 'Email', 'Age', 'Gender', 'Status', 'Father Name', 'Disease', 'Address', 'City', 'State', 'Country', 'Pincode', 'Created Date', 'Updated Date'];
//     const csvData = [
//       headers.join(','),
//       ...filteredPatients.map(p =>
//         `${p.id},"${p.patientNumber}","${p.name}","${p.phone}","${p.email}","${p.age || '-'}","${p.gender || '-'}","${p.status || '-'}","${p.fatherName || '-'}","${p.disease || '-'}","${p.address}","${p.city || '-'}","${p.state || '-'}","${p.country || '-'}","${p.pincode || '-'}",${p.created_date},${p.updated_date}`
//       ),
//     ].join('\n');
//     const link = document.createElement('a');
//     link.setAttribute('href', URL.createObjectURL(new Blob([csvData], { type: 'text/csv;charset=utf-8;' })));
//     link.setAttribute('download', `patients_${new Date().toISOString().split('T')[0]}.csv`);
//     document.body.appendChild(link); link.click(); document.body.removeChild(link);
//     setShowExportMenu(false);
//   };

//   const exportToPDF = () => {
//     const htmlContent = `<!DOCTYPE html><html><head><title>Patients Report</title><style>
//       body{font-family:Arial,sans-serif;margin:20px}
//       h1{color:#059669;text-align:center}
//       table{width:100%;border-collapse:collapse;margin-top:20px}
//       th{background-color:#059669;color:white;padding:10px;text-align:left;font-size:12px}
//       td{padding:8px;border-bottom:1px solid #ddd;font-size:12px}
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
//             <th>Patient No</th><th>Name</th><th>Phone</th><th>Email</th>
//             <th>Age</th><th>Gender</th><th>Status</th><th>Father Name</th><th>Disease</th>
//             <th>City</th><th>State</th><th>Created</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${filteredPatients.map(p => `
//             <tr>
//               <td>${p.patientNumber}</td><td>${p.name}</td><td>${p.phone}</td><td>${p.email}</td>
//               <td>${p.age || '-'}</td><td>${p.gender || '-'}</td><td>${p.status || '-'}</td>
//               <td>${p.fatherName || '-'}</td><td>${p.disease || '-'}</td>
//               <td>${p.city || '-'}</td><td>${p.state || '-'}</td><td>${p.created_date}</td>
//             </tr>`).join('')}
//         </tbody>
//       </table>
//     </body></html>`;
//     const w = window.open('', '', 'height=600,width=1100');
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

//   // ── Table columns ──────────────────────────────────────────────────────────
//   const TABLE_COLS = [
//     { key: 'patientNumber', icon: <User className="w-4 h-4" />, label: 'Patient ID' },
//     { key: 'name',          icon: <User className="w-4 h-4" />, label: 'Patient Name' },
//     { key: 'phone',         icon: <Phone className="w-4 h-4" />, label: 'Phone' },
//     { key: 'email',         icon: <Mail className="w-4 h-4" />, label: 'Email' },
//     { key: 'age',           icon: <User className="w-4 h-4" />, label: 'Age' },
//     { key: 'gender',        icon: <User className="w-4 h-4" />, label: 'Gender' },
//     { key: 'status',        icon: <User className="w-4 h-4" />, label: 'Status' },
//     { key: 'fatherName',    icon: <User className="w-4 h-4" />, label: 'Father Name' },
//     { key: 'disease',       icon: <FileText className="w-4 h-4" />, label: 'Disease' },
//     { key: 'address',       icon: <MapPin className="w-4 h-4" />, label: 'Address' },
//     { key: 'created_date',  icon: <Calendar className="w-4 h-4" />, label: 'Created' },
//     { key: 'updated_date',  icon: <Calendar className="w-4 h-4" />, label: 'Updated' },
//   ];

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
//             { label: 'Total Patients',    value: total,    color: 'text-slate-800' },
//             { label: 'Today Patients',    value: today,    color: 'text-emerald-600' },
//             { label: 'Visited Patients',  value: visited,  color: 'text-blue-600' },
//             { label: 'Unvisited Patients',value: unvisited,color: 'text-red-500' },
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
//             <input type="text" placeholder="Search by name, phone, email, age, gender, father name, disease..." value={searchTerm}
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
//                 {TABLE_COLS.map(({ key, icon, label }) => (
//                   <th key={key} className="px-6 py-4 text-left">
//                     <button onClick={() => handleSort(key)} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors whitespace-nowrap">
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
//                   <td className="px-6 py-4 text-slate-600 font-medium">{patient.patientNumber}</td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
//                         {patient.name.charAt(0)}
//                       </div>
//                       <span className="font-semibold text-slate-800 whitespace-nowrap">{patient.name}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-slate-600">{patient.phone}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.email}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.age || '-'}</td>
//                   <td className="px-6 py-4">
//                     {patient.gender ? (
//                       <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
//                         patient.gender === 'MALE' ? 'bg-blue-100 text-blue-700'
//                         : patient.gender === 'FEMALE' ? 'bg-pink-100 text-pink-700'
//                         : 'bg-purple-100 text-purple-700'
//                       }`}>
//                         {patient.gender}
//                       </span>
//                     ) : '-'}
//                   </td>
//                   <td className="px-6 py-4">
//                     <StatusBadge status={patient.status} />
//                   </td>
//                   <td className="px-6 py-4 text-slate-600">{patient.fatherName || '-'}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.disease || '-'}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.address}</td>
//                   <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{patient.created_date}</td>
//                   <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{patient.updated_date}</td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center justify-center gap-1">
//                       <button onClick={() => openModal('view', patient)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View"><Eye className="w-4 h-4" /></button>
//                       <button onClick={() => openModal('edit', patient)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
//                       <button onClick={() => printPatient(patient)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" title="Print"><Printer className="w-4 h-4" /></button>
//                       <button onClick={() => openModal('delete', patient)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
//                     </div>
//                   </td>
//                 </tr>
//               )) : (
//                 <tr>
//                   <td colSpan={13} className="px-6 py-12 text-center">
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
//       <Modal isOpen={modal.type === 'add' || modal.type === 'edit'} onClose={closeModal}
//         title={modal.type === 'edit' ? 'Edit Patient' : 'Add New Patient'} size="md">
//         <PatientForm formData={formData} onChange={handleFormChange} onSubmit={handleSubmit} onCancel={closeModal} isEdit={modal.type === 'edit'} />
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
//                 <p className="text-slate-500 text-sm">{selectedPatient.patientNumber}</p>
//                 <div className="mt-1"><StatusBadge status={selectedPatient.status} /></div>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               {[
//                 { label: 'Phone Number',  value: selectedPatient.phone },
//                 { label: 'Email Address', value: selectedPatient.email },
//                 { label: 'Age',           value: selectedPatient.age || '-' },
//                 { label: 'Gender',        value: selectedPatient.gender || '-' },
//                 { label: 'Father Name',   value: selectedPatient.fatherName || '-' },
//                 { label: 'Disease',       value: selectedPatient.disease || '-' },
//                 { label: 'Address',       value: selectedPatient.address, full: true },
//                 { label: 'City',          value: selectedPatient.city || '-' },
//                 { label: 'Pincode',       value: selectedPatient.pincode || '-' },
//                 { label: 'State',         value: selectedPatient.state || '-' },
//                 { label: 'Country',       value: selectedPatient.country || '-' },
//                 { label: 'Created Date',  value: selectedPatient.created_date },
//                 { label: 'Updated Date',  value: selectedPatient.updated_date },
//               ].map(({ label, value, full }) => (
//                 <div key={label} className={full ? 'col-span-2' : ''}>
//                   <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wide">{label}</p>
//                   <p className="font-semibold text-slate-800">{value}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="flex gap-3 pt-4 border-t border-slate-200">
//               <button onClick={() => printPatient(selectedPatient)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold flex items-center justify-center gap-2">
//                 <Printer className="w-4 h-4" /> Print
//               </button>
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
//   Search, Download, ChevronDown, ChevronUp, ChevronsUpDown,
//   User, Phone, Mail, MapPin, Calendar, Edit, Trash2, Eye, Plus, X, FileText, Sheet, Printer
// } from 'lucide-react';

// import { getPatients, createPatientApi, updatePatientApi, deletePatientApi, countPatientApi } from '../../lib/commonApis';
// import { showToast } from '../../lib/notification';

// // ─── Print Patient ────────────────────────────────────────────────────────────
// const printPatient = (patient) => {
//   const html = `<!DOCTYPE html><html><head><title>Patient Card - ${patient.name}</title>
//   <style>
//     * { box-sizing: border-box; margin: 0; padding: 0; }
//     body { font-family: Arial, sans-serif; margin: 30px; color: #1e293b; background: #fff; }
//     .header { text-align: center; border-bottom: 2px solid #059669; padding-bottom: 16px; margin-bottom: 24px; }
//     .header h1 { color: #059669; font-size: 22px; margin-bottom: 4px; }
//     .header p { color: #64748b; font-size: 13px; }
//     .avatar { width: 60px; height: 60px; background: linear-gradient(135deg, #34d399, #0d9488);
//       border-radius: 50%; display: flex; align-items: center; justify-content: center;
//       font-size: 26px; font-weight: bold; color: white; margin: 0 auto 12px; line-height: 60px; text-align: center; }
//     .patient-name { font-size: 20px; font-weight: bold; text-align: center; margin-bottom: 4px; }
//     .patient-id { text-align: center; color: #64748b; font-size: 13px; margin-bottom: 20px; }
//     .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
//     .field { background: #f8fafc; border-radius: 10px; padding: 12px 14px; border: 1px solid #e2e8f0; }
//     .field-label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; font-weight: 600; }
//     .field-value { font-size: 14px; font-weight: 600; color: #1e293b; }
//     .full { grid-column: span 2; }
//     .badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; }
//     .male { background: #dbeafe; color: #1d4ed8; }
//     .female { background: #fce7f3; color: #be185d; }
//     .other { background: #ede9fe; color: #6d28d9; }
//     .footer { text-align: center; margin-top: 24px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px; }
//     @media print { body { margin: 15px; } }
//   </style></head><body>
//   <div class="header">
//     <h1>&#127973; MediCare Hospital</h1>
//     <p>Patient Record &nbsp;|&nbsp; Generated: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
//   </div>
//   <div class="avatar">${patient.name.charAt(0).toUpperCase()}</div>
//   <div class="patient-name">${patient.name}</div>
//   <div class="patient-id">Patient ID: ${patient.patientNumber || ('#' + patient.id)}</div>
//   <div class="grid">
//     <div class="field"><div class="field-label">Phone</div><div class="field-value">${patient.phone}</div></div>
//     <div class="field"><div class="field-label">Email</div><div class="field-value">${patient.email}</div></div>
//     <div class="field"><div class="field-label">Age</div><div class="field-value">${patient.age || '-'}</div></div>
//     <div class="field"><div class="field-label">Gender</div><div class="field-value">
//       <span class="badge ${(patient.gender || '').toLowerCase()}">${patient.gender || '-'}</span>
//     </div></div>
//     <div class="field"><div class="field-label">Father Name</div><div class="field-value">${patient.fatherName || '-'}</div></div>
//     <div class="field"><div class="field-label">Disease</div><div class="field-value">${patient.disease || '-'}</div></div>
//     <div class="field full"><div class="field-label">Address</div><div class="field-value">${patient.address}</div></div>
//     <div class="field"><div class="field-label">City</div><div class="field-value">${patient.city || '-'}</div></div>
//     <div class="field"><div class="field-label">Pincode</div><div class="field-value">${patient.pincode || '-'}</div></div>
//     <div class="field"><div class="field-label">State</div><div class="field-value">${patient.state || '-'}</div></div>
//     <div class="field"><div class="field-label">Country</div><div class="field-value">${patient.country || '-'}</div></div>
//     <div class="field"><div class="field-label">Registered On</div><div class="field-value">${patient.created_date}</div></div>
//     <div class="field"><div class="field-label">Last Updated</div><div class="field-value">${patient.updated_date}</div></div>
//   </div>
//   <div class="footer">MediCare Hospital Management System &nbsp;|&nbsp; Confidential Patient Record</div>
//   </body></html>`;

//   const w = window.open('', '', 'height=700,width=800');
//   w.document.write(html);
//   w.document.close();
//   w.focus();
//   setTimeout(() => { w.print(); }, 300);
// };

// // ─── Modal ────────────────────────────────────────────────────────────────────
// function Modal({ isOpen, onClose, title, children, size = 'md' }) {
//   if (!isOpen) return null;
//   const sizeClasses = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl' };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
//       <div
//         className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden`}
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

// // ─── Gender Dropdown ──────────────────────────────────────────────────────────
// function GenderDropdown({ value, onChange }) {
//   const [open, setOpen] = useState(false);
//   const options = ['MALE', 'FEMALE', 'OTHER'];

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
//       <input type="text" name="gender" value={value} onChange={() => {}} required className="sr-only" />
//     </div>
//   );
// }

// // ─── Status Dropdown ──────────────────────────────────────────────────────────
// const PATIENT_STATUSES = [
//   { value: 'REGISTERED',      label: 'Registered',      color: 'bg-slate-100 text-slate-700' },
//   { value: 'ADMITTED',        label: 'Admitted',        color: 'bg-yellow-100 text-yellow-700' },
//   { value: 'UNDER_TREATMENT', label: 'Under Treatment', color: 'bg-orange-100 text-orange-700' },
//   { value: 'CRITICAL',        label: 'Critical',        color: 'bg-red-100 text-red-700' },
//   { value: 'STABLE',          label: 'Stable',          color: 'bg-teal-100 text-teal-700' },
//   { value: 'RECOVERED',       label: 'Recovered',       color: 'bg-emerald-100 text-emerald-700' },
//   { value: 'DISCHARGED',      label: 'Discharged',      color: 'bg-blue-100 text-blue-700' },
//   { value: 'REFERRED',        label: 'Referred',        color: 'bg-purple-100 text-purple-700' },
//   { value: 'DECEASED',        label: 'Deceased',        color: 'bg-gray-200 text-gray-600' },
// ];

// function StatusDropdown({ value, onChange }) {
//   const [open, setOpen] = useState(false);
//   const selected = PATIENT_STATUSES.find(s => s.value === value);

//   const handleSelect = (opt) => {
//     onChange({ target: { name: 'status', value: opt } });
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
//           {selected ? selected.label : 'Select Status'}
//         </span>
//         <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180 text-emerald-600' : ''}`} />
//       </button>
//       {open && (
//         <div className="absolute z-20 w-full mt-1 bg-white border border-emerald-100 rounded-xl shadow-xl overflow-hidden">
//           {PATIENT_STATUSES.map((opt) => (
//             <button
//               key={opt.value}
//               type="button"
//               onClick={() => handleSelect(opt.value)}
//               className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors duration-150 flex items-center gap-2 ${
//                 value === opt.value
//                   ? 'bg-emerald-500 text-white'
//                   : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
//               }`}
//             >
//               {value === opt.value && <span className="w-2 h-2 rounded-full bg-white inline-block" />}
//               {opt.label}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // Status badge for listing/view
// function StatusBadge({ status }) {
//   const s = PATIENT_STATUSES.find(x => x.value === status);
//   if (!s) return <span className="text-slate-500">-</span>;
//   return (
//     <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${s.color}`}>
//       {s.label}
//     </span>
//   );
// }

// // ─── Patient Form ─────────────────────────────────────────────────────────────
// function PatientForm({ formData, onChange, onSubmit, onCancel, isEdit }) {
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

//       {/* Row 2: Father Name + Disease */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">Father Name</label>
//           <input
//             type="text"
//             name="fatherName"
//             value={formData.fatherName}
//             onChange={onChange}
//             placeholder="e.g. Ramesh Sharma"
//             className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">Disease</label>
//           <input
//             type="text"
//             name="disease"
//             value={formData.disease}
//             onChange={onChange}
//             placeholder="e.g. Diabetes, Hypertension"
//             className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//           />
//         </div>
//       </div>

//       {/* Row 3: Email + Age */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={onChange}
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

//       {/* Row 4: Gender + Status */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">Gender *</label>
//           <GenderDropdown value={formData.gender} onChange={onChange} />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
//           <StatusDropdown value={formData.status} onChange={onChange} />
//         </div>
//       </div>

//       {/* Address */}
//       <div>
//         <label className="block text-sm font-semibold text-slate-700 mb-2">Address *</label>
//         <textarea
//           name="address"
//           value={formData.address}
//           onChange={onChange}
//           required
//           rows="2"
//           placeholder="Enter full address"
//           className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
//         />
//       </div>

//       {/* Row 5: City + Pincode */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
//           <input type="text" name="city" value={formData.city} onChange={onChange} placeholder="e.g. Bengaluru"
//             className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">Pincode</label>
//           <input type="text" name="pincode" value={formData.pincode} onChange={onChange} placeholder="e.g. 560001"
//             onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6))}
//             className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//         </div>
//       </div>

//       {/* Row 6: State + Country */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">State</label>
//           <input type="text" name="state" value={formData.state} onChange={onChange} placeholder="e.g. Karnataka"
//             className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">Country</label>
//           <input type="text" name="country" value={formData.country} onChange={onChange} placeholder="e.g. India"
//             className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
//         </div>
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

// // ─── Constants ────────────────────────────────────────────────────────────────
// const EMPTY_FORM = {
//   name: '', email: '', age: '', gender: '', status: '', phone: '',
//   address: '', city: '', state: '', country: '', pincode: '',
//   fatherName: '', disease: ''
// };

// const mapPatient = (item) => ({
//   id: item.id,
//   name: item.name,
//   phone: item.phone,
//   email: item.user?.email || item.email || '-',
//   age: item.age,
//   gender: item.gender,
//   status: item.status || null,
//   address: item.address || '-',
//   city: item.city || '-',
//   state: item.state || '-',
//   country: item.country || '-',
//   pincode: item.pincode || '-',
//   fatherName: item.fatherName || '-',
//   disease: item.disease || '-',
//   patientNumber: item.patientNumber || '-',
//   created_date: item.createdAt.split('T')[0],
//   updated_date: item.updatedAt.split('T')[0],
// });

// // ─── Main Page ────────────────────────────────────────────────────────────────
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

//   const [total, setTotal] = useState(0);
//   const [today, setToday] = useState(0);
//   const [visited, setVisited] = useState(0);
//   const [unvisited, setUnvisited] = useState(0);

//   // ── Modal helpers ──────────────────────────────────────────────────────────
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
//             status: patient.status || '',
//             address: patient.address === '-' ? '' : patient.address,
//             city:       patient.city       === '-' ? '' : (patient.city       || ''),
//             state:      patient.state      === '-' ? '' : (patient.state      || ''),
//             country:    patient.country    === '-' ? '' : (patient.country    || ''),
//             pincode:    patient.pincode    === '-' ? '' : (patient.pincode    || ''),
//             fatherName: patient.fatherName === '-' ? '' : (patient.fatherName || ''),
//             disease:    patient.disease    === '-' ? '' : (patient.disease    || ''),
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

//   // ── API calls ──────────────────────────────────────────────────────────────
//   const fetchPatients = async (page = 1, limit = itemsPerPage) => {
//     try {
//       const res = await getPatients(limit, page);
//       setPatients(res.data.data.map(mapPatient));
//       setTotalMeta({ total: res.data.meta.total, totalPages: res.data.meta.totalPages });
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   const handleCountData = async () => {
//     countPatientApi()
//       .then(res => {
//         const data = res.data;
//         setTotal(data.totalPatients);
//         setToday(data.todayPatients);
//         setVisited(data.visitedPatients);
//         setUnvisited(data.unvisitedPatients);
//       })
//       .catch(err => console.error(err));
//   };

//   useEffect(() => {
//     handleCountData();
//     fetchPatients(currentPage, itemsPerPage);
//   }, [currentPage, itemsPerPage]);

//   const refreshPatients = () => fetchPatients(currentPage, itemsPerPage);

//   const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         ...formData,
//         age: formData.age !== '' ? Number(formData.age) : null,
//         gender: formData.gender || null,
//         status: formData.status || null,
//       };

//       if (modal.type === 'edit') {
//         await updatePatientApi(selectedPatient.id, payload);
//         showToast('success', 'Updated', 'Patient updated successfully.');
//         handleCountData();
//         await refreshPatients();
//         closeModal();
//       } else {
//         const res = await createPatientApi(payload);
//         showToast('success', 'Created', 'Patient created successfully.');
//         handleCountData();
//         await refreshPatients();
//         closeModal();
//         // ── Auto print after create ──
//         const created = mapPatient(res?.data?.data || res?.data);
//         printPatient(created);
//       }
//     } catch (error) {
//       showToast('error', 'Failed', 'Failed to save Patient.');
//       console.error(error);
//     }
//   };

//   const handleDeletePatient = async () => {
//     if (!selectedPatient) return;
//     try {
//       await deletePatientApi(selectedPatient.id);
//       showToast('success', 'Deleted', 'Patient deleted successfully.');
//       handleCountData();
//       await refreshPatients();
//       closeModal();
//     } catch (error) {
//       alert(error.message || 'Failed to delete patient');
//     }
//   };

//   // ── Sorting & Filtering ────────────────────────────────────────────────────
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
//       (p.gender && p.gender.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (p.fatherName && p.fatherName.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (p.disease && p.disease.toLowerCase().includes(searchTerm.toLowerCase()))
//     ), [sortedPatients, searchTerm]);

//   const totalPages = totalMeta.totalPages;
//   const totalCount = totalMeta.total;
//   const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
//   const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalCount);

//   // ── Export ─────────────────────────────────────────────────────────────────
//   const exportToExcel = () => {
//     const headers = ['ID', 'Patient No', 'Name', 'Phone', 'Email', 'Age', 'Gender', 'Status', 'Father Name', 'Disease', 'Address', 'City', 'State', 'Country', 'Pincode', 'Created Date', 'Updated Date'];
//     const csvData = [
//       headers.join(','),
//       ...filteredPatients.map(p =>
//         `${p.id},"${p.patientNumber}","${p.name}","${p.phone}","${p.email}","${p.age || '-'}","${p.gender || '-'}","${p.status || '-'}","${p.fatherName || '-'}","${p.disease || '-'}","${p.address}","${p.city || '-'}","${p.state || '-'}","${p.country || '-'}","${p.pincode || '-'}",${p.created_date},${p.updated_date}`
//       ),
//     ].join('\n');
//     const link = document.createElement('a');
//     link.setAttribute('href', URL.createObjectURL(new Blob([csvData], { type: 'text/csv;charset=utf-8;' })));
//     link.setAttribute('download', `patients_${new Date().toISOString().split('T')[0]}.csv`);
//     document.body.appendChild(link); link.click(); document.body.removeChild(link);
//     setShowExportMenu(false);
//   };

//   const exportToPDF = () => {
//     const htmlContent = `<!DOCTYPE html><html><head><title>Patients Report</title><style>
//       body{font-family:Arial,sans-serif;margin:20px}
//       h1{color:#059669;text-align:center}
//       table{width:100%;border-collapse:collapse;margin-top:20px}
//       th{background-color:#059669;color:white;padding:10px;text-align:left;font-size:12px}
//       td{padding:8px;border-bottom:1px solid #ddd;font-size:12px}
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
//             <th>Patient No</th><th>Name</th><th>Phone</th><th>Email</th>
//             <th>Age</th><th>Gender</th><th>Status</th><th>Father Name</th><th>Disease</th>
//             <th>City</th><th>State</th><th>Created</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${filteredPatients.map(p => `
//             <tr>
//               <td>${p.patientNumber}</td><td>${p.name}</td><td>${p.phone}</td><td>${p.email}</td>
//               <td>${p.age || '-'}</td><td>${p.gender || '-'}</td><td>${p.status || '-'}</td>
//               <td>${p.fatherName || '-'}</td><td>${p.disease || '-'}</td>
//               <td>${p.city || '-'}</td><td>${p.state || '-'}</td><td>${p.created_date}</td>
//             </tr>`).join('')}
//         </tbody>
//       </table>
//     </body></html>`;
//     const w = window.open('', '', 'height=600,width=1100');
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

//   // ── Table columns ──────────────────────────────────────────────────────────
//   const TABLE_COLS = [
//     { key: 'patientNumber', icon: <User className="w-4 h-4" />, label: 'Patient ID' },
//     { key: 'name',          icon: <User className="w-4 h-4" />, label: 'Patient Name' },
//     { key: 'phone',         icon: <Phone className="w-4 h-4" />, label: 'Phone' },
//     { key: 'email',         icon: <Mail className="w-4 h-4" />, label: 'Email' },
//     { key: 'age',           icon: <User className="w-4 h-4" />, label: 'Age' },
//     { key: 'gender',        icon: <User className="w-4 h-4" />, label: 'Gender' },
//     { key: 'status',        icon: <User className="w-4 h-4" />, label: 'Status' },
//     { key: 'fatherName',    icon: <User className="w-4 h-4" />, label: 'Father Name' },
//     { key: 'disease',       icon: <FileText className="w-4 h-4" />, label: 'Disease' },
//     { key: 'address',       icon: <MapPin className="w-4 h-4" />, label: 'Address' },
//     { key: 'created_date',  icon: <Calendar className="w-4 h-4" />, label: 'Created' },
//     { key: 'updated_date',  icon: <Calendar className="w-4 h-4" />, label: 'Updated' },
//   ];

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
//             { label: 'Total Patients',    value: total,    color: 'text-slate-800' },
//             { label: 'Today Patients',    value: today,    color: 'text-emerald-600' },
//             { label: 'Visited Patients',  value: visited,  color: 'text-blue-600' },
//             { label: 'Unvisited Patients',value: unvisited,color: 'text-red-500' },
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
//             <input type="text" placeholder="Search by name, phone, email, age, gender, father name, disease..." value={searchTerm}
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
//                 {TABLE_COLS.map(({ key, icon, label }) => (
//                   <th key={key} className="px-6 py-4 text-left">
//                     <button onClick={() => handleSort(key)} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors whitespace-nowrap">
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
//                   <td className="px-6 py-4 text-slate-600 font-medium">{patient.patientNumber}</td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
//                         {patient.name.charAt(0)}
//                       </div>
//                       <span className="font-semibold text-slate-800 whitespace-nowrap">{patient.name}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-slate-600">{patient.phone}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.email}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.age || '-'}</td>
//                   <td className="px-6 py-4">
//                     {patient.gender ? (
//                       <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
//                         patient.gender === 'MALE' ? 'bg-blue-100 text-blue-700'
//                         : patient.gender === 'FEMALE' ? 'bg-pink-100 text-pink-700'
//                         : 'bg-purple-100 text-purple-700'
//                       }`}>
//                         {patient.gender}
//                       </span>
//                     ) : '-'}
//                   </td>
//                   <td className="px-6 py-4">
//                     <StatusBadge status={patient.status} />
//                   </td>
//                   <td className="px-6 py-4 text-slate-600">{patient.fatherName || '-'}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.disease || '-'}</td>
//                   <td className="px-6 py-4 text-slate-600">{patient.address}</td>
//                   <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{patient.created_date}</td>
//                   <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{patient.updated_date}</td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center justify-center gap-1">
//                       <button onClick={() => openModal('view', patient)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View"><Eye className="w-4 h-4" /></button>
//                       <button onClick={() => openModal('edit', patient)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
//                       <button onClick={() => printPatient(patient)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" title="Print"><Printer className="w-4 h-4" /></button>
//                       <button onClick={() => openModal('delete', patient)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
//                     </div>
//                   </td>
//                 </tr>
//               )) : (
//                 <tr>
//                   <td colSpan={13} className="px-6 py-12 text-center">
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
//       <Modal isOpen={modal.type === 'add' || modal.type === 'edit'} onClose={closeModal}
//         title={modal.type === 'edit' ? 'Edit Patient' : 'Add New Patient'} size="md">
//         <PatientForm formData={formData} onChange={handleFormChange} onSubmit={handleSubmit} onCancel={closeModal} isEdit={modal.type === 'edit'} />
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
//                 <p className="text-slate-500 text-sm">{selectedPatient.patientNumber}</p>
//                 <div className="mt-1"><StatusBadge status={selectedPatient.status} /></div>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               {[
//                 { label: 'Phone Number',  value: selectedPatient.phone },
//                 { label: 'Email Address', value: selectedPatient.email },
//                 { label: 'Age',           value: selectedPatient.age || '-' },
//                 { label: 'Gender',        value: selectedPatient.gender || '-' },
//                 { label: 'Father Name',   value: selectedPatient.fatherName || '-' },
//                 { label: 'Disease',       value: selectedPatient.disease || '-' },
//                 { label: 'Address',       value: selectedPatient.address, full: true },
//                 { label: 'City',          value: selectedPatient.city || '-' },
//                 { label: 'Pincode',       value: selectedPatient.pincode || '-' },
//                 { label: 'State',         value: selectedPatient.state || '-' },
//                 { label: 'Country',       value: selectedPatient.country || '-' },
//                 { label: 'Created Date',  value: selectedPatient.created_date },
//                 { label: 'Updated Date',  value: selectedPatient.updated_date },
//               ].map(({ label, value, full }) => (
//                 <div key={label} className={full ? 'col-span-2' : ''}>
//                   <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wide">{label}</p>
//                   <p className="font-semibold text-slate-800">{value}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="flex gap-3 pt-4 border-t border-slate-200">
//               <button onClick={() => printPatient(selectedPatient)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold flex items-center justify-center gap-2">
//                 <Printer className="w-4 h-4" /> Print
//               </button>
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
  Search, Download, ChevronDown, ChevronUp, ChevronsUpDown,
  User, Phone, Mail, MapPin, Calendar, Edit, Trash2, Eye, Plus, X, FileText, Sheet, Printer
} from 'lucide-react';

import { getPatients, createPatientApi, updatePatientApi, deletePatientApi, countPatientApi } from '../../lib/commonApis';
import { showToast } from '../../lib/notification';

// ─── Get Hospital Info from localStorage ─────────────────────────────────────
const getHospitalInfo = () => {
  try {
    const raw = localStorage.getItem('user');
    if (!raw) return {};
    const user = JSON.parse(raw);
    return user?.hospital || {};
  } catch { return {}; }
};

// ─── Print Patient ────────────────────────────────────────────────────────────
const printPatient = (patient) => {
  const hospital = getHospitalInfo();

  const now       = new Date();
  const visitDate = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  const visitTime = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();

  const consultFee = 500;
  const upiId      = hospital.upiId || '';
  const hospName   = hospital.name  || 'MediCare Hospital';
  const upiString  = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(hospName)}&am=${consultFee}&cu=INR&tn=Consultation`;
  const qrUrl      = `https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(upiString)}`;

  const addrLine   = [patient.address, patient.city].filter(x => x && x !== '-').join(', ');
  const addrLine2  = [patient.state, patient.pincode].filter(x => x && x !== '-').join(' - ');

  const hospPhone  = hospital.phone   || '';
  const hospEmail  = hospital.email   || '';
  const hospAddr   = [hospital.address, hospital.city, hospital.state, hospital.pincode].filter(Boolean).join(', ') || '';

  const receiptNo   = `RCP/${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(patient.id || '').padStart(6,'0')}`;
  const receiptDate = `${visitDate} ${visitTime}`;
  const hospitalName = hospName;

  // ── CHANGED: full green theme (#059669 / #0d9488 / #065f46) ──────────────
  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Patient File - ${patient.name}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
    color: #1a1a1a;
    background: #fff;
    padding: 20px 24px;
    max-width: 800px;
    margin: 0 auto;
  }

  /* ══ HEADER ══ */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 12px;
    border-bottom: 2px solid #059669;
    margin-bottom: 14px;
  }
  .brand { display: flex; align-items: center; gap: 10px; }
  .brand-icon {
    width: 52px; height: 52px;
    border: 2.5px solid #059669;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 26px; font-weight: 900; color: #059669;
    line-height: 1;
  }
  .brand-name { font-size: 21px; font-weight: 900; color: #059669; line-height: 1.2; }
  .brand-tag  { font-size: 11.5px; color: #6b7280; margin-top: 2px; }
  .contact-info { text-align: right; font-size: 12px; color: #374151; line-height: 1.85; }
  .contact-info div { display: flex; align-items: center; justify-content: flex-end; gap: 6px; }
  .ci { font-size: 12px; }

  /* ══ PAGE TITLE ══ */
  .page-title {
    text-align: center;
    font-size: 16px;
    font-weight: 900;
    letter-spacing: 3px;
    color: #059669;
    text-transform: uppercase;
    padding: 10px 0 12px;
    border-bottom: 1px solid #d1fae5;
    margin-bottom: 14px;
  }

  /* ══ PATIENT + VISIT 2-COL ══ */
  .two-col-box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid #d1fae5;
    margin-bottom: 16px;
  }
  .info-col { padding: 14px 16px; }
  .info-col:first-child { border-right: 1px solid #d1fae5; }
  .col-heading {
    font-size: 13.5px;
    font-weight: 800;
    color: #059669;
    margin-bottom: 13px;
  }
  .info-row {
    display: table;
    width: 100%;
    margin-bottom: 9px;
    font-size: 13px;
  }
  .lbl {
    display: table-cell;
    width: 115px;
    font-weight: 600;
    color: #374151;
    vertical-align: top;
  }
  .colon {
    display: table-cell;
    width: 16px;
    color: #9ca3af;
    text-align: center;
    vertical-align: top;
  }
  .val {
    display: table-cell;
    font-weight: 700;
    color: #111827;
    vertical-align: top;
  }
  .val.addr-val { line-height: 1.5; }

  /* ══ BILLING SECTION ══ */
  .billing-heading {
    font-size: 13.5px;
    font-weight: 800;
    color: #059669;
    margin-bottom: 10px;
  }
  .billing-layout {
    display: grid;
    grid-template-columns: 1fr 160px;
    gap: 14px;
    margin-bottom: 16px;
    align-items: start;
  }
  .bill-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    border: 1px solid #d1fae5;
  }
  .bill-table th {
    background: #f0fdf4;
    padding: 8px 11px;
    text-align: left;
    font-weight: 700;
    color: #065f46;
    border: 1px solid #d1fae5;
    font-size: 12.5px;
  }
  .bill-table th.right, .bill-table td.right { text-align: right; }
  .bill-table td {
    padding: 8px 11px;
    border: 1px solid #d1fae5;
    color: #1f2937;
  }
  .bill-table td.center { text-align: center; }
  .bill-table tr.sum td {
    font-weight: 700;
    background: #f9fafb;
  }
  .bill-table tr.sum td.paid-green { color: #16a34a; font-weight: 800; }

  /* ══ QR BOX ══ */
  .qr-box {
    border: 1.5px solid #059669;
    border-radius: 8px;
    padding: 12px 10px;
    text-align: center;
  }
  .qr-box-title { font-size: 11.5px; font-weight: 700; color: #059669; margin-bottom: 4px; }
  .qr-amount    { font-size: 28px; font-weight: 900; color: #16a34a; margin-bottom: 8px; line-height: 1; }
  .qr-img-wrap  { margin: 0 auto 8px; width: 120px; height: 120px; }
  .qr-img-wrap img { width: 120px; height: 120px; display: block; }
  .qr-no-upi   {
    width: 120px; height: 120px;
    border: 1px dashed #9ca3af;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; color: #9ca3af; margin: 0 auto 8px;
  }
  .qr-thanks { font-size: 11px; font-weight: 700; color: #059669; line-height: 1.5; }

  /* ══ NOTES + SIGNATURE ROW ══ */
  .note-sign-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border: 1px solid #d1fae5;
    padding: 13px 16px;
    margin-bottom: 16px;
  }
  .note-heading { font-size: 13px; font-weight: 800; color: #059669; margin-bottom: 7px; }
  .note-list    { font-size: 12px; color: #374151; line-height: 1.9; }
  .sign-area    { text-align: right; min-width: 160px; }
  .sign-cursive { font-family: 'Georgia', cursive; font-size: 22px; color: #374151; font-style: italic; }
  .sign-line    { border-top: 1px solid #374151; margin: 4px 0; }
  .sign-label   { font-size: 11px; font-weight: 700; color: #059669; }

  /* ══ SCISSOR CUT ══ */
  .cut-row {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #9ca3af;
    font-size: 11px;
    margin: 14px 0;
  }
  .cut-row::before,
  .cut-row::after { content: ''; flex: 1; border-top: 1px dashed #9ca3af; }
  .scissors { font-size: 14px; }

  /* ══ TEAR-OFF STUB ══
     CHANGED: removed duplicate label text inside stub cells,
     badge is now green gradient, stub-id is the only big value shown */


     .stub-badge {
  display: inline-block;
  background: linear-gradient(135deg, #059669, #0d9488);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 20px;
  margin-bottom: 6px;
}
  .stub-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border: 1px solid #d1fae5;
  }
  .stub-cell {
    padding: 14px 12px;
    text-align: center;
    border-right: 1px solid #d1fae5;
  }
  .stub-cell:last-child { border-right: none; }
  .stub-label {
    font-size: 11px;
    font-weight: 700;
    color: #059669;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
  }
  /* CHANGED: stub-badge removed — was causing duplicate text */
  .stub-id   { font-size: 24px; font-weight: 900; color: #111827; margin-bottom: 8px; }
  .stub-sub  { font-size: 12.5px; color: #374151; display: flex; align-items: center; justify-content: center; gap: 5px; }
  .stub-date { font-size: 16px; font-weight: 900; color: #111827; margin-bottom: 4px; }
  .stub-time { font-size: 13px; font-weight: 700; color: #374151; margin-bottom: 8px; }

  /* ══ PAGE FOOTER ══ */
  .page-footer {
    text-align: center;
    margin-top: 16px;
    padding-top: 10px;
    border-top: 2px solid #059669;
    font-size: 13px;
    font-weight: 800;
    color: #059669;
  }
  .page-footer .footer-sub {
    font-size: 11.5px;
    font-weight: 400;
    color: #6b7280;
    margin-top: 3px;
  }

  @media print {
    body { padding: 12px 16px; }
    @page { margin: 0.3cm; size: A4; }
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    .stub-row { border: 1px solid #d1fae5 !important; }
    .stub-cell { border-right: 1px solid #d1fae5 !important; }
    .bill-table th { background: #f0fdf4 !important; }
    .bill-table tr.sum td { background: #f9fafb !important; }
    .paid-green { color: #16a34a !important; }
    .col-heading { color: #059669 !important; }
    .billing-heading { color: #059669 !important; }
    .note-heading { color: #059669 !important; }
    .sign-label { color: #059669 !important; }
    .qr-thanks { color: #059669 !important; }
    .qr-amount { color: #16a34a !important; }
    .qr-box-title { color: #059669 !important; }
    .qr-box { border: 1.5px solid #059669 !important; }
    .brand-name { color: #059669 !important; }
    .brand-icon { color: #059669 !important; border-color: #059669 !important; }
    .page-footer { color: #059669 !important; border-top: 2px solid #059669 !important; }
    .page-title { color: #059669 !important; }
    .stub-label { color: #059669 !important; }
  }
</style>
</head>
<body>

<!-- ══ TOP HEADER ══ -->
<div class="header">
  <div class="brand">
    <div class="brand-icon">+</div>
    <div>
      <div class="brand-name">${hospitalName}</div>
      <div class="brand-tag">Your Health, Our Priority</div>
    </div>
  </div>
  <div class="contact-info">
    ${hospPhone ? `<div><span class="ci">&#9990;</span> ${hospPhone}</div>` : ''}
    ${hospEmail ? `<div><span class="ci">&#9993;</span> ${hospEmail}</div>` : ''}
    ${hospAddr  ? `<div><span class="ci">&#128205;</span> ${hospAddr}</div>` : ''}
  </div>
</div>

<!-- ══ PAGE TITLE ══ -->
<div class="page-title">Patient File</div>

<!-- ══ PATIENT + VISIT ══ -->
<div class="two-col-box">
  <div class="info-col">
    <div class="col-heading">Patient Details</div>
    <div class="info-row">
      <span class="lbl">UHID</span>
      <span class="colon">:</span>
      <span class="val"><strong>${patient.patientNumber || patient.id}</strong></span>
    </div>
    <div class="info-row">
      <span class="lbl">Patient Name</span>
      <span class="colon">:</span>
      <span class="val">${patient.name}</span>
    </div>
    <div class="info-row">
      <span class="lbl">Age / Gender</span>
      <span class="colon">:</span>
      <span class="val">${patient.age || '-'} / ${patient.gender ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1).toLowerCase() : '-'}</span>
    </div>
    <div class="info-row">
      <span class="lbl">Mobile No.</span>
      <span class="colon">:</span>
      <span class="val">${patient.phone}</span>
    </div>
    ${patient.fatherName && patient.fatherName !== '-' ? `
    <div class="info-row">
      <span class="lbl">Father Name</span>
      <span class="colon">:</span>
      <span class="val">${patient.fatherName}</span>
    </div>` : ''}
    <div class="info-row">
      <span class="lbl">Address</span>
      <span class="colon">:</span>
      <span class="val addr-val">${addrLine || '-'}${addrLine2 ? '<br>' + addrLine2 : ''}</span>
    </div>
    ${patient.disease && patient.disease !== '-' ? `
    <div class="info-row">
      <span class="lbl">Disease</span>
      <span class="colon">:</span>
      <span class="val">${patient.disease}</span>
    </div>` : ''}
  </div>

  <div class="info-col">
    <div class="col-heading">Visit Details</div>
    <div class="info-row">
      <span class="lbl">Visit Date</span>
      <span class="colon">:</span>
      <span class="val">${visitDate}</span>
    </div>
    <div class="info-row">
      <span class="lbl">Visit Time</span>
      <span class="colon">:</span>
      <span class="val">${visitTime}</span>
    </div>
    <div class="info-row">
      <span class="lbl">OPD Department</span>
      <span class="colon">:</span>
      <span class="val">General Physician</span>
    </div>
    ${patient.status ? `
    <div class="info-row">
      <span class="lbl">Patient Status</span>
      <span class="colon">:</span>
      <span class="val">${patient.status}</span>
    </div>` : ''}
    <div class="info-row">
      <span class="lbl">Token Number</span>
      <span class="colon">:</span>
      <span class="val"><strong>${patient.patientNumber || patient.id}</strong></span>
    </div>
  </div>
</div>

<!-- ══ BILLING ══ -->
<div class="billing-heading">Billing Details</div>
<div class="billing-layout">
  <table class="bill-table">
    <thead>
      <tr>
        <th style="width:54px;text-align:center">S. No.</th>
        <th>Description</th>
        <th class="right" style="width:120px">Amount (&#8377;)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="center">1</td>
        <td>Doctor Consultation Fee</td>
        <td class="right">${consultFee}.00</td>
      </tr>
      <tr class="sum">
        <td colspan="2"><strong>Total Amount</strong></td>
        <td class="right"><strong>&#8377; ${consultFee}.00</strong></td>
      </tr>
      <tr class="sum">
        <td colspan="2">Paid Amount</td>
        <td class="right">&#8377; ${consultFee}.00</td>
      </tr>
      <tr class="sum">
        <td colspan="2">Payment Status</td>
        <td class="right paid-green">Paid</td>
      </tr>
      <tr class="sum">
        <td colspan="2">Payment Mode</td>
        <td class="right">Cash</td>
      </tr>
      <tr class="sum">
        <td colspan="2">Receipt No.</td>
        <td class="right">${receiptNo}</td>
      </tr>
      <tr class="sum">
        <td colspan="2">Receipt Date</td>
        <td class="right">${receiptDate}</td>
      </tr>
    </tbody>
  </table>

  <!-- QR -->
  <div class="qr-box">
    <div class="qr-box-title">Amount Paid (&#8377;)</div>
    <div class="qr-amount">${consultFee}.00</div>
    ${upiId
      ? `<div class="qr-img-wrap"><img id="upi-qr" src="${qrUrl}" alt="UPI QR Code" /></div>`
      : `<div class="qr-no-upi">UPI ID<br>not configured</div>`
    }
    <div class="qr-thanks">Thank you for choosing<br><strong>${hospitalName}</strong></div>
  </div>
</div>

<!-- ══ NOTES + SIGNATURE ══ -->
<div class="note-sign-row">
  <div>
    <div class="note-heading">Note:</div>
    <div class="note-list">
      &bull;&nbsp; Please keep this receipt safe for future reference.<br>
      &bull;&nbsp; Show this receipt at the time of next visit.<br>
      &bull;&nbsp; For any queries, contact the reception.
    </div>
  </div>
  <div class="sign-area">
    <div class="sign-cursive">&#9998;&nbsp; Signature</div>
    <div class="sign-line"></div>
    <div class="sign-label">Authorized Signatory</div>
  </div>
</div>



<!-- ══ TEAR-OFF STUB ══
     CHANGED: stub-badge div removed entirely — no duplicate text.
     Each cell now shows: label heading → big ID/date value → sub info only -->
<div class="stub-row">
  <div class="stub-cell">
    
    <div class="stub-badge">&#128100; UHID</div>
    <div class="stub-id">${patient.patientNumber || patient.id}</div>
    <div class="stub-sub">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      ${patient.name}
    </div>
  </div>
  <div class="stub-cell">
    <div class="stub-badge">&#127915; OPD Token</div>
    <div class="stub-id">${patient.patientNumber || patient.id}</div>
    <div class="stub-sub">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
      ${patient.disease && patient.disease !== '-' ? patient.disease : 'General Physician'}
    </div>
  </div>
  <div class="stub-cell">
    <div class="stub-badge">&#128197; Scheduled</div>
    <div class="stub-date">${visitDate}</div>
    <div class="stub-time">${visitTime}</div>
    <div class="stub-sub">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      Follow-up
    </div>
  </div>
</div>
<!-- ══ PAGE FOOTER ══ -->
<div class="page-footer">
  <span style="background:#059669;color:#fff;padding:3px 14px;border-radius:20px;font-size:13px;font-weight:900;letter-spacing:1px;">Medicare HMS</span>
</div>

</body>
</html>`;

  // ── FIXED: null check + QR img.onload before print ────────────────────────
  const w = window.open('', '', 'height=900,width=850');
  if (!w || w.closed || typeof w.closed === 'undefined') {
    showToast('error', 'Popup Blocked', 'Please allow popups for this site to print.');
    return;
  }
  w.document.write(html);
  w.document.close();
  w.focus();

  const qrImg = w.document.getElementById('upi-qr');
  if (qrImg) {
    if (qrImg.complete) {
      setTimeout(() => w.print(), 300);
    } else {
      qrImg.onload  = () => setTimeout(() => w.print(), 200);
      qrImg.onerror = () => setTimeout(() => w.print(), 200);
    }
  } else {
    setTimeout(() => w.print(), 600);
  }
};

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null;
  const sizeClasses = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden`}
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

// ─── Gender Dropdown ──────────────────────────────────────────────────────────
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
      <input type="text" name="gender" value={value} onChange={() => {}} required className="sr-only" />
    </div>
  );
}

// ─── Status Dropdown ──────────────────────────────────────────────────────────
const PATIENT_STATUSES = [
  { value: 'REGISTERED',      label: 'Registered',      color: 'bg-slate-100 text-slate-700' },
  { value: 'ADMITTED',        label: 'Admitted',        color: 'bg-yellow-100 text-yellow-700' },
  { value: 'UNDER_TREATMENT', label: 'Under Treatment', color: 'bg-orange-100 text-orange-700' },
  { value: 'CRITICAL',        label: 'Critical',        color: 'bg-red-100 text-red-700' },
  { value: 'STABLE',          label: 'Stable',          color: 'bg-teal-100 text-teal-700' },
  { value: 'RECOVERED',       label: 'Recovered',       color: 'bg-emerald-100 text-emerald-700' },
  { value: 'DISCHARGED',      label: 'Discharged',      color: 'bg-blue-100 text-blue-700' },
  { value: 'REFERRED',        label: 'Referred',        color: 'bg-purple-100 text-purple-700' },
  { value: 'DECEASED',        label: 'Deceased',        color: 'bg-gray-200 text-gray-600' },
];

function StatusDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = PATIENT_STATUSES.find(s => s.value === value);

  const handleSelect = (opt) => {
    onChange({ target: { name: 'status', value: opt } });
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
          {selected ? selected.label : 'Select Status'}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180 text-emerald-600' : ''}`} />
      </button>
      {open && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-emerald-100 rounded-xl shadow-xl overflow-hidden">
          {PATIENT_STATUSES.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleSelect(opt.value)}
              className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors duration-150 flex items-center gap-2 ${
                value === opt.value
                  ? 'bg-emerald-500 text-white'
                  : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              {value === opt.value && <span className="w-2 h-2 rounded-full bg-white inline-block" />}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}



function StatusBadge({ status }) {
  if (!status) return <span className="text-slate-500">-</span>;

  const colorMap = {
    registered:      'bg-slate-100 text-slate-700',
    admitted:        'bg-yellow-100 text-yellow-700',
    under_treatment: 'bg-orange-100 text-orange-700',
    critical:        'bg-red-100 text-red-700',
    stable:          'bg-teal-100 text-teal-700',
    recovered:       'bg-emerald-100 text-emerald-700',
    discharged:      'bg-blue-100 text-blue-700',
    referred:        'bg-purple-100 text-purple-700',
    deceased:        'bg-gray-200 text-gray-600',
  };

  const key = status.toLowerCase().replace(/\s+/g, '_');
  const color = colorMap[key] || 'bg-slate-100 text-slate-700';

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${color}`}>
      {status}
    </span>
  );
}

// function StatusBadge({ status }) {
//   const s = PATIENT_STATUSES.find(x => x.value === status);
//   if (!s) return <span className="text-slate-500">-</span>;
//   return (
//     <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${s.color}`}>
//       {s.label}
//     </span>
//   );
// }

// ─── Patient Form ─────────────────────────────────────────────────────────────
function PatientForm({ formData, onChange, onSubmit, onCancel, isEdit }) {
  const handleAgeInput = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 3);
    onChange({ target: { name: 'age', value: val } });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Father Name</label>
          <input type="text" name="fatherName" value={formData.fatherName} onChange={onChange} placeholder="e.g. Ramesh Sharma"
            className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Disease</label>
          <input type="text" name="disease" value={formData.disease} onChange={onChange} placeholder="e.g. Diabetes, Hypertension"
            className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={onChange} placeholder="email@example.com"
            className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Age *</label>
          <input type="number" name="age" value={formData.age} onChange={handleAgeInput} required min={1} max={120} placeholder="e.g. 25"
            className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Gender *</label>
          <GenderDropdown value={formData.gender} onChange={onChange} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
          <StatusDropdown value={formData.status} onChange={onChange} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Address *</label>
        <textarea name="address" value={formData.address} onChange={onChange} required rows="2" placeholder="Enter full address"
          className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
      </div>

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

// ─── Constants ────────────────────────────────────────────────────────────────
const EMPTY_FORM = {
  name: '', email: '', age: '', gender: '', status: '', phone: '',
  address: '', city: '', state: '', country: '', pincode: '',
  fatherName: '', disease: ''
};

const mapPatient = (item) => ({
  id: item.id,
  name: item.name,
  phone: item.phone,
  email: item.user?.email || item.email || '-',
  age: item.age,
  gender: item.gender,
  status: item.status || null,
  address: item.address || '-',
  city: item.city || '-',
  state: item.state || '-',
  country: item.country || '-',
  pincode: item.pincode || '-',
  fatherName: item.fatherName || '-',
  disease: item.disease || '-',
  patientNumber: item.patientNumber || '-',
  created_date: item.createdAt.split('T')[0],
  updated_date: item.updatedAt.split('T')[0],
});

// ─── Main Page ────────────────────────────────────────────────────────────────
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

  const [total, setTotal] = useState(0);
  const [today, setToday] = useState(0);
  const [visited, setVisited] = useState(0);
  const [unvisited, setUnvisited] = useState(0);

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
            status: patient.status || '',
            address: patient.address === '-' ? '' : patient.address,
            city:       patient.city       === '-' ? '' : (patient.city       || ''),
            state:      patient.state      === '-' ? '' : (patient.state      || ''),
            country:    patient.country    === '-' ? '' : (patient.country    || ''),
            pincode:    patient.pincode    === '-' ? '' : (patient.pincode    || ''),
            fatherName: patient.fatherName === '-' ? '' : (patient.fatherName || ''),
            disease:    patient.disease    === '-' ? '' : (patient.disease    || ''),
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
      setTotalMeta({ total: res.data.meta.total, totalPages: res.data.meta.totalPages });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleCountData = async () => {
    countPatientApi()
      .then(res => {
        const data = res.data;
        setTotal(data.totalPatients);
        setToday(data.todayPatients);
        setVisited(data.visitedPatients);
        setUnvisited(data.unvisitedPatients);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    handleCountData();
    fetchPatients(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const refreshPatients = () => fetchPatients(currentPage, itemsPerPage);
  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        age: formData.age !== '' ? Number(formData.age) : null,
        gender: formData.gender || null,
        status: formData.status || null,
      };

      if (modal.type === 'edit') {
        await updatePatientApi(selectedPatient.id, payload);
        showToast('success', 'Updated', 'Patient updated successfully.');
        handleCountData();
        await refreshPatients();
        closeModal();
      } else {
        // Snapshot form data before closing modal
        const formSnapshot = { ...formData };
        const res = await createPatientApi(payload);
        showToast('success', 'Created', 'Patient created successfully.');
        handleCountData();
        closeModal();
        // Print immediately after close (closest to user gesture)
        const created = mapPatient(res?.data?.data || res?.data);
        printPatient(created);
        await refreshPatients();
      }
    } catch (error) {
      showToast('error', 'Failed', 'Failed to save Patient.');
      console.error(error);
    }
  };

  const handleDeletePatient = async () => {
    if (!selectedPatient) return;
    try {
      await deletePatientApi(selectedPatient.id);
      showToast('success', 'Deleted', 'Patient deleted successfully.');
      handleCountData();
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
      (p.gender && p.gender.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.fatherName && p.fatherName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.disease && p.disease.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [sortedPatients, searchTerm]);

  const totalPages = totalMeta.totalPages;
  const totalCount = totalMeta.total;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
  const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalCount);

  const exportToExcel = () => {
    const headers = ['ID', 'Patient No', 'Name', 'Phone', 'Email', 'Age', 'Gender', 'Status', 'Father Name', 'Disease', 'Address', 'City', 'State', 'Country', 'Pincode', 'Created Date', 'Updated Date'];
    const csvData = [
      headers.join(','),
      ...filteredPatients.map(p =>
        `${p.id},"${p.patientNumber}","${p.name}","${p.phone}","${p.email}","${p.age || '-'}","${p.gender || '-'}","${p.status || '-'}","${p.fatherName || '-'}","${p.disease || '-'}","${p.address}","${p.city || '-'}","${p.state || '-'}","${p.country || '-'}","${p.pincode || '-'}",${p.created_date},${p.updated_date}`
      ),
    ].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(new Blob([csvData], { type: 'text/csv;charset=utf-8;' })));
    link.setAttribute('download', `patients_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    setShowExportMenu(false);
  };

  const exportToPDF = () => {
    const htmlContent = `<!DOCTYPE html><html><head><title>Patients Report</title><style>
      body{font-family:Arial,sans-serif;margin:20px}
      h1{color:#059669;text-align:center}
      table{width:100%;border-collapse:collapse;margin-top:20px}
      th{background-color:#059669;color:white;padding:10px;text-align:left;font-size:12px}
      td{padding:8px;border-bottom:1px solid #ddd;font-size:12px}
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
            <th>Patient No</th><th>Name</th><th>Phone</th><th>Email</th>
            <th>Age</th><th>Gender</th><th>Status</th><th>Father Name</th><th>Disease</th>
            <th>City</th><th>State</th><th>Created</th>
          </tr>
        </thead>
        <tbody>
          ${filteredPatients.map(p => `
            <tr>
              <td>${p.patientNumber}</td><td>${p.name}</td><td>${p.phone}</td><td>${p.email}</td>
              <td>${p.age || '-'}</td><td>${p.gender || '-'}</td><td>${p.status || '-'}</td>
              <td>${p.fatherName || '-'}</td><td>${p.disease || '-'}</td>
              <td>${p.city || '-'}</td><td>${p.state || '-'}</td><td>${p.created_date}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </body></html>`;
    const w = window.open('', '', 'height=600,width=1100');
    if (!w) { showToast('error', 'Popup Blocked', 'Please allow popups to export PDF.'); return; }
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

  const TABLE_COLS = [
    { key: 'patientNumber', icon: <User className="w-4 h-4" />, label: 'Patient ID' },
    { key: 'name',          icon: <User className="w-4 h-4" />, label: 'Patient Name' },
    { key: 'phone',         icon: <Phone className="w-4 h-4" />, label: 'Phone' },
    { key: 'email',         icon: <Mail className="w-4 h-4" />, label: 'Email' },
    { key: 'age',           icon: <User className="w-4 h-4" />, label: 'Age' },
    { key: 'gender',        icon: <User className="w-4 h-4" />, label: 'Gender' },
    { key: 'status',        icon: <User className="w-4 h-4" />, label: 'Status' },
    { key: 'fatherName',    icon: <User className="w-4 h-4" />, label: 'Father Name' },
    { key: 'disease',       icon: <FileText className="w-4 h-4" />, label: 'Disease' },
    { key: 'address',       icon: <MapPin className="w-4 h-4" />, label: 'Address' },
    { key: 'created_date',  icon: <Calendar className="w-4 h-4" />, label: 'Created' },
    { key: 'updated_date',  icon: <Calendar className="w-4 h-4" />, label: 'Updated' },
  ];

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
            { label: 'Total Patients',     value: total,    color: 'text-slate-800' },
            { label: 'Today Patients',     value: today,    color: 'text-emerald-600' },
            { label: 'Visited Patients',   value: visited,  color: 'text-blue-600' },
            { label: 'Unvisited Patients', value: unvisited,color: 'text-red-500' },
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
            <input type="text" placeholder="Search by name, phone, email, age, gender, father name, disease..." value={searchTerm}
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

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
              <tr>
                {TABLE_COLS.map(({ key, icon, label }) => (
                  <th key={key} className="px-6 py-4 text-left">
                    <button onClick={() => handleSort(key)} className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-600 transition-colors whitespace-nowrap">
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
                  <td className="px-6 py-4 text-slate-600 font-medium">{patient.patientNumber}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-slate-800 whitespace-nowrap">{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{patient.phone}</td>
                  <td className="px-6 py-4 text-slate-600">{patient.email}</td>
                  <td className="px-6 py-4 text-slate-600">{patient.age || '-'}</td>
                  <td className="px-6 py-4">
                    {patient.gender ? (
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        patient.gender === 'MALE' ? 'bg-blue-100 text-blue-700'
                        : patient.gender === 'FEMALE' ? 'bg-pink-100 text-pink-700'
                        : 'bg-purple-100 text-purple-700'
                      }`}>
                        {patient.gender}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="px-6 py-4"><StatusBadge status={patient.status} /></td>
                  <td className="px-6 py-4 text-slate-600">{patient.fatherName || '-'}</td>
                  <td className="px-6 py-4 text-slate-600">{patient.disease || '-'}</td>
                  <td className="px-6 py-4 text-slate-600">{patient.address}</td>
                  <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{patient.created_date}</td>
                  <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{patient.updated_date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openModal('view', patient)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => openModal('edit', patient)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => printPatient(patient)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" title="Print"><Printer className="w-4 h-4" /></button>
                      <button onClick={() => openModal('delete', patient)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={13} className="px-6 py-12 text-center">
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
      <Modal isOpen={modal.type === 'add' || modal.type === 'edit'} onClose={closeModal}
        title={modal.type === 'edit' ? 'Edit Patient' : 'Add New Patient'} size="md">
        <PatientForm formData={formData} onChange={handleFormChange} onSubmit={handleSubmit} onCancel={closeModal} isEdit={modal.type === 'edit'} />
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

      {/* View Modal */}
      <Modal isOpen={modal.type === 'view'} onClose={closeModal} title="Patient Details" size="md">
        {selectedPatient && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {selectedPatient.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">{selectedPatient.name}</h3>
                <p className="text-slate-500 text-sm">{selectedPatient.patientNumber}</p>
                <div className="mt-1"><StatusBadge status={selectedPatient.status} /></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Phone Number',  value: selectedPatient.phone },
                { label: 'Email Address', value: selectedPatient.email },
                { label: 'Age',           value: selectedPatient.age || '-' },
                { label: 'Gender',        value: selectedPatient.gender || '-' },
                { label: 'Father Name',   value: selectedPatient.fatherName || '-' },
                { label: 'Disease',       value: selectedPatient.disease || '-' },
                { label: 'Address',       value: selectedPatient.address, full: true },
                { label: 'City',          value: selectedPatient.city || '-' },
                { label: 'Pincode',       value: selectedPatient.pincode || '-' },
                { label: 'State',         value: selectedPatient.state || '-' },
                { label: 'Country',       value: selectedPatient.country || '-' },
                { label: 'Created Date',  value: selectedPatient.created_date },
                { label: 'Updated Date',  value: selectedPatient.updated_date },
              ].map(({ label, value, full }) => (
                <div key={label} className={full ? 'col-span-2' : ''}>
                  <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wide">{label}</p>
                  <p className="font-semibold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <button onClick={() => printPatient(selectedPatient)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold flex items-center justify-center gap-2">
                <Printer className="w-4 h-4" /> Print
              </button>
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