// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Heart, Activity, Users, Shield, ArrowRight, Zap, Eye, EyeOff } from 'lucide-react';
// import { loginApi, signupApi } from '../lib/commonApis';

// // ─── Toast Utility ────────────────────────────────────────────
// type ToastType = 'success' | 'error' | 'warning';

// function showToast(type: ToastType, title: string, message: string) {
//   const containerId = 'toast-root';
//   let container = document.getElementById(containerId);
//   if (!container) {
//     container = document.createElement('div');
//     container.id = containerId;
//     container.style.cssText =
//       'position:fixed;top:20px;right:20px;z-index:99999;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
//     document.body.appendChild(container);
//   }

//   const colors = {
//     success: { bg: '#f0fdf4', border: '#bbf7d0', icon: '#16a34a', bar: '#22c55e' },
//     error:   { bg: '#fef2f2', border: '#fecaca', icon: '#dc2626', bar: '#ef4444' },
//     warning: { bg: '#fffbeb', border: '#fde68a', icon: '#d97706', bar: '#f59e0b' },
//   };
//   const c = colors[type];

//   const el = document.createElement('div');
//   el.style.cssText = `
//     pointer-events:all;
//     display:flex;align-items:flex-start;gap:12px;
//     padding:14px 16px;border-radius:14px;
//     background:${c.bg};border:1px solid ${c.border};
//     min-width:290px;max-width:350px;
//     position:relative;overflow:hidden;
//     opacity:0;transform:translateX(70px);
//     transition:opacity .3s ease,transform .3s ease;
//     box-shadow:0 4px 20px rgba(0,0,0,0.08);
//   `;

//   const iconMap = {
//     success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${c.icon}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
//     error:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${c.icon}" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
//     warning: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${c.icon}" stroke-width="2.5" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
//   };

//   el.innerHTML = `
//     <div style="margin-top:1px;flex-shrink:0">${iconMap[type]}</div>
//     <div style="flex:1;min-width:0">
//       <div style="font-size:13px;font-weight:600;color:#111827;margin-bottom:2px;font-family:'Plus Jakarta Sans',sans-serif">${title}</div>
//       <div style="font-size:12px;color:#6b7280;line-height:1.5;font-family:'Plus Jakarta Sans',sans-serif">${message}</div>
//     </div>
//     <button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;font-size:18px;color:#9ca3af;padding:0;line-height:1;flex-shrink:0">&times;</button>
//     <div style="position:absolute;bottom:0;left:0;height:3px;width:100%;background:${c.bar};transform-origin:left;animation:toastBar 3.5s linear forwards;border-radius:0 0 14px 14px"></div>
//   `;

//   if (!document.getElementById('toast-style')) {
//     const s = document.createElement('style');
//     s.id = 'toast-style';
//     s.textContent = `@keyframes toastBar{from{transform:scaleX(1)}to{transform:scaleX(0)}}`;
//     document.head.appendChild(s);
//   }

//   container.appendChild(el);
//   requestAnimationFrame(() => requestAnimationFrame(() => {
//     el.style.opacity = '1';
//     el.style.transform = 'translateX(0)';
//   }));
//   setTimeout(() => {
//     el.style.opacity = '0';
//     el.style.transform = 'translateX(70px)';
//     setTimeout(() => el.remove(), 350);
//   }, 3500);
// }
// // ──────────────────────────────────────────────────────────────

// // ─── Reusable Input ───────────────────────────────────────────
// function AuthInput({
//   label, type = 'text', name, value, onChange, placeholder, required = false,
// }: {
//   label: string; type?: string; name: string; value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   placeholder?: string; required?: boolean;
// }) {
//   return (
//     <div className="relative">
//       <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
//       <input
//         type={type} name={name} value={value}
//         onChange={onChange} placeholder={placeholder}
//         required={required} className="auth-input"
//       />
//     </div>
//   );
// }

// // ─── Password Input with Eye Toggle ──────────────────────────
// function PasswordInput({
//   label = 'Password', name = 'password', value, onChange, placeholder = '••••••••', required = false,
// }: {
//   label?: string; name?: string; value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   placeholder?: string; required?: boolean;
// }) {
//   const [show, setShow] = useState(false);

