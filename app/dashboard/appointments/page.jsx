// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { Calendar, Clock, Plus, Search, Filter, X, Edit2, Trash2, Eye, ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
// import { getAppointment, createAppointmentApi, udateAppointmentApi, deleteAppointmentApi, getPatients } from '../../lib/commonApis';

// // ─── Constants ────────────────────────────────────────────────────────────────
// const EMPTY_FORM = {
//   patientId: '',
//   doctorId: '',
//   appointmentDate: '',
//   status: 'scheduled',
//   notes: '',
//   type: 'consultation',
// };

// const statusStyle = {
//   confirmed: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
//   scheduled: 'bg-teal-100 text-teal-700 border border-teal-200',
//   pending: 'bg-amber-100 text-amber-700 border border-amber-200',
//   completed: 'bg-blue-100 text-blue-700 border border-blue-200',
//   cancelled: 'bg-red-100 text-red-700 border border-red-200',
// };

// const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

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



// // ─── Form ─────────────────────────────────────────────────────────────────────
// function AppointmentForm({ initial, onSubmit, loading }) {
//   const [form, setForm] = useState(initial);
//   const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

//   const fieldCls = "w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm";
//   const labelCls = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";

//   return (
//     <form onSubmit={(e) => onSubmit(e, form)} className="space-y-4">
//       <div className="grid grid-cols-2 gap-4">
//         {/* <div>
//           <label className={labelCls}>Patient ID ::1</label>
//           <input className={fieldCls} type="number" placeholder="e.g. 1" value={form.patientId} onChange={e => set('patientId', e.target.value)} required />
//         </div> */}

//         <div>
//           <label className={labelCls}>Patient</label>

//           <select
//             className={fieldCls}
//             value={form.patientId}
//             onChange={(e) => set('patientId', e.target.value)}
//             required
//           >
//             <option value="">Select Patient</option>

//             {patients.map((patient) => (
//               <option key={patient.id} value={patient.id}>
//                 {patient.patientName}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className={labelCls}>Doctor ID</label>
//           <input className={fieldCls} type="number" placeholder="e.g. 2" value={form.doctorId} onChange={e => set('doctorId', e.target.value)} required />
//         </div>
//       </div>
//       <div>
//         <label className={labelCls}>Appointment Date & Time</label>
//         <input className={fieldCls} type="datetime-local" value={form.appointmentDate} onChange={e => set('appointmentDate', e.target.value)} required />
//       </div>
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className={labelCls}>Type</label>
//           <select className={fieldCls} value={form.type} onChange={e => set('type', e.target.value)}>
//             <option value="consultation">Consultation</option>
//             <option value="follow-up">Follow-up</option>
//             <option value="emergency">Emergency</option>
//             <option value="check-up">Check-up</option>
//           </select>
//         </div>
//         <div>
//           <label className={labelCls}>Status</label>
//           <select className={fieldCls} value={form.status} onChange={e => set('status', e.target.value)}>
//             <option value="scheduled">Scheduled</option>
//             <option value="confirmed">Confirmed</option>
//             <option value="pending">Pending</option>
//             <option value="completed">Completed</option>
//             <option value="cancelled">Cancelled</option>
//           </select>
//         </div>
//       </div>
//       <div>
//         <label className={labelCls}>Notes</label>
//         <textarea className={fieldCls + ' resize-none h-20'} placeholder="Additional notes…" value={form.notes} onChange={e => set('notes', e.target.value)} />
//       </div>
//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
//       >
//         {loading && <Loader2 className="w-4 h-4 animate-spin" />}
//         {loading ? 'Saving…' : 'Save Appointment'}
//       </button>
//     </form>
//   );
// }

// // ─── View Modal ───────────────────────────────────────────────────────────────
// function ViewModal({ apt, onClose }) {
//   const row = (label, value) => (
//     <div className="flex justify-between py-2.5 border-b border-slate-50 last:border-0">
//       <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
//       <span className="text-sm text-slate-700 font-medium">{value}</span>
//     </div>
//   );
//   return (
//     <Modal title="Appointment Details" onClose={onClose}>
//       <div className="space-y-0.5">
//         {row('Appointment ID', String(apt.id))}
//         {row('Patient ID', String(apt.patientId))}
//         {row('Doctor ID', String(apt.doctorId))}
//         {row('Date', apt.appointmentDate ? new Date(apt.appointmentDate).toLocaleString() : '—')}
//         {row('Type', cap(apt.type))}
//         {row('Status', cap(apt.status))}
//         {row('Notes', apt.notes || '—')}
//       </div>
//     </Modal>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────
// export default function AppointmentsPage() {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [search, setSearch] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [showFilter, setShowFilter] = useState(false);

//   const [modal, setModal] = useState(null);
//   const [selected, setSelected] = useState(null);
//   const [formLoading, setFormLoading] = useState(false);
//   const [toast, setToast] = useState('');

//   const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

//   const load = useCallback(async () => {
//     setLoading(true); setError('');
//     try {


//           const res = await getAppointment(10, page);

//           // ✅ Fix: data nested hai res.data.appointments mein
//           const raw = res?.data?.appointments || res?.data || [];

//           const list = raw.map(item => ({
//             id: item.id,
//             patientId: item.patientId,
//             doctorId: item.doctorId,
//             appointmentDate: item.appointmentDate || '',
//             status: item.status || 'scheduled',
//             notes: item.notes || '',
//             type: item.type || 'consultation',
//             patient: item.patient || null,
//             doctor: item.doctor || null,
//           }));

//           setAppointments(list);

//     // ✅ Fix: totalPages bhi nested hai
//     setTotalPages(res?.data?.totalPages ?? 1);

//       } catch (e) {
//         console.error('Appointments error:', e); // debug ke liye
//         setError('Failed to load appointments. Check your API connection.');
//       } finally { setLoading(false); }
//     }, [page]);

//   useEffect(() => { load(); }, [load]);

//   getPatients(10, 1)
//     .then(res => {
//       const apiPatients = res.data.data.map((item) => ({
//         id: item.id,
//         name: item.name,
//         phone: item.phone,
//         email: item.user?.email || '-',   // API me email nahi hai
//         address: `${item.address}, ${item.city}, ${item.state}, ${item.country} - ${item.pincode}`,
//         created_date: item.createdAt.split('T')[0],
//         updated_date: item.updatedAt.split('T')[0],
//       }));

//       // setPatients(apiPatients);
//     })


  



//   const filtered = appointments.filter(a => {
//     const matchSearch = search === '' ||
//       String(a.patientId).includes(search) ||
//       String(a.doctorId).includes(search) ||
//       a.type.toLowerCase().includes(search.toLowerCase()) ||
//       (a.notes || '').toLowerCase().includes(search.toLowerCase()) ||
//       (a.patient || '').toLowerCase().includes(search.toLowerCase());
//     const matchStatus = filterStatus === 'all' || a.status === filterStatus;
//     return matchSearch && matchStatus;
//   });

//   const openCreate = () => { setSelected(null); setModal('create'); };
//   const openEdit = (a) => { setSelected(a); setModal('edit'); };
//   const openView = (a) => { setSelected(a); setModal('view'); };
//   const openDelete = (a) => { setSelected(a); setModal('delete'); };

//   const handleCreate = async (e, form) => {
//     e.preventDefault();
//     setFormLoading(true);
//     try {
//       const newApt = {
//         patientId: Number(form.patientId),
//         doctorId: Number(form.doctorId),
//         appointmentDate: form.appointmentDate,
//         status: form.status,
//         notes: form.notes,
//         type: form.type,
//       };
//       await createAppointmentApi(newApt);
//       setAppointments(prev => [...prev, { ...newApt, id: Date.now() }]);
//       showToast('✅ Appointment created!');
//       setModal(null);
//     } catch { showToast('❌ Failed to create appointment.'); }
//     finally { setFormLoading(false); }
//   };

//   const handleUpdate = async (e, form) => {
//     e.preventDefault();
//     if (!selected) return;
//     setFormLoading(true);
//     try {
//       const updatedData = {
//         patientId: Number(form.patientId),
//         doctorId: Number(form.doctorId),
//         appointmentDate: form.appointmentDate,
//         status: form.status,
//         notes: form.notes,
//         type: form.type,
//       };
//       await udateAppointmentApi(selected.id, updatedData);
//       setAppointments(prev =>
//         prev.map(a => a.id === selected.id ? { ...a, ...updatedData } : a)
//       );
//       showToast('✅ Appointment updated!');
//       setModal(null);
//       setSelected(null);
//     } catch { showToast('❌ Failed to update appointment.'); }
//     finally { setFormLoading(false); }
//   };

//   const handleDelete = async () => {
//     if (!selected) return;
//     setFormLoading(true);
//     try {
//       setAppointments(prev => prev.filter(a => a.id !== selected.id));
//       await deleteAppointmentApi(selected.id);
//       showToast('🗑️ Appointment deleted.');
//       setModal(null);
//       setSelected(null);
//     } catch { showToast('❌ Failed to delete appointment.'); }
//     finally { setFormLoading(false); }
//   };

//   const statuses = ['all', 'scheduled', 'confirmed', 'pending', 'completed', 'cancelled'];
//   const counts = (s) => appointments.filter(a => a.status === s).length;

//   return (
//     <div className="p-6 md:p-8 min-h-screen bg-slate-50">
//       {/* Toast */}
//       {toast && (
//         <div className="fixed top-6 right-6 z-[100] bg-slate-800 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium">
//           {toast}
//         </div>
//       )}

