// 'use client';

// import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
// import {
//   Plus, Search, Download, Eye, X, ChevronDown, Edit,
//   Pill, Stethoscope, Trash2, Printer, ChevronLeft,
//   ChevronRight, Loader2, ClipboardList, User, Calendar,
//   Tag, AlignLeft, Hash,
// } from 'lucide-react';
// import {
//   getPatients, getDoctorApi, getMedicines,
//   getPrescriptionApi, createPrescriptionApi,
//   updatePrescriptionApi, deletePrescriptionApi,
  
// } from '../../lib/commonApis';
// import { showToast } from '../../lib/notification';

// // ─────────────────────────────────────────────────────────────────────────────
// // CONSTANTS
// // ─────────────────────────────────────────────────────────────────────────────

// const FREQUENCY_OPTIONS = [
//   { label: 'OD – Once Daily (×1)',         value: 1, abbr: 'OD',   api: '1 time a day'   },
//   { label: 'BD – Twice Daily (×2)',         value: 2, abbr: 'BD',   api: '2 times a day'  },
//   { label: 'TDS – Three Times Daily (×3)', value: 3, abbr: 'TDS',  api: '3 times a day'  },
//   { label: 'QID – Four Times Daily (×4)', value: 4, abbr: 'QID',  api: '4 times a day'  },
//   { label: 'Q6H – Every 6 Hours (×4)',    value: 4, abbr: 'Q6H',  api: 'every 6 hours'  },
//   { label: 'Q8H – Every 8 Hours (×3)',    value: 3, abbr: 'Q8H',  api: 'every 8 hours'  },
//   { label: 'Q12H – Every 12 Hours (×2)', value: 2, abbr: 'Q12H', api: 'every 12 hours' },
//   { label: 'SOS – As Needed (×1)',        value: 1, abbr: 'SOS',  api: 'SOS'            },
//   { label: 'PRN – When Required (×1)',    value: 1, abbr: 'PRN',  api: 'PRN'            },
//   { label: 'Stat – Immediately (×1)',     value: 1, abbr: 'Stat', api: 'Stat'           },
// ];

// const TIMING_OPTIONS = [
//   { label: 'AC – Before Meals', abbr: 'AC'  },
//   { label: 'PC – After Meals',  abbr: 'PC'  },
//   { label: 'Empty Stomach',     abbr: 'ES'  },
//   { label: 'With Food',         abbr: 'WF'  },
//   { label: 'HS – At Bedtime',   abbr: 'HS'  },
//   { label: 'Mane – Morning',    abbr: 'M'   },
//   { label: 'Nocte – Night',     abbr: 'N'   },
//   { label: 'Afternoon',         abbr: 'AF'  },
//   { label: 'Evening',           abbr: 'EVE' },
//   { label: 'Between Meals',     abbr: 'BM'  },
// ];

// const MED_TYPES = ['tablet', 'capsule', 'syrup', 'injection', 'drops', 'cream', 'suspension'];

// const EMPTY_MED_ROW = {
//   name: '',
//   type: 'tablet',
//   frequency: 'OD',
//   timing: 'PC',
//   days: '',
//   totalQuantity: 0,
// };

// const ITEMS_PER_PAGE = 10;

// // ─────────────────────────────────────────────────────────────────────────────
// // PURE HELPERS
// // ─────────────────────────────────────────────────────────────────────────────
// function today() { return new Date().toISOString().split('T')[0]; }

// function calcTotal(frequencyAbbr, days) {
//   const freqVal = FREQUENCY_OPTIONS.find(f => f.abbr === frequencyAbbr)?.value || 1;
//   return freqVal * (Number(days) || 0);
// }

// function apiFreqToAbbr(apiStr) {
//   if (!apiStr) return 'OD';
//   const s = apiStr.toLowerCase().trim();
//   const found = FREQUENCY_OPTIONS.find(f =>
//     f.api.toLowerCase() === s || f.abbr.toLowerCase() === s
//   );
//   return found ? found.abbr : 'OD';
// }

// function abbrToApiFreq(abbr) {
//   return FREQUENCY_OPTIONS.find(f => f.abbr === abbr)?.api || abbr;
// }

// function normalizeRx(item) {
//   return {
//     id: item.id,
//     prescriptionId: item.id,
//     patientId: item.patientId,
//     patientName: item.patient?.name || `Patient #${item.patientId}`,
//     doctorId: item.doctorId,
//     doctorName: item.doctor?.name || `Doctor #${item.doctorId}`,
//     type: item.type || 'OPD',
//     date: item.prescriptionDate?.split('T')[0] || today(),
//     diagnosis: item.diagnosis || '',
//     instructions: item.notes || '',
//     medicines: (item.medicines || []).map(m => ({
//       name: m.name || '',
//       type: m.type || 'tablet',
//       frequency: apiFreqToAbbr(m.frequency),
//       timing: m.timing || 'PC',
//       days: m.days || 0,
//       totalQuantity: m.totalQuantity || calcTotal(apiFreqToAbbr(m.frequency), m.days),
//     })),
//   };
// }

// function buildPayload(f) {
//   return {
//     patientId: parseInt(f.patientId),
//     doctorId: parseInt(f.doctorId),
//     diagnosis: f.diagnosis,
//     notes: f.instructions,
//     prescriptionDate: new Date(f.date).toISOString(),
//     medicines: f.medicines.map(m => ({
//       name: m.name,
//       type: m.type,
//       frequency: abbrToApiFreq(m.frequency),
//       days: parseInt(m.days) || 0,
//       totalQuantity: m.totalQuantity || calcTotal(m.frequency, m.days),
//     })),
//   };
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // PRINT
// // ─────────────────────────────────────────────────────────────────────────────
// function printPrescription(rx) {
//   const getFreqLabel = (abbr) => {
//     const f = FREQUENCY_OPTIONS.find(f => f.abbr === abbr);
//     return f ? `${f.abbr} (${f.api})` : abbr;
//   };
//   const getTimingLabel = (abbr) => TIMING_OPTIONS.find(t => t.abbr === abbr)?.label || abbr;

//   const rows = (rx.medicines || []).map((m, i) => `
//     <tr>
//       <td><strong>${i + 1}.</strong> ${m.name}</td>
//       <td style="text-align:center;text-transform:capitalize">${m.type}</td>
//       <td style="text-align:center">${getFreqLabel(m.frequency)}</td>
//       <td style="text-align:center">${getTimingLabel(m.timing)}</td>
//       <td style="text-align:center">${m.days} days</td>
//       <td style="text-align:center;font-weight:700;color:#059669">${m.totalQuantity}</td>
//     </tr>`).join('');

//   const html = `<!DOCTYPE html><html><head><title>Prescription #${rx.prescriptionId || ''}</title>
// <style>
// *{margin:0;padding:0;box-sizing:border-box}
// body{font-family:'Segoe UI',Arial,sans-serif;background:#f8fafc;color:#1e293b}
// .page{max-width:820px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.10)}
// .header{background:linear-gradient(135deg,#059669,#0d9488);color:#fff;padding:28px 40px;display:flex;justify-content:space-between;align-items:flex-start}
// .header-left h1{font-size:22px;font-weight:800;letter-spacing:-.5px}
// .header-left p{margin-top:4px;opacity:.85;font-size:12px;line-height:1.7}
// .rx-id{font-size:18px;font-weight:800;background:rgba(255,255,255,.2);padding:5px 14px;border-radius:10px;display:inline-block}
// .rx-date{margin-top:6px;opacity:.85;font-size:12px;text-align:right}
// .body{padding:26px 40px}
// .meta{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:20px;padding-bottom:18px;border-bottom:1px solid #e2e8f0}
// .meta-block h3{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#94a3b8;margin-bottom:4px}
// .meta-block p{font-size:14px;font-weight:600;color:#1e293b}
// .badge{display:inline-block;padding:3px 14px;border-radius:99px;font-size:12px;font-weight:700}
// .ipd{background:#dbeafe;color:#1d4ed8}.opd{background:#dcfce7;color:#16a34a}
// .sec-title{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#64748b;margin-bottom:8px;display:flex;align-items:center;gap:6px}
// .sec-title::before{content:'';display:block;width:3px;height:14px;background:#059669;border-radius:2px}
// table{width:100%;border-collapse:collapse;margin-bottom:18px;font-size:12.5px}
// thead tr{background:#f0fdf4;border-bottom:2px solid #bbf7d0}
// thead th{padding:9px 10px;text-align:left;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#059669}
// tbody td{padding:9px 10px;border-bottom:1px solid #f1f5f9}
// tbody tr:last-child td{border-bottom:none}
// tbody tr:nth-child(even){background:#fafafa}
// .box{border-radius:10px;padding:13px 16px;margin-bottom:14px}
// .box-green{background:#f0fdf4;border-left:4px solid #059669}
// .box-amber{background:#fffbeb;border-left:4px solid #f59e0b}
// .box h3{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px}
// .box-green h3{color:#059669}.box-amber h3{color:#d97706}
// .box p{font-size:13px;color:#334155;line-height:1.6}
// .footer{display:flex;justify-content:space-between;align-items:flex-end;padding:18px 40px;border-top:1px solid #f1f5f9}
// .footer .left{color:#94a3b8;font-size:11px;line-height:1.8}
// .sig .line{border-bottom:1.5px solid #334155;width:190px;margin-bottom:5px}
// .sig p{font-size:11px;color:#64748b;text-align:right}
// .sig .doc{font-size:13px;font-weight:700;color:#1e293b;text-align:right}
// @media print{body{background:#fff}.page{box-shadow:none;margin:0;border-radius:0}}
// </style></head><body><div class="page">
// <div class="header">
//   <div class="header-left">
//     <h1>MediCare Hospital</h1>
//     <p>123 Health Avenue, New Delhi – 110001<br>rx@medicare.in &nbsp;|&nbsp; +91 11 2345 6789</p>
//   </div>
//   <div>
//     <div class="rx-id">RX #${rx.prescriptionId || 'PREVIEW'}</div>
//     <div class="rx-date">Date: ${rx.date}</div>
//   </div>
// </div>
// <div class="body">
//   <div class="meta">
//     <div class="meta-block"><h3>Patient</h3><p>${rx.patientName}</p></div>
//     <div class="meta-block"><h3>Prescribed By</h3><p>${rx.doctorName}</p></div>
//     <div class="meta-block"><h3>Type</h3><span class="badge ${rx.type === 'IPD' ? 'ipd' : 'opd'}">${rx.type}</span></div>
//   </div>
//   ${rx.diagnosis ? `<div class="box box-green"><h3>Diagnosis / Notes</h3><p>${rx.diagnosis}</p></div>` : ''}
//   <div class="sec-title">Medicines</div>
//   <table>
//     <thead><tr>
//       <th>Medicine</th><th style="text-align:center">Form</th>
//       <th style="text-align:center">Frequency</th><th style="text-align:center">Timing</th>
//       <th style="text-align:center">Duration</th><th style="text-align:center">Total Qty</th>
//     </tr></thead>
//     <tbody>${rows}</tbody>
//   </table>
//   ${rx.instructions ? `<div class="box box-amber"><h3>⚠ Special Instructions</h3><p>${rx.instructions}</p></div>` : ''}
// </div>
// <div class="footer">
//   <div class="left">
//     <p>This prescription is valid for 30 days from the date of issue.</p>
//     <p>MediCare Hospital &nbsp;•&nbsp; Get well soon!</p>
//   </div>
//   <div class="sig">
//     <div class="line"></div>
//     <p class="doc">${rx.doctorName}</p>
//     <p>Doctor's Signature</p>
//   </div>
// </div>
// </div></body></html>`;

