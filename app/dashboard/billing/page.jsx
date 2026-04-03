// 'use client';

// import { useState, useEffect, useMemo, useCallback } from 'react';
// import {
//   Plus, Search, Download, Eye, Send, X, ChevronDown,
//   FileText, Sheet, Pill, User, Stethoscope, Trash2,
//   Copy, Check, Printer, CheckCircle, Clock, ChevronLeft, ChevronRight, Loader2, AlertCircle
// } from 'lucide-react';
// import { createInvoiceApi, getInvoiceApi, updateInvoiceApi, deleteInvoiceApi,getPatients,getDoctorApi,getMedicines } from '../../lib/commonApis';

// // ── Medicine Options ──────────────────────────────────────────────────────────
// const MEDICINE_OPTIONS = [
//   { id: 1, name: 'Paracetamol' },
//   { id: 2, name: 'Amoxicillin' },
//   { id: 3, name: 'Ibuprofen' },
//   { id: 4, name: 'Cetirizine' },
//   { id: 5, name: 'Azithromycin' },
//   { id: 6, name: 'Omeprazole' },
//   { id: 7, name: 'Metformin' },
//   { id: 8, name: 'Atorvastatin' },
// ];

// const MEDICINE_TYPES = ['tablet', 'capsule', 'syrup', 'injection', 'drops', 'cream'];
// const EMPTY_MEDICINE = { medicineId: '', quantity: '', strength: '', type: 'tablet', price: '' };

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
//  const [patients, setPatients] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [medicines, setMedicines] = useState([]);

//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const ITEMS_PER_PAGE = 20;

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

//   // ── Load Invoices ─────────────────────────────────────────────────────────
//   const loadInvoices = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await getInvoiceApi(100, currentPage);
//       console.log('Invoice API Response:', res);
      
//       // ✅ FIX: Handle nested response structure
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
//       setTotalPages(res?.data?.totalPages || 1);
//     } catch (err) {
//       console.error('Failed to load invoices:', err);
//       showToast('❌ Failed to load invoices');
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage]);


//   // Load patients
//     const loadPatients = useCallback(async () => {
//       try {
//         const res = await getPatients(100, 1);
//         const dataArray = res?.data?.data || res?.data || [];
  
//         const apiPatients = dataArray.map((item) => ({
//           id: item.id,
//           name: item.name,
//           phone: item.phone,
//           email: item.user?.email || '-',
//         }));
  
//         setPatients(apiPatients);
//       } catch (err) {
//         console.error('Failed to load patients:', err);
//         setPatients([]);
//       }
//     }, []);
  
//   // load doctor
//       const loadDoctors = useCallback(async () => {
//       try {
//         const res = await getDoctorApi(100, 1);
//         const dataArray = res?.data?.data || res?.data || [];
//   console.log(dataArray.doctors,'doctors');
  
  
//         const apiDoctors = dataArray.doctors.map((item) => ({
         
          
//           id: item.id,
//           name: item.name,
//         }));
  
//         setDoctors(apiDoctors);
//       } catch (err) {
//         console.error('Failed to load patients:', err);
//         setDoctors([]);
//       }
//     }, []);

//      // Load patients
//     const loadMedicines = useCallback(async () => {
//       try {
//         const res = await getMedicines(100, 1);
//         console.log(res.data.medicines,'data medicine');
        
//         const dataArray = res?.data?.medicines || res?.data || [];
  
//         const apiMedicines = dataArray.map((item) => ({
//           medicineId: item.id,
//           name: item.name
//         }));
  
//         setMedicines(apiMedicines);
//       } catch (err) {
//         console.error('Failed to load patients:', err);
//         setMedicines([]);
//       }
//     }, []);

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
//       medicines: invoice.medicines.map(m => ({
//         medicineId: m.medicineId?.toString() || '',
//         quantity: m.quantity?.toString() || '',
//         strength: m.strength || '',
//         type: m.type || 'tablet',
//         price: m.price?.toString() || '',
//       })),
//     });
//     setShowEditModal(true);
//   };

//   // ── Filter + Paginate ─────────────────────────────────────────────────────
//   const filtered = useMemo(() => invoices.filter(inv => {
//     const s = searchTerm.toLowerCase();
//     const matchSearch = (inv.invoiceId || '').toLowerCase().includes(s) ||
//       (inv.patientName || '').toLowerCase().includes(s) ||
//       (inv.doctorName || '').toLowerCase().includes(s);
//     const matchStatus = filterStatus === 'all' || inv.status === filterStatus;
//     return matchSearch && matchStatus;
//   }), [invoices, searchTerm, filterStatus]);

//   const totalPagesFiltered = Math.ceil(filtered.length / ITEMS_PER_PAGE);
//   const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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
//         <td>${MEDICINE_OPTIONS.find(o => o.id === m.medicineId)?.name || `Medicine #${m.medicineId}`}</td>
//         <td style="text-align:center">${m.type}</td>
//         <td style="text-align:center">${m.strength}</td>
//         <td style="text-align:center">${m.quantity}</td>
//         <td style="text-align:right">₹${m.price}</td>
//         <td style="text-align:right">₹${(m.price * m.quantity).toLocaleString()}</td>
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
//       `"${inv.medicines.map(m => MEDICINE_OPTIONS.find(o => o.id === m.medicineId)?.name || `Med #${m.medicineId}`).join(', ')}"`,
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