//   return (
//     <div className="relative">
//       <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
//       <div className="relative">
//         <input
//           type={show ? 'text' : 'password'}
//           name={name}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           required={required}
//           className="auth-input pr-12"
//         />
//         <button
//           type="button"
//           onClick={() => setShow(prev => !prev)}
//           className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors focus:outline-none"
//           tabIndex={-1}
//         >
//           {show
//             ? <EyeOff className="w-5 h-5" />
//             : <Eye className="w-5 h-5" />
//           }
//         </button>
//       </div>
//     </div>
//   );
// }
// // ──────────────────────────────────────────────────────────────

// // ✅ hospitalId → hospitalName rename kiya
// const EMPTY_FORM = { email: '', password: '', name: '', role: '', hospitalName: '',phone:'' };

// export default function HospitalAuth() {
//   const [isLogin, setIsLogin] = useState(true);
//   const router = useRouter();
//   const [formData, setFormData] = useState(EMPTY_FORM);
//   const [isRoleOpen, setIsRoleOpen] = useState(false);

//   const roles = [
//     { label: 'Doctor',        value: 'doctor'       },
//     { label: 'Nurse',         value: 'nurse'        },
//     { label: 'Administrator', value: 'admin'        },
//     { label: 'Receptionist',  value: 'receptionist' },
//     { label: 'Pharmacist',    value: 'pharmacist'   },
//   ];

//   const switchTab = (toLogin: boolean) => {
//     setIsLogin(toLogin);
//     setFormData(EMPTY_FORM);
//     setIsRoleOpen(false);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (isLogin) {
//         const res = await loginApi(formData.email, formData.password);
//         if (res.access_token) {
//           localStorage.setItem('access_token', res.access_token);
//           localStorage.setItem('user', JSON.stringify(res.user));
//           showToast('success', 'Login Successful', 'Welcome back! Redirecting to dashboard...');
//           setTimeout(() => router.push('/dashboard'), 1000);
//         } else {
//           showToast('error', 'Login Failed', res.message || 'Invalid credentials. Please try again.');
//         }
//       } else {
//         const res = await signupApi({
//           name:     formData.name,
//           email:        formData.email,
//           password:     formData.password,
//           role:         formData.role,
//           hospitalName: formData.hospitalName, // ✅ hospitalId → hospitalName
//           phone: formData.phone
          
//         });
//         if (res.success) {
//           showToast('success', 'Account Created', 'Signup successful! Please sign in.');
//           switchTab(true);
//         } else {
//           showToast('error', 'Signup Failed', res.message || 'Something went wrong.');
//         }
//       }
//     } catch (error) {
//       console.error('Authentication error:', error);
//       showToast('error', 'Server Error', 'Unable to connect. Please try again later.');
//     }
//   };

//   const currentYear = new Date().getFullYear();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">

//       {/* Animated blobs */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
//         <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
//         <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
//       </div>

//       {/* Cross pattern */}
//       <div className="absolute inset-0 opacity-5" style={{
//         backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 20v20M20 30h20' stroke='%2310b981' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
//         backgroundSize: '60px 60px',
//       }} />

//       {/* ── Main Card ── */}
//       <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden">

//         {/* Left Panel */}
//         <div className="lg:w-2/5 bg-gradient-to-br from-emerald-600 via-teal-600 to-teal-700 p-8 sm:p-12 text-white relative overflow-hidden">
//           <div className="absolute inset-0 opacity-10" style={{
//             backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
//             backgroundSize: '40px 40px',
//           }} />
//           <div className="relative z-10 h-full flex flex-col justify-between">
//             <div>
//               <div className="flex items-center mb-8 group">
//                 <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
//                   <Activity className="w-8 h-8 text-white" strokeWidth={2.5} />
//                 </div>
//                 <div>
//                   <h1 className="text-3xl font-bold tracking-tight">MediCare</h1>
//                   <p className="text-emerald-100 text-sm font-medium">Hospital Management</p>
//                 </div>
//               </div>
//               <div className="mt-8 lg:mt-12">
//                 <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
//                   Empowering Healthcare Professionals
//                 </h2>
//                 <p className="text-emerald-50 text-base lg:text-lg leading-relaxed opacity-90">
//                   Streamline patient care, manage records, and collaborate seamlessly with our comprehensive hospital management platform.
//                 </p>
//               </div>
//             </div>
//             <div className="space-y-4 mt-8 lg:mt-12">
//               {[
//                 { icon: Shield, title: 'Secure & Compliant',  desc: 'HIPAA compliant with end-to-end encryption' },
//                 { icon: Heart,  title: 'Patient-Centered',    desc: 'Designed to improve patient outcomes'       },
//                 { icon: Users,  title: 'Team Collaboration',  desc: 'Real-time updates across departments'       },
//               ].map(({ icon: Icon, title, desc }) => (
//                 <div key={title} className="flex items-start space-x-3 group">
//                   <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
//                     <Icon className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold mb-1">{title}</h3>
//                     <p className="text-emerald-100 text-sm opacity-90">{desc}</p>
//                   </div>
//                 </div>
//               ))}
//               <div className="hidden lg:flex items-center pt-6 mt-2 border-t border-white/20">
//                 <Zap className="w-3.5 h-3.5 text-emerald-200 mr-1.5 flex-shrink-0" />
//                 <span className="text-emerald-100 text-xs">
//                   Powered by <span className="font-semibold text-white">MediCare Tech Solutions</span>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="lg:w-3/5 p-8 sm:p-12 lg:p-16">
//           <div className="max-w-md mx-auto">

