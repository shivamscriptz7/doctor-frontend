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
















// 'use client';

// import { useState, useEffect, useMemo, useCallback } from 'react';
// import {
//   Plus, Search, Download, Eye, Send, X, ChevronDown,
//   FileText, Sheet, Pill, User, Stethoscope, Trash2,
//   Copy, Check, Printer, CheckCircle, Clock, ChevronLeft, ChevronRight, Loader2, AlertCircle
// } from 'lucide-react';
// import { createInvoiceApi, getInvoiceApi, updateInvoiceApi, deleteInvoiceApi, getPatients, getDoctorApi, getMedicines,countInvoiceApi } from '../../lib/commonApis';

// import{showToast} from '../../lib/notification';
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
//   const [todayInvoices, setTodayInvoices] = useState(0);
//   const [totalInvoices, setTotalInvoices] = useState(0);
//   const [todayRevenue, setTodayRevenue] = useState(0);
//   const [totalRevenue, setTotalRevenue] = useState(0);


//   const [toast, setToast] = useState('');





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
//             showToast('error','Failed','Failed to load invoices!');
      
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
//     handleCountData();
//     loadInvoices();
//     loadPatients();
//     loadDoctors();
//     loadMedicines();
//   }, [loadInvoices]);

//   const handleCountData = async() =>{
//  const res = await countInvoiceApi();
//  console.log(res,'count',res.data.todayInvoices);
//  setTodayInvoices(res.data.todayInvoices)
//  setTodayRevenue(res.data.todayRevenue)
//  setTotalRevenue(res.data.totalRevenue)
//  setTotalInvoices(res.data.totalInvoices)
 
//   }

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
//             showToast('success','Created','Invoice created successfully!');

//     } catch (err) {
//       console.error('Create error:', err);

//             showToast('error','Failed','Failed to create invoices!');

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
//       console.log(payload,'payload');
      
      
      
//       await updateInvoiceApi(selectedInvoice.id, payload);
//       await loadInvoices();
//       setShowEditModal(false);
//       setSelectedInvoice(null);
//       resetForm();
//             showToast('success','Updated','Invoice updated successfully!');

//     } catch (err) {
//       console.error('Update error:', err);
//             showToast('error','Failed',err.message||'Failed to update invoices!');

    
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
//       showToast('success','Deleted','Invoice deleted successfully!');
//     } catch (err) {
//       console.error('Delete error:', err);
//       showToast('error','Failed','Failed to delete invoice');
      
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
//             { label: 'Today Invoices', value: todayInvoices, color: 'text-slate-800' },
//             { label: 'Total Invoices', value: totalInvoices, color: 'text-green-600' },
//             { label: 'Today Revenue', value: todayRevenue, color: 'text-amber-600' },
//             { label: 'Total Revenue', value: totalRevenue, color: 'text-emerald-600' },
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
     

//       {/* Pagination */}
//       {totalPagesFiltered > 1 && (
//         <div className="bg-white rounded-2xl shadow-lg border border-slate-100 px-6 py-4">
//           <div className="flex items-center justify-between">
//             <p className="text-sm text-slate-600">
//               Showing <span className="font-semibold">{Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}</span> –{' '}
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
//  </div>


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






// 'use client';

// import { useState, useEffect, useMemo, useCallback } from 'react';
// import {
//   Plus, Search, Download, Eye, Send, X, ChevronDown,
//   FileText, Sheet, User, Stethoscope, Trash2,
//   Copy, Check, Printer, CheckCircle, Clock, ChevronLeft, ChevronRight, Loader2
// } from 'lucide-react';
// import { createInvoiceApi, getInvoiceApi, updateInvoiceApi, deleteInvoiceApi, getPatients, getDoctorApi, countInvoiceApi } from '../../lib/commonApis';
// import { showToast } from '../../lib/notification';

// // ── Charge Categories & Sub-items ─────────────────────────────────────────────
// const CHARGE_CATEGORIES = {
//   'Consultation': [
//     'OPD Doctor Fee',
//     'Specialist Consultation Fee',
//     'Follow-up Consultation',
//     'Tele-consultation',
//   ],
//   'Room / Bed': [
//     'General Ward (per day)',
//     'Semi-Private Room (per day)',
//     'Private Room (per day)',
//     'Deluxe / Suite Room (per day)',
//     'ICU (per day)',
//     'HDU - High Dependency Unit (per day)',
//   ],
//   'Nursing': [
//     'Nursing Care (per day)',
//     'Special / Private Nurse',
//     'Night Nurse',
//   ],
//   'Diagnostic / Lab': [
//     'Blood Test',
//     'Urine Test',
//     'ECG',
//     'X-Ray',
//     'Ultrasound',
//     'CT Scan',
//     'MRI',
//     'Biopsy / Pathology',
//   ],
//   'Procedure / Treatment': [
//     'Minor Procedure',
//     'Major Procedure',
//     'Dressing / Injection',
//     'Dialysis',
//     'Chemotherapy',
//     'Physiotherapy Session',
//   ],
//   'OT Charges': [
//     'Operation Theatre Charges',
//     'Surgeon Fee',
//     'Anaesthetist Fee',
//     'Assistant Surgeon Fee',
//     'OT Consumables',
//   ],
//   'Pharmacy': [
//     'Medicines',
//     'IV Fluids',
//     'Consumables (Gloves, Syringes etc.)',
//     'Implants / Stents / Prosthetics',
//   ],
//   'Diet': [
//     'Regular Diet (per day)',
//     'Special / Diabetic Diet (per day)',
//     'Liquid Diet (per day)',
//   ],
//   'Ambulance': [
//     'Ambulance (Arrival)',
//     'Ambulance (Transfer)',
//     'Emergency Ambulance',
//   ],
//   'Miscellaneous': [
//     'Admission Fee',
//     'Registration Fee',
//     'Medical Certificate',
//     'Discharge Summary',
//     'Attendant Charges',
//     'Laundry',
//     'Oxygen Charges',
//   ],
// };

// const CATEGORY_NAMES = Object.keys(CHARGE_CATEGORIES);

// const EMPTY_CHARGE = { category: '', chargeName: '', quantity: '1', rate: '', amount: 0 };

// const IPD_OPD_OPTIONS = ['OPD', 'IPD'];

// const ITEMS_PER_PAGE = 10;

// // ── Modal ─────────────────────────────────────────────────────────────────────
// function Modal({ isOpen, onClose, title, children, size = 'md' }) {
//   if (!isOpen) return null;
//   const sizeMap = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-5xl' };
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

// // ── Print Invoice ─────────────────────────────────────────────────────────────
// function printInvoice(inv) {
//   const chargeRows = (inv.charges || []).map(c =>
//     `<tr>
//       <td>${c.category}</td>
//       <td>${c.chargeName}</td>
//       <td style="text-align:center">${c.quantity}</td>
//       <td style="text-align:right">₹${parseFloat(c.rate || 0).toLocaleString()}</td>
//       <td style="text-align:right">₹${parseFloat(c.amount || 0).toLocaleString()}</td>
//     </tr>`
//   ).join('');

//   const subtotal = (inv.charges || []).reduce((s, c) => s + (parseFloat(c.amount) || 0), 0);

//   const html = `<!DOCTYPE html><html><head><title>Invoice ${inv.invoiceId}</title>
// <style>
//   *{margin:0;padding:0;box-sizing:border-box}
//   body{font-family:'Segoe UI',Arial,sans-serif;background:#f8fafc;color:#1e293b}
//   .page{max-width:780px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.10)}
//   .header{background:linear-gradient(135deg,#059669,#0d9488);color:#fff;padding:36px 40px;display:flex;justify-content:space-between;align-items:flex-start}
//   .header-left h1{font-size:26px;font-weight:800}
//   .header-left p{margin-top:4px;opacity:.85;font-size:12px;max-width:320px}
//   .header-right{text-align:right}
//   .invoice-label{font-size:11px;opacity:.75;text-transform:uppercase;letter-spacing:1px}
//   .invoice-num{font-size:22px;font-weight:800;background:rgba(255,255,255,.15);padding:6px 16px;border-radius:8px;margin-top:4px;display:inline-block}
//   .body{padding:36px 40px}
//   .meta{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;margin-bottom:28px}
//   .meta-block h3{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#64748b;margin-bottom:5px}
//   .meta-block p{font-size:15px;font-weight:600;color:#1e293b}
//   .meta-block .sub{font-size:12px;font-weight:400;color:#64748b}
//   .badge{display:inline-block;padding:3px 12px;border-radius:99px;font-size:12px;font-weight:700;text-transform:capitalize;background:#dcfce7;color:#16a34a}
//   table{width:100%;border-collapse:collapse;margin-bottom:20px}
//   thead tr{background:#f1f5f9}
//   thead th{padding:10px 12px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#64748b}
//   tbody td{padding:10px 12px;border-bottom:1px solid #f1f5f9;font-size:14px}
//   tfoot td{padding:12px;font-weight:700;border-top:2px solid #e2e8f0}
//   .total-row{background:#f0fdf4}
//   .total-row td{font-size:16px;font-weight:800;color:#059669}
//   .footer{text-align:center;color:#94a3b8;font-size:12px;padding:18px 40px;border-top:1px solid #f1f5f9}
//   @media print{body{background:#fff}.page{box-shadow:none;margin:0;border-radius:0}}
// </style></head><body>
// <div class="page">
//   <div class="header">
//     <div class="header-left">
//       <h1>🏥 MediCare Hospital</h1>
//       <p>123 Health Avenue, New Delhi – 110001 &nbsp;|&nbsp; billing@medicare.in &nbsp;|&nbsp; +91 11 2345 6789</p>
//     </div>
//     <div class="header-right">
//       <div class="invoice-label">Invoice</div>
//       <div class="invoice-num">${inv.invoiceId}</div>
//     </div>
//   </div>
//   <div class="body">
//     <div class="meta">
//       <div class="meta-block">
//         <h3>Patient</h3>
//         <p>${inv.patientName}</p>
//         <p class="sub">Type: ${inv.ipdOpd || 'OPD'}</p>
//       </div>
//       <div class="meta-block">
//         <h3>Prescribed By</h3>
//         <p>${inv.doctorName}</p>
//       </div>
//       <div class="meta-block">
//         <h3>Date &amp; Status</h3>
//         <p>${inv.date}</p>
//         <div style="margin-top:6px"><span class="badge">${inv.status}</span></div>
//       </div>
//     </div>
//     <table>
//       <thead><tr>
//         <th>Category</th>
//         <th>Charge Name</th>
//         <th style="text-align:center">Qty</th>
//         <th style="text-align:right">Rate</th>
//         <th style="text-align:right">Amount</th>
//       </tr></thead>
//       <tbody>${chargeRows}</tbody>
//       <tfoot>
//         <tr class="total-row">
//           <td colspan="4">Grand Total</td>
//           <td style="text-align:right">₹${subtotal.toLocaleString()}</td>
//         </tr>
//       </tfoot>
//     </table>
//     <p style="font-size:12px;color:#64748b">This invoice is valid for 30 days from the date of issue.</p>
//   </div>
//   <div class="footer">Thank you for choosing MediCare Hospital &nbsp;•&nbsp; Get well soon!</div>
// </div>
// </body></html>`;

//   const win = window.open('', '_blank', 'height=720,width=860');
//   win.document.write(html);
//   win.document.close();
//   win.focus();
//   setTimeout(() => win.print(), 300);
// }

// // ── Charge Form Row ───────────────────────────────────────────────────────────
// function ChargeRow({ charge, idx, onChange, onRemove, isOnly }) {
//   const subItems = charge.category ? (CHARGE_CATEGORIES[charge.category] || []) : [];

//   const handleField = (field, value) => {
//     const updated = { ...charge, [field]: value };
//     if (field === 'category') updated.chargeName = '';
//     if (field === 'quantity' || field === 'rate') {
//       const qty = parseFloat(field === 'quantity' ? value : updated.quantity) || 0;
//       const rate = parseFloat(field === 'rate' ? value : updated.rate) || 0;
//       updated.amount = qty * rate;
//     }
//     onChange(idx, updated);
//   };

//   return (
//     <div className="grid grid-cols-12 gap-2 items-center bg-slate-50 rounded-xl p-2.5 border border-slate-100">
//       {/* Category */}
//       <select
//         value={charge.category}
//         onChange={e => handleField('category', e.target.value)}
//         required
//         className="col-span-3 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full"
//       >
//         <option value="">Select Category</option>
//         {CATEGORY_NAMES.map(c => <option key={c} value={c}>{c}</option>)}
//       </select>

//       {/* Charge Name */}
//       <select
//         value={charge.chargeName}
//         onChange={e => handleField('chargeName', e.target.value)}
//         required
//         disabled={!charge.category}
//         className="col-span-3 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         <option value="">Select Charge</option>
//         {subItems.map(s => <option key={s} value={s}>{s}</option>)}
//       </select>

//       {/* Qty */}
//       <input
//         type="number"
//         placeholder="Qty"
//         value={charge.quantity}
//         min="1"
//         onChange={e => handleField('quantity', e.target.value)}
//         required
//         className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full"
//       />

//       {/* Rate */}
//       <input
//         type="number"
//         placeholder="Rate ₹"
//         value={charge.rate}
//         min="0"
//         onChange={e => handleField('rate', e.target.value)}
//         required
//         className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm w-full"
//       />

//       {/* Amount (read-only) */}
//       <div className="col-span-1 px-2 py-2 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-700 text-sm font-semibold text-center w-full">
//         ₹{(charge.amount || 0).toLocaleString()}
//       </div>

//       {/* Delete */}
//       <button
//         type="button"
//         onClick={() => onRemove(idx)}
//         disabled={isOnly}
//         className="col-span-1 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
//       >
//         <Trash2 className="w-4 h-4" />
//       </button>
//     </div>
//   );
// }

// // ── Invoice Form ──────────────────────────────────────────────────────────────
// function InvoiceForm({ form, setForm, patients, doctors, onSubmit, isSubmitting, submitLabel, onCancel }) {
//   const total = form.charges.reduce((s, c) => s + (parseFloat(c.amount) || 0), 0);

//   const handleField = (name, value) => setForm(p => ({ ...p, [name]: value }));

//   const handleChargeChange = (idx, updated) => {
//     const charges = form.charges.map((c, i) => i === idx ? updated : c);
//     setForm(p => ({ ...p, charges }));
//   };

//   const addRow = () => setForm(p => ({ ...p, charges: [...p.charges, { ...EMPTY_CHARGE }] }));

//   const removeRow = (idx) => {
//     if (form.charges.length === 1) return;
//     setForm(p => ({ ...p, charges: p.charges.filter((_, i) => i !== idx) }));
//   };

//   return (
//     <form onSubmit={onSubmit} className="space-y-5">
//       {/* Header fields */}
//       <div className="grid grid-cols-3 gap-4">
//         <div>
//           <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Patient *</label>
//           <select
//             value={form.patientId}
//             onChange={e => handleField('patientId', e.target.value)}
//             required
//             className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
//           >
//             <option value="">Select Patient</option>
//             {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
//           </select>
//         </div>
//         <div>
//           <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Doctor *</label>
//           <select
//             value={form.doctorId}
//             onChange={e => handleField('doctorId', e.target.value)}
//             required
//             className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
//           >
//             <option value="">Select Doctor</option>
//             {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
//           </select>
//         </div>
//         <div>
//           <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">IPD / OPD *</label>
//           <select
//             value={form.ipdOpd}
//             onChange={e => handleField('ipdOpd', e.target.value)}
//             required
//             className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
//           >
//             <option value="">Select Type</option>
//             {IPD_OPD_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
//           </select>
//         </div>
//       </div>

//       {/* Charges Section */}
//       <div>
//         <div className="flex items-center justify-between mb-2">
//           <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Charges *</label>
//           <button
//             type="button"
//             onClick={addRow}
//             className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 px-3 py-1.5 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
//           >
//             <Plus className="w-3.5 h-3.5" /> Add Charge
//           </button>
//         </div>

//         {/* Column Headers */}
//         <div className="grid grid-cols-12 gap-2 px-1 mb-1.5">
//           {[
//             { label: 'Category', span: 'col-span-3' },
//             { label: 'Charge Name', span: 'col-span-3' },
//             { label: 'Qty', span: 'col-span-2' },
//             { label: 'Rate (₹)', span: 'col-span-2' },
//             { label: 'Amount', span: 'col-span-1' },
//             { label: '', span: 'col-span-1' },
//           ].map(h => (
//             <div key={h.label} className={`text-xs font-semibold text-slate-400 uppercase tracking-wider ${h.span}`}>{h.label}</div>
//           ))}
//         </div>

//         <div className="space-y-2">
//           {form.charges.map((charge, idx) => (
//             <ChargeRow
//               key={idx}
//               charge={charge}
//               idx={idx}
//               onChange={handleChargeChange}
//               onRemove={removeRow}
//               isOnly={form.charges.length === 1}
//             />
//           ))}
//         </div>