//   const win = window.open('', '_blank', 'height=800,width=940');
//   win.document.write(html);
//   win.document.close();
//   win.focus();
//   setTimeout(() => win.print(), 350);
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // MEDICINE SEARCHABLE SELECT  (name-string based) — UNCHANGED
// // ─────────────────────────────────────────────────────────────────────────────
// function MedicineSelect({ options, value, onChange, placeholder = 'Select' }) {
//   const [open, setOpen] = useState(false);
//   const [q, setQ] = useState('');
//   const ref = useRef(null);

//   const filtered = useMemo(
//     () => options.filter(o => o.name.toLowerCase().includes(q.toLowerCase())),
//     [options, q]
//   );

//   useEffect(() => {
//     const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
//     document.addEventListener('mousedown', h);
//     return () => document.removeEventListener('mousedown', h);
//   }, []);

//   return (
//     <div ref={ref} className="relative">
//       <button type="button" onClick={() => setOpen(v => !v)}
//         className={`w-full flex items-center justify-between px-3 py-2 bg-white border-2 rounded-lg text-xs transition-all ${open ? 'border-emerald-500' : 'border-transparent'} text-slate-700`}>
//         <span className={`truncate ${value ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>{value || placeholder}</span>
//         <ChevronDown className={`w-3.5 h-3.5 text-slate-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
//       </button>
//       {open && (
//         <div className="absolute z-40 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
//           <div className="p-2 border-b border-slate-100">
//             <div className="relative">
//               <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
//               <input autoFocus type="text" value={q} onChange={e => setQ(e.target.value)}
//                 placeholder="Search..." className="w-full pl-7 pr-2 py-1.5 text-xs bg-slate-50 rounded-lg focus:outline-none text-slate-800" />
//             </div>
//           </div>
//           <div className="max-h-44 overflow-y-auto">
//             {filtered.length === 0
//               ? <p className="px-3 py-2 text-xs text-slate-400 text-center">No results</p>
//               : filtered.map(o => (
//                 <button type="button" key={o.id}
//                   onClick={() => { onChange(o.name); setOpen(false); setQ(''); }}
//                   className={`w-full text-left px-3 py-2 text-xs hover:bg-emerald-50 transition-colors ${o.name === value ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-700'}`}>
//                   {o.name}
//                 </button>
//               ))
//             }
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // ENTITY SELECT
// // CHANGES:
// //   1. Search karta hai name + patientNumber dono se (agar patientNumber field ho)
// //   2. Dropdown list me patientNumber badge show hota hai (agar ho)
// //   3. Selected state me "P-101 · Name" format show hota hai
// //   4. Search input ka text color fix — text-slate-800 (black) hardcoded
// //   5. Doctor ke liye koi change nahi — patientNumber nahi hoga unme
// // ─────────────────────────────────────────────────────────────────────────────
// function EntitySelect({ options, value, onChange, placeholder, idKey = 'id' }) {
//   const [open, setOpen] = useState(false);
//   const [q, setQ] = useState('');
//   const ref = useRef(null);

//   // Search: name + patientNumber dono se match karo
//   const filtered = useMemo(() => {
//     const lower = q.toLowerCase();
//     return options.filter(o =>
//       o.name.toLowerCase().includes(lower) ||
//       (o.patientNumber && o.patientNumber.toLowerCase().includes(lower))
//     );
//   }, [options, q]);

//   const selected = options.find(o => String(o[idKey]) === String(value));

//   useEffect(() => {
//     const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
//     document.addEventListener('mousedown', h);
//     return () => document.removeEventListener('mousedown', h);
//   }, []);

//   // Selected label: agar patientNumber ho to "P-101 · Name", warna sirf Name
//   const getSelectedLabel = (o) => {
//     if (!o) return null;
//     if (o.patientNumber) return `${o.patientNumber} · ${o.name}`;
//     return o.name;
//   };

//   return (
//     <div ref={ref} className="relative">
//       <button type="button" onClick={() => setOpen(v => !v)}
//         className={`w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 border-2 rounded-xl text-sm transition-all ${open ? 'border-emerald-500 bg-white' : 'border-transparent'} text-slate-700`}>
//         <span className={selected ? 'text-slate-800 font-medium' : 'text-slate-400'}>
//           {selected ? getSelectedLabel(selected) : placeholder}
//         </span>
//         <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
//       </button>

//       {open && (
//         <div className="absolute z-30 mt-1.5 w-full bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
//           <div className="p-2 border-b border-slate-100">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
//               {/* FIX: text-slate-800 hardcoded so it's always dark/visible regardless of theme */}
//               <input
//                 autoFocus
//                 type="text"
//                 value={q}
//                 onChange={e => setQ(e.target.value)}
//                 placeholder={
//                   options.length > 0 && options[0].patientNumber
//                     ? 'Search by name or patient no...'
//                     : 'Search...'
//                 }
//                 className="w-full pl-8 pr-3 py-1.5 text-sm bg-slate-50 rounded-lg focus:outline-none text-slate-800 placeholder-slate-400"
//               />
//             </div>
//           </div>

//           <div className="max-h-48 overflow-y-auto">
//             {filtered.length === 0
//               ? <p className="px-4 py-3 text-sm text-slate-400 text-center">No results</p>
//               : filtered.map(o => (
//                 <button
//                   type="button"
//                   key={o[idKey]}
//                   onClick={() => { onChange(String(o[idKey])); setOpen(false); setQ(''); }}
//                   className={`w-full text-left px-4 py-2.5 text-sm hover:bg-emerald-50 transition-colors flex items-center gap-2.5 ${
//                     String(o[idKey]) === String(value) ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-700'
//                   }`}
//                 >
//                   {/* Patient number badge — only shown when patientNumber exists */}
//                   {o.patientNumber && (
//                     <span className="flex-shrink-0 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-xs font-semibold">
//                       {o.patientNumber}
//                     </span>
//                   )}
//                   <span className="truncate">{o.name}</span>
//                 </button>
//               ))
//             }
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // MODAL — UNCHANGED
// // ─────────────────────────────────────────────────────────────────────────────
// function Modal({ isOpen, onClose, title, children, size = 'md' }) {
//   if (!isOpen) return null;
//   const sizeMap = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-5xl' };
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
//       <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeMap[size]} border border-slate-100 flex flex-col max-h-[92vh] overflow-hidden`}
//         onClick={e => e.stopPropagation()}>
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

// const typeBadgeCls = (type) => type === 'IPD' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700';

// // ─────────────────────────────────────────────────────────────────────────────
// // PRESCRIPTION FORM — UNCHANGED (only Patient label cleaned up)
// // ─────────────────────────────────────────────────────────────────────────────
// function PrescriptionForm({ form, setForm, patients, doctors, medicineOptions, isSubmitting, onCancel, onSubmit, submitLabel }) {
//   const handleMedChange = (idx, field, value) => {
//     setForm(prev => {
//       const updated = prev.medicines.map((m, i) => {
//         if (i !== idx) return m;
//         const next = { ...m, [field]: value };
//         next.totalQuantity = calcTotal(
//           field === 'frequency' ? value : next.frequency,
//           field === 'days' ? value : next.days,
//         );
//         return next;
//       });
//       return { ...prev, medicines: updated };
//     });
//   };

//   const addMedRow = () => setForm(p => ({ ...p, medicines: [...p.medicines, { ...EMPTY_MED_ROW }] }));
//   const removeMedRow = (idx) => {
//     if (form.medicines.length === 1) return;
//     setForm(p => ({ ...p, medicines: p.medicines.filter((_, i) => i !== idx) }));
//   };

//   const buildPreviewRx = () => ({
//     prescriptionId: 'PREVIEW',
//     patientName: patients.find(p => String(p.id) === String(form.patientId))?.name || '—',
//     doctorName: doctors.find(d => String(d.id) === String(form.doctorId))?.name || '—',
//     type: form.type, date: form.date,
//     diagnosis: form.diagnosis, instructions: form.instructions,
//     medicines: form.medicines,
//   });