//             {/* Toggle */}
//             <div className="flex bg-slate-100 rounded-2xl p-1.5 mb-8">
//               <button type="button" onClick={() => switchTab(true)}
//                 className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
//                   isLogin ? 'bg-white text-emerald-600 shadow-md' : 'text-slate-600 hover:text-slate-900'
//                 }`}>
//                 Sign In
//               </button>
//               <button type="button" onClick={() => switchTab(false)}
//                 className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
//                   !isLogin ? 'bg-white text-emerald-600 shadow-md' : 'text-slate-600 hover:text-slate-900'
//                 }`}>
//                 Sign Up
//               </button>
//             </div>

//             <div className="mb-8">
//               <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
//                 {isLogin ? 'Welcome Back' : 'Create Account'}
//               </h2>
//               <p className="text-slate-600">
//                 {isLogin
//                   ? 'Enter your credentials to access your account'
//                   : 'Register to start managing healthcare operations'}
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-5">

//               {!isLogin && (
//                 <AuthInput label="Full Name" name="name" value={formData.name}
//                   onChange={handleChange} placeholder="Dr. John Smith" required />
//               )}

//               <AuthInput label="Email Address" type="email" name="email" value={formData.email}
//                 onChange={handleChange} placeholder="doctor@hospital.com" required />

//               {/* ✅ Eye button wala password field */}
//               <PasswordInput
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />

//               {!isLogin && (
//                 <>
//                   {/* Role dropdown */}
//                   <div className="relative">
//                     <label className="block text-sm font-semibold text-slate-700 mb-2">Role</label>
//                     <button
//                       type="button"
//                       onClick={() => setIsRoleOpen(!isRoleOpen)}
//                       onBlur={() => setTimeout(() => setIsRoleOpen(false), 150)}
//                       className="auth-input text-left flex items-center justify-between"
//                     >
//                       <span className={formData.role ? 'text-slate-900' : 'text-slate-400'}>
//                         {roles.find(r => r.value === formData.role)?.label || 'Select your role'}
//                       </span>
//                       <svg className={`w-4 h-4 text-emerald-600 transition-transform flex-shrink-0 ${isRoleOpen ? 'rotate-180' : ''}`}
//                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                       </svg>
//                     </button>
//                     {isRoleOpen && (
//                       <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
//                         {roles.map(role => (
//                           <div key={role.value}
//                             onMouseDown={() => {
//                               setFormData(prev => ({ ...prev, role: role.value }));
//                               setIsRoleOpen(false);
//                             }}
//                             className={`px-4 py-3 cursor-pointer transition-all ${
//                               formData.role === role.value
//                                 ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold'
//                                 : 'text-slate-700 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 hover:text-white'
//                             }`}>
//                             {role.label}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>

//                   {/* ✅ Hospital Name (was Hospital ID) */}
//                   <AuthInput
//                     label="Hospital Name"
//                     name="hospitalName"
//                     value={formData.hospitalName}
//                     onChange={handleChange}
//                     placeholder="e.g. City General Hospital"
//                     required
//                   />

//                     <AuthInput
//                     label="Phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="9876455445"
//                     required
//                   />
//                 </>
//               )}