//         {/* Total */}
//         <div className="flex justify-end mt-4">
//           <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl px-6 py-3 border border-emerald-200">
//             <span className="text-sm text-emerald-700 font-medium">Grand Total: </span>
//             <span className="text-xl font-bold text-emerald-700">₹{total.toLocaleString()}</span>
//           </div>
//         </div>
//       </div>

//       {/* Notes */}
//       <div>
//         <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Remarks (optional)</label>
//         <textarea
//           value={form.notes}
//           onChange={e => handleField('notes', e.target.value)}
//           rows={2}
//           placeholder="Any additional notes..."
//           className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm resize-none"
//         />
//       </div>

//       <div className="flex gap-3 pt-2">
//         <button type="button" onClick={onCancel} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
//           Cancel
//         </button>
//         <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg disabled:opacity-60 flex items-center justify-center gap-2">
//           {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
//           {isSubmitting ? 'Saving...' : submitLabel}
//         </button>
//       </div>
//     </form>
//   );
// }

// // ── Status Badge ──────────────────────────────────────────────────────────────
// function statusBadge(status) {
//   switch ((status || '').toLowerCase()) {
//     case 'paid':
//     case 'active': return 'bg-green-100 text-green-700';
//     case 'pending': return 'bg-amber-100 text-amber-700';
//     case 'cancelled': return 'bg-red-100 text-red-700';
//     case 'completed': return 'bg-blue-100 text-blue-700';
//     default: return 'bg-slate-100 text-slate-700';
//   }
// }

// // ── Empty Form ────────────────────────────────────────────────────────────────
// const EMPTY_FORM = {
//   patientId: '',
//   doctorId: '',
//   ipdOpd: '',
//   charges: [{ ...EMPTY_CHARGE }],
//   notes: '',
// };

// // ══════════════════════════════════════════════════════════════════════════════
// // MAIN COMPONENT
// // ══════════════════════════════════════════════════════════════════════════════
// export default function BillingPage() {
//   const [patients, setPatients] = useState([]);
//   const [doctors, setDoctors] = useState([]);
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

//   const [todayInvoices, setTodayInvoices] = useState(0);
//   const [totalInvoices, setTotalInvoices] = useState(0);
//   const [todayRevenue, setTodayRevenue] = useState(0);
//   const [totalRevenue, setTotalRevenue] = useState(0);

//   const [form, setForm] = useState({ ...EMPTY_FORM, charges: [{ ...EMPTY_CHARGE }] });

//   const resetForm = () => setForm({ ...EMPTY_FORM, charges: [{ ...EMPTY_CHARGE }] });

//   // ── Loaders ───────────────────────────────────────────────────────────────
//   const loadInvoices = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await getInvoiceApi(1000, 1);
//       const dataArray = res?.data?.invoices || res?.data || res || [];
//       const list = Array.isArray(dataArray) ? dataArray.map(item => ({
//         id: item.id,
//         invoiceId: item.invoiceId || `INV-${item.id}`,
//         patientId: item.patientId,
//         patientName: item.patient?.name || `Patient #${item.patientId}`,
//         doctorId: item.doctorId,
//         doctorName: item.doctor?.name || `Doctor #${item.doctorId}`,
//         ipdOpd: item.ipdOpd || 'OPD',
//         date: item.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0],
//         status: item.status?.toLowerCase() || 'active',
//         charges: item.charges || [],
//         totalAmount: parseFloat(item.totalPrice) ||
//           (item.charges || []).reduce((s, c) => s + (parseFloat(c.amount) || 0), 0) || 0,
//         notes: item.notes || '',
//       })) : [];
//       setInvoices(list);
//     } catch (err) {
//       console.error('Failed to load invoices:', err);
//       showToast('error', 'Failed', 'Failed to load invoices!');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const loadPatients = useCallback(async () => {
//     try {
//       const res = await getPatients(100, 1);
//       const dataArray = res?.data?.data || res?.data || [];
//       setPatients(dataArray.map(item => ({ id: item.id, name: item.name })));
//     } catch { setPatients([]); }
//   }, []);

//   const loadDoctors = useCallback(async () => {
//     try {
//       const res = await getDoctorApi(100, 1);
//       const dataArray = res?.data?.data || res?.data || [];
//       setDoctors((dataArray.doctors || dataArray).map(item => ({ id: item.id, name: item.name })));
//     } catch { setDoctors([]); }
//   }, []);

//   const handleCountData = async () => {
//     try {
//       const res = await countInvoiceApi();
//       setTodayInvoices(res.data.todayInvoices);
//       setTodayRevenue(res.data.todayRevenue);
//       setTotalRevenue(res.data.totalRevenue);
//       setTotalInvoices(res.data.totalInvoices);
//     } catch { }
//   };

//   useEffect(() => {
//     handleCountData();
//     loadInvoices();
//     loadPatients();
//     loadDoctors();
//   }, [loadInvoices]);

//   // ── CRUD ──────────────────────────────────────────────────────────────────
//   const buildPayload = () => ({
//     patientId: parseInt(form.patientId),
//     doctorId: parseInt(form.doctorId),
//     ipdOpd: form.ipdOpd,
//     notes: form.notes,
//     charges: form.charges.map(c => ({
//       category: c.category,
//       chargeName: c.chargeName,
//       quantity: parseFloat(c.quantity) || 1,
//       rate: parseFloat(c.rate) || 0,
//       amount: parseFloat(c.amount) || 0,
//     })),
//     totalPrice: form.charges.reduce((s, c) => s + (parseFloat(c.amount) || 0), 0),
//   });

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       await createInvoiceApi(buildPayload());
//       await loadInvoices();
//       setShowAddModal(false);
//       resetForm();
//       setCurrentPage(1);
//       showToast('success', 'Created', 'Invoice created successfully!');
//     } catch (err) {
//       showToast('error', 'Failed', 'Failed to create invoice!');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!selectedInvoice) return;
//     setIsSubmitting(true);
//     try {
//       await updateInvoiceApi(selectedInvoice.id, buildPayload());
//       await loadInvoices();
//       setShowEditModal(false);
//       setSelectedInvoice(null);
//       resetForm();
//       showToast('success', 'Updated', 'Invoice updated successfully!');
//     } catch (err) {
//       showToast('error', 'Failed', err.message || 'Failed to update invoice!');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!selectedInvoice) return;
//     setIsSubmitting(true);
//     try {
//       await deleteInvoiceApi(selectedInvoice.id);
//       await loadInvoices();
//       setShowDeleteModal(false);
//       setSelectedInvoice(null);
//       showToast('success', 'Deleted', 'Invoice deleted successfully!');
//     } catch {
//       showToast('error', 'Failed', 'Failed to delete invoice!');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleEditClick = (invoice) => {
//     setSelectedInvoice(invoice);
//     setForm({
//       patientId: invoice.patientId?.toString() || '',
//       doctorId: invoice.doctorId?.toString() || '',
//       ipdOpd: invoice.ipdOpd || '',
//       notes: invoice.notes || '',
//       charges: invoice.charges?.length > 0
//         ? invoice.charges.map(c => ({
//           category: c.category || '',
//           chargeName: c.chargeName || '',
//           quantity: c.quantity?.toString() || '1',
//           rate: c.rate?.toString() || '',
//           amount: parseFloat(c.amount) || 0,
//         }))
//         : [{ ...EMPTY_CHARGE }],
//     });
//     setShowEditModal(true);
//   };

//   // ── Filter + Pagination ───────────────────────────────────────────────────
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

//   useEffect(() => { setCurrentPage(1); }, [searchTerm, filterStatus]);

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

//   // ── Export ────────────────────────────────────────────────────────────────
//   const exportToExcel = () => {
//     const headers = ['Invoice ID', 'Patient', 'Doctor', 'Type', 'Date', 'Charges Count', 'Total', 'Status'];
//     const rows = filtered.map(inv => [
//       inv.invoiceId,
//       `"${inv.patientName}"`,
//       `"${inv.doctorName}"`,
//       inv.ipdOpd,
//       inv.date,
//       inv.charges?.length || 0,
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
//       `<tr><td>${inv.invoiceId}</td><td>${inv.patientName}</td><td>${inv.doctorName}</td><td>${inv.ipdOpd}</td><td>${inv.date}</td><td>${inv.charges?.length || 0}</td><td>₹${inv.totalAmount.toLocaleString()}</td><td>${inv.status}</td></tr>`
//     ).join('');
//     const html = `<!DOCTYPE html><html><head><title>Invoices Report</title>
// <style>body{font-family:Arial;margin:30px}h1{color:#059669;text-align:center}table{width:100%;border-collapse:collapse;margin-top:20px}th{background:#059669;color:#fff;padding:10px;text-align:left}td{padding:9px 10px;border-bottom:1px solid #ddd}</style>
// </head><body>
// <h1>MediCare – Invoices Report</h1>
// <p style="text-align:center;color:#64748b">Generated: ${new Date().toLocaleDateString('en-IN')} | Total: ${filtered.length} records</p>
// <table><thead><tr><th>Invoice ID</th><th>Patient</th><th>Doctor</th><th>Type</th><th>Date</th><th>Charges</th><th>Amount</th><th>Status</th></tr></thead>
// <tbody>${rows}</tbody></table></body></html>`;
//     const win = window.open('', '', 'height=600,width=1000');
//     win.document.write(html);
//     win.document.close();
//     win.focus();
//     setTimeout(() => { win.print(); setShowExportMenu(false); }, 250);
//   };

//   const handleCopy = (inv) => {
//     const text = `Invoice ${inv.invoiceId}\nPatient: ${inv.patientName}\nDoctor: ${inv.doctorName}\nType: ${inv.ipdOpd}\nDate: ${inv.date}\nTotal: ₹${inv.totalAmount.toLocaleString()}`;
//     navigator.clipboard.writeText(text).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   // ══════════════════════════════════════════════════════════════════════════
//   // RENDER
//   // ══════════════════════════════════════════════════════════════════════════
//   return (
//     <div className="p-8">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h1 className="text-4xl font-bold text-slate-800 mb-2">Billing & Invoices</h1>
//             <p className="text-slate-600">Manage patient invoices and hospital charges</p>
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
//             { label: 'Today Invoices', value: todayInvoices, color: 'text-slate-800' },
//             { label: 'Total Invoices', value: totalInvoices, color: 'text-green-600' },
//             { label: 'Today Revenue', value: `₹${todayRevenue?.toLocaleString?.() || 0}`, color: 'text-amber-600' },
//             { label: 'Total Revenue', value: `₹${totalRevenue?.toLocaleString?.() || 0}`, color: 'text-emerald-600' },
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
//                   {['Invoice ID', 'Patient', 'Doctor', 'Type', 'Date', 'Charges', 'Total', 'Status', 'Actions'].map(h => (
//                     <th key={h} className={`px-5 py-4 text-left font-semibold text-slate-700 ${h === 'Actions' ? 'text-center' : ''}`}>{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {paginated.length > 0 ? paginated.map(inv => (
//                   <tr key={inv.id} className="hover:bg-emerald-50/40 transition-colors">
//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-2">
//                         <FileText className="w-4 h-4 text-emerald-600 flex-shrink-0" />
//                         <span className="font-semibold text-slate-800">{inv.invoiceId}</span>
//                       </div>
//                     </td>
//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
//                           {inv.patientName.charAt(0)}
//                         </div>
//                         <p className="font-semibold text-slate-800 text-sm">{inv.patientName}</p>
//                       </div>
//                     </td>
//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-2">
//                         <Stethoscope className="w-4 h-4 text-teal-500 flex-shrink-0" />
//                         <p className="font-medium text-slate-700 text-sm">{inv.doctorName}</p>
//                       </div>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${inv.ipdOpd === 'IPD' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
//                         {inv.ipdOpd || 'OPD'}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4 text-slate-600 text-sm">{inv.date}</td>
//                     <td className="px-5 py-4">
//                       <div className="flex flex-wrap gap-1">
//                         {(inv.charges || []).slice(0, 2).map((c, i) => (
//                           <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium">
//                             {c.chargeName || c.category}
//                           </span>
//                         ))}
//                         {(inv.charges || []).length > 2 && (
//                           <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs font-medium">
//                             +{inv.charges.length - 2}
//                           </span>
//                         )}
//                         {(!inv.charges || inv.charges.length === 0) && (
//                           <span className="text-xs text-slate-400">—</span>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span className="font-bold text-slate-800">₹{inv.totalAmount.toLocaleString()}</span>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize flex items-center gap-1.5 w-fit ${statusBadge(inv.status)}`}>
//                         {['active', 'paid'].includes(inv.status) ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
//                         {inv.status}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4">
//                       <div className="flex items-center justify-center gap-1">
//                         <button onClick={() => { setSelectedInvoice(inv); setShowViewModal(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
//                           <Eye className="w-4 h-4" />
//                         </button>
//                         <button onClick={() => printInvoice(inv)} className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors" title="Print">
//                           <Printer className="w-4 h-4" />
//                         </button>
//                         <button onClick={() => { setSelectedInvoice(inv); setShowShareModal(true); }} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Share">
//                           <Send className="w-4 h-4" />
//                         </button>
//                         <button onClick={() => handleEditClick(inv)} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
//                           <FileText className="w-4 h-4" />
//                         </button>
//                         <button onClick={() => { setSelectedInvoice(inv); setShowDeleteModal(true); }} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 )) : (
//                   <tr>
//                     <td colSpan={9} className="py-16 text-center">
//                       <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
//                       <p className="text-slate-500 font-medium">No invoices found</p>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPagesFiltered > 1 && (
//           <div className="px-6 py-4 border-t border-slate-100">
//             <div className="flex items-center justify-between">
//               <p className="text-sm text-slate-600">
//                 Showing <span className="font-semibold">{Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}</span> –{' '}
//                 <span className="font-semibold">{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of{' '}
//                 <span className="font-semibold">{filtered.length}</span>
//               </p>
//               <div className="flex items-center gap-1.5">
//                 <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
//                   className={`p-2 rounded-lg transition-all ${currentPage === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-emerald-50 border border-slate-200'}`}>
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>
//                 {getPageNumbers().map((p, i) =>
//                   p === '...' ? <span key={`e${i}`} className="px-2 text-slate-400 text-sm">…</span> : (
//                     <button key={p} onClick={() => setCurrentPage(p)}
//                       className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${currentPage === p ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' : 'text-slate-600 hover:bg-emerald-50 border border-slate-200'}`}>
//                       {p}
//                     </button>
//                   )
//                 )}
//                 <button onClick={() => setCurrentPage(p => Math.min(totalPagesFiltered, p + 1))} disabled={currentPage === totalPagesFiltered}
//                   className={`p-2 rounded-lg transition-all ${currentPage === totalPagesFiltered ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-emerald-50 border border-slate-200'}`}>
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ── Add Modal ── */}
//       <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); resetForm(); }} title="New Invoice" size="lg">
//         <InvoiceForm
//           form={form}
//           setForm={setForm}
//           patients={patients}
//           doctors={doctors}
//           onSubmit={handleCreate}
//           isSubmitting={isSubmitting}
//           submitLabel="Create Invoice"
//           onCancel={() => { setShowAddModal(false); resetForm(); }}
//         />
//       </Modal>

//       {/* ── Edit Modal ── */}
//       <Modal isOpen={showEditModal} onClose={() => { setShowEditModal(false); resetForm(); }} title="Edit Invoice" size="lg">
//         <InvoiceForm
//           form={form}
//           setForm={setForm}
//           patients={patients}
//           doctors={doctors}
//           onSubmit={handleUpdate}
//           isSubmitting={isSubmitting}
//           submitLabel="Update Invoice"
//           onCancel={() => { setShowEditModal(false); resetForm(); }}
//         />
//       </Modal>

