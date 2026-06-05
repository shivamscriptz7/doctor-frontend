// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { Calendar, Plus, Search, Filter, X, Edit2, Trash2, Eye, ChevronLeft, ChevronRight, Loader2, AlertCircle, ChevronDown, Download, FileText, Sheet } from 'lucide-react';
// import { getAppointment, createAppointmentApi, udateAppointmentApi, deleteAppointmentApi, getPatients, getDoctorApi, countAppointmentApi } from '../../lib/commonApis';
// import { showToast } from '../../lib/notification';

// // ─── Constants ────────────────────────────────────────────────────────────────
// const EMPTY_FORM = {
//   patientId: '',
//   doctorId: '',
//   appointmentDate: '',
//   status: 'scheduled',
//   notes: '',
//   type: 'consultation',
// };

// const STATUS_STYLE = {
//   confirmed: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
//   scheduled: 'bg-teal-100 text-teal-700 border border-teal-200',
//   completed: 'bg-blue-100 text-blue-700 border border-blue-200',
//   cancelled: 'bg-red-100 text-red-700 border border-red-200',
// };

// const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// const toLocalInputValue = (dateStr) => {
//   if (!dateStr) return '';
//   const d = new Date(dateStr);
//   if (isNaN(d)) return '';
//   const pad = (n) => String(n).padStart(2, '0');
//   return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
// };

// const aptToForm = (apt) => ({
//   patientId: apt.patientId ?? '',
//   doctorId: apt.doctorId ?? '',
//   appointmentDate: toLocalInputValue(apt.appointmentDate),
//   status: apt.status || 'scheduled',
//   notes: apt.notes || '',
//   type: apt.type || 'consultation',
// });

// // ─── Searchable Dropdown ──────────────────────────────────────────────────────
// function SearchableDropdown({ label, value, onChange, options, placeholder, required }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   const filtered = options.filter(opt =>
//     opt.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   const selected = options.find(opt => opt.id === Number(value));

//   useEffect(() => {


//     if (!isOpen) return;
//     const handler = (e) => {
//       if (!e.target.closest('.sd-container')) { setIsOpen(false); setSearchTerm(''); }
//     };
//     document.addEventListener('mousedown', handler);
//     return () => document.removeEventListener('mousedown', handler);
//   }, [isOpen]);

//   return (
//     <div className="relative sd-container">
//       <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl text-left font-medium flex items-center justify-between focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm"
//       >
//         <span className={selected ? 'text-slate-700' : 'text-slate-400'}>
//           {selected ? selected.name : placeholder}
//         </span>
//         <ChevronDown className={`w-4 h-4 text-emerald-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//       </button>

//       {isOpen && (
//         <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
//           <div className="p-2 border-b border-slate-100">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//               <input
//                 type="text"
//                 placeholder={`Search ${label.toLowerCase()}...`}
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onClick={(e) => e.stopPropagation()}
//                 className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 transition-all"
//                 autoFocus
//               />
//             </div>
//           </div>
//           <div className="max-h-60 overflow-y-auto">
//             {filtered.length > 0 ? filtered.map((opt) => (
//               <button
//                 key={opt.id}
//                 type="button"
//                 onClick={() => { onChange(opt.id); setIsOpen(false); setSearchTerm(''); }}
//                 className={`w-full text-left px-4 py-3 transition-all ${Number(value) === opt.id
//                   ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold'
//                   : 'text-slate-700 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 hover:text-white'
//                   }`}
//               >
//                 <div className="font-medium">{opt.name}</div>
//                 {opt.specialty && (
//                   <div className={`text-xs mt-0.5 ${Number(value) === opt.id ? 'text-emerald-100' : 'text-slate-500'}`}>
//                     {opt.specialty}
//                   </div>
//                 )}
//               </button>
//             )) : (
//               <div className="px-4 py-8 text-center text-slate-400 text-sm">No results found</div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Modal ────────────────────────────────────────────────────────────────────
// function Modal({ title, onClose, children }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-slate-100 overflow-hidden">
//         <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
//           <h2 className="text-lg font-bold text-slate-800">{title}</h2>
//           <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
//             <X className="w-5 h-5 text-slate-500" />
//           </button>
//         </div>
//         <div className="p-6">{children}</div>
//       </div>
//     </div>
//   );
// }

// // ─── Appointment Form ─────────────────────────────────────────────────────────
// function AppointmentForm({ initial, onSubmit, loading, patients, doctors, isEdit }) {
//   const [form, setForm] = useState(initial);
//   const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

//   useEffect(() => { setForm(initial); }, [initial]);

//   const fieldCls = "w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm";
//   const labelCls = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";

//   const dateVal = form.appointmentDate ? form.appointmentDate.slice(0, 10) : '';
//   const timeVal = form.appointmentDate ? form.appointmentDate.slice(11, 16) : '';

//   const handleDateChange = (e) => {
//     const date = e.target.value;
//     const time = timeVal || '00:00';
//     set('appointmentDate', `${date}T${time}`);
//   };

//   const handleTimeChange = (e) => {
//     const time = e.target.value;
//     const date = dateVal || new Date().toISOString().slice(0, 10);
//     set('appointmentDate', `${date}T${time}`);
//   };

//   return (
//     <form onSubmit={(e) => onSubmit(e, form)} className="space-y-4">
//       <div className="grid grid-cols-2 gap-4">
//         <SearchableDropdown
//           label="Patient" value={form.patientId}
//           onChange={(id) => set('patientId', id)}
//           options={patients} placeholder="Select Patient" required
//         />
//         <SearchableDropdown
//           label="Doctor" value={form.doctorId}
//           onChange={(id) => set('doctorId', id)}
//           options={doctors} placeholder="Select Doctor" required
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className={labelCls}>
//             <span className="flex items-center gap-1.5">
//               <Calendar className="w-3 h-3" /> Appointment Date
//             </span>
//           </label>
//           <input type="date" value={dateVal} onChange={handleDateChange} required className={fieldCls} />
//         </div>
//         <div>
//           <label className={labelCls}><span className="flex items-center gap-1.5">🕐 Time</span></label>
//           <input type="time" value={timeVal} onChange={handleTimeChange} required className={fieldCls} />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className={labelCls}>Type</label>
//           <select className={fieldCls} value={form.type} onChange={e => set('type', e.target.value)}>
//             <option value="consultation">Consultation</option>
//             <option value="follow_up">Follow up</option>
//             <option value="emergency">Emergency</option>
//           </select>
//         </div>
//         <div>
//           <label className={labelCls}>Status</label>
//           <select className={fieldCls} value={form.status} onChange={e => set('status', e.target.value)}>
//             <option value="scheduled">Scheduled</option>
//             <option value="completed">Completed</option>
//             <option value="cancelled">Cancelled</option>
//           </select>
//         </div>
//       </div>