//               {isLogin && (
//                 <div className="flex items-center justify-between text-sm">
//                   <label className="flex items-center cursor-pointer group gap-2">
//                     <input type="checkbox"
//                       className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-2 focus:ring-emerald-500 cursor-pointer" />
//                     <span className="text-slate-600 group-hover:text-slate-900">Remember me</span>
//                   </label>
//                   <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">Forgot password?</a>
//                 </div>
//               )}

//               <button type="submit"
//                 className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group">
//                 {isLogin ? 'Sign In' : 'Create Account'}
//                 <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </button>

//               {!isLogin && (
//                 <p className="text-center text-sm text-slate-600 mt-4">
//                   By signing up, you agree to our{' '}
//                   <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">Terms of Service</a>
//                   {' '}and{' '}
//                   <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">Privacy Policy</a>
//                 </p>
//               )}
//             </form>

//             {isLogin && (
//               <div className="mt-8 text-center">
//                 <p className="text-slate-600">
//                   Don't have an account?{' '}
//                   <button type="button" onClick={() => switchTab(false)}
//                     className="text-emerald-600 hover:text-emerald-700 font-semibold">
//                     Sign up here
//                   </button>
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ── Footer ── */}
//       <div className="relative z-10 w-full max-w-6xl mt-5 flex flex-col sm:flex-row items-center justify-between gap-2 px-2">
//         <p className="text-xs text-slate-500 text-center sm:text-left">
//           © {currentYear}{' '}
//           <span className="font-semibold text-slate-600">MediCare Hospital Management</span>.
//           {' '}All rights reserved.
//         </p>
//         <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-full px-3 py-1.5 shadow-sm">
//           <Zap className="w-3 h-3 text-emerald-500 flex-shrink-0" />
//           <span className="text-xs text-slate-500">
//             Powered by{' '}
//             <span className="font-semibold text-emerald-600">MediCare Tech Solutions</span>
//           </span>
//         </div>
//       </div>

//       {/* ── Global Styles ── */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

//         * { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

//         .auth-input {
//           width: 100%;
//           padding: 14px 16px;
//           background-color: #f8fafc;
//           border: 2px solid #10b981;
//           border-radius: 12px;
//           color: #0f172a;
//           font-size: 15px;
//           font-weight: 500;
//           outline: none;
//           transition: all 0.2s ease;
//         }
//         .auth-input::placeholder { color: #94a3b8; font-weight: 400; }
//         .auth-input:focus {
//           background-color: #ffffff;
//           border-color: #059669;
//           box-shadow: 0 0 0 4px rgba(16,185,129,0.15);
//         }
//         .auth-input:-webkit-autofill,
//         .auth-input:-webkit-autofill:hover,
//         .auth-input:-webkit-autofill:focus {
//           -webkit-box-shadow: 0 0 0px 1000px #f8fafc inset;
//           -webkit-text-fill-color: #0f172a;
//           transition: background-color 5000s ease-in-out 0s;
//         }

//         @keyframes blob {
//           0%, 100% { transform: translate(0,0) scale(1); }
//           25%       { transform: translate(20px,-50px) scale(1.1); }
//           50%       { transform: translate(-20px,20px) scale(0.9); }
//           75%       { transform: translate(50px,50px) scale(1.05); }
//         }
//         .animate-blob { animation: blob 20s infinite; }
//         .animation-delay-2000 { animation-delay: 2s; }
//         .animation-delay-4000 { animation-delay: 4s; }
//       `}</style>
//     </div>
//   );
// }


'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Activity, Users, Shield, ArrowRight, Zap, Eye, EyeOff } from 'lucide-react';
import { loginApi, signupApi } from '../lib/commonApis';

// ─── Toast Utility ────────────────────────────────────────────
type ToastType = 'success' | 'error' | 'warning';