//       {/* Modals */}
//       {modal === 'create' && (
//         <Modal title="New Appointment" onClose={() => setModal(null)}>
//           <AppointmentForm initial={{ ...EMPTY_FORM }} onSubmit={handleCreate} loading={formLoading} />
//         </Modal>
//       )}
//       {modal === 'edit' && selected && (
//         <Modal title="Edit Appointment" onClose={() => setModal(null)}>
//           <AppointmentForm
//             initial={{
//               patientId: selected.patientId,
//               doctorId: selected.doctorId,
//               appointmentDate: selected.appointmentDate,
//               status: selected.status,
//               notes: selected.notes,
//               type: selected.type,
//             }}
//             onSubmit={handleUpdate}
//             loading={formLoading}
//           />
//         </Modal>
//       )}
//       {modal === 'view' && selected && <ViewModal apt={selected} onClose={() => setModal(null)} />}
//       {modal === 'delete' && selected && (
//         <Modal title="Delete Appointment" onClose={() => setModal(null)}>
//           <div className="text-center space-y-4">
//             <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto">
//               <Trash2 className="w-6 h-6 text-red-500" />
//             </div>
//             <div>
//               <p className="text-slate-700 font-semibold">Delete Appointment #{selected.id}?</p>
//               <p className="text-slate-500 text-sm mt-1">This action cannot be undone.</p>
//             </div>
//             <div className="flex gap-3">
//               <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
//               <button onClick={handleDelete} disabled={formLoading} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
//                 {formLoading && <Loader2 className="w-4 h-4 animate-spin" />}
//                 Delete
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-1">Appointments</h1>
//             <p className="text-slate-500 text-sm">Manage patient appointments and schedules</p>
//           </div>
//           <button onClick={openCreate} className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 font-semibold shadow-lg shadow-emerald-100">
//             <Plus className="w-4 h-4" /> New Appointment
//           </button>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
//           {[
//             { label: 'Total', value: appointments.length, color: 'text-slate-800' },
//             { label: 'Confirmed', value: counts('confirmed'), color: 'text-emerald-600' },
//             { label: 'Pending', value: counts('pending'), color: 'text-amber-600' },
//             { label: 'Completed', value: counts('completed'), color: 'text-blue-600' },
//             { label: 'Cancelled', value: counts('cancelled'), color: 'text-red-500' },
//           ].map(s => (
//             <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//               <p className="text-xs text-slate-500 mb-1 font-medium">{s.label}</p>
//               <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Search & Filter */}
//       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-5">
//         <div className="flex gap-3 flex-wrap">
//           <div className="flex-1 min-w-[200px] relative">
//             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search by patient, type, notes…"
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
//             />
//           </div>
//           <button onClick={() => setShowFilter(f => !f)} className={`px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all border-2 ${showFilter ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
//             <Filter className="w-4 h-4" /> Filter
//           </button>
//           <button onClick={load} className="px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all">
//             Refresh
//           </button>
//         </div>
//         {showFilter && (
//           <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2 flex-wrap">
//             {statuses.map(s => (
//               <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all border ${filterStatus === s ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 text-slate-600 hover:border-emerald-300'}`}>
//                 {s === 'all' ? 'All Statuses' : cap(s)}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
//         {error && (
//           <div className="flex items-center gap-3 p-4 bg-red-50 border-b border-red-100 text-red-600 text-sm">
//             <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
//           </div>
//         )}
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-100">
//               <tr>
//                 {['ID', 'Patient ID', 'Doctor ID', 'Date & Time', 'Type', 'Status', 'Notes', 'Actions'].map(h => (
//                   <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50">
//               {loading ? (
//                 <tr><td colSpan={8} className="py-16 text-center">
//                   <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-2" />
//                   <p className="text-slate-400 text-sm">Loading appointments…</p>
//                 </td></tr>
//               ) : filtered.length === 0 ? (
//                 <tr><td colSpan={8} className="py-16 text-center">
//                   <Calendar className="w-10 h-10 text-slate-200 mx-auto mb-3" />
//                   <p className="text-slate-400 font-medium">No appointments found</p>
//                   <p className="text-slate-300 text-sm mt-1">Try changing your search or filter</p>
//                 </td></tr>
//               ) : filtered.map(apt => (
//                 <tr key={apt.id} className="hover:bg-emerald-50/40 transition-colors">
//                   <td className="px-5 py-4 text-sm font-mono text-slate-500">#{apt.id}</td>
//                   <td className="px-5 py-4">
//                     <div className="flex items-center gap-2.5">
//                       <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
//                         {apt.patient ? apt.patient.charAt(0) : 'P'}
//                       </div>
//                       <span className="text-sm font-semibold text-slate-700">{apt.patient || `Patient #${apt.patientId}`}</span>
//                     </div>
//                   </td>
//                   <td className="px-5 py-4 text-sm text-slate-600">{apt.doctor || `Dr. #${apt.doctorId}`}</td>
//                   <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap">
//                     <div className="flex items-center gap-1.5">
//                       <Calendar className="w-3.5 h-3.5 text-slate-400" />
//                       {apt.appointmentDate ? new Date(apt.appointmentDate).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' }) : '—'}
//                     </div>
//                   </td>
//                   <td className="px-5 py-4">
//                     <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold capitalize">{apt.type}</span>
//                   </td>
//                   <td className="px-5 py-4">
//                     <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${statusStyle[apt.status] || 'bg-slate-100 text-slate-600'}`}>
//                       {cap(apt.status)}
//                     </span>
//                   </td>
//                   <td className="px-5 py-4 text-sm text-slate-500 max-w-[160px] truncate">{apt.notes || '—'}</td>
//                   <td className="px-5 py-4">
//                     <div className="flex items-center gap-1.5">
//                       <button onClick={() => openView(apt)} title="View" className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">
//                         <Eye className="w-4 h-4" />
//                       </button>
//                       <button onClick={() => openEdit(apt)} title="Edit" className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
//                         <Edit2 className="w-4 h-4" />
//                       </button>
//                       <button onClick={() => openDelete(apt)} title="Delete" className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {!loading && totalPages > 1 && (
//           <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
//             <p className="text-sm text-slate-500">Page {page} of {totalPages}</p>
//             <div className="flex gap-2">
//               <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
//                 <ChevronLeft className="w-4 h-4" />
//               </button>
//               <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { Calendar, Clock, Plus, Search, Filter, X, Edit2, Trash2, Eye, ChevronLeft, ChevronRight, Loader2, AlertCircle, ChevronDown } from 'lucide-react';
// import { getAppointment, createAppointmentApi, udateAppointmentApi, deleteAppointmentApi, getPatients } from '../../lib/commonApis';

// // ─── Constants ────────────────────────────────────────────────────────────────
// const EMPTY_FORM = {
//   patientId: '',
//   doctorId: '',
//   appointmentDate: '',
//   status: 'scheduled',
//   notes: '',
//   type: 'consultation',
// };

// const statusStyle = {
//   confirmed: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
//   scheduled: 'bg-teal-100 text-teal-700 border border-teal-200',
//   pending: 'bg-amber-100 text-amber-700 border border-amber-200',
//   completed: 'bg-blue-100 text-blue-700 border border-blue-200',
//   cancelled: 'bg-red-100 text-red-700 border border-red-200',
// };

// // Static doctors data (replace with API when available)
// const STATIC_DOCTORS = [
//   { id: 1, name: 'Dr. Rajesh Kumar', specialty: 'Cardiology' },
//   { id: 2, name: 'Dr. Priya Sharma', specialty: 'Neurology' },
//   { id: 3, name: 'Dr. Amit Patel', specialty: 'Orthopedics' },
//   { id: 4, name: 'Dr. Sneha Verma', specialty: 'Pediatrics' },
//   { id: 5, name: 'Dr. Vikram Singh', specialty: 'Emergency' },
//   { id: 6, name: 'Dr. Anita Gupta', specialty: 'Radiology' },
//   { id: 7, name: 'Dr. Suresh Reddy', specialty: 'Dermatology' },
//   { id: 8, name: 'Dr. Meera Iyer', specialty: 'Ophthalmology' },
// ];

// const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// // ─── Searchable Dropdown Component ───────────────────────────────────────────
// function SearchableDropdown({ label, value, onChange, options, placeholder, required }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   const filtered = options.filter(opt =>
//     opt.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const selected = options.find(opt => opt.id === Number(value));

//   return (
//     <div className="relative">
//       <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>

//       {/* Dropdown Button */}
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         // onBlur={() => setTimeout(() => setIsOpen(false), 2000)}
//         className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl text-left font-medium flex items-center justify-between focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm"
//       >
//         <span className={selected ? 'text-slate-700' : 'text-slate-400'}>
//           {selected ? selected.name : placeholder}
//         </span>
//         <ChevronDown className={`w-4 h-4 text-emerald-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//       </button>

//       {/* Dropdown Menu */}
//       {isOpen && (
//         <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
//           {/* Search Input */}
//           <div className="p-2 border-b border-slate-100">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//               <input
//                 type="text"
//                 placeholder={`Search ${label.toLowerCase()}...`}
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 transition-all"
//                 autoFocus
//               />
//             </div>
//           </div>

//           {/* Options List */}
//           <div className="max-h-60 overflow-y-auto">
//             {filtered.length > 0 ? (
//               filtered.map((option) => (
//                 <div
//                   key={option.id}
//                   onMouseDown={() => {
//                     onChange(option.id);
//                     setIsOpen(false);
//                     setSearchTerm('');
//                   }}
//                   className={`px-4 py-3 cursor-pointer transition-all ${
//                     Number(value) === option.id
//                       ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold'
//                       : 'text-slate-700 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 hover:text-white'
//                   }`}
//                 >
//                   <div className="font-medium">{option.name}</div>
//                   {option.specialty && (
//                     <div className={`text-xs mt-0.5 ${Number(value) === option.id ? 'text-emerald-100' : 'text-slate-500'}`}>
//                       {option.specialty}
//                     </div>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <div className="px-4 py-8 text-center text-slate-400 text-sm">
//                 No results found
//               </div>
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

// // ─── Form ─────────────────────────────────────────────────────────────────────
// function AppointmentForm({ initial, onSubmit, loading, patients, doctors }) {
//   const [form, setForm] = useState(initial);
//   const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

//   const fieldCls = "w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm";
//   const labelCls = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";

//   return (
//     <form onSubmit={(e) => onSubmit(e, form)} className="space-y-4">
//       <div className="grid grid-cols-2 gap-4">
//         {/* Patient Dropdown with Search */}
//         <SearchableDropdown
//           label="Patient"
//           value={form.patientId}
//           onChange={(id) => set('patientId', id)}
//           options={patients}
//           placeholder="Select Patient"
//           required
//         />

//         {/* Doctor Dropdown with Search */}
//         <SearchableDropdown
//           label="Doctor"
//           value={form.doctorId}
//           onChange={(id) => set('doctorId', id)}
//           options={doctors}
//           placeholder="Select Doctor"
//           required
//         />
//       </div>

//       <div>
//         <label className={labelCls}>Appointment Date & Time</label>
//         <input className={fieldCls} type="datetime-local" value={form.appointmentDate} onChange={e => set('appointmentDate', e.target.value)} required />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className={labelCls}>Type</label>
//           <select className={fieldCls} value={form.type} onChange={e => set('type', e.target.value)}>
//             <option value="consultation">Consultation</option>
//             <option value="follow-up">Follow-up</option>
//             <option value="emergency">Emergency</option>
//             <option value="check-up">Check-up</option>
//           </select>
//         </div>
//         <div>
//           <label className={labelCls}>Status</label>
//           <select className={fieldCls} value={form.status} onChange={e => set('status', e.target.value)}>
//             <option value="scheduled">Scheduled</option>
//             <option value="confirmed">Confirmed</option>
//             <option value="pending">Pending</option>
//             <option value="completed">Completed</option>
//             <option value="cancelled">Cancelled</option>
//           </select>
//         </div>
//       </div>

//       <div>
//         <label className={labelCls}>Notes</label>
//         <textarea className={fieldCls + ' resize-none h-20'} placeholder="Additional notes…" value={form.notes} onChange={e => set('notes', e.target.value)} />
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
//       >
//         {loading && <Loader2 className="w-4 h-4 animate-spin" />}
//         {loading ? 'Saving…' : 'Save Appointment'}
//       </button>
//     </form>
//   );
// }

// // ─── View Modal ───────────────────────────────────────────────────────────────
// function ViewModal({ apt, onClose, patients, doctors }) {
//   const patient = patients.find(p => p.id === apt.patientId);
//   const doctor = doctors.find(d => d.id === apt.doctorId);

//   const row = (label, value) => (
//     <div className="flex justify-between py-2.5 border-b border-slate-50 last:border-0">
//       <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
//       <span className="text-sm text-slate-700 font-medium">{value}</span>
//     </div>
//   );

//   return (
//     <Modal title="Appointment Details" onClose={onClose}>
//       <div className="space-y-0.5">
//         {row('Appointment ID', String(apt.id))}
//         {row('Patient', patient?.name || `Patient #${apt.patientId}`)}
//         {row('Doctor', doctor?.name || `Doctor #${apt.doctorId}`)}
//         {row('Date', apt.appointmentDate ? new Date(apt.appointmentDate).toLocaleString() : '—')}
//         {row('Type', cap(apt.type))}
//         {row('Status', cap(apt.status))}
//         {row('Notes', apt.notes || '—')}
//       </div>
//     </Modal>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────
// export default function AppointmentsPage() {
//   const [appointments, setAppointments] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [doctors, setDoctors] = useState(STATIC_DOCTORS);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [search, setSearch] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [showFilter, setShowFilter] = useState(false);

//   const [modal, setModal] = useState(null);
//   const [selected, setSelected] = useState(null);
//   const [formLoading, setFormLoading] = useState(false);
//   const [toast, setToast] = useState('');

//   const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

//   // Load appointments
//   const load = useCallback(async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const res = await getAppointment(10, page);

//       // Handle different response structures
//       const raw = res?.data?.appointments || res?.data || [];

//       const list = raw.map(item => ({
//         id: item.id,
//         patientId: item.patientId,
//         doctorId: item.doctorId,
//         appointmentDate: item.appointmentDate || '',
//         status: item.status || 'scheduled',
//         notes: item.notes || '',
//         type: item.type || 'consultation',
//         patient: item.patient || null,
//         doctor: item.doctor || null,
//       }));

//       setAppointments(list);
//       setTotalPages(res?.data?.totalPages ?? 1);

//     } catch (e) {
//       console.error('Appointments error:', e);
//       setError('Failed to load appointments. Check your API connection.');
//     } finally {
//       setLoading(false);
//     }
//   }, [page]);

//   // Load patients
//   const loadPatients = useCallback(async () => {
//     try {
//       const res = await getPatients(100, 1);
//       const dataArray = res?.data?.data || res?.data || [];

//       const apiPatients = dataArray.map((item) => ({
//         id: item.id,
//         name: item.name,
//         phone: item.phone,
//         email: item.user?.email || '-',
//       }));

//       setPatients(apiPatients);
//     } catch (err) {
//       console.error('Failed to load patients:', err);
//       setPatients([]);
//     }
//   }, []);

//   useEffect(() => {
//     load();
//     loadPatients();
//   }, [load, loadPatients]);

//   const filtered = appointments.filter(a => {
//     const patient = patients.find(p => p.id === a.patientId);
//     const doctor = doctors.find(d => d.id === a.doctorId);

//     const matchSearch = search === '' ||
//       String(a.patientId).includes(search) ||
//       String(a.doctorId).includes(search) ||
//       a.type.toLowerCase().includes(search.toLowerCase()) ||
//       (a.notes || '').toLowerCase().includes(search.toLowerCase()) ||
//       (patient?.name || '').toLowerCase().includes(search.toLowerCase()) ||
//       (doctor?.name || '').toLowerCase().includes(search.toLowerCase());

//     const matchStatus = filterStatus === 'all' || a.status === filterStatus;
//     return matchSearch && matchStatus;
//   });