//       <div>
//         <label className={labelCls}>Notes</label>
//         <textarea
//           className={fieldCls + ' resize-none h-20'}
//           placeholder="Additional notes…"
//           value={form.notes}
//           onChange={e => set('notes', e.target.value)}
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
//       >
//         {loading && <Loader2 className="w-4 h-4 animate-spin" />}
//         {loading ? 'Saving…' : isEdit ? 'Update Appointment' : 'Create Appointment'}
//       </button>
//     </form>
//   );
// }

// // ─── View Modal ───────────────────────────────────────────────────────────────
// function ViewModal({ apt, onClose, patients, doctors }) {
//   const patient = patients.find(p => p.id === apt.patientId);
//   const doctor = doctors.find(d => d.id === apt.doctorId);

//   const Row = ({ label, value }) => (
//     <div className="flex justify-between py-2.5 border-b border-slate-50 last:border-0">
//       <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
//       <span className="text-sm text-slate-700 font-medium">{value}</span>
//     </div>
//   );

//   return (
//     <Modal title="Appointment Details" onClose={onClose}>
//       <div className="space-y-0.5">
//         <Row label="Appointment ID" value={`#${apt.id}`} />
//         <Row label="Patient" value={patient?.name || `Patient #${apt.patientId}`} />
//         <Row label="Doctor" value={doctor?.name || `Dr. #${apt.doctorId}`} />
//         <Row label="Date & Time" value={apt.appointmentDate ? new Date(apt.appointmentDate).toLocaleString() : '—'} />
//         <Row label="Type" value={cap(apt.type)} />
//         <Row label="Status" value={cap(apt.status)} />
//         <Row label="Notes" value={apt.notes || '—'} />
//       </div>
//     </Modal>
//   );
// }

// // ─── Main Page ────────────────────────────────────────────────────────────────
// export default function AppointmentsPage() {
//   const [appointments, setAppointments] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [search, setSearch] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [showFilter, setShowFilter] = useState(false);
//   const [showExportMenu, setShowExportMenu] = useState(false);
//   const [formLoading, setFormLoading] = useState(false);
//   const [toast, setToast] = useState('');

//   const [modal, setModal] = useState(null);
//   const [selected, setSelected] = useState(null);

//   const closeModal = () => { setModal(null); setSelected(null); };




//   // ── Data loaders ─────────────────────────────────────────────────────────
//   const load = useCallback(async () => {
//     setLoading(true); setError('');
//     try {
//       const res = await getAppointment(10, page);
//       const raw = res?.data?.appointments || res?.data || [];
//       setAppointments(raw.map(item => ({
//         id: item.id,
//         patientId: item.patientId,
//         doctorId: item.doctorId,
//         appointmentDate: item.appointmentDate || '',
//         status: item.status || 'scheduled',
//         notes: item.notes || '',
//         type: item.type || 'consultation',
//       })));
//       setTotalPages(res?.data?.totalPages ?? 1);
//       setTotalRecords(res?.data?.total ?? 0);
//     } catch {
//       setError('Failed to load appointments. Check your API connection.');
//     } finally {
//       setLoading(false);
//     }
//   }, [page]);

//   const loadPatients = useCallback(async () => {
//     try {
//       const res = await getPatients(100, 1);
//       const arr = res?.data?.data || res?.data || [];
//       setPatients(arr.map(i => ({ id: i.id, name: i.name, phone: i.phone, email: i.user?.email || '-' })));
//     } catch { setPatients([]); }
//   }, []);

//   const loadDoctors = useCallback(async () => {
//     try {
//       const res = await getDoctorApi(100, 1);
//       const arr = res?.data?.data || res?.data || [];
//       setDoctors((arr.doctors || arr).map(i => ({ id: i.id, name: i.name })));
//     } catch { setDoctors([]); }
//   }, []);




//   const [total, setTotal] = useState(0);
//   const [scheduled, setScheduled] = useState(0);
//   const [completed, setCompleted] = useState(0);
//   const [cancelled, setCancelled] = useState(0);

//   useEffect(() => {
//     load(); loadPatients(); loadDoctors();
//    handleCountData();
//   }, [load, loadPatients]);





//   // ── Filtered list ─────────────────────────────────────────────────────────
//   const filtered = appointments.filter(a => {
//     const patient = patients.find(p => p.id === a.patientId);
//     const doctor = doctors.find(d => d.id === a.doctorId);
//     const q = search.toLowerCase();
//     const matchSearch = !q ||
//       String(a.patientId).includes(q) ||
//       String(a.doctorId).includes(q) ||
//       a.type.toLowerCase().includes(q) ||
//       (a.notes || '').toLowerCase().includes(q) ||
//       (patient?.name || '').toLowerCase().includes(q) ||
//       (doctor?.name || '').toLowerCase().includes(q);
//     return matchSearch && (filterStatus === 'all' || a.status === filterStatus);
//   });

//   // ── Modal openers ─────────────────────────────────────────────────────────
//   const openCreate = () => { setSelected(null); setModal('form'); };
//   const openEdit = (a) => { setSelected(a); setModal('form'); };
//   const openView = (a) => { setSelected(a); setModal('view'); };
//   const openDelete = (a) => { setSelected(a); setModal('delete'); };