//       {/* ── View Modal ── */}
//       <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Invoice Details" size="md">
//         {selectedInvoice && (
//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-3">
//               {[
//                 { label: 'Invoice ID', value: selectedInvoice.invoiceId },
//                 { label: 'Date', value: selectedInvoice.date },
//                 { label: 'Patient', value: selectedInvoice.patientName },
//                 { label: 'Doctor', value: selectedInvoice.doctorName },
//                 { label: 'Type', value: selectedInvoice.ipdOpd || 'OPD' },
//                 { label: 'Status', value: selectedInvoice.status },
//               ].map(row => (
//                 <div key={row.label} className="bg-slate-50 rounded-xl px-4 py-3">
//                   <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{row.label}</p>
//                   <p className="text-sm font-semibold text-slate-800 capitalize">{row.value}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Charges Table */}
//             <div>
//               <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Charges</p>
//               <div className="rounded-xl overflow-hidden border border-slate-200">
//                 <table className="w-full text-sm">
//                   <thead className="bg-gradient-to-r from-emerald-50 to-teal-50">
//                     <tr>
//                       {['Category', 'Charge Name', 'Qty', 'Rate', 'Amount'].map(h => (
//                         <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-slate-600">{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-100">
//                     {(selectedInvoice.charges || []).map((c, i) => (
//                       <tr key={i} className="hover:bg-slate-50">
//                         <td className="px-3 py-2.5 text-slate-700 font-medium">{c.category}</td>
//                         <td className="px-3 py-2.5 text-slate-700">{c.chargeName}</td>
//                         <td className="px-3 py-2.5 text-slate-600">{c.quantity}</td>
//                         <td className="px-3 py-2.5 text-slate-600">₹{parseFloat(c.rate || 0).toLocaleString()}</td>
//                         <td className="px-3 py-2.5 font-semibold text-slate-800">₹{parseFloat(c.amount || 0).toLocaleString()}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                   <tfoot>
//                     <tr className="bg-emerald-50">
//                       <td colSpan={4} className="px-3 py-2.5 font-bold text-slate-700">Grand Total</td>
//                       <td className="px-3 py-2.5 font-bold text-emerald-700">₹{selectedInvoice.totalAmount.toLocaleString()}</td>
//                     </tr>
//                   </tfoot>
//                 </table>
//               </div>
//             </div>

//             {selectedInvoice.notes && (
//               <div className="bg-amber-50 rounded-xl px-4 py-3 border border-amber-100">
//                 <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">Remarks</p>
//                 <p className="text-sm text-slate-700">{selectedInvoice.notes}</p>
//               </div>
//             )}

//             <div className="flex gap-3 pt-1">
//               <button onClick={() => printInvoice(selectedInvoice)} className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
//                 <Printer className="w-4 h-4" /> Print
//               </button>
//               <button onClick={() => { setShowViewModal(false); setShowShareModal(true); }} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg flex items-center justify-center gap-2">
//                 <Send className="w-4 h-4" /> Share
//               </button>
//             </div>
//           </div>
//         )}
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
//                 <span className="text-slate-600">{selectedInvoice.charges?.length || 0} charge(s) · {selectedInvoice.ipdOpd}</span>
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
//               <button onClick={() => printInvoice(selectedInvoice)} className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 hover:bg-emerald-50 rounded-xl transition-colors border border-slate-200">
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















// 'use client';

// import { useState, useEffect, useMemo, useCallback } from 'react';
// import {
//   Plus, Search, Download, Eye, Send, X, ChevronDown,
//   FileText, Sheet, Stethoscope, Trash2,
//   Copy, Check, Printer, CheckCircle, Clock,
//   ChevronLeft, ChevronRight, Loader2, QrCode, Wind
// } from 'lucide-react';
// import {
//   createHospitalInvoiceApi, getHospitalInvoiceApi, updateHospitalInvoiceApi,
//   deleteHospitalInvoiceApi, getPatients, getDoctorApi, countHospitalInvoiceApi
// } from '../../lib/commonApis';
// import { showToast } from '../../lib/notification';

// // ── Charge Categories ─────────────────────────────────────────────────────────
// const CHARGE_CATEGORIES = {
//   'Consultation': ['OPD Doctor Fee', 'Specialist Consultation Fee', 'Follow-up Consultation', 'Tele-consultation'],
//   'Room / Bed': ['General Ward (per day)', 'Semi-Private Room (per day)', 'Private Room (per day)', 'Deluxe / Suite Room (per day)', 'ICU (per day)', 'HDU - High Dependency Unit (per day)'],
//   'Nursing': ['Nursing Care (per day)', 'Special / Private Nurse', 'Night Nurse'],
//   'Diagnostic / Lab': ['Blood Test', 'Urine Test', 'ECG', 'X-Ray', 'Ultrasound', 'CT Scan', 'MRI', 'Biopsy / Pathology'],
//   'Procedure / Treatment': ['Minor Procedure', 'Major Procedure', 'Dressing / Injection', 'Dialysis', 'Chemotherapy', 'Physiotherapy Session'],
//   'OT Charges': ['Operation Theatre Charges', 'Surgeon Fee', 'Anaesthetist Fee', 'Assistant Surgeon Fee', 'OT Consumables'],
//   'Pharmacy': ['Medicines', 'IV Fluids', 'Consumables (Gloves, Syringes etc.)', 'Implants / Stents / Prosthetics'],
//   'Diet': ['Regular Diet (per day)', 'Special / Diabetic Diet (per day)', 'Liquid Diet (per day)'],
//   'Ambulance': ['Ambulance (Arrival)', 'Ambulance (Transfer)', 'Emergency Ambulance'],
//   'Miscellaneous': ['Admission Fee', 'Registration Fee', 'Medical Certificate', 'Discharge Summary', 'Attendant Charges', 'Laundry'],
// };

// const CATEGORY_NAMES = Object.keys(CHARGE_CATEGORIES);
// const EMPTY_CHARGE = { category: '', chargeName: '', quantity: '1', rate: '', amount: 0 };
// const EMPTY_OXYGEN = { enabled: false, description: '', quantity: '', rate: '', amount: 0 };
// const IPD_OPD_OPTIONS = ['OPD', 'IPD'];
// const ITEMS_PER_PAGE = 10;

// // UPI details — change as needed
// const UPI_ID = 'shivamkumar2177@ybl';
// const HOSPITAL_NAME = 'MediCare Hospital';
// const HOSPITAL_ADDRESS = '123 Health Avenue, New Delhi – 110001';
// const HOSPITAL_PHONE = '+91 11 2345 6789';
// const HOSPITAL_EMAIL = 'billing@medicare.in';

// // ── QR URL (UPI deep-link via qrserver.com) ───────────────────────────────────
// function getQRUrl(invoiceId, amount) {
//   const upiString = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(HOSPITAL_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent('Invoice ' + invoiceId)}`;
//   return `https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(upiString)}`;
// }

// // ── Print Invoice ─────────────────────────────────────────────────────────────
// function printInvoice(inv) {
//   const chargeRows = (inv.charges || []).map(c => `
//     <tr>
//       <td>${c.category}</td>
//       <td>${c.chargeName}</td>
//       <td style="text-align:center">${c.quantity}</td>
//       <td style="text-align:right">₹${parseFloat(c.rate || 0).toLocaleString('en-IN')}</td>
//       <td style="text-align:right">₹${parseFloat(c.amount || 0).toLocaleString('en-IN')}</td>
//     </tr>`).join('');

//   const oxygenRow = inv.oxygenCharges?.enabled ? `
//     <tr class="oxy-row">
//       <td><span style="display:flex;align-items:center;gap:5px">🌬️ Oxygen</span></td>
//       <td>${inv.oxygenCharges.description || 'Oxygen Charges'}</td>
//       <td style="text-align:center">${inv.oxygenCharges.quantity || 1}</td>
//       <td style="text-align:right">₹${parseFloat(inv.oxygenCharges.rate || 0).toLocaleString('en-IN')}</td>
//       <td style="text-align:right">₹${parseFloat(inv.oxygenCharges.amount || 0).toLocaleString('en-IN')}</td>
//     </tr>` : '';

//   const qrUrl = getQRUrl(inv.invoiceId, inv.totalAmount);

//   const html = `<!DOCTYPE html>
// <html><head><title>Invoice ${inv.invoiceId}</title>
// <style>
//   *{margin:0;padding:0;box-sizing:border-box}
//   body{font-family:'Segoe UI',Arial,sans-serif;background:#fff;color:#1e293b}
//   .page{max-width:800px;margin:30px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 20px rgba(0,0,0,.08)}
//   .header{background:linear-gradient(135deg,#059669 0%,#0d9488 100%);color:#fff;padding:28px 36px;display:flex;justify-content:space-between;align-items:flex-start}
//   .h-left h1{font-size:22px;font-weight:800;letter-spacing:-.3px}
//   .h-left p{margin-top:5px;opacity:.82;font-size:11px;line-height:1.7}
//   .h-right{text-align:right}
//   .inv-label{font-size:9px;opacity:.7;text-transform:uppercase;letter-spacing:1.5px}
//   .inv-num{font-size:19px;font-weight:800;background:rgba(255,255,255,.18);padding:4px 14px;border-radius:8px;display:inline-block;margin-top:3px}
//   .inv-date{font-size:11px;opacity:.78;margin-top:4px}
//   .body{padding:28px 36px}
//   .meta{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:22px;background:#f8fafc;border-radius:10px;padding:16px;border:1px solid #e2e8f0}
//   .m-block h3{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#94a3b8;margin-bottom:4px}
//   .m-block p{font-size:14px;font-weight:600;color:#1e293b}
//   .m-block .sub{font-size:11px;color:#64748b;margin-top:1px}
//   .badge{display:inline-block;padding:2px 10px;border-radius:99px;font-size:10px;font-weight:700;text-transform:uppercase}
//   .opd{background:#dbeafe;color:#1d4ed8}.ipd{background:#ede9fe;color:#6d28d9}
//   table{width:100%;border-collapse:collapse}
//   thead tr{background:#f1f5f9}
//   th{padding:9px 12px;text-align:left;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#64748b;border-bottom:2px solid #e2e8f0}
//   td{padding:9px 12px;border-bottom:1px solid #f1f5f9;font-size:13px;color:#334155}
//   .oxy-row td{background:#f0f9ff;color:#0369a1;font-weight:500}
//   tfoot td{padding:11px 12px;background:#f0fdf4;font-weight:700;border-top:2px solid #d1fae5}
//   .total-lbl{font-size:13px;color:#065f46}
//   .total-val{font-size:16px;font-weight:800;color:#059669}
//   .footer-area{display:flex;justify-content:space-between;align-items:flex-start;margin-top:22px;padding-top:22px;border-top:1px solid #e2e8f0;gap:24px}
//   .pay-info h4{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;margin-bottom:6px}
//   .pay-info p{font-size:12px;color:#475569;line-height:1.6}
//   .upi-id{color:#059669;font-weight:700}
//   .qr-wrap{text-align:center;flex-shrink:0}
//   .qr-wrap img{width:120px;height:120px;border:3px solid #d1fae5;border-radius:10px;padding:4px;background:#fff}
//   .qr-wrap .qlabel{font-size:10px;color:#64748b;margin-top:5px;font-weight:600}
//   .qr-wrap .qamt{font-size:12px;font-weight:800;color:#059669;margin-top:2px}
//   .footer{text-align:center;color:#94a3b8;font-size:11px;padding:12px 36px;border-top:1px solid #f1f5f9;margin-top:6px}
//   @media print{body{background:#fff}.page{margin:0;box-shadow:none;border-radius:0}}
// </style>
// </head><body>
// <div class="page">
//   <div class="header">
//     <div class="h-left">
//       <h1>🏥 ${HOSPITAL_NAME}</h1>
//       <p>${HOSPITAL_ADDRESS}<br>${HOSPITAL_EMAIL} &nbsp;|&nbsp; ${HOSPITAL_PHONE}</p>
//     </div>
//     <div class="h-right">
//       <div class="inv-label">Invoice</div>
//       <div class="inv-num">${inv.invoiceId}</div>
//       <div class="inv-date">${inv.date}</div>
//     </div>
//   </div>

//   <div class="body">
//     <div class="meta">
//       <div class="m-block">
//         <h3>Patient</h3>
//         <p>${inv.patientName}</p>
//         <p class="sub">ID: ${inv.patientId}</p>
//       </div>
//       <div class="m-block">
//         <h3>Doctor</h3>
//         <p>${inv.doctorName}</p>
//         <p class="sub">ID: ${inv.doctorId}</p>
//       </div>
//       <div class="m-block">
//         <h3>Visit Type</h3>
//         <span class="badge ${(inv.ipdOpd || 'OPD').toLowerCase()}">${inv.ipdOpd || 'OPD'}</span>
//         <p class="sub" style="margin-top:6px;text-transform:capitalize">Status: ${inv.status}</p>
//       </div>
//     </div>

//     <table>
//       <thead>
//         <tr>
//           <th>Category</th><th>Charge Name</th>
//           <th style="text-align:center">Qty</th>
//           <th style="text-align:right">Rate</th>
//           <th style="text-align:right">Amount</th>
//         </tr>
//       </thead>
//       <tbody>
//         ${chargeRows}
//         ${oxygenRow}
//       </tbody>
//       <tfoot>
//         <tr>
//           <td colspan="4" class="total-lbl">Grand Total</td>
//           <td style="text-align:right" class="total-val">₹${inv.totalAmount.toLocaleString('en-IN')}</td>
//         </tr>
//       </tfoot>
//     </table>

//     <div class="footer-area">
//       <div class="pay-info" style="flex:1">
//         ${inv.notes ? `<h4>Remarks</h4><p style="margin-bottom:12px">${inv.notes}</p>` : ''}
//         <h4>Payment</h4>
//         <p>UPI ID: <span class="upi-id">${UPI_ID}</span><br>
//         Scan the QR code to pay instantly via any UPI app<br>
//         <span style="color:#94a3b8;font-size:11px">This invoice is valid for 30 days from the date of issue.</span></p>
//       </div>
//       <div class="qr-wrap">
//         <img src="${qrUrl}" alt="UPI Payment QR" />
//         <div class="qlabel">Scan & Pay</div>
//         <div class="qamt">₹${inv.totalAmount.toLocaleString('en-IN')}</div>
//       </div>
//     </div>
//   </div>

//   <div class="footer">
//     Thank you for choosing ${HOSPITAL_NAME} &nbsp;•&nbsp; Get well soon! &nbsp;•&nbsp; ${HOSPITAL_PHONE}
//   </div>
// </div>
// </body></html>`;

//   const win = window.open('', '_blank', 'height=800,width=920');
//   win.document.write(html);
//   win.document.close();
//   win.focus();
//   setTimeout(() => win.print(), 700);
// }

// // ── Modal ─────────────────────────────────────────────────────────────────────
// function Modal({ isOpen, onClose, title, children, size = 'md' }) {
//   if (!isOpen) return null;
//   const sizeMap = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-5xl' };
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

// // ── Single Charge Row ─────────────────────────────────────────────────────────
// function ChargeRow({ charge, idx, onChange, onRemove, isOnly }) {
//   const subItems = charge.category ? (CHARGE_CATEGORIES[charge.category] || []) : [];
//   const handleField = (field, value) => {
//     const updated = { ...charge, [field]: value };
//     if (field === 'category') updated.chargeName = '';
//     if (field === 'quantity' || field === 'rate') {
//       const qty = parseFloat(field === 'quantity' ? value : updated.quantity) || 0;
//       const rate = parseFloat(field === 'rate' ? value : updated.rate) || 0;
//       updated.amount = qty * rate;
//     }
//     onChange(idx, updated);
//   };
//   return (
//     <div className="grid grid-cols-12 gap-2 items-center bg-slate-50 rounded-xl p-2.5 border border-slate-100">
//       <select value={charge.category} onChange={e => handleField('category', e.target.value)} required
//         className="col-span-3 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm">
//         <option value="">Select Category</option>
//         {CATEGORY_NAMES.map(c => <option key={c} value={c}>{c}</option>)}
//       </select>
//       <select value={charge.chargeName} onChange={e => handleField('chargeName', e.target.value)} required disabled={!charge.category}
//         className="col-span-3 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm disabled:opacity-50">
//         <option value="">Select Charge</option>
//         {subItems.map(s => <option key={s} value={s}>{s}</option>)}
//       </select>
//       <input type="number" placeholder="Qty" value={charge.quantity} min="1" onChange={e => handleField('quantity', e.target.value)} required
//         className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm" />
//       <input type="number" placeholder="Rate ₹" value={charge.rate} min="0" onChange={e => handleField('rate', e.target.value)} required
//         className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm" />
//       <div className="col-span-1 px-2 py-2 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-700 text-sm font-semibold text-center">
//         ₹{(charge.amount || 0).toLocaleString('en-IN')}
//       </div>
//       <button type="button" onClick={() => onRemove(idx)} disabled={isOnly}
//         className="col-span-1 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed">
//         <Trash2 className="w-4 h-4" />
//       </button>
//     </div>
//   );
// }

// // ── Invoice Form (shared Add/Edit) ────────────────────────────────────────────
// function InvoiceForm({ form, setForm, patients, doctors, onSubmit, onPrint, isSubmitting, submitLabel, onCancel }) {
//   const chargesTotal = form.charges.reduce((s, c) => s + (parseFloat(c.amount) || 0), 0);
//   const oxyAmt = form.oxygenCharges?.enabled
//     ? (parseFloat(form.oxygenCharges.quantity || 0) * parseFloat(form.oxygenCharges.rate || 0)) : 0;
//   const grandTotal = chargesTotal + oxyAmt;

//   const set = (name, value) => setForm(p => ({ ...p, [name]: value }));

