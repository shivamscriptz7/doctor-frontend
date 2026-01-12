'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Activity, 
  Calendar, 
  Users, 
  FileText, 
  Pill, 
  Stethoscope,
  BedDouble,
  DollarSign,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  Bell,
  LogOut
} from 'lucide-react';

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity, badge: null, path: '/dashboard' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, badge: '12', path: '/dashboard/appointments' },
    { id: 'patients', label: 'Patients', icon: Users, badge: null, path: '/dashboard/patients' },
    { id: 'doctors', label: 'Doctors', icon: Stethoscope, badge: null, path: '/dashboard/doctors' },
    { id: 'departments', label: 'Departments', icon: FileText, badge: null, path: '/dashboard/departments' },
    { id: 'pharmacy', label: 'Pharmacy', icon: Pill, badge: '3', path: '/dashboard/pharmacy' },
    { id: 'beds', label: 'Bed Management', icon: BedDouble, badge: null, path: '/dashboard/beds' },
    { id: 'billing', label: 'Billing', icon: DollarSign, badge: null, path: '/dashboard/billing' },
  ];

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar - Always Visible */}
      <aside
        className={`relative bg-gradient-to-b from-emerald-600 to-teal-700 text-white transition-all duration-500 ease-out flex flex-col shadow-2xl ${
          isCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-emerald-500/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="relative flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
              <Activity className="w-6 h-6 text-emerald-600" strokeWidth={2.5} />
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <h1 className="font-bold text-xl tracking-tight">MediCare</h1>
                <p className="text-xs text-emerald-100">Hospital System</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="px-4 py-4">
            <button className="w-full bg-white hover:bg-emerald-50 text-emerald-700 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group">
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>New Patient</span>
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500/50 scrollbar-track-transparent">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-white text-emerald-700 shadow-lg'
                        : 'text-emerald-50 hover:bg-emerald-500/30 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-white rounded-xl animate-pulse" />
                    )}
                    <Icon
                      className={`relative w-5 h-5 transition-transform duration-300 ${
                        isActive ? 'scale-110' : 'group-hover:scale-110'
                      }`}
                      strokeWidth={2}
                    />
                    {!isCollapsed && (
                      <>
                        <span className="relative flex-1 text-left font-medium">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span
                            className={`relative px-2 py-0.5 text-xs font-bold rounded-full ${
                              isActive
                                ? 'bg-emerald-600 text-white'
                                : 'bg-white/20 text-white'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                    {isCollapsed && item.badge && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                        {item.badge}
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="p-3 border-t border-emerald-500/30 space-y-2">
          <button className="w-full group flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-50 hover:bg-emerald-500/30 hover:text-white transition-all duration-300">
            <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" strokeWidth={2} />
            {!isCollapsed && <span className="flex-1 text-left font-medium">Notifications</span>}
          </button>
          
          <button className="w-full group flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-50 hover:bg-emerald-500/30 hover:text-white transition-all duration-300">
            <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" strokeWidth={2} />
            {!isCollapsed && <span className="flex-1 text-left font-medium">Settings</span>}
          </button>

          <button className="w-full group flex items-center gap-3 px-4 py-3 rounded-xl text-red-100 hover:bg-red-500/30 hover:text-white transition-all duration-300">
            <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
            {!isCollapsed && <span className="flex-1 text-left font-medium">Logout</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-all duration-300 hover:scale-110 z-10"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </aside>

      {/* Main Content Area - Pages Render Here */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thumb-emerald-500\/50::-webkit-scrollbar-thumb {
          background-color: rgba(16, 185, 129, 0.5);
          border-radius: 3px;
        }

        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background-color: transparent;
        }
      `}</style>
    </div>
  );
}