//   // ── CRUD handlers ─────────────────────────────────────────────────────────
//   const handleSubmit = async (e, form) => {
//     e.preventDefault();
//     setFormLoading(true);
//     const payload = {
//       patientId: Number(form.patientId),
//       doctorId: Number(form.doctorId),
//       appointmentDate: form.appointmentDate,
//       status: form.status,
//       notes: form.notes,
//       type: form.type,
//     };
//     try {
//       if (selected) {
//         await udateAppointmentApi(selected.id, payload);
//         // showToast('success','Appointment updated!','');
//         showToast('success','Updated','Appointment updated!');
//         handleCountData();

        
//       } else {
//         await createAppointmentApi(payload);
//         showToast('success','Created','Appointment created!');
//         handleCountData();
//       }
//       await load();
//       closeModal();
//     } catch {
//       showToast('error',`Failed to ${selected ? 'update' : 'create'} appointment.`,'');
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   const handleCountData= async()=>{
//  countAppointmentApi().then(res => {
//       const data = res.data;

//       setTotal(data.totalAppointments);
//       setScheduled(data.scheduled);
//       setCompleted(data.completed);
//       setCancelled(data.cancelled);
//     });
//   }

//   const handleDelete = async () => {
//     if (!selected) return;
//     setFormLoading(true);
//     try {
//       await deleteAppointmentApi(selected.id);
//       await load();
//       showToast('success', 'Deleted', 'Appointment deleted successfully'); 
//       handleCountData();
//       closeModal();
//     } catch {
//       showToast('error','Failed to delete appointment.','');
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   // ── Export functions ──────────────────────────────────────────────────────
//   const exportToExcel = () => {
//     const headers = ['Sr. No.', 'Patient', 'Doctor', 'Date & Time', 'Type', 'Status', 'Notes'];
//     const rows = filtered.map((apt, idx) => {
//       const patient = patients.find(p => p.id === apt.patientId);
//       const doctor = doctors.find(d => d.id === apt.doctorId);
//       return [
//         idx + 1,
//         `"${patient?.name || `Patient #${apt.patientId}`}"`,
//         `"${doctor?.name || `Dr. #${apt.doctorId}`}"`,
//         apt.appointmentDate ? new Date(apt.appointmentDate).toLocaleString() : '—',
//         cap(apt.type),
//         cap(apt.status),
//         `"${apt.notes || '—'}"`,
//       ].join(',');
//     });
//     const csv = [headers.join(','), ...rows].join('\n');
//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = `appointments_${new Date().toISOString().split('T')[0]}.csv`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     setShowExportMenu(false);
//   };

//   const exportToPDF = () => {
//     const rows = filtered.map((apt, idx) => {
//       const patient = patients.find(p => p.id === apt.patientId);
//       const doctor = doctors.find(d => d.id === apt.doctorId);
//       return `<tr>
//         <td>${idx + 1}</td>
//         <td>#${apt.id}</td>
//         <td>${patient?.name || `Patient #${apt.patientId}`}</td>
//         <td>${doctor?.name || `Dr. #${apt.doctorId}`}</td>
//         <td>${apt.appointmentDate ? new Date(apt.appointmentDate).toLocaleString() : '—'}</td>
//         <td>${cap(apt.type)}</td>
//         <td>${cap(apt.status)}</td>
//         <td>${apt.notes || '—'}</td>
//       </tr>`;
//     }).join('');

//     const html = `<!DOCTYPE html><html><head><title>Appointments Report</title>
// <style>
//   body{font-family:Arial,sans-serif;margin:30px}
//   h1{color:#059669;text-align:center}
//   table{width:100%;border-collapse:collapse;margin-top:20px}
//   th{background:#059669;color:#fff;padding:10px;text-align:left;font-size:12px}
//   td{padding:9px 10px;border-bottom:1px solid #ddd;font-size:12px}
//   tr:hover{background:#f5f5f5}
// </style>
// </head><body>
// <h1>Appointments Report</h1>
// <p style="text-align:center;color:#64748b">Generated: ${new Date().toLocaleDateString('en-IN')} | Total: ${filtered.length} records</p>
// <table>
//   <thead><tr><th>Sr. No.</th><th>Patient</th><th>Doctor</th><th>Date & Time</th><th>Type</th><th>Status</th><th>Notes</th></tr></thead>
//   <tbody>${rows}</tbody>
// </table>
// </body></html>`;

//     const win = window.open('', '', 'height=600,width=1100');
//     win.document.write(html);
//     win.document.close();
//     win.focus();
//     setTimeout(() => { win.print(); setShowExportMenu(false); }, 250);
//   };

//   // ── Pagination helpers ────────────────────────────────────────────────────
//   const getPageNumbers = () => {
//     const pages = [];
//     if (totalPages <= 7) {
//       for (let i = 1; i <= totalPages; i++) pages.push(i);
//     } else if (page <= 4) {
//       pages.push(1, 2, 3, 4, 5, '...', totalPages);
//     } else if (page >= totalPages - 3) {
//       pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
//     } else {
//       pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
//     }
//     return pages;
//   };

//   // ── Stats ─────────────────────────────────────────────────────────────────
//   const count = (s) => appointments.filter(a => a.status === s).length;
//   const statuses = ['all', 'scheduled', 'completed', 'cancelled'];
//   const formInitial = selected ? aptToForm(selected) : { ...EMPTY_FORM };

//   // Sr. No. offset for current page
//   const srOffset = (page - 1) * 10;

//   return (
//     <div className="p-6 md:p-8 min-h-screen bg-slate-50">

//       {/* Toast */}
//       {toast && (
//         <div className="fixed top-6 right-6 z-[100] bg-slate-800 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium">
//           {toast}
//         </div>
//       )}

//       {/* ── Modals ── */}
//       {modal === 'form' && (
//         <Modal title={selected ? 'Edit Appointment' : 'New Appointment'} onClose={closeModal}>
//           <AppointmentForm
//             initial={formInitial}
//             onSubmit={handleSubmit}
//             loading={formLoading}
//             patients={patients}
//             doctors={doctors}
//             isEdit={!!selected}
//           />
//         </Modal>
//       )}

//       {modal === 'view' && selected && (
//         <ViewModal apt={selected} onClose={closeModal} patients={patients} doctors={doctors} />
//       )}

//       {modal === 'delete' && selected && (
//         <Modal title="Delete Appointment" onClose={closeModal}>
//           <div className="text-center space-y-4">
//             <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto">
//               <Trash2 className="w-6 h-6 text-red-500" />
//             </div>
//             <div>
//               <p className="text-slate-700 font-semibold">Delete Appointment #{selected.id}?</p>
//               <p className="text-slate-500 text-sm mt-1">This action cannot be undone.</p>
//             </div>
//             <div className="flex gap-3">
//               <button onClick={closeModal} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
//                 Cancel
//               </button>
//               <button onClick={handleDelete} disabled={formLoading} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
//                 {formLoading && <Loader2 className="w-4 h-4 animate-spin" />}
//                 Delete
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* ── Header ── */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-1">Appointments</h1>
//             <p className="text-slate-500 text-sm">Manage patient appointments and schedules</p>
//           </div>
//           <div className="flex gap-3">
//             {/* Export */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowExportMenu(v => !v)}
//                 className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 text-slate-700 font-medium shadow-sm"
//               >
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
//             {/* New Appointment */}
//             <button
//               onClick={openCreate}
//               className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 font-semibold shadow-lg shadow-emerald-100"
//             >
//               <Plus className="w-4 h-4" /> New Appointment
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//           {[
//             { label: 'Total Appointments', value: total, color: 'text-slate-800' },
//             { label: 'Scheduled', value: scheduled, color: 'text-emerald-600' },
//             { label: 'Completed', value: completed, color: 'text-blue-600' },
//             { label: 'Cancelled', value: cancelled, color: 'text-red-500' },
//           ].map(s => (
//             <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//               <p className="text-xs text-slate-500 mb-1 font-medium">{s.label}</p>
//               <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ── Search & Filter ── */}
//       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-5">
//         <div className="flex gap-3 flex-wrap">
//           <div className="flex-1 min-w-[200px] relative">
//             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search by patient, doctor, type, notes…"
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
//             />
//           </div>
//           <button
//             onClick={() => setShowFilter(f => !f)}
//             className={`px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all border-2 ${showFilter ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
//           >
//             <Filter className="w-4 h-4" /> Filter
//           </button>
//           <button onClick={load} className="px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all">
//             Refresh
//           </button>
//         </div>
//         {showFilter && (
//           <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2 flex-wrap">
//             {statuses.map(s => (
//               <button
//                 key={s}
//                 onClick={() => setFilterStatus(s)}
//                 className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all border ${filterStatus === s ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 text-slate-600 hover:border-emerald-300'}`}
//               >
//                 {s === 'all' ? 'All Statuses' : cap(s)}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ── Table ── */}
//       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
//         {error && (
//           <div className="flex items-center gap-3 p-4 bg-red-50 border-b border-red-100 text-red-600 text-sm">
//             <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
//           </div>
//         )}
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-100">
//               <tr>
//                 {['Sr. No.', 'Patient', 'Doctor', 'Date & Time', 'Type', 'Status', 'Notes', 'Actions'].map(h => (
//                   <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50">
//               {loading ? (
//                 <tr><td colSpan={9} className="py-16 text-center">
//                   <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-2" />
//                   <p className="text-slate-400 text-sm">Loading appointments…</p>
//                 </td></tr>
//               ) : filtered.length === 0 ? (
//                 <tr><td colSpan={9} className="py-16 text-center">
//                   <Calendar className="w-10 h-10 text-slate-200 mx-auto mb-3" />
//                   <p className="text-slate-400 font-medium">No appointments found</p>
//                   <p className="text-slate-300 text-sm mt-1">Try changing your search or filter</p>
//                 </td></tr>
//               ) : filtered.map((apt, idx) => {
//                 const patient = patients.find(p => p.id === apt.patientId);
//                 const doctor = doctors.find(d => d.id === apt.doctorId);
//                 return (
//                   <tr key={apt.id} className="hover:bg-emerald-50/40 transition-colors">
//                     {/* Sr. No. */}
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-500">
//                       {srOffset + idx + 1}
//                     </td>
//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-2.5">
//                         <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
//                           {patient?.name ? patient.name.charAt(0) : 'P'}
//                         </div>
//                         <span className="text-sm font-semibold text-slate-700">{patient?.name || `Patient #${apt.patientId}`}</span>
//                       </div>
//                     </td>
//                     <td className="px-5 py-4 text-sm text-slate-600">{doctor?.name || `Dr. #${apt.doctorId}`}</td>
//                     <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap">
//                       <div className="flex items-center gap-1.5">
//                         <Calendar className="w-3.5 h-3.5 text-slate-400" />
//                         {apt.appointmentDate
//                           ? new Date(apt.appointmentDate).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })
//                           : '—'}
//                       </div>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold capitalize">{apt.type}</span>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${STATUS_STYLE[apt.status] || 'bg-slate-100 text-slate-600'}`}>
//                         {cap(apt.status)}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4 text-sm text-slate-500 max-w-[160px] truncate">{apt.notes || '—'}</td>
//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-1.5">
//                         <button onClick={() => openView(apt)} title="View" className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">
//                           <Eye className="w-4 h-4" />
//                         </button>
//                         <button onClick={() => openEdit(apt)} title="Edit" className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
//                           <Edit2 className="w-4 h-4" />
//                         </button>
//                         <button onClick={() => openDelete(apt)} title="Delete" className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         {/* ── Pagination (patient-style) ── */}
//         {!loading && (
//           <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
//             <div className="flex items-center justify-between">
//               <p className="text-sm text-slate-600">
//                 Showing{' '}
//                 <span className="font-semibold text-slate-800">{appointments.length === 0 ? 0 : (page - 1) * 10 + 1}</span>
//                 {' '}to{' '}
//                 <span className="font-semibold text-slate-800">{(page - 1) * 10 + appointments.length}</span>
//                 {' '}of{' '}
//                 <span className="font-semibold text-slate-800">{totalRecords}</span> results
//               </p>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setPage(p => Math.max(1, p - 1))}
//                   disabled={page === 1}
//                   className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${page === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}
//                 >
//                   Previous
//                 </button>
//                 <div className="flex items-center gap-1">
//                   {getPageNumbers().map((p, i) =>
//                     p === '...' ? (
//                       <span key={`e${i}`} className="px-3 py-2 text-slate-400">...</span>
//                     ) : (
//                       <button
//                         key={p}
//                         onClick={() => setPage(p)}
//                         className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${page === p ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}
//                       >
//                         {p}
//                       </button>
//                     )
//                   )}
//                 </div>
//                 <button
//                   onClick={() => setPage(p => Math.min(totalPages, p + 1))}
//                   disabled={page === totalPages}
//                   className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${page === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {showExportMenu && <div className="fixed inset-0 z-0" onClick={() => setShowExportMenu(false)} />}
//     </div>
//   );
// }

























'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Calendar, Plus, Search, Filter, X, Edit2,Edit, Trash2, Eye,
  ChevronLeft, ChevronRight, Loader2, AlertCircle, ChevronDown,
  Download, FileText, Sheet, Printer
} from 'lucide-react';
import { getAppointment, createAppointmentApi, udateAppointmentApi, deleteAppointmentApi, getPatients, getDoctorApi, countAppointmentApi } from '../../lib/commonApis';
import { showToast } from '../../lib/notification';

