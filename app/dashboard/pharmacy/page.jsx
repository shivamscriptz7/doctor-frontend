'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import * as XLSX from 'xlsx';
import {
  Plus, Search, Download, Pill, Package, AlertTriangle, TrendingUp,
  Eye, Edit, X, Trash2, FileText, Sheet, ChevronDown, Loader2,
  Upload, CheckCircle2, AlertCircle, Table2
} from 'lucide-react';

import { getMedicines, createPharmacyApi, updatePharmacyApi, deletePharmacyApi, createBulkMedicineApi } from '../../lib/commonApis';
import { showToast } from '../../lib/notification';

// ── Modal ─────────────────────────────────────────────────────────────────────
function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null;
  const sizeClasses = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl', xl: 'max-w-6xl' };
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

// ── Shared Medicine Form ───────────────────────────────────────────────────────
const CATEGORIES = ['tablet', 'capsule', 'syrup', 'injection', 'drops', 'cream'];
const EMPTY_FORM = { name: '', type: '', strength: '', manufacturer: '', quantity: '', price: '', isActive: true };

// ── Tab Switcher ──────────────────────────────────────────────────────────────
function TabSwitcher({ active, onChange }) {
  return (
    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit">
      <button
        type="button"
        onClick={() => onChange('single')}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
          active === 'single' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        <Pill className="w-4 h-4" /> Single
      </button>
      <button
        type="button"
        onClick={() => onChange('bulk')}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
          active === 'bulk' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        <Upload className="w-4 h-4" /> Bulk Upload
      </button>
    </div>
  );
}

// ── Bulk Upload Panel ─────────────────────────────────────────────────────────
const PREVIEW_LIMIT = 200;
const PREVIEW_PAGE_SIZE = 10;

