import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';

export const OpeningHoursCard: React.FC = () => {
  const { openingHours } = useClinic();

  // Find today's day name
  const dayNames: ('Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday')[] = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];
  const todayIndex = new Date().getDay();
  const currentDayName = dayNames[todayIndex];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-teal-50 text-teal-800">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Clinic Schedule</h3>
            <p className="text-xs text-slate-500">Sector 10, Ambala Timings</p>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Open Today</span>
          </span>
        </div>
      </div>

      <div className="space-y-2.5 text-xs sm:text-sm">
        {openingHours.map((schedule) => {
          const isToday = schedule.day === currentDayName;
          return (
            <div
              key={schedule.day}
              className={`p-2.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-1 transition-colors ${
                isToday ? 'bg-teal-50/80 border border-teal-200/80 font-medium text-slate-900' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-24 shrink-0 font-medium ${isToday ? 'text-teal-950 font-bold' : 'text-slate-800'}`}>
                  {schedule.day}
                  {isToday && <span className="ml-1 text-[10px] text-teal-700 font-normal">(Today)</span>}
                </span>
                {!schedule.isOpen ? (
                  <span className="text-rose-600 text-xs flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Closed</span>
                  </span>
                ) : (
                  <span className="text-xs text-slate-500 hidden sm:inline">
                    {schedule.note || ''}
                  </span>
                )}
              </div>

              {schedule.isOpen ? (
                <div className="text-xs sm:text-right text-slate-700 space-x-1">
                  <span>{schedule.morningSlot}</span>
                  {schedule.eveningSlot && (
                    <>
                      <span className="text-slate-400">·</span>
                      <span>{schedule.eveningSlot}</span>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-xs text-slate-400">Prior appointment only</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 text-center">
        * Timings may vary on national holidays. We encourage confirming your slot prior to your visit.
      </div>
    </div>
  );
};
