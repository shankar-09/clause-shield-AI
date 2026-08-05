import React from "react";
import { Cpu, Zap, Database, Sparkles, ArrowRight } from "lucide-react";
import { TelemetryData } from "../types";

interface HybridTelemetryProps {
  telemetry?: TelemetryData;
}

export const HybridTelemetry: React.FC<HybridTelemetryProps> = ({ telemetry }) => {
  const data = telemetry || {
    modelUsed: "SaulLM-7B (Local Primary)",
    routingReason: "Standard clause extraction executed via primary legal model for zero API cost.",
    promptCacheHit: true,
    estimatedTokensSaved: 1420,
    processingTimeMs: 320,
    tokensAnalyzed: 850,
  };

  return (
    <div className="bg-white rounded-2xl border border-sky-100 shadow-xl p-5 sm:p-6 space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-sky-100">
        <div className="p-3 bg-gradient-to-tr from-sky-500 to-teal-400 text-white rounded-xl shadow-md">
          <Cpu className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900 flex flex-wrap items-center gap-2">
            Hybrid LLM Routing Engine
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 text-sky-900 border border-sky-200">
              Prompt Caching Active
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Routes simple queries to local SaulLM-7B and complex legal reasoning to Claude 3.5 Sonnet with Anthropic Prompt Caching.
          </p>
        </div>
      </div>

      {/* Model Cards Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Primary Model Card */}
        <div className="border border-sky-200 rounded-xl p-4 bg-sky-50/50 space-y-3 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-sky-100 text-sky-900 border border-sky-200 uppercase">
              Primary Local LLM
            </span>
            <span className="text-xs text-teal-700 font-bold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-teal-600" /> 0ms API Latency
            </span>
          </div>

          <h3 className="text-sm font-bold text-slate-900">SaulLM-7B (Legal Specialized)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Open-source 7B parameter legal LLM fine-tuned on statutes and case law. Used for initial clause parsing and standard contract summaries.
          </p>

          <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500 border-t border-sky-200">
            <span>Cost per 1M tokens: <strong className="text-slate-900">$0.00</strong></span>
            <span className="font-semibold text-sky-800">Local Container Execution</span>
          </div>
        </div>

        {/* Fallback Model Card */}
        <div className="border border-teal-200 rounded-xl p-4 bg-teal-50/50 space-y-3 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-teal-100 text-teal-900 border border-teal-200 uppercase">
              Fallback Reasoning LLM
            </span>
            <span className="text-xs text-sky-800 font-bold flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-sky-600" /> Prompt Cache (88% Off)
            </span>
          </div>

          <h3 className="text-sm font-bold text-slate-900">Anthropic Claude 3.5 Sonnet</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Triggered automatically for multi-document reasoning, high liability caps (&gt;$1M), or ambiguous clauses. Implements Anthropic Ephemeral Prompt Caching.
          </p>

          <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500 border-t border-teal-200">
            <span>Cached Read Cost: <strong className="text-slate-900">$0.30 / 1M</strong></span>
            <span className="font-semibold text-teal-800">5-Min Ephemeral Cache TTL</span>
          </div>
        </div>
      </div>

      {/* Execution Telemetry Status */}
      <div className="bg-slate-900 text-sky-100 p-4 rounded-xl space-y-3 font-mono text-xs border border-slate-800 shadow-inner">
        <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
          <span className="font-bold text-cyan-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-300" /> Live Query Routing Telemetry
          </span>
          <span className="text-white font-mono">Latency: {data.processingTimeMs}ms</span>
        </div>

        <div className="space-y-2 text-slate-300">
          <div className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Active Model Selected:</strong> <span className="text-cyan-300">{data.modelUsed}</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Routing Decision Logic:</strong> <span className="text-slate-300">{data.routingReason}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400">Tokens Evaluated</div>
              <div className="text-base font-bold text-white font-mono">{data.tokensAnalyzed}</div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400">Tokens Saved via Cache</div>
              <div className="text-base font-bold text-cyan-300 font-mono">+{data.estimatedTokensSaved}</div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center col-span-2 sm:col-span-1">
              <div className="text-[10px] text-slate-400">Prompt Caching Status</div>
              <div className="text-base font-bold text-teal-300 font-mono">
                {data.promptCacheHit ? "CACHE HIT (88% Saved)" : "CACHE MISS"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