//   return (
//     <form onSubmit={onSubmit} className="space-y-5">
//       {/* Header row */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
//             <User className="inline w-3 h-3 mr-1" />Patient *
//           </label>
//           <EntitySelect
//             options={patients}
//             value={form.patientId}
//             onChange={v => setForm(p => ({ ...p, patientId: v }))}
//             placeholder="Select patient"
//           />
//         </div>
//         <div>
//           <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
//             <Stethoscope className="inline w-3 h-3 mr-1" />Doctor *
//           </label>
//           <EntitySelect
//             options={doctors}
//             value={form.doctorId}
//             onChange={v => setForm(p => ({ ...p, doctorId: v }))}
//             placeholder="Select doctor"
//           />
//         </div>
//         <div>
//           <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
//             <Tag className="inline w-3 h-3 mr-1" />IPD / OPD *
//           </label>
//           <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
//             className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm">
//             <option value="OPD">OPD – Out Patient</option>
//             <option value="IPD">IPD – In Patient</option>
//           </select>
//         </div>
//         <div>
//           <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
//             <Calendar className="inline w-3 h-3 mr-1" />Prescription Date
//           </label>
//           <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
//             className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" />
//         </div>
//       </div>

//       <div>
//         <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
//           <AlignLeft className="inline w-3 h-3 mr-1" />Diagnosis / Notes
//         </label>
//         <textarea rows={2} value={form.diagnosis} onChange={e => setForm(p => ({ ...p, diagnosis: e.target.value }))}
//           placeholder="Optional diagnosis or clinical notes..."
//           className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm resize-none" />
//       </div>

//       {/* Medicines */}
//       <div>
//         <div className="flex items-center justify-between mb-2">
//           <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
//             <Pill className="inline w-3 h-3 mr-1" />Medicines *
//           </label>
//           <button type="button" onClick={addMedRow}
//             className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
//             <Plus className="w-3.5 h-3.5" /> Add Medicine
//           </button>
//         </div>

//         <div className="grid grid-cols-12 gap-2 px-1 mb-1">
//           {[['Medicine', 'col-span-3'], ['Form', 'col-span-2'], ['Frequency', 'col-span-3'], ['Timing', 'col-span-2'], ['Days', 'col-span-1'], ['Total', 'col-span-1']].map(([l, c]) => (
//             <div key={l} className={`${c} text-xs font-semibold text-slate-400 uppercase tracking-wider`}>{l}</div>
//           ))}
//         </div>

//         <div className="space-y-2">
//           {form.medicines.map((med, idx) => (
//             <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-slate-50 rounded-xl p-2">
//               <div className="col-span-3">
//                 <MedicineSelect options={medicineOptions} value={med.name}
//                   onChange={v => handleMedChange(idx, 'name', v)} placeholder="Select" />
//               </div>
//               <div className="col-span-2">
//                 <select value={med.type} onChange={e => handleMedChange(idx, 'type', e.target.value)}
//                   className="w-full px-2 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-xs capitalize">
//                   {MED_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
//                 </select>
//               </div>
//               <div className="col-span-3">
//                 <select value={med.frequency} onChange={e => handleMedChange(idx, 'frequency', e.target.value)}
//                   className="w-full px-2 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-xs">
//                   {FREQUENCY_OPTIONS.map(f => <option key={f.abbr} value={f.abbr}>{f.label}</option>)}
//                 </select>
//               </div>
//               <div className="col-span-2">
//                 <select value={med.timing} onChange={e => handleMedChange(idx, 'timing', e.target.value)}
//                   className="w-full px-2 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-xs">
//                   {TIMING_OPTIONS.map(t => (
//                     <option key={t.abbr} value={t.abbr}>{t.abbr} – {t.label.replace(/^[A-Z]+ – /, '')}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className="col-span-1">
//                 <input type="number" min="1" placeholder="Days" value={med.days} required
//                   onChange={e => handleMedChange(idx, 'days', e.target.value)}
//                   className="w-full px-2 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-xs text-center" />
//               </div>
//               <div className="col-span-1">
//                 <div className="px-2 py-2 bg-emerald-50 border-2 border-emerald-100 rounded-lg text-emerald-700 text-sm font-bold text-center">
//                   {med.totalQuantity || 0}
//                 </div>
//               </div>
//               <button type="button" onClick={() => removeMedRow(idx)}
//                 className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
//                 <Trash2 className="w-4 h-4" />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div>
//         <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
//           <Hash className="inline w-3 h-3 mr-1" />Special Instructions
//         </label>
//         <textarea rows={2} value={form.instructions} onChange={e => setForm(p => ({ ...p, instructions: e.target.value }))}
//           placeholder="e.g. After meal, drink warm water, avoid spicy food..."
//           className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm resize-none" />
//       </div>

//       <div className="flex gap-3 pt-2">
//         <button type="button" onClick={onCancel}
//           className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
//           Cancel
//         </button>
//         <button type="button" onClick={() => printPrescription(buildPreviewRx())}
//           className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors flex items-center gap-2">
//           <Printer className="w-4 h-4" /> Preview
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

// // ─────────────────────────────────────────────────────────────────────────────
// // MAIN PAGE
// // ─────────────────────────────────────────────────────────────────────────────
// const initForm = () => ({
//   patientId: '', doctorId: '', type: 'OPD', date: today(),
//   diagnosis: '', instructions: '', medicines: [{ ...EMPTY_MED_ROW }],
// });

// export default function PrescriptionPage() {
//   const [patients, setPatients] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [medicineOptions, setMedicineOptions] = useState([]);
//   const [loadingData, setLoadingData] = useState(true);

//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loadingList, setLoadingList] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);

//   const [counts, setCounts] = useState({ todayRx: 0, totalRx: 0, ipdCount: 0, opdCount: 0 });

//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedRx, setSelectedRx] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [form, setForm] = useState(initForm());

//   // ── Loaders ───────────────────────────────────────────────────────────────
//   const loadPrescriptions = useCallback(async () => {
//     setLoadingList(true);
//     try {
//       const res = await getPrescriptionApi(1000, 1);
//       console.log(res,'ressssssss');
//       const arr = res?.data?.prescriptions || res?.data || res || [];
//       setPrescriptions(Array.isArray(arr) ? arr.map(normalizeRx) : []);
//     } catch (err) {
//       console.error(err);
//       showToast('error', 'Failed', 'Could not load prescriptions');
//     } finally {
//       setLoadingList(false);
//     }
//   }, []);

//   const loadCounts = useCallback(async () => {
//     try {
//       setCounts({
//         todayRx: 10,
//         totalRx: 20,
//         ipdCount: 5,
//         opdCount: 15,
//       });
//     } catch (err) { console.error('Count error:', err); }
//   }, []);

//   const loadDropdowns = useCallback(async () => {
//     setLoadingData(true);
//     try {
//       const [pRes, dRes, mRes] = await Promise.all([
//         getPatients(100, 1), getDoctorApi(100, 1), getMedicines(100, 1),
//       ]);
//       console.log(pRes,'pressssssssss');

//       // CHANGE: patientNumber field bhi include kiya — EntitySelect me badge aur dual search ke liye
//       setPatients(
//         (pRes?.data?.data || pRes?.data || []).map(p => ({
//           id: p.id,
//           name: p.name,
//           patientNumber: p.patientNumber || null,
//         }))
//       );

//       setDoctors((dRes?.data?.data?.doctors || dRes?.data?.doctors || []).map(d => ({ id: d.id, name: d.name })));
//       setMedicineOptions((mRes?.data?.medicines || mRes?.data || []).map(m => ({ id: m.id, name: m.name })));
//     } catch (err) {
//       console.error(err);
//       showToast('error', 'Failed', 'Could not load dropdown data');
//     } finally {
//       setLoadingData(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadDropdowns();
//     loadPrescriptions();
//     loadCounts();
//   }, [loadDropdowns, loadPrescriptions, loadCounts]);

//   // ── CRUD — ALL UNCHANGED ──────────────────────────────────────────────────
//   const handleCreate = async (e) => {
//     e.preventDefault();
//     if (!form.patientId || !form.doctorId) {
//       showToast('error', 'Validation', 'Patient and Doctor are required'); return;
//     }
//     setIsSubmitting(true);
//     try {
//       const res = await createPrescriptionApi(buildPayload(form));
//       await Promise.all([loadPrescriptions(), loadCounts()]);
//       const saved = res?.data || {};
//       const printRx = {
//         prescriptionId: saved.id || '—',
//         patientName: patients.find(p => String(p.id) === String(form.patientId))?.name || '—',
//         doctorName: doctors.find(d => String(d.id) === String(form.doctorId))?.name || '—',
//         type: form.type, date: form.date,
//         diagnosis: form.diagnosis, instructions: form.instructions,
//         medicines: form.medicines,
//       };
//       setShowAddModal(false);
//       setForm(initForm());
//       setCurrentPage(1);
//       showToast('success', 'Saved', 'Prescription saved! Opening print...');
//       setTimeout(() => printPrescription(printRx), 350);
//     } catch (err) {
//       console.error(err);
//       showToast('error', 'Failed', err.message || 'Could not create prescription');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!form.patientId || !form.doctorId) {
//       showToast('error', 'Validation', 'Patient and Doctor are required'); return;
//     }
//     setIsSubmitting(true);
//     try {
//       await updatePrescriptionApi(selectedRx.id, buildPayload(form));
//       await Promise.all([loadPrescriptions(), loadCounts()]);
//       setShowEditModal(false);
//       setSelectedRx(null);
//       setForm(initForm());
//       showToast('success', 'Updated', 'Prescription updated successfully!');
//     } catch (err) {
//       console.error(err);
//       showToast('error', 'Failed', err.message || 'Could not update prescription');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDelete = async () => {
//     setIsSubmitting(true);
//     try {
//       await deletePrescriptionApi(selectedRx.id);
//       await Promise.all([loadPrescriptions(), loadCounts()]);
//       setShowDeleteModal(false);
//       setSelectedRx(null);
//       showToast('success', 'Deleted', 'Prescription deleted');
//     } catch (err) {
//       console.error(err);
//       showToast('error', 'Failed', 'Could not delete prescription');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleEditClick = (rx) => {
//     setSelectedRx(rx);
//     setForm({
//       patientId: String(rx.patientId),
//       doctorId: String(rx.doctorId),
//       type: rx.type || 'OPD',
//       date: rx.date,
//       diagnosis: rx.diagnosis || '',
//       instructions: rx.instructions || '',
//       medicines: rx.medicines.length > 0 ? rx.medicines.map(m => ({ ...m })) : [{ ...EMPTY_MED_ROW }],
//     });
//     setShowEditModal(true);
//   };