//   const openCreate = () => { setSelected(null); setModal('create'); };
//   const openEdit = (a) => { setSelected(a); setModal('edit'); };
//   const openView = (a) => { setSelected(a); setModal('view'); };
//   const openDelete = (a) => { setSelected(a); setModal('delete'); };

//   const handleCreate = async (e, form) => {
//     e.preventDefault();
//     setFormLoading(true);
//     try {
//       const newApt = {
//         patientId: Number(form.patientId),
//         doctorId: Number(form.doctorId),
//         appointmentDate: form.appointmentDate,
//         status: form.status,
//         notes: form.notes,
//         type: form.type,
//       };
//       await createAppointmentApi(newApt);
//       await load();
//       showToast('✅ Appointment created!');
//       setModal(null);
//     } catch {
//       showToast('❌ Failed to create appointment.');
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   const handleUpdate = async (e, form) => {
//     e.preventDefault();
//     if (!selected) return;
//     setFormLoading(true);
//     try {
//       const updatedData = {
//         patientId: Number(form.patientId),
//         doctorId: Number(form.doctorId),
//         appointmentDate: form.appointmentDate,
//         status: form.status,
//         notes: form.notes,
//         type: form.type,
//       };
//       await udateAppointmentApi(selected.id, updatedData);
//       await load();
//       showToast('✅ Appointment updated!');
//       setModal(null);
//       setSelected(null);
//     } catch {
//       showToast('❌ Failed to update appointment.');
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!selected) return;
//     setFormLoading(true);
//     try {
//       await deleteAppointmentApi(selected.id);
//       await load();
//       showToast('🗑️ Appointment deleted.');
//       setModal(null);
//       setSelected(null);
//     } catch {
//       showToast('❌ Failed to delete appointment.');
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   const statuses = ['all', 'scheduled', 'confirmed', 'pending', 'completed', 'cancelled'];
//   const counts = (s) => appointments.filter(a => a.status === s).length;

//   return (
//     <div className="p-6 md:p-8 min-h-screen bg-slate-50">
//       {/* Toast */}
//       {toast && (
//         <div className="fixed top-6 right-6 z-[100] bg-slate-800 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium">
//           {toast}
//         </div>
//       )}

//       {/* Modals */}
//       {modal === 'create' && (
//         <Modal title="New Appointment" onClose={() => setModal(null)}>
//           <AppointmentForm
//             initial={{ ...EMPTY_FORM }}
//             onSubmit={handleCreate}
//             loading={formLoading}
//             patients={patients}
//             doctors={doctors}
//           />
//         </Modal>
//       )}
//       {modal === 'edit' && selected && (
//         <Modal title="Edit Appointment" onClose={() => setModal(null)}>
//           <AppointmentForm
//             initial={{
//               patientId: selected.patientId,
//               doctorId: selected.doctorId,
//               appointmentDate: selected.appointmentDate,
//               status: selected.status,
//               notes: selected.notes,
//               type: selected.type,
//             }}
//             onSubmit={handleUpdate}
//             loading={formLoading}
//             patients={patients}
//             doctors={doctors}
//           />
//         </Modal>
//       )}
//       {modal === 'view' && selected && (
//         <ViewModal apt={selected} onClose={() => setModal(null)} patients={patients} doctors={doctors} />
//       )}
//       {modal === 'delete' && selected && (
//         <Modal title="Delete Appointment" onClose={() => setModal(null)}>
//           <div className="text-center space-y-4">
//             <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto">
//               <Trash2 className="w-6 h-6 text-red-500" />
//             </div>
//             <div>
//               <p className="text-slate-700 font-semibold">Delete Appointment #{selected.id}?</p>
//               <p className="text-slate-500 text-sm mt-1">This action cannot be undone.</p>
//             </div>
//             <div className="flex gap-3">
//               <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
//               <button onClick={handleDelete} disabled={formLoading} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
//                 {formLoading && <Loader2 className="w-4 h-4 animate-spin" />}
//                 Delete
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-1">Appointments</h1>
//             <p className="text-slate-500 text-sm">Manage patient appointments and schedules</p>
//           </div>
//           <button onClick={openCreate} className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 font-semibold shadow-lg shadow-emerald-100">
//             <Plus className="w-4 h-4" /> New Appointment
//           </button>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
//           {[
//             { label: 'Total', value: appointments.length, color: 'text-slate-800' },
//             { label: 'Confirmed', value: counts('confirmed'), color: 'text-emerald-600' },
//             { label: 'Pending', value: counts('pending'), color: 'text-amber-600' },
//             { label: 'Completed', value: counts('completed'), color: 'text-blue-600' },
//             { label: 'Cancelled', value: counts('cancelled'), color: 'text-red-500' },
//           ].map(s => (
//             <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//               <p className="text-xs text-slate-500 mb-1 font-medium">{s.label}</p>
//               <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Search & Filter */}
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
//           <button onClick={() => setShowFilter(f => !f)} className={`px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all border-2 ${showFilter ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
//             <Filter className="w-4 h-4" /> Filter
//           </button>
//           <button onClick={load} className="px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all">
//             Refresh
//           </button>
//         </div>
//         {showFilter && (
//           <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2 flex-wrap">
//             {statuses.map(s => (
//               <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all border ${filterStatus === s ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 text-slate-600 hover:border-emerald-300'}`}>
//                 {s === 'all' ? 'All Statuses' : cap(s)}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
//         {error && (
//           <div className="flex items-center gap-3 p-4 bg-red-50 border-b border-red-100 text-red-600 text-sm">
//             <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
//           </div>
//         )}
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-100">
//               <tr>
//                 {['ID', 'Patient', 'Doctor', 'Date & Time', 'Type', 'Status', 'Notes', 'Actions'].map(h => (
//                   <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50">
//               {loading ? (
//                 <tr><td colSpan={8} className="py-16 text-center">
//                   <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-2" />
//                   <p className="text-slate-400 text-sm">Loading appointments…</p>
//                 </td></tr>
//               ) : filtered.length === 0 ? (
//                 <tr><td colSpan={8} className="py-16 text-center">
//                   <Calendar className="w-10 h-10 text-slate-200 mx-auto mb-3" />
//                   <p className="text-slate-400 font-medium">No appointments found</p>
//                   <p className="text-slate-300 text-sm mt-1">Try changing your search or filter</p>
//                 </td></tr>
//               ) : filtered.map(apt => {
//                 const patient = patients.find(p => p.id === apt.patientId);
//                 const doctor = doctors.find(d => d.id === apt.doctorId);
                
//                 return (
//                   <tr key={apt.id} className="hover:bg-emerald-50/40 transition-colors">
//                     <td className="px-5 py-4 text-sm font-mono text-slate-500">#{apt.id}</td>
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
//                         {apt.appointmentDate ? new Date(apt.appointmentDate).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' }) : '—'}
//                       </div>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold capitalize">{apt.type}</span>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${statusStyle[apt.status] || 'bg-slate-100 text-slate-600'}`}>
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

//         {/* Pagination */}
//         {!loading && totalPages > 1 && (
//           <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
//             <p className="text-sm text-slate-500">Page {page} of {totalPages}</p>
//             <div className="flex gap-2">
//               <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
//                 <ChevronLeft className="w-4 h-4" />
//               </button>
//               <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
















// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { Calendar, Clock, Plus, Search, Filter, X, Edit2, Trash2, Eye, ChevronLeft, ChevronRight, Loader2, AlertCircle, ChevronDown } from 'lucide-react';
// import { getAppointment, createAppointmentApi, udateAppointmentApi, deleteAppointmentApi, getPatients,getDoctorApi } from '../../lib/commonApis';

// // ─── Constants ────────────────────────────────────────────────────────────────
// const EMPTY_FORM = {
//   patientId: '',
//   doctorId: '',
//   appointmentDate: '',
//   status: 'scheduled',
//   notes: '',
//   type: 'consultation',
// };

// const statusStyle = {
//   confirmed: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
//   scheduled: 'bg-teal-100 text-teal-700 border border-teal-200',
//   completed: 'bg-blue-100 text-blue-700 border border-blue-200',
//   cancelled: 'bg-red-100 text-red-700 border border-red-200',
// };

// const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// // ─── Searchable Dropdown Component ───────────────────────────────────────────
// function SearchableDropdown({ label, value, onChange, options, placeholder, required }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   const filtered = options.filter(opt =>
//     opt.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const selected = options.find(opt => opt.id === Number(value));

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     if (!isOpen) return;
    
//     const handleClickOutside = (e) => {
//       if (!e.target.closest('.dropdown-container')) {
//         setIsOpen(false);
//         setSearchTerm('');
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isOpen]);

//   return (
//     <div className="relative dropdown-container">
//       <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>

//       {/* Dropdown Button */}
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

//       {/* Dropdown Menu */}
//       {isOpen && (
//         <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
//           {/* Search Input */}
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

//           {/* Options List */}
//           <div className="max-h-60 overflow-y-auto">
//             {filtered.length > 0 ? (
//               filtered.map((option) => (
//                 <button
//                   key={option.id}
//                   type="button"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     onChange(option.id);
//                     setIsOpen(false);
//                     setSearchTerm('');
//                   }}
//                   className={`w-full text-left px-4 py-3 cursor-pointer transition-all ${
//                     Number(value) === option.id
//                       ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold'
//                       : 'text-slate-700 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 hover:text-white'
//                   }`}
//                 >
//                   <div className="font-medium">{option.name}</div>
//                   {option.specialty && (
//                     <div className={`text-xs mt-0.5 ${Number(value) === option.id ? 'text-emerald-100' : 'text-slate-500'}`}>
//                       {option.specialty}
//                     </div>
//                   )}
//                 </button>
//               ))
//             ) : (
//               <div className="px-4 py-8 text-center text-slate-400 text-sm">
//                 No results found
//               </div>
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

// // ─── Form ─────────────────────────────────────────────────────────────────────
// function AppointmentForm({ initial, onSubmit, loading, patients, doctors }) {
//   const [form, setForm] = useState(initial);
//   const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

//   const fieldCls = "w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm";
//   const labelCls = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";

//   return (
//     <form onSubmit={(e) => onSubmit(e, form)} className="space-y-4">
//       <div className="grid grid-cols-2 gap-4">
//         {/* Patient Dropdown with Search */}
//         <SearchableDropdown
//           label="Patient"
//           value={form.patientId}
//           onChange={(id) => set('patientId', id)}
//           options={patients}
//           placeholder="Select Patient"
//           required
//         />

//         {/* Doctor Dropdown with Search */}
//         <SearchableDropdown
//           label="Doctor"
//           value={form.doctorId}
//           onChange={(id) => set('doctorId', id)}
//           options={doctors}
//           placeholder="Select Doctor"
//           required
//         />
//       </div>

//       <div>
//         <label className={labelCls}>Appointment Date & Time</label>
//         <input className={fieldCls} type="datetime-local" value={form.appointmentDate} onChange={e => set('appointmentDate', e.target.value)} required />
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
//         <textarea className={fieldCls + ' resize-none h-20'} placeholder="Additional notes…" value={form.notes} onChange={e => set('notes', e.target.value)} />
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
//       >
//         {loading && <Loader2 className="w-4 h-4 animate-spin" />}
//         {loading ? 'Saving…' : 'Save Appointment'}
//       </button>
//     </form>
//   );
// }

// // ─── View Modal ───────────────────────────────────────────────────────────────
// function ViewModal({ apt, onClose, patients, doctors }) {
//   const patient = patients.find(p => p.id === apt.patientId);
//   const doctor = doctors.find(d => d.id === apt.doctorId);

//   const row = (label, value) => (
//     <div className="flex justify-between py-2.5 border-b border-slate-50 last:border-0">
//       <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
//       <span className="text-sm text-slate-700 font-medium">{value}</span>
//     </div>
//   );

//   return (
//     <Modal title="Appointment Details" onClose={onClose}>
//       <div className="space-y-0.5">
//         {row('Appointment ID', String(apt.id))}
//         {row('Patient', patient?.name || `Patient #${apt.patientId}`)}
//         {row('Doctor', doctor?.name || `Doctor #${apt.doctorId}`)}
//         {row('Date', apt.appointmentDate ? new Date(apt.appointmentDate).toLocaleString() : '—')}
//         {row('Type', cap(apt.type))}
//         {row('Status', cap(apt.status))}
//         {row('Notes', apt.notes || '—')}
//       </div>
//     </Modal>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────
// export default function AppointmentsPage() {
//   const [appointments, setAppointments] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [search, setSearch] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [showFilter, setShowFilter] = useState(false);

//   const [modal, setModal] = useState(null);
//   const [selected, setSelected] = useState(null);
//   const [formLoading, setFormLoading] = useState(false);
//   const [toast, setToast] = useState('');

