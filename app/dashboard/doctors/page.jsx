'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Stethoscope, Plus, Search, Download, X, Edit, Trash2, Eye, FileText, Sheet, ChevronDown, Filter, Loader2 } from 'lucide-react';
import { getDoctorApi, createDoctorApi, updateDoctorApi, deleteDoctorApi,getDepartmentApi } from '../../lib/commonApis';

// ── Modal Component ───────────────────────────────────────────────────────────
function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} border border-slate-100 flex flex-col max-h-[90vh]`}
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

// ── Main Component ────────────────────────────────────────────────────────────
export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState('');

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    hospitalName: '',
    departmentId: '',
    email: '',
    phone: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
    country: '',
  });

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  // ── Load Doctors ──────────────────────────────────────────────────────────
  const loadDoctors = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getDoctorApi(100, currentPage);
      console.log('Doctors API Response:', res);
      
      // ✅ Handle exact API structure: { data: { doctors: [...] } }
      const dataArray = res?.data?.doctors || res?.data || res || [];
      
      if (!Array.isArray(dataArray)) {
        console.warn('Expected array but got:', dataArray);
        setDoctors([]);
        return;
      }
      
      const list = dataArray.map(item => ({
        id: item.id,
        name: item.name,
        hospitalName: item.hospitalName || '-',
        departmentId: item.departmentId || null,
        department: item.department?.departmentName || 'N/A',
        email: item.email,
        phone: item.phone,
        address: item.address || '-',
        pincode: item.pincode || '-',
        city: item.city || '-',
        state: item.state || '-',
        country: item.country || '-',
      }));

      setDoctors(list);
    } catch (err) {
      console.error('Failed to load doctors:', err);
      console.error('Error details:', err.message);
      showToast('❌ Failed to load doctors');
      setDoctors([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

   const loadDepartments = useCallback(async () => {
    try {
      const res = await getDepartmentApi(100, 1);
      console.log(res,'resssssssss');
      
      const dataArray = res?.departments || res?.data || [];
console.log(dataArray,'Departments');


      const apiDepartments = dataArray.map((item) => ({
       
        
        id: item.id,
        name: item.departmentName,
      }));

      setDepartments(apiDepartments);
    } catch (err) {
      console.error('Failed to load patients:', err);
      setDepartments([]);
    }
  }, []);

  useEffect(() => {
    loadDoctors();
    loadDepartments();
  }, [loadDoctors]);

  // ── Form Handlers ─────────────────────────────────────────────────────────
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      hospitalName: '',
      departmentId: '',
      email: '',
      phone: '',
      address: '',
      pincode: '',
      city: '',
      state: '',
      country: '',
    });
  };

  // ── Add Doctor ────────────────────────────────────────────────────────────
  const handleAddDoctor = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        name: formData.name,
        hospitalName: formData.hospitalName,
        departmentId: parseInt(formData.departmentId) || null,
        email: formData.email,
        quantity:formData.quantity,
        phone: formData.phone,
        address: formData.address,
        pincode: formData.pincode,
        city: formData.city,
        state: formData.state,
        country: formData.country,
      };

      await createDoctorApi(payload);
      await loadDoctors();
      setShowAddModal(false);
      resetForm();
      setCurrentPage(1);
      showToast('✅ Doctor added successfully!');
    } catch (err) {
      console.error('Create error:', err);
      showToast('❌ Failed to add doctor');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Edit Doctor ───────────────────────────────────────────────────────────
  const handleEditClick = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData({
      name: doctor.name,
      hospitalName: doctor.hospitalName,
      departmentId: doctor.departmentId?.toString() || '',
      email: doctor.email,
      quantity:doctor.quantity,
      phone: doctor.phone,
      address: doctor.address,
      pincode: doctor.pincode,
      city: doctor.city,
      state: doctor.state,
      country: doctor.country,
    });
    setShowEditModal(true);
  };

  const handleUpdateDoctor = async (e) => {
    e.preventDefault();
    if (!selectedDoctor) return;
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        hospitalName: formData.hospitalName,
        departmentId: parseInt(formData.departmentId) || null,
        email: formData.email,
        quantity:formData.quantity,
        phone: formData.phone,
        address: formData.address,
        pincode: formData.pincode,
        city: formData.city,
        state: formData.state,
        country: formData.country,
      };

      await updateDoctorApi(selectedDoctor.id, payload);
      await loadDoctors();
      setShowEditModal(false);
      setSelectedDoctor(null);
      resetForm();
      showToast('✅ Doctor updated successfully!');
    } catch (err) {
      console.error('Update error:', err);
      showToast('❌ Failed to update doctor');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Delete Doctor ─────────────────────────────────────────────────────────
  const handleDeleteClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDeleteModal(true);
  };

  const handleDeleteDoctor = async () => {
    if (!selectedDoctor) return;
    setIsSubmitting(true);

    try {
      await deleteDoctorApi(selectedDoctor.id);
      await loadDoctors();
      setShowDeleteModal(false);
      setSelectedDoctor(null);
      showToast('🗑️ Doctor deleted');
    } catch (err) {
      console.error('Delete error:', err);
      showToast('❌ Failed to delete doctor');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── View Doctor ───────────────────────────────────────────────────────────
  const handleViewClick = (doctor) => {
    console.log(doctor,'view');
    
    setSelectedDoctor(doctor);
    setShowViewModal(true);
  };

  // ── Filter and Search ─────────────────────────────────────────────────────
  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doctor.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doctor.department || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doctor.phone || '').includes(searchTerm)
    );
  }, [doctors, searchTerm]);

  // ── Pagination ────────────────────────────────────────────────────────────
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstItem, indexOfLastItem);

  // ── Export Functions ──────────────────────────────────────────────────────
  const exportToExcel = () => {
    const headers = ['ID', 'Name', 'Hospital', 'Department', 'Email', 'Phone', 'City', 'State'];
    const csvData = [
      headers.join(','),
      ...filteredDoctors.map(d => 
        `${d.id},"${d.name}","${d.hospitalName}","${d.department}","${d.email}","${d.phone}","${d.city}","${d.state}"`
      )
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', `doctors_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportMenu(false);
  };

  const exportToPDF = () => {
    const htmlContent = `<!DOCTYPE html><html><head><title>Doctors Report</title><style>body{font-family:Arial,sans-serif;margin:20px}h1{color:#059669;text-align:center}table{width:100%;border-collapse:collapse;margin-top:20px}th{background-color:#059669;color:white;padding:12px;text-align:left}td{padding:10px;border-bottom:1px solid #ddd}tr:hover{background-color:#f5f5f5}</style></head><body><div class="header"><h1>MediCare Hospital - Doctors Report</h1><p>Generated on: ${new Date().toLocaleDateString('en-IN')}</p><p><strong>Total Doctors: ${filteredDoctors.length}</strong></p></div><table><thead><tr><th>Name</th><th>Hospital</th><th>Department</th><th>Email</th><th>Phone</th></tr></thead><tbody>${filteredDoctors.map(d => `<tr><td>${d.name}</td><td>${d.hospitalName}</td><td>${d.department}</td><td>${d.email}</td><td>${d.phone}</td></tr>`).join('')}</tbody></table></body></html>`;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); setShowExportMenu(false); }, 250);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pageNumbers.push(i);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
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
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Doctors</h1>
            <p className="text-slate-600">Manage all doctors in the hospital</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <button onClick={() => setShowExportMenu(!showExportMenu)} className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 text-slate-700 font-medium shadow-sm">
                <Download className="w-4 h-4" />
                Export
                <ChevronDown className="w-4 h-4" />
              </button>
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 z-10 overflow-hidden">
                  <button onClick={exportToExcel} className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors flex items-center gap-3 text-slate-700">
                    <Sheet className="w-4 h-4 text-green-600" />
                    <span className="font-medium">Export to Excel</span>
                  </button>
                  <button onClick={exportToPDF} className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors flex items-center gap-3 text-slate-700 border-t border-slate-100">
                    <FileText className="w-4 h-4 text-red-600" />
                    <span className="font-medium">Export to PDF</span>
                  </button>
                </div>
              )}
            </div>
            <button onClick={() => setShowAddModal(true)} className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 font-semibold shadow-lg">
              <Plus className="w-5 h-5" />
              Add Doctor
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Total Doctors</p>
            <p className="text-2xl font-bold text-slate-800">{doctors.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Departments</p>
            <p className="text-2xl font-bold text-emerald-600">{new Set(doctors.map(d => d.department)).size}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Hospitals</p>
            <p className="text-2xl font-bold text-teal-600">{new Set(doctors.map(d => d.hospitalName)).size}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Showing</p>
            <p className="text-2xl font-bold text-cyan-600">{currentDoctors.length}</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search doctors by name, email, department or phone..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700"
            />
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-emerald-500 mx-auto mb-4" />
            <p className="text-slate-600">Loading doctors...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {currentDoctors.length > 0 ? (
            currentDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white shadow-md">
                    <Stethoscope className="w-8 h-8" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-bold text-slate-800 truncate">{doctor.name}</h3>
                    <p className="text-emerald-600 font-medium text-sm truncate">{doctor.department}</p>
                  </div>
                </div>
                <div className="space-y-2 text-slate-600 mb-4 text-sm">
                  <p className="truncate"><span className="font-semibold">Hospital:</span> {doctor.hospitalName}</p>
                  <p className="truncate"><span className="font-semibold">Email:</span> {doctor.email}</p>
                  <p><span className="font-semibold">Phone:</span> {doctor.phone}</p>
                  <p className="truncate"><span className="font-semibold">City:</span> {doctor.city}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleViewClick(doctor)} className="flex-1 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium flex items-center justify-center gap-1 text-sm">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button onClick={() => handleEditClick(doctor)} className="flex-1 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors font-medium flex items-center justify-center gap-1 text-sm">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button onClick={() => handleDeleteClick(doctor)} className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-16">
              <Stethoscope className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 font-medium">No doctors found</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing <span className="font-semibold">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-semibold">{Math.min(indexOfLastItem, filteredDoctors.length)}</span> of{' '}
              <span className="font-semibold">{filteredDoctors.length}</span>
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'}`}>
                Previous
              </button>
              <div className="flex items-center gap-1">
                {getPageNumbers().map((pageNum, index) => (
                  pageNum === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-3 py-2 text-slate-400">...</span>
                  ) : (
                    <button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === pageNum ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'}`}>
                      {pageNum}
                    </button>
                  )
                ))}
              </div>
              <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'}`}>
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALS */}
      {/* Add Doctor Modal */}
      <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); resetForm(); }} title="Add New Doctor" size="md">
        <form onSubmit={handleAddDoctor} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Doctor Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleFormChange} required className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" placeholder="Dr. Full Name" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Hospital Name</label>
              <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleFormChange} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" placeholder="Hospital Name" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Department Name</label>
              {/* <input type="number" name="departmentId" value={formData.departmentId} onChange={handleFormChange} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" placeholder="e.g., 2" /> */}

            
