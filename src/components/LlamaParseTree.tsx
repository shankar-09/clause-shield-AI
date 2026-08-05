import React from "react";
import { FileText, Layers, List, Table, CornerDownRight } from "lucide-react";
import { LayoutNode } from "../types";

interface LlamaParseTreeProps {
  layoutNodes: LayoutNode[];
}

export const LlamaParseTree: React.FC<LlamaParseTreeProps> = ({ layoutNodes }) => {
  return (
    <div className="bg-white rounded-2xl border border-sky-100 shadow-xl p-5 sm:p-6 space-y-5 text-slate-900">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-sky-100">
        <div className="p-3 bg-gradient-to-tr from-sky-500 to-teal-400 text-white rounded-xl shadow-md">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900 flex flex-wrap items-center gap-2">
            Layout-Aware LlamaParse Structure
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 text-sky-900 border border-sky-200">
              PDF Hierarchy Preserved
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Extracts nested lists, financial tables, footnotes, and header trees without loss of document context.
          </p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-sky-50/80 border border-sky-200 p-3.5 rounded-xl flex items-center gap-3 shadow-xs">
          <List className="w-5 h-5 text-sky-600 shrink-0" />
          <div className="text-xs">
            <strong className="block font-bold text-slate-900">Nested Lists & Indents</strong>
            <span className="text-slate-600 text-[11px]">Sub-clauses remain parented</span>
          </div>
        </div>

        <div className="bg-teal-50/80 border border-teal-200 p-3.5 rounded-xl flex items-center gap-3 shadow-xs">
          <Table className="w-5 h-5 text-teal-600 shrink-0" />
          <div className="text-xs">
            <strong className="block font-bold text-slate-900">Markdown Table Matrices</strong>
            <span className="text-slate-600 text-[11px]">Payment schedules formatted</span>
          </div>
        </div>

        <div className="bg-sky-50/80 border border-sky-200 p-3.5 rounded-xl flex items-center gap-3 shadow-xs">
          <FileText className="w-5 h-5 text-sky-600 shrink-0" />
          <div className="text-xs">
            <strong className="block font-bold text-slate-900">Footnote Context Linkage</strong>
            <span className="text-slate-600 text-[11px]">Endnotes mapped to clauses</span>
          </div>
        </div>
      </div>

      {/* Node Hierarchy Tree Visualizer */}
      <div className="bg-slate-900 text-sky-200 rounded-xl p-4 font-mono text-xs space-y-3 border border-slate-800 shadow-inner">
        <div className="text-cyan-300 font-bold border-b border-slate-800 pb-2.5 flex items-center justify-between">
          <span>ROOT_DOCUMENT: [LlamaIndex Structured Markdown Chunking]</span>
          <span className="text-[10px] bg-teal-900/80 text-teal-200 px-2 py-0.5 rounded border border-teal-700">
            Parsing Status: 100% OK
          </span>
        </div>

        <div className="space-y-2 pt-1">
          {layoutNodes.map((node, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2 p-3 rounded-lg border transition ${
                node.level === 1
                  ? "bg-slate-800/90 border-sky-600/60 text-white font-bold"
                  : "bg-slate-950/80 border-slate-800 text-slate-300 pl-6"
              }`}
            >
              {node.level > 1 && <CornerDownRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-sky-950 text-cyan-300 border border-sky-800">
                    {node.type}
                  </span>
                  <span className="font-bold text-white">{node.title}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-2 text-[10px] text-slate-400 font-sans">
                  {node.containsPII && (
                    <span className="text-teal-200 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800">
                      ✓ Presidio PII Redacted
                    </span>
                  )}
                  {node.hasNestedList && (
                    <span className="text-cyan-200 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800">
                      ✓ Nested Bullet Hierarchy Extracted
                    </span>
                  )}
                  {node.containsFootnotes && (
                    <span className="text-amber-200 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                      ✓ Footnote Mapped
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

