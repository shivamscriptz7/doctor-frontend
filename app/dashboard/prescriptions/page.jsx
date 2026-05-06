'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Plus, Search, Download, Eye, X, ChevronDown,
  FileText, Pill, Stethoscope, Trash2,
  Printer, CheckCircle, Clock, ChevronLeft, ChevronRight,
  Loader2, ClipboardList, User, Calendar, Tag, AlignLeft, Hash
} from 'lucide-react';
import { getPatients, getDoctorApi, getMedicines } from '../../lib/commonApis';
import { showToast } from '../../lib/notification';

// ── Constants ─────────────────────────────────────────────────────────────────
const DOSE_OPTIONS = [
  { label: '1 Time (×1)', value: 1 },
  { label: '2 Times (×2)', value: 2 },
  { label: '3 Times (×3)', value: 3 },
];
const EMPTY_MED_ROW = { medicineId: '', doseTime: 1, days: '', total: 0 };
const ITEMS_PER_PAGE = 10;

// ── Saved prescriptions key ───────────────────────────────────────────────────
const STORAGE_KEY = 'rx_prescriptions';

// ── Helpers ───────────────────────────────────────────────────────────────────
function getStoredPrescriptions() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function saveStoredPrescriptions(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}
function genRxId() {
  return `RX-${Date.now().toString(36).toUpperCase()}`;
}
function today() {
  return new Date().toISOString().split('T')[0];
}

// ── SearchableSelect ──────────────────────────────────────────────────────────
function SearchableSelect({ options, value, onChange, placeholder, idKey = 'id', labelKey = 'name', required }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const ref = useRef(null);

  const filtered = useMemo(() =>
    options.filter(o => (o[labelKey] || '').toLowerCase().includes(q.toLowerCase())),
    [options, q, labelKey]
  );

  const selected = options.find(o => String(o[idKey]) === String(value));

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 border-2 rounded-xl text-sm transition-all ${open ? 'border-emerald-500 bg-white' : 'border-transparent'} text-slate-700`}
      >
        <span className={selected ? 'text-slate-800 font-medium' : 'text-slate-400'}>
          {selected ? selected[labelKey] : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute z-30 mt-1.5 w-full bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-2 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                autoFocus
                type="text"
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search..."
                className="w-full pl-8 pr-3 py-1.5 text-sm bg-slate-50 rounded-lg focus:outline-none"
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
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-emerald-50 transition-colors ${String(o[idKey]) === String(value) ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-700'}`}
                >
                  {o[labelKey]}
                </button>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────
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

// ── Status Badge ──────────────────────────────────────────────────────────────
const statusBadge = (type) =>
  type === 'IPD' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700';