// ─── Constants ────────────────────────────────────────────────────────────────
const EMPTY_FORM = {
  patientId: '',
  doctorId: '',
  appointmentDate: '',
  status: 'scheduled',
  notes: '',
  type: 'consultation',
};

const STATUS_STYLE = {
  confirmed: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  scheduled:  'bg-teal-100 text-teal-700 border border-teal-200',
  completed:  'bg-blue-100 text-blue-700 border border-blue-200',
  cancelled:  'bg-red-100 text-red-700 border border-red-200',
};

const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const toLocalInputValue = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const aptToForm = (apt) => ({
  patientId:       apt.patientId ?? '',
  doctorId:        apt.doctorId ?? '',
  appointmentDate: toLocalInputValue(apt.appointmentDate),
  status:          apt.status || 'scheduled',
  notes:           apt.notes || '',
  type:            apt.type || 'consultation',
});

// ─── Print Appointment ────────────────────────────────────────────────────────
const buildPrintAppointment = (apt, patients, doctors) => {
  const patient = patients.find(p => p.id === apt.patientId);
  const doctor  = doctors.find(d => d.id === apt.doctorId);

  const html = `<!DOCTYPE html><html><head><title>Appointment Slip - #${apt.id}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; margin: 30px; color: #1e293b; background: #fff; }
    .header { text-align: center; border-bottom: 2px solid #059669; padding-bottom: 16px; margin-bottom: 24px; }
    .header h1 { color: #059669; font-size: 22px; margin-bottom: 4px; }
    .header p { color: #64748b; font-size: 13px; }
    .apt-id { text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 20px; color: #0f172a; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
    .field { background: #f8fafc; border-radius: 10px; padding: 12px 14px; border: 1px solid #e2e8f0; }
    .field-label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; font-weight: 600; }
    .field-value { font-size: 14px; font-weight: 600; color: #1e293b; }
    .full { grid-column: span 2; }
    .badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; }
    .scheduled { background: #ccfbf1; color: #0f766e; }
    .completed  { background: #dbeafe; color: #1d4ed8; }
    .cancelled  { background: #fee2e2; color: #dc2626; }
    .confirmed  { background: #d1fae5; color: #059669; }
    .divider { border: none; border-top: 1px dashed #cbd5e1; margin: 20px 0; }
    .footer { text-align: center; margin-top: 20px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px; }
    @media print { body { margin: 15px; } }
  </style></head><body>
  <div class="header">
    <h1>&#127973; MediCare Hospital</h1>
    <p>Appointment Slip &nbsp;|&nbsp; Generated: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
  </div>
  <div class="apt-id">Appointment #${apt.id}</div>
  <div class="grid">
    <div class="field">
      <div class="field-label">Patient Name</div>
      <div class="field-value">${patient?.name || `Patient #${apt.patientId}`}</div>
    </div>
    <div class="field">
      <div class="field-label">Doctor</div>
      <div class="field-value">${doctor?.name ? `Dr. ${doctor.name}` : `Dr. #${apt.doctorId}`}</div>
    </div>
    <div class="field">
      <div class="field-label">Date &amp; Time</div>
      <div class="field-value">${apt.appointmentDate ? new Date(apt.appointmentDate).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—'}</div>
    </div>
    <div class="field">
      <div class="field-label">Type</div>
      <div class="field-value" style="text-transform:capitalize">${apt.type}</div>
    </div>
    <div class="field">
      <div class="field-label">Status</div>
      <div class="field-value">
        <span class="badge ${apt.status}">${cap(apt.status)}</span>
      </div>
    </div>
    <div class="field">
      <div class="field-label">Patient Phone</div>
      <div class="field-value">${patient?.phone || '-'}</div>
    </div>
    <div class="field full">
      <div class="field-label">Notes</div>
      <div class="field-value">${apt.notes || '—'}</div>
    </div>
  </div>
  <hr class="divider" />
  <div class="footer">MediCare Hospital Management System &nbsp;|&nbsp; Please carry this slip during your visit</div>
  </body></html>`;

  return html;
};

const printAppointment = (apt, patients, doctors) => {
  const html = buildPrintAppointment(apt, patients, doctors);
  const w = window.open('', '', 'height=700,width=800');
  w.document.write(html);
  w.document.close();
  w.focus();
  setTimeout(() => { w.print(); }, 300);
};

// ─── Searchable Dropdown ──────────────────────────────────────────────────────
function SearchableDropdown({ label, value, onChange, options, placeholder, required }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = options.filter(opt =>
    opt.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const selected = options.find(opt => opt.id === Number(value));

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (!e.target.closest('.sd-container')) { setIsOpen(false); setSearchTerm(''); }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  return (
    <div className="relative sd-container">
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl text-left font-medium flex items-center justify-between focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm"
      >
        <span className={selected ? 'text-slate-700' : 'text-slate-400'}>
          {selected ? selected.name : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-emerald-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-2 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={`Search ${label.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 transition-all"
                autoFocus
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filtered.length > 0 ? filtered.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => { onChange(opt.id); setIsOpen(false); setSearchTerm(''); }}
                className={`w-full text-left px-4 py-3 transition-all ${Number(value) === opt.id
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold'
                  : 'text-slate-700 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 hover:text-white'
                }`}
              >
                <div className="font-medium">{opt.name}</div>
                {opt.specialty && (
                  <div className={`text-xs mt-0.5 ${Number(value) === opt.id ? 'text-emerald-100' : 'text-slate-500'}`}>
                    {opt.specialty}
                  </div>
                )}
              </button>
            )) : (
              <div className="px-4 py-8 text-center text-slate-400 text-sm">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
          <h2 className="text-lg font-bold text-slate-800">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

// ─── Appointment Form ─────────────────────────────────────────────────────────
function AppointmentForm({ initial, onSubmit, loading, patients, doctors, isEdit }) {
  const [form, setForm] = useState(initial);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  useEffect(() => { setForm(initial); }, [initial]);

  const fieldCls = "w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm";
  const labelCls = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";

  const dateVal = form.appointmentDate ? form.appointmentDate.slice(0, 10) : '';
  const timeVal = form.appointmentDate ? form.appointmentDate.slice(11, 16) : '';

  const handleDateChange = (e) => {
    const date = e.target.value;
    const time = timeVal || '00:00';
    set('appointmentDate', `${date}T${time}`);
  };

  const handleTimeChange = (e) => {
    const time = e.target.value;
    const date = dateVal || new Date().toISOString().slice(0, 10);
    set('appointmentDate', `${date}T${time}`);
  };

  return (
    <form onSubmit={(e) => onSubmit(e, form)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <SearchableDropdown label="Patient" value={form.patientId} onChange={(id) => set('patientId', id)} options={patients} placeholder="Select Patient" required />
        <SearchableDropdown label="Doctor"  value={form.doctorId}  onChange={(id) => set('doctorId', id)}  options={doctors}  placeholder="Select Doctor"  required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}><span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> Appointment Date</span></label>
          <input type="date" value={dateVal} onChange={handleDateChange} required className={fieldCls} />
        </div>
        <div>
          <label className={labelCls}><span className="flex items-center gap-1.5">🕐 Time</span></label>
          <input type="time" value={timeVal} onChange={handleTimeChange} required className={fieldCls} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Type</label>
          <select className={fieldCls} value={form.type} onChange={e => set('type', e.target.value)}>
            <option value="consultation">Consultation</option>
            <option value="follow_up">Follow up</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Status</label>
          <select className={fieldCls} value={form.status} onChange={e => set('status', e.target.value)}>
            <option value="scheduled">Scheduled</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Notes</label>
        <textarea className={fieldCls + ' resize-none h-20'} placeholder="Additional notes…" value={form.notes} onChange={e => set('notes', e.target.value)} />
      </div>

      <button type="submit" disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? 'Saving…' : isEdit ? 'Update Appointment' : 'Create Appointment'}
      </button>
    </form>
  );
}

