'use client';

import { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Download, 
  Building2, 
  Users, 
  Phone,
  Mail,
  Edit,
  Trash2,
  Eye,
  Filter,
  FileText,
  Sheet
} from 'lucide-react';

export default function DepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  const departments = [
    { id: 1, name: 'Cardiology', head: 'Dr. Rajesh Kumar', staff: 15, patients: 45, phone: '+91 98765 43210', email: 'cardio@medicare.com', floor: '3rd Floor', status: 'active' },
    { id: 2, name: 'Neurology', head: 'Dr. Priya Sharma', staff: 12, patients: 38, phone: '+91 98765 43211', email: 'neuro@medicare.com', floor: '4th Floor', status: 'active' },
    { id: 3, name: 'Orthopedics', head: 'Dr. Amit Patel', staff: 18, patients: 52, phone: '+91 98765 43212', email: 'ortho@medicare.com', floor: '2nd Floor', status: 'active' },
    { id: 4, name: 'Pediatrics', head: 'Dr. Sneha Verma', staff: 20, patients: 67, phone: '+91 98765 43213', email: 'pediatrics@medicare.com', floor: '1st Floor', status: 'active' },
    { id: 5, name: 'Emergency', head: 'Dr. Vikram Singh', staff: 25, patients: 89, phone: '+91 98765 43214', email: 'emergency@medicare.com', floor: 'Ground Floor', status: 'active' },
    { id: 6, name: 'Radiology', head: 'Dr. Anita Gupta', staff: 10, patients: 34, phone: '+91 98765 43215', email: 'radiology@medicare.com', floor: 'Basement', status: 'active' },
    { id: 7, name: 'Dermatology', head: 'Dr. Suresh Reddy', staff: 8, patients: 28, phone: '+91 98765 43216', email: 'derma@medicare.com', floor: '2nd Floor', status: 'active' },
    { id: 8, name: 'Ophthalmology', head: 'Dr. Meera Iyer', staff: 11, patients: 41, phone: '+91 98765 43217', email: 'opthal@medicare.com', floor: '3rd Floor', status: 'active' },
    { id: 9, name: 'Gynecology', head: 'Dr. Kavita Nair', staff: 14, patients: 56, phone: '+91 98765 43218', email: 'gyno@medicare.com', floor: '4th Floor', status: 'active' },
    { id: 10, name: 'ENT', head: 'Dr. Arun Chopra', staff: 9, patients: 32, phone: '+91 98765 43219', email: 'ent@medicare.com', floor: '2nd Floor', status: 'active' },
    { id: 11, name: 'Psychiatry', head: 'Dr. Deepak Shah', staff: 7, patients: 24, phone: '+91 98765 43220', email: 'psych@medicare.com', floor: '5th Floor', status: 'active' },
    { id: 12, name: 'Urology', head: 'Dr. Ritu Desai', staff: 10, patients: 36, phone: '+91 98765 43221', email: 'uro@medicare.com', floor: '3rd Floor', status: 'active' },
    { id: 13, name: 'Nephrology', head: 'Dr. Manoj Pillai', staff: 13, patients: 44, phone: '+91 98765 43222', email: 'nephro@medicare.com', floor: '4th Floor', status: 'active' },
    { id: 14, name: 'Gastroenterology', head: 'Dr. Sunita Menon', staff: 16, patients: 58, phone: '+91 98765 43223', email: 'gastro@medicare.com', floor: '2nd Floor', status: 'active' },
    { id: 15, name: 'Oncology', head: 'Dr. Ajay Sinha', staff: 22, patients: 73, phone: '+91 98765 43224', email: 'onco@medicare.com', floor: '5th Floor', status: 'active' },
    { id: 16, name: 'Pulmonology', head: 'Dr. Preeti Joshi', staff: 12, patients: 39, phone: '+91 98765 43225', email: 'pulmo@medicare.com', floor: '3rd Floor', status: 'active' },
    { id: 17, name: 'Endocrinology', head: 'Dr. Sanjay Rao', staff: 9, patients: 31, phone: '+91 98765 43226', email: 'endo@medicare.com', floor: '4th Floor', status: 'active' },
    { id: 18, name: 'Rheumatology', head: 'Dr. Pooja Malhotra', staff: 8, patients: 27, phone: '+91 98765 43227', email: 'rheum@medicare.com', floor: '2nd Floor', status: 'active' },
  ];

  // Filter
  const filteredDepartments = useMemo(() => {
    return departments.filter(dept =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.floor.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDepartments = filteredDepartments.slice(indexOfFirstItem, indexOfLastItem);

  // Export to Excel
  const exportToExcel = () => {
    const headers = ['ID', 'Department', 'Head', 'Staff', 'Patients', 'Phone', 'Email', 'Floor', 'Status'];
    const csvData = [
      headers.join(','),
      ...filteredDepartments.map(d => 
        `${d.id},"${d.name}","${d.head}",${d.staff},${d.patients},"${d.phone}","${d.email}","${d.floor}","${d.status}"`
      )
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `departments_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportMenu(false);
  };

  // Export to PDF
  const exportToPDF = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Departments Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #059669; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background-color: #059669; color: white; padding: 12px; text-align: left; }
            td { padding: 10px; border-bottom: 1px solid #ddd; }
            tr:hover { background-color: #f5f5f5; }
            .header { text-align: center; margin-bottom: 30px; }
            .date { color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>MediCare Hospital - Departments Report</h1>
            <p class="date">Generated on: ${new Date().toLocaleDateString('en-IN')}</p>
            <p><strong>Total Departments: ${filteredDepartments.length}</strong></p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Department</th>
                <th>Head</th>
                <th>Staff</th>
                <th>Patients</th>
                <th>Floor</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              ${filteredDepartments.map(dept => `
                <tr>
                  <td><strong>${dept.name}</strong></td>
                  <td>${dept.head}</td>
                  <td>${dept.staff}</td>
                  <td>${dept.patients}</td>
                  <td>${dept.floor}</td>
                  <td>${dept.phone}</td>
                  <td>${dept.email}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      setShowExportMenu(false);
    }, 250);
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
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Departments</h1>
            <p className="text-slate-600">Manage hospital departments and staff</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <button 
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 flex items-center gap-2 text-slate-700 font-medium shadow-sm hover:shadow-md"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 z-10 overflow-hidden">
                  <button
                    onClick={exportToExcel}
                    className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors flex items-center gap-3 text-slate-700"
                  >
                    <Sheet className="w-4 h-4 text-green-600" />
                    <span className="font-medium">Export to Excel</span>
                  </button>
                  <button
                    onClick={exportToPDF}
                    className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors flex items-center gap-3 text-slate-700 border-t border-slate-100"
                  >
                    <FileText className="w-4 h-4 text-red-600" />
                    <span className="font-medium">Export to PDF</span>
                  </button>
                </div>
              )}
            </div>

            <button className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl">
              <Plus className="w-5 h-5" />
              Add Department
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Total Departments</p>
            <p className="text-2xl font-bold text-slate-800">{departments.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Total Staff</p>
            <p className="text-2xl font-bold text-emerald-600">
              {departments.reduce((sum, d) => sum + d.staff, 0)}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Active Patients</p>
            <p className="text-2xl font-bold text-teal-600">
              {departments.reduce((sum, d) => sum + d.patients, 0)}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Showing</p>
            <p className="text-2xl font-bold text-cyan-600">{currentDepartments.length}</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search departments by name, head, or floor..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
            />
          </div>
          <button className="px-6 py-3 rounded-xl font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all duration-300 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {currentDepartments.map((dept) => (
          <div 
            key={dept.id} 
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{dept.name}</h3>
                  <p className="text-sm text-slate-500">{dept.floor}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                {dept.status}
              </span>
            </div>

            <div className="mb-4 pb-4 border-b border-slate-100">
              <p className="text-sm text-slate-600 mb-1">Department Head</p>
              <p className="font-semibold text-slate-800">{dept.head}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 text-slate-600 mb-1">
                  <Users className="w-4 h-4" />
                  <p className="text-sm">Staff</p>
                </div>
                <p className="text-2xl font-bold text-emerald-600">{dept.staff}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-slate-600 mb-1">
                  <Users className="w-4 h-4" />
                  <p className="text-sm">Patients</p>
                </div>
                <p className="text-2xl font-bold text-teal-600">{dept.patients}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <Phone className="w-4 h-4" />
                <span>{dept.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <Mail className="w-4 h-4" />
                <span>{dept.email}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-slate-100">
              <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 font-medium text-sm">
                <Eye className="w-4 h-4" />
                View
              </button>
              <button className="flex-1 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2 font-medium text-sm">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button className="px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center">
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
              <span className="font-semibold text-slate-800">{Math.min(indexOfLastItem, filteredDepartments.length)}</span> of{' '}
              <span className="font-semibold text-slate-800">{filteredDepartments.length}</span> results
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentPage === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'
                }`}
              >
                Previous
              </button>

              <div className="flex items-center gap-1">
                {getPageNumbers().map((pageNum, index) => (
                  pageNum === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-3 py-2 text-slate-400">...</span>
                  ) : (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        currentPage === pageNum ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentPage === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {showExportMenu && (
        <div className="fixed inset-0 z-0" onClick={() => setShowExportMenu(false)} />
      )}
    </div>
  );
}