//   const setOxy = (field, value) => setForm(p => {
//     const oxy = { ...p.oxygenCharges, [field]: value };
//     if (field === 'quantity' || field === 'rate') {
//       oxy.amount = (parseFloat(field === 'quantity' ? value : oxy.quantity) || 0) *
//         (parseFloat(field === 'rate' ? value : oxy.rate) || 0);
//     }
//     return { ...p, oxygenCharges: oxy };
//   });

//   const updateCharge = (idx, updated) =>
//     setForm(p => ({ ...p, charges: p.charges.map((c, i) => i === idx ? updated : c) }));
//   const addCharge = () => setForm(p => ({ ...p, charges: [...p.charges, { ...EMPTY_CHARGE }] }));
//   const removeCharge = (idx) => {
//     if (form.charges.length === 1) return;
//     setForm(p => ({ ...p, charges: p.charges.filter((_, i) => i !== idx) }));
//   };

//   return (
//     <form onSubmit={onSubmit} className="space-y-5">
//       {/* Header Fields */}
//       <div className="grid grid-cols-3 gap-4">
//         <div>
//           <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Patient *</label>
//           <select value={form.patientId} onChange={e => set('patientId', e.target.value)} required
//             className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm">
//             <option value="">Select Patient</option>
//             {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
//           </select>
//         </div>
//         <div>
//           <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Doctor *</label>
//           <select value={form.doctorId} onChange={e => set('doctorId', e.target.value)} required
//             className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm">
//             <option value="">Select Doctor</option>
//             {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
//           </select>
//         </div>
//         <div>
//           <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">IPD / OPD *</label>
//           <select value={form.ipdOpd} onChange={e => set('ipdOpd', e.target.value)} required
//             className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm">
//             <option value="">Select Type</option>
//             {IPD_OPD_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
//           </select>
//         </div>
//       </div>

//       {/* Charges Section */}
//       <div>
//         <div className="flex items-center justify-between mb-2">
//           <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Charges *</label>
//           <button type="button" onClick={addCharge}
//             className="text-xs font-semibold text-emerald-600 flex items-center gap-1 px-3 py-1.5 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
//             <Plus className="w-3.5 h-3.5" /> Add Charge
//           </button>
//         </div>
//         <div className="grid grid-cols-12 gap-2 px-1 mb-1.5">
//           {[{l:'Category',s:'col-span-3'},{l:'Charge Name',s:'col-span-3'},{l:'Qty',s:'col-span-2'},{l:'Rate (₹)',s:'col-span-2'},{l:'Amount',s:'col-span-1'},{l:'',s:'col-span-1'}]
//             .map(h => <div key={h.l} className={`text-xs font-semibold text-slate-400 uppercase tracking-wider ${h.s}`}>{h.l}</div>)}
//         </div>
//         <div className="space-y-2">
//           {form.charges.map((charge, idx) => (
//             <ChargeRow key={idx} charge={charge} idx={idx} onChange={updateCharge} onRemove={removeCharge} isOnly={form.charges.length === 1} />
//           ))}
//         </div>
//       </div>

//       {/* ── Oxygen Charges (Optional Checkbox) ── */}
//       <div className={`rounded-xl border-2 transition-all duration-200 overflow-hidden ${form.oxygenCharges?.enabled ? 'border-sky-200 bg-sky-50/60' : 'border-slate-100 bg-slate-50'}`}>
//         {/* Checkbox Header */}
//         <div className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none"
//           onClick={() => setOxy('enabled', !form.oxygenCharges?.enabled)}>
//           <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${form.oxygenCharges?.enabled ? 'bg-sky-500 border-sky-500' : 'border-slate-300 bg-white'}`}>
//             {form.oxygenCharges?.enabled && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
//           </div>
//           <Wind className={`w-4 h-4 flex-shrink-0 ${form.oxygenCharges?.enabled ? 'text-sky-500' : 'text-slate-400'}`} />
//           <span className={`text-sm font-semibold ${form.oxygenCharges?.enabled ? 'text-sky-700' : 'text-slate-500'}`}>
//             Oxygen Charges
//           </span>
//           <span className={`text-xs ml-1 ${form.oxygenCharges?.enabled ? 'text-sky-500' : 'text-slate-400'}`}>(optional)</span>
//           {form.oxygenCharges?.enabled && oxyAmt > 0 && (
//             <span className="ml-auto text-sm font-bold text-sky-600">₹{oxyAmt.toLocaleString('en-IN')}</span>
//           )}
//         </div>

//         {/* Input Row — only when checked */}
//         {form.oxygenCharges?.enabled && (
//           <div className="px-4 pb-4 pt-1 grid grid-cols-3 gap-3 border-t border-sky-100">
//             <div>
//               <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Description</label>
//               <input type="text" placeholder="e.g. Oxygen (per hour)"
//                 value={form.oxygenCharges.description || ''}
//                 onChange={e => setOxy('description', e.target.value)}
//                 className="w-full px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-sky-400 text-slate-700 text-sm" />
//             </div>
//             <div>
//               <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Qty / Hours</label>
//               <input type="number" placeholder="Enter quantity" min="1"
//                 value={form.oxygenCharges.quantity || ''}
//                 onChange={e => setOxy('quantity', e.target.value)}
//                 className="w-full px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-sky-400 text-slate-700 text-sm" />
//             </div>
//             <div>
//               <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Rate (₹)</label>
//               <input type="number" placeholder="Rate per unit" min="0"
//                 value={form.oxygenCharges.rate || ''}
//                 onChange={e => setOxy('rate', e.target.value)}
//                 className="w-full px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-sky-400 text-slate-700 text-sm" />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Grand Total */}
//       <div className="flex justify-end">
//         <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl px-6 py-3 border border-emerald-200">
//           <span className="text-sm text-emerald-700 font-medium">Grand Total: </span>
//           <span className="text-xl font-bold text-emerald-700">₹{grandTotal.toLocaleString('en-IN')}</span>
//         </div>
//       </div>

//       {/* Remarks */}
//       <div>
//         <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Remarks (optional)</label>
//         <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={2}
//           placeholder="Any additional notes..."
//           className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm resize-none" />
//       </div>

//       {/* QR hint */}
//       <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-100">
//         <QrCode className="w-4 h-4 text-emerald-500 flex-shrink-0" />
//         <p className="text-xs text-slate-500">
//           <span className="font-semibold text-slate-600">Payment QR Code</span> (UPI: {UPI_ID}) will be printed on the invoice automatically.
//         </p>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-3 pt-1">
//         <button type="button" onClick={onCancel}
//           className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
//           Cancel
//         </button>
//         <button type="button" onClick={onPrint}
//           className="flex-1 py-2.5 rounded-xl border-2 border-emerald-200 text-emerald-700 font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2">
//           <Printer className="w-4 h-4" /> Print Preview
//         </button>
//         <button type="submit" disabled={isSubmitting}
//           className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg disabled:opacity-60 flex items-center justify-center gap-2">
//           {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
//           {isSubmitting ? 'Saving...' : submitLabel}
//         </button>
//       </div>
//     </form>
//   );
// }

// // ── Status Badge Helper ───────────────────────────────────────────────────────
// function statusBadge(s) {
//   switch ((s || '').toLowerCase()) {
//     case 'paid': case 'active': return 'bg-green-100 text-green-700';
//     case 'pending': return 'bg-amber-100 text-amber-700';
//     case 'cancelled': return 'bg-red-100 text-red-700';
//     case 'completed': return 'bg-blue-100 text-blue-700';
//     default: return 'bg-slate-100 text-slate-700';
//   }
// }

// // ── Build print-ready obj from form ──────────────────────────────────────────
// function buildPrintObj(form, patients, doctors, invoiceId = 'PREVIEW') {
//   const patient = patients.find(p => String(p.id) === String(form.patientId));
//   const doctor = doctors.find(d => String(d.id) === String(form.doctorId));
//   const chargesTotal = form.charges.reduce((s, c) => s + (parseFloat(c.amount) || 0), 0);
//   const oxyAmt = form.oxygenCharges?.enabled
//     ? (parseFloat(form.oxygenCharges.quantity || 0) * parseFloat(form.oxygenCharges.rate || 0)) : 0;
//   return {
//     invoiceId,
//     patientId: form.patientId || '—',
//     patientName: patient?.name || 'Patient',
//     doctorId: form.doctorId || '—',
//     doctorName: doctor?.name || 'Doctor',
//     ipdOpd: form.ipdOpd,
//     date: new Date().toISOString().split('T')[0],
//     status: 'active',
//     charges: form.charges,
//     oxygenCharges: form.oxygenCharges,
//     totalAmount: chargesTotal + oxyAmt,
//     notes: form.notes,
//   };
// }

// // ── Empty form ────────────────────────────────────────────────────────────────
// const EMPTY_FORM = {
//   patientId: '', doctorId: '', ipdOpd: '',
//   charges: [{ ...EMPTY_CHARGE }],
//   oxygenCharges: { ...EMPTY_OXYGEN },
//   notes: '',
// };

// // ══════════════════════════════════════════════════════════════════════════════
// // MAIN PAGE
// // ══════════════════════════════════════════════════════════════════════════════
// export default function BillingPage() {
//   const [patients, setPatients] = useState([]);
//   const [doctors, setDoctors] = useState([]);
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
//   const [todayInvoices, setTodayInvoices] = useState(0);
//   const [totalInvoices, setTotalInvoices] = useState(0);
//   const [todayRevenue, setTodayRevenue] = useState(0);
//   const [totalRevenue, setTotalRevenue] = useState(0);
//   const [form, setForm] = useState({ ...EMPTY_FORM, charges: [{ ...EMPTY_CHARGE }], oxygenCharges: { ...EMPTY_OXYGEN } });

//   const resetForm = () => setForm({ ...EMPTY_FORM, charges: [{ ...EMPTY_CHARGE }], oxygenCharges: { ...EMPTY_OXYGEN } });

//   // ── Loaders ───────────────────────────────────────────────────────────────
//   const loadInvoices = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await getInvoiceApi(1000, 1);
//       const arr = res?.data?.invoices || res?.data || res || [];
//       setInvoices(Array.isArray(arr) ? arr.map(item => {
//         const cTotal = (item.charges || []).reduce((s, c) => s + (parseFloat(c.amount) || 0), 0);
//         const oAmt = item.oxygenCharges?.enabled
//           ? (parseFloat(item.oxygenCharges.quantity || 0) * parseFloat(item.oxygenCharges.rate || 0)) : 0;
//         return {
//           id: item.id,
//           invoiceId: item.invoiceId || `INV-${item.id}`,
//           patientId: item.patientId,
//           patientName: item.patient?.name || `Patient #${item.patientId}`,
//           doctorId: item.doctorId,
//           doctorName: item.doctor?.name || `Doctor #${item.doctorId}`,
//           ipdOpd: item.ipdOpd || 'OPD',
//           date: item.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0],
//           status: item.status?.toLowerCase() || 'active',
//           charges: item.charges || [],
//           oxygenCharges: item.oxygenCharges || { enabled: false },
//           totalAmount: parseFloat(item.totalPrice) || cTotal + oAmt || 0,
//           notes: item.notes || '',
//         };
//       }) : []);
//     } catch { showToast('error', 'Failed', 'Failed to load invoices!'); }
//     finally { setLoading(false); }
//   }, []);

//   const loadPatients = useCallback(async () => {
//     try {
//       const res = await getPatients(100, 1);
//       setPatients((res?.data?.data || res?.data || []).map(i => ({ id: i.id, name: i.name })));
//     } catch { setPatients([]); }
//   }, []);

//   const loadDoctors = useCallback(async () => {
//     try {
//       const res = await getDoctorApi(100, 1);
//       const arr = res?.data?.data || res?.data || [];
//       setDoctors((arr.doctors || arr).map(i => ({ id: i.id, name: i.name })));
//     } catch { setDoctors([]); }
//   }, []);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await countInvoiceApi();
//         setTodayInvoices(res.data.todayInvoices);
//         setTodayRevenue(res.data.todayRevenue);
//         setTotalRevenue(res.data.totalRevenue);
//         setTotalInvoices(res.data.totalInvoices);
//       } catch { }
//     })();
//     loadInvoices(); loadPatients(); loadDoctors();
//   }, [loadInvoices]);

//   // ── Payload builder ───────────────────────────────────────────────────────
//   const buildPayload = () => {
//     const cTotal = form.charges.reduce((s, c) => s + (parseFloat(c.amount) || 0), 0);
//     const oAmt = form.oxygenCharges?.enabled
//       ? (parseFloat(form.oxygenCharges.quantity || 0) * parseFloat(form.oxygenCharges.rate || 0)) : 0;
//     return {
//       patientId: parseInt(form.patientId),
//       doctorId: parseInt(form.doctorId),
//       ipdOpd: form.ipdOpd,
//       notes: form.notes,
//       charges: form.charges.map(c => ({
//         category: c.category, chargeName: c.chargeName,
//         quantity: parseFloat(c.quantity) || 1,
//         rate: parseFloat(c.rate) || 0,
//         amount: parseFloat(c.amount) || 0,
//       })),
//       oxygenCharges: form.oxygenCharges?.enabled ? {
//         enabled: true,
//         description: form.oxygenCharges.description,
//         quantity: parseFloat(form.oxygenCharges.quantity) || 1,
//         rate: parseFloat(form.oxygenCharges.rate) || 0,
//         amount: oAmt,
//       } : { enabled: false },
//       totalPrice: cTotal + oAmt,
//     };
//   };

//   // ── Create → auto print ───────────────────────────────────────────────────
//   const handleCreate = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       const res = await createInvoiceApi(buildPayload());
//       const newId = res?.data?.invoiceId || (res?.data?.id ? `INV-${res.data.id}` : 'INV-NEW');
//       await loadInvoices();
//       const printObj = buildPrintObj(form, patients, doctors, newId);
//       setShowAddModal(false);
//       resetForm();
//       setCurrentPage(1);
//       printInvoice(printObj);           // ← directly opens print
//       showToast('success', 'Created', 'Invoice saved & sent to print!');
//     } catch { showToast('error', 'Failed', 'Failed to create invoice!'); }
//     finally { setIsSubmitting(false); }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!selectedInvoice) return;
//     setIsSubmitting(true);
//     try {
//       await updateInvoiceApi(selectedInvoice.id, buildPayload());
//       await loadInvoices();
//       setShowEditModal(false); setSelectedInvoice(null); resetForm();
//       showToast('success', 'Updated', 'Invoice updated successfully!');
//     } catch (err) { showToast('error', 'Failed', err.message || 'Failed to update invoice!'); }
//     finally { setIsSubmitting(false); }
//   };

//   const handleDelete = async () => {
//     if (!selectedInvoice) return;
//     setIsSubmitting(true);
//     try {
//       await deleteInvoiceApi(selectedInvoice.id);
//       await loadInvoices();
//       setShowDeleteModal(false); setSelectedInvoice(null);
//       showToast('success', 'Deleted', 'Invoice deleted!');
//     } catch { showToast('error', 'Failed', 'Failed to delete invoice!'); }
//     finally { setIsSubmitting(false); }
//   };

//   const handleEditClick = (inv) => {
//     setSelectedInvoice(inv);
//     setForm({
//       patientId: inv.patientId?.toString() || '',
//       doctorId: inv.doctorId?.toString() || '',
//       ipdOpd: inv.ipdOpd || '',
//       notes: inv.notes || '',
//       charges: inv.charges?.length > 0
//         ? inv.charges.map(c => ({ category: c.category || '', chargeName: c.chargeName || '', quantity: c.quantity?.toString() || '1', rate: c.rate?.toString() || '', amount: parseFloat(c.amount) || 0 }))
//         : [{ ...EMPTY_CHARGE }],
//       oxygenCharges: inv.oxygenCharges?.enabled
//         ? { ...inv.oxygenCharges, quantity: inv.oxygenCharges.quantity?.toString() || '', rate: inv.oxygenCharges.rate?.toString() || '' }
//         : { ...EMPTY_OXYGEN },
//     });
//     setShowEditModal(true);
//   };

//   const handleFormPrint = () => printInvoice(buildPrintObj(form, patients, doctors));

//   // ── Filter + Paginate ─────────────────────────────────────────────────────
//   const filtered = useMemo(() => {
//     const s = searchTerm.toLowerCase();
//     return invoices.filter(inv =>
//       ((inv.invoiceId || '').toLowerCase().includes(s) ||
//         (inv.patientName || '').toLowerCase().includes(s) ||
//         (inv.doctorName || '').toLowerCase().includes(s)) &&
//       (filterStatus === 'all' || inv.status === filterStatus)
//     );
//   }, [invoices, searchTerm, filterStatus]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
//   useEffect(() => setCurrentPage(1), [searchTerm, filterStatus]);

//   const paginated = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return filtered.slice(start, start + ITEMS_PER_PAGE);
//   }, [filtered, currentPage]);