<select name="departmentId" value={formData.departmentId} onChange={handleFormChange}
  className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm">
  <option value="">Select Department</option>
  {departments.map((dept) => (
    <option key={dept.id} value={dept.id}>{dept.name}</option>
  ))}
</select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Phone Number *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '').slice(0,10)} required className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" placeholder="9876543210" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email Address *</label>
            <input type="email" name="email" value={formData.email} onChange={handleFormChange} required className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" placeholder="doctor@example.com" />
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleFormChange} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" placeholder="Full Address" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">City</label>
              <input type="text" name="city" value={formData.city} onChange={handleFormChange} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" placeholder="City" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Pincode</label>
              <input type="text" name="pincode" value={formData.pincode} onChange={handleFormChange} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" placeholder="110001" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">State</label>
              <input type="text" name="state" value={formData.state} onChange={handleFormChange} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" placeholder="State" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Country</label>
              <input type="text" name="country" value={formData.country} onChange={handleFormChange} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" placeholder="India" />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => { setShowAddModal(false); resetForm(); }} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg disabled:opacity-60">
              {isSubmitting ? 'Adding...' : 'Add Doctor'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Doctor Modal */}
      <Modal isOpen={showEditModal} onClose={() => { setShowEditModal(false); resetForm(); }} title="Edit Doctor" size="md">
        <form onSubmit={handleUpdateDoctor} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Doctor Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleFormChange} required className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Hospital Name</label>
              <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleFormChange} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Department Name</label>
             