//   // ── Share Functions ───────────────────────────────────────────────────────
//   const handleCopy = (inv) => {
//     const text = `Invoice ${inv.invoiceId}\nPatient: ${inv.patientName}\nDoctor: ${inv.doctorName}\nDate: ${inv.date}\nTotal: ₹${inv.totalAmount.toLocaleString()}`;
//     navigator.clipboard.writeText(text).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   // ── Status Badge ──────────────────────────────────────────────────────────
//   const statusBadge = (status) => {
//     const statusLower = (status || '').toLowerCase();
//     switch(statusLower) {
//       case 'paid':
//       case 'active':
//         return 'bg-green-100 text-green-700';
//       case 'pending':
//         return 'bg-amber-100 text-amber-700';
//       case 'cancelled':
//         return 'bg-red-100 text-red-700';
//       case 'completed':
//         return 'bg-blue-100 text-blue-700';
//       default:
//         return 'bg-slate-100 text-slate-700';
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
//               onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
//               className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700"
//             />
//           </div>
//           <select
//             value={filterStatus}
//             onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
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
//                             {MEDICINE_OPTIONS.find(o => o.id === m.medicineId)?.name || `Med #${m.medicineId}`}
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
//                         {inv.status === 'active' ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
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
//       {totalPagesFiltered > 1 && (
//         <div className="bg-white rounded-2xl shadow-lg border border-slate-100 px-6 py-4">
//           <div className="flex items-center justify-between">
//             <p className="text-sm text-slate-600">
//               Showing <span className="font-semibold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> –{' '}
//               <span className="font-semibold">{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of{' '}
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

//       {/* MODALS - Add, Edit, View, Delete, Share */}
//       {/* Add Modal */}
//       <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); resetForm(); }} title="New Invoice:::" size="lg">
//         <form onSubmit={handleCreate} className="space-y-5">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Patient ID *</label>
//               <select 
//   name="patientId" 
//   value={form.patientId} 
//   onChange={handleFormChange} 
//   required 
//   className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
// >
//   <option value="">Select Patient</option>
//   {patients.map(p => (
//     <option key={p.id} value={p.id}>{p.name}</option>
//   ))}
// </select>
//               {/* <input type="number" name="patientId" value={form.patientId} onChange={handleFormChange} required className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" placeholder="e.g. 3" /> */}
//             </div>
//             <div>
//               <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Doctor ID *</label>
//               <select 
//   name="doctorId" 
//   value={form.doctorId} 
//   onChange={handleFormChange} 
//   required 
//   className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
// >
//   <option value="">Select Doctor</option>
//   {doctors.map(d => (
//     <option key={d.id} value={d.id}>{d.name}</option>
//   ))}
// </select>
//               {/* <input type="number" name="doctorId" value={form.doctorId} onChange={handleFormChange} required className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" placeholder="e.g. 1" /> */}
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
//                 {['Medicine ID', 'Type', 'Strength', 'Qty', 'Price (₹)', ''].map((h, i) => (
//                   <div key={h} className={`text-xs font-semibold text-slate-400 uppercase tracking-wider ${i === 0 ? 'col-span-2' : i === 5 ? 'col-span-1' : 'col-span-2'}`}>{h}</div>
//                 ))}
//               </div>
//               {form.medicines.map((med, idx) => (
//                 <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-slate-50 rounded-xl p-2">
//                   {/* <input type="number" placeholder="Med ID" value={med.medicineId} onChange={e => handleMedChange(idx, 'medicineId', e.target.value)} className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full" /> */}
//                   {/* <select 
//   name="medicineId" 
//   value={med.medicineId} 
//   onChange={handleFormChange} 
//   required 
//   className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
// >
//   <option value="">Select Medicine</option>
//   {medicines.map(d => (
//     <option key={d.id} value={d.id}>{d.name}</option>
//   ))}
// </select> */}
// <select 
//   value={med.medicineId} 
//   onChange={e => handleMedChange(idx, 'medicineId', e.target.value)}
//   required
//   className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full"
// >
//   <option value="">Select Medicine</option>
//   {medicines.map(m => (
//     <option key={m.medicineId} value={m.medicineId}>
//       {m.name}
//     </option>
//   ))}
// </select>

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