//   const pageNums = () => {
//     const p = [];
//     if (totalPages <= 7) for (let i = 1; i <= totalPages; i++) p.push(i);
//     else if (currentPage <= 4) p.push(1, 2, 3, 4, 5, '...', totalPages);
//     else if (currentPage >= totalPages - 3) p.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
//     else p.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
//     return p;
//   };

//   const exportToExcel = () => {
//     const rows = filtered.map(inv => [inv.invoiceId, `"${inv.patientName}"`, `"${inv.doctorName}"`, inv.ipdOpd, inv.date, inv.charges?.length || 0, inv.oxygenCharges?.enabled ? `₹${inv.oxygenCharges.amount}` : 'N/A', inv.totalAmount, inv.status].join(','));
//     const csv = [['Invoice ID', 'Patient', 'Doctor', 'Type', 'Date', 'Charges', 'Oxygen', 'Total', 'Status'].join(','), ...rows].join('\n');
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
//     link.download = `invoices_${new Date().toISOString().split('T')[0]}.csv`;
//     document.body.appendChild(link); link.click(); document.body.removeChild(link);
//     setShowExportMenu(false);
//   };

//   const exportToPDF = () => {
//     const rows = filtered.map(inv => `<tr><td>${inv.invoiceId}</td><td>${inv.patientName}</td><td>${inv.doctorName}</td><td>${inv.ipdOpd}</td><td>${inv.date}</td><td>₹${inv.totalAmount.toLocaleString('en-IN')}</td><td>${inv.status}</td></tr>`).join('');
//     const win = window.open('', '', 'height=600,width=1000');
//     win.document.write(`<!DOCTYPE html><html><head><style>body{font-family:Arial;margin:30px}h1{color:#059669;text-align:center}table{width:100%;border-collapse:collapse;margin-top:20px}th{background:#059669;color:#fff;padding:10px}td{padding:9px;border-bottom:1px solid #ddd}</style></head><body><h1>MediCare – Invoices</h1><table><thead><tr><th>ID</th><th>Patient</th><th>Doctor</th><th>Type</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></body></html>`);
//     win.document.close(); setTimeout(() => { win.print(); setShowExportMenu(false); }, 250);
//   };

//   const handleCopy = (inv) => {
//     navigator.clipboard.writeText(`Invoice ${inv.invoiceId}\nPatient: ${inv.patientName}\nDoctor: ${inv.doctorName}\nType: ${inv.ipdOpd}\nDate: ${inv.date}\nTotal: ₹${inv.totalAmount.toLocaleString('en-IN')}\nPay via UPI: ${UPI_ID}`);
//     setCopied(true); setTimeout(() => setCopied(false), 2000);
//   };

//   // ══════════════════════════════════════════════════════════════════════════
//   return (
//     <div className="p-8">
//       {/* Page Header */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h1 className="text-4xl font-bold text-slate-800 mb-2">Billing & Invoices</h1>
//             <p className="text-slate-600">Manage patient invoices and hospital charges</p>
//           </div>
//           <div className="flex gap-3">
//             <div className="relative">
//               <button onClick={() => setShowExportMenu(v => !v)}
//                 className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium shadow-sm transition-all">
//                 <Download className="w-4 h-4" /> Export <ChevronDown className="w-4 h-4" />
//               </button>
//               {showExportMenu && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 z-10 overflow-hidden">
//                   <button onClick={exportToExcel} className="w-full px-4 py-3 text-left hover:bg-emerald-50 flex items-center gap-3 text-slate-700">
//                     <Sheet className="w-4 h-4 text-green-600" /><span className="font-medium">Export to Excel</span>
//                   </button>
//                   <button onClick={exportToPDF} className="w-full px-4 py-3 text-left hover:bg-emerald-50 flex items-center gap-3 text-slate-700 border-t border-slate-100">
//                     <FileText className="w-4 h-4 text-red-600" /><span className="font-medium">Export to PDF</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//             <button onClick={() => setShowAddModal(true)}
//               className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 flex items-center gap-2 font-semibold shadow-lg transition-all">
//               <Plus className="w-5 h-5" /> New Invoice
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//           {[
//             { label: 'Today Invoices', value: todayInvoices, color: 'text-slate-800' },
//             { label: 'Total Invoices', value: totalInvoices, color: 'text-green-600' },
//             { label: 'Today Revenue', value: `₹${todayRevenue?.toLocaleString?.('en-IN') || 0}`, color: 'text-amber-600' },
//             { label: 'Total Revenue', value: `₹${totalRevenue?.toLocaleString?.('en-IN') || 0}`, color: 'text-emerald-600' },
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
//             <input type="text" placeholder="Search by invoice ID, patient, or doctor..."
//               value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700" />
//           </div>
//           <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
//             className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 text-slate-700 font-medium cursor-pointer">
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
//                   {['Invoice ID', 'Patient', 'Doctor', 'Type', 'Date', 'Charges', 'Oxygen', 'Total', 'Status', 'Actions'].map(h => (
//                     <th key={h} className={`px-4 py-4 text-left font-semibold text-slate-700 ${h === 'Actions' ? 'text-center' : ''}`}>{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {paginated.length > 0 ? paginated.map(inv => (
//                   <tr key={inv.id} className="hover:bg-emerald-50/40 transition-colors">
//                     <td className="px-4 py-4">
//                       <div className="flex items-center gap-2">
//                         <FileText className="w-4 h-4 text-emerald-600 flex-shrink-0" />
//                         <span className="font-semibold text-slate-800 text-sm">{inv.invoiceId}</span>
//                       </div>
//                     </td>
//                     <td className="px-4 py-4">
//                       <div className="flex items-center gap-2">
//                         <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
//                           {inv.patientName.charAt(0)}
//                         </div>
//                         <p className="font-semibold text-slate-800 text-sm">{inv.patientName}</p>
//                       </div>
//                     </td>
//                     <td className="px-4 py-4">
//                       <div className="flex items-center gap-1.5">
//                         <Stethoscope className="w-4 h-4 text-teal-500 flex-shrink-0" />
//                         <p className="font-medium text-slate-700 text-sm">{inv.doctorName}</p>
//                       </div>
//                     </td>
//                     <td className="px-4 py-4">
//                       <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${inv.ipdOpd === 'IPD' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
//                         {inv.ipdOpd || 'OPD'}
//                       </span>
//                     </td>
//                     <td className="px-4 py-4 text-slate-600 text-sm">{inv.date}</td>
//                     <td className="px-4 py-4">
//                       <div className="flex flex-wrap gap-1">
//                         {(inv.charges || []).slice(0, 2).map((c, i) => (
//                           <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">{c.chargeName || c.category}</span>
//                         ))}
//                         {(inv.charges || []).length > 2 && (
//                           <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs font-medium">+{inv.charges.length - 2}</span>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-4 py-4">
//                       {inv.oxygenCharges?.enabled
//                         ? <span className="flex items-center gap-1 text-sky-600 text-xs font-semibold"><Wind className="w-3.5 h-3.5" />₹{parseFloat(inv.oxygenCharges.amount || 0).toLocaleString('en-IN')}</span>
//                         : <span className="text-slate-300 text-xs">—</span>}
//                     </td>
//                     <td className="px-4 py-4">
//                       <span className="font-bold text-slate-800">₹{inv.totalAmount.toLocaleString('en-IN')}</span>
//                     </td>
//                     <td className="px-4 py-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize flex items-center gap-1.5 w-fit ${statusBadge(inv.status)}`}>
//                         {['active', 'paid'].includes(inv.status) ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
//                         {inv.status}
//                       </span>
//                     </td>
//                     <td className="px-4 py-4">
//                       <div className="flex items-center justify-center gap-1">
//                         <button onClick={() => { setSelectedInvoice(inv); setShowViewModal(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View"><Eye className="w-4 h-4" /></button>
//                         <button onClick={() => printInvoice(inv)} className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors" title="Print"><Printer className="w-4 h-4" /></button>
//                         <button onClick={() => { setSelectedInvoice(inv); setShowShareModal(true); }} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Share"><Send className="w-4 h-4" /></button>
//                         <button onClick={() => handleEditClick(inv)} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit"><FileText className="w-4 h-4" /></button>
//                         <button onClick={() => { setSelectedInvoice(inv); setShowDeleteModal(true); }} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
//                       </div>
//                     </td>
//                   </tr>
//                 )) : (
//                   <tr><td colSpan={10} className="py-16 text-center">
//                     <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
//                     <p className="text-slate-500 font-medium">No invoices found</p>
//                   </td></tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
//             <p className="text-sm text-slate-600">
//               Showing <b>{Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}</b>–<b>{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</b> of <b>{filtered.length}</b>
//             </p>
//             <div className="flex items-center gap-1.5">
//               <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
//                 className={`p-2 rounded-lg ${currentPage === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-emerald-50 border border-slate-200'}`}>
//                 <ChevronLeft className="w-4 h-4" />
//               </button>
//               {pageNums().map((p, i) => p === '...'
//                 ? <span key={`e${i}`} className="px-2 text-slate-400 text-sm">…</span>
//                 : <button key={p} onClick={() => setCurrentPage(p)}
//                     className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${currentPage === p ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' : 'text-slate-600 hover:bg-emerald-50 border border-slate-200'}`}>{p}</button>
//               )}
//               <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
//                 className={`p-2 rounded-lg ${currentPage === totalPages ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-emerald-50 border border-slate-200'}`}>
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ── Add Modal ── */}
//       <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); resetForm(); }} title="New Invoice" size="lg">
//         <InvoiceForm form={form} setForm={setForm} patients={patients} doctors={doctors}
//           onSubmit={handleCreate} onPrint={handleFormPrint}
//           isSubmitting={isSubmitting} submitLabel="Save & Print Invoice"
//           onCancel={() => { setShowAddModal(false); resetForm(); }} />
//       </Modal>

//       {/* ── Edit Modal ── */}
//       <Modal isOpen={showEditModal} onClose={() => { setShowEditModal(false); resetForm(); }} title="Edit Invoice" size="lg">
//         <InvoiceForm form={form} setForm={setForm} patients={patients} doctors={doctors}
//           onSubmit={handleUpdate} onPrint={handleFormPrint}
//           isSubmitting={isSubmitting} submitLabel="Update Invoice"
//           onCancel={() => { setShowEditModal(false); resetForm(); }} />
//       </Modal>

//       {/* ── View Modal ── */}
//       <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Invoice Details" size="md">
//         {selectedInvoice && (
//           <div className="space-y-4">
//             <div className="grid grid-cols-3 gap-3">
//               {[
//                 { label: 'Invoice ID', value: selectedInvoice.invoiceId },
//                 { label: 'Date', value: selectedInvoice.date },
//                 { label: 'Type', value: selectedInvoice.ipdOpd || 'OPD' },
//                 { label: 'Patient', value: selectedInvoice.patientName },
//                 { label: 'Doctor', value: selectedInvoice.doctorName },
//                 { label: 'Status', value: selectedInvoice.status },
//               ].map(row => (
//                 <div key={row.label} className="bg-slate-50 rounded-xl px-4 py-3">
//                   <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{row.label}</p>
//                   <p className="text-sm font-semibold text-slate-800 capitalize">{row.value}</p>
//                 </div>
//               ))}
//             </div>

//             <div>
//               <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Charges</p>
//               <div className="rounded-xl overflow-hidden border border-slate-200">
//                 <table className="w-full text-sm">
//                   <thead className="bg-gradient-to-r from-emerald-50 to-teal-50">
//                     <tr>{['Category', 'Charge Name', 'Qty', 'Rate', 'Amount'].map(h => (
//                       <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-slate-600">{h}</th>
//                     ))}</tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-100">
//                     {(selectedInvoice.charges || []).map((c, i) => (
//                       <tr key={i} className="hover:bg-slate-50">
//                         <td className="px-3 py-2.5 font-medium text-slate-700">{c.category}</td>
//                         <td className="px-3 py-2.5 text-slate-600">{c.chargeName}</td>
//                         <td className="px-3 py-2.5 text-slate-600">{c.quantity}</td>
//                         <td className="px-3 py-2.5 text-slate-600">₹{parseFloat(c.rate || 0).toLocaleString('en-IN')}</td>
//                         <td className="px-3 py-2.5 font-semibold text-slate-800">₹{parseFloat(c.amount || 0).toLocaleString('en-IN')}</td>
//                       </tr>
//                     ))}
//                     {selectedInvoice.oxygenCharges?.enabled && (
//                       <tr className="bg-sky-50">
//                         <td className="px-3 py-2.5 font-semibold text-sky-700">
//                           <div className="flex items-center gap-1.5"><Wind className="w-3.5 h-3.5" />Oxygen</div>
//                         </td>
//                         <td className="px-3 py-2.5 text-sky-600">{selectedInvoice.oxygenCharges.description || 'Oxygen Charges'}</td>
//                         <td className="px-3 py-2.5 text-sky-600">{selectedInvoice.oxygenCharges.quantity}</td>
//                         <td className="px-3 py-2.5 text-sky-600">₹{parseFloat(selectedInvoice.oxygenCharges.rate || 0).toLocaleString('en-IN')}</td>
//                         <td className="px-3 py-2.5 font-semibold text-sky-700">₹{parseFloat(selectedInvoice.oxygenCharges.amount || 0).toLocaleString('en-IN')}</td>
//                       </tr>
//                     )}
//                   </tbody>
//                   <tfoot>
//                     <tr className="bg-emerald-50">
//                       <td colSpan={4} className="px-3 py-2.5 font-bold text-slate-700">Grand Total</td>
//                       <td className="px-3 py-2.5 font-bold text-emerald-700">₹{selectedInvoice.totalAmount.toLocaleString('en-IN')}</td>
//                     </tr>
//                   </tfoot>
//                 </table>
//               </div>
//             </div>

//             {/* QR Preview */}
//             <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
//               <img src={getQRUrl(selectedInvoice.invoiceId, selectedInvoice.totalAmount)} alt="Pay QR"
//                 className="w-20 h-20 rounded-lg border-2 border-emerald-200 bg-white p-1" />
//               <div>
//                 <p className="font-semibold text-slate-700 text-sm mb-0.5 flex items-center gap-1.5">
//                   <QrCode className="w-4 h-4 text-emerald-500" /> Scan to Pay via UPI
//                 </p>
//                 <p className="text-xs text-slate-500">UPI ID: <span className="font-semibold text-emerald-600">{UPI_ID}</span></p>
//                 <p className="text-xs text-slate-500 mt-0.5">Amount: <span className="font-bold text-emerald-700">₹{selectedInvoice.totalAmount.toLocaleString('en-IN')}</span></p>
//               </div>
//             </div>

//             {selectedInvoice.notes && (
//               <div className="bg-amber-50 rounded-xl px-4 py-3 border border-amber-100">
//                 <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">Remarks</p>
//                 <p className="text-sm text-slate-700">{selectedInvoice.notes}</p>
//               </div>
//             )}

//             <div className="flex gap-3">
//               <button onClick={() => printInvoice(selectedInvoice)}
//                 className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
//                 <Printer className="w-4 h-4" /> Print
//               </button>
//               <button onClick={() => { setShowViewModal(false); setShowShareModal(true); }}
//                 className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg flex items-center justify-center gap-2">
//                 <Send className="w-4 h-4" /> Share
//               </button>
//             </div>
//           </div>
//         )}
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
//             <button onClick={handleDelete} disabled={isSubmitting}
//               className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
//               {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />} Delete
//             </button>
//           </div>
//         </div>
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
//                 <span className="text-slate-600">{selectedInvoice.charges?.length || 0} charge(s) · {selectedInvoice.ipdOpd}</span>
//                 <span className="font-bold text-emerald-700">₹{selectedInvoice.totalAmount.toLocaleString('en-IN')}</span>
//               </div>
//             </div>
//             <div className="space-y-2">
//               <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Share via</p>
//               <button onClick={() => handleCopy(selectedInvoice)}
//                 className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 hover:bg-emerald-50 rounded-xl transition-colors border border-slate-200">
//                 <div className="w-9 h-9 bg-slate-200 rounded-lg flex items-center justify-center">
//                   {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
//                 </div>
//                 <div className="text-left">
//                   <p className="font-semibold text-slate-700 text-sm">{copied ? 'Copied!' : 'Copy Details'}</p>
//                   <p className="text-xs text-slate-400">Includes UPI ID for payment</p>
//                 </div>
//               </button>
//               <button onClick={() => printInvoice(selectedInvoice)}
//                 className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 hover:bg-emerald-50 rounded-xl transition-colors border border-slate-200">
//                 <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
//                   <Printer className="w-4 h-4 text-blue-600" />
//                 </div>
//                 <div className="text-left">
//                   <p className="font-semibold text-slate-700 text-sm">Print / Download PDF</p>
//                   <p className="text-xs text-slate-400">Includes QR code for UPI payment</p>
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
  FileText, Sheet, Stethoscope, Trash2,
  Copy, Check, Printer, CheckCircle, Clock,
  ChevronLeft, ChevronRight, Loader2, QrCode, Wind
} from 'lucide-react';
import {
  createHospitalInvoiceApi, getHospitalInvoiceApi, updateHospitalInvoiceApi,
  deleteHospitalInvoiceApi, getPatients, getDoctorApi, countHospitalInvoiceApi
} from '../../lib/commonApis';
import { showToast } from '../../lib/notification';