//   const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

//   // Load appointments
//   const load = useCallback(async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const res = await getAppointment(10, page);

//       // Handle different response structures
//       const raw = res?.data?.appointments || res?.data || [];

//       const list = raw.map(item => ({
//         id: item.id,
//         patientId: item.patientId,
//         doctorId: item.doctorId,
//         appointmentDate: item.appointmentDate || '',
//         status: item.status || 'scheduled',
//         notes: item.notes || '',
//         type: item.type || 'consultation',
//         patient: item.patient || null,
//         doctor: item.doctor || null,
//       }));

//       setAppointments(list);
//       setTotalPages(res?.data?.totalPages ?? 1);

//     } catch (e) {
//       console.error('Appointments error:', e);
//       setError('Failed to load appointments. Check your API connection.');
//     } finally {
//       setLoading(false);
//     }
//   }, [page]);

//   // Load patients
//   const loadPatients = useCallback(async () => {
//     try {
//       const res = await getPatients(100, 1);
//       const dataArray = res?.data?.data || res?.data || [];

//       const apiPatients = dataArray.map((item) => ({
//         id: item.id,
//         name: item.name,
//         phone: item.phone,
//         email: item.user?.email || '-',
//       }));

//       setPatients(apiPatients);
//     } catch (err) {
//       console.error('Failed to load patients:', err);
//       setPatients([]);
//     }
//   }, []);


//     const loadDoctors = useCallback(async () => {
//     try {
//       const res = await getDoctorApi(100, 1);
//       const dataArray = res?.data?.data || res?.data || [];
// console.log(dataArray.doctors,'doctors');


//       const apiDoctors = dataArray.doctors.map((item) => ({
       
        
//         id: item.id,
//         name: item.name,
//       }));

//       setDoctors(apiDoctors);
//     } catch (err) {
//       console.error('Failed to load patients:', err);
//       setDoctors([]);
//     }
//   }, []);

//   useEffect(() => {
//     load();
//     loadPatients();
//     loadDoctors();
//   }, [load, loadPatients]);

//   const filtered = appointments.filter(a => {
//     const patient = patients.find(p => p.id === a.patientId);
//     const doctor = doctors.find(d => d.id === a.doctorId);

//     const matchSearch = search === '' ||
//       String(a.patientId).includes(search) ||
//       String(a.doctorId).includes(search) ||
//       a.type.toLowerCase().includes(search.toLowerCase()) ||
//       (a.notes || '').toLowerCase().includes(search.toLowerCase()) ||
//       (patient?.name || '').toLowerCase().includes(search.toLowerCase()) ||
//       (doctor?.name || '').toLowerCase().includes(search.toLowerCase());

//     const matchStatus = filterStatus === 'all' || a.status === filterStatus;
//     return matchSearch && matchStatus;
//   });

//   const openCreate = () => { setSelected(null); setModal('create'); };
//   const openEdit = (a) => { setSelected(a); setModal('edit'); };
//   const openView = (a) => { setSelected(a); setModal('view'); };
//   const openDelete = (a) => { setSelected(a); setModal('delete'); };

//   const handleCreate = async (e, form) => {
//     e.preventDefault();
//     setFormLoading(true);
//     try {
//       const newApt = {
//         patientId: Number(form.patientId),
//         doctorId: Number(form.doctorId),
//         appointmentDate: form.appointmentDate,
//         status: form.status,
//         notes: form.notes,
//         type: form.type,
//       };
//       console.log(newApt,'abvc');
      
//       await createAppointmentApi(newApt);
//       await load();
//       showToast('✅ Appointment created!');
//       setModal(null);
//     } catch {
//       showToast('❌ Failed to create appointment.');
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   const handleUpdate = async (e, form) => {
//     e.preventDefault();
//     if (!selected) return;
//     setFormLoading(true);
//     try {
//       const updatedData = {
//         patientId: Number(form.patientId),
//         doctorId: Number(form.doctorId),
//         appointmentDate: form.appointmentDate,
//         status: form.status,
//         notes: form.notes,
//         type: form.type,
//       };
//       await udateAppointmentApi(selected.id, updatedData);
//       await load();
//       showToast('✅ Appointment updated!');
//       setModal(null);
//       setSelected(null);
//     } catch {
//       showToast('❌ Failed to update appointment.');
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!selected) return;
//     setFormLoading(true);
//     try {
//       await deleteAppointmentApi(selected.id);
//       await load();
//       showToast('🗑️ Appointment deleted.');
//       setModal(null);
//       setSelected(null);
//     } catch {
//       showToast('❌ Failed to delete appointment.');
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   const statuses = ['all', 'scheduled', 'confirmed', 'completed', 'cancelled'];
//   const counts = (s) => appointments.filter(a => a.status === s).length;

//   return (
//     <div className="p-6 md:p-8 min-h-screen bg-slate-50">
//       {/* Toast */}
//       {toast && (
//         <div className="fixed top-6 right-6 z-[100] bg-slate-800 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium">
//           {toast}
//         </div>
//       )}

//       {/* Modals */}
//       {modal === 'create' && (
//         <Modal title="New Appointment" onClose={() => setModal(null)}>
//           <AppointmentForm
//             initial={{ ...EMPTY_FORM }}
//             onSubmit={handleCreate}
//             loading={formLoading}
//             patients={patients}
//             doctors={doctors}
//           />
//         </Modal>
//       )}
//       {modal === 'edit' && selected && (
//         <Modal title="Edit Appointment" onClose={() => setModal(null)}>
//           <AppointmentForm
//             initial={{
//               patientId: selected.patientId,
//               doctorId: selected.doctorId,
//               appointmentDate: selected.appointmentDate,
//               status: selected.status,
//               notes: selected.notes,
//               type: selected.type,
//             }}
//             onSubmit={handleUpdate}
//             loading={formLoading}
//             patients={patients}
//             doctors={doctors}
//           />
//         </Modal>
//       )}
//       {modal === 'view' && selected && (
//         <ViewModal apt={selected} onClose={() => setModal(null)} patients={patients} doctors={doctors} />
//       )}
//       {modal === 'delete' && selected && (
//         <Modal title="Delete Appointment" onClose={() => setModal(null)}>
//           <div className="text-center space-y-4">
//             <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto">
//               <Trash2 className="w-6 h-6 text-red-500" />
//             </div>
//             <div>
//               <p className="text-slate-700 font-semibold">Delete Appointment #{selected.id}?</p>
//               <p className="text-slate-500 text-sm mt-1">This action cannot be undone.</p>
//             </div>
//             <div className="flex gap-3">
//               <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
//               <button onClick={handleDelete} disabled={formLoading} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
//                 {formLoading && <Loader2 className="w-4 h-4 animate-spin" />}
//                 Delete
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-1">Appointments</h1>
//             <p className="text-slate-500 text-sm">Manage patient appointments and schedules</p>
//           </div>
//           <button onClick={openCreate} className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 font-semibold shadow-lg shadow-emerald-100">
//             <Plus className="w-4 h-4" /> New Appointment
//           </button>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//           {[
//             { label: 'Total', value: appointments.length, color: 'text-slate-800' },
//             { label: 'Confirmed', value: counts('confirmed'), color: 'text-emerald-600' },
//             { label: 'Completed', value: counts('completed'), color: 'text-blue-600' },
//             { label: 'Cancelled', value: counts('cancelled'), color: 'text-red-500' },
//           ].map(s => (
//             <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//               <p className="text-xs text-slate-500 mb-1 font-medium">{s.label}</p>
//               <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Search & Filter */}
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
//           <button onClick={() => setShowFilter(f => !f)} className={`px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all border-2 ${showFilter ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
//             <Filter className="w-4 h-4" /> Filter
//           </button>
//           <button onClick={load} className="px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all">
//             Refresh
//           </button>
//         </div>
//         {showFilter && (
//           <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2 flex-wrap">
//             {statuses.map(s => (
//               <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all border ${filterStatus === s ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 text-slate-600 hover:border-emerald-300'}`}>
//                 {s === 'all' ? 'All Statuses' : cap(s)}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
//         {error && (
//           <div className="flex items-center gap-3 p-4 bg-red-50 border-b border-red-100 text-red-600 text-sm">
//             <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
//           </div>
//         )}
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-100">
//               <tr>
//                 {['ID', 'Patient', 'Doctor', 'Date & Time', 'Type', 'Status', 'Notes', 'Actions'].map(h => (
//                   <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50">
//               {loading ? (
//                 <tr><td colSpan={8} className="py-16 text-center">
//                   <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-2" />
//                   <p className="text-slate-400 text-sm">Loading appointments…</p>
//                 </td></tr>
//               ) : filtered.length === 0 ? (
//                 <tr><td colSpan={8} className="py-16 text-center">
//                   <Calendar className="w-10 h-10 text-slate-200 mx-auto mb-3" />
//                   <p className="text-slate-400 font-medium">No appointments found</p>
//                   <p className="text-slate-300 text-sm mt-1">Try changing your search or filter</p>
//                 </td></tr>
//               ) : filtered.map(apt => {
//                 const patient = patients.find(p => p.id === apt.patientId);
//                 const doctor = doctors.find(d => d.id === apt.doctorId);
                
//                 return (
//                   <tr key={apt.id} className="hover:bg-emerald-50/40 transition-colors">
//                     <td className="px-5 py-4 text-sm font-mono text-slate-500">#{apt.id}</td>
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
//                         {apt.appointmentDate ? new Date(apt.appointmentDate).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' }) : '—'}
//                       </div>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold capitalize">{apt.type}</span>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${statusStyle[apt.status] || 'bg-slate-100 text-slate-600'}`}>
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

//         {/* Pagination */}
//         {!loading && totalPages > 1 && (
//           <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
//             <p className="text-sm text-slate-500">Page {page} of {totalPages}</p>
//             <div className="flex gap-2">
//               <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
//                 <ChevronLeft className="w-4 h-4" />
//               </button>
//               <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }










// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { Calendar, Plus, Search, Filter, X, Edit2, Trash2, Eye, ChevronLeft, ChevronRight, Loader2, AlertCircle, ChevronDown } from 'lucide-react';
// import { getAppointment, createAppointmentApi, udateAppointmentApi, deleteAppointmentApi, getPatients, getDoctorApi } from '../../lib/commonApis';

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

// // Converts any date string → "YYYY-MM-DDTHH:mm" for datetime-local input
// const toLocalInputValue = (dateStr) => {
//   if (!dateStr) return '';
//   const d = new Date(dateStr);
//   if (isNaN(d)) return '';
//   // Pad helper
//   const pad = (n) => String(n).padStart(2, '0');
//   return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
// };

// // Formats appointment for the form (handles date patching)
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

// // ─── Unified Appointment Form (Add + Edit) ────────────────────────────────────
// function AppointmentForm({ initial, onSubmit, loading, patients, doctors, isEdit }) {
//   const [form, setForm] = useState(initial);
//   const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

//   // Sync when initial changes (e.g. switching between add/edit)
//   useEffect(() => { setForm(initial); }, [initial]);

//   const fieldCls = "w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm";
//   const labelCls = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";

//   // Custom styled date-time picker — two separate inputs for date & time
//   const dateVal = form.appointmentDate ? form.appointmentDate.slice(0, 10) : '';
//   const timeVal = form.appointmentDate ? form.appointmentDate.slice(11, 16) : '';

//   const handleDateChange = (e) => {
//     const date = e.target.value;        // "YYYY-MM-DD"
//     const time = timeVal || '00:00';
//     set('appointmentDate', `${date}T${time}`);
//   };

//   const handleTimeChange = (e) => {
//     const time = e.target.value;        // "HH:mm"
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

//       {/* Date & Time — split into two clean inputs */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className={labelCls}>
//             <span className="flex items-center gap-1.5">
//               <Calendar className="w-3 h-3" /> Appointment Date
//             </span>
//           </label>
//           <input
//             type="date"
//             value={dateVal}
//             onChange={handleDateChange}
//             required
//             className={fieldCls}
//           />
//         </div>
//         <div>
//           <label className={labelCls}>
//             <span className="flex items-center gap-1.5">
//               🕐 Time
//             </span>
//           </label>
//           <input
//             type="time"
//             value={timeVal}
//             onChange={handleTimeChange}
//             required
//             className={fieldCls}
//           />
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
//   const [search, setSearch] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [showFilter, setShowFilter] = useState(false);
//   const [formLoading, setFormLoading] = useState(false);
//   const [toast, setToast] = useState('');

//   // modal: null | 'form' | 'view' | 'delete'
//   const [modal, setModal] = useState(null);
//   // selected: null = Add mode, object = Edit/View/Delete mode
//   const [selected, setSelected] = useState(null);

//   const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
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

