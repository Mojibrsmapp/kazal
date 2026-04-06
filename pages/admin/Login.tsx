import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Lock, User, Phone, Key, ArrowLeft, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetStep, setResetStep] = useState(1); // 1: username, 2: otp & new pass
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetPhone, setResetPhone] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/admin/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('admin', JSON.stringify(response.data.admin));
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await axios.post('/api/admin/reset-request', { username, phone: resetPhone });
      setResetStep(2);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send OTP. Check username and phone.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await axios.post('/api/admin/reset-verify', { username, code: otpCode, newPassword });
      setIsResetMode(false);
      setResetStep(1);
      setError('Password reset successful. Please login.');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Reset failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-8 bg-primary text-white text-center">
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-primary-light/80">Lutfur Rahman Kajal Portfolio</p>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {!isResetMode ? (
              <motion.form 
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleLogin} 
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Enter username"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Enter password"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className={`p-3 rounded-xl text-sm ${error.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {error}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Login'}
                </button>

                <button 
                  type="button"
                  onClick={() => { setIsResetMode(true); setError(''); }}
                  className="w-full text-sm text-slate-500 hover:text-primary transition-colors"
                >
                  Forgot Password?
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="reset"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <button 
                  onClick={() => { setIsResetMode(false); setResetStep(1); setError(''); }}
                  className="flex items-center text-sm text-slate-500 hover:text-primary transition-colors"
                >
                  <ArrowLeft size={16} className="mr-1" /> Back to Login
                </button>

                <h2 className="text-xl font-bold text-slate-800">Reset Password</h2>

                {resetStep === 1 ? (
                  <form onSubmit={handleResetRequest} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="text" 
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Enter your username"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="tel" 
                          value={resetPhone}
                          onChange={(e) => setResetPhone(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="017XXXXXXXX"
                          required
                        />
                      </div>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all flex items-center justify-center gap-2"
                    >
                      {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Send OTP'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleResetVerify} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">OTP Code</label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="text" 
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Enter 6-digit OTP"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="password" 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Enter new password"
                          required
                        />
                      </div>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all flex items-center justify-center gap-2"
                    >
                      {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Reset Password'}
                    </button>
                  </form>
                )}

                {error && (
                  <div className="p-3 bg-red-100 text-red-700 rounded-xl text-sm">
                    {error}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
