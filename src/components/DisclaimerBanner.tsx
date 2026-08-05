import React from "react";
import { Scale, ShieldAlert, X } from "lucide-react";

interface DisclaimerBannerProps {
  onShowModal?: () => void;
  onDismiss?: () => void;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ onShowModal, onDismiss }) => {
  return (
    <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-teal-950 border-b border-sky-400/30 text-sky-100 px-4 py-2.5 sm:px-6 shadow-md relative z-40 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-1.5 bg-sky-500/20 text-cyan-300 border border-cyan-400/40 rounded-lg shrink-0 mt-0.5 sm:mt-0 shadow-xs">
            <ShieldAlert className="w-4 h-4 text-cyan-300" />
          </div>
          <div className="text-xs leading-relaxed text-slate-200">
            <strong className="font-bold text-white uppercase tracking-wider mr-2 inline-flex items-center gap-1 text-teal-300">
              <Scale className="w-3.5 h-3.5 inline text-teal-300" /> Mandatory Legal Disclaimer:
            </strong>
            This is an AI Legal Information Assistant, not a lawyer. Outputs do not constitute legal advice and may contain errors. Please consult a licensed attorney for official legal counsel.
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
          {onShowModal && (
            <button
              onClick={onShowModal}
              className="text-xs font-semibold text-cyan-300 hover:text-white underline underline-offset-4 cursor-pointer transition"
            >
              Compliance Terms
            </button>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              title="Dismiss Disclaimer"
              className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition cursor-pointer flex items-center gap-1 text-xs border border-transparent hover:border-slate-700"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Dismiss</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