<select name="departmentId" value={formData.departmentId} onChange={handleFormChange}
  className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm">
  <option value="">Select Department</option>
  {departments.map((dept) => (
    <option key={dept.id} value={dept.id}>{dept.name}</option>
  ))}
</select>
              {/* <input type="number" name="departmentId" value={formData.departmentId} onChange={handleFormChange} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" /> */}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Phone Number *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '').slice(0,10)} required className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email Address *</label>
            <input type="email" name="email" value={formData.email} onChange={handleFormChange} required className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" />
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleFormChange} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">City</label>
              <input type="text" name="city" value={formData.city} onChange={handleFormChange} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Pincode</label>
              <input type="text" name="pincode" value={formData.pincode} onChange={handleFormChange} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">State</label>
              <input type="text" name="state" value={formData.state} onChange={handleFormChange} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Country</label>
              <input type="text" name="country" value={formData.country} onChange={handleFormChange} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm" />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => { setShowEditModal(false); resetForm(); }} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg disabled:opacity-60">
              {isSubmitting ? 'Updating...' : 'Update Doctor'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Doctor" size="sm">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="text-slate-700 font-semibold">Delete {selectedDoctor?.name}?</p>
            <p className="text-slate-500 text-sm mt-1">This action cannot be undone.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button onClick={handleDeleteDoctor} disabled={isSubmitting} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* View Doctor Modal */}
      <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Doctor Details" size="md">
        {selectedDoctor && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <Stethoscope className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">{selectedDoctor.name}</h3>
                <p className="text-emerald-600 font-medium">{selectedDoctor.department}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-600 mb-1">Hospital</p>
                <p className="font-semibold text-slate-800">{selectedDoctor.hospitalName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Department Name</p>
                <p className="font-semibold text-slate-800">{selectedDoctor.department || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Phone Number</p>
                <p className="font-semibold text-slate-800">{selectedDoctor.phone}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Email Address</p>
                <p className="font-semibold text-slate-800 text-sm">{selectedDoctor.email}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-slate-600 mb-1">Address</p>
                <p className="font-semibold text-slate-800">{selectedDoctor.address}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">City</p>
                <p className="font-semibold text-slate-800">{selectedDoctor.city}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Pincode</p>
                <p className="font-semibold text-slate-800">{selectedDoctor.pincode}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">State</p>
                <p className="font-semibold text-slate-800">{selectedDoctor.state}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Country</p>
                <p className="font-semibold text-slate-800">{selectedDoctor.country}</p>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <button onClick={() => { setShowViewModal(false); handleEditClick(selectedDoctor); }} className="flex-1 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-semibold hover:bg-emerald-100 transition-colors">
                Edit Doctor
              </button>
              <button onClick={() => setShowViewModal(false)} className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors">
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {showExportMenu && <div className="fixed inset-0 z-0" onClick={() => setShowExportMenu(false)} />}
    </div>
  );
}