// ─── View Modal ───────────────────────────────────────────────────────────────
function ViewModal({ apt, onClose, onPrint, patients, doctors }) {
  const patient = patients.find(p => p.id === apt.patientId);
  const doctor  = doctors.find(d => d.id === apt.doctorId);

  const Row = ({ label, value }) => (
    <div className="flex justify-between py-2.5 border-b border-slate-50 last:border-0">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
      <span className="text-sm text-slate-700 font-medium">{value}</span>
    </div>
  );

  return (
    <Modal title="Appointment Details" onClose={onClose}>
      <div className="space-y-0.5 mb-5">
        <Row label="Appointment ID" value={`#${apt.id}`} />
        <Row label="Patient"        value={patient?.name || `Patient #${apt.patientId}`} />
        <Row label="Doctor"         value={doctor?.name  ? `Dr. ${doctor.name}` : `Dr. #${apt.doctorId}`} />
        <Row label="Date & Time"    value={apt.appointmentDate ? new Date(apt.appointmentDate).toLocaleString() : '—'} />
        <Row label="Type"           value={cap(apt.type)} />
        <Row label="Status"         value={cap(apt.status)} />
        <Row label="Notes"          value={apt.notes || '—'} />
      </div>
      <button
        onClick={onPrint}
        className="w-full py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold flex items-center justify-center gap-2"
      >
        <Printer className="w-4 h-4" /> Print Appointment Slip
      </button>
    </Modal>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilter, setShowFilter] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);

  const [total, setTotal] = useState(0);
  const [scheduled, setScheduled] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [cancelled, setCancelled] = useState(0);

  const closeModal = () => { setModal(null); setSelected(null); };

  // ── Data loaders ───────────────────────────────────────────────────────────
  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const res = await getAppointment(10, page);
      const raw = res?.data?.appointments || res?.data || [];
      setAppointments(raw.map(item => ({
        id: item.id,
        patientId: item.patientId,
        doctorId: item.doctorId,
        appointmentDate: item.appointmentDate || '',
        status: item.status || 'scheduled',
        notes: item.notes || '',
        type: item.type || 'consultation',
      })));
      setTotalPages(res?.data?.totalPages ?? 1);
      setTotalRecords(res?.data?.total ?? 0);
    } catch {
      setError('Failed to load appointments. Check your API connection.');
    } finally {
      setLoading(false);
    }
  }, [page]);

  const loadPatients = useCallback(async () => {
    try {
      const res = await getPatients(100, 1);
      const arr = res?.data?.data || res?.data || [];
      setPatients(arr.map(i => ({ id: i.id, name: i.name, phone: i.phone, email: i.user?.email ,patientId: i.patientNumber || '-' })));
    } catch { setPatients([]); }
  }, []);

  const loadDoctors = useCallback(async () => {
    try {
      const res = await getDoctorApi(100, 1);
      const arr = res?.data?.data || res?.data || [];
      setDoctors((arr.doctors || arr).map(i => ({ id: i.id, name: i.name })));
    } catch { setDoctors([]); }
  }, []);

  const handleCountData = async () => {
    countAppointmentApi().then(res => {
      const data = res.data;
      setTotal(data.totalAppointments);
      setScheduled(data.scheduled);
      setCompleted(data.completed);
      setCancelled(data.cancelled);
    });
  };

  useEffect(() => {
    load(); loadPatients(); loadDoctors(); handleCountData();
  }, [load, loadPatients]);

  // ── Filtered list ──────────────────────────────────────────────────────────
  const filtered = appointments.filter(a => {
    const patient = patients.find(p => p.id === a.patientId);
    const doctor  = doctors.find(d => d.id === a.doctorId);
    const q = search.toLowerCase();
    const matchSearch = !q ||
      String(a.patientId).includes(q) ||
      String(a.doctorId).includes(q) ||
      a.type.toLowerCase().includes(q) ||
      (a.notes || '').toLowerCase().includes(q) ||
      (patient?.name || '').toLowerCase().includes(q) ||
      (doctor?.name  || '').toLowerCase().includes(q);
    return matchSearch && (filterStatus === 'all' || a.status === filterStatus);
  });

  // ── Modal openers ──────────────────────────────────────────────────────────
  const openCreate = () => { setSelected(null); setModal('form'); };
  const openEdit   = (a) => { setSelected(a); setModal('form'); };
  const openView   = (a) => { setSelected(a); setModal('view'); };
  const openDelete = (a) => { setSelected(a); setModal('delete'); };

  // ── CRUD ───────────────────────────────────────────────────────────────────
  const handleSubmit = async (e, form) => {
    e.preventDefault();
    setFormLoading(true);
    const payload = {
      patientId:       Number(form.patientId),
      doctorId:        Number(form.doctorId),
      appointmentDate: form.appointmentDate,
      status:          form.status,
      notes:           form.notes,
      type:            form.type,
    };
    try {
      if (selected) {
        await udateAppointmentApi(selected.id, payload);
        showToast('success', 'Updated', 'Appointment updated!');
        handleCountData();
        await load();
        closeModal();
      } else {
        const res = await createAppointmentApi(payload);
        showToast('success', 'Created', 'Appointment created!');
        handleCountData();
        await load();
        closeModal();
        // ── Auto print after create ──
        const createdApt = {
          ...form,
          id: res?.data?.id || res?.data?.data?.id || '—',
        };
        printAppointment(createdApt, patients, doctors);
      }
    } catch {
      showToast('error', 'Failed', `Failed to ${selected ? 'update' : 'create'} appointment.`);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    setFormLoading(true);
    try {
      await deleteAppointmentApi(selected.id);
      showToast('success', 'Deleted', 'Appointment deleted successfully');
      handleCountData();
      await load();
      closeModal();
    } catch {
      showToast('error', 'Failed', 'Failed to delete appointment.');
    } finally {
      setFormLoading(false);
    }
  };

  // ── Export ─────────────────────────────────────────────────────────────────
  const exportToExcel = () => {
    const headers = ['Sr. No.', 'Patient', 'Doctor', 'Date & Time', 'Type', 'Status', 'Notes'];
    const rows = filtered.map((apt, idx) => {
      const patient = patients.find(p => p.id === apt.patientId);
      const doctor  = doctors.find(d => d.id === apt.doctorId);
      return [
        idx + 1,
        `"${patient?.name || `Patient #${apt.patientId}`}"`,
        `"${doctor?.name  || `Dr. #${apt.doctorId}`}"`,
        apt.appointmentDate ? new Date(apt.appointmentDate).toLocaleString() : '—',
        cap(apt.type),
        cap(apt.status),
        `"${apt.notes || '—'}"`,
      ].join(',');
    });
    const csv  = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `appointments_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    setShowExportMenu(false);
  };

  const exportToPDF = () => {
    const rows = filtered.map((apt, idx) => {
      const patient = patients.find(p => p.id === apt.patientId);
      const doctor  = doctors.find(d => d.id === apt.doctorId);
      return `<tr>
        <td>${idx + 1}</td><td>#${apt.id}</td>
        <td>${patient?.name || `Patient #${apt.patientId}`}</td>
        <td>${doctor?.name  || `Dr. #${apt.doctorId}`}</td>
        <td>${apt.appointmentDate ? new Date(apt.appointmentDate).toLocaleString() : '—'}</td>
        <td>${cap(apt.type)}</td><td>${cap(apt.status)}</td><td>${apt.notes || '—'}</td>
      </tr>`;
    }).join('');

    const html = `<!DOCTYPE html><html><head><title>Appointments Report</title>
<style>
  body{font-family:Arial,sans-serif;margin:30px}
  h1{color:#059669;text-align:center}
  table{width:100%;border-collapse:collapse;margin-top:20px}
  th{background:#059669;color:#fff;padding:10px;text-align:left;font-size:12px}
  td{padding:9px 10px;border-bottom:1px solid #ddd;font-size:12px}
  tr:hover{background:#f5f5f5}
</style></head><body>
<h1>Appointments Report</h1>
<p style="text-align:center;color:#64748b">Generated: ${new Date().toLocaleDateString('en-IN')} | Total: ${filtered.length} records</p>
<table>
  <thead><tr><th>Sr.</th><th>ID</th><th>Patient</th><th>Doctor</th><th>Date & Time</th><th>Type</th><th>Status</th><th>Notes</th></tr></thead>
  <tbody>${rows}</tbody>
</table></body></html>`;

    const win = window.open('', '', 'height=600,width=1100');
    win.document.write(html); win.document.close(); win.focus();
    setTimeout(() => { win.print(); setShowExportMenu(false); }, 250);
  };

  // ── Pagination ─────────────────────────────────────────────────────────────
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (page <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (page >= totalPages - 3) {
      pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
    }
    return pages;
  };

  const statuses = ['all', 'scheduled', 'confirmed', 'completed', 'cancelled'];
  const formInitial = selected ? aptToForm(selected) : { ...EMPTY_FORM };
  const srOffset = (page - 1) * 10;

  return (
    <div className="p-6 md:p-8 min-h-screen bg-slate-50">

      {/* ── Modals ── */}
      {modal === 'form' && (
        <Modal title={selected ? 'Edit Appointment' : 'New Appointment'} onClose={closeModal}>
          <AppointmentForm initial={formInitial} onSubmit={handleSubmit} loading={formLoading} patients={patients} doctors={doctors} isEdit={!!selected} />
        </Modal>
      )}

      {modal === 'view' && selected && (
        <ViewModal
          apt={selected}
          onClose={closeModal}
          onPrint={() => printAppointment(selected, patients, doctors)}
          patients={patients}
          doctors={doctors}
        />
      )}

      {modal === 'delete' && selected && (
        <Modal title="Delete Appointment" onClose={closeModal}>
          <div className="text-center space-y-4">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-slate-700 font-semibold">Delete Appointment #{selected.id}?</p>
              <p className="text-slate-500 text-sm mt-1">This action cannot be undone.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={closeModal} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={handleDelete} disabled={formLoading} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                {formLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Header ── */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-1">Appointments</h1>
            <p className="text-slate-500 text-sm">Manage patient appointments and schedules</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <button onClick={() => setShowExportMenu(v => !v)}
                className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 text-slate-700 font-medium shadow-sm">
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
            <button onClick={openCreate}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 font-semibold shadow-lg shadow-emerald-100">
              <Plus className="w-4 h-4" /> New Appointment
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Total Appointments', value: total,     color: 'text-slate-800' },
            { label: 'Scheduled',          value: scheduled, color: 'text-emerald-600' },
            { label: 'Completed',          value: completed, color: 'text-blue-600' },
            { label: 'Cancelled',          value: cancelled, color: 'text-red-500' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <p className="text-xs text-slate-500 mb-1 font-medium">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Search & Filter ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-5">
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input type="text" placeholder="Search by patient, doctor, type, notes…" value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
            />
          </div>
          <button onClick={() => setShowFilter(f => !f)}
            className={`px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all border-2 ${showFilter ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button onClick={load} className="px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all">
            Refresh
          </button>
        </div>
        {showFilter && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2 flex-wrap">
            {statuses.map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all border ${filterStatus === s ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 text-slate-600 hover:border-emerald-300'}`}>
                {s === 'all' ? 'All Statuses' : cap(s)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border-b border-red-100 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-100">
              <tr>
                {['Sr. No.', 'Patient', 'Doctor', 'Date & Time', 'Type', 'Status', 'Notes', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={8} className="py-16 text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-2" />
                  <p className="text-slate-400 text-sm">Loading appointments…</p>
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8} className="py-16 text-center">
                  <Calendar className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                  <p className="text-slate-400 font-medium">No appointments found</p>
                  <p className="text-slate-300 text-sm mt-1">Try changing your search or filter</p>
                </td></tr>
              ) : filtered.map((apt, idx) => {
                const patient = patients.find(p => p.id === apt.patientId);
                console.log('Patient:', patients);
                const doctor  = doctors.find(d => d.id === apt.doctorId);
                return (
                  <tr key={apt.id} className="hover:bg-emerald-50/40 transition-colors">
                    <td className="px-5 py-4 text-sm text-slate-500">
                      <div>
                         <p className="font-semibold text-slate-800 text-sm">{srOffset + idx + 1}</p>
                      </div>
                    </td>
                    
                    {/* Patient */}
                   <td className="px-6 py-4">
  <div className="flex items-center gap-2">
        <span className="flex-shrink-0 px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-xs font-semibold">
          {patient?.patientId}
        </span>
      
    <p className="font-semibold text-slate-800 text-sm">{patient?.name}</p>
  </div>
</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{doctor?.name || `Dr. #${apt.doctorId}`}</td>
                    <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {apt.appointmentDate
                          ? new Date(apt.appointmentDate).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })
                          : '—'}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold capitalize">{apt.type}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${STATUS_STYLE[apt.status] || 'bg-slate-100 text-slate-600'}`}>
                        {cap(apt.status)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500 max-w-[160px] truncate">{apt.notes || '—'}</td>
                    {/* <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openView(apt)} title="View" className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => openEdit(apt)} title="Edit" className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => printAppointment(apt, patients, doctors)} title="Print" className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                          <Printer className="w-4 h-4" />
                        </button>
                        <button onClick={() => openDelete(apt)} title="Delete" className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td> */}


                    <td className="px-6 py-4">
                                          <div className="flex items-center justify-center gap-1">
                                            <button onClick={() => openView(apt)}
                                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                                              <Eye className="w-4 h-4" />
                                            </button>
                                            <button  onClick={() => printAppointment(apt, patients, doctors)}
                                              className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors" title="Print">
                                              <Printer className="w-4 h-4" />
                                            </button>
                                            <button  onClick={() => openEdit(apt)}
                                              className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
                                              <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => openDelete(apt)}
                                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                              <Trash2 className="w-4 h-4" />
                                            </button>
                                          </div>
                                        </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && (
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing{' '}
                <span className="font-semibold text-slate-800">{appointments.length === 0 ? 0 : (page - 1) * 10 + 1}</span>
                {' '}to{' '}
                <span className="font-semibold text-slate-800">{(page - 1) * 10 + appointments.length}</span>
                {' '}of{' '}
                <span className="font-semibold text-slate-800">{totalRecords}</span> results
              </p>
              <div className="flex items-center gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${page === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((p, i) =>
                    p === '...' ? (
                      <span key={`e${i}`} className="px-3 py-2 text-slate-400">...</span>
                    ) : (
                      <button key={p} onClick={() => setPage(p)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${page === p ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
                        {p}
                      </button>
                    )
                  )}
                </div>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${page === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showExportMenu && <div className="fixed inset-0 z-0" onClick={() => setShowExportMenu(false)} />}
    </div>
  );
}
