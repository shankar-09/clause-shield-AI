import React, { useState } from "react";
import { AlertCircle, AlertTriangle, Info, CheckCircle2, ChevronDown, ChevronUp, Quote, Sparkles, Lightbulb, Copy, Check } from "lucide-react";
import { ContractClause } from "../types";

interface ClauseCardProps {
  clause: ContractClause;
  index: number;
  isForceExpanded?: boolean;
}

export const ClauseCard: React.FC<ClauseCardProps> = ({ clause, index, isForceExpanded }) => {
  const [expanded, setExpanded] = useState(index === 0);
  const [copied, setCopied] = useState(false);

  // Sync force expanded state if parent triggers expand/collapse all
  React.useEffect(() => {
    if (isForceExpanded !== undefined) {
      setExpanded(isForceExpanded);
    }
  }, [isForceExpanded]);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const snippet = `Clause: ${clause.clause_name}\nSummary: ${clause.simple_explanation}\nRecommendation: ${clause.actionable_recommendation}\nExcerpt: "${clause.original_text}"`;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Determine risk severity badge color and border styling
  const getRiskBadge = (score: number) => {
    if (score >= 9) {
      return {
        cardBorder: "border-red-300 hover:border-red-500 shadow-md",
        badge: "bg-red-600 text-white font-bold",
        icon: AlertCircle,
        riskLabel: "Critical Risk",
      };
    } else if (score >= 7) {
      return {
        cardBorder: "border-amber-300 hover:border-amber-500 shadow-md",
        badge: "bg-amber-600 text-white font-bold",
        icon: AlertTriangle,
        riskLabel: "High Concern",
      };
    } else if (score >= 4) {
      return {
        cardBorder: "border-sky-300 hover:border-sky-500 shadow-md",
        badge: "bg-sky-600 text-white font-bold",
        icon: Info,
        riskLabel: "Moderate Risk",
      };
    } else {
      return {
        cardBorder: "border-teal-200 hover:border-teal-400 shadow-md",
        badge: "bg-teal-600 text-white font-bold",
        icon: CheckCircle2,
        riskLabel: "Standard Clause",
      };
    }
  };

  const severityStyle = getRiskBadge(clause.risk_severity_score);

  return (
    <div className={`rounded-2xl border transition-all duration-200 bg-white text-slate-900 shadow-md overflow-hidden ${severityStyle.cardBorder}`}>
      {/* Clause Header */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none border-b border-sky-100 bg-sky-50/40 hover:bg-sky-50/80 transition"
      >
        <div className="flex items-start gap-3.5">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 text-white text-xs font-black shrink-0 mt-0.5 shadow-sm">
            #{index + 1}
          </span>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h3 className="text-base font-bold text-slate-900 tracking-tight">{clause.clause_name}</h3>
              
              {clause.is_unusual_flag && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-red-600 text-white shadow-xs">
                  <AlertTriangle className="w-3 h-3" /> Unusual Clause Flag
                </span>
              )}

              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-100 text-sky-900 border border-sky-200">
                {clause.category}
              </span>
            </div>

            <p className="text-xs text-slate-600 line-clamp-1">
              {clause.simple_explanation}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            title="Copy Clause Summary & Recommendation"
            className="p-1.5 bg-white hover:bg-sky-50 text-sky-800 rounded-xl border border-sky-200 text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5 text-sky-600" />}
            <span className="hidden sm:inline text-[11px] font-semibold">{copied ? "Copied" : "Copy"}</span>
          </button>

          {/* Risk Severity Score Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-sky-200 shadow-xs">
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Risk</span>
            <span className={`px-2 py-0.5 rounded-lg text-xs ${severityStyle.badge}`}>
              {clause.risk_severity_score} / 10
            </span>
          </div>

          <button className="p-1 text-slate-400 hover:text-slate-800 transition">
            {expanded ? <ChevronUp className="w-5 h-5 text-sky-600" /> : <ChevronDown className="w-5 h-5 text-sky-600" />}
          </button>
        </div>
      </div>

      {/* Expanded Clause Details */}
      {expanded && (
        <div className="p-4 sm:p-5 space-y-4 bg-white">
          {/* Plain-English Explanation */}
          <div className="bg-sky-50/80 border border-sky-200 rounded-xl p-4 flex items-start gap-3.5 shadow-xs">
            <Sparkles className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[11px] font-bold text-sky-900 uppercase tracking-wider mb-1">
                Plain-English Summary
              </h4>
              <p className="text-sm text-slate-800 leading-relaxed font-normal">
                {clause.simple_explanation}
              </p>
            </div>
          </div>

          {/* Actionable Negotiation Tip */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 flex items-start gap-3.5 shadow-xs">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-1">
                Actionable Negotiation Recommendation
              </h4>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                {clause.actionable_recommendation}
              </p>
            </div>
          </div>

          {/* Original Excerpt Quote */}
          <div className="bg-slate-50 border border-sky-200 rounded-xl p-4 text-xs font-mono leading-relaxed relative shadow-inner">
            <div className="flex items-center justify-between text-sky-800 font-sans font-semibold text-[11px] mb-2">
              <span className="flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5 text-sky-600" /> Exact Contract Quote:
              </span>
            </div>
            <p className="italic bg-white p-3 rounded-lg border border-sky-100 text-slate-800 leading-relaxed shadow-xs">
              "{clause.original_text}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