//   useEffect(() => { load(); loadPatients(); loadDoctors(); }, [load, loadPatients]);

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
//         showToast('✅ Appointment updated!');
//       } else {
//         await createAppointmentApi(payload);
//         showToast('✅ Appointment created!');
//       }
//       await load();
//       closeModal();
//     } catch {
//       showToast(`❌ Failed to ${selected ? 'update' : 'create'} appointment.`);
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!selected) return;
//     setFormLoading(true);
//     try {
//       await deleteAppointmentApi(selected.id);
//       await load();
//       showToast('🗑️ Appointment deleted.');
//       closeModal();
//     } catch {
//       showToast('❌ Failed to delete appointment.');
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   // ── Stats ─────────────────────────────────────────────────────────────────
//   const count = (s) => appointments.filter(a => a.status === s).length;
//   const statuses = ['all', 'scheduled', 'completed', 'cancelled'];

//   // Form initial value: empty for create, patched for edit
//   const formInitial = selected ? aptToForm(selected) : { ...EMPTY_FORM };

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
//           <button
//             onClick={openCreate}
//             className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 font-semibold shadow-lg shadow-emerald-100"
//           >
//             <Plus className="w-4 h-4" /> New Appointment
//           </button>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//           {[
//             { label: 'Total', value: appointments.length, color: 'text-slate-800' },
//             { label: 'Confirmed', value: count('confirmed'), color: 'text-emerald-600' },
//             { label: 'Completed', value: count('completed'), color: 'text-blue-600' },
//             { label: 'Cancelled', value: count('cancelled'), color: 'text-red-500' },
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
//       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
//         {error && (
//           <div className="flex items-center gap-3 p-4 bg-red-50 border-b border-red-100 text-red-600 text-sm">
//             <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
//           </div>
//         )}
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-100">
//               <tr>
//                 {['ID', 'Patient', 'Doctor', 'Date & Time', 'Type', 'Status', 'Notes', 'Actions'].map(h => (
//                   <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50">
//               {loading ? (
//                 <tr><td colSpan={8} className="py-16 text-center">
//                   <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-2" />
//                   <p className="text-slate-400 text-sm">Loading appointments…</p>
//                 </td></tr>
//               ) : filtered.length === 0 ? (
//                 <tr><td colSpan={8} className="py-16 text-center">
//                   <Calendar className="w-10 h-10 text-slate-200 mx-auto mb-3" />
//                   <p className="text-slate-400 font-medium">No appointments found</p>
//                   <p className="text-slate-300 text-sm mt-1">Try changing your search or filter</p>
//                 </td></tr>
//               ) : filtered.map(apt => {
//                 const patient = patients.find(p => p.id === apt.patientId);
//                 const doctor = doctors.find(d => d.id === apt.doctorId);
//                 return (
//                   <tr key={apt.id} className="hover:bg-emerald-50/40 transition-colors">
//                     <td className="px-5 py-4 text-sm font-mono text-slate-500">#{apt.id}</td>
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

//         {/* Pagination */}
//         {!loading && totalPages > 1 && (
//           <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
//             <p className="text-sm text-slate-500">Page {page} of {totalPages}</p>
//             <div className="flex gap-2">
//               <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
//                 <ChevronLeft className="w-4 h-4" />
//               </button>
//               <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// 'use client';

// import { useState, useEffect, useMemo, useCallback } from 'react';
// import {
//   Plus, Search, Download, Eye, Send, X, ChevronDown,
//   FileText, Sheet, Pill, User, Stethoscope, Trash2,
//   Copy, Check, Printer, CheckCircle, Clock, ChevronLeft, ChevronRight, Loader2, AlertCircle
// } from 'lucide-react';
// import { createInvoiceApi, getInvoiceApi, updateInvoiceApi, deleteInvoiceApi, getPatients, getDoctorApi, getMedicines } from '../../lib/commonApis';

// // ── Medicine Types ────────────────────────────────────────────────────────────
// const MEDICINE_TYPES = ['tablet', 'capsule', 'syrup', 'injection', 'drops', 'cream'];
// const EMPTY_MEDICINE = { medicineId: '', quantity: '', strength: '', type: 'tablet', price: '' };

// const ITEMS_PER_PAGE = 10;

// // ── Modal Component ───────────────────────────────────────────────────────────
// function Modal({ isOpen, onClose, title, children, size = 'md' }) {
//   if (!isOpen) return null;
//   const sizeMap = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl' };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
//       <div
//         className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeMap[size]} border border-slate-100 flex flex-col max-h-[90vh]`}
//         onClick={e => e.stopPropagation()}
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
// export default function BillingPage() {
//   const [patients, setPatients] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [medicines, setMedicines] = useState([]);

//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);

//   const [showExportMenu, setShowExportMenu] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showShareModal, setShowShareModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedInvoice, setSelectedInvoice] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [toast, setToast] = useState('');

//   const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

//   // ── Form State ────────────────────────────────────────────────────────────
//   const [form, setForm] = useState({
//     patientId: '',
//     doctorId: '',
//     medicines: [{ ...EMPTY_MEDICINE }],
//   });

//   const formTotal = form.medicines.reduce((s, m) =>
//     s + ((parseFloat(m.price) || 0) * (parseInt(m.quantity) || 0)), 0
//   );

//   // ── Helper: get medicine name by id ──────────────────────────────────────
//   const getMedicineName = useCallback((medicineId) => {
//     const found = medicines.find(m => String(m.medicineId) === String(medicineId));
//     return found ? found.name : `Med #${medicineId}`;
//   }, [medicines]);

//   // ── Load Invoices (fetch all, paginate client-side) ───────────────────────
//   const loadInvoices = useCallback(async () => {
//     setLoading(true);
//     try {
//       // Fetch all invoices at once for client-side pagination & filtering
//       const res = await getInvoiceApi(1000, 1);
//       console.log('Invoice API Response:', res);

//       const dataArray = res?.data?.invoices || res?.data || res || [];
//       const list = Array.isArray(dataArray) ? dataArray.map(item => ({
//         id: item.id,
//         invoiceId: item.invoiceId || `INV-${item.id}`,
//         patientId: item.patientId,
//         patientName: item.patient?.name || `Patient #${item.patientId}`,
//         doctorId: item.doctorId,
//         doctorName: item.doctor?.name || `Doctor #${item.doctorId}`,
//         date: item.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0],
//         status: item.status?.toLowerCase() || 'active',
//         medicines: item.medicines || [],
//         totalAmount: parseFloat(item.totalPrice) || item.medicines?.reduce((s, m) =>
//           s + (parseFloat(m.subtotal) || (parseFloat(m.price) || 0) * (parseInt(m.quantity) || 0)), 0) || 0,
//         notes: item.notes || '',
//       })) : [];

//       setInvoices(list);
//     } catch (err) {
//       console.error('Failed to load invoices:', err);
//       showToast('❌ Failed to load invoices');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // ── Load Patients ─────────────────────────────────────────────────────────
//   const loadPatients = useCallback(async () => {
//     try {
//       const res = await getPatients(100, 1);
//       const dataArray = res?.data?.data || res?.data || [];
//       setPatients(dataArray.map(item => ({
//         id: item.id,
//         name: item.name,
//         phone: item.phone,
//         email: item.user?.email || '-',
//       })));
//     } catch (err) {
//       console.error('Failed to load patients:', err);
//       setPatients([]);
//     }
//   }, []);

//   // ── Load Doctors ──────────────────────────────────────────────────────────
//   const loadDoctors = useCallback(async () => {
//     try {
//       const res = await getDoctorApi(100, 1);
//       const dataArray = res?.data?.data || res?.data || [];
//       console.log(dataArray.doctors, 'doctors');
//       setDoctors(dataArray.doctors.map(item => ({
//         id: item.id,
//         name: item.name,
//       })));
//     } catch (err) {
//       console.error('Failed to load doctors:', err);
//       setDoctors([]);
//     }
//   }, []);

//   // ── Load Medicines ────────────────────────────────────────────────────────
//   const loadMedicines = useCallback(async () => {
//     try {
//       const res = await getMedicines(100, 1);
//       console.log(res.data.medicines, 'data medicine');
//       const dataArray = res?.data?.medicines || res?.data || [];
//       setMedicines(dataArray.map(item => ({
//         medicineId: item.id,
//         name: item.name,
//       })));
//     } catch (err) {
//       console.error('Failed to load medicines:', err);
//       setMedicines([]);
//     }
//   }, []);

//   useEffect(() => {
//     loadInvoices();
//     loadPatients();
//     loadDoctors();
//     loadMedicines();
//   }, [loadInvoices]);

//   // ── Form Handlers ─────────────────────────────────────────────────────────
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setForm(p => ({ ...p, [name]: value }));
//   };

//   const handleMedChange = (idx, field, value) => {
//     const updated = form.medicines.map((m, i) => i === idx ? { ...m, [field]: value } : m);
//     setForm(p => ({ ...p, medicines: updated }));
//   };

//   const addMedRow = () => setForm(p => ({ ...p, medicines: [...p.medicines, { ...EMPTY_MEDICINE }] }));

//   const removeMedRow = (idx) => {
//     if (form.medicines.length === 1) return;
//     setForm(p => ({ ...p, medicines: p.medicines.filter((_, i) => i !== idx) }));
//   };

//   const resetForm = () => setForm({
//     patientId: '',
//     doctorId: '',
//     medicines: [{ ...EMPTY_MEDICINE }],
//   });

//   // ── Create Invoice ────────────────────────────────────────────────────────
//   const handleCreate = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       const payload = {
//         patientId: parseInt(form.patientId),
//         doctorId: parseInt(form.doctorId),
//         medicines: form.medicines.map(m => ({
//           medicineId: parseInt(m.medicineId),
//           quantity: parseInt(m.quantity),
//           strength: m.strength,
//           type: m.type,
//           price: parseFloat(m.price),
//         })),
//       };
//       await createInvoiceApi(payload);
//       await loadInvoices();
//       setShowAddModal(false);
//       resetForm();
//       setCurrentPage(1);
//       showToast('✅ Invoice created successfully!');
//     } catch (err) {
//       console.error('Create error:', err);
//       showToast('❌ Failed to create invoice');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ── Update Invoice ────────────────────────────────────────────────────────
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!selectedInvoice) return;
//     setIsSubmitting(true);
//     try {
//       const payload = {
//         patientId: parseInt(form.patientId),
//         doctorId: parseInt(form.doctorId),
//         medicines: form.medicines.map(m => ({
//           medicineId: parseInt(m.medicineId),
//           quantity: parseInt(m.quantity),
//           strength: m.strength,
//           type: m.type,
//           price: parseFloat(m.price),
//         })),
//       };
//       await updateInvoiceApi(selectedInvoice.id, payload);
//       await loadInvoices();
//       setShowEditModal(false);
//       setSelectedInvoice(null);
//       resetForm();
//       showToast('✅ Invoice updated successfully!');
//     } catch (err) {
//       console.error('Update error:', err);
//       showToast('❌ Failed to update invoice');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ── Delete Invoice ────────────────────────────────────────────────────────
//   const handleDelete = async () => {
//     if (!selectedInvoice) return;
//     setIsSubmitting(true);
//     try {
//       await deleteInvoiceApi(selectedInvoice.id);
//       await loadInvoices();
//       setShowDeleteModal(false);
//       setSelectedInvoice(null);
//       showToast('🗑️ Invoice deleted');
//     } catch (err) {
//       console.error('Delete error:', err);
//       showToast('❌ Failed to delete invoice');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ── Edit Click ────────────────────────────────────────────────────────────
//   const handleEditClick = (invoice) => {
//     setSelectedInvoice(invoice);
//     setForm({
//       patientId: invoice.patientId.toString(),
//       doctorId: invoice.doctorId.toString(),
//       medicines: invoice.medicines.length > 0
//         ? invoice.medicines.map(m => ({
//           medicineId: m.medicineId?.toString() || '',
//           quantity: m.quantity?.toString() || '',
//           strength: m.strength || '',
//           type: m.type || 'tablet',
//           price: m.price?.toString() || '',
//         }))
//         : [{ ...EMPTY_MEDICINE }],
//     });
//     setShowEditModal(true);
//   };

//   // ── Filter + Client-side Pagination ──────────────────────────────────────
//   const filtered = useMemo(() => {
//     const s = searchTerm.toLowerCase();
//     return invoices.filter(inv => {
//       const matchSearch =
//         (inv.invoiceId || '').toLowerCase().includes(s) ||
//         (inv.patientName || '').toLowerCase().includes(s) ||
//         (inv.doctorName || '').toLowerCase().includes(s);
//       const matchStatus = filterStatus === 'all' || inv.status === filterStatus;
//       return matchSearch && matchStatus;
//     });
//   }, [invoices, searchTerm, filterStatus]);