function BulkUploadPanel({ onBulkUpload, isSubmitting, uploadSummary, onReset }) {
  const [dragOver, setDragOver]       = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewHeaders, setPreviewHeaders] = useState([]);
  const [previewRows, setPreviewRows]   = useState([]);   // max 200 rows
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [previewPage, setPreviewPage]   = useState(1);
  const [parseError, setParseError]     = useState('');
  const fileInputRef = useRef(null);

  const totalPreviewPages = Math.ceil(previewRows.length / PREVIEW_PAGE_SIZE);

  // ── Parse file using SheetJS ──────────────────────────────────────────────
  const parseFile = (file) => {
    setParseError('');
    setPreviewHeaders([]);
    setPreviewRows([]);
    setTotalRowCount(0);
    setPreviewPage(1);

    const ext = file.name.split('.').pop().toLowerCase();
    if (!['csv', 'xlsx', 'xls'].includes(ext)) {
      setParseError('Only CSV, XLSX, or XLS files are supported.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const wb = XLSX.read(e.target.result, { type: 'binary' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        // header:1 → array of arrays; defval:'' → empty cells as ''
        const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });

        if (data.length < 2) {
          setParseError('File empty hai ya sirf header row hai.');
          return;
        }

        const headers = data[0].map(String).map(h => h.trim());
        const rawRows = data.slice(1).filter(r => r.some(c => String(c).trim() !== ''));
        const total   = rawRows.length;

        setPreviewHeaders(headers);
        setPreviewRows(rawRows.slice(0, PREVIEW_LIMIT));
        setTotalRowCount(total);
        setSelectedFile(file);
      } catch (err) {
        setParseError('File parse nahi ho saki: ' + err.message);
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) parseFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) parseFile(file);
    e.target.value = '';
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewHeaders([]);
    setPreviewRows([]);
    setTotalRowCount(0);
    setPreviewPage(1);
    setParseError('');
    onReset?.();
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    const fd = new FormData();
    fd.append('file', selectedFile);
    onBulkUpload(fd);
  };

  // ── Pagination helpers ────────────────────────────────────────────────────
  const getPagedRows = () =>
    previewRows.slice((previewPage - 1) * PREVIEW_PAGE_SIZE, previewPage * PREVIEW_PAGE_SIZE);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPreviewPages <= 7) {
      for (let i = 1; i <= totalPreviewPages; i++) pages.push(i);
    } else if (previewPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPreviewPages);
    } else if (previewPage >= totalPreviewPages - 3) {
      pages.push(1, '...', totalPreviewPages - 4, totalPreviewPages - 3, totalPreviewPages - 2, totalPreviewPages - 1, totalPreviewPages);
    } else {
      pages.push(1, '...', previewPage - 1, previewPage, previewPage + 1, '...', totalPreviewPages);
    }
    return pages;
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-5">

      {/* Download Template */}
      <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
        <div className="flex items-center gap-2 text-sm text-emerald-700">
          <FileText className="w-4 h-4" />
          <span className="font-medium">Need a template?</span>
          <span className="text-emerald-600">Download the CSV format</span>
        </div>
        <button
          type="button"
          onClick={() => {
            const csv = 'name,type,strength,manufacturer,quantity,price,isActive\nParacetamol,tablet,500mg,ABC Labs,200,12,true\nAmoxicillin,capsule,250mg,XYZ Pharma,150,35,true';
            const link = document.createElement('a');
            link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
            link.download = 'medicine_template.csv';
            link.click();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Download className="w-3.5 h-3.5" /> Download
        </button>
      </div>

      {/* ── UPLOAD SUCCESS SUMMARY ── */}
      {uploadSummary ? (
        <div className="space-y-5">

          {/* Success Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 p-px">
            <div className="rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 px-5 py-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-emerald-800 text-base">Upload Successful!</p>
                <p className="text-sm text-emerald-600 mt-0.5 truncate">
                  {uploadSummary.processed} medicines added in {uploadSummary.timeTaken}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards — responsive grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                label: 'Total Rows',
                value: uploadSummary.totalRows,
                icon: <Table2 className="w-4 h-4" />,
                bg: 'bg-slate-50',
                border: 'border-slate-200',
                iconBg: 'bg-slate-100',
                iconColor: 'text-slate-500',
                valueColor: 'text-slate-800',
                labelColor: 'text-slate-500',
              },
              {
                label: 'Processed',
                value: uploadSummary.processed,
                icon: <CheckCircle2 className="w-4 h-4" />,
                bg: 'bg-emerald-50',
                border: 'border-emerald-200',
                iconBg: 'bg-emerald-100',
                iconColor: 'text-emerald-600',
                valueColor: 'text-emerald-700',
                labelColor: 'text-emerald-600',
              },
              {
                label: 'Skipped',
                value: uploadSummary.skipped,
                icon: <AlertCircle className="w-4 h-4" />,
                bg: uploadSummary.skipped > 0 ? 'bg-amber-50' : 'bg-slate-50',
                border: uploadSummary.skipped > 0 ? 'border-amber-200' : 'border-slate-200',
                iconBg: uploadSummary.skipped > 0 ? 'bg-amber-100' : 'bg-slate-100',
                iconColor: uploadSummary.skipped > 0 ? 'text-amber-600' : 'text-slate-400',
                valueColor: uploadSummary.skipped > 0 ? 'text-amber-700' : 'text-slate-500',
                labelColor: uploadSummary.skipped > 0 ? 'text-amber-600' : 'text-slate-400',
              },
              {
                label: 'Time Taken',
                value: uploadSummary.timeTaken,
                icon: <Loader2 className="w-4 h-4" />,
                bg: 'bg-blue-50',
                border: 'border-blue-200',
                iconBg: 'bg-blue-100',
                iconColor: 'text-blue-500',
                valueColor: 'text-blue-700',
                labelColor: 'text-blue-500',
              },
            ].map(({ label, value, icon, bg, border, iconBg, iconColor, valueColor, labelColor }) => (
              <div key={label} className={`${bg} border ${border} rounded-xl p-3 sm:p-4 flex flex-col gap-2`}>
                <div className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center ${iconColor}`}>
                  {icon}
                </div>
                <div>
                  <p className={`text-xl sm:text-2xl font-bold ${valueColor}`}>{value}</p>
                  <p className={`text-xs font-medium ${labelColor} mt-0.5`}>{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Upload Another */}
          <button
            type="button"
            onClick={handleRemove}
            className="w-full py-3 rounded-xl border-2 border-dashed border-emerald-300 text-emerald-600 font-semibold hover:bg-emerald-50 hover:border-emerald-400 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Upload className="w-4 h-4" /> Upload Another File
          </button>
        </div>

      ) : (
        <>
          {/* ── Drag & Drop zone (only if no file selected) ── */}
          {!selectedFile && (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
                dragOver ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
              }`}
            >
              <input ref={fileInputRef} type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={handleFileSelect} />
              <div className="flex flex-col items-center gap-3">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${dragOver ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                  <Upload className={`w-7 h-7 ${dragOver ? 'text-emerald-600' : 'text-slate-400'}`} />
                </div>
                <div>
                  <p className="font-semibold text-slate-700">Drag & drop your file here</p>
                  <p className="text-sm text-slate-400 mt-0.5">or click to browse — CSV, XLSX, XLS supported</p>
                </div>
                <p className="text-xs text-slate-400">Required columns: name, type, strength, manufacturer, quantity, price</p>
              </div>
            </div>
          )}

          {/* Parse Error */}
          {parseError && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">Error</p>
                <p>{parseError}</p>
              </div>
            </div>
          )}

          {/* ── File Selected → Preview ── */}
          {selectedFile && previewRows.length > 0 && (
            <div className="space-y-4">

              {/* File info bar */}
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{selectedFile.name}</p>
                    <p className="text-xs text-slate-400">
                      {(selectedFile.size / 1024).toFixed(1)} KB •{' '}
                      <span className="font-medium text-slate-600">{totalRowCount.toLocaleString()} rows</span> total
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
                >
                  <X className="w-3.5 h-3.5" /> Remove
                </button>
              </div>

              {/* Warning: rows > 200 */}
              {totalRowCount > PREVIEW_LIMIT && (
                <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200 text-sm text-amber-700">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>
                    File mein <strong>{totalRowCount.toLocaleString()}</strong> rows hain —
                    sirf pehle <strong>{PREVIEW_LIMIT}</strong> preview mein dikh rahe hain.
                    Saare rows upload honge.
                  </span>
                </div>
              )}

              {/* Preview Table Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Table2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Data Preview</span>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                  Showing {Math.min(totalRowCount, PREVIEW_LIMIT).toLocaleString()} of {totalRowCount.toLocaleString()} rows
                </span>
              </div>

              {/* Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 sticky top-0 z-10">
                      <tr>
                        <th className="px-3 py-2.5 text-left font-semibold text-slate-500 border-b border-emerald-100 whitespace-nowrap">#</th>
                        {previewHeaders.map(h => (
                          <th key={h} className="px-3 py-2.5 text-left font-semibold text-slate-600 border-b border-emerald-100 whitespace-nowrap capitalize">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {getPagedRows().map((row, i) => (
                        <tr key={i} className="hover:bg-emerald-50/50 transition-colors">
                          <td className="px-3 py-2 text-slate-400 font-medium">
                            {(previewPage - 1) * PREVIEW_PAGE_SIZE + i + 1}
                          </td>
                          {previewHeaders.map((_, j) => (
                            <td key={j} className="px-3 py-2 text-slate-700 whitespace-nowrap">
                              {String(row[j] ?? '')}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              {totalPreviewPages > 1 && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Showing{' '}
                    <span className="font-semibold text-slate-700">
                      {(previewPage - 1) * PREVIEW_PAGE_SIZE + 1}–{Math.min(previewPage * PREVIEW_PAGE_SIZE, previewRows.length)}
                    </span>{' '}
                    of{' '}
                    <span className="font-semibold text-slate-700">{previewRows.length}</span>
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPreviewPage(p => p - 1)}
                      disabled={previewPage === 1}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-slate-600 transition-all"
                    >
                      ‹
                    </button>
                    {getPageNumbers().map((p, idx) =>
                      p === '...' ? (
                        <span key={`e${idx}`} className="px-1 text-slate-400">…</span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => setPreviewPage(p)}
                          className={`px-2.5 py-1.5 rounded-lg border font-semibold transition-all ${
                            previewPage === p
                              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-transparent shadow'
                              : 'border-slate-200 bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
                          }`}
                        >
                          {p}
                        </button>
                      )
                    )}
                    <button
                      onClick={() => setPreviewPage(p => p + 1)}
                      disabled={previewPage === totalPreviewPages}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-slate-600 transition-all"
                    >
                      ›
                    </button>
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <button
                type="button"
                onClick={handleUpload}
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Uploading {totalRowCount.toLocaleString()} medicines...</>
                ) : (
                  <><Upload className="w-4 h-4" /> Upload {totalRowCount.toLocaleString()} Medicines to Server</>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ── MedicineForm ──────────────────────────────────────────────────────────────
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
  'in-stock':  'bg-green-100 text-green-700',
  'low-stock': 'bg-amber-100 text-amber-700',
  'critical':  'bg-red-100 text-red-700',
}[status] ?? 'bg-slate-100 text-slate-700');

const getStockIcon = (status) => ({
  'in-stock':  <Package className="w-4 h-4" />,
  'low-stock': <TrendingUp className="w-4 h-4" />,
  'critical':  <AlertTriangle className="w-4 h-4" />,
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
  const [medicines, setMedicines]       = useState([]);
  const [totalMeta, setTotalMeta]       = useState({ total: 0, totalPages: 1 });
  const [searchTerm, setSearchTerm]     = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [currentPage, setCurrentPage]   = useState(1);
  const [itemsPerPage]                  = useState(10);
  const [loading, setLoading]           = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const [modal, setModal]               = useState({ type: null });
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [formData, setFormData]         = useState(EMPTY_FORM);
  const [addTab, setAddTab]             = useState('single');
  const [uploadSummary, setUploadSummary] = useState(null);

  const openModal = (type, medicine = null) => {
    setSelectedMedicine(medicine);
    setFormData(medicine && type === 'edit'
      ? { name: medicine.name, type: medicine.category, strength: medicine.strength, manufacturer: medicine.manufacturer, quantity: medicine.stock, price: medicine.price, isActive: medicine.isActive }
      : EMPTY_FORM
    );
    if (type === 'add') setAddTab('single');
    setModal({ type });
  };

  const closeModal = () => {
    setModal({ type: null });
    setSelectedMedicine(null);
    setFormData(EMPTY_FORM);
    setAddTab('single');
    setUploadSummary(null);
  };

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const loadMedicines = useCallback(async (page = currentPage) => {
    setLoading(true);
    try {
      const res = await getMedicines(itemsPerPage, page);
      const raw = res.data?.medicines || res.data || [];
      if (!Array.isArray(raw)) { setMedicines([]); return; }
      setMedicines(raw.map(mapMedicine));
      setTotalMeta({
        total: res.data?.total || raw.length,
        totalPages: res.data?.totalPages || Math.ceil((res.data?.total || raw.length) / itemsPerPage),
      });
    } catch (err) {
      console.error('Failed to load medicines:', err);
      showToast('error', 'Failed', 'Failed to load medicines');
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
        showToast('success', 'Updated', 'Medicine updated successfully!');
      } else {
        await createPharmacyApi(payload);
        setCurrentPage(1);
        showToast('success', 'Created', 'Medicine created successfully!');
      }
      await loadMedicines(modal.type === 'edit' ? currentPage : 1);
      closeModal();
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed', `❌ Failed to ${modal.type === 'edit' ? 'update' : 'add'} medicine`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Bulk Upload — file as FormData → server ───────────────────────────────
  const handleBulkUpload = async (formData) => {
    setIsSubmitting(true);
    const start = Date.now();
    try {
      const res = await createBulkMedicineApi(formData);
      const elapsed = ((Date.now() - start) / 1000).toFixed(1) + 's';
      const d = res?.summary || {};
      setUploadSummary({
        totalRows: d.totalRows ?? '—',
        processed: d.processed ?? '—',
        skipped:   d.skipped   ?? 0,
        timeTaken: d.timeTaken ?? elapsed,
      });
      setCurrentPage(1);
      await loadMedicines(1);
      showToast('success', 'Bulk Upload Done', 'Medicines uploaded successfully!');
    } catch (err) {
      console.error(err);
      showToast('error', 'Upload Failed', err?.message || 'Bulk upload failed. Please check the file format.');
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
      showToast('success', 'Deleted', 'Medicine deleted successfully!');
      closeModal();
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed', 'Failed to delete medicine!');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Filter + Search ───────────────────────────────────────────────────────
  const filteredMedicines = useMemo(() =>
    medicines.filter(med => {
      const matchesSearch =
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (med.id?.toString() || '').includes(searchTerm) ||
        med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || med.category === filterCategory;
      return matchesSearch && matchesCategory;
    }), [medicines, searchTerm, filterCategory]);

  const totalPages       = totalMeta.totalPages;
  const totalCount       = totalMeta.total;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
  const indexOfLastItem  = Math.min(currentPage * itemsPerPage, totalCount);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else if (currentPage <= 3) { for (let i = 1; i <= 4; i++) pages.push(i); pages.push('...'); pages.push(totalPages); }
    else if (currentPage >= totalPages - 2) { pages.push(1); pages.push('...'); for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i); }
    else { pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages); }
    return pages;
  };

  const stats = useMemo(() => ({
    total:      totalCount,
    inStock:    medicines.filter(m => m.status === 'in-stock').length,
    lowStock:   medicines.filter(m => m.status === 'low-stock').length,
    critical:   medicines.filter(m => m.status === 'critical').length,
    totalValue: medicines.reduce((sum, m) => sum + m.stock * m.price, 0),
  }), [medicines, totalCount]);

  const exportToExcel = () => {
    const headers = ['Sr.No', 'ID', 'Name', 'Type', 'Strength', 'Manufacturer', 'Stock', 'Price', 'Status'];
    const csv = [headers.join(','), ...filteredMedicines.map((m, i) =>
      `"${(currentPage - 1) * itemsPerPage + i + 1}","${m.id}","${m.name}","${m.category}","${m.strength}","${m.manufacturer}",${m.stock},${m.price},"${m.status}"`
    )].join('\n');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    link.download = `pharmacy_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    setShowExportMenu(false);
  };

  const exportToPDF = () => {
    const html = `<!DOCTYPE html><html><head><title>Pharmacy Report</title><style>body{font-family:Arial,sans-serif;margin:20px}h1{color:#059669;text-align:center}table{width:100%;border-collapse:collapse;margin-top:20px}th{background-color:#059669;color:white;padding:12px;text-align:left}td{padding:10px;border-bottom:1px solid #ddd}tr:hover{background-color:#f5f5f5}</style></head><body><h1>MediCare Hospital - Pharmacy Report</h1><p>Generated: ${new Date().toLocaleDateString('en-IN')} | Total: ${filteredMedicines.length}</p><table><thead><tr><th>Sr.No</th><th>ID</th><th>Name</th><th>Type</th><th>Stock</th><th>Price</th><th>Status</th></tr></thead><tbody>${filteredMedicines.map((m, i) => `<tr><td>${(currentPage - 1) * itemsPerPage + i + 1}</td><td>${m.id}</td><td>${m.name}</td><td>${m.category}</td><td>${m.stock}</td><td>₹${m.price}</td><td>${m.status}</td></tr>`).join('')}</tbody></table></body></html>`;
    const w = window.open('', '', 'height=600,width=800');
    w.document.write(html); w.document.close(); w.focus();
    setTimeout(() => { w.print(); setShowExportMenu(false); }, 250);
  };

  const addModalTitle = addTab === 'bulk' ? 'Bulk Upload Medicines' : 'Add New Medicine';

  return (
    <div className="p-8">
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
            { label: 'Total Medicines', value: stats.total,                      color: 'text-slate-800' },
            { label: 'In Stock',        value: stats.inStock,                    color: 'text-green-600' },
            { label: 'Low Stock',       value: stats.lowStock,                   color: 'text-amber-600' },
            { label: 'Critical',        value: stats.critical,                   color: 'text-red-600' },
            { label: 'Total Value',     value: `₹${stats.totalValue.toFixed(0)}`, color: 'text-emerald-600' },
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
                  {['Sr. No.', 'ID', 'Name', 'Type', 'Strength', 'Manufacturer', 'Stock', 'Status', 'Actions'].map((h, i) => (
                    // <th key={h} className={`px-6 py-4 font-semibold text-slate-700 ${i === 7 ? 'text-center' : 'text-left'}`}>{h}</th>
                  <th key={h} className="px-5 py-3.5 text-center text-xs font-bold text-slate-600  uppercase tracking-wider whitespace-nowrap">{h}</th>

                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMedicines.length > 0 ? filteredMedicines.map((medicine, index) => (
                  <tr key={medicine.id} className="hover:bg-emerald-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800">{index + indexOfFirstItem}</td>
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
                    <td colSpan={9} className="px-6 py-12 text-center">
                      <Pill className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-600 font-medium">No medicines found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

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

      {/* ── Add Modal ── */}
      <Modal isOpen={modal.type === 'add'} onClose={closeModal} title={addModalTitle} size={addTab === 'bulk' ? 'lg' : 'md'}>
        <div className="space-y-5">
          <TabSwitcher active={addTab} onChange={setAddTab} />
          {addTab === 'single' && (
            <MedicineForm formData={formData} onChange={handleFormChange} onSubmit={handleSubmit} onCancel={closeModal} isEdit={false} isSubmitting={isSubmitting} />
          )}
          {addTab === 'bulk' && (
            <BulkUploadPanel
              onBulkUpload={handleBulkUpload}
              isSubmitting={isSubmitting}
              uploadSummary={uploadSummary}
              onReset={() => setUploadSummary(null)}
            />
          )}
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={modal.type === 'edit'} onClose={closeModal} title="Edit Medicine" size="md">
        <MedicineForm formData={formData} onChange={handleFormChange} onSubmit={handleSubmit} onCancel={closeModal} isEdit={true} isSubmitting={isSubmitting} />
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
                { label: 'Type',           value: selectedMedicine.category },
                { label: 'Strength',       value: selectedMedicine.strength },
                { label: 'Manufacturer',   value: selectedMedicine.manufacturer },
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