//   // ── Filter + Pagination — UNCHANGED ──────────────────────────────────────
//   const filtered = useMemo(() => {
//     const s = searchTerm.toLowerCase();
//     return prescriptions.filter(rx => {
//       const matchSearch =
//         String(rx.prescriptionId).toLowerCase().includes(s) ||
//         (rx.patientName || '').toLowerCase().includes(s) ||
//         (rx.doctorName || '').toLowerCase().includes(s);
//       return matchSearch && (filterType === 'all' || rx.type === filterType);
//     });
//   }, [prescriptions, searchTerm, filterType]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
//   useEffect(() => { setCurrentPage(1); }, [searchTerm, filterType]);

//   const paginated = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return filtered.slice(start, start + ITEMS_PER_PAGE);
//   }, [filtered, currentPage]);

//   const getPageNumbers = () => {
//     const pages = [];
//     if (totalPages <= 7) for (let i = 1; i <= totalPages; i++) pages.push(i);
//     else if (currentPage <= 4) pages.push(1, 2, 3, 4, 5, '...', totalPages);
//     else if (currentPage >= totalPages - 3) pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
//     else pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
//     return pages;
//   };

//   const exportCSV = () => {
//     const headers = ['ID', 'Patient', 'Doctor', 'Type', 'Date', 'Medicines', 'Diagnosis'];
//     const rows = filtered.map(rx => [
//       rx.prescriptionId, `"${rx.patientName}"`, `"${rx.doctorName}"`,
//       rx.type, rx.date,
//       `"${rx.medicines.map(m => m.name).join(', ')}"`,
//       `"${rx.diagnosis || ''}"`,
//     ].join(','));
//     const blob = new Blob([[headers.join(','), ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = `prescriptions_${today()}.csv`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // ═════════════════════════════════════════════════════════════════════════
//   // RENDER — UNCHANGED
//   // ═════════════════════════════════════════════════════════════════════════
//   return (
//     <div className="p-8">

//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h1 className="text-4xl font-bold text-slate-800 mb-2">Doctor Prescriptions</h1>
//             <p className="text-slate-600">Manage and issue patient prescriptions</p>
//           </div>
//           <div className="flex gap-3">
//             <button onClick={exportCSV}
//               className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 text-slate-700 font-medium shadow-sm">
//               <Download className="w-4 h-4" /> Export CSV
//             </button>
//             <button onClick={() => { setForm(initForm()); setShowAddModal(true); }}
//               className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 font-semibold shadow-lg">
//               <Plus className="w-5 h-5" /> New Prescription
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//           {[
//             { label: "Today's Rx", value: counts.todayRx, color: 'text-slate-800' },
//             { label: 'Total Rx',   value: counts.totalRx, color: 'text-emerald-600' },
//             { label: 'IPD',        value: counts.ipdCount, color: 'text-blue-600' },
//             { label: 'OPD',        value: counts.opdCount, color: 'text-teal-600' },
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
//             <input type="text" placeholder="Search by ID, patient or doctor..."
//               value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700" />
//           </div>
//           <select value={filterType} onChange={e => setFilterType(e.target.value)}
//             className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 text-slate-700 font-medium cursor-pointer">
//             <option value="all">All Types</option>
//             <option value="OPD">OPD</option>
//             <option value="IPD">IPD</option>
//           </select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-6">
//         {loadingList ? (
//           <div className="py-16 text-center">
//             <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-2" />
//             <p className="text-slate-400 text-sm">Loading prescriptions...</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
//                 <tr>
//                   {['Rx ID', 'Patient', 'Doctor', 'Type', 'Date', 'Medicines', 'Diagnosis', 'Actions'].map(h => (
//                     <th key={h} className={`px-6 py-4 text-left font-semibold text-slate-700 ${h === 'Actions' ? 'text-center' : ''}`}>{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {paginated.length > 0 ? paginated.map(rx => (
//                   <tr key={rx.id} className="hover:bg-emerald-50/40 transition-colors">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <ClipboardList className="w-4 h-4 text-emerald-600 flex-shrink-0" />
//                         <span className="font-semibold text-slate-800">#{rx.prescriptionId}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
//                           {rx.patientName?.charAt(0)}
//                         </div>
//                         <div>
//                           <p className="font-semibold text-slate-800 text-sm">{rx.patientName}</p>
//                           {/* CHANGE: patientNumber badge in listing — find from patients array */}
//                           {(() => {
//                             const pt = patients.find(p => String(p.id) === String(rx.patientId));
//                             return pt?.patientNumber ? (
//                               <span className="inline-block mt-0.5 px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-xs font-semibold">
//                                 {pt.patientNumber}
//                               </span>
//                             ) : null;
//                           })()}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <Stethoscope className="w-4 h-4 text-teal-500 flex-shrink-0" />
//                         <p className="font-medium text-slate-700 text-sm">{rx.doctorName}</p>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-bold ${typeBadgeCls(rx.type)}`}>{rx.type}</span>
//                     </td>
//                     <td className="px-6 py-4 text-slate-600 text-sm">{rx.date}</td>
//                     <td className="px-6 py-4">
//                       <div className="flex flex-wrap gap-1">
//                         {rx.medicines.slice(0, 2).map((m, i) => (
//                           <span key={i} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs font-medium border border-emerald-100">
//                             {m.name}
//                           </span>
//                         ))}
//                         {rx.medicines.length > 2 && (
//                           <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium">+{rx.medicines.length - 2}</span>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <p className="text-sm text-slate-600 max-w-[140px] truncate">{rx.diagnosis || '—'}</p>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center justify-center gap-1">
//                         <button onClick={() => { setSelectedRx(rx); setShowViewModal(true); }}
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
//                           <Eye className="w-4 h-4" />
//                         </button>
//                         <button onClick={() => printPrescription(rx)}
//                           className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors" title="Print">
//                           <Printer className="w-4 h-4" />
//                         </button>
//                         <button onClick={() => handleEditClick(rx)}
//                           className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
//                           <Edit className="w-4 h-4" />
//                         </button>
//                         <button onClick={() => { setSelectedRx(rx); setShowDeleteModal(true); }}
//                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 )) : (
//                   <tr>
//                     <td colSpan={8} className="py-16 text-center">
//                       <ClipboardList className="w-12 h-12 text-slate-300 mx-auto mb-3" />
//                       <p className="text-slate-500 font-medium">No prescriptions found</p>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Pagination — UNCHANGED */}
//         {totalPages > 1 && (
//           <div className="px-6 py-4 border-t border-slate-100">
//             <div className="flex items-center justify-between">
//               <p className="text-sm text-slate-600">
//                 Showing <span className="font-semibold">{Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}</span>–
//                 <span className="font-semibold">{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of{' '}
//                 <span className="font-semibold">{filtered.length}</span>
//               </p>
//               <div className="flex items-center gap-1.5">
//                 <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
//                   className={`p-2 rounded-lg transition-all ${currentPage === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-emerald-50 border border-slate-200'}`}>
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>
//                 {getPageNumbers().map((p, i) =>
//                   p === '...'
//                     ? <span key={`e${i}`} className="px-2 text-slate-400 text-sm">…</span>
//                     : <button key={p} onClick={() => setCurrentPage(p)}
//                       className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${currentPage === p ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' : 'text-slate-600 hover:bg-emerald-50 border border-slate-200'}`}>
//                       {p}
//                     </button>
//                 )}
//                 <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
//                   className={`p-2 rounded-lg transition-all ${currentPage === totalPages ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-emerald-50 border border-slate-200'}`}>
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ── Add Modal ── */}
//       <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); setForm(initForm()); }} title="New Prescription" size="lg">
//         {loadingData
//           ? <div className="py-10 text-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-2" /><p className="text-slate-400 text-sm">Loading...</p></div>
//           : <PrescriptionForm form={form} setForm={setForm} patients={patients} doctors={doctors}
//               medicineOptions={medicineOptions} isSubmitting={isSubmitting}
//               onCancel={() => { setShowAddModal(false); setForm(initForm()); }}
//               onSubmit={handleCreate} submitLabel="Save & Print" />
//         }
//       </Modal>

//       {/* ── Edit Modal ── */}
//       <Modal isOpen={showEditModal} onClose={() => { setShowEditModal(false); setSelectedRx(null); setForm(initForm()); }} title="Edit Prescription" size="lg">
//         {loadingData
//           ? <div className="py-10 text-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-2" /><p className="text-slate-400 text-sm">Loading...</p></div>
//           : <PrescriptionForm form={form} setForm={setForm} patients={patients} doctors={doctors}
//               medicineOptions={medicineOptions} isSubmitting={isSubmitting}
//               onCancel={() => { setShowEditModal(false); setSelectedRx(null); setForm(initForm()); }}
//               onSubmit={handleUpdate} submitLabel="Update Prescription" />
//         }
//       </Modal>

