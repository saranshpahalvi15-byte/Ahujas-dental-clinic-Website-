import React, { useState } from 'react';
import { useAuth, AUTHORIZED_ADMIN_EMAIL } from '../../context/AuthContext';
import { useClinic } from '../../context/ClinicContext';
import { Shield, Lock, LogIn, ArrowLeft, CheckCircle2, AlertTriangle, LogOut } from 'lucide-react';
import { NavigationPage } from '../../types';

interface AdminLoginProps {
  onNavigate: (page: NavigationPage) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onNavigate }) => {
  const { loginWithGoogle, logout, user, isAdmin, authError } = useAuth();
  const { settings } = useClinic();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await loginWithGoogle();
    } catch {
      // Handled in context
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200 shadow-lg space-y-6">
        
        <div>
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Website</span>
          </button>

          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center mb-3">
            <Shield className="w-6 h-6" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Staff & Admin Portal
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Restricted management access for {settings.name}.
          </p>
        </div>

        {authError && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
            {authError}
          </div>
        )}

        {user ? (
          isAdmin ? (
            <div className="space-y-4">
              <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-xs space-y-1 text-slate-800">
                <div className="flex items-center gap-1.5 font-bold text-teal-900">
                  <CheckCircle2 className="w-4 h-4 text-teal-700" />
                  <span>Authorized Administrator:</span>
                </div>
                <p className="text-slate-700 font-mono text-[11px]">{user.email}</p>
                <p className="text-teal-700 font-medium text-[10px]">✓ Full Admin Privileges Granted</p>
              </div>

              <button
                onClick={() => onNavigate('admin')}
                className="w-full py-3 px-4 bg-teal-800 hover:bg-teal-900 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                Enter Admin Dashboard
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs space-y-2 text-rose-900">
                <div className="flex items-center gap-2 font-bold text-rose-800">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Access Denied: Unauthorized Email</span>
                </div>
                <p className="text-rose-800 leading-relaxed text-[11px]">
                  You are signed in as <strong className="font-mono">{user.email}</strong>. Admin panel access is strictly restricted to <strong className="font-mono">{AUTHORIZED_ADMIN_EMAIL}</strong>. No other email addresses are permitted.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={handleLogout}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-rose-700 hover:bg-rose-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out & Switch Account</span>
                </button>

                <button
                  onClick={() => onNavigate('home')}
                  className="w-full py-2.5 px-4 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 font-medium text-xs rounded-xl transition-colors cursor-pointer text-center"
                >
                  Return to Public Website
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Lock className="w-4 h-4 text-teal-700" />
                <span>Single-Admin Authentication</span>
              </div>
              <p className="leading-relaxed">
                Admin access is exclusive to <strong>{AUTHORIZED_ADMIN_EMAIL}</strong>. Any other email will be denied access to clinic records.
              </p>
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-4 bg-teal-800 hover:bg-teal-900 active:bg-teal-950 text-white font-semibold text-sm rounded-xl transition-all shadow-sm disabled:opacity-50 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>{isLoggingIn ? 'Connecting...' : 'Sign in with Google'}</span>
            </button>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 text-center text-[11px] text-slate-400">
          Ahuja's Dental Clinic · Sector 10 Market, Ambala
        </div>

      </div>
    </div>
  );
};
