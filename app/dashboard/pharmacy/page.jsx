'use client';

import { useState } from 'react';
import { Plus, Search, Download, Pill, Package, AlertTriangle, TrendingUp, Filter, Eye, Edit, ShoppingCart } from 'lucide-react';

export default function PharmacyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showExportMenu, setShowExportMenu] = useState(false);

  const medicines = [
    { 
      id: 'MED-001', 
      name: 'Paracetamol 500mg', 
      category: 'Painkiller', 
      stock: 450, 
      minStock: 100,
      price: 5.50, 
      expiry: '2025-06-15',
      manufacturer: 'PharmaCo',
      status: 'in-stock'
    },
    { 
      id: 'MED-002', 
      name: 'Amoxicillin 250mg', 
      category: 'Antibiotic', 
      stock: 180, 
      minStock: 150,
      price: 12.75, 
      expiry: '2025-03-20',
      manufacturer: 'MediGen',
      status: 'low-stock'
    },
    { 
      id: 'MED-003', 
      name: 'Metformin 500mg', 
      category: 'Diabetes', 
      stock: 320, 
      minStock: 200,
      price: 8.25, 
      expiry: '2025-08-10',
      manufacturer: 'HealthPharma',
      status: 'in-stock'
    },
    { 
      id: 'MED-004', 
      name: 'Omeprazole 20mg', 
      category: 'Antacid', 
      stock: 75, 
      minStock: 100,
      price: 15.00, 
      expiry: '2025-04-05',
      manufacturer: 'MediCure',
      status: 'low-stock'
    },
    { 
      id: 'MED-005', 
      name: 'Aspirin 75mg', 
      category: 'Blood Thinner', 
      stock: 25, 
      minStock: 100,
      price: 6.50, 
      expiry: '2024-12-30',
      manufacturer: 'PharmaCo',
      status: 'critical'
    },
    { 
      id: 'MED-006', 
      name: 'Ciprofloxacin 500mg', 
      category: 'Antibiotic', 
      stock: 200, 
      minStock: 150,
      price: 18.50, 
      expiry: '2025-07-22',
      manufacturer: 'HealthPharma',
      status: 'in-stock'
    },
    { 
      id: 'MED-007', 
      name: 'Cetirizine 10mg', 
      category: 'Antihistamine', 
      stock: 380, 
      minStock: 200,
      price: 4.25, 
      expiry: '2025-09-15',
      manufacturer: 'MediGen',
      status: 'in-stock'
    },
    { 
      id: 'MED-008', 
      name: 'Atorvastatin 20mg', 
      category: 'Cholesterol', 
      stock: 150, 
      minStock: 100,
      price: 22.00, 
      expiry: '2025-05-18',
      manufacturer: 'PharmaCo',
      status: 'in-stock'
    },
  ];

  const categories = ['all', 'Painkiller', 'Antibiotic', 'Diabetes', 'Antacid', 'Blood Thinner', 'Antihistamine', 'Cholesterol'];

  const filteredMedicines = medicines.filter(med => {
    const matchesSearch = 
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || med.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: medicines.length,
    inStock: medicines.filter(m => m.status === 'in-stock').length,
    lowStock: medicines.filter(m => m.status === 'low-stock').length,
    critical: medicines.filter(m => m.status === 'critical').length,
    totalValue: medicines.reduce((sum, m) => sum + (m.stock * m.price), 0)
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'in-stock': return 'bg-green-100 text-green-700';
      case 'low-stock': return 'bg-amber-100 text-amber-700';
      case 'critical': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStockIcon = (status) => {
    switch(status) {
      case 'in-stock': return <Package className="w-4 h-4" />;
      case 'low-stock': return <TrendingUp className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

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
              Add Medicine
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Total Medicines</p>
            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">In Stock</p>
            <p className="text-2xl font-bold text-green-600">{stats.inStock}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Low Stock</p>
            <p className="text-2xl font-bold text-amber-600">{stats.lowStock}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Critical</p>
            <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Total Value</p>
            <p className="text-2xl font-bold text-emerald-600">₹{stats.totalValue.toFixed(0)}</p>
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
              placeholder="Search by medicine name, ID, or manufacturer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-slate-700 font-medium cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
            
            <button className="px-6 py-3 rounded-xl font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all duration-300 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Medicines Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Medicine ID</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Name</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Category</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Stock</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Price (₹)</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Expiry</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-center font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMedicines.map((medicine) => (
                <tr key={medicine.id} className="hover:bg-emerald-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Pill className="w-4 h-4 text-emerald-600" />
                      <span className="font-medium text-slate-800">{medicine.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-800">{medicine.name}</p>
                    <p className="text-xs text-slate-500">{medicine.manufacturer}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                      {medicine.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800">{medicine.stock}</p>
                    <p className="text-xs text-slate-500">Min: {medicine.minStock}</p>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-700">
                    ₹{medicine.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {medicine.expiry}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 w-fit ${getStatusColor(medicine.status)}`}>
                      {getStockIcon(medicine.status)}
                      <span className="capitalize">{medicine.status.replace('-', ' ')}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors" title="Order">
                        <ShoppingCart className="w-4 h-4" />
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
      {filteredMedicines.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-slate-100 mt-6">
          <Pill className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">No medicines found</p>
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