//       {/* Edit Modal */}
//       <Modal isOpen={showEditModal} onClose={() => { setShowEditModal(false); resetForm(); }} title="Edit Invoice" size="lg">
//         <form onSubmit={handleUpdate} className="space-y-5">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Patient ID *</label>
//               <input type="number" name="patientId" value={form.patientId} onChange={handleFormChange} required className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" />
//             </div>
//             <div>
//               <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Doctor ID *</label>
//               <input type="number" name="doctorId" value={form.doctorId} onChange={handleFormChange} required className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" />
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
//                 {['Medicine ID', 'Type', 'Strength', 'Qty', 'Price (₹)', ''].map((h, i) => (
//                   <div key={h} className={`text-xs font-semibold text-slate-400 uppercase tracking-wider ${i === 0 ? 'col-span-2' : i === 5 ? 'col-span-1' : 'col-span-2'}`}>{h}</div>
//                 ))}
//               </div>
//               {form.medicines.map((med, idx) => (
//                 <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-slate-50 rounded-xl p-2">
//                   <input type="number" placeholder="Med ID" value={med.medicineId} onChange={e => handleMedChange(idx, 'medicineId', e.target.value)} className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full" />
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

//       {/* Delete Modal */}
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

//       {/* View Modal */}
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
//                         <td className="px-3 py-2.5 font-medium text-slate-800">{MEDICINE_OPTIONS.find(o => o.id === m.medicineId)?.name || `Med #${m.medicineId}`}</td>
//                         <td className="px-3 py-2.5 text-slate-600 capitalize">{m.type}</td>
//                         <td className="px-3 py-2.5 text-slate-600">{m.strength}</td>
//                         <td className="px-3 py-2.5 text-slate-600">{m.quantity}</td>
//                         <td className="px-3 py-2.5 text-slate-600">₹{m.price}</td>
//                         <td className="px-3 py-2.5 font-semibold text-slate-800">₹{(m.price * m.quantity).toLocaleString()}</td>
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

//       {/* Share Modal */}
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

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Plus, Search, Download, Eye, Send, X, ChevronDown,
  FileText, Sheet, Pill, User, Stethoscope, Trash2,
  Copy, Check, Printer, CheckCircle, Clock, ChevronLeft, ChevronRight, Loader2, AlertCircle
} from 'lucide-react';
import { createInvoiceApi, getInvoiceApi, updateInvoiceApi, deleteInvoiceApi, getPatients, getDoctorApi, getMedicines } from '../../lib/commonApis';

// ── Medicine Types ────────────────────────────────────────────────────────────
const MEDICINE_TYPES = ['tablet', 'capsule', 'syrup', 'injection', 'drops', 'cream'];
const EMPTY_MEDICINE = { medicineId: '', quantity: '', strength: '', type: 'tablet', price: '' };

const ITEMS_PER_PAGE = 10;