//       {/* ── View Modal — UNCHANGED ── */}
//       <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Prescription Details" size="md">
//         {selectedRx && (
//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-3">
//               {[
//                 { label: 'Rx ID', value: `#${selectedRx.prescriptionId}` },
//                 { label: 'Date', value: selectedRx.date },
//                 { label: 'Patient', value: selectedRx.patientName },
//                 { label: 'Doctor', value: selectedRx.doctorName },
//               ].map(row => (
//                 <div key={row.label} className="bg-slate-50 rounded-xl px-4 py-3">
//                   <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{row.label}</p>
//                   <p className="text-sm font-semibold text-slate-800">{row.value}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="bg-slate-50 rounded-xl px-4 py-3 flex items-center justify-between">
//               <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</p>
//               <span className={`px-3 py-1 rounded-full text-xs font-bold ${typeBadgeCls(selectedRx.type)}`}>{selectedRx.type}</span>
//             </div>

//             {selectedRx.diagnosis && (
//               <div className="bg-slate-50 rounded-xl px-4 py-3">
//                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Diagnosis</p>
//                 <p className="text-sm text-slate-700">{selectedRx.diagnosis}</p>
//               </div>
//             )}

//             <div>
//               <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Medicines</p>
//               <div className="rounded-xl overflow-hidden border border-slate-200">
//                 <table className="w-full text-sm">
//                   <thead className="bg-gradient-to-r from-emerald-50 to-teal-50">
//                     <tr>
//                       {['Medicine', 'Form', 'Frequency', 'Timing', 'Days', 'Total'].map(h => (
//                         <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-slate-600">{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-100">
//                     {selectedRx.medicines.map((m, i) => (
//                       <tr key={i} className="hover:bg-slate-50">
//                         <td className="px-3 py-2.5 font-medium text-slate-800">{m.name}</td>
//                         <td className="px-3 py-2.5 text-slate-600 text-xs capitalize">{m.type}</td>
//                         <td className="px-3 py-2.5"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs font-bold">{m.frequency}</span></td>
//                         <td className="px-3 py-2.5 text-slate-600 text-xs">{m.timing}</td>
//                         <td className="px-3 py-2.5 text-slate-600">{m.days}</td>
//                         <td className="px-3 py-2.5 font-bold text-emerald-700">{m.totalQuantity}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {selectedRx.instructions && (
//               <div className="bg-amber-50 rounded-xl px-4 py-3 border border-amber-100">
//                 <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">Special Instructions</p>
//                 <p className="text-sm text-slate-700">{selectedRx.instructions}</p>
//               </div>
//             )}

//             <div className="flex gap-3 pt-1">
//               <button onClick={() => { setShowViewModal(false); handleEditClick(selectedRx); }}
//                 className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
//                 <Edit className="w-4 h-4" /> Edit
//               </button>
//               <button onClick={() => printPrescription(selectedRx)}
//                 className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg flex items-center justify-center gap-2">
//                 <Printer className="w-4 h-4" /> Print Prescription
//               </button>
//             </div>
//           </div>
//         )}
//       </Modal>

//       {/* ── Delete Modal — UNCHANGED ── */}
//       <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Prescription" size="sm">
//         <div className="text-center space-y-4">
//           <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto">
//             <Trash2 className="w-6 h-6 text-red-500" />
//           </div>
//           <div>
//             <p className="text-slate-700 font-semibold">Delete Rx #{selectedRx?.prescriptionId}?</p>
//             <p className="text-slate-500 text-sm mt-1">This action cannot be undone.</p>
//           </div>
//           <div className="flex gap-3">
//             <button onClick={() => setShowDeleteModal(false)}
//               className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
//             <button onClick={handleDelete} disabled={isSubmitting}
//               className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
//               {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
//               Delete
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }

















'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Plus, Search, Download, Eye, X, ChevronDown, Edit,
  Pill, Stethoscope, Trash2, Printer, ChevronLeft,
  ChevronRight, Loader2, ClipboardList, User, Calendar,
  Tag, AlignLeft, Hash,
} from 'lucide-react';
import {
  getPatients, getDoctorApi, getMedicines,
  getPrescriptionApi, createPrescriptionApi,
  updatePrescriptionApi, deletePrescriptionApi,
  
} from '../../lib/commonApis';
import { showToast } from '../../lib/notification';

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const FREQUENCY_OPTIONS = [
  { label: 'OD – Once Daily (×1)',         value: 1, abbr: 'OD',   api: '1 time a day'   },
  { label: 'BD – Twice Daily (×2)',         value: 2, abbr: 'BD',   api: '2 times a day'  },
  { label: 'TDS – Three Times Daily (×3)', value: 3, abbr: 'TDS',  api: '3 times a day'  },
  { label: 'QID – Four Times Daily (×4)', value: 4, abbr: 'QID',  api: '4 times a day'  },
  { label: 'Q6H – Every 6 Hours (×4)',    value: 4, abbr: 'Q6H',  api: 'every 6 hours'  },
  { label: 'Q8H – Every 8 Hours (×3)',    value: 3, abbr: 'Q8H',  api: 'every 8 hours'  },
  { label: 'Q12H – Every 12 Hours (×2)', value: 2, abbr: 'Q12H', api: 'every 12 hours' },
  { label: 'SOS – As Needed (×1)',        value: 1, abbr: 'SOS',  api: 'SOS'            },
  { label: 'PRN – When Required (×1)',    value: 1, abbr: 'PRN',  api: 'PRN'            },
  { label: 'Stat – Immediately (×1)',     value: 1, abbr: 'Stat', api: 'Stat'           },
];

const TIMING_OPTIONS = [
  { label: 'AC – Before Meals', abbr: 'AC'  },
  { label: 'PC – After Meals',  abbr: 'PC'  },
  { label: 'Empty Stomach',     abbr: 'ES'  },
  { label: 'With Food',         abbr: 'WF'  },
  { label: 'HS – At Bedtime',   abbr: 'HS'  },
  { label: 'Mane – Morning',    abbr: 'M'   },
  { label: 'Nocte – Night',     abbr: 'N'   },
  { label: 'Afternoon',         abbr: 'AF'  },
  { label: 'Evening',           abbr: 'EVE' },
  { label: 'Between Meals',     abbr: 'BM'  },
];

const MED_TYPES = ['tablet', 'capsule', 'syrup', 'injection', 'drops', 'cream', 'suspension'];

const EMPTY_MED_ROW = {
  name: '',
  type: 'tablet',
  frequency: 'OD',
  timing: 'PC',
  days: '',
  totalQuantity: 0,
};

const ITEMS_PER_PAGE = 10;

// ─────────────────────────────────────────────────────────────────────────────
// PURE HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function today() { return new Date().toISOString().split('T')[0]; }

function calcTotal(frequencyAbbr, days) {
  const freqVal = FREQUENCY_OPTIONS.find(f => f.abbr === frequencyAbbr)?.value || 1;
  return freqVal * (Number(days) || 0);
}

function apiFreqToAbbr(apiStr) {
  if (!apiStr) return 'OD';
  const s = apiStr.toLowerCase().trim();
  const found = FREQUENCY_OPTIONS.find(f =>
    f.api.toLowerCase() === s || f.abbr.toLowerCase() === s
  );
  return found ? found.abbr : 'OD';
}

function abbrToApiFreq(abbr) {
  return FREQUENCY_OPTIONS.find(f => f.abbr === abbr)?.api || abbr;
}

function normalizeRx(item) {
  return {
      id: item.id,
    prescriptionId: item.id,
    patientId: item.patientId,
    patientName: item.patient?.name || `Patient #${item.patientId}`,
    patientNumber: item.patient?.patientNumber || null,  // ← ADD THIS
    doctorId: item.doctorId,
    doctorName: item.doctor?.name || `Doctor #${item.doctorId}`,
    type: item.type || 'OPD',
    date: item.prescriptionDate?.split('T')[0] || today(),
    diagnosis: item.diagnosis || '',
    instructions: item.notes || '',
    medicines: (item.medicines || []).map(m => ({
      name: m.name || '',
      type: m.type || 'tablet',
      frequency: apiFreqToAbbr(m.frequency),
      timing: m.timing || 'PC',
      days: m.days || 0,
      totalQuantity: m.totalQuantity || calcTotal(apiFreqToAbbr(m.frequency), m.days),
    })),
  };
}

