'use client';

import { useState, useEffect, useCallback } from 'react';
import { Calendar, Clock, Plus, Search, Filter, X, Edit2, Trash2, Eye, ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { getAppointment, createAppointmentApi, udateAppointmentApi, deleteAppointmentApi } from '../../lib/commonApis';

// ─── Constants ────────────────────────────────────────────────────────────────
const EMPTY_FORM = {
  patientId: '',
  doctorId: '',
  appointmentDate: '',
  status: 'scheduled',
  notes: '',
  type: 'consultation',
};

const statusStyle = {
  confirmed: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  scheduled: 'bg-teal-100 text-teal-700 border border-teal-200',
  pending:   'bg-amber-100 text-amber-700 border border-amber-200',
  completed: 'bg-blue-100 text-blue-700 border border-blue-200',
  cancelled: 'bg-red-100 text-red-700 border border-red-200',
};

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

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



// ─── Form ─────────────────────────────────────────────────────────────────────
function AppointmentForm({ initial, onSubmit, loading }) {
  const [form, setForm] = useState(initial);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const fieldCls = "w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm";
  const labelCls = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";

  return (
    <form onSubmit={(e) => onSubmit(e, form)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Patient ID</label>
          <input className={fieldCls} type="number" placeholder="e.g. 1" value={form.patientId} onChange={e => set('patientId', e.target.value)} required />
        </div>
        <div>
          <label className={labelCls}>Doctor ID</label>
          <input className={fieldCls} type="number" placeholder="e.g. 2" value={form.doctorId} onChange={e => set('doctorId', e.target.value)} required />
        </div>
      </div>
      <div>
        <label className={labelCls}>Appointment Date & Time</label>
        <input className={fieldCls} type="datetime-local" value={form.appointmentDate} onChange={e => set('appointmentDate', e.target.value)} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Type</label>
          <select className={fieldCls} value={form.type} onChange={e => set('type', e.target.value)}>
            <option value="consultation">Consultation</option>
            <option value="follow-up">Follow-up</option>
            <option value="emergency">Emergency</option>
            <option value="check-up">Check-up</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Status</label>
          <select className={fieldCls} value={form.status} onChange={e => set('status', e.target.value)}>
            <option value="scheduled">Scheduled</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      <div>
        <label className={labelCls}>Notes</label>
        <textarea className={fieldCls + ' resize-none h-20'} placeholder="Additional notes…" value={form.notes} onChange={e => set('notes', e.target.value)} />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? 'Saving…' : 'Save Appointment'}
      </button>
    </form>
  );
}

// ─── View Modal ───────────────────────────────────────────────────────────────
function ViewModal({ apt, onClose }) {
  const row = (label, value) => (
    <div className="flex justify-between py-2.5 border-b border-slate-50 last:border-0">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
      <span className="text-sm text-slate-700 font-medium">{value}</span>
    </div>
  );
  return (
    <Modal title="Appointment Details" onClose={onClose}>
      <div className="space-y-0.5">
        {row('Appointment ID', String(apt.id))}
        {row('Patient ID', String(apt.patientId))}
        {row('Doctor ID', String(apt.doctorId))}
        {row('Date', apt.appointmentDate ? new Date(apt.appointmentDate).toLocaleString() : '—')}
        {row('Type', cap(apt.type))}
        {row('Status', cap(apt.status))}
        {row('Notes', apt.notes || '—')}
      </div>
    </Modal>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilter, setShowFilter] = useState(false);

  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

const load = useCallback(async () => {
  setLoading(true); setError('');
  try {
    const res = await getAppointment(10, page);

    // ✅ Fix: data nested hai res.data.appointments mein
    const raw = res?.data?.appointments || res?.data || [];

    const list = raw.map(item => ({
      id: item.id,
      patientId: item.patientId,
      doctorId: item.doctorId,
      appointmentDate: item.appointmentDate || '',
      status: item.status || 'scheduled',
      notes: item.notes || '',
      type: item.type || 'consultation',
      patient: item.patient || null,
      doctor: item.doctor || null,
    }));

    setAppointments(list);

    // ✅ Fix: totalPages bhi nested hai
    setTotalPages(res?.data?.totalPages ?? 1);

  } catch (e) {
    console.error('Appointments error:', e); // debug ke liye
    setError('Failed to load appointments. Check your API connection.');
  } finally { setLoading(false); }
}, [page]);

  useEffect(() => { load(); }, [load]);

  const filtered = appointments.filter(a => {
    const matchSearch = search === '' ||
      String(a.patientId).includes(search) ||
      String(a.doctorId).includes(search) ||
      a.type.toLowerCase().includes(search.toLowerCase()) ||
      (a.notes || '').toLowerCase().includes(search.toLowerCase()) ||
      (a.patient || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const openCreate = () => { setSelected(null); setModal('create'); };
  const openEdit   = (a) => { setSelected(a); setModal('edit'); };
  const openView   = (a) => { setSelected(a); setModal('view'); };
  const openDelete = (a) => { setSelected(a); setModal('delete'); };

  const handleCreate = async (e, form) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const newApt = {
        patientId: Number(form.patientId),
        doctorId: Number(form.doctorId),
        appointmentDate: form.appointmentDate,
        status: form.status,
        notes: form.notes,
        type: form.type,
      };
      await createAppointmentApi(newApt);
      setAppointments(prev => [...prev, { ...newApt, id: Date.now() }]);
      showToast('✅ Appointment created!');
      setModal(null);
    } catch { showToast('❌ Failed to create appointment.'); }
    finally { setFormLoading(false); }
  };

  const handleUpdate = async (e, form) => {
    e.preventDefault();
    if (!selected) return;
    setFormLoading(true);
    try {
      const updatedData = {
        patientId: Number(form.patientId),
        doctorId: Number(form.doctorId),
        appointmentDate: form.appointmentDate,
        status: form.status,
        notes: form.notes,
        type: form.type,
      };
      await udateAppointmentApi(selected.id, updatedData);
      setAppointments(prev =>
        prev.map(a => a.id === selected.id ? { ...a, ...updatedData } : a)
      );
      showToast('✅ Appointment updated!');
      setModal(null);
      setSelected(null);
    } catch { showToast('❌ Failed to update appointment.'); }
    finally { setFormLoading(false); }
  };

  const handleDelete = async () => {
    if (!selected) return;
    setFormLoading(true);
    try {
      setAppointments(prev => prev.filter(a => a.id !== selected.id));
      await deleteAppointmentApi(selected.id);
      showToast('🗑️ Appointment deleted.');
      setModal(null);
      setSelected(null);
    } catch { showToast('❌ Failed to delete appointment.'); }
    finally { setFormLoading(false); }
  };

  const statuses = ['all', 'scheduled', 'confirmed', 'pending', 'completed', 'cancelled'];
  const counts = (s) => appointments.filter(a => a.status === s).length;

  return (
    <div className="p-6 md:p-8 min-h-screen bg-slate-50">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-[100] bg-slate-800 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium">
          {toast}
        </div>
      )}

      {/* Modals */}
      {modal === 'create' && (
        <Modal title="New Appointment" onClose={() => setModal(null)}>
          <AppointmentForm initial={{ ...EMPTY_FORM }} onSubmit={handleCreate} loading={formLoading} />
        </Modal>
      )}
      {modal === 'edit' && selected && (
        <Modal title="Edit Appointment" onClose={() => setModal(null)}>
          <AppointmentForm
            initial={{
              patientId: selected.patientId,
              doctorId: selected.doctorId,
              appointmentDate: selected.appointmentDate,
              status: selected.status,
              notes: selected.notes,
              type: selected.type,
            }}
            onSubmit={handleUpdate}
            loading={formLoading}
          />
        </Modal>
      )}
      {modal === 'view' && selected && <ViewModal apt={selected} onClose={() => setModal(null)} />}
      {modal === 'delete' && selected && (
        <Modal title="Delete Appointment" onClose={() => setModal(null)}>
          <div className="text-center space-y-4">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-slate-700 font-semibold">Delete Appointment #{selected.id}?</p>
              <p className="text-slate-500 text-sm mt-1">This action cannot be undone.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={handleDelete} disabled={formLoading} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                {formLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-1">Appointments</h1>
            <p className="text-slate-500 text-sm">Manage patient appointments and schedules</p>
          </div>
          <button onClick={openCreate} className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 font-semibold shadow-lg shadow-emerald-100">
            <Plus className="w-4 h-4" /> New Appointment
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: 'Total',     value: appointments.length,      color: 'text-slate-800' },
            { label: 'Confirmed', value: counts('confirmed'),       color: 'text-emerald-600' },
            { label: 'Pending',   value: counts('pending'),         color: 'text-amber-600' },
            { label: 'Completed', value: counts('completed'),       color: 'text-blue-600' },
            { label: 'Cancelled', value: counts('cancelled'),       color: 'text-red-500' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <p className="text-xs text-slate-500 mb-1 font-medium">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-5">
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by patient, type, notes…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm"
            />
          </div>
          <button onClick={() => setShowFilter(f => !f)} className={`px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all border-2 ${showFilter ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button onClick={load} className="px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all">
            Refresh
          </button>
        </div>
        {showFilter && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2 flex-wrap">
            {statuses.map(s => (
              <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all border ${filterStatus === s ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 text-slate-600 hover:border-emerald-300'}`}>
                {s === 'all' ? 'All Statuses' : cap(s)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border-b border-red-100 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-100">
              <tr>
                {['ID', 'Patient ID', 'Doctor ID', 'Date & Time', 'Type', 'Status', 'Notes', 'Actions'].map(h => (
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
              ) : filtered.map(apt => (
                <tr key={apt.id} className="hover:bg-emerald-50/40 transition-colors">
                  <td className="px-5 py-4 text-sm font-mono text-slate-500">#{apt.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {apt.patient ? apt.patient.charAt(0) : 'P'}
                      </div>
                      <span className="text-sm font-semibold text-slate-700">{apt.patient || `Patient #${apt.patientId}`}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{apt.doctor || `Dr. #${apt.doctorId}`}</td>
                  <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {apt.appointmentDate ? new Date(apt.appointmentDate).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' }) : '—'}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold capitalize">{apt.type}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${statusStyle[apt.status] || 'bg-slate-100 text-slate-600'}`}>
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
            <p className="text-sm text-slate-500">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}