// ── Charge Categories ─────────────────────────────────────────────────────────
const CHARGE_CATEGORIES = {
  'Consultation': ['OPD Doctor Fee', 'Specialist Consultation Fee', 'Follow-up Consultation', 'Tele-consultation'],
  'Room / Bed': ['General Ward (per day)', 'Semi-Private Room (per day)', 'Private Room (per day)', 'Deluxe / Suite Room (per day)', 'ICU (per day)', 'HDU - High Dependency Unit (per day)'],
  'Nursing': ['Nursing Care (per day)', 'Special / Private Nurse', 'Night Nurse'],
  'Diagnostic / Lab': ['Blood Test', 'Urine Test', 'ECG', 'X-Ray', 'Ultrasound', 'CT Scan', 'MRI', 'Biopsy / Pathology'],
  'Procedure / Treatment': ['Minor Procedure', 'Major Procedure', 'Dressing / Injection', 'Dialysis', 'Chemotherapy', 'Physiotherapy Session'],
  'OT Charges': ['Operation Theatre Charges', 'Surgeon Fee', 'Anaesthetist Fee', 'Assistant Surgeon Fee', 'OT Consumables'],
  'Pharmacy': ['Medicines', 'IV Fluids', 'Consumables (Gloves, Syringes etc.)', 'Implants / Stents / Prosthetics'],
  'Diet': ['Regular Diet (per day)', 'Special / Diabetic Diet (per day)', 'Liquid Diet (per day)'],
  'Ambulance': ['Ambulance (Arrival)', 'Ambulance (Transfer)', 'Emergency Ambulance'],
  'Miscellaneous': ['Admission Fee', 'Registration Fee', 'Medical Certificate', 'Discharge Summary', 'Attendant Charges', 'Laundry'],
};

const CATEGORY_NAMES = Object.keys(CHARGE_CATEGORIES);
const EMPTY_CHARGE = { category: '', chargeName: '', quantity: '1', rate: '', amount: 0 };
const EMPTY_OXYGEN = { enabled: false, description: '', quantity: '', rate: '', amount: 0 };
const IPD_OPD_OPTIONS = ['OPD', 'IPD'];
const ITEMS_PER_PAGE = 10;

// UPI details — change as needed
const UPI_ID = 'shivamkumar2177@ybl';
const HOSPITAL_NAME = 'MediCare Hospital';
const HOSPITAL_ADDRESS = '123 Health Avenue, New Delhi – 110001';
const HOSPITAL_PHONE = '+91 11 2345 6789';
const HOSPITAL_EMAIL = 'billing@medicare.in';

// ── QR URL (UPI deep-link via qrserver.com) ───────────────────────────────────
function getQRUrl(invoiceId, amount) {
  const upiString = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(HOSPITAL_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent('Invoice ' + invoiceId)}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(upiString)}`;
}

// ── Print Invoice ─────────────────────────────────────────────────────────────
// function printInvoice(inv) {
//   const chargeRows = (inv.charges || []).map(c => `
//     <tr>
//       <td>${c.category}</td>
//       <td>${c.chargeName}</td>
//       <td style="text-align:center">${c.quantity}</td>
//       <td style="text-align:right">₹${parseFloat(c.rate || 0).toLocaleString('en-IN')}</td>
//       <td style="text-align:right">₹${parseFloat(c.amount || 0).toLocaleString('en-IN')}</td>
//     </tr>`).join('');

//   const oxygenRow = inv.oxygenCharges?.enabled ? `
//     <tr class="oxy-row">
//       <td><span style="display:flex;align-items:center;gap:5px">🌬️ Oxygen</span></td>
//       <td>${inv.oxygenCharges.description || 'Oxygen Charges'}</td>
//       <td style="text-align:center">${inv.oxygenCharges.quantity || 1}</td>
//       <td style="text-align:right">₹${parseFloat(inv.oxygenCharges.rate || 0).toLocaleString('en-IN')}</td>
//       <td style="text-align:right">₹${parseFloat(inv.oxygenCharges.amount || 0).toLocaleString('en-IN')}</td>
//     </tr>` : '';

//   const qrUrl = getQRUrl(inv.invoiceId, inv.totalAmount);

//   const html = `<!DOCTYPE html>
// <html><head><title>Invoice ${inv.invoiceId}</title>
// <style>
//   *{margin:0;padding:0;box-sizing:border-box}
//   body{font-family:'Segoe UI',Arial,sans-serif;background:#fff;color:#1e293b}
//   .page{max-width:800px;margin:30px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 20px rgba(0,0,0,.08)}
//   .header{background:linear-gradient(135deg,#059669 0%,#0d9488 100%);color:#fff;padding:28px 36px;display:flex;justify-content:space-between;align-items:flex-start}
//   .h-left h1{font-size:22px;font-weight:800;letter-spacing:-.3px}
//   .h-left p{margin-top:5px;opacity:.82;font-size:11px;line-height:1.7}
//   .h-right{text-align:right}
//   .inv-label{font-size:9px;opacity:.7;text-transform:uppercase;letter-spacing:1.5px}
//   .inv-num{font-size:19px;font-weight:800;background:rgba(255,255,255,.18);padding:4px 14px;border-radius:8px;display:inline-block;margin-top:3px}
//   .inv-date{font-size:11px;opacity:.78;margin-top:4px}
//   .body{padding:28px 36px}
//   .meta{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:22px;background:#f8fafc;border-radius:10px;padding:16px;border:1px solid #e2e8f0}
//   .m-block h3{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#94a3b8;margin-bottom:4px}
//   .m-block p{font-size:14px;font-weight:600;color:#1e293b}
//   .m-block .sub{font-size:11px;color:#64748b;margin-top:1px}
//   .badge{display:inline-block;padding:2px 10px;border-radius:99px;font-size:10px;font-weight:700;text-transform:uppercase}
//   .opd{background:#dbeafe;color:#1d4ed8}.ipd{background:#ede9fe;color:#6d28d9}
//   table{width:100%;border-collapse:collapse}
//   thead tr{background:#f1f5f9}
//   th{padding:9px 12px;text-align:left;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#64748b;border-bottom:2px solid #e2e8f0}
//   td{padding:9px 12px;border-bottom:1px solid #f1f5f9;font-size:13px;color:#334155}
//   .oxy-row td{background:#f0f9ff;color:#0369a1;font-weight:500}
//   tfoot td{padding:11px 12px;background:#f0fdf4;font-weight:700;border-top:2px solid #d1fae5}
//   .total-lbl{font-size:13px;color:#065f46}
//   .total-val{font-size:16px;font-weight:800;color:#059669}
//   .footer-area{display:flex;justify-content:space-between;align-items:flex-start;margin-top:22px;padding-top:22px;border-top:1px solid #e2e8f0;gap:24px}
//   .pay-info h4{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;margin-bottom:6px}
//   .pay-info p{font-size:12px;color:#475569;line-height:1.6}
//   .upi-id{color:#059669;font-weight:700}
//   .qr-wrap{text-align:center;flex-shrink:0}
//   .qr-wrap img{width:120px;height:120px;border:3px solid #d1fae5;border-radius:10px;padding:4px;background:#fff}
//   .qr-wrap .qlabel{font-size:10px;color:#64748b;margin-top:5px;font-weight:600}
//   .qr-wrap .qamt{font-size:12px;font-weight:800;color:#059669;margin-top:2px}
//   .footer{text-align:center;color:#94a3b8;font-size:11px;padding:12px 36px;border-top:1px solid #f1f5f9;margin-top:6px}
//   @media print{body{background:#fff}.page{margin:0;box-shadow:none;border-radius:0}}
// </style>
// </head><body>
// <div class="page">
//   <div class="header">
//     <div class="h-left">
//       <h1>🏥 ${HOSPITAL_NAME}</h1>
//       <p>${HOSPITAL_ADDRESS}<br>${HOSPITAL_EMAIL} &nbsp;|&nbsp; ${HOSPITAL_PHONE}</p>
//     </div>
//     <div class="h-right">
//       <div class="inv-label">Invoice</div>
//       <div class="inv-num">${inv.invoiceId}</div>
//       <div class="inv-date">${inv.date}</div>
//     </div>
//   </div>

//   <div class="body">
//     <div class="meta">
//       <div class="m-block">
//         <h3>Patient</h3>
//         <p>${inv.patientName}</p>
//         <p class="sub">ID: ${inv.patientId}</p>
//       </div>
//       <div class="m-block">
//         <h3>Doctor</h3>
//         <p>${inv.doctorName}</p>
//         <p class="sub">ID: ${inv.doctorId}</p>
//       </div>
//       <div class="m-block">
//         <h3>Visit Type</h3>
//         <span class="badge ${(inv.ipdOpd || 'OPD').toLowerCase()}">${inv.ipdOpd || 'OPD'}</span>
//         <p class="sub" style="margin-top:6px;text-transform:capitalize">Status: ${inv.status}</p>
//       </div>
//     </div>

//     <table>
//       <thead>
//         <tr>
//           <th>Category</th><th>Charge Name</th>
//           <th style="text-align:center">Qty</th>
//           <th style="text-align:right">Rate</th>
//           <th style="text-align:right">Amount</th>
//         </tr>
//       </thead>
//       <tbody>
//         ${chargeRows}
//         ${oxygenRow}
//       </tbody>
//       <tfoot>
//         <tr>
//           <td colspan="4" class="total-lbl">Grand Total</td>
//           <td style="text-align:right" class="total-val">₹${inv.totalAmount.toLocaleString('en-IN')}</td>
//         </tr>
//       </tfoot>
//     </table>

//     <div class="footer-area">
//       <div class="pay-info" style="flex:1">
//         ${inv.notes ? `<h4>Remarks</h4><p style="margin-bottom:12px">${inv.notes}</p>` : ''}
//         <h4>Payment</h4>
//         <p>UPI ID: <span class="upi-id">${UPI_ID}</span><br>
//         Scan the QR code to pay instantly via any UPI app<br>
//         <span style="color:#94a3b8;font-size:11px">This invoice is valid for 30 days from the date of issue.</span></p>
//       </div>
//       <div class="qr-wrap">
//         <img src="${qrUrl}" alt="UPI Payment QR" />
//         <div class="qlabel">Scan & Pay</div>
//         <div class="qamt">₹${inv.totalAmount.toLocaleString('en-IN')}</div>
//       </div>
//     </div>
//   </div>

//   <div class="footer">
//     Thank you for choosing ${HOSPITAL_NAME} &nbsp;•&nbsp; Get well soon! &nbsp;•&nbsp; ${HOSPITAL_PHONE}
//   </div>
// </div>
// </body></html>`;

//   const win = window.open('', '_blank', 'height=800,width=920');
//   win.document.write(html);
//   win.document.close();
//   win.focus();
//   setTimeout(() => win.print(), 700);
// }