function buildPayload(f) {
  return {
    patientId: parseInt(f.patientId),
    doctorId: parseInt(f.doctorId),
    diagnosis: f.diagnosis,
    notes: f.instructions,
    prescriptionDate: new Date(f.date).toISOString(),
    medicines: f.medicines.map(m => ({
      name: m.name,
      type: m.type,
      frequency: abbrToApiFreq(m.frequency),
      days: parseInt(m.days) || 0,
      totalQuantity: m.totalQuantity || calcTotal(m.frequency, m.days),
    })),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// PRINT
// ─────────────────────────────────────────────────────────────────────────────
function printPrescription(rx) {
  const getFreqLabel = (abbr) => {
    const f = FREQUENCY_OPTIONS.find(f => f.abbr === abbr);
    return f ? `${f.abbr} (${f.api})` : abbr;
  };
  const getTimingLabel = (abbr) => TIMING_OPTIONS.find(t => t.abbr === abbr)?.label || abbr;

  const rows = (rx.medicines || []).map((m, i) => `
    <tr>
      <td><strong>${i + 1}.</strong> ${m.name}</td>
      <td style="text-align:center;text-transform:capitalize">${m.type}</td>
      <td style="text-align:center">${getFreqLabel(m.frequency)}</td>
      <td style="text-align:center">${getTimingLabel(m.timing)}</td>
      <td style="text-align:center">${m.days} days</td>
      <td style="text-align:center;font-weight:700;color:#059669">${m.totalQuantity}</td>
    </tr>`).join('');

  const html = `<!DOCTYPE html><html><head><title>Prescription #${rx.prescriptionId || ''}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',Arial,sans-serif;background:#f8fafc;color:#1e293b}
.page{max-width:820px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.10)}
.header{background:linear-gradient(135deg,#059669,#0d9488);color:#fff;padding:28px 40px;display:flex;justify-content:space-between;align-items:flex-start}
.header-left h1{font-size:22px;font-weight:800;letter-spacing:-.5px}
.header-left p{margin-top:4px;opacity:.85;font-size:12px;line-height:1.7}
.rx-id{font-size:18px;font-weight:800;background:rgba(255,255,255,.2);padding:5px 14px;border-radius:10px;display:inline-block}
.rx-date{margin-top:6px;opacity:.85;font-size:12px;text-align:right}
.body{padding:26px 40px}
.meta{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:20px;padding-bottom:18px;border-bottom:1px solid #e2e8f0}
.meta-block h3{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#94a3b8;margin-bottom:4px}
.meta-block p{font-size:14px;font-weight:600;color:#1e293b}
.badge{display:inline-block;padding:3px 14px;border-radius:99px;font-size:12px;font-weight:700}
.ipd{background:#dbeafe;color:#1d4ed8}.opd{background:#dcfce7;color:#16a34a}
.sec-title{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#64748b;margin-bottom:8px;display:flex;align-items:center;gap:6px}
.sec-title::before{content:'';display:block;width:3px;height:14px;background:#059669;border-radius:2px}
table{width:100%;border-collapse:collapse;margin-bottom:18px;font-size:12.5px}
thead tr{background:#f0fdf4;border-bottom:2px solid #bbf7d0}
thead th{padding:9px 10px;text-align:left;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#059669}
tbody td{padding:9px 10px;border-bottom:1px solid #f1f5f9}
tbody tr:last-child td{border-bottom:none}
tbody tr:nth-child(even){background:#fafafa}
.box{border-radius:10px;padding:13px 16px;margin-bottom:14px}
.box-green{background:#f0fdf4;border-left:4px solid #059669}
.box-amber{background:#fffbeb;border-left:4px solid #f59e0b}
.box h3{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px}
.box-green h3{color:#059669}.box-amber h3{color:#d97706}
.box p{font-size:13px;color:#334155;line-height:1.6}
.footer{display:flex;justify-content:space-between;align-items:flex-end;padding:18px 40px;border-top:1px solid #f1f5f9}
.footer .left{color:#94a3b8;font-size:11px;line-height:1.8}
.sig .line{border-bottom:1.5px solid #334155;width:190px;margin-bottom:5px}
.sig p{font-size:11px;color:#64748b;text-align:right}
.sig .doc{font-size:13px;font-weight:700;color:#1e293b;text-align:right}
@media print{body{background:#fff}.page{box-shadow:none;margin:0;border-radius:0}}
</style></head><body><div class="page">
<div class="header">
  <div class="header-left">
    <h1>MediCare Hospital</h1>
    <p>123 Health Avenue, New Delhi – 110001<br>rx@medicare.in &nbsp;|&nbsp; +91 11 2345 6789</p>
  </div>
  <div>
    <div class="rx-id">RX #${rx.prescriptionId || 'PREVIEW'}</div>
    <div class="rx-date">Date: ${rx.date}</div>
  </div>
</div>
<div class="body">
  <div class="meta">
<div class="meta-block"><h3>Patient</h3>
  ${rx.patientNumber ? `<span style="display:inline-block;margin-top:4px;padding:2px 10px;background:#f0fdf4;color:#059669;border:1px solid #bbf7d0;border-radius:6px;font-size:11px;font-weight:700">${rx.patientNumber}</span>` : ''}
  <p>${rx.patientName}</p>
</div>    <div class="meta-block"><h3>Prescribed By</h3><p>${rx.doctorName}</p></div>
    <div class="meta-block"><h3>Type</h3><span class="badge ${rx.type === 'IPD' ? 'ipd' : 'opd'}">${rx.type}</span></div>
  </div>
  ${rx.diagnosis ? `<div class="box box-green"><h3>Diagnosis / Notes</h3><p>${rx.diagnosis}</p></div>` : ''}
  <div class="sec-title">Medicines</div>
  <table>
    <thead><tr>
      <th>Medicine</th><th style="text-align:center">Form</th>
      <th style="text-align:center">Frequency</th><th style="text-align:center">Timing</th>
      <th style="text-align:center">Duration</th><th style="text-align:center">Total Qty</th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table>
  ${rx.instructions ? `<div class="box box-amber"><h3>⚠ Special Instructions</h3><p>${rx.instructions}</p></div>` : ''}
</div>
<div class="footer">
  <div class="left">
    <p>This prescription is valid for 30 days from the date of issue.</p>
    <p>MediCare Hospital &nbsp;•&nbsp; Get well soon!</p>
  </div>
  <div class="sig">
    <div class="line"></div>
    <p class="doc">${rx.doctorName}</p>
    <p>Doctor's Signature</p>
  </div>
</div>
</div></body></html>`;

  const win = window.open('', '_blank', 'height=800,width=940');
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 350);
}

// ─────────────────────────────────────────────────────────────────────────────
// MEDICINE SEARCHABLE SELECT  (name-string based) — UNCHANGED
// ─────────────────────────────────────────────────────────────────────────────
function MedicineSelect({ options, value, onChange, placeholder = 'Select' }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const ref = useRef(null);

  const filtered = useMemo(
    () => options.filter(o => o.name.toLowerCase().includes(q.toLowerCase())),
    [options, q]
  );

  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(v => !v)}
        className={`w-full flex items-center justify-between px-3 py-2 bg-white border-2 rounded-lg text-xs transition-all ${open ? 'border-emerald-500' : 'border-transparent'} text-slate-700`}>
        <span className={`truncate ${value ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>{value || placeholder}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute z-40 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-2 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
              <input autoFocus type="text" value={q} onChange={e => setQ(e.target.value)}
                placeholder="Search..." className="w-full pl-7 pr-2 py-1.5 text-xs bg-slate-50 rounded-lg focus:outline-none text-slate-800" />
            </div>
          </div>
          <div className="max-h-44 overflow-y-auto">
            {filtered.length === 0
              ? <p className="px-3 py-2 text-xs text-slate-400 text-center">No results</p>
              : filtered.map(o => (
                <button type="button" key={o.id}
                  onClick={() => { onChange(o.name); setOpen(false); setQ(''); }}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-emerald-50 transition-colors ${o.name === value ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-700'}`}>
                  {o.name}
                </button>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ENTITY SELECT
// CHANGES:
//   1. Search karta hai name + patientNumber dono se (agar patientNumber field ho)
//   2. Dropdown list me patientNumber badge show hota hai (agar ho)
//   3. Selected state me "P-101 · Name" format show hota hai
//   4. Search input ka text color fix — text-slate-800 (black) hardcoded
//   5. Doctor ke liye koi change nahi — patientNumber nahi hoga unme
// ─────────────────────────────────────────────────────────────────────────────
function EntitySelect({ options, value, onChange, placeholder, idKey = 'id' }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const ref = useRef(null);

  // Search: name + patientNumber dono se match karo
  const filtered = useMemo(() => {
    const lower = q.toLowerCase();
    return options.filter(o =>
      o.name.toLowerCase().includes(lower) ||
      (o.patientNumber && o.patientNumber.toLowerCase().includes(lower))
    );
  }, [options, q]);

  const selected = options.find(o => String(o[idKey]) === String(value));

  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  // Selected label: agar patientNumber ho to "P-101 · Name", warna sirf Name
  const getSelectedLabel = (o) => {
    if (!o) return null;
    if (o.patientNumber) return `${o.patientNumber} · ${o.name}`;
    return o.name;
  };

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(v => !v)}
        className={`w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 border-2 rounded-xl text-sm transition-all ${open ? 'border-emerald-500 bg-white' : 'border-transparent'} text-slate-700`}>
        <span className={selected ? 'text-slate-800 font-medium' : 'text-slate-400'}>
          {selected ? getSelectedLabel(selected) : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-30 mt-1.5 w-full bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-2 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              {/* FIX: text-slate-800 hardcoded so it's always dark/visible regardless of theme */}
              <input
                autoFocus
                type="text"
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder={
                  options.length > 0 && options[0].patientNumber
                    ? 'Search by name or patient no...'
                    : 'Search...'
                }
                className="w-full pl-8 pr-3 py-1.5 text-sm bg-slate-50 rounded-lg focus:outline-none text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>

          <div className="max-h-48 overflow-y-auto">
            {filtered.length === 0
              ? <p className="px-4 py-3 text-sm text-slate-400 text-center">No results</p>
              : filtered.map(o => (
                <button
                  type="button"
                  key={o[idKey]}
                  onClick={() => { onChange(String(o[idKey])); setOpen(false); setQ(''); }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-emerald-50 transition-colors flex items-center gap-2.5 ${
                    String(o[idKey]) === String(value) ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-700'
                  }`}
                >
                  {/* Patient number badge — only shown when patientNumber exists */}
                  {o.patientNumber && (
                    <span className="flex-shrink-0 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-xs font-semibold">
                      {o.patientNumber}
                    </span>
                  )}
                  <span className="truncate">{o.name}</span>
                </button>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODAL — UNCHANGED
// ─────────────────────────────────────────────────────────────────────────────
function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null;
  const sizeMap = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-5xl' };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeMap[size]} border border-slate-100 flex flex-col max-h-[92vh] overflow-hidden`}
        onClick={e => e.stopPropagation()}>
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

const typeBadgeCls = (type) => type === 'IPD' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700';

// ─────────────────────────────────────────────────────────────────────────────
// PRESCRIPTION FORM — UNCHANGED (only Patient label cleaned up)
// ─────────────────────────────────────────────────────────────────────────────
function PrescriptionForm({ form, setForm, patients, doctors, medicineOptions, isSubmitting, onCancel, onSubmit, submitLabel }) {
  const handleMedChange = (idx, field, value) => {
    setForm(prev => {
      const updated = prev.medicines.map((m, i) => {
        if (i !== idx) return m;
        const next = { ...m, [field]: value };
        next.totalQuantity = calcTotal(
          field === 'frequency' ? value : next.frequency,
          field === 'days' ? value : next.days,
        );
        return next;
      });
      return { ...prev, medicines: updated };
    });
  };

  const addMedRow = () => setForm(p => ({ ...p, medicines: [...p.medicines, { ...EMPTY_MED_ROW }] }));
  const removeMedRow = (idx) => {
    if (form.medicines.length === 1) return;
    setForm(p => ({ ...p, medicines: p.medicines.filter((_, i) => i !== idx) }));
  };

  const buildPreviewRx = () => ({
    prescriptionId: 'PREVIEW',
  patientName: patients.find(p => String(p.id) === String(form.patientId))?.name || '—',
  patientNumber: patients.find(p => String(p.id) === String(form.patientId))?.patientNumber || null, // ← ADD
  doctorName: doctors.find(d => String(d.id) === String(form.doctorId))?.name || '—',
    type: form.type, date: form.date,
    diagnosis: form.diagnosis, instructions: form.instructions,
    medicines: form.medicines,
  });

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Header row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            <User className="inline w-3 h-3 mr-1" />Patient *
          </label>
          <EntitySelect
            options={patients}
            value={form.patientId}
            onChange={v => setForm(p => ({ ...p, patientId: v }))}
            placeholder="Select patient"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            <Stethoscope className="inline w-3 h-3 mr-1" />Doctor *
          </label>
          <EntitySelect
            options={doctors}
            value={form.doctorId}
            onChange={v => setForm(p => ({ ...p, doctorId: v }))}
            placeholder="Select doctor"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            <Tag className="inline w-3 h-3 mr-1" />IPD / OPD *
          </label>
          <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
            className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm">
            <option value="OPD">OPD – Out Patient</option>
            <option value="IPD">IPD – In Patient</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            <Calendar className="inline w-3 h-3 mr-1" />Prescription Date
          </label>
          <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
            className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          <AlignLeft className="inline w-3 h-3 mr-1" />Diagnosis / Notes
        </label>
        <textarea rows={2} value={form.diagnosis} onChange={e => setForm(p => ({ ...p, diagnosis: e.target.value }))}
          placeholder="Optional diagnosis or clinical notes..."
          className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm resize-none" />
      </div>

      {/* Medicines */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <Pill className="inline w-3 h-3 mr-1" />Medicines *
          </label>
          <button type="button" onClick={addMedRow}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" /> Add Medicine
          </button>
        </div>

        <div className="grid grid-cols-12 gap-2 px-1 mb-1">
          {[['Medicine', 'col-span-3'], ['Form', 'col-span-2'], ['Frequency', 'col-span-3'], ['Timing', 'col-span-2'], ['Days', 'col-span-1'], ['Total', 'col-span-1']].map(([l, c]) => (
            <div key={l} className={`${c} text-xs font-semibold text-slate-400 uppercase tracking-wider`}>{l}</div>
          ))}
        </div>

        <div className="space-y-2">
          {form.medicines.map((med, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-slate-50 rounded-xl p-2">
              <div className="col-span-3">
                <MedicineSelect options={medicineOptions} value={med.name}
                  onChange={v => handleMedChange(idx, 'name', v)} placeholder="Select" />
              </div>
              <div className="col-span-2">
                <select value={med.type} onChange={e => handleMedChange(idx, 'type', e.target.value)}
                  className="w-full px-2 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-xs capitalize">
                  {MED_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="col-span-3">
                <select value={med.frequency} onChange={e => handleMedChange(idx, 'frequency', e.target.value)}
                  className="w-full px-2 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-xs">
                  {FREQUENCY_OPTIONS.map(f => <option key={f.abbr} value={f.abbr}>{f.label}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <select value={med.timing} onChange={e => handleMedChange(idx, 'timing', e.target.value)}
                  className="w-full px-2 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-xs">
                  {TIMING_OPTIONS.map(t => (
                    <option key={t.abbr} value={t.abbr}>{t.abbr} – {t.label.replace(/^[A-Z]+ – /, '')}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-1">
                <input type="number" min="1" placeholder="Days" value={med.days} required
                  onChange={e => handleMedChange(idx, 'days', e.target.value)}
                  className="w-full px-2 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-xs text-center" />
              </div>
              <div className="col-span-1">
                <div className="px-2 py-2 bg-emerald-50 border-2 border-emerald-100 rounded-lg text-emerald-700 text-sm font-bold text-center">
                  {med.totalQuantity || 0}
                </div>
              </div>
              <button type="button" onClick={() => removeMedRow(idx)}
                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          <Hash className="inline w-3 h-3 mr-1" />Special Instructions
        </label>
        <textarea rows={2} value={form.instructions} onChange={e => setForm(p => ({ ...p, instructions: e.target.value }))}
          placeholder="e.g. After meal, drink warm water, avoid spicy food..."
          className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm resize-none" />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
          Cancel
        </button>
        <button type="button" onClick={() => printPrescription(buildPreviewRx())}
          className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors flex items-center gap-2">
          <Printer className="w-4 h-4" /> Preview
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

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
const initForm = () => ({
  patientId: '', doctorId: '', type: 'OPD', date: today(),
  diagnosis: '', instructions: '', medicines: [{ ...EMPTY_MED_ROW }],
});

export default function PrescriptionPage() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [medicineOptions, setMedicineOptions] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const [prescriptions, setPrescriptions] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [counts, setCounts] = useState({ todayRx: 0, totalRx: 0, ipdCount: 0, opdCount: 0 });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRx, setSelectedRx] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState(initForm());

  // ── Loaders ───────────────────────────────────────────────────────────────
  const loadPrescriptions = useCallback(async () => {
    setLoadingList(true);
    try {
      const res = await getPrescriptionApi(1000, 1);
      console.log(res,'ressssssss');
      const arr = res?.data?.prescriptions || res?.data || res || [];
      setPrescriptions(Array.isArray(arr) ? arr.map(normalizeRx) : []);
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed', 'Could not load prescriptions');
    } finally {
      setLoadingList(false);
    }
  }, []);

  const loadCounts = useCallback(async () => {
    try {
      setCounts({
        todayRx: 10,
        totalRx: 20,
        ipdCount: 5,
        opdCount: 15,
      });
    } catch (err) { console.error('Count error:', err); }
  }, []);

  const loadDropdowns = useCallback(async () => {
    setLoadingData(true);
    try {
      const [pRes, dRes, mRes] = await Promise.all([
        getPatients(100, 1), getDoctorApi(100, 1), getMedicines(100, 1),
      ]);
      console.log(pRes,'pressssssssss');

      // CHANGE: patientNumber field bhi include kiya — EntitySelect me badge aur dual search ke liye
      setPatients(
        (pRes?.data?.data || pRes?.data || []).map(p => ({
          id: p.id,
          name: p.name,
          patientNumber: p.patientNumber || null,
        }))
      );

      setDoctors((dRes?.data?.data?.doctors || dRes?.data?.doctors || []).map(d => ({ id: d.id, name: d.name })));
      setMedicineOptions((mRes?.data?.medicines || mRes?.data || []).map(m => ({ id: m.id, name: m.name })));
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed', 'Could not load dropdown data');
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    loadDropdowns();
    loadPrescriptions();
    loadCounts();
  }, [loadDropdowns, loadPrescriptions, loadCounts]);

  // ── CRUD — ALL UNCHANGED ──────────────────────────────────────────────────
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.patientId || !form.doctorId) {
      showToast('error', 'Validation', 'Patient and Doctor are required'); return;
    }
    setIsSubmitting(true);
    try {
      const res = await createPrescriptionApi(buildPayload(form));
      await Promise.all([loadPrescriptions(), loadCounts()]);
      const saved = res?.data || {};
      const printRx = {
       prescriptionId: saved.id || '—',
  patientName: patients.find(p => String(p.id) === String(form.patientId))?.name || '—',
  patientNumber: patients.find(p => String(p.id) === String(form.patientId))?.patientNumber || null, // ← ADD
  doctorName: doctors.find(d => String(d.id) === String(form.doctorId))?.name || '—',
        type: form.type, date: form.date,
        diagnosis: form.diagnosis, instructions: form.instructions,
        medicines: form.medicines,
      };
      setShowAddModal(false);
      setForm(initForm());
      setCurrentPage(1);
      showToast('success', 'Saved', 'Prescription saved! Opening print...');
      setTimeout(() => printPrescription(printRx), 350);
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed', err.message || 'Could not create prescription');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form.patientId || !form.doctorId) {
      showToast('error', 'Validation', 'Patient and Doctor are required'); return;
    }
    setIsSubmitting(true);
    try {
      await updatePrescriptionApi(selectedRx.id, buildPayload(form));
      await Promise.all([loadPrescriptions(), loadCounts()]);
      setShowEditModal(false);
      setSelectedRx(null);
      setForm(initForm());
      showToast('success', 'Updated', 'Prescription updated successfully!');
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed', err.message || 'Could not update prescription');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await deletePrescriptionApi(selectedRx.id);
      await Promise.all([loadPrescriptions(), loadCounts()]);
      setShowDeleteModal(false);
      setSelectedRx(null);
      showToast('success', 'Deleted', 'Prescription deleted');
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed', 'Could not delete prescription');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (rx) => {
    setSelectedRx(rx);
    setForm({
      patientId: String(rx.patientId),
      doctorId: String(rx.doctorId),
      type: rx.type || 'OPD',
      date: rx.date,
      diagnosis: rx.diagnosis || '',
      instructions: rx.instructions || '',
      medicines: rx.medicines.length > 0 ? rx.medicines.map(m => ({ ...m })) : [{ ...EMPTY_MED_ROW }],
    });
    setShowEditModal(true);
  };

  // ── Filter + Pagination — UNCHANGED ──────────────────────────────────────
  const filtered = useMemo(() => {
    const s = searchTerm.toLowerCase();
    return prescriptions.filter(rx => {
      const matchSearch =
        String(rx.prescriptionId).toLowerCase().includes(s) ||
        (rx.patientName || '').toLowerCase().includes(s) ||
        (rx.doctorName || '').toLowerCase().includes(s);
      return matchSearch && (filterType === 'all' || rx.type === filterType);
    });
  }, [prescriptions, searchTerm, filterType]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  useEffect(() => { setCurrentPage(1); }, [searchTerm, filterType]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) for (let i = 1; i <= totalPages; i++) pages.push(i);
    else if (currentPage <= 4) pages.push(1, 2, 3, 4, 5, '...', totalPages);
    else if (currentPage >= totalPages - 3) pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    else pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    return pages;
  };

  const exportCSV = () => {
    const headers = ['ID', 'Patient', 'Doctor', 'Type', 'Date', 'Medicines', 'Diagnosis'];
    const rows = filtered.map(rx => [
      rx.prescriptionId, `"${rx.patientName}"`, `"${rx.doctorName}"`,
      rx.type, rx.date,
      `"${rx.medicines.map(m => m.name).join(', ')}"`,
      `"${rx.diagnosis || ''}"`,
    ].join(','));
    const blob = new Blob([[headers.join(','), ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `prescriptions_${today()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ═════════════════════════════════════════════════════════════════════════
  // RENDER — UNCHANGED
  // ═════════════════════════════════════════════════════════════════════════
  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Doctor Prescriptions</h1>
            <p className="text-slate-600">Manage and issue patient prescriptions</p>
          </div>
          <div className="flex gap-3">
            <button onClick={exportCSV}
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 text-slate-700 font-medium shadow-sm">
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button onClick={() => { setForm(initForm()); setShowAddModal(true); }}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 font-semibold shadow-lg">
              <Plus className="w-5 h-5" /> New Prescription
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Today's Rx", value: counts.todayRx, color: 'text-slate-800' },
            { label: 'Total Rx',   value: counts.totalRx, color: 'text-emerald-600' },
            { label: 'IPD',        value: counts.ipdCount, color: 'text-blue-600' },
            { label: 'OPD',        value: counts.opdCount, color: 'text-teal-600' },
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
            <input type="text" placeholder="Search by ID, patient or doctor..."
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700" />
          </div>
          <select value={filterType} onChange={e => setFilterType(e.target.value)}
            className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 text-slate-700 font-medium cursor-pointer">
            <option value="all">All Types</option>
            <option value="OPD">OPD</option>
            <option value="IPD">IPD</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-6">
        {loadingList ? (
          <div className="py-16 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">Loading prescriptions...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
                <tr>
                  {['Rx ID', 'Patient', 'Doctor', 'Type', 'Date', 'Medicines', 'Diagnosis', 'Actions'].map(h => (
                    <th key={h} className={`px-6 py-4 text-left font-semibold text-slate-700 ${h === 'Actions' ? 'text-center' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginated.length > 0 ? paginated.map(rx => (
                  <tr key={rx.id} className="hover:bg-emerald-50/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <ClipboardList className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span className="font-semibold text-slate-800">#{rx.prescriptionId}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {rx.patientName?.charAt(0)}
                        </div>
                        <div>
                           {/* CHANGE: patientNumber badge in listing — find from patients array */}
                          {(() => {
                            const pt = patients.find(p => String(p.id) === String(rx.patientId));
                            return pt?.patientNumber ? (
                              <span className="inline-block mt-0.5 px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-xs font-semibold">
                                {pt.patientNumber}
                              </span>
                            ) : null;
                          })()}
                          <p className="font-semibold text-slate-800 text-sm">{rx.patientName}</p>
                         
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-teal-500 flex-shrink-0" />
                        <p className="font-medium text-slate-700 text-sm">{rx.doctorName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${typeBadgeCls(rx.type)}`}>{rx.type}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{rx.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {rx.medicines.slice(0, 2).map((m, i) => (
                          <span key={i} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs font-medium border border-emerald-100">
                            {m.name}
                          </span>
                        ))}
                        {rx.medicines.length > 2 && (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium">+{rx.medicines.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600 max-w-[140px] truncate">{rx.diagnosis || '—'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => { setSelectedRx(rx); setShowViewModal(true); }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => printPrescription(rx)}
                          className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors" title="Print">
                          <Printer className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleEditClick(rx)}
                          className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => { setSelectedRx(rx); setShowDeleteModal(true); }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={8} className="py-16 text-center">
                      <ClipboardList className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 font-medium">No prescriptions found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination — UNCHANGED */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing <span className="font-semibold">{Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}</span>–
                <span className="font-semibold">{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of{' '}
                <span className="font-semibold">{filtered.length}</span>
              </p>
              <div className="flex items-center gap-1.5">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                  className={`p-2 rounded-lg transition-all ${currentPage === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-emerald-50 border border-slate-200'}`}>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {getPageNumbers().map((p, i) =>
                  p === '...'
                    ? <span key={`e${i}`} className="px-2 text-slate-400 text-sm">…</span>
                    : <button key={p} onClick={() => setCurrentPage(p)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${currentPage === p ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' : 'text-slate-600 hover:bg-emerald-50 border border-slate-200'}`}>
                      {p}
                    </button>
                )}
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg transition-all ${currentPage === totalPages ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-emerald-50 border border-slate-200'}`}>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Add Modal ── */}
      <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); setForm(initForm()); }} title="New Prescription" size="lg">
        {loadingData
          ? <div className="py-10 text-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-2" /><p className="text-slate-400 text-sm">Loading...</p></div>
          : <PrescriptionForm form={form} setForm={setForm} patients={patients} doctors={doctors}
              medicineOptions={medicineOptions} isSubmitting={isSubmitting}
              onCancel={() => { setShowAddModal(false); setForm(initForm()); }}
              onSubmit={handleCreate} submitLabel="Save & Print" />
        }
      </Modal>

      {/* ── Edit Modal ── */}
      <Modal isOpen={showEditModal} onClose={() => { setShowEditModal(false); setSelectedRx(null); setForm(initForm()); }} title="Edit Prescription" size="lg">
        {loadingData
          ? <div className="py-10 text-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-2" /><p className="text-slate-400 text-sm">Loading...</p></div>
          : <PrescriptionForm form={form} setForm={setForm} patients={patients} doctors={doctors}
              medicineOptions={medicineOptions} isSubmitting={isSubmitting}
              onCancel={() => { setShowEditModal(false); setSelectedRx(null); setForm(initForm()); }}
              onSubmit={handleUpdate} submitLabel="Update Prescription" />
        }
      </Modal>

      {/* ── View Modal — UNCHANGED ── */}
      <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Prescription Details" size="md">
        {selectedRx && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Rx ID', value: `#${selectedRx.prescriptionId}` },
                { label: 'Date', value: selectedRx.date },
                {
  label: 'Patient',
  value: (
    <span>
       {selectedRx.patientNumber && (
        <span className="ml-2 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-xs font-semibold">
          {selectedRx.patientNumber}
        </span>
      )}
      {selectedRx.patientName}
     
    </span>
  )
},                { label: 'Doctor', value: selectedRx.doctorName },
              ].map(row => (
                <div key={row.label} className="bg-slate-50 rounded-xl px-4 py-3">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{row.label}</p>
                  <p className="text-sm font-semibold text-slate-800">{row.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 rounded-xl px-4 py-3 flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</p>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${typeBadgeCls(selectedRx.type)}`}>{selectedRx.type}</span>
            </div>

            {selectedRx.diagnosis && (
              <div className="bg-slate-50 rounded-xl px-4 py-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Diagnosis</p>
                <p className="text-sm text-slate-700">{selectedRx.diagnosis}</p>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Medicines</p>
              <div className="rounded-xl overflow-hidden border border-slate-200">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-emerald-50 to-teal-50">
                    <tr>
                      {['Medicine', 'Form', 'Frequency', 'Timing', 'Days', 'Total'].map(h => (
                        <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-slate-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedRx.medicines.map((m, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-3 py-2.5 font-medium text-slate-800">{m.name}</td>
                        <td className="px-3 py-2.5 text-slate-600 text-xs capitalize">{m.type}</td>
                        <td className="px-3 py-2.5"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs font-bold">{m.frequency}</span></td>
                        <td className="px-3 py-2.5 text-slate-600 text-xs">{m.timing}</td>
                        <td className="px-3 py-2.5 text-slate-600">{m.days}</td>
                        <td className="px-3 py-2.5 font-bold text-emerald-700">{m.totalQuantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {selectedRx.instructions && (
              <div className="bg-amber-50 rounded-xl px-4 py-3 border border-amber-100">
                <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">Special Instructions</p>
                <p className="text-sm text-slate-700">{selectedRx.instructions}</p>
              </div>
            )}

            <div className="flex gap-3 pt-1">
              <button onClick={() => { setShowViewModal(false); handleEditClick(selectedRx); }}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" /> Edit
              </button>
              <button onClick={() => printPrescription(selectedRx)}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg flex items-center justify-center gap-2">
                <Printer className="w-4 h-4" /> Print Prescription
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ── Delete Modal — UNCHANGED ── */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Prescription" size="sm">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="text-slate-700 font-semibold">Delete Rx #{selectedRx?.prescriptionId}?</p>
            <p className="text-slate-500 text-sm mt-1">This action cannot be undone.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowDeleteModal(false)}
              className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
            <button onClick={handleDelete} disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}