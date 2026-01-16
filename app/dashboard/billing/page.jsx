'use client';

import { useState } from 'react';
import { Plus, Search, Download, DollarSign, Eye, Printer, Send, Filter, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showExportMenu, setShowExportMenu] = useState(false);

  const invoices = [
    { 
      id: 'INV-2024-001', 
      patient: 'Rajesh Kumar', 
      date: '2024-01-10', 
      amount: 15750, 
      status: 'paid',
      paymentMethod: 'Card',
      services: ['Consultation', 'Lab Tests', 'Medicines']
    },
    { 
      id: 'INV-2024-002', 
      patient: 'Priya Sharma', 
      date: '2024-01-11', 
      amount: 8500, 
      status: 'pending',
      paymentMethod: '-',
      services: ['X-Ray', 'Consultation']
    },
    { 
      id: 'INV-2024-003', 
      patient: 'Amit Patel', 
      date: '2024-01-12', 
      amount: 42300, 
      status: 'paid',
      paymentMethod: 'Insurance',
      services: ['Surgery', 'Hospital Stay', 'Medicines']
    },
    { 
      id: 'INV-2024-004', 
      patient: 'Sneha Verma', 
      date: '2024-01-12', 
      amount: 6200, 
      status: 'overdue',
      paymentMethod: '-',
      services: ['Consultation', 'Medicines']
    },
    { 
      id: 'INV-2024-005', 
      patient: 'Vikram Singh', 
      date: '2024-01-13', 
      amount: 12800, 
      status: 'paid',
      paymentMethod: 'Cash',
      services: ['Emergency', 'CT Scan', 'Medicines']
    },
    { 
      id: 'INV-2024-006', 
      patient: 'Anita Gupta', 
      date: '2024-01-13', 
      amount: 9400, 
      status: 'pending',
      paymentMethod: '-',
      services: ['MRI', 'Consultation']
    },
    { 
      id: 'INV-2024-007', 
      patient: 'Rahul Mehta', 
      date: '2024-01-14', 
      amount: 18600, 
      status: 'paid',
      paymentMethod: 'Card',
      services: ['Surgery', 'Lab Tests', 'Hospital Stay']
    },
    { 
      id: 'INV-2024-008', 
      patient: 'Neha Singh', 
      date: '2024-01-14', 
      amount: 5300, 
      status: 'overdue',
      paymentMethod: '-',
      services: ['Consultation', 'Lab Tests']
    },
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.patient.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || invoice.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    paid: invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0),
    pending: invoices.filter(i => i.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0),
    overdue: invoices.filter(i => i.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0),
    count: {
      paid: invoices.filter(i => i.status === 'paid').length,
      pending: invoices.filter(i => i.status === 'pending').length,
      overdue: invoices.filter(i => i.status === 'overdue').length,
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'overdue': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Billing</h1>
            <p className="text-slate-600">Manage invoices and payments</p>
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
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 z-10">
                  <button className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors text-slate-700 rounded-t-xl">
                    Export to Excel
                  </button>
                  <button className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors text-slate-700 border-t rounded-b-xl">
                    Export to PDF
                  </button>
                </div>
              )}
            </div>

            <button className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl">
              <Plus className="w-5 h-5" />
              New Invoice
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-slate-800">₹{stats.total.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Paid ({stats.count.paid})</p>
            <p className="text-2xl font-bold text-green-600">₹{stats.paid.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Pending ({stats.count.pending})</p>
            <p className="text-2xl font-bold text-amber-600">₹{stats.pending.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Overdue ({stats.count.overdue})</p>
            <p className="text-2xl font-bold text-red-600">₹{stats.overdue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by invoice ID or patient name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700 font-medium cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
            
            <button className="px-6 py-3 rounded-xl font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all duration-300 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Invoice ID</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Patient</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Date</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Services</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Amount</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Payment</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-center font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-emerald-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold text-slate-800">{invoice.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                        {invoice.patient.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-800">{invoice.patient}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {invoice.services.slice(0, 2).map((service, idx) => (
                        <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                          {service}
                        </span>
                      ))}
                      {invoice.services.length > 2 && (
                        <span className="px-2 py-1 bg-slate-200 text-slate-600 rounded text-xs font-medium">
                          +{invoice.services.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-lg text-slate-800">
                      ₹{invoice.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      invoice.paymentMethod !== '-' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-400'
                    }`}>
                      {invoice.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 w-fit ${getStatusColor(invoice.status)}`}>
                      {getStatusIcon(invoice.status)}
                      <span className="capitalize">{invoice.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors" title="Print">
                        <Printer className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Send">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* No Results */}
      {filteredInvoices.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-slate-100 mt-6">
          <DollarSign className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">No invoices found</p>
          <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Click outside to close export menu */}
      {showExportMenu && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowExportMenu(false)}
        />
      )}
    </div>
  );
}