// ── Print Invoice ─────────────────────────────────────────────────────────────
async function printInvoice(inv) {
  // ── CHANGED: fetch QR as base64 so it renders in print window ──
  let qrSrc = '';
  try {
    const qrUrl = getQRUrl(inv.invoiceId, inv.totalAmount);
    const response = await fetch(qrUrl);
    const blob = await response.blob();
    qrSrc = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch {
    qrSrc = getQRUrl(inv.invoiceId, inv.totalAmount); // fallback to URL
  }

  const chargeRows = (inv.charges || []).map(c => `
    <tr>
      <td>${c.category}</td>
      <td>${c.chargeName}</td>
      <td style="text-align:center">${c.quantity}</td>
      <td style="text-align:right">₹${parseFloat(c.rate || 0).toLocaleString('en-IN')}</td>
      <td style="text-align:right">₹${parseFloat(c.amount || 0).toLocaleString('en-IN')}</td>
    </tr>`).join('');

  const oxygenRow = inv.oxygenCharges?.enabled ? `
    <tr class="oxy-row">
      <td><span style="display:flex;align-items:center;gap:5px">🌬️ Oxygen</span></td>
      <td>${inv.oxygenCharges.description || 'Oxygen Charges'}</td>
      <td style="text-align:center">${inv.oxygenCharges.quantity || 1}</td>
      <td style="text-align:right">₹${parseFloat(inv.oxygenCharges.rate || 0).toLocaleString('en-IN')}</td>
      <td style="text-align:right">₹${parseFloat(inv.oxygenCharges.amount || 0).toLocaleString('en-IN')}</td>
    </tr>` : '';

  // ── CHANGED: use qrSrc (base64) instead of qrUrl ──
  const html = `<!DOCTYPE html>
<html><head><title>Invoice ${inv.invoiceId}</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Segoe UI',Arial,sans-serif;background:#fff;color:#1e293b}
  .page{max-width:800px;margin:30px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 20px rgba(0,0,0,.08)}
  .header{background:linear-gradient(135deg,#059669 0%,#0d9488 100%);color:#fff;padding:28px 36px;display:flex;justify-content:space-between;align-items:flex-start}
  .h-left h1{font-size:22px;font-weight:800;letter-spacing:-.3px}
  .h-left p{margin-top:5px;opacity:.82;font-size:11px;line-height:1.7}
  .h-right{text-align:right}
  .inv-label{font-size:9px;opacity:.7;text-transform:uppercase;letter-spacing:1.5px}
  .inv-num{font-size:19px;font-weight:800;background:rgba(255,255,255,.18);padding:4px 14px;border-radius:8px;display:inline-block;margin-top:3px}
  .inv-date{font-size:11px;opacity:.78;margin-top:4px}
  .body{padding:28px 36px}
  .meta{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:22px;background:#f8fafc;border-radius:10px;padding:16px;border:1px solid #e2e8f0}
  .m-block h3{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#94a3b8;margin-bottom:4px}
  .m-block p{font-size:14px;font-weight:600;color:#1e293b}
  .m-block .sub{font-size:11px;color:#64748b;margin-top:1px}
  .badge{display:inline-block;padding:2px 10px;border-radius:99px;font-size:10px;font-weight:700;text-transform:uppercase}
  .opd{background:#dbeafe;color:#1d4ed8}.ipd{background:#ede9fe;color:#6d28d9}
  table{width:100%;border-collapse:collapse}
  thead tr{background:#f1f5f9}
  th{padding:9px 12px;text-align:left;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#64748b;border-bottom:2px solid #e2e8f0}
  td{padding:9px 12px;border-bottom:1px solid #f1f5f9;font-size:13px;color:#334155}
  .oxy-row td{background:#f0f9ff;color:#0369a1;font-weight:500}
  tfoot td{padding:11px 12px;background:#f0fdf4;font-weight:700;border-top:2px solid #d1fae5}
  .total-lbl{font-size:13px;color:#065f46}
  .total-val{font-size:16px;font-weight:800;color:#059669}
  .footer-area{display:flex;justify-content:space-between;align-items:flex-start;margin-top:22px;padding-top:22px;border-top:1px solid #e2e8f0;gap:24px}
  .pay-info h4{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;margin-bottom:6px}
  .pay-info p{font-size:12px;color:#475569;line-height:1.6}
  .upi-id{color:#059669;font-weight:700}
  .qr-wrap{text-align:center;flex-shrink:0}
  .qr-wrap img{width:120px;height:120px;border:3px solid #d1fae5;border-radius:10px;padding:4px;background:#fff}
  .qr-wrap .qlabel{font-size:10px;color:#64748b;margin-top:5px;font-weight:600}
  .qr-wrap .qamt{font-size:12px;font-weight:800;color:#059669;margin-top:2px}
  .footer{text-align:center;color:#94a3b8;font-size:11px;padding:12px 36px;border-top:1px solid #f1f5f9;margin-top:6px}
  @media print{body{background:#fff}.page{margin:0;box-shadow:none;border-radius:0}}
</style>
</head><body>
<div class="page">
  <div class="header">
    <div class="h-left">
      <h1>🏥 ${HOSPITAL_NAME}</h1>
      <p>${HOSPITAL_ADDRESS}<br>${HOSPITAL_EMAIL} &nbsp;|&nbsp; ${HOSPITAL_PHONE}</p>
    </div>
    <div class="h-right">
      <div class="inv-label">Invoice</div>
      <div class="inv-num">${inv.invoiceId}</div>
      <div class="inv-date">${inv.date}</div>
    </div>
  </div>

  <div class="body">
    <div class="meta">
      <div class="m-block">
        <h3>Patient</h3>
        <p>${inv.patientName}</p>
        <p class="sub">ID: ${inv.patientId}</p>
      </div>
      <div class="m-block">
        <h3>Doctor</h3>
        <p>${inv.doctorName}</p>
        <p class="sub">ID: ${inv.doctorId}</p>
      </div>
      <div class="m-block">
        <h3>Visit Type</h3>
        <span class="badge ${(inv.ipdOpd || 'OPD').toLowerCase()}">${inv.ipdOpd || 'OPD'}</span>
        <p class="sub" style="margin-top:6px;text-transform:capitalize">Status: ${inv.status}</p>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Category</th><th>Charge Name</th>
          <th style="text-align:center">Qty</th>
          <th style="text-align:right">Rate</th>
          <th style="text-align:right">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${chargeRows}
        ${oxygenRow}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4" class="total-lbl">Grand Total</td>
          <td style="text-align:right" class="total-val">₹${inv.totalAmount.toLocaleString('en-IN')}</td>
        </tr>
      </tfoot>
    </table>

    <div class="footer-area">
      <div class="pay-info" style="flex:1">
        ${inv.notes ? `<h4>Remarks</h4><p style="margin-bottom:12px">${inv.notes}</p>` : ''}
        <h4>Payment</h4>
        <p>UPI ID: <span class="upi-id">${UPI_ID}</span><br>
        Scan the QR code to pay instantly via any UPI app<br>
        <span style="color:#94a3b8;font-size:11px">This invoice is valid for 30 days from the date of issue.</span></p>
      </div>
      <div class="qr-wrap">
        <img src="${qrSrc}" alt="UPI Payment QR" />
        <div class="qlabel">Scan & Pay</div>
        <div class="qamt">₹${inv.totalAmount.toLocaleString('en-IN')}</div>
      </div>
    </div>
  </div>

  <div class="footer">
    Thank you for choosing ${HOSPITAL_NAME} &nbsp;•&nbsp; Get well soon! &nbsp;•&nbsp; ${HOSPITAL_PHONE}
  </div>
</div>
</body></html>`;

  const win = window.open('', '_blank', 'height=800,width=920');
  win.document.write(html);
  win.document.close();
  win.focus();
  // ── CHANGED: no setTimeout needed — image is already base64 inline ──
  setTimeout(() => win.print(), 300);
}
// ── Modal ─────────────────────────────────────────────────────────────────────
function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null;
  const sizeMap = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-5xl' };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeMap[size]} border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden`}
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

// ── Single Charge Row ─────────────────────────────────────────────────────────
function ChargeRow({ charge, idx, onChange, onRemove, isOnly }) {
  const subItems = charge.category ? (CHARGE_CATEGORIES[charge.category] || []) : [];
  const handleField = (field, value) => {
    const updated = { ...charge, [field]: value };
    if (field === 'category') updated.chargeName = '';
    if (field === 'quantity' || field === 'rate') {
      const qty = parseFloat(field === 'quantity' ? value : updated.quantity) || 0;
      const rate = parseFloat(field === 'rate' ? value : updated.rate) || 0;
      updated.amount = qty * rate;
    }
    onChange(idx, updated);
  };
  return (
    <div className="grid grid-cols-12 gap-2 items-center bg-slate-50 rounded-xl p-2.5 border border-slate-100">
      <select value={charge.category} onChange={e => handleField('category', e.target.value)} required
        className="col-span-3 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm">
        <option value="">Select Category</option>
        {CATEGORY_NAMES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={charge.chargeName} onChange={e => handleField('chargeName', e.target.value)} required disabled={!charge.category}
        className="col-span-3 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm disabled:opacity-50">
        <option value="">Select Charge</option>
        {subItems.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <input type="number" placeholder="Qty" value={charge.quantity} min="1" onChange={e => handleField('quantity', e.target.value)} required
        className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm" />
      <input type="number" placeholder="Rate ₹" value={charge.rate} min="0" onChange={e => handleField('rate', e.target.value)} required
        className="col-span-2 px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm" />
      <div className="col-span-1 px-2 py-2 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-700 text-sm font-semibold text-center">
        ₹{(charge.amount || 0).toLocaleString('en-IN')}
      </div>
      <button type="button" onClick={() => onRemove(idx)} disabled={isOnly}
        className="col-span-1 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

// ── Invoice Form (shared Add/Edit) ────────────────────────────────────────────
function InvoiceForm({ form, setForm, patients, doctors, onSubmit, onPrint, isSubmitting, submitLabel, onCancel }) {
  const chargesTotal = form.charges.reduce((s, c) => s + (parseFloat(c.amount) || 0), 0);
  const oxyAmt = form.oxygenCharges?.enabled
    ? (parseFloat(form.oxygenCharges.quantity || 0) * parseFloat(form.oxygenCharges.rate || 0)) : 0;
  const grandTotal = chargesTotal + oxyAmt;

  const set = (name, value) => setForm(p => ({ ...p, [name]: value }));

  const setOxy = (field, value) => setForm(p => {
    const oxy = { ...p.oxygenCharges, [field]: value };
    if (field === 'quantity' || field === 'rate') {
      oxy.amount = (parseFloat(field === 'quantity' ? value : oxy.quantity) || 0) *
        (parseFloat(field === 'rate' ? value : oxy.rate) || 0);
    }
    return { ...p, oxygenCharges: oxy };
  });

  const updateCharge = (idx, updated) =>
    setForm(p => ({ ...p, charges: p.charges.map((c, i) => i === idx ? updated : c) }));
  const addCharge = () => setForm(p => ({ ...p, charges: [...p.charges, { ...EMPTY_CHARGE }] }));
  const removeCharge = (idx) => {
    if (form.charges.length === 1) return;
    setForm(p => ({ ...p, charges: p.charges.filter((_, i) => i !== idx) }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Header Fields */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Patient *</label>
          <select value={form.patientId} onChange={e => set('patientId', e.target.value)} required
            className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm">
            <option value="">Select Patient</option>
            {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Doctor *</label>
          <select value={form.doctorId} onChange={e => set('doctorId', e.target.value)} required
            className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm">
            <option value="">Select Doctor</option>
            {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">IPD / OPD *</label>
          <select value={form.ipdOpd} onChange={e => set('ipdOpd', e.target.value)} required
            className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm">
            <option value="">Select Type</option>
            {IPD_OPD_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>

      {/* Charges Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Charges *</label>
          <button type="button" onClick={addCharge}
            className="text-xs font-semibold text-emerald-600 flex items-center gap-1 px-3 py-1.5 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Charge
          </button>
        </div>
        <div className="grid grid-cols-12 gap-2 px-1 mb-1.5">
          {[{l:'Category',s:'col-span-3'},{l:'Charge Name',s:'col-span-3'},{l:'Qty',s:'col-span-2'},{l:'Rate (₹)',s:'col-span-2'},{l:'Amount',s:'col-span-1'},{l:'',s:'col-span-1'}]
            .map(h => <div key={h.l} className={`text-xs font-semibold text-slate-400 uppercase tracking-wider ${h.s}`}>{h.l}</div>)}
        </div>
        <div className="space-y-2">
          {form.charges.map((charge, idx) => (
            <ChargeRow key={idx} charge={charge} idx={idx} onChange={updateCharge} onRemove={removeCharge} isOnly={form.charges.length === 1} />
          ))}
        </div>
      </div>

      {/* ── Oxygen Charges (Optional Checkbox) ── */}
      <div className={`rounded-xl border-2 transition-all duration-200 overflow-hidden ${form.oxygenCharges?.enabled ? 'border-sky-200 bg-sky-50/60' : 'border-slate-100 bg-slate-50'}`}>
        {/* Checkbox Header */}
        <div className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none"
          onClick={() => setOxy('enabled', !form.oxygenCharges?.enabled)}>
          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${form.oxygenCharges?.enabled ? 'bg-sky-500 border-sky-500' : 'border-slate-300 bg-white'}`}>
            {form.oxygenCharges?.enabled && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
          </div>
          <Wind className={`w-4 h-4 flex-shrink-0 ${form.oxygenCharges?.enabled ? 'text-sky-500' : 'text-slate-400'}`} />
          <span className={`text-sm font-semibold ${form.oxygenCharges?.enabled ? 'text-sky-700' : 'text-slate-500'}`}>
            Oxygen Charges
          </span>
          <span className={`text-xs ml-1 ${form.oxygenCharges?.enabled ? 'text-sky-500' : 'text-slate-400'}`}>(optional)</span>
          {form.oxygenCharges?.enabled && oxyAmt > 0 && (
            <span className="ml-auto text-sm font-bold text-sky-600">₹{oxyAmt.toLocaleString('en-IN')}</span>
          )}
        </div>

        {/* Input Row — only when checked */}
        {form.oxygenCharges?.enabled && (
          <div className="px-4 pb-4 pt-1 grid grid-cols-3 gap-3 border-t border-sky-100">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Description</label>
              <input type="text" placeholder="e.g. Oxygen (per hour)"
                value={form.oxygenCharges.description || ''}
                onChange={e => setOxy('description', e.target.value)}
                className="w-full px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-sky-400 text-slate-700 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Qty / Hours</label>
              <input type="number" placeholder="Enter quantity" min="1"
                value={form.oxygenCharges.quantity || ''}
                onChange={e => setOxy('quantity', e.target.value)}
                className="w-full px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-sky-400 text-slate-700 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Rate (₹)</label>
              <input type="number" placeholder="Rate per unit" min="0"
                value={form.oxygenCharges.rate || ''}
                onChange={e => setOxy('rate', e.target.value)}
                className="w-full px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-sky-400 text-slate-700 text-sm" />
            </div>
          </div>
        )}
      </div>

      {/* Grand Total */}
      <div className="flex justify-end">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl px-6 py-3 border border-emerald-200">
          <span className="text-sm text-emerald-700 font-medium">Grand Total: </span>
          <span className="text-xl font-bold text-emerald-700">₹{grandTotal.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Remarks */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Remarks (optional)</label>
        <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={2}
          placeholder="Any additional notes..."
          className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm resize-none" />
      </div>

      {/* QR hint */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-100">
        <QrCode className="w-4 h-4 text-emerald-500 flex-shrink-0" />
        <p className="text-xs text-slate-500">
          <span className="font-semibold text-slate-600">Payment QR Code</span> (UPI: {UPI_ID}) will be printed on the invoice automatically.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-1">
        <button type="button" onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
          Cancel
        </button>
        <button type="button" onClick={onPrint}
          className="flex-1 py-2.5 rounded-xl border-2 border-emerald-200 text-emerald-700 font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2">
          <Printer className="w-4 h-4" /> Print Preview
        </button>
        <button type="submit" disabled={isSubmitting}
          className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg disabled:opacity-60 flex items-center justify-center gap-2">
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}

// ── Status Badge Helper ───────────────────────────────────────────────────────
function statusBadge(s) {
  switch ((s || '').toLowerCase()) {
    case 'paid': case 'active': return 'bg-green-100 text-green-700';
    case 'pending': return 'bg-amber-100 text-amber-700';
    case 'cancelled': return 'bg-red-100 text-red-700';
    case 'completed': return 'bg-blue-100 text-blue-700';
    default: return 'bg-slate-100 text-slate-700';
  }
}

// ── Build print-ready obj from form ──────────────────────────────────────────
function buildPrintObj(form, patients, doctors, invoiceId = 'PREVIEW') {
  const patient = patients.find(p => String(p.id) === String(form.patientId));
  const doctor = doctors.find(d => String(d.id) === String(form.doctorId));
  const chargesTotal = form.charges.reduce((s, c) => s + (parseFloat(c.amount) || 0), 0);
  const oxyAmt = form.oxygenCharges?.enabled
    ? (parseFloat(form.oxygenCharges.quantity || 0) * parseFloat(form.oxygenCharges.rate || 0)) : 0;
  return {
    invoiceId,
    patientId: form.patientId || '—',
    patientName: patient?.name || 'Patient',
    doctorId: form.doctorId || '—',
    doctorName: doctor?.name || 'Doctor',
    ipdOpd: form.ipdOpd,
    date: new Date().toISOString().split('T')[0],
    status: 'active',
    charges: form.charges,
    oxygenCharges: form.oxygenCharges,
    totalAmount: chargesTotal + oxyAmt,
    notes: form.notes,
  };
}

// ── Empty form ────────────────────────────────────────────────────────────────
const EMPTY_FORM = {
  patientId: '', doctorId: '', ipdOpd: '',
  charges: [{ ...EMPTY_CHARGE }],
  oxygenCharges: { ...EMPTY_OXYGEN },
  notes: '',
};

// ══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════════
export default function BillingPage() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
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
  const [todayInvoices, setTodayInvoices] = useState(0);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [form, setForm] = useState({ ...EMPTY_FORM, charges: [{ ...EMPTY_CHARGE }], oxygenCharges: { ...EMPTY_OXYGEN } });

  const resetForm = () => setForm({ ...EMPTY_FORM, charges: [{ ...EMPTY_CHARGE }], oxygenCharges: { ...EMPTY_OXYGEN } });

  // ── Loaders ───────────────────────────────────────────────────────────────
  const loadInvoices = useCallback(async () => {
    setLoading(true);
    try {
      // ── CHANGED: use getHospitalInvoiceApi ────────────────────────────────
      console.log('response');

      const res = await getHospitalInvoiceApi(1000, 1);
      console.log(res.data.data,'response');
      // return;
      
      const arr = res?.data?.data.invoices || res?.data.data || res || [];
      setInvoices(Array.isArray(arr) ? arr.map(item => {
        // ── CHANGED: map API fields → internal shape ──────────────────────
        // oxygenCharges is boolean in API; find the oxygen item inside items[]
        const oxyItem = item.oxygenCharges
          ? (item.items || []).find(i => i.category?.toLowerCase() === 'oxygen charges')
          : null;

        // non-oxygen items go to charges
        const chargeItems = (item.items || [])
          .filter(i => i.category?.toLowerCase() !== 'oxygen charges')
          .map(i => ({
            category: i.category || '',
            chargeName: i.chargeName || '',
            quantity: i.qty?.toString() || '1',
            rate: i.rate?.toString() || '0',
            amount: parseFloat(i.amount) || 0,
          }));

        return {
          id: item.id,
          invoiceId: `INV-${item.id}`,
          patientId: item.patientId,
          patientName: item.patient?.name || `Patient #${item.patientId}`,
          patientNumber: item.patient?.patientNumber,
          doctorId: item.doctorId,
          doctorName: item.doctor?.name || `Doctor #${item.doctorId}`,
          ipdOpd: item.type || 'OPD',                          // CHANGED: type → ipdOpd
          date: item.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0],
          status: item.status?.toLowerCase() || 'active',
          charges: chargeItems,
          oxygenCharges: oxyItem
            ? {
                enabled: true,
                description: oxyItem.chargeName || 'Oxygen Charges',
                quantity: oxyItem.qty?.toString() || '',
                rate: oxyItem.rate?.toString() || '',
                amount: parseFloat(oxyItem.amount) || 0,
              }
            : { enabled: false },
          totalAmount: parseFloat(item.grandTotal) || 0,       // CHANGED: grandTotal
          notes: item.remarks || '',                            // CHANGED: remarks → notes
        };
      }) : []);
    } catch { showToast('error', 'Failed', 'Failed to load invoices!'); }
    finally { setLoading(false); }
  }, []);

  const loadPatients = useCallback(async () => {
    try {
      const res = await getPatients(100, 1);
      setPatients((res?.data?.data || res?.data || []).map(i => ({ id: i.id, name: i.name })));
    } catch { setPatients([]); }
  }, []);

  const loadDoctors = useCallback(async () => {
    try {
      const res = await getDoctorApi(100, 1);
      const arr = res?.data?.data || res?.data || [];
      setDoctors((arr.doctors || arr).map(i => ({ id: i.id, name: i.name })));
    } catch { setDoctors([]); }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        // ── CHANGED: use countHospitalInvoiceApi ──────────────────────────
        const res = await countHospitalInvoiceApi();

       console.log(res.data,'count response');
        setTodayInvoices(res.data.todayInvoices);
        setTodayRevenue(res.data.todayRevenue);
        setTotalRevenue(res.data.totalRevenue);
        setTotalInvoices(res.data.totalInvoices);
      } catch { }
    })();
    loadInvoices(); loadPatients(); loadDoctors();
  }, [loadInvoices]);

  // ── Payload builder ───────────────────────────────────────────────────────
  const buildPayload = () => {
    // ── CHANGED: build payload matching new API contract ──────────────────
    // charges → items[] with qty (not quantity), oxygen merged in if enabled
    const items = form.charges.map(c => ({
      category: c.category,
      chargeName: c.chargeName,
      qty: parseFloat(c.quantity) || 1,
      rate: parseFloat(c.rate) || 0,
    }));

    if (form.oxygenCharges?.enabled) {
      items.push({
        category: 'oxygen charges',
        chargeName: form.oxygenCharges.description || 'Oxygen Charges',
        qty: parseFloat(form.oxygenCharges.quantity) || 1,
        rate: parseFloat(form.oxygenCharges.rate) || 0,
      });
    }

    return {
      patientId: parseInt(form.patientId),
      doctorId: parseInt(form.doctorId),
      type: form.ipdOpd,                           // CHANGED: ipdOpd → type
      oxygenCharges: !!form.oxygenCharges?.enabled, // CHANGED: boolean flag
      remarks: form.notes,                          // CHANGED: notes → remarks
      items,                                        // CHANGED: charges → items
    };
  };

  // ── Create → auto print ───────────────────────────────────────────────────
  const handleCreate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // ── CHANGED: use createHospitalInvoiceApi ─────────────────────────
      const res = await createHospitalInvoiceApi(buildPayload());
      const newId = res?.data?.id ? `INV-${res.data.id}` : 'INV-NEW';
      await loadInvoices();
      const printObj = buildPrintObj(form, patients, doctors, newId);
      setShowAddModal(false);
      resetForm();
      setCurrentPage(1);
      printInvoice(printObj);
      showToast('success', 'Created', 'Invoice saved & sent to print!');
    } catch { showToast('error', 'Failed', 'Failed to create invoice!'); }
    finally { setIsSubmitting(false); }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedInvoice) return;
    setIsSubmitting(true);
    try {
      // ── CHANGED: use updateHospitalInvoiceApi ─────────────────────────
      await updateHospitalInvoiceApi(selectedInvoice.id, buildPayload());
      await loadInvoices();
      setShowEditModal(false); setSelectedInvoice(null); resetForm();
      showToast('success', 'Updated', 'Invoice updated successfully!');
    } catch (err) { showToast('error', 'Failed', err.message || 'Failed to update invoice!'); }
    finally { setIsSubmitting(false); }
  };

  const handleDelete = async () => {
    if (!selectedInvoice) return;
    setIsSubmitting(true);
    try {
      // ── CHANGED: use deleteHospitalInvoiceApi ─────────────────────────
      await deleteHospitalInvoiceApi(selectedInvoice.id);
      await loadInvoices();
      setShowDeleteModal(false); setSelectedInvoice(null);
      showToast('success', 'Deleted', 'Invoice deleted!');
    } catch { showToast('error', 'Failed', 'Failed to delete invoice!'); }
    finally { setIsSubmitting(false); }
  };

  const handleEditClick = (inv) => {
    setSelectedInvoice(inv);
    setForm({
      patientId: inv.patientId?.toString() || '',
      doctorId: inv.doctorId?.toString() || '',
      ipdOpd: inv.ipdOpd || '',
      notes: inv.notes || '',
      charges: inv.charges?.length > 0
        ? inv.charges.map(c => ({ category: c.category || '', chargeName: c.chargeName || '', quantity: c.quantity?.toString() || '1', rate: c.rate?.toString() || '', amount: parseFloat(c.amount) || 0 }))
        : [{ ...EMPTY_CHARGE }],
      oxygenCharges: inv.oxygenCharges?.enabled
        ? { ...inv.oxygenCharges, quantity: inv.oxygenCharges.quantity?.toString() || '', rate: inv.oxygenCharges.rate?.toString() || '' }
        : { ...EMPTY_OXYGEN },
    });
    setShowEditModal(true);
  };

  const handleFormPrint = () => printInvoice(buildPrintObj(form, patients, doctors));

  // ── Filter + Paginate ─────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const s = searchTerm.toLowerCase();
    return invoices.filter(inv =>
      ((inv.invoiceId || '').toLowerCase().includes(s) ||
        (inv.patientName || '').toLowerCase().includes(s) ||
        (inv.doctorName || '').toLowerCase().includes(s)) &&
      (filterStatus === 'all' || inv.status === filterStatus)
    );
  }, [invoices, searchTerm, filterStatus]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  useEffect(() => setCurrentPage(1), [searchTerm, filterStatus]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const pageNums = () => {
    const p = [];
    if (totalPages <= 7) for (let i = 1; i <= totalPages; i++) p.push(i);
    else if (currentPage <= 4) p.push(1, 2, 3, 4, 5, '...', totalPages);
    else if (currentPage >= totalPages - 3) p.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    else p.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    return p;
  };

  const exportToExcel = () => {
    const rows = filtered.map(inv => [inv.invoiceId, `"${inv.patientName}"`, `"${inv.doctorName}"`, inv.ipdOpd, inv.date, inv.charges?.length || 0, inv.oxygenCharges?.enabled ? `₹${inv.oxygenCharges.amount}` : 'N/A', inv.totalAmount, inv.status].join(','));
    const csv = [['Invoice ID', 'Patient', 'Doctor', 'Type', 'Date', 'Charges', 'Oxygen', 'Total', 'Status'].join(','), ...rows].join('\n');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    link.download = `invoices_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    setShowExportMenu(false);
  };

  const exportToPDF = () => {
    const rows = filtered.map(inv => `<tr><td>${inv.invoiceId}</td><td>${inv.patientName}</td><td>${inv.doctorName}</td><td>${inv.ipdOpd}</td><td>${inv.date}</td><td>₹${inv.totalAmount.toLocaleString('en-IN')}</td><td>${inv.status}</td></tr>`).join('');
    const win = window.open('', '', 'height=600,width=1000');
    win.document.write(`<!DOCTYPE html><html><head><style>body{font-family:Arial;margin:30px}h1{color:#059669;text-align:center}table{width:100%;border-collapse:collapse;margin-top:20px}th{background:#059669;color:#fff;padding:10px}td{padding:9px;border-bottom:1px solid #ddd}</style></head><body><h1>MediCare – Invoices</h1><table><thead><tr><th>ID</th><th>Patient</th><th>Doctor</th><th>Type</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></body></html>`);
    win.document.close(); setTimeout(() => { win.print(); setShowExportMenu(false); }, 250);
  };

  const handleCopy = (inv) => {
    navigator.clipboard.writeText(`Invoice ${inv.invoiceId}\nPatient: ${inv.patientName}\nDoctor: ${inv.doctorName}\nType: ${inv.ipdOpd}\nDate: ${inv.date}\nTotal: ₹${inv.totalAmount.toLocaleString('en-IN')}\nPay via UPI: ${UPI_ID}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  // ══════════════════════════════════════════════════════════════════════════
  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Billing & Invoices</h1>
            <p className="text-slate-600">Manage patient invoices and hospital charges</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <button onClick={() => setShowExportMenu(v => !v)}
                className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium shadow-sm transition-all">
                <Download className="w-4 h-4" /> Export <ChevronDown className="w-4 h-4" />
              </button>
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 z-10 overflow-hidden">
                  <button onClick={exportToExcel} className="w-full px-4 py-3 text-left hover:bg-emerald-50 flex items-center gap-3 text-slate-700">
                    <Sheet className="w-4 h-4 text-green-600" /><span className="font-medium">Export to Excel</span>
                  </button>
                  <button onClick={exportToPDF} className="w-full px-4 py-3 text-left hover:bg-emerald-50 flex items-center gap-3 text-slate-700 border-t border-slate-100">
                    <FileText className="w-4 h-4 text-red-600" /><span className="font-medium">Export to PDF</span>
                  </button>
                </div>
              )}
            </div>
            <button onClick={() => setShowAddModal(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 flex items-center gap-2 font-semibold shadow-lg transition-all">
              <Plus className="w-5 h-5" /> New Invoice
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Today Invoices', value: todayInvoices, color: 'text-slate-800' },
            { label: 'Total Invoices', value: totalInvoices, color: 'text-green-600' },
            { label: 'Today Revenue', value: `₹${todayRevenue?.toLocaleString?.('en-IN') || 0}`, color: 'text-amber-600' },
            { label: 'Total Revenue', value: `₹${totalRevenue?.toLocaleString?.('en-IN') || 0}`, color: 'text-emerald-600' },
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
            <input type="text" placeholder="Search by invoice ID, patient, or doctor..."
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700" />
          </div>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 text-slate-700 font-medium cursor-pointer">
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
                  {['Sr. No.', 'Patient', 'Doctor', 'Type', 'Date',   'Total',  'Actions'].map(h => (
                    <th key={h} className={`px-4 py-4 text-left font-semibold text-slate-700 ${h === 'Actions' ? 'text-center' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">


                {paginated.length > 0 ? paginated.map(inv => (
                  <tr key={inv.id} className="hover:bg-emerald-50/40 transition-colors">

 <td className="px-6 py-4">
  <div className="flex items-center gap-2">
    <span className="font-semibold text-slate-800">
      {(currentPage - 1) * ITEMS_PER_PAGE + paginated.indexOf(inv) + 1}
    </span>
  </div>
</td>
                    {/* <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span className="font-semibold text-slate-800 text-sm">{inv.invoiceId}</span>
                      </div>
                    </td> */}

                               {/* Patient */}
                   <td className="px-6 py-4">
  <div className="flex items-center gap-2">
   
        <span className="flex-shrink-0 px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-xs font-semibold">
          {inv.patientNumber}
        </span>
     
        <p className="font-semibold text-slate-800 text-sm">{inv.patientName}</p>
  </div>
</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        <Stethoscope className="w-4 h-4 text-teal-500 flex-shrink-0" />
                        <p className="font-medium text-slate-700 text-sm">{inv.doctorName}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${inv.ipdOpd === 'IPD' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                        {inv.ipdOpd || 'OPD'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-600 text-sm">{inv.date}</td>
            
                    {/* <td className="px-4 py-4">
                     {inv.oxygenCharges}
                    </td> */}
                    <td className="px-4 py-4">
                      <span className="font-bold text-slate-800">₹{inv.totalAmount.toLocaleString('en-IN')}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => { setSelectedInvoice(inv); setShowViewModal(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => printInvoice(inv)} className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors" title="Print"><Printer className="w-4 h-4" /></button>
                        <button onClick={() => { setSelectedInvoice(inv); setShowShareModal(true); }} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Share"><Send className="w-4 h-4" /></button>
                        <button onClick={() => handleEditClick(inv)} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit"><FileText className="w-4 h-4" /></button>
                        <button onClick={() => { setSelectedInvoice(inv); setShowDeleteModal(true); }} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={10} className="py-16 text-center">
                    <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">No invoices found</p>
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing <b>{Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}</b>–<b>{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</b> of <b>{filtered.length}</b>
            </p>
            <div className="flex items-center gap-1.5">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                className={`p-2 rounded-lg ${currentPage === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-emerald-50 border border-slate-200'}`}>
                <ChevronLeft className="w-4 h-4" />
              </button>
              {pageNums().map((p, i) => p === '...'
                ? <span key={`e${i}`} className="px-2 text-slate-400 text-sm">…</span>
                : <button key={p} onClick={() => setCurrentPage(p)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${currentPage === p ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' : 'text-slate-600 hover:bg-emerald-50 border border-slate-200'}`}>{p}</button>
              )}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                className={`p-2 rounded-lg ${currentPage === totalPages ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-emerald-50 border border-slate-200'}`}>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Add Modal ── */}
      <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); resetForm(); }} title="New Invoice" size="lg">
        <InvoiceForm form={form} setForm={setForm} patients={patients} doctors={doctors}
          onSubmit={handleCreate} onPrint={handleFormPrint}
          isSubmitting={isSubmitting} submitLabel="Save & Print Invoice"
          onCancel={() => { setShowAddModal(false); resetForm(); }} />
      </Modal>

      {/* ── Edit Modal ── */}
      <Modal isOpen={showEditModal} onClose={() => { setShowEditModal(false); resetForm(); }} title="Edit Invoice" size="lg">
        <InvoiceForm form={form} setForm={setForm} patients={patients} doctors={doctors}
          onSubmit={handleUpdate} onPrint={handleFormPrint}
          isSubmitting={isSubmitting} submitLabel="Update Invoice"
          onCancel={() => { setShowEditModal(false); resetForm(); }} />
      </Modal>

      {/* ── View Modal ── */}
      <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Invoice Details" size="md">
        {selectedInvoice && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Invoice ID', value: selectedInvoice.invoiceId },
                { label: 'Date', value: selectedInvoice.date },
                { label: 'Type', value: selectedInvoice.ipdOpd || 'OPD' },
                { label: 'Patient', value: selectedInvoice.patientName },
                { label: 'Doctor', value: selectedInvoice.doctorName },
                { label: 'Status', value: selectedInvoice.status },
              ].map(row => (
                <div key={row.label} className="bg-slate-50 rounded-xl px-4 py-3">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{row.label}</p>
                  <p className="text-sm font-semibold text-slate-800 capitalize">{row.value}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Charges</p>
              <div className="rounded-xl overflow-hidden border border-slate-200">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-emerald-50 to-teal-50">
                    <tr>{['Category', 'Charge Name', 'Qty', 'Rate', 'Amount'].map(h => (
                      <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-slate-600">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(selectedInvoice.charges || []).map((c, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-3 py-2.5 font-medium text-slate-700">{c.category}</td>
                        <td className="px-3 py-2.5 text-slate-600">{c.chargeName}</td>
                        <td className="px-3 py-2.5 text-slate-600">{c.quantity}</td>
                        <td className="px-3 py-2.5 text-slate-600">₹{parseFloat(c.rate || 0).toLocaleString('en-IN')}</td>
                        <td className="px-3 py-2.5 font-semibold text-slate-800">₹{parseFloat(c.amount || 0).toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                    {selectedInvoice.oxygenCharges?.enabled && (
                      <tr className="bg-sky-50">
                        <td className="px-3 py-2.5 font-semibold text-sky-700">
                          <div className="flex items-center gap-1.5"><Wind className="w-3.5 h-3.5" />Oxygen</div>
                        </td>
                        <td className="px-3 py-2.5 text-sky-600">{selectedInvoice.oxygenCharges.description || 'Oxygen Charges'}</td>
                        <td className="px-3 py-2.5 text-sky-600">{selectedInvoice.oxygenCharges.quantity}</td>
                        <td className="px-3 py-2.5 text-sky-600">₹{parseFloat(selectedInvoice.oxygenCharges.rate || 0).toLocaleString('en-IN')}</td>
                        <td className="px-3 py-2.5 font-semibold text-sky-700">₹{parseFloat(selectedInvoice.oxygenCharges.amount || 0).toLocaleString('en-IN')}</td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr className="bg-emerald-50">
                      <td colSpan={4} className="px-3 py-2.5 font-bold text-slate-700">Grand Total</td>
                      <td className="px-3 py-2.5 font-bold text-emerald-700">₹{selectedInvoice.totalAmount.toLocaleString('en-IN')}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* QR Preview */}
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
              <img src={getQRUrl(selectedInvoice.invoiceId, selectedInvoice.totalAmount)} alt="Pay QR"
                className="w-20 h-20 rounded-lg border-2 border-emerald-200 bg-white p-1" />
              <div>
                <p className="font-semibold text-slate-700 text-sm mb-0.5 flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-emerald-500" /> Scan to Pay via UPI
                </p>
                <p className="text-xs text-slate-500">UPI ID: <span className="font-semibold text-emerald-600">{UPI_ID}</span></p>
                <p className="text-xs text-slate-500 mt-0.5">Amount: <span className="font-bold text-emerald-700">₹{selectedInvoice.totalAmount.toLocaleString('en-IN')}</span></p>
              </div>
            </div>

            {selectedInvoice.notes && (
              <div className="bg-amber-50 rounded-xl px-4 py-3 border border-amber-100">
                <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">Remarks</p>
                <p className="text-sm text-slate-700">{selectedInvoice.notes}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => printInvoice(selectedInvoice)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                <Printer className="w-4 h-4" /> Print
              </button>
              <button onClick={() => { setShowViewModal(false); setShowShareModal(true); }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        )}
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
            <button onClick={handleDelete} disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />} Delete
            </button>
          </div>
        </div>
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
                <span className="text-slate-600">{selectedInvoice.charges?.length || 0} charge(s) · {selectedInvoice.ipdOpd}</span>
                <span className="font-bold text-emerald-700">₹{selectedInvoice.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Share via</p>
              <button onClick={() => handleCopy(selectedInvoice)}
                className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 hover:bg-emerald-50 rounded-xl transition-colors border border-slate-200">
                <div className="w-9 h-9 bg-slate-200 rounded-lg flex items-center justify-center">
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-700 text-sm">{copied ? 'Copied!' : 'Copy Details'}</p>
                  <p className="text-xs text-slate-400">Includes UPI ID for payment</p>
                </div>
              </button>
              <button onClick={() => printInvoice(selectedInvoice)}
                className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 hover:bg-emerald-50 rounded-xl transition-colors border border-slate-200">
                <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Printer className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-700 text-sm">Print / Download PDF</p>
                  <p className="text-xs text-slate-400">Includes QR code for UPI payment</p>
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