//   const totalPagesFiltered = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

//   // Reset to page 1 when filter/search changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, filterStatus]);

//   const paginated = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return filtered.slice(start, start + ITEMS_PER_PAGE);
//   }, [filtered, currentPage]);

//   const getPageNumbers = () => {
//     const pages = [];
//     if (totalPagesFiltered <= 7) {
//       for (let i = 1; i <= totalPagesFiltered; i++) pages.push(i);
//     } else if (currentPage <= 4) {
//       pages.push(1, 2, 3, 4, 5, '...', totalPagesFiltered);
//     } else if (currentPage >= totalPagesFiltered - 3) {
//       pages.push(1, '...', totalPagesFiltered - 4, totalPagesFiltered - 3, totalPagesFiltered - 2, totalPagesFiltered - 1, totalPagesFiltered);
//     } else {
//       pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPagesFiltered);
//     }
//     return pages;
//   };

//   // ── Stats ─────────────────────────────────────────────────────────────────
//   const stats = {
//     total: invoices.length,
//     paid: invoices.filter(i => i.status === 'paid').length,
//     pending: invoices.filter(i => i.status === 'pending').length,
//     totalMeds: invoices.reduce((s, i) => s + i.medicines.length, 0),
//   };

//   // ── Print Invoice ─────────────────────────────────────────────────────────
//   const handlePrint = (inv) => {
//     const medRows = inv.medicines.map(m =>
//       `<tr>
//         <td>${getMedicineName(m.medicineId)}</td>
//         <td style="text-align:center">${m.type}</td>
//         <td style="text-align:center">${m.strength}</td>
//         <td style="text-align:center">${m.quantity}</td>
//         <td style="text-align:right">₹${m.price}</td>
//         <td style="text-align:right">₹${((m.price || 0) * (m.quantity || 0)).toLocaleString()}</td>
//       </tr>`
//     ).join('');

//     const html = `<!DOCTYPE html><html><head><title>Invoice ${inv.invoiceId}</title>
// <style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',Arial,sans-serif;background:#f8fafc;color:#1e293b}.page{max-width:740px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.10)}.header{background:linear-gradient(135deg,#059669,#0d9488);color:#fff;padding:36px 40px}.header h1{font-size:26px;font-weight:800}.header p{margin-top:4px;opacity:.85;font-size:13px}.invoice-id{margin-top:14px;font-size:20px;font-weight:700;background:rgba(255,255,255,.15);display:inline-block;padding:5px 16px;border-radius:8px}.body{padding:36px 40px}.meta{display:flex;justify-content:space-between;margin-bottom:28px;gap:20px}.meta-block h3{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#64748b;margin-bottom:5px}.meta-block p{font-size:15px;font-weight:600}.meta-block .sub{font-size:13px;font-weight:400;color:#64748b}.badge{display:inline-block;padding:3px 12px;border-radius:99px;font-size:12px;font-weight:700;text-transform:capitalize}.active{background:#dcfce7;color:#16a34a}.completed{background:#dbeafe;color:#1d4ed8}table{width:100%;border-collapse:collapse;margin-bottom:20px}thead tr{background:#f1f5f9}thead th{padding:10px 12px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#64748b}tbody td{padding:10px 12px;border-bottom:1px solid #f1f5f9;font-size:14px}.total-row td{padding:14px 12px;font-size:16px;font-weight:800;color:#059669;border-top:2px solid #e2e8f0}.footer{text-align:center;color:#94a3b8;font-size:12px;padding:18px 40px;border-top:1px solid #f1f5f9}@media print{body{background:#fff}.page{box-shadow:none;margin:0;border-radius:0}}</style></head><body>
// <div class="page">
//   <div class="header">
//     <h1>MediCare Hospital</h1>
//     <p>123 Health Avenue, New Delhi – 110001 &nbsp;|&nbsp; billing@medicare.in &nbsp;|&nbsp; +91 11 2345 6789</p>
//     <div class="invoice-id">${inv.invoiceId}</div>
//   </div>
//   <div class="body">
//     <div class="meta">
//       <div class="meta-block">
//         <h3>Patient</h3>
//         <p>${inv.patientName}</p>
//         <p class="sub">Patient ID: ${inv.patientId}</p>
//       </div>
//       <div class="meta-block">
//         <h3>Prescribed By</h3>
//         <p>${inv.doctorName}</p>
//         <p class="sub">Doctor ID: ${inv.doctorId}</p>
//       </div>
//       <div class="meta-block" style="text-align:right">
//         <h3>Date</h3>
//         <p>${inv.date}</p>
//         <div style="margin-top:8px"><span class="badge ${inv.status}">${inv.status}</span></div>
//       </div>
//     </div>
//     <table>
//       <thead><tr>
//         <th>Medicine</th><th style="text-align:center">Type</th>
//         <th style="text-align:center">Strength</th><th style="text-align:center">Qty</th>
//         <th style="text-align:right">Unit Price</th><th style="text-align:right">Total</th>
//       </tr></thead>
//       <tbody>
//         ${medRows}
//         <tr class="total-row">
//           <td colspan="5">Total Amount</td>
//           <td style="text-align:right">₹${inv.totalAmount.toLocaleString()}</td>
//         </tr>
//       </tbody>
//     </table>
//     <p style="font-size:12px;color:#64748b;margin-top:8px">This invoice is valid for 30 days from the date of issue.</p>
//   </div>
//   <div class="footer">Thank you for choosing MediCare Hospital &nbsp;•&nbsp; Get well soon!</div>
// </div>
// </body></html>`;

//     const win = window.open('', '_blank', 'height=720,width=860');
//     win.document.write(html);
//     win.document.close();
//     win.focus();
//     setTimeout(() => win.print(), 300);
//   };

//   // ── Export Functions ──────────────────────────────────────────────────────
//   const exportToExcel = () => {
//     const headers = ['Invoice ID', 'Patient', 'Doctor', 'Date', 'Medicines', 'Total', 'Status'];
//     const rows = filtered.map(inv => [
//       inv.invoiceId,
//       `"${inv.patientName}"`,
//       `"${inv.doctorName}"`,
//       inv.date,
//       `"${inv.medicines.map(m => getMedicineName(m.medicineId)).join(', ')}"`,
//       inv.totalAmount,
//       inv.status,
//     ].join(','));
//     const csv = [headers.join(','), ...rows].join('\n');
//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = `invoices_${new Date().toISOString().split('T')[0]}.csv`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     setShowExportMenu(false);
//   };

//   const exportToPDF = () => {
//     const rows = filtered.map(inv =>
//       `<tr><td>${inv.invoiceId}</td><td>${inv.patientName}</td><td>${inv.doctorName}</td><td>${inv.date}</td><td>${inv.medicines.length} med(s)</td><td>₹${inv.totalAmount.toLocaleString()}</td><td>${inv.status}</td></tr>`
//     ).join('');
//     const html = `<!DOCTYPE html><html><head><title>Invoices Report</title>
// <style>body{font-family:Arial,sans-serif;margin:30px}h1{color:#059669;text-align:center}table{width:100%;border-collapse:collapse;margin-top:20px}th{background:#059669;color:#fff;padding:10px;text-align:left}td{padding:9px 10px;border-bottom:1px solid #ddd}tr:hover{background:#f5f5f5}</style>
// </head><body>
// <h1>MediCare – Invoices Report</h1>
// <p style="text-align:center;color:#64748b">Generated: ${new Date().toLocaleDateString('en-IN')} | Total: ${filtered.length} records</p>
// <table><thead><tr><th>Invoice ID</th><th>Patient</th><th>Doctor</th><th>Date</th><th>Medicines</th><th>Amount</th><th>Status</th></tr></thead>
// <tbody>${rows}</tbody></table></body></html>`;
//     const win = window.open('', '', 'height=600,width=1000');
//     win.document.write(html);
//     win.document.close();
//     win.focus();
//     setTimeout(() => { win.print(); setShowExportMenu(false); }, 250);
//   };

