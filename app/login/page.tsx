// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const res = await fetch('/api/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     setLoading(false);

//     if (res.ok) {
//       router.push('/dashboard');
//     } else {
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded shadow w-96 space-y-4"
//       >
//         <h1 className="text-2xl font-bold text-center">Login</h1>

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border p-2 rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border p-2 rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white p-2 rounded"
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// }



'use client';
import { useState } from 'react';
import { Heart, Activity, Users, Shield, ArrowRight } from 'lucide-react';

export default function HospitalAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: 'doctor',
    hospitalId: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your authentication logic here
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Medical cross pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 20v20M20 30h20' stroke='%230891b2' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }}></div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Panel - Branding */}
        <div className="lg:w-2/5 bg-gradient-to-br from-cyan-600 via-blue-600 to-blue-700 p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-8 group">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Activity className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                    MediCare
                  </h1>
                  <p className="text-cyan-100 text-sm font-medium">Hospital Management</p>
                </div>
              </div>

              <div className="space-y-6 mt-12">
                <h2 className="text-4xl font-bold leading-tight mb-6" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  Empowering Healthcare Professionals
                </h2>
                <p className="text-cyan-50 text-lg leading-relaxed opacity-90">
                  Streamline patient care, manage records, and collaborate seamlessly with our comprehensive hospital management platform.
                </p>
              </div>
            </div>

            <div className="space-y-4 mt-12">
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Secure & Compliant</h3>
                  <p className="text-cyan-100 text-sm opacity-90">HIPAA compliant with end-to-end encryption</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Patient-Centered</h3>
                  <p className="text-cyan-100 text-sm opacity-90">Designed to improve patient outcomes</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Team Collaboration</h3>
                  <p className="text-cyan-100 text-sm opacity-90">Real-time updates across departments</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="lg:w-3/5 p-12 lg:p-16">
          <div className="max-w-md mx-auto">
            {/* Toggle Buttons */}
            <div className="flex bg-slate-100 rounded-2xl p-1.5 mb-8">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  isLogin
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  !isLogin
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                Sign Up
              </button>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
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
                <div className="relative">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Dr. John Smith"
                    className={`w-full px-4 py-3.5 bg-slate-50 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                      focusedField === 'fullName'
                        ? 'border-blue-500 bg-white shadow-lg shadow-blue-100'
                        : 'border-transparent hover:border-slate-200'
                    }`}
                    required
                  />
                </div>
              )}

              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="doctor@hospital.com"
                  className={`w-full px-4 py-3.5 bg-slate-50 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                    focusedField === 'email'
                      ? 'border-blue-500 bg-white shadow-lg shadow-blue-100'
                      : 'border-transparent hover:border-slate-200'
                  }`}
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3.5 bg-slate-50 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                    focusedField === 'password'
                      ? 'border-blue-500 bg-white shadow-lg shadow-blue-100'
                      : 'border-transparent hover:border-slate-200'
                  }`}
                  required
                />
              </div>

              {!isLogin && (
                <>
                  <div className="relative">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('role')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3.5 bg-slate-50 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                        focusedField === 'role'
                          ? 'border-blue-500 bg-white shadow-lg shadow-blue-100'
                          : 'border-transparent hover:border-slate-200'
                      }`}
                      required
                    >
                      <option value="doctor">Doctor</option>
                      <option value="nurse">Nurse</option>
                      <option value="admin">Administrator</option>
                      <option value="receptionist">Receptionist</option>
                      <option value="pharmacist">Pharmacist</option>
                    </select>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Hospital ID
                    </label>
                    <input
                      type="text"
                      name="hospitalId"
                      value={formData.hospitalId}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('hospitalId')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="HSP-12345"
                      className={`w-full px-4 py-3.5 bg-slate-50 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                        focusedField === 'hospitalId'
                          ? 'border-blue-500 bg-white shadow-lg shadow-blue-100'
                          : 'border-transparent hover:border-slate-200'
                      }`}
                      required
                    />
                  </div>
                </>
              )}

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="ml-2 text-slate-600 group-hover:text-slate-900">
                      Remember me
                    </span>
                  </label>
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {!isLogin && (
                <p className="text-center text-sm text-slate-600 mt-4">
                  By signing up, you agree to our{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    Privacy Policy
                  </a>
                </p>
              )}
            </form>

            {isLogin && (
              <div className="mt-8 text-center">
                <p className="text-slate-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Sign up here
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }

        .animate-blob {
          animation: blob 20s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        input:autofill,
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px #f8fafc inset;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
}
