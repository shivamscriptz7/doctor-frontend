'use client';

import { useState, useMemo } from 'react';
import { Stethoscope, Plus, Search, Download, X, Edit, Trash2, Eye, FileText, Sheet, ChevronDown, Filter } from 'lucide-react';

// Modal Component
// function Modal({ isOpen, onClose, title, children, size = 'md' }) {
//   if (!isOpen) return null;

//   const sizeClasses = {
//     sm: 'max-w-md',
//     md: 'max-w-2xl',
//     lg: 'max-w-4xl',
//   };

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
//       <div className="flex min-h-full items-center justify-center p-4">
//         <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]}`} onClick={(e) => e.stopPropagation()}>
//           <div className="flex items-center justify-between p-6 border-b border-slate-200">
//             <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
//             <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
//               <X className="w-5 h-5 text-slate-600" />
//             </button>
//           </div>
//           <div className="p-6">{children}</div>
//         </div>
//       </div>
//     </div>
//   );
// }
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
export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Rajesh Kumar', specialty: 'Cardiologist', experience: '15 years', patients: 245, phone: '+91 98765 43210', email: 'rajesh.kumar@medicare.com', qualification: 'MBBS, MD', department: 'Cardiology' },
    { id: 2, name: 'Dr. Priya Sharma', specialty: 'Neurologist', experience: '12 years', patients: 198, phone: '+91 98765 43211', email: 'priya.sharma@medicare.com', qualification: 'MBBS, DM', department: 'Neurology' },
    { id: 3, name: 'Dr. Amit Patel', specialty: 'Orthopedic', experience: '10 years', patients: 312, phone: '+91 98765 43212', email: 'amit.patel@medicare.com', qualification: 'MBBS, MS', department: 'Orthopedics' },
    { id: 4, name: 'Dr. Sneha Verma', specialty: 'Pediatrician', experience: '8 years', patients: 289, phone: '+91 98765 43213', email: 'sneha.verma@medicare.com', qualification: 'MBBS, MD', department: 'Pediatrics' },
    { id: 5, name: 'Dr. Vikram Singh', specialty: 'General Surgeon', experience: '18 years', patients: 421, phone: '+91 98765 43214', email: 'vikram.singh@medicare.com', qualification: 'MBBS, MS', department: 'Surgery' },
    { id: 6, name: 'Dr. Anita Gupta', specialty: 'Dermatologist', experience: '9 years', patients: 267, phone: '+91 98765 43215', email: 'anita.gupta@medicare.com', qualification: 'MBBS, MD', department: 'Dermatology' },
    { id: 7, name: 'Dr. Rahul Mehta', specialty: 'Ophthalmologist', experience: '11 years', patients: 334, phone: '+91 98765 43216', email: 'rahul.mehta@medicare.com', qualification: 'MBBS, MS', department: 'Ophthalmology' },
    { id: 8, name: 'Dr. Neha Singh', specialty: 'ENT Specialist', experience: '7 years', patients: 201, phone: '+91 98765 43217', email: 'neha.singh@medicare.com', qualification: 'MBBS, MS', department: 'ENT' },
    { id: 9, name: 'Dr. Sanjay Rao', specialty: 'Psychiatrist', experience: '13 years', patients: 178, phone: '+91 98765 43218', email: 'sanjay.rao@medicare.com', qualification: 'MBBS, MD', department: 'Psychiatry' },
    { id: 10, name: 'Dr. Pooja Nair', specialty: 'Radiologist', experience: '6 years', patients: 156, phone: '+91 98765 43219', email: 'pooja.nair@medicare.com', qualification: 'MBBS, MD', department: 'Radiology' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    experience: '',
    phone: '',
    email: '',
    qualification: '',
    department: '',
  });

  const specialties = ['Cardiologist', 'Neurologist', 'Orthopedic', 'Pediatrician', 'General Surgeon', 'Dermatologist', 'Ophthalmologist', 'ENT Specialist', 'Psychiatrist', 'Radiologist'];

  // Handle form change
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add Doctor
  const handleAddDoctor = (e) => {
    e.preventDefault();
    const newDoctor = {
      id: doctors.length + 1,
      ...formData,
      patients: 0
    };
    setDoctors([...doctors, newDoctor]);
    setShowAddModal(false);
    resetForm();
  };

  // Edit Doctor
  const handleEditClick = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialty: doctor.specialty,
      experience: doctor.experience,
      phone: doctor.phone,
      email: doctor.email,
      qualification: doctor.qualification,
      department: doctor.department,
    });
    setShowEditModal(true);
  };

  const handleUpdateDoctor = (e) => {
    e.preventDefault();
    const updatedDoctors = doctors.map(d =>
      d.id === selectedDoctor.id
        ? { ...d, ...formData }
        : d
    );
    setDoctors(updatedDoctors);
    setShowEditModal(false);
    setSelectedDoctor(null);
    resetForm();
  };

  // Delete Doctor
  const handleDeleteClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDeleteModal(true);
  };

  const handleDeleteDoctor = () => {
    setDoctors(doctors.filter(d => d.id !== selectedDoctor.id));
    setShowDeleteModal(false);
    setSelectedDoctor(null);
  };

  // View Doctor
  const handleViewClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowViewModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      specialty: '',
      experience: '',
      phone: '',
      email: '',
      qualification: '',
      department: '',
    });
  };

  // Filter and Search
  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [doctors, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstItem, indexOfLastItem);

  // Export functions
  const exportToExcel = () => {
    const headers = ['ID', 'Name', 'Specialty', 'Experience', 'Patients', 'Phone', 'Email', 'Qualification', 'Department'];
    const csvData = [
      headers.join(','),
      ...filteredDoctors.map(d => 
        `${d.id},"${d.name}","${d.specialty}","${d.experience}",${d.patients},"${d.phone}","${d.email}","${d.qualification}","${d.department}"`
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
    const htmlContent = `<!DOCTYPE html><html><head><title>Doctors Report</title><style>body{font-family:Arial,sans-serif;margin:20px}h1{color:#059669;text-align:center}table{width:100%;border-collapse:collapse;margin-top:20px}th{background-color:#059669;color:white;padding:12px;text-align:left}td{padding:10px;border-bottom:1px solid #ddd}tr:hover{background-color:#f5f5f5}.header{text-align:center;margin-bottom:30px}</style></head><body><div class="header"><h1>MediCare Hospital - Doctors Report</h1><p>Generated on: ${new Date().toLocaleDateString('en-IN')}</p><p><strong>Total Doctors: ${filteredDoctors.length}</strong></p></div><table><thead><tr><th>Name</th><th>Specialty</th><th>Experience</th><th>Patients</th><th>Phone</th><th>Email</th></tr></thead><tbody>${filteredDoctors.map(d => `<tr><td>${d.name}</td><td>${d.specialty}</td><td>${d.experience}</td><td>${d.patients}</td><td>${d.phone}</td><td>${d.email}</td></tr>`).join('')}</tbody></table></body></html>`;
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

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Doctors</h1>
            <p className="text-slate-600">Manage all doctors in the hospital</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <button onClick={() => setShowExportMenu(!showExportMenu)} className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 flex items-center gap-2 text-slate-700 font-medium shadow-sm hover:shadow-md">
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
            <button onClick={() => setShowAddModal(true)} className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg">
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
            <p className="text-sm text-slate-600 mb-1">Specialties</p>
            <p className="text-2xl font-bold text-emerald-600">{new Set(doctors.map(d => d.specialty)).size}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Total Patients</p>
            <p className="text-2xl font-bold text-teal-600">{doctors.reduce((sum, d) => sum + d.patients, 0)}</p>
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
              placeholder="Search doctors by name, specialty or department..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
            />
          </div>
          <button className="px-6 py-3 rounded-xl font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all duration-300 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {currentDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white">
                <Stethoscope className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">{doctor.name}</h3>
                <p className="text-emerald-600 font-medium">{doctor.specialty}</p>
              </div>
            </div>
            <div className="space-y-2 text-slate-600 mb-4">
              <p><span className="font-semibold">Experience:</span> {doctor.experience}</p>
              <p><span className="font-semibold">Patients:</span> {doctor.patients}</p>
              <p className="text-sm truncate"><span className="font-semibold">Email:</span> {doctor.email}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleViewClick(doctor)} className="flex-1 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium flex items-center justify-center gap-1">
                <Eye className="w-4 h-4" />
                View
              </button>
              <button onClick={() => handleEditClick(doctor)} className="flex-1 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors font-medium flex items-center justify-center gap-1">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button onClick={() => handleDeleteClick(doctor)} className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing <span className="font-semibold text-slate-800">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-semibold text-slate-800">{Math.min(indexOfLastItem, filteredDoctors.length)}</span> of{' '}
              <span className="font-semibold text-slate-800">{filteredDoctors.length}</span> results
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
                Previous
              </button>
              <div className="flex items-center gap-1">
                {getPageNumbers().map((pageNum, index) => (
                  pageNum === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-3 py-2 text-slate-400">...</span>
                  ) : (
                    <button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === pageNum ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
                      {pageNum}
                    </button>
                  )
                ))}
              </div>
              <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Doctor Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Doctor" size="md">
        <form onSubmit={handleAddDoctor} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Doctor Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="Dr. Full Name" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Specialty *</label>
              <select name="specialty" value={formData.specialty} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700">
                <option value="">Select specialty</option>
                {specialties.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Experience *</label>
              <input type="text" name="experience" value={formData.experience} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="10 years" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="+91 XXXXXXXXXX" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
            <input type="email" name="email" value={formData.email} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="doctor@medicare.com" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Qualification *</label>
              <input type="text" name="qualification" value={formData.qualification} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="MBBS, MD" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Department *</label>
              <input type="text" name="department" value={formData.department} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" placeholder="Department name" />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">
              Cancel
            </button>
            <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg">
              Add Doctor
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Doctor Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Doctor" size="md">
        <form onSubmit={handleUpdateDoctor} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Doctor Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Specialty *</label>
              <select name="specialty" value={formData.specialty} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700">
                <option value="">Select specialty</option>
                {specialties.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Experience *</label>
              <input type="text" name="experience" value={formData.experience} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
            <input type="email" name="email" value={formData.email} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Qualification *</label>
              <input type="text" name="qualification" value={formData.qualification} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Department *</label>
              <input type="text" name="department" value={formData.department} onChange={handleFormChange} required className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700" />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">
              Cancel
            </button>
            <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg">
              Update Doctor
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Doctor" size="sm">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Are you sure?</h3>
          <p className="text-sm text-slate-600 mb-6">
            Do you really want to delete <span className="font-semibold">{selectedDoctor?.name}</span>? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">
              Cancel
            </button>
            <button onClick={handleDeleteDoctor} className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold">
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
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                <Stethoscope className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">{selectedDoctor.name}</h3>
                <p className="text-emerald-600 font-medium">{selectedDoctor.specialty}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-600 mb-1">Experience</p>
                <p className="font-semibold text-slate-800">{selectedDoctor.experience}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Patients</p>
                <p className="font-semibold text-slate-800">{selectedDoctor.patients}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Phone Number</p>
                <p className="font-semibold text-slate-800">{selectedDoctor.phone}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Email Address</p>
                <p className="font-semibold text-slate-800">{selectedDoctor.email}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Qualification</p>
                <p className="font-semibold text-slate-800">{selectedDoctor.qualification}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Department</p>
                <p className="font-semibold text-slate-800">{selectedDoctor.department}</p>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <button onClick={() => { setShowViewModal(false); handleEditClick(selectedDoctor); }} className="flex-1 px-6 py-3 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors font-semibold">
                Edit Doctor
              </button>
              <button onClick={() => setShowViewModal(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">
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