function showToast(type: ToastType, title: string, message: string) {
  const containerId = 'toast-root';
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.style.cssText =
      'position:fixed;top:20px;right:20px;z-index:99999;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
    document.body.appendChild(container);
  }

  const colors = {
    success: { bg: '#f0fdf4', border: '#bbf7d0', icon: '#16a34a', bar: '#22c55e' },
    error:   { bg: '#fef2f2', border: '#fecaca', icon: '#dc2626', bar: '#ef4444' },
    warning: { bg: '#fffbeb', border: '#fde68a', icon: '#d97706', bar: '#f59e0b' },
  };
  const c = colors[type];

  const el = document.createElement('div');
  el.style.cssText = `
    pointer-events:all;
    display:flex;align-items:flex-start;gap:12px;
    padding:14px 16px;border-radius:14px;
    background:${c.bg};border:1px solid ${c.border};
    min-width:290px;max-width:350px;
    position:relative;overflow:hidden;
    opacity:0;transform:translateX(70px);
    transition:opacity .3s ease,transform .3s ease;
    box-shadow:0 4px 20px rgba(0,0,0,0.08);
  `;

  const iconMap = {
    success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${c.icon}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    error:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${c.icon}" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    warning: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${c.icon}" stroke-width="2.5" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  };

  el.innerHTML = `
    <div style="margin-top:1px;flex-shrink:0">${iconMap[type]}</div>
    <div style="flex:1;min-width:0">
      <div style="font-size:13px;font-weight:600;color:#111827;margin-bottom:2px;font-family:'Plus Jakarta Sans',sans-serif">${title}</div>
      <div style="font-size:12px;color:#6b7280;line-height:1.5;font-family:'Plus Jakarta Sans',sans-serif">${message}</div>
    </div>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;font-size:18px;color:#9ca3af;padding:0;line-height:1;flex-shrink:0">&times;</button>
    <div style="position:absolute;bottom:0;left:0;height:3px;width:100%;background:${c.bar};transform-origin:left;animation:toastBar 3.5s linear forwards;border-radius:0 0 14px 14px"></div>
  `;

  if (!document.getElementById('toast-style')) {
    const s = document.createElement('style');
    s.id = 'toast-style';
    s.textContent = `@keyframes toastBar{from{transform:scaleX(1)}to{transform:scaleX(0)}}`;
    document.head.appendChild(s);
  }

  container.appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateX(0)';
  }));
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(70px)';
    setTimeout(() => el.remove(), 350);
  }, 3500);
}
// ──────────────────────────────────────────────────────────────

// ─── Reusable Input ───────────────────────────────────────────
function AuthInput({
  label, type = 'text', name, value, onChange, placeholder, required = false,
}: {
  label: string; type?: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; required?: boolean;
}) {
  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
      <input
        type={type} name={name} value={value}
        onChange={onChange} placeholder={placeholder}
        required={required} className="auth-input"
      />
    </div>
  );
}

// ─── Phone Input — sirf numbers, max 10 digits ───────────────
function PhoneInput({
  value, onChange, required = false,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // sirf digits allow karo, max 10
    const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 10);
    // synthetic event banao taaki handleChange kaam kare
    const syntheticEvent = {
      ...e,
      target: { ...e.target, name: 'phone', value: onlyDigits },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
  };

  const isValid = value.length === 0 || value.length === 10;

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        Phone Number
      </label>
      <div className="relative flex items-center">
        {/* +91 prefix */}
        <div className="absolute left-0 flex items-center h-full px-4 border-r-2 border-emerald-300 pointer-events-none select-none">
          <span className="text-slate-500 font-medium text-sm">+91</span>
        </div>
        <input
          type="tel"
          name="phone"
          value={value}
          onChange={handlePhoneChange}
          placeholder="98765 43210"
          required={required}
          maxLength={10}
          inputMode="numeric"
          pattern="[0-9]{10}"
          className="auth-input pl-16"
          style={{ paddingLeft: '64px' }}
        />
        {/* character count */}
        {value.length > 0 && (
          <span className={`absolute right-3 text-xs font-medium ${
            value.length === 10 ? 'text-emerald-500' : 'text-slate-400'
          }`}>
            {value.length}/10
          </span>
        )}
      </div>
      {/* validation message */}
      {value.length > 0 && value.length < 10 && (
        <p className="mt-1.5 text-xs text-amber-500 font-medium">
          10 digit number daalo
        </p>
      )}
      {value.length === 10 && (
        <p className="mt-1.5 text-xs text-emerald-500 font-medium">✓ Valid number</p>
      )}
    </div>
  );
}