//   // ── Share / Copy ──────────────────────────────────────────────────────────
//   const handleCopy = (inv) => {
//     const text = `Invoice ${inv.invoiceId}\nPatient: ${inv.patientName}\nDoctor: ${inv.doctorName}\nDate: ${inv.date}\nTotal: ₹${inv.totalAmount.toLocaleString()}`;
//     navigator.clipboard.writeText(text).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   // ── Status Badge ──────────────────────────────────────────────────────────
//   const statusBadge = (status) => {
//     switch ((status || '').toLowerCase()) {
//       case 'paid':
//       case 'active': return 'bg-green-100 text-green-700';
//       case 'pending': return 'bg-amber-100 text-amber-700';
//       case 'cancelled': return 'bg-red-100 text-red-700';
//       case 'completed': return 'bg-blue-100 text-blue-700';
//       default: return 'bg-slate-100 text-slate-700';
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
//             <h1 className="text-4xl font-bold text-slate-800 mb-2">Billing & Invoices</h1>
//             <p className="text-slate-600">Manage patient invoices and prescriptions</p>
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
//             {/* Add */}
//             <button
//               onClick={() => setShowAddModal(true)}
//               className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 font-semibold shadow-lg"
//             >
//               <Plus className="w-5 h-5" /> New Invoice
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//           {[
//             { label: 'Total Invoices', value: stats.total, color: 'text-slate-800' },
//             { label: 'Paid', value: stats.paid, color: 'text-green-600' },
//             { label: 'Pending', value: stats.pending, color: 'text-amber-600' },
//             { label: 'Total Medicines', value: stats.totalMeds, color: 'text-emerald-600' },
//           ].map(s => (
//             <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
//               <p className="text-sm text-slate-600 mb-1">{s.label}</p>
//               <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Search / Filter */}
//       <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
//         <div className="flex gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search by invoice ID, patient, or doctor..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700"
//             />
//           </div>
//           <select
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//             className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 text-slate-700 font-medium cursor-pointer"
//           >
//             <option value="all">All Status</option>
//             <option value="paid">Paid</option>
//             <option value="pending">Pending</option>
//             <option value="completed">Completed</option>
//             <option value="cancelled">Cancelled</option>
//           </select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-6">
//         {loading ? (
//           <div className="py-16 text-center">
//             <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-2" />
//             <p className="text-slate-400 text-sm">Loading invoices...</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
//                 <tr>
//                   {['Invoice ID', 'Patient', 'Doctor', 'Date', 'Medicines', 'Total', 'Status', 'Actions'].map(h => (
//                     <th key={h} className={`px-6 py-4 text-left font-semibold text-slate-700 ${h === 'Actions' ? 'text-center' : ''}`}>{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {paginated.length > 0 ? paginated.map(inv => (
//                   <tr key={inv.id} className="hover:bg-emerald-50/40 transition-colors">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <FileText className="w-4 h-4 text-emerald-600 flex-shrink-0" />
//                         <span className="font-semibold text-slate-800">{inv.invoiceId}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
//                           {inv.patientName.charAt(0)}
//                         </div>
//                         <div>
//                           <p className="font-semibold text-slate-800 text-sm">{inv.patientName}</p>
//                           <p className="text-xs text-slate-500">ID: {inv.patientId}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <Stethoscope className="w-4 h-4 text-teal-500 flex-shrink-0" />
//                         <div>
//                           <p className="font-medium text-slate-700 text-sm">{inv.doctorName}</p>
//                           <p className="text-xs text-slate-500">ID: {inv.doctorId}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-slate-600 text-sm">{inv.date}</td>
//                     <td className="px-6 py-4">
//                       <div className="flex flex-wrap gap-1">
//                         {inv.medicines.slice(0, 2).map((m, i) => (
//                           <span key={i} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs font-medium border border-emerald-100">
//                             {getMedicineName(m.medicineId)}
//                           </span>
//                         ))}
//                         {inv.medicines.length > 2 && (
//                           <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium">+{inv.medicines.length - 2}</span>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="font-bold text-slate-800">₹{inv.totalAmount.toLocaleString()}</span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize flex items-center gap-1.5 w-fit ${statusBadge(inv.status)}`}>
//                         {inv.status === 'active' || inv.status === 'paid'
//                           ? <CheckCircle className="w-3.5 h-3.5" />
//                           : <Clock className="w-3.5 h-3.5" />}
//                         {inv.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center justify-center gap-1">
//                         <button
//                           onClick={() => { setSelectedInvoice(inv); setShowViewModal(true); }}
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                           title="View"
//                         >
//                           <Eye className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => handlePrint(inv)}
//                           className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
//                           title="Print"
//                         >
//                           <Printer className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => { setSelectedInvoice(inv); setShowShareModal(true); }}
//                           className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
//                           title="Share"
//                         >
//                           <Send className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => handleEditClick(inv)}
//                           className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
//                           title="Edit"
//                         >
//                           <FileText className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => { setSelectedInvoice(inv); setShowDeleteModal(true); }}
//                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                           title="Delete"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 )) : (
//                   <tr>
//                     <td colSpan={8} className="py-16 text-center">
//                       <Pill className="w-12 h-12 text-slate-300 mx-auto mb-3" />
//                       <p className="text-slate-500 font-medium">No invoices found</p>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Pagination */}
//       {!loading && (
//         <div className="bg-white rounded-2xl shadow-lg border border-slate-100 px-6 py-4">
//           <div className="flex items-center justify-between">
//             <p className="text-sm text-slate-600">
//               Showing{' '}
//               <span className="font-semibold">{filtered.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}</span>
//               {' '}–{' '}
//               <span className="font-semibold">{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span>
//               {' '}of{' '}
//               <span className="font-semibold">{filtered.length}</span>
//             </p>
//             <div className="flex items-center gap-1.5">
//               <button
//                 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                 disabled={currentPage === 1}
//                 className={`p-2 rounded-lg transition-all ${currentPage === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-emerald-50 border border-slate-200'}`}
//               >
//                 <ChevronLeft className="w-4 h-4" />
//               </button>
//               {getPageNumbers().map((p, i) =>
//                 p === '...' ? (
//                   <span key={`e${i}`} className="px-2 text-slate-400 text-sm">…</span>
//                 ) : (
//                   <button
//                     key={p}
//                     onClick={() => setCurrentPage(p)}
//                     className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${currentPage === p ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' : 'text-slate-600 hover:bg-emerald-50 border border-slate-200'}`}
//                   >
//                     {p}
//                   </button>
//                 )
//               )}
//               <button
//                 onClick={() => setCurrentPage(p => Math.min(totalPagesFiltered, p + 1))}
//                 disabled={currentPage === totalPagesFiltered}
//                 className={`p-2 rounded-lg transition-all ${currentPage === totalPagesFiltered ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-emerald-50 border border-slate-200'}`}
//               >
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── Add Modal ── */}
//       <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); resetForm(); }} title="New Invoice" size="lg">
//         <form onSubmit={handleCreate} className="space-y-5">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Patient *</label>
//               <select
//                 name="patientId"
//                 value={form.patientId}
//                 onChange={handleFormChange}
//                 required
//                 className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
//               >
//                 <option value="">Select Patient</option>
//                 {patients.map(p => (
//                   <option key={p.id} value={p.id}>{p.name}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Doctor *</label>
//               <select
//                 name="doctorId"
//                 value={form.doctorId}
//                 onChange={handleFormChange}
//                 required
//                 className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
//               >
//                 <option value="">Select Doctor</option>
//                 {doctors.map(d => (
//                   <option key={d.id} value={d.id}>{d.name}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Medicines */}
//           <div>
//             <div className="flex items-center justify-between mb-2">
//               <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Medicines *</label>
//               <button type="button" onClick={addMedRow} className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
//                 <Plus className="w-3.5 h-3.5" /> Add Medicine
//               </button>
//             </div>
//             <div className="space-y-2">
//               <div className="grid grid-cols-12 gap-2 px-1">
//                 {['Medicine', 'Type', 'Strength', 'Qty', 'Price (₹)', ''].map((h, i) => (
//                   <div key={h} className={`text-xs font-semibold text-slate-400 uppercase tracking-wider ${i === 0 ? 'col-span-2' : i === 5 ? 'col-span-1' : 'col-span-2'}`}>{h}</div>
//                 ))}
//               </div>
//               {form.medicines.map((med, idx) => (
//                 <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-slate-50 rounded-xl p-2">
//                   <select
//                     value={med.medicineId}
//                     onChange={e => handleMedChange(idx, 'medicineId', e.target.value)}
//                     required
//                     className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full"
//                   >
//                     <option value="">Select</option>
//                     {medicines.map(m => (
//                       <option key={m.medicineId} value={m.medicineId}>{m.name}</option>
//                     ))}
//                   </select>
//                   <select value={med.type} onChange={e => handleMedChange(idx, 'type', e.target.value)} className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full">
//                     {MEDICINE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
//                   </select>
//                   <input type="text" placeholder="e.g. 500mg" value={med.strength} onChange={e => handleMedChange(idx, 'strength', e.target.value)} className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full" />
//                   <input type="number" placeholder="Qty" value={med.quantity} min="1" onChange={e => handleMedChange(idx, 'quantity', e.target.value)} className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full" />
//                   <input type="number" placeholder="Price" value={med.price} min="0" onChange={e => handleMedChange(idx, 'price', e.target.value)} className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full" />
//                   <button type="button" onClick={() => removeMedRow(idx)} className="col-span-1 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center">
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-end mt-3">
//               <div className="bg-emerald-50 rounded-xl px-5 py-2.5 border border-emerald-200">
//                 <span className="text-sm text-emerald-700 font-medium">Total: </span>
//                 <span className="text-lg font-bold text-emerald-700">₹{formTotal.toLocaleString()}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-3 pt-2">
//             <button type="button" onClick={() => { setShowAddModal(false); resetForm(); }} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
//             <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg disabled:opacity-60">
//               {isSubmitting ? 'Creating...' : 'Create Invoice'}
//             </button>
//           </div>
//         </form>
//       </Modal>

//       {/* ── Edit Modal ── */}
//       <Modal isOpen={showEditModal} onClose={() => { setShowEditModal(false); resetForm(); }} title="Edit Invoice" size="lg">
//         <form onSubmit={handleUpdate} className="space-y-5">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Patient *</label>
//               <select
//                 name="patientId"
//                 value={form.patientId}
//                 onChange={handleFormChange}
//                 required
//                 className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
//               >
//                 <option value="">Select Patient</option>
//                 {patients.map(p => (
//                   <option key={p.id} value={p.id}>{p.name}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Doctor *</label>
//               <select
//                 name="doctorId"
//                 value={form.doctorId}
//                 onChange={handleFormChange}
//                 required
//                 className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
//               >
//                 <option value="">Select Doctor</option>
//                 {doctors.map(d => (
//                   <option key={d.id} value={d.id}>{d.name}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Medicines */}
//           <div>
//             <div className="flex items-center justify-between mb-2">
//               <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Medicines *</label>
//               <button type="button" onClick={addMedRow} className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
//                 <Plus className="w-3.5 h-3.5" /> Add Medicine
//               </button>
//             </div>
//             <div className="space-y-2">
//               <div className="grid grid-cols-12 gap-2 px-1">
//                 {['Medicine', 'Type', 'Strength', 'Qty', 'Price (₹)', ''].map((h, i) => (
//                   <div key={h} className={`text-xs font-semibold text-slate-400 uppercase tracking-wider ${i === 0 ? 'col-span-2' : i === 5 ? 'col-span-1' : 'col-span-2'}`}>{h}</div>
//                 ))}
//               </div>
//               {form.medicines.map((med, idx) => (
//                 <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-slate-50 rounded-xl p-2">
//                   <select
//                     value={med.medicineId}
//                     onChange={e => handleMedChange(idx, 'medicineId', e.target.value)}
//                     required
//                     className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full"
//                   >
//                     <option value="">Select</option>
//                     {medicines.map(m => (
//                       <option key={m.medicineId} value={m.medicineId}>{m.name}</option>
//                     ))}
//                   </select>
//                   <select value={med.type} onChange={e => handleMedChange(idx, 'type', e.target.value)} className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full">
//                     {MEDICINE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
//                   </select>
//                   <input type="text" placeholder="e.g. 500mg" value={med.strength} onChange={e => handleMedChange(idx, 'strength', e.target.value)} className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full" />
//                   <input type="number" placeholder="Qty" value={med.quantity} min="1" onChange={e => handleMedChange(idx, 'quantity', e.target.value)} className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full" />
//                   <input type="number" placeholder="Price" value={med.price} min="0" onChange={e => handleMedChange(idx, 'price', e.target.value)} className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full" />
//                   <button type="button" onClick={() => removeMedRow(idx)} className="col-span-1 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center">
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-end mt-3">
//               <div className="bg-emerald-50 rounded-xl px-5 py-2.5 border border-emerald-200">
//                 <span className="text-sm text-emerald-700 font-medium">Total: </span>
//                 <span className="text-lg font-bold text-emerald-700">₹{formTotal.toLocaleString()}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-3 pt-2">
//             <button type="button" onClick={() => { setShowEditModal(false); resetForm(); }} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
//             <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg disabled:opacity-60">
//               {isSubmitting ? 'Updating...' : 'Update Invoice'}
//             </button>
//           </div>
//         </form>
//       </Modal>

//       {/* ── Delete Modal ── */}
//       <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Invoice" size="sm">
//         <div className="text-center space-y-4">
//           <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto">
//             <Trash2 className="w-6 h-6 text-red-500" />
//           </div>
//           <div>
//             <p className="text-slate-700 font-semibold">Delete Invoice #{selectedInvoice?.invoiceId}?</p>
//             <p className="text-slate-500 text-sm mt-1">This action cannot be undone.</p>
//           </div>
//           <div className="flex gap-3">
//             <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
//             <button onClick={handleDelete} disabled={isSubmitting} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
//               {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
//               Delete
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* ── View Modal ── */}
//       <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Invoice Details" size="md">
//         {selectedInvoice && (
//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-3">
//               {[
//                 { label: 'Invoice ID', value: selectedInvoice.invoiceId },
//                 { label: 'Date', value: selectedInvoice.date },
//                 { label: 'Patient', value: `${selectedInvoice.patientName} (ID: ${selectedInvoice.patientId})` },
//                 { label: 'Doctor', value: `${selectedInvoice.doctorName} (ID: ${selectedInvoice.doctorId})` },
//               ].map(row => (
//                 <div key={row.label} className="bg-slate-50 rounded-xl px-4 py-3">
//                   <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{row.label}</p>
//                   <p className="text-sm font-semibold text-slate-800">{row.value}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
//               <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</p>
//               <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusBadge(selectedInvoice.status)}`}>
//                 {selectedInvoice.status}
//               </span>
//             </div>

//             <div>
//               <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Medicines</p>
//               <div className="rounded-xl overflow-hidden border border-slate-200">
//                 <table className="w-full text-sm">
//                   <thead className="bg-gradient-to-r from-emerald-50 to-teal-50">
//                     <tr>
//                       {['Medicine', 'Type', 'Strength', 'Qty', 'Price', 'Total'].map(h => (
//                         <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-slate-600">{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-100">
//                     {selectedInvoice.medicines.map((m, i) => (
//                       <tr key={i} className="hover:bg-slate-50">
//                         <td className="px-3 py-2.5 font-medium text-slate-800">{getMedicineName(m.medicineId)}</td>
//                         <td className="px-3 py-2.5 text-slate-600 capitalize">{m.type}</td>
//                         <td className="px-3 py-2.5 text-slate-600">{m.strength}</td>
//                         <td className="px-3 py-2.5 text-slate-600">{m.quantity}</td>
//                         <td className="px-3 py-2.5 text-slate-600">₹{m.price}</td>
//                         <td className="px-3 py-2.5 font-semibold text-slate-800">₹{((m.price || 0) * (m.quantity || 0)).toLocaleString()}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                   <tfoot>
//                     <tr className="bg-emerald-50">
//                       <td colSpan={5} className="px-3 py-2.5 font-bold text-slate-700">Total Amount</td>
//                       <td className="px-3 py-2.5 font-bold text-emerald-700">₹{selectedInvoice.totalAmount.toLocaleString()}</td>
//                     </tr>
//                   </tfoot>
//                 </table>
//               </div>
//             </div>

//             <div className="flex gap-3 pt-1">
//               <button onClick={() => handlePrint(selectedInvoice)} className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
//                 <Printer className="w-4 h-4" /> Print
//               </button>
//               <button onClick={() => { setShowViewModal(false); setShowShareModal(true); }} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg flex items-center justify-center gap-2">
//                 <Send className="w-4 h-4" /> Share
//               </button>
//             </div>
//           </div>
//         )}
//       </Modal>