// ── Modal Component ───────────────────────────────────────────────────────────
function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null;
  const sizeMap = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeMap[size]} border border-slate-100 flex flex-col max-h-[90vh]`}
        onClick={e => e.stopPropagation()}
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

// ── Main Component ────────────────────────────────────────────────────────────
export default function BillingPage() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  // ── Form State ────────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    patientId: '',
    doctorId: '',
    medicines: [{ ...EMPTY_MEDICINE }],
  });

  const formTotal = form.medicines.reduce((s, m) =>
    s + ((parseFloat(m.price) || 0) * (parseInt(m.quantity) || 0)), 0
  );

  // ── Helper: get medicine name by id ──────────────────────────────────────
  const getMedicineName = useCallback((medicineId) => {
    const found = medicines.find(m => String(m.medicineId) === String(medicineId));
    return found ? found.name : `Med #${medicineId}`;
  }, [medicines]);

  // ── Load Invoices (fetch all, paginate client-side) ───────────────────────
  const loadInvoices = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch all invoices at once for client-side pagination & filtering
      const res = await getInvoiceApi(1000, 1);
      console.log('Invoice API Response:', res);

      const dataArray = res?.data?.invoices || res?.data || res || [];
      const list = Array.isArray(dataArray) ? dataArray.map(item => ({
        id: item.id,
        invoiceId: item.invoiceId || `INV-${item.id}`,
        patientId: item.patientId,
        patientName: item.patient?.name || `Patient #${item.patientId}`,
        doctorId: item.doctorId,
        doctorName: item.doctor?.name || `Doctor #${item.doctorId}`,
        date: item.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0],
        status: item.status?.toLowerCase() || 'active',
        medicines: item.medicines || [],
        totalAmount: parseFloat(item.totalPrice) || item.medicines?.reduce((s, m) =>
          s + (parseFloat(m.subtotal) || (parseFloat(m.price) || 0) * (parseInt(m.quantity) || 0)), 0) || 0,
        notes: item.notes || '',
      })) : [];

      setInvoices(list);
    } catch (err) {
      console.error('Failed to load invoices:', err);
      showToast('❌ Failed to load invoices');
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Load Patients ─────────────────────────────────────────────────────────
  const loadPatients = useCallback(async () => {
    try {
      const res = await getPatients(100, 1);
      const dataArray = res?.data?.data || res?.data || [];
      setPatients(dataArray.map(item => ({
        id: item.id,
        name: item.name,
        phone: item.phone,
        email: item.user?.email || '-',
      })));
    } catch (err) {
      console.error('Failed to load patients:', err);
      setPatients([]);
    }
  }, []);

  // ── Load Doctors ──────────────────────────────────────────────────────────
  const loadDoctors = useCallback(async () => {
    try {
      const res = await getDoctorApi(100, 1);
      const dataArray = res?.data?.data || res?.data || [];
      console.log(dataArray.doctors, 'doctors');
      setDoctors(dataArray.doctors.map(item => ({
        id: item.id,
        name: item.name,
      })));
    } catch (err) {
      console.error('Failed to load doctors:', err);
      setDoctors([]);
    }
  }, []);

  // ── Load Medicines ────────────────────────────────────────────────────────
  const loadMedicines = useCallback(async () => {
    try {
      const res = await getMedicines(100, 1);
      console.log(res.data.medicines, 'data medicine');
      const dataArray = res?.data?.medicines || res?.data || [];
      setMedicines(dataArray.map(item => ({
        medicineId: item.id,
        name: item.name,
      })));
    } catch (err) {
      console.error('Failed to load medicines:', err);
      setMedicines([]);
    }
  }, []);

  useEffect(() => {
    loadInvoices();
    loadPatients();
    loadDoctors();
    loadMedicines();
  }, [loadInvoices]);

  // ── Form Handlers ─────────────────────────────────────────────────────────
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
  };

  const handleMedChange = (idx, field, value) => {
    const updated = form.medicines.map((m, i) => i === idx ? { ...m, [field]: value } : m);
    setForm(p => ({ ...p, medicines: updated }));
  };

  const addMedRow = () => setForm(p => ({ ...p, medicines: [...p.medicines, { ...EMPTY_MEDICINE }] }));

  const removeMedRow = (idx) => {
    if (form.medicines.length === 1) return;
    setForm(p => ({ ...p, medicines: p.medicines.filter((_, i) => i !== idx) }));
  };

  const resetForm = () => setForm({
    patientId: '',
    doctorId: '',
    medicines: [{ ...EMPTY_MEDICINE }],
  });

  // ── Create Invoice ────────────────────────────────────────────────────────
  const handleCreate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        patientId: parseInt(form.patientId),
        doctorId: parseInt(form.doctorId),
        medicines: form.medicines.map(m => ({
          medicineId: parseInt(m.medicineId),
          quantity: parseInt(m.quantity),
          strength: m.strength,
          type: m.type,
          price: parseFloat(m.price),
        })),
      };
      await createInvoiceApi(payload);
      await loadInvoices();
      setShowAddModal(false);
      resetForm();
      setCurrentPage(1);
      showToast('✅ Invoice created successfully!');
    } catch (err) {
      console.error('Create error:', err);
      showToast('❌ Failed to create invoice');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Update Invoice ────────────────────────────────────────────────────────
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedInvoice) return;
    setIsSubmitting(true);
    try {
      const payload = {
        patientId: parseInt(form.patientId),
        doctorId: parseInt(form.doctorId),
        medicines: form.medicines.map(m => ({
          medicineId: parseInt(m.medicineId),
          quantity: parseInt(m.quantity),
          strength: m.strength,
          type: m.type,
          price: parseFloat(m.price),
        })),
      };
      await updateInvoiceApi(selectedInvoice.id, payload);
      await loadInvoices();
      setShowEditModal(false);
      setSelectedInvoice(null);
      resetForm();
      showToast('✅ Invoice updated successfully!');
    } catch (err) {
      console.error('Update error:', err);
      showToast('❌ Failed to update invoice');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Delete Invoice ────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!selectedInvoice) return;
    setIsSubmitting(true);
    try {
      await deleteInvoiceApi(selectedInvoice.id);
      await loadInvoices();
      setShowDeleteModal(false);
      setSelectedInvoice(null);
      showToast('🗑️ Invoice deleted');
    } catch (err) {
      console.error('Delete error:', err);
      showToast('❌ Failed to delete invoice');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Edit Click ────────────────────────────────────────────────────────────
  const handleEditClick = (invoice) => {
    setSelectedInvoice(invoice);
    setForm({
      patientId: invoice.patientId.toString(),
      doctorId: invoice.doctorId.toString(),
      medicines: invoice.medicines.length > 0
        ? invoice.medicines.map(m => ({
          medicineId: m.medicineId?.toString() || '',
          quantity: m.quantity?.toString() || '',
          strength: m.strength || '',
          type: m.type || 'tablet',
          price: m.price?.toString() || '',
        }))
        : [{ ...EMPTY_MEDICINE }],
    });
    setShowEditModal(true);
  };

  // ── Filter + Client-side Pagination ──────────────────────────────────────
  const filtered = useMemo(() => {
    const s = searchTerm.toLowerCase();
    return invoices.filter(inv => {
      const matchSearch =
        (inv.invoiceId || '').toLowerCase().includes(s) ||
        (inv.patientName || '').toLowerCase().includes(s) ||
        (inv.doctorName || '').toLowerCase().includes(s);
      const matchStatus = filterStatus === 'all' || inv.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [invoices, searchTerm, filterStatus]);

  const totalPagesFiltered = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  // Reset to page 1 when filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPagesFiltered <= 7) {
      for (let i = 1; i <= totalPagesFiltered; i++) pages.push(i);
    } else if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPagesFiltered);
    } else if (currentPage >= totalPagesFiltered - 3) {
      pages.push(1, '...', totalPagesFiltered - 4, totalPagesFiltered - 3, totalPagesFiltered - 2, totalPagesFiltered - 1, totalPagesFiltered);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPagesFiltered);
    }
    return pages;
  };

  // ── Stats ─────────────────────────────────────────────────────────────────
  const stats = {
    total: invoices.length,
    paid: invoices.filter(i => i.status === 'paid').length,
    pending: invoices.filter(i => i.status === 'pending').length,
    totalMeds: invoices.reduce((s, i) => s + i.medicines.length, 0),
  };

  // ── Print Invoice ─────────────────────────────────────────────────────────
  const handlePrint = (inv) => {
    const medRows = inv.medicines.map(m =>
      `<tr>
        <td>${getMedicineName(m.medicineId)}</td>
        <td style="text-align:center">${m.type}</td>
        <td style="text-align:center">${m.strength}</td>
        <td style="text-align:center">${m.quantity}</td>
        <td style="text-align:right">₹${m.price}</td>
        <td style="text-align:right">₹${((m.price || 0) * (m.quantity || 0)).toLocaleString()}</td>
      </tr>`
    ).join('');

    const html = `<!DOCTYPE html><html><head><title>Invoice ${inv.invoiceId}</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',Arial,sans-serif;background:#f8fafc;color:#1e293b}.page{max-width:740px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.10)}.header{background:linear-gradient(135deg,#059669,#0d9488);color:#fff;padding:36px 40px}.header h1{font-size:26px;font-weight:800}.header p{margin-top:4px;opacity:.85;font-size:13px}.invoice-id{margin-top:14px;font-size:20px;font-weight:700;background:rgba(255,255,255,.15);display:inline-block;padding:5px 16px;border-radius:8px}.body{padding:36px 40px}.meta{display:flex;justify-content:space-between;margin-bottom:28px;gap:20px}.meta-block h3{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#64748b;margin-bottom:5px}.meta-block p{font-size:15px;font-weight:600}.meta-block .sub{font-size:13px;font-weight:400;color:#64748b}.badge{display:inline-block;padding:3px 12px;border-radius:99px;font-size:12px;font-weight:700;text-transform:capitalize}.active{background:#dcfce7;color:#16a34a}.completed{background:#dbeafe;color:#1d4ed8}table{width:100%;border-collapse:collapse;margin-bottom:20px}thead tr{background:#f1f5f9}thead th{padding:10px 12px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#64748b}tbody td{padding:10px 12px;border-bottom:1px solid #f1f5f9;font-size:14px}.total-row td{padding:14px 12px;font-size:16px;font-weight:800;color:#059669;border-top:2px solid #e2e8f0}.footer{text-align:center;color:#94a3b8;font-size:12px;padding:18px 40px;border-top:1px solid #f1f5f9}@media print{body{background:#fff}.page{box-shadow:none;margin:0;border-radius:0}}</style></head><body>
<div class="page">
  <div class="header">
    <h1>MediCare Hospital</h1>
    <p>123 Health Avenue, New Delhi – 110001 &nbsp;|&nbsp; billing@medicare.in &nbsp;|&nbsp; +91 11 2345 6789</p>
    <div class="invoice-id">${inv.invoiceId}</div>
  </div>
  <div class="body">
    <div class="meta">
      <div class="meta-block">
        <h3>Patient</h3>
        <p>${inv.patientName}</p>
        <p class="sub">Patient ID: ${inv.patientId}</p>
      </div>
      <div class="meta-block">
        <h3>Prescribed By</h3>
        <p>${inv.doctorName}</p>
        <p class="sub">Doctor ID: ${inv.doctorId}</p>
      </div>
      <div class="meta-block" style="text-align:right">
        <h3>Date</h3>
        <p>${inv.date}</p>
        <div style="margin-top:8px"><span class="badge ${inv.status}">${inv.status}</span></div>
      </div>
    </div>
    <table>
      <thead><tr>
        <th>Medicine</th><th style="text-align:center">Type</th>
        <th style="text-align:center">Strength</th><th style="text-align:center">Qty</th>
        <th style="text-align:right">Unit Price</th><th style="text-align:right">Total</th>
      </tr></thead>
      <tbody>
        ${medRows}
        <tr class="total-row">
          <td colspan="5">Total Amount</td>
          <td style="text-align:right">₹${inv.totalAmount.toLocaleString()}</td>
        </tr>
      </tbody>
    </table>
    <p style="font-size:12px;color:#64748b;margin-top:8px">This invoice is valid for 30 days from the date of issue.</p>
  </div>
  <div class="footer">Thank you for choosing MediCare Hospital &nbsp;•&nbsp; Get well soon!</div>
</div>
</body></html>`;

    const win = window.open('', '_blank', 'height=720,width=860');
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 300);
  };

  // ── Export Functions ──────────────────────────────────────────────────────
  const exportToExcel = () => {
    const headers = ['Invoice ID', 'Patient', 'Doctor', 'Date', 'Medicines', 'Total', 'Status'];
    const rows = filtered.map(inv => [
      inv.invoiceId,
      `"${inv.patientName}"`,
      `"${inv.doctorName}"`,
      inv.date,
      `"${inv.medicines.map(m => getMedicineName(m.medicineId)).join(', ')}"`,
      inv.totalAmount,
      inv.status,
    ].join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `invoices_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportMenu(false);
  };

  const exportToPDF = () => {
    const rows = filtered.map(inv =>
      `<tr><td>${inv.invoiceId}</td><td>${inv.patientName}</td><td>${inv.doctorName}</td><td>${inv.date}</td><td>${inv.medicines.length} med(s)</td><td>₹${inv.totalAmount.toLocaleString()}</td><td>${inv.status}</td></tr>`
    ).join('');
    const html = `<!DOCTYPE html><html><head><title>Invoices Report</title>
<style>body{font-family:Arial,sans-serif;margin:30px}h1{color:#059669;text-align:center}table{width:100%;border-collapse:collapse;margin-top:20px}th{background:#059669;color:#fff;padding:10px;text-align:left}td{padding:9px 10px;border-bottom:1px solid #ddd}tr:hover{background:#f5f5f5}</style>
</head><body>
<h1>MediCare – Invoices Report</h1>
<p style="text-align:center;color:#64748b">Generated: ${new Date().toLocaleDateString('en-IN')} | Total: ${filtered.length} records</p>
<table><thead><tr><th>Invoice ID</th><th>Patient</th><th>Doctor</th><th>Date</th><th>Medicines</th><th>Amount</th><th>Status</th></tr></thead>
<tbody>${rows}</tbody></table></body></html>`;
    const win = window.open('', '', 'height=600,width=1000');
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); setShowExportMenu(false); }, 250);
  };

  // ── Share / Copy ──────────────────────────────────────────────────────────
  const handleCopy = (inv) => {
    const text = `Invoice ${inv.invoiceId}\nPatient: ${inv.patientName}\nDoctor: ${inv.doctorName}\nDate: ${inv.date}\nTotal: ₹${inv.totalAmount.toLocaleString()}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // ── Status Badge ──────────────────────────────────────────────────────────
  const statusBadge = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'paid':
      case 'active': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  // ══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════════════════
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
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Billing & Invoices</h1>
            <p className="text-slate-600">Manage patient invoices and prescriptions</p>
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
            {/* Add */}
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 font-semibold shadow-lg"
            >
              <Plus className="w-5 h-5" /> New Invoice
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Invoices', value: stats.total, color: 'text-slate-800' },
            { label: 'Paid', value: stats.paid, color: 'text-green-600' },
            { label: 'Pending', value: stats.pending, color: 'text-amber-600' },
            { label: 'Total Medicines', value: stats.totalMeds, color: 'text-emerald-600' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <p className="text-sm text-slate-600 mb-1">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search / Filter */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by invoice ID, patient, or doctor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 text-slate-700 font-medium cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-6">
        {loading ? (
          <div className="py-16 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">Loading invoices...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
                <tr>
                  {['Invoice ID', 'Patient', 'Doctor', 'Date', 'Medicines', 'Total', 'Status', 'Actions'].map(h => (
                    <th key={h} className={`px-6 py-4 text-left font-semibold text-slate-700 ${h === 'Actions' ? 'text-center' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginated.length > 0 ? paginated.map(inv => (
                  <tr key={inv.id} className="hover:bg-emerald-50/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span className="font-semibold text-slate-800">{inv.invoiceId}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {inv.patientName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">{inv.patientName}</p>
                          <p className="text-xs text-slate-500">ID: {inv.patientId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-teal-500 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-slate-700 text-sm">{inv.doctorName}</p>
                          <p className="text-xs text-slate-500">ID: {inv.doctorId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{inv.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {inv.medicines.slice(0, 2).map((m, i) => (
                          <span key={i} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs font-medium border border-emerald-100">
                            {getMedicineName(m.medicineId)}
                          </span>
                        ))}
                        {inv.medicines.length > 2 && (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium">+{inv.medicines.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-800">₹{inv.totalAmount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize flex items-center gap-1.5 w-fit ${statusBadge(inv.status)}`}>
                        {inv.status === 'active' || inv.status === 'paid'
                          ? <CheckCircle className="w-3.5 h-3.5" />
                          : <Clock className="w-3.5 h-3.5" />}
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => { setSelectedInvoice(inv); setShowViewModal(true); }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handlePrint(inv)}
                          className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                          title="Print"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { setSelectedInvoice(inv); setShowShareModal(true); }}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Share"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditClick(inv)}
                          className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { setSelectedInvoice(inv); setShowDeleteModal(true); }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={8} className="py-16 text-center">
                      <Pill className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 font-medium">No invoices found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
     

      {/* Pagination */}
      {totalPagesFiltered > 1 && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing <span className="font-semibold">{Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}</span> –{' '}
              <span className="font-semibold">{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of{' '}
              <span className="font-semibold">{filtered.length}</span>
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-all ${currentPage === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-emerald-50 border border-slate-200'}`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {getPageNumbers().map((p, i) =>
                p === '...' ? (
                  <span key={`e${i}`} className="px-2 text-slate-400 text-sm">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${currentPage === p ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' : 'text-slate-600 hover:bg-emerald-50 border border-slate-200'}`}
                  >
                    {p}
                  </button>
                )
              )}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPagesFiltered, p + 1))}
                disabled={currentPage === totalPagesFiltered}
                className={`p-2 rounded-lg transition-all ${currentPage === totalPagesFiltered ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-emerald-50 border border-slate-200'}`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
 </div>


      {/* ── Add Modal ── */}
      <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); resetForm(); }} title="New Invoice" size="lg">
        <form onSubmit={handleCreate} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Patient *</label>
              <select
                name="patientId"
                value={form.patientId}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
              >
                <option value="">Select Patient</option>
                {patients.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Doctor *</label>
              <select
                name="doctorId"
                value={form.doctorId}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
              >
                <option value="">Select Doctor</option>
                {doctors.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Medicines */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Medicines *</label>
              <button type="button" onClick={addMedRow} className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add Medicine
              </button>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-2 px-1">
                {['Medicine', 'Type', 'Strength', 'Qty', 'Price (₹)', ''].map((h, i) => (
                  <div key={h} className={`text-xs font-semibold text-slate-400 uppercase tracking-wider ${i === 0 ? 'col-span-2' : i === 5 ? 'col-span-1' : 'col-span-2'}`}>{h}</div>
                ))}
              </div>
              {form.medicines.map((med, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-slate-50 rounded-xl p-2">
                  <select
                    value={med.medicineId}
                    onChange={e => handleMedChange(idx, 'medicineId', e.target.value)}
                    required
                    className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full"
                  >
                    <option value="">Select</option>
                    {medicines.map(m => (
                      <option key={m.medicineId} value={m.medicineId}>{m.name}</option>
                    ))}
                  </select>
                  <select value={med.type} onChange={e => handleMedChange(idx, 'type', e.target.value)} className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full">
                    {MEDICINE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <input type="text" placeholder="e.g. 500mg" value={med.strength} onChange={e => handleMedChange(idx, 'strength', e.target.value)} className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full" />
                  <input type="number" placeholder="Qty" value={med.quantity} min="1" onChange={e => handleMedChange(idx, 'quantity', e.target.value)} className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full" />
                  <input type="number" placeholder="Price" value={med.price} min="0" onChange={e => handleMedChange(idx, 'price', e.target.value)} className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full" />
                  <button type="button" onClick={() => removeMedRow(idx)} className="col-span-1 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-3">
              <div className="bg-emerald-50 rounded-xl px-5 py-2.5 border border-emerald-200">
                <span className="text-sm text-emerald-700 font-medium">Total: </span>
                <span className="text-lg font-bold text-emerald-700">₹{formTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => { setShowAddModal(false); resetForm(); }} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg disabled:opacity-60">
              {isSubmitting ? 'Creating...' : 'Create Invoice'}
            </button>
          </div>
        </form>
      </Modal>

      {/* ── Edit Modal ── */}
      <Modal isOpen={showEditModal} onClose={() => { setShowEditModal(false); resetForm(); }} title="Edit Invoice" size="lg">
        <form onSubmit={handleUpdate} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Patient *</label>
              <select
                name="patientId"
                value={form.patientId}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
              >
                <option value="">Select Patient</option>
                {patients.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Doctor *</label>
              <select
                name="doctorId"
                value={form.doctorId}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
              >
                <option value="">Select Doctor</option>
                {doctors.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Medicines */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Medicines *</label>
              <button type="button" onClick={addMedRow} className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add Medicine
              </button>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-2 px-1">
                {['Medicine', 'Type', 'Strength', 'Qty', 'Price (₹)', ''].map((h, i) => (
                  <div key={h} className={`text-xs font-semibold text-slate-400 uppercase tracking-wider ${i === 0 ? 'col-span-2' : i === 5 ? 'col-span-1' : 'col-span-2'}`}>{h}</div>
                ))}
              </div>
              {form.medicines.map((med, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-slate-50 rounded-xl p-2">
                  <select
                    value={med.medicineId}
                    onChange={e => handleMedChange(idx, 'medicineId', e.target.value)}
                    required
                    className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full"
                  >
                    <option value="">Select</option>
                    {medicines.map(m => (
                      <option key={m.medicineId} value={m.medicineId}>{m.name}</option>
                    ))}
                  </select>
                  <select value={med.type} onChange={e => handleMedChange(idx, 'type', e.target.value)} className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full">
                    {MEDICINE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <input type="text" placeholder="e.g. 500mg" value={med.strength} onChange={e => handleMedChange(idx, 'strength', e.target.value)} className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full" />
                  <input type="number" placeholder="Qty" value={med.quantity} min="1" onChange={e => handleMedChange(idx, 'quantity', e.target.value)} className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full" />
                  <input type="number" placeholder="Price" value={med.price} min="0" onChange={e => handleMedChange(idx, 'price', e.target.value)} className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full" />
                  <button type="button" onClick={() => removeMedRow(idx)} className="col-span-1 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-3">
              <div className="bg-emerald-50 rounded-xl px-5 py-2.5 border border-emerald-200">
                <span className="text-sm text-emerald-700 font-medium">Total: </span>
                <span className="text-lg font-bold text-emerald-700">₹{formTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => { setShowEditModal(false); resetForm(); }} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg disabled:opacity-60">
              {isSubmitting ? 'Updating...' : 'Update Invoice'}
            </button>
          </div>
        </form>
      </Modal>

      {/* ── Delete Modal ── */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Invoice" size="sm">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="text-slate-700 font-semibold">Delete Invoice #{selectedInvoice?.invoiceId}?</p>
            <p className="text-slate-500 text-sm mt-1">This action cannot be undone.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
            <button onClick={handleDelete} disabled={isSubmitting} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* ── View Modal ── */}
      <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Invoice Details" size="md">
        {selectedInvoice && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Invoice ID', value: selectedInvoice.invoiceId },
                { label: 'Date', value: selectedInvoice.date },
                { label: 'Patient', value: `${selectedInvoice.patientName} (ID: ${selectedInvoice.patientId})` },
                { label: 'Doctor', value: `${selectedInvoice.doctorName} (ID: ${selectedInvoice.doctorId})` },
              ].map(row => (
                <div key={row.label} className="bg-slate-50 rounded-xl px-4 py-3">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{row.label}</p>
                  <p className="text-sm font-semibold text-slate-800">{row.value}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</p>
              <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusBadge(selectedInvoice.status)}`}>
                {selectedInvoice.status}
              </span>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Medicines</p>
              <div className="rounded-xl overflow-hidden border border-slate-200">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-emerald-50 to-teal-50">
                    <tr>
                      {['Medicine', 'Type', 'Strength', 'Qty', 'Price', 'Total'].map(h => (
                        <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-slate-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedInvoice.medicines.map((m, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-3 py-2.5 font-medium text-slate-800">{getMedicineName(m.medicineId)}</td>
                        <td className="px-3 py-2.5 text-slate-600 capitalize">{m.type}</td>
                        <td className="px-3 py-2.5 text-slate-600">{m.strength}</td>
                        <td className="px-3 py-2.5 text-slate-600">{m.quantity}</td>
                        <td className="px-3 py-2.5 text-slate-600">₹{m.price}</td>
                        <td className="px-3 py-2.5 font-semibold text-slate-800">₹{((m.price || 0) * (m.quantity || 0)).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-emerald-50">
                      <td colSpan={5} className="px-3 py-2.5 font-bold text-slate-700">Total Amount</td>
                      <td className="px-3 py-2.5 font-bold text-emerald-700">₹{selectedInvoice.totalAmount.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <button onClick={() => handlePrint(selectedInvoice)} className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                <Printer className="w-4 h-4" /> Print
              </button>
              <button onClick={() => { setShowViewModal(false); setShowShareModal(true); }} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ── Share Modal ── */}
      <Modal isOpen={showShareModal} onClose={() => setShowShareModal(false)} title="Share Invoice" size="sm">
        {selectedInvoice && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                  {selectedInvoice.patientName.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-800">{selectedInvoice.invoiceId}</p>
                  <p className="text-xs text-slate-500">{selectedInvoice.patientName} · {selectedInvoice.date}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">{selectedInvoice.medicines.length} medicine(s)</span>
                <span className="font-bold text-emerald-700">₹{selectedInvoice.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Share via</p>
              <button onClick={() => handleCopy(selectedInvoice)} className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 hover:bg-emerald-50 rounded-xl transition-colors border border-slate-200">
                <div className="w-9 h-9 bg-slate-200 rounded-lg flex items-center justify-center">
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-700 text-sm">{copied ? 'Copied!' : 'Copy Details'}</p>
                  <p className="text-xs text-slate-400">Copy invoice summary</p>
                </div>
              </button>
              <button onClick={() => handlePrint(selectedInvoice)} className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 hover:bg-emerald-50 rounded-xl transition-colors border border-slate-200">
                <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Printer className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-700 text-sm">Print / Download PDF</p>
                  <p className="text-xs text-slate-400">Open print dialog</p>
                </div>
              </button>
            </div>
          </div>
        )}
      </Modal>

      {showExportMenu && <div className="fixed inset-0 z-0" onClick={() => setShowExportMenu(false)} />}
    </div>
  );
}