// ─── Password Input with Eye Toggle ──────────────────────────
function PasswordInput({
  label = 'Password', name = 'password', value, onChange, placeholder = '••••••••', required = false,
}: {
  label?: string; name?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; required?: boolean;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="auth-input pr-12"
        />
        <button
          type="button"
          onClick={() => setShow(prev => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors focus:outline-none"
          tabIndex={-1}
        >
          {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
// ──────────────────────────────────────────────────────────────

const EMPTY_FORM = {
  email: '', password: '', name: '', role: '', hospitalName: '', phone: '',
};

export default function HospitalAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isRoleOpen, setIsRoleOpen] = useState(false);

  const roles = [
    { label: 'Doctor',        value: 'doctor'       },
    { label: 'Nurse',         value: 'nurse'        },
    { label: 'Administrator', value: 'admin'        },
    { label: 'Receptionist',  value: 'receptionist' },
    { label: 'Pharmacist',    value: 'pharmacist'   },
  ];

  const switchTab = (toLogin: boolean) => {
    setIsLogin(toLogin);
    setFormData(EMPTY_FORM);
    setIsRoleOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Phone validation before submit
    if (!isLogin && formData.phone.length !== 10) {
      showToast('warning', 'Invalid Phone', '10 digit phone number daalo.');
      return;
    }

    try {
      if (isLogin) {
        const res = await loginApi(formData.email, formData.password);
        if (res.access_token) {
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('user', JSON.stringify(res.user));
          showToast('success', 'Login Successful', 'Welcome back! Redirecting to dashboard...');
          setTimeout(() => router.push('/dashboard'), 1000);
        } else {
          showToast('error', 'Login Failed', res.message || 'Invalid credentials. Please try again.');
        }
      } else {
        const res = await signupApi({
          name:     formData.name,
          email:        formData.email,
          password:     formData.password,
          role:         formData.role,
          hospitalName: formData.hospitalName,
          phone:        formData.phone,
        });
        console.log(res,'response');
        
        if (res.id) {
          showToast('success', 'Account Created', 'Signup successful! Please sign in.');
          switchTab(true);
        } else {
          showToast('error', 'Signup Failed', res.message || 'Something went wrong.');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      showToast('error', 'Server Error', 'Unable to connect. Please try again later.');
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">

      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      {/* Cross pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 20v20M20 30h20' stroke='%2310b981' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
      }} />

      {/* ── Main Card ── */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Left Panel */}
        <div className="lg:w-2/5 bg-gradient-to-br from-emerald-600 via-teal-600 to-teal-700 p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }} />
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-8 group">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Activity className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">MediCare</h1>
                  <p className="text-emerald-100 text-sm font-medium">Hospital Management</p>
                </div>
              </div>
              <div className="mt-8 lg:mt-12">
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
                  Empowering Healthcare Professionals
                </h2>
                <p className="text-emerald-50 text-base lg:text-lg leading-relaxed opacity-90">
                  Streamline patient care, manage records, and collaborate seamlessly with our comprehensive hospital management platform.
                </p>
              </div>
            </div>
            <div className="space-y-4 mt-8 lg:mt-12">
              {[
                { icon: Shield, title: 'Secure & Compliant',  desc: 'HIPAA compliant with end-to-end encryption' },
                { icon: Heart,  title: 'Patient-Centered',    desc: 'Designed to improve patient outcomes'       },
                { icon: Users,  title: 'Team Collaboration',  desc: 'Real-time updates across departments'       },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start space-x-3 group">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{title}</h3>
                    <p className="text-emerald-100 text-sm opacity-90">{desc}</p>
                  </div>
                </div>
              ))}
              <div className="hidden lg:flex items-center pt-6 mt-2 border-t border-white/20">
                <Zap className="w-3.5 h-3.5 text-emerald-200 mr-1.5 flex-shrink-0" />
                <span className="text-emerald-100 text-xs">
                  Powered by <span className="font-semibold text-white">MediCare Tech Solutions</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:w-3/5 p-8 sm:p-12 lg:p-16">
          <div className="max-w-md mx-auto">

            {/* Toggle */}
            <div className="flex bg-slate-100 rounded-2xl p-1.5 mb-8">
              <button type="button" onClick={() => switchTab(true)}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  isLogin ? 'bg-white text-emerald-600 shadow-md' : 'text-slate-600 hover:text-slate-900'
                }`}>
                Sign In
              </button>
              <button type="button" onClick={() => switchTab(false)}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  !isLogin ? 'bg-white text-emerald-600 shadow-md' : 'text-slate-600 hover:text-slate-900'
                }`}>
                Sign Up
              </button>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-slate-600">
                {isLogin
                  ? 'Enter your credentials to access your account'
                  : 'Register to start managing healthcare operations'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {!isLogin && (
                <AuthInput label="Full Name" name="name" value={formData.name}
                  onChange={handleChange} placeholder="Dr. John Smith" required />
              )}

              <AuthInput label="Email Address" type="email" name="email" value={formData.email}
                onChange={handleChange} placeholder="doctor@hospital.com" required />

              <PasswordInput value={formData.password} onChange={handleChange} required />

              {!isLogin && (
                <>
                  {/* Role dropdown */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Role</label>
                    <button
                      type="button"
                      onClick={() => setIsRoleOpen(!isRoleOpen)}
                      onBlur={() => setTimeout(() => setIsRoleOpen(false), 150)}
                      className="auth-input text-left flex items-center justify-between"
                    >
                      <span className={formData.role ? 'text-slate-900' : 'text-slate-400'}>
                        {roles.find(r => r.value === formData.role)?.label || 'Select your role'}
                      </span>
                      <svg className={`w-4 h-4 text-emerald-600 transition-transform flex-shrink-0 ${isRoleOpen ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isRoleOpen && (
                      <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                        {roles.map(role => (
                          <div key={role.value}
                            onMouseDown={() => {
                              setFormData(prev => ({ ...prev, role: role.value }));
                              setIsRoleOpen(false);
                            }}
                            className={`px-4 py-3 cursor-pointer transition-all ${
                              formData.role === role.value
                                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold'
                                : 'text-slate-700 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 hover:text-white'
                            }`}>
                            {role.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <AuthInput
                    label="Hospital Name"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleChange}
                    placeholder="e.g. City General Hospital"
                    required
                  />

                  {/* ✅ Phone field with +91, digits only, max 10, live counter */}
                  <PhoneInput
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </>
              )}

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center cursor-pointer group gap-2">
                    <input type="checkbox"
                      className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-2 focus:ring-emerald-500 cursor-pointer" />
                    <span className="text-slate-600 group-hover:text-slate-900">Remember me</span>
                  </label>
                  <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">Forgot password?</a>
                </div>
              )}

              <button type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group">
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {!isLogin && (
                <p className="text-center text-sm text-slate-600 mt-4">
                  By signing up, you agree to our{' '}
                  <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">Privacy Policy</a>
                </p>
              )}
            </form>

            {isLogin && (
              <div className="mt-8 text-center">
                <p className="text-slate-600">
                  Don't have an account?{' '}
                  <button type="button" onClick={() => switchTab(false)}
                    className="text-emerald-600 hover:text-emerald-700 font-semibold">
                    Sign up here
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="relative z-10 w-full max-w-6xl mt-5 flex flex-col sm:flex-row items-center justify-between gap-2 px-2">
        <p className="text-xs text-slate-500 text-center sm:text-left">
          © {currentYear}{' '}
          <span className="font-semibold text-slate-600">MediCare Hospital Management</span>.
          {' '}All rights reserved.
        </p>
        <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-full px-3 py-1.5 shadow-sm">
          <Zap className="w-3 h-3 text-emerald-500 flex-shrink-0" />
          <span className="text-xs text-slate-500">
            Powered by{' '}
            <span className="font-semibold text-emerald-600">MediCare Tech Solutions</span>
          </span>
        </div>
      </div>

      {/* ── Global Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        * { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

        .auth-input {
          width: 100%;
          padding: 14px 16px;
          background-color: #f8fafc;
          border: 2px solid #10b981;
          border-radius: 12px;
          color: #0f172a;
          font-size: 15px;
          font-weight: 500;
          outline: none;
          transition: all 0.2s ease;
        }
        .auth-input::placeholder { color: #94a3b8; font-weight: 400; }
        .auth-input:focus {
          background-color: #ffffff;
          border-color: #059669;
          box-shadow: 0 0 0 4px rgba(16,185,129,0.15);
        }
        .auth-input:-webkit-autofill,
        .auth-input:-webkit-autofill:hover,
        .auth-input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px #f8fafc inset;
          -webkit-text-fill-color: #0f172a;
          transition: background-color 5000s ease-in-out 0s;
        }

        @keyframes blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          25%       { transform: translate(20px,-50px) scale(1.1); }
          50%       { transform: translate(-20px,20px) scale(0.9); }
          75%       { transform: translate(50px,50px) scale(1.05); }
        }
        .animate-blob { animation: blob 20s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}