//       {/* ── Share Modal ── */}
//       <Modal isOpen={showShareModal} onClose={() => setShowShareModal(false)} title="Share Invoice" size="sm">
//         {selectedInvoice && (
//           <div className="space-y-4">
//             <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
//                   {selectedInvoice.patientName.charAt(0)}
//                 </div>
//                 <div>
//                   <p className="font-bold text-slate-800">{selectedInvoice.invoiceId}</p>
//                   <p className="text-xs text-slate-500">{selectedInvoice.patientName} · {selectedInvoice.date}</p>
//                 </div>
//               </div>
//               <div className="flex items-center justify-between text-sm">
//                 <span className="text-slate-600">{selectedInvoice.medicines.length} medicine(s)</span>
//                 <span className="font-bold text-emerald-700">₹{selectedInvoice.totalAmount.toLocaleString()}</span>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Share via</p>
//               <button onClick={() => handleCopy(selectedInvoice)} className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 hover:bg-emerald-50 rounded-xl transition-colors border border-slate-200">
//                 <div className="w-9 h-9 bg-slate-200 rounded-lg flex items-center justify-center">
//                   {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
//                 </div>
//                 <div className="text-left">
//                   <p className="font-semibold text-slate-700 text-sm">{copied ? 'Copied!' : 'Copy Details'}</p>
//                   <p className="text-xs text-slate-400">Copy invoice summary</p>
//                 </div>
//               </button>
//               <button onClick={() => handlePrint(selectedInvoice)} className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 hover:bg-emerald-50 rounded-xl transition-colors border border-slate-200">
//                 <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
//                   <Printer className="w-4 h-4 text-blue-600" />
//                 </div>
//                 <div className="text-left">
//                   <p className="font-semibold text-slate-700 text-sm">Print / Download PDF</p>
//                   <p className="text-xs text-slate-400">Open print dialog</p>
//                 </div>
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

import { useState, useEffect, useCallback } from 'react';
import { Calendar, Plus, Search, Filter, X, Edit2, Trash2, Eye, ChevronLeft, ChevronRight, Loader2, AlertCircle, ChevronDown, Download, FileText, Sheet } from 'lucide-react';
import { getAppointment, createAppointmentApi, udateAppointmentApi, deleteAppointmentApi, getPatients, getDoctorApi } from '../../lib/commonApis';

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
  scheduled: 'bg-teal-100 text-teal-700 border border-teal-200',
  completed: 'bg-blue-100 text-blue-700 border border-blue-200',
  cancelled: 'bg-red-100 text-red-700 border border-red-200',
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
  patientId: apt.patientId ?? '',
  doctorId: apt.doctorId ?? '',
  appointmentDate: toLocalInputValue(apt.appointmentDate),
  status: apt.status || 'scheduled',
  notes: apt.notes || '',
  type: apt.type || 'consultation',
});

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
        <div className="p-6">{children}</div>
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
        <SearchableDropdown
          label="Patient" value={form.patientId}
          onChange={(id) => set('patientId', id)}
          options={patients} placeholder="Select Patient" required
        />
        <SearchableDropdown
          label="Doctor" value={form.doctorId}
          onChange={(id) => set('doctorId', id)}
          options={doctors} placeholder="Select Doctor" required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" /> Appointment Date
            </span>
          </label>
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
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Notes</label>
        <textarea
          className={fieldCls + ' resize-none h-20'}
          placeholder="Additional notes…"
          value={form.notes}
          onChange={e => set('notes', e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? 'Saving…' : isEdit ? 'Update Appointment' : 'Create Appointment'}
      </button>
    </form>
  );
}

// ─── View Modal ───────────────────────────────────────────────────────────────
function ViewModal({ apt, onClose, patients, doctors }) {
  const patient = patients.find(p => p.id === apt.patientId);
  const doctor = doctors.find(d => d.id === apt.doctorId);

  const Row = ({ label, value }) => (
    <div className="flex justify-between py-2.5 border-b border-slate-50 last:border-0">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
      <span className="text-sm text-slate-700 font-medium">{value}</span>
    </div>
  );

  return (
    <Modal title="Appointment Details" onClose={onClose}>
      <div className="space-y-0.5">
        <Row label="Appointment ID" value={`#${apt.id}`} />
        <Row label="Patient" value={patient?.name || `Patient #${apt.patientId}`} />
        <Row label="Doctor" value={doctor?.name || `Dr. #${apt.doctorId}`} />
        <Row label="Date & Time" value={apt.appointmentDate ? new Date(apt.appointmentDate).toLocaleString() : '—'} />
        <Row label="Type" value={cap(apt.type)} />
        <Row label="Status" value={cap(apt.status)} />
        <Row label="Notes" value={apt.notes || '—'} />
      </div>
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
  const [toast, setToast] = useState('');

  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const closeModal = () => { setModal(null); setSelected(null); };

  // ── Data loaders ─────────────────────────────────────────────────────────
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
      setPatients(arr.map(i => ({ id: i.id, name: i.name, phone: i.phone, email: i.user?.email || '-' })));
    } catch { setPatients([]); }
  }, []);

  const loadDoctors = useCallback(async () => {
    try {
      const res = await getDoctorApi(100, 1);
      const arr = res?.data?.data || res?.data || [];
      setDoctors((arr.doctors || arr).map(i => ({ id: i.id, name: i.name })));
    } catch { setDoctors([]); }
  }, []);

  useEffect(() => { load(); loadPatients(); loadDoctors(); }, [load, loadPatients]);

  // ── Filtered list ─────────────────────────────────────────────────────────
  const filtered = appointments.filter(a => {
    const patient = patients.find(p => p.id === a.patientId);
    const doctor = doctors.find(d => d.id === a.doctorId);
    const q = search.toLowerCase();
    const matchSearch = !q ||
      String(a.patientId).includes(q) ||
      String(a.doctorId).includes(q) ||
      a.type.toLowerCase().includes(q) ||
      (a.notes || '').toLowerCase().includes(q) ||
      (patient?.name || '').toLowerCase().includes(q) ||
      (doctor?.name || '').toLowerCase().includes(q);
    return matchSearch && (filterStatus === 'all' || a.status === filterStatus);
  });

  // ── Modal openers ─────────────────────────────────────────────────────────
  const openCreate = () => { setSelected(null); setModal('form'); };
  const openEdit = (a) => { setSelected(a); setModal('form'); };
  const openView = (a) => { setSelected(a); setModal('view'); };
  const openDelete = (a) => { setSelected(a); setModal('delete'); };

  // ── CRUD handlers ─────────────────────────────────────────────────────────
  const handleSubmit = async (e, form) => {
    e.preventDefault();
    setFormLoading(true);
    const payload = {
      patientId: Number(form.patientId),
      doctorId: Number(form.doctorId),
      appointmentDate: form.appointmentDate,
      status: form.status,
      notes: form.notes,
      type: form.type,
    };
    try {
      if (selected) {
        await udateAppointmentApi(selected.id, payload);
        showToast('✅ Appointment updated!');
      } else {
        await createAppointmentApi(payload);
        showToast('✅ Appointment created!');
      }
      await load();
      closeModal();
    } catch {
      showToast(`❌ Failed to ${selected ? 'update' : 'create'} appointment.`);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    setFormLoading(true);
    try {
      await deleteAppointmentApi(selected.id);
      await load();
      showToast('🗑️ Appointment deleted.');
      closeModal();
    } catch {
      showToast('❌ Failed to delete appointment.');
    } finally {
      setFormLoading(false);
    }
  };

  // ── Export functions ──────────────────────────────────────────────────────
  const exportToExcel = () => {
    const headers = ['Sr. No.', 'Appointment ID', 'Patient', 'Doctor', 'Date & Time', 'Type', 'Status', 'Notes'];
    const rows = filtered.map((apt, idx) => {
      const patient = patients.find(p => p.id === apt.patientId);
      const doctor = doctors.find(d => d.id === apt.doctorId);
      return [
        idx + 1,
        `#${apt.id}`,
        `"${patient?.name || `Patient #${apt.patientId}`}"`,
        `"${doctor?.name || `Dr. #${apt.doctorId}`}"`,
        apt.appointmentDate ? new Date(apt.appointmentDate).toLocaleString() : '—',
        cap(apt.type),
        cap(apt.status),
        `"${apt.notes || '—'}"`,
      ].join(',');
    });
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `appointments_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportMenu(false);
  };

  const exportToPDF = () => {
    const rows = filtered.map((apt, idx) => {
      const patient = patients.find(p => p.id === apt.patientId);
      const doctor = doctors.find(d => d.id === apt.doctorId);
      return `<tr>
        <td>${idx + 1}</td>
        <td>#${apt.id}</td>
        <td>${patient?.name || `Patient #${apt.patientId}`}</td>
        <td>${doctor?.name || `Dr. #${apt.doctorId}`}</td>
        <td>${apt.appointmentDate ? new Date(apt.appointmentDate).toLocaleString() : '—'}</td>
        <td>${cap(apt.type)}</td>
        <td>${cap(apt.status)}</td>
        <td>${apt.notes || '—'}</td>
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
</style>
</head><body>
<h1>Appointments Report</h1>
<p style="text-align:center;color:#64748b">Generated: ${new Date().toLocaleDateString('en-IN')} | Total: ${filtered.length} records</p>
<table>
  <thead><tr><th>Sr. No.</th><th>ID</th><th>Patient</th><th>Doctor</th><th>Date & Time</th><th>Type</th><th>Status</th><th>Notes</th></tr></thead>
  <tbody>${rows}</tbody>
</table>
</body></html>`;

    const win = window.open('', '', 'height=600,width=1100');
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); setShowExportMenu(false); }, 250);
  };

  // ── Pagination helpers ────────────────────────────────────────────────────
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

  // ── Stats ─────────────────────────────────────────────────────────────────
  const count = (s) => appointments.filter(a => a.status === s).length;
  const statuses = ['all', 'scheduled', 'completed', 'cancelled'];
  const formInitial = selected ? aptToForm(selected) : { ...EMPTY_FORM };

  // Sr. No. offset for current page
  const srOffset = (page - 1) * 10;

  return (
    <div className="p-6 md:p-8 min-h-screen bg-slate-50">

      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-[100] bg-slate-800 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium">
          {toast}
        </div>
      )}

      {/* ── Modals ── */}
      {modal === 'form' && (
        <Modal title={selected ? 'Edit Appointment' : 'New Appointment'} onClose={closeModal}>
          <AppointmentForm
            initial={formInitial}
            onSubmit={handleSubmit}
            loading={formLoading}
            patients={patients}
            doctors={doctors}
            isEdit={!!selected}
          />
        </Modal>
      )}

      {modal === 'view' && selected && (
        <ViewModal apt={selected} onClose={closeModal} patients={patients} doctors={doctors} />
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
              <button onClick={closeModal} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
                Cancel
              </button>
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
            {/* Export */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(v => !v)}
                className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 text-slate-700 font-medium shadow-sm"
              >
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
            {/* New Appointment */}
            <button
              onClick={openCreate}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 font-semibold shadow-lg shadow-emerald-100"
            >
              <Plus className="w-4 h-4" /> New Appointment
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Total', value: appointments.length, color: 'text-slate-800' },
            { label: 'Confirmed', value: count('confirmed'), color: 'text-emerald-600' },
            { label: 'Completed', value: count('completed'), color: 'text-blue-600' },
            { label: 'Cancelled', value: count('cancelled'), color: 'text-red-500' },
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
            <input
              type="text"
              placeholder="Search by patient, doctor, type, notes…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
            />
          </div>
          <button
            onClick={() => setShowFilter(f => !f)}
            className={`px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all border-2 ${showFilter ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button onClick={load} className="px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all">
            Refresh
          </button>
        </div>
        {showFilter && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2 flex-wrap">
            {statuses.map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all border ${filterStatus === s ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 text-slate-600 hover:border-emerald-300'}`}
              >
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
                {['Sr. No.', 'ID', 'Patient', 'Doctor', 'Date & Time', 'Type', 'Status', 'Notes', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={9} className="py-16 text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-2" />
                  <p className="text-slate-400 text-sm">Loading appointments…</p>
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={9} className="py-16 text-center">
                  <Calendar className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                  <p className="text-slate-400 font-medium">No appointments found</p>
                  <p className="text-slate-300 text-sm mt-1">Try changing your search or filter</p>
                </td></tr>
              ) : filtered.map((apt, idx) => {
                const patient = patients.find(p => p.id === apt.patientId);
                const doctor = doctors.find(d => d.id === apt.doctorId);
                return (
                  <tr key={apt.id} className="hover:bg-emerald-50/40 transition-colors">
                    {/* Sr. No. */}
                    <td className="px-5 py-4 text-sm font-semibold text-slate-500">
                      {srOffset + idx + 1}
                    </td>
                    <td className="px-5 py-4 text-sm font-mono text-slate-500">#{apt.id}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {patient?.name ? patient.name.charAt(0) : 'P'}
                        </div>
                        <span className="text-sm font-semibold text-slate-700">{patient?.name || `Patient #${apt.patientId}`}</span>
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
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => openView(apt)} title="View" className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => openEdit(apt)} title="Edit" className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => openDelete(apt)} title="Delete" className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
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

        {/* ── Pagination (patient-style) ── */}
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
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${page === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((p, i) =>
                    p === '...' ? (
                      <span key={`e${i}`} className="px-3 py-2 text-slate-400">...</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${page === p ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${page === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}
                >
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
