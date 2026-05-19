'use client';

import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { createPatientApi } from '../lib/commonApis';
import { showToast } from '../lib/notification';

// ─── Gender Dropdown ────────────────────────────────────────────────
function GenderDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const options = ['MALE', 'FEMALE', 'OTHER'];

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
              onClick={() => { onChange(opt); setOpen(false); }}
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

// ─── Form Field Helper ───────────────────────────────────────────────
function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700 placeholder:text-slate-400';

const EMPTY = {
  name: '', email: '', age: '',  fatherName: "",   // <-- add this
  disease: "", gender: '', phone: '',
  address: '', city: '', state: '', country: '', pincode: '',
};

// ─── Main Modal ──────────────────────────────────────────────────────
/**
 * AddPatientModal
 *
 * Props:
 *   isOpen   {boolean}  – controls visibility
 *   onClose  {function} – called when modal should close
 *   onSuccess {function} – optional callback after successful creation
 */
export default function AddPatientModal({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleReset = () => {
    setForm(EMPTY);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        age: form.age !== '' ? Number(form.age) : null,
        gender: form.gender || null,
      };
      await createPatientApi(payload);
      showToast('success', 'Created', 'Patient created successfully.');
      setForm(EMPTY);
      onClose();
      onSuccess?.(); // refresh parent if provided
    } catch (err) {
      showToast('error', 'Failed', err.message||'Failed to create patient.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100 rounded-t-2xl flex-shrink-0">
          <h2 className="text-lg font-bold text-slate-800">Add New Patient</h2>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {/* Row 1: Name + Phone */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Patient Name" required>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter full name"
                className={inputCls}
              />
            </Field>
            <Field label="Phone Number" required>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10))}
                required
                placeholder="+91 XXXXXXXXXX"
                className={inputCls}
              />
            </Field>
          </div>

                     {/* Row 6: Father Name + Disease */}
<div className="grid grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-2">Father Name</label>
    <input
      type="text"
      name="fatherName"
      value={form.fatherName}
      onChange={handleChange}
      placeholder="e.g. Ramesh Sharma"
      className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
    />
  </div>
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-2">Disease</label>
    <input
      type="text"
      name="disease"
      value={form.disease}
      onChange={handleChange}
      placeholder="e.g. Diabetes, Hypertension"
      className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
    />
  </div>

</div>

          {/* Row 2: Email + Age */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Email Address" required>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="email@example.com"
                className={inputCls}
              />
            </Field>
            <Field label="Age" required>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 3);
                  setForm((prev) => ({ ...prev, age: val }));
                }}
                required
                min={1}
                max={120}
                placeholder="e.g. 25"
                className={inputCls}
              />
            </Field>
          </div>

          {/* Row 3: Gender (half width) */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Gender" required>
              <GenderDropdown
                value={form.gender}
                onChange={(val) => setForm((prev) => ({ ...prev, gender: val }))}
              />
            </Field>
          </div>

          {/* Address */}
          <Field label="Address" required>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              rows="2"
              placeholder="Enter full address"
              className={inputCls}
            />
          </Field>

          {/* Row 4: City + Pincode */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="City">
              <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="e.g. Bengaluru" className={inputCls} />
            </Field>
            <Field label="Pincode">
              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="e.g. 560001"
                className={inputCls}
              />
            </Field>
          </div>

          {/* Row 5: State + Country */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="State">
              <input type="text" name="state" value={form.state} onChange={handleChange} placeholder="e.g. Karnataka" className={inputCls} />
            </Field>
            <Field label="Country">
              <input type="text" name="country" value={form.country} onChange={handleChange} placeholder="e.g. India" className={inputCls} />
            </Field>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg disabled:opacity-60"
            >
              {loading ? 'Saving...' : 'Add Patient'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}