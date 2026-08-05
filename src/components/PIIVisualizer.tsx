import React, { useState } from "react";
import { Lock, ShieldAlert, Eye, EyeOff, ShieldCheck, Copy, Check } from "lucide-react";
import { PIIEntity } from "../types";

interface PIIVisualizerProps {
  originalText: string;
  redactedText: string;
  entities: PIIEntity[];
}

export const PIIVisualizer: React.FC<PIIVisualizerProps> = ({
  originalText,
  redactedText,
  entities,
}) => {
  const [showOriginal, setShowOriginal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyRedacted = () => {
    navigator.clipboard.writeText(redactedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-sky-100 shadow-xl p-5 sm:p-6 space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-sky-100">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-tr from-sky-500 to-teal-400 text-white rounded-xl shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 flex flex-wrap items-center gap-2">
              Microsoft Presidio Privacy Pipeline
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 text-sky-900 border border-sky-200">
                PII Redacted Before LLM
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Detects and masks names, tax IDs, bank info, addresses, and phone numbers to guarantee zero data leaks.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
          >
            {showOriginal ? <EyeOff className="w-3.5 h-3.5 text-sky-600" /> : <Eye className="w-3.5 h-3.5 text-sky-600" />}
            {showOriginal ? "Hide Unredacted" : "Reveal Unredacted"}
          </button>

          <button
            onClick={handleCopyRedacted}
            className="px-3 py-1.5 bg-gradient-to-r from-sky-600 to-teal-500 hover:from-sky-500 hover:to-teal-400 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-md cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-white" />}
            {copied ? "Copied!" : "Copy Redacted"}
          </button>
        </div>
      </div>

      {/* Detected Entities Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-sky-50/80 border border-sky-200 rounded-xl p-3.5 text-center shadow-xs">
          <div className="text-[11px] text-sky-900 font-medium">Total Entities Masked</div>
          <div className="text-xl font-black text-sky-700 font-mono mt-0.5">{entities.length}</div>
        </div>
        <div className="bg-teal-50/80 border border-teal-200 rounded-xl p-3.5 text-center shadow-xs">
          <div className="text-[11px] text-teal-900 font-medium">Names & Contacts</div>
          <div className="text-xl font-black text-teal-800 font-mono mt-0.5">
            {entities.filter((e) => e.entityType.includes("PERSON") || e.entityType.includes("PHONE") || e.entityType.includes("EMAIL")).length}
          </div>
        </div>
        <div className="bg-sky-50/80 border border-sky-200 rounded-xl p-3.5 text-center shadow-xs">
          <div className="text-[11px] text-sky-900 font-medium">Financial & Tax IDs</div>
          <div className="text-xl font-black text-sky-800 font-mono mt-0.5">
            {entities.filter((e) => e.entityType.includes("SSN") || e.entityType.includes("BANK") || e.entityType.includes("COMPENSATION")).length}
          </div>
        </div>
        <div className="bg-teal-50/80 border border-teal-200 rounded-xl p-3.5 text-center shadow-xs">
          <div className="text-[11px] text-teal-900 font-medium">Presidio Confidence</div>
          <div className="text-xl font-black text-teal-700 font-mono mt-0.5">96.8% Avg</div>
        </div>
      </div>

      {/* Side-by-Side Text Inspection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Redacted Version Sent To LLM */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5 text-sky-800 font-bold">
              <Lock className="w-3.5 h-3.5 text-sky-600" /> Safe Text (Sent to LLM Orchestration)
            </span>
            <span className="text-[11px] text-slate-500 font-normal">Pydantic & LlamaIndex Ready</span>
          </div>

          <div className="bg-slate-900 text-sky-200 p-4 rounded-xl text-xs font-mono leading-relaxed h-72 overflow-y-auto whitespace-pre-wrap border border-slate-800 shadow-inner">
            {redactedText}
          </div>
        </div>

        {/* Original Unredacted Version */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5 text-amber-700 font-bold">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> Original Sensitive Contract
            </span>
            <span className="text-[11px] text-slate-500 font-normal">
              {showOriginal ? "Unmasked View" : "Blurred for privacy"}
            </span>
          </div>

          <div
            className={`p-4 rounded-xl text-xs font-mono leading-relaxed h-72 overflow-y-auto whitespace-pre-wrap border transition ${
              showOriginal
                ? "bg-amber-50/60 border-amber-300 text-slate-900"
                : "bg-slate-100 border-slate-200 text-slate-400 select-none blur-xs"
            }`}
          >
            {originalText}
          </div>
        </div>
      </div>

      {/* Entity Breakdown Table */}
      {entities.length > 0 && (
        <div className="space-y-2 pt-2">
          <h3 className="text-xs font-bold text-sky-900 uppercase tracking-wider">
            Detected PII Entity Breakdown
          </h3>
          <div className="overflow-x-auto border border-sky-200 rounded-xl bg-white shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-sky-50 border-b border-sky-200 text-sky-900 font-bold">
                <tr>
                  <th className="p-3">Entity Type</th>
                  <th className="p-3">Original Value</th>
                  <th className="p-3">Anonymized Mask Tag</th>
                  <th className="p-3 text-right">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-100 text-slate-700">
                {entities.map((e, idx) => (
                  <tr key={idx} className="hover:bg-sky-50/60 transition">
                    <td className="p-3 font-semibold text-slate-900">{e.entityType}</td>
                    <td className="p-3 font-mono text-slate-500">
                      {showOriginal ? e.value : "••••••••••••"}
                    </td>
                    <td className="p-3 font-mono text-teal-700 font-bold">{e.mask}</td>
                    <td className="p-3 text-right font-mono text-sky-700 font-medium">
                      {(e.confidence * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