// ── Print Prescription ────────────────────────────────────────────────────────
function printPrescription(rx, medicines) {
  const getMedName = (id) => {
    const m = medicines.find(m => String(m.medicineId) === String(id));
    return m ? m.name : `Med #${id}`;
  };
  const rows = rx.medicines.map(m => `
    <tr>
      <td>${getMedName(m.medicineId)}</td>
      <td style="text-align:center">${DOSE_OPTIONS.find(d => d.value === Number(m.doseTime))?.label || m.doseTime}</td>
      <td style="text-align:center">${m.days} days</td>
      <td style="text-align:center;font-weight:700">${m.total}</td>
    </tr>`).join('');

  const html = `<!DOCTYPE html><html><head><title>Prescription ${rx.rxId}</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',Arial,sans-serif;background:#f8fafc;color:#1e293b}.page{max-width:720px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.10)}.header{background:linear-gradient(135deg,#059669,#0d9488);color:#fff;padding:32px 40px}.header h1{font-size:24px;font-weight:800}.header p{margin-top:4px;opacity:.85;font-size:12px}.rx-id{margin-top:12px;font-size:18px;font-weight:700;background:rgba(255,255,255,.15);display:inline-block;padding:4px 14px;border-radius:8px}.body{padding:32px 40px}.meta{display:flex;justify-content:space-between;margin-bottom:24px;gap:20px;flex-wrap:wrap}.meta-block h3{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#64748b;margin-bottom:4px}.meta-block p{font-size:14px;font-weight:600}.badge{display:inline-block;padding:3px 12px;border-radius:99px;font-size:12px;font-weight:700}.ipd{background:#dbeafe;color:#1d4ed8}.opd{background:#dcfce7;color:#16a34a}table{width:100%;border-collapse:collapse;margin-bottom:16px}thead tr{background:#f1f5f9}thead th{padding:9px 12px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#64748b}tbody td{padding:9px 12px;border-bottom:1px solid #f1f5f9;font-size:13px}.notes-box{background:#f8fafc;border-radius:10px;padding:14px;margin-bottom:14px;border:1px solid #e2e8f0}.notes-box h3{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#64748b;margin-bottom:6px}.notes-box p{font-size:13px;color:#334155}.footer{text-align:center;color:#94a3b8;font-size:12px;padding:16px 40px;border-top:1px solid #f1f5f9}@media print{body{background:#fff}.page{box-shadow:none;margin:0;border-radius:0}}</style>
</head><body><div class="page">
<div class="header"><h1>MediCare Hospital</h1><p>123 Health Avenue, New Delhi – 110001 | rx@medicare.in | +91 11 2345 6789</p><div class="rx-id">${rx.rxId}</div></div>
<div class="body">
<div class="meta">
  <div class="meta-block"><h3>Patient</h3><p>${rx.patientName}</p></div>
  <div class="meta-block"><h3>Doctor</h3><p>${rx.doctorName}</p></div>
  <div class="meta-block"><h3>Date</h3><p>${rx.date}</p></div>
  <div class="meta-block"><h3>Type</h3><span class="badge ${rx.type === 'IPD' ? 'ipd' : 'opd'}">${rx.type}</span></div>
</div>
${rx.diagnosis ? `<div class="notes-box"><h3>Diagnosis / Notes</h3><p>${rx.diagnosis}</p></div>` : ''}
<table><thead><tr><th>Medicine</th><th style="text-align:center">Dose</th><th style="text-align:center">Duration</th><th style="text-align:center">Total Qty</th></tr></thead>
<tbody>${rows}</tbody></table>
${rx.instructions ? `<div class="notes-box"><h3>Special Instructions</h3><p>${rx.instructions}</p></div>` : ''}
</div>
<div class="footer">MediCare Hospital &nbsp;•&nbsp; Get well soon! &nbsp;•&nbsp; Doctor's Signature: ___________________</div>
</div></body></html>`;

  const win = window.open('', '_blank', 'height=720,width=860');
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 300);
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function PrescriptionPage() {
  // ── Remote data ───────────────────────────────────────────────────────────
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // ── Prescriptions (local state / localStorage) ────────────────────────────
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // ── Modals ────────────────────────────────────────────────────────────────
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRx, setSelectedRx] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Form ──────────────────────────────────────────────────────────────────
  const initForm = () => ({
    patientId: '',
    doctorId: '',
    type: 'OPD',
    date: today(),
    diagnosis: '',
    instructions: '',
    medicines: [{ ...EMPTY_MED_ROW }],
  });
  const [form, setForm] = useState(initForm());

  // ── Load remote data ──────────────────────────────────────────────────────
  const loadAll = useCallback(async () => {
    setLoadingData(true);
    try {
      const [pRes, dRes, mRes] = await Promise.all([
        getPatients(100, 1),
        getDoctorApi(100, 1),
        getMedicines(100, 1),
      ]);
      const pArr = pRes?.data?.data || pRes?.data || [];
      setPatients(pArr.map(p => ({ id: p.id, name: p.name })));

      const dArr = dRes?.data?.data?.doctors || dRes?.data?.doctors || [];
      setDoctors(dArr.map(d => ({ id: d.id, name: d.name })));

      const mArr = mRes?.data?.medicines || mRes?.data || [];
      setMedicines(mArr.map(m => ({ medicineId: m.id, name: m.name })));
    } catch (err) {
      console.error('Load error:', err);
      showToast('error', 'Failed', 'Could not load dropdown data');
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
    setPrescriptions(getStoredPrescriptions());
  }, [loadAll]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const getMedName = useCallback((id) => {
    const m = medicines.find(m => String(m.medicineId) === String(id));
    return m ? m.name : `Med #${id}`;
  }, [medicines]);

  const getPatientName = useCallback((id) => {
    const p = patients.find(p => String(p.id) === String(id));
    return p ? p.name : `Patient #${id}`;
  }, [patients]);

  const getDoctorName = useCallback((id) => {
    const d = doctors.find(d => String(d.id) === String(id));
    return d ? d.name : `Doctor #${id}`;
  }, [doctors]);

  // ── Medicine row handlers ─────────────────────────────────────────────────
  const handleMedChange = (idx, field, value) => {
    setForm(prev => {
      const updated = prev.medicines.map((m, i) => {
        if (i !== idx) return m;
        const next = { ...m, [field]: value };
        next.total = (Number(next.doseTime) || 0) * (Number(next.days) || 0);
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

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const rx = {
      rxId: genRxId(),
      patientId: form.patientId,
      patientName: getPatientName(form.patientId),
      doctorId: form.doctorId,
      doctorName: getDoctorName(form.doctorId),
      type: form.type,
      date: form.date,
      diagnosis: form.diagnosis,
      instructions: form.instructions,
      medicines: form.medicines.map(m => ({
        ...m,
        total: (Number(m.doseTime) || 0) * (Number(m.days) || 0),
      })),
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      const updated = [rx, ...prescriptions];
      setPrescriptions(updated);
      saveStoredPrescriptions(updated);
      setShowAddModal(false);
      setForm(initForm());
      setCurrentPage(1);
      setIsSubmitting(false);
      showToast('success', 'Saved', 'Prescription saved successfully!');
    }, 400);
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const updated = prescriptions.filter(r => r.rxId !== selectedRx.rxId);
      setPrescriptions(updated);
      saveStoredPrescriptions(updated);
      setShowDeleteModal(false);
      setSelectedRx(null);
      setIsSubmitting(false);
      showToast('success', 'Deleted', 'Prescription deleted');
    }, 300);
  };

  // ── Filter + Pagination ───────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const s = searchTerm.toLowerCase();
    return prescriptions.filter(rx => {
      const matchSearch =
        (rx.rxId || '').toLowerCase().includes(s) ||
        (rx.patientName || '').toLowerCase().includes(s) ||
        (rx.doctorName || '').toLowerCase().includes(s);
      const matchType = filterType === 'all' || rx.type === filterType;
      return matchSearch && matchType;
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

  // ── Stats ─────────────────────────────────────────────────────────────────
  const todayStr = today();
  const stats = {
    total: prescriptions.length,
    today: prescriptions.filter(r => r.date === todayStr).length,
    ipd: prescriptions.filter(r => r.type === 'IPD').length,
    opd: prescriptions.filter(r => r.type === 'OPD').length,
  };

  // ── Export CSV ────────────────────────────────────────────────────────────
  const exportCSV = () => {
    const headers = ['Rx ID', 'Patient', 'Doctor', 'Type', 'Date', 'Medicines', 'Diagnosis'];
    const rows = filtered.map(rx => [
      rx.rxId,
      `"${rx.patientName}"`,
      `"${rx.doctorName}"`,
      rx.type,
      rx.date,
      `"${rx.medicines.map(m => getMedName(m.medicineId)).join(', ')}"`,
      `"${rx.diagnosis || ''}"`,
    ].join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `prescriptions_${todayStr}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════════════════
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
            <button
              onClick={exportCSV}
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 text-slate-700 font-medium shadow-sm"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 font-semibold shadow-lg"
            >
              <Plus className="w-5 h-5" /> New Prescription
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Today's Rx", value: stats.today, color: 'text-slate-800' },
            { label: 'Total Rx', value: stats.total, color: 'text-emerald-600' },
            { label: 'IPD', value: stats.ipd, color: 'text-blue-600' },
            { label: 'OPD', value: stats.opd, color: 'text-teal-600' },
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
              placeholder="Search by Rx ID, patient or doctor..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700"
            />
          </div>
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 text-slate-700 font-medium cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="OPD">OPD</option>
            <option value="IPD">IPD</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-6">
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
                <tr key={rx.rxId} className="hover:bg-emerald-50/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ClipboardList className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="font-semibold text-slate-800">{rx.rxId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {rx.patientName?.charAt(0)}
                      </div>
                      <p className="font-semibold text-slate-800 text-sm">{rx.patientName}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-teal-500 flex-shrink-0" />
                      <p className="font-medium text-slate-700 text-sm">{rx.doctorName}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusBadge(rx.type)}`}>{rx.type}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{rx.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {rx.medicines.slice(0, 2).map((m, i) => (
                        <span key={i} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs font-medium border border-emerald-100">
                          {getMedName(m.medicineId)}
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
                      <button
                        onClick={() => { setSelectedRx(rx); setShowViewModal(true); }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => printPrescription(rx, medicines)}
                        className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                        title="Print"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { setSelectedRx(rx); setShowDeleteModal(true); }}
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
                    <ClipboardList className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">No prescriptions found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing <span className="font-semibold">{Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}</span>–
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
                  p === '...'
                    ? <span key={`e${i}`} className="px-2 text-slate-400 text-sm">…</span>
                    : <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${currentPage === p ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' : 'text-slate-600 hover:bg-emerald-50 border border-slate-200'}`}
                    >{p}</button>
                )}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg transition-all ${currentPage === totalPages ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-emerald-50 border border-slate-200'}`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Add Modal ── */}
      <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); setForm(initForm()); }} title="New Prescription" size="lg">
        {loadingData ? (
          <div className="py-10 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">Loading data...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Header fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  <User className="inline w-3 h-3 mr-1" />Patient *
                </label>
                <SearchableSelect
                  options={patients}
                  value={form.patientId}
                  onChange={v => setForm(p => ({ ...p, patientId: v }))}
                  placeholder="Select patient"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  <Stethoscope className="inline w-3 h-3 mr-1" />Doctor *
                </label>
                <SearchableSelect
                  options={doctors}
                  value={form.doctorId}
                  onChange={v => setForm(p => ({ ...p, doctorId: v }))}
                  placeholder="Select doctor"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  <Tag className="inline w-3 h-3 mr-1" />IPD / OPD *
                </label>
                <select
                  value={form.type}
                  onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
                >
                  <option value="OPD">OPD – Out Patient</option>
                  <option value="IPD">IPD – In Patient</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  <Calendar className="inline w-3 h-3 mr-1" />Prescription Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                <AlignLeft className="inline w-3 h-3 mr-1" />Diagnosis / Notes
              </label>
              <textarea
                rows={2}
                value={form.diagnosis}
                onChange={e => setForm(p => ({ ...p, diagnosis: e.target.value }))}
                placeholder="Optional diagnosis or notes..."
                className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm resize-none"
              />
            </div>

            {/* Medicines */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <Pill className="inline w-3 h-3 mr-1" />Medicines *
                </label>
                <button type="button" onClick={addMedRow} className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add Medicine
                </button>
              </div>

              {/* Column headers */}
              <div className="grid grid-cols-12 gap-2 px-1 mb-1">
                {[
                  { label: 'Medicine', span: 'col-span-4' },
                  { label: 'Dose Time', span: 'col-span-3' },
                  { label: 'Days', span: 'col-span-2' },
                  { label: 'Total Qty', span: 'col-span-2' },
                  { label: '', span: 'col-span-1' },
                ].map(h => (
                  <div key={h.label} className={`${h.span} text-xs font-semibold text-slate-400 uppercase tracking-wider`}>{h.label}</div>
                ))}
              </div>

              <div className="space-y-2">
                {form.medicines.map((med, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-slate-50 rounded-xl p-2">
                    {/* Medicine dropdown */}
                    <div className="col-span-4">
                      <SearchableSelect
                        options={medicines}
                        value={med.medicineId}
                        onChange={v => handleMedChange(idx, 'medicineId', v)}
                        placeholder="Select"
                        idKey="medicineId"
                        required
                      />
                    </div>
                    {/* Dose */}
                    <div className="col-span-3">
                      <select
                        value={med.doseTime}
                        onChange={e => handleMedChange(idx, 'doseTime', Number(e.target.value))}
                        required
                        className="w-full px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm"
                      >
                        {DOSE_OPTIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                      </select>
                    </div>
                    {/* Days */}
                    <div className="col-span-2">
                      <input
                        type="number"
                        min="1"
                        placeholder="Days"
                        value={med.days}
                        onChange={e => handleMedChange(idx, 'days', e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-emerald-400 text-slate-700 text-sm"
                      />
                    </div>
                    {/* Total (read-only) */}
                    <div className="col-span-2">
                      <div className="px-3 py-2 bg-emerald-50 border-2 border-emerald-100 rounded-lg text-emerald-700 text-sm font-bold text-center">
                        {med.total || 0}
                      </div>
                    </div>
                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => removeMedRow(idx)}
                      className="col-span-1 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                <Hash className="inline w-3 h-3 mr-1" />Special Instructions
              </label>
              <textarea
                rows={2}
                value={form.instructions}
                onChange={e => setForm(p => ({ ...p, instructions: e.target.value }))}
                placeholder="e.g. After meal, before sleep, avoid spicy food..."
                className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => { setShowAddModal(false); setForm(initForm()); }}
                className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!form.patientId || !form.doctorId) {
                    showToast('error', 'Validation', 'Patient and Doctor are required');
                    return;
                  }
                  // Build a temp rx for print preview
                  const rx = {
                    rxId: 'PREVIEW',
                    patientName: getPatientName(form.patientId),
                    doctorName: getDoctorName(form.doctorId),
                    type: form.type,
                    date: form.date,
                    diagnosis: form.diagnosis,
                    instructions: form.instructions,
                    medicines: form.medicines.map(m => ({ ...m, total: (Number(m.doseTime) || 0) * (Number(m.days) || 0) })),
                  };
                  printPrescription(rx, medicines);
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors flex items-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSubmitting ? 'Saving...' : 'Save Prescription'}
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* ── View Modal ── */}
      <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Prescription Details" size="md">
        {selectedRx && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Rx ID', value: selectedRx.rxId },
                { label: 'Date', value: selectedRx.date },
                { label: 'Patient', value: selectedRx.patientName },
                { label: 'Doctor', value: selectedRx.doctorName },
              ].map(row => (
                <div key={row.label} className="bg-slate-50 rounded-xl px-4 py-3">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{row.label}</p>
                  <p className="text-sm font-semibold text-slate-800">{row.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 rounded-xl px-4 py-3 flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</p>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusBadge(selectedRx.type)}`}>{selectedRx.type}</span>
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
                      {['Medicine', 'Dose', 'Days', 'Total Qty'].map(h => (
                        <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-slate-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedRx.medicines.map((m, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-3 py-2.5 font-medium text-slate-800">{getMedName(m.medicineId)}</td>
                        <td className="px-3 py-2.5 text-slate-600">{DOSE_OPTIONS.find(d => d.value === Number(m.doseTime))?.label || m.doseTime}</td>
                        <td className="px-3 py-2.5 text-slate-600">{m.days} days</td>
                        <td className="px-3 py-2.5 font-bold text-emerald-700">{m.total}</td>
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
              <button
                onClick={() => printPrescription(selectedRx, medicines)}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print Prescription
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ── Delete Modal ── */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Prescription" size="sm">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="text-slate-700 font-semibold">Delete {selectedRx?.rxId}?</p>
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
    </div>
  );
}