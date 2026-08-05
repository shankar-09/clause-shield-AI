import React, { useState, useEffect } from "react";
import {
  Scale,
  ShieldCheck,
  FileText,
  Upload,
  Sparkles,
  RefreshCw,
  Search,
  Filter,
  Info,
  X,
  Building2,
  Briefcase,
  UserCheck,
  FileLock,
  FileCode,
  Code2,
  DollarSign,
  Home,
  ShieldAlert,
  ArrowRight,
  FolderOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { SAMPLE_CONTRACTS } from "./data/sampleContracts";
import { ContractAnalysisResult, ContractClause } from "./types";
import { DisclaimerBanner } from "./components/DisclaimerBanner";
import { DisclaimerModal } from "./components/DisclaimerModal";
import { ClauseCard } from "./components/ClauseCard";
import { PIIVisualizer } from "./components/PIIVisualizer";

export default function App() {
  const [selectedSampleId, setSelectedSampleId] = useState<string>("residential-lease");
  const [contractText, setContractText] = useState<string>(SAMPLE_CONTRACTS[0].text);
  const [documentType, setDocumentType] = useState<string>(SAMPLE_CONTRACTS[0].title);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<ContractAnalysisResult | null>(null);
  
  const [activeTab, setActiveTab] = useState<"analysis" | "privacy">("analysis");
  const [riskFilter, setRiskFilter] = useState<string>("ALL");
  const [clauseSearchQuery, setClauseSearchQuery] = useState<string>("");
  
  // Sample contracts search & category filters
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [sampleSearchQuery, setSampleSearchQuery] = useState<string>("");

  // Collapsible view controls for efficient page scrolling
  const [isSamplesCollapsed, setIsSamplesCollapsed] = useState<boolean>(false);
  const [isTextAreaCollapsed, setIsTextAreaCollapsed] = useState<boolean>(false);
  const [forceExpandAll, setForceExpandAll] = useState<boolean | undefined>(undefined);

  // Disclaimer banner dismiss state
  const [disclaimerDismissed, setDisclaimerDismissed] = useState<boolean>(() => {
    return localStorage.getItem("disclaimer_banner_dismissed") === "true";
  });

  const [showComplianceModal, setShowComplianceModal] = useState<boolean>(false);
  const [, setHasAcceptedTerms] = useState<boolean>(false);

  // Auto-accept compliance on first launch or let user view modal
  useEffect(() => {
    const saved = localStorage.getItem("legal_assistant_accepted_terms");
    if (!saved) {
      setShowComplianceModal(true);
    } else {
      setHasAcceptedTerms(true);
    }
  }, []);

  const handleAcceptTerms = () => {
    localStorage.setItem("legal_assistant_accepted_terms", "true");
    setHasAcceptedTerms(true);
    setShowComplianceModal(false);
  };

  const handleDismissDisclaimer = () => {
    setDisclaimerDismissed(true);
    localStorage.setItem("disclaimer_banner_dismissed", "true");
  };

  // Handle selecting a pre-loaded sample contract
  const handleSelectSample = (id: string) => {
    const sample = SAMPLE_CONTRACTS.find((s) => s.id === id);
    if (sample) {
      setSelectedSampleId(sample.id);
      setContractText(sample.text);
      setDocumentType(sample.title);
      setAnalysisResult(null); // Reset analysis on contract switch
    }
  };

  // Handle file upload (txt or pdf text reading)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setDocumentType(file.name.replace(/\.[^/.]+$/, ""));
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setContractText(text);
        setSelectedSampleId("custom");
        setAnalysisResult(null);
      }
    };
    reader.readAsText(file);
  };

  // Execute Analysis Call
  const handleRunAnalysis = async () => {
    if (!contractText.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/analyze-contract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contractText,
          documentType,
        }),
      });

      const data = await res.json();
      setAnalysisResult(data);
      setActiveTab("analysis");
    } catch (err) {
      console.error("Analysis failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial trigger analysis on mount
  useEffect(() => {
    handleRunAnalysis();
  }, [selectedSampleId]);

  // Helper function to render matching category icons
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Home":
        return <Home className="w-4 h-4 text-sky-600" />;
      case "Building2":
        return <Building2 className="w-4 h-4 text-teal-600" />;
      case "Briefcase":
        return <Briefcase className="w-4 h-4 text-sky-700" />;
      case "UserCheck":
        return <UserCheck className="w-4 h-4 text-cyan-600" />;
      case "FileLock":
        return <FileLock className="w-4 h-4 text-amber-600" />;
      case "FileCode":
        return <FileCode className="w-4 h-4 text-teal-600" />;
      case "Code2":
        return <Code2 className="w-4 h-4 text-indigo-600" />;
      case "DollarSign":
        return <DollarSign className="w-4 h-4 text-emerald-600" />;
      default:
        return <FileText className="w-4 h-4 text-sky-600" />;
    }
  };

  // Calculate Contract Overall Health Score (0 - 100)
  const calculateContractHealth = () => {
    if (!analysisResult?.clauses.length) return { score: 100, label: "Unanalyzed", color: "text-slate-400", bg: "bg-sky-600" };
    const avgSeverity =
      analysisResult.clauses.reduce((acc, c) => acc + c.risk_severity_score, 0) /
      analysisResult.clauses.length;
    
    // Higher risk severity decreases health score
    const health = Math.max(10, Math.min(95, Math.round(100 - avgSeverity * 8.5)));
    
    if (health < 45) {
      return { score: health, label: "High Exposure & Predatory Terms", color: "text-red-400", bg: "bg-red-600" };
    } else if (health < 72) {
      return { score: health, label: "Moderate Financial & Legal Caution", color: "text-amber-400", bg: "bg-amber-500" };
    } else {
      return { score: health, label: "Favorable / Standard Terms", color: "text-teal-400", bg: "bg-teal-500" };
    }
  };

  const contractHealth = calculateContractHealth();

  // All distinct sample categories
  const categories = ["ALL", "Real Estate & Rent", "Employment & HR", "Tech & SaaS", "Corporate & IP", "Finance & Business"];

  // Filter sample contracts based on category and search query
  const filteredSamples = SAMPLE_CONTRACTS.filter((sample) => {
    const matchesCategory = selectedCategory === "ALL" || sample.category === selectedCategory;
    const q = sampleSearchQuery.toLowerCase().trim();
    const matchesSearch =
      q === "" ||
      sample.title.toLowerCase().includes(q) ||
      sample.category.toLowerCase().includes(q) ||
      sample.description.toLowerCase().includes(q) ||
      sample.text.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  // Filter analysis clauses by risk score & search query
  const filteredClauses = analysisResult?.clauses.filter((c: ContractClause) => {
    const q = clauseSearchQuery.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      c.clause_name.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.simple_explanation.toLowerCase().includes(q) ||
      c.original_text.toLowerCase().includes(q) ||
      c.actionable_recommendation.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (riskFilter === "HIGH_UNUSUAL") return c.is_unusual_flag || c.risk_severity_score >= 7;
    if (riskFilter === "CRITICAL") return c.risk_severity_score >= 9;
    if (riskFilter === "MODERATE") return c.risk_severity_score >= 4 && c.risk_severity_score <= 6;
    if (riskFilter === "STANDARD") return c.risk_severity_score <= 3;
    return true;
  }) || [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-sky-500 selection:text-white">
      {/* Compliance Terms Modal */}
      <DisclaimerModal isOpen={showComplianceModal} onAccept={handleAcceptTerms} />

      {/* Dismissible Mandatory Legal Disclaimer */}
      {!disclaimerDismissed && (
        <DisclaimerBanner
          onShowModal={() => setShowComplianceModal(true)}
          onDismiss={handleDismissDisclaimer}
        />
      )}

      {/* Top Navbar */}
      <header className="bg-slate-900 text-white border-b border-sky-900/60 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-sky-500 to-teal-400 text-white rounded-xl shadow-md">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight flex items-center gap-2 text-white">
                Legal Information Assistant
              </h1>
              <p className="text-xs text-sky-200/80 font-medium">
                Plain-English Contract Simplification & Risk Intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => setShowComplianceModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-200 border border-slate-700 font-medium transition cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Legal Terms</span>
            </button>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 text-teal-300 border border-slate-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-teal-400" /> Presidio Masking Active
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-950 text-cyan-300 border border-sky-800 font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-cyan-300" /> Gemini Powered
            </span>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-8">
        
        {/* HIGHLIGHTED & ENLARGED: Primary Upload & Contract Input Box */}
        <section className="relative bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 rounded-3xl border-2 border-sky-500/80 shadow-2xl p-6 sm:p-8 space-y-6 ring-4 ring-sky-500/20">
          
          {/* Prominent Header Badge */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-sky-800/80">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-black uppercase tracking-wider">
                <Upload className="w-3.5 h-3.5 text-cyan-300 animate-pulse" /> Primary Upload Area
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                Upload or Paste Your Legal Contract
              </h2>
              <p className="text-xs sm:text-sm text-sky-200/90 leading-relaxed max-w-2xl">
                Upload your document (.txt, .pdf) or paste contract text below. All names, addresses, SSNs, and phone numbers are automatically redacted using Microsoft Presidio before processing.
              </p>
            </div>

            {/* High Impact File Upload Button */}
            <div className="shrink-0">
              <label className="px-6 py-3.5 bg-gradient-to-r from-cyan-400 via-teal-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-cyan-400/25 transition flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0">
                <Upload className="w-5 h-5 text-slate-950" /> Choose Contract File (.txt / .pdf)
                <input type="file" accept=".txt,.pdf" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* Large Textarea Box */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between text-xs text-sky-200 font-semibold px-1 gap-2">
              <span className="text-white font-bold flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                Document Content: {documentType || "Custom Legal Text"} ({contractText.length} characters)
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsTextAreaCollapsed(!isTextAreaCollapsed)}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-[11px] font-bold rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                >
                  {isTextAreaCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                  <span>{isTextAreaCollapsed ? "Expand Text" : "Compact View"}</span>
                </button>
                <span className="text-teal-300 font-bold flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                  <ShieldCheck className="w-4 h-4 text-teal-400" /> PII Auto-Masking Active
                </span>
              </div>
            </div>

            <textarea
              value={contractText}
              onChange={(e) => {
                setContractText(e.target.value);
                setSelectedSampleId("custom");
              }}
              rows={isTextAreaCollapsed ? 3 : 8}
              className="w-full p-4 bg-slate-950/90 border border-sky-700/60 rounded-2xl text-xs sm:text-sm font-mono text-cyan-100 leading-relaxed focus:bg-slate-950 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 focus:outline-none transition shadow-inner placeholder-sky-300/40"
              placeholder="Paste custom agreement text here..."
            />
          </div>

          {/* Large Execution Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-slate-300 flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Click below to simplify clauses, score risk severity, and get negotiation tips.</span>
            </div>

            <button
              onClick={handleRunAnalysis}
              disabled={loading}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-sky-500 via-teal-400 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-cyan-400/20 transition flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-slate-950" />
                  Analyzing Contract Terms...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  Simplify & Flag High-Risk Terms
                </>
              )}
            </button>
          </div>
        </section>

        {/* SECTION 2: Preset Sample Agreements with Search & Category Filters */}
        <section className="bg-white rounded-3xl border border-sky-100 shadow-xl p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-sky-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-sky-800 uppercase tracking-wider">
                <FolderOpen className="w-4 h-4 text-sky-600" /> Test Drive Preset Legal Templates ({SAMPLE_CONTRACTS.length})
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                Explore Sample Agreements Across Categories
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Select or search pre-loaded legal agreements to test our risk engine.
              </p>
            </div>

            <button
              onClick={() => setIsSamplesCollapsed(!isSamplesCollapsed)}
              className="px-4 py-2 bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 text-xs font-extrabold rounded-xl flex items-center gap-2 transition cursor-pointer shrink-0 self-start sm:self-center shadow-xs"
            >
              {isSamplesCollapsed ? <ChevronDown className="w-4 h-4 text-sky-600" /> : <ChevronUp className="w-4 h-4 text-sky-600" />}
              <span>{isSamplesCollapsed ? "Show Sample Templates" : "Collapse Section"}</span>
            </button>
          </div>

          {!isSamplesCollapsed && (
            <div className="space-y-4">
              {/* Search & Category Filter */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Category Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-slate-900 text-cyan-300 shadow-md shadow-slate-900/10"
                          : "bg-slate-100 text-slate-700 hover:bg-sky-50 border border-slate-200"
                      }`}
                    >
                      {cat === "ALL" ? "All Categories" : cat}
                    </button>
                  ))}
                </div>

                {/* Sample Search Input */}
                <div className="relative min-w-[260px]">
                  <Search className="w-4 h-4 text-sky-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={sampleSearchQuery}
                    onChange={(e) => setSampleSearchQuery(e.target.value)}
                    placeholder="Search samples (e.g. NDA, Lease, SaaS)..."
                    className="w-full pl-10 pr-9 py-2 bg-slate-50 border border-sky-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-sky-500 focus:outline-none transition shadow-inner"
                  />
                  {sampleSearchQuery && (
                    <button
                      onClick={() => setSampleSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Sample Cards Grid */}
              {filteredSamples.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {filteredSamples.map((sample) => {
                    const isSelected = selectedSampleId === sample.id;
                    return (
                      <button
                        key={sample.id}
                        onClick={() => handleSelectSample(sample.id)}
                        className={`p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between group ${
                          isSelected
                            ? "bg-sky-50/90 border-sky-500 ring-2 ring-sky-400/40 shadow-md shadow-sky-100"
                            : "bg-slate-50/70 hover:bg-sky-50/50 border-slate-200 text-slate-800 hover:border-sky-300"
                        }`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="p-1.5 bg-white rounded-lg border border-sky-200 shadow-2xs">
                              {renderCategoryIcon(sample.iconName)}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-white text-sky-900 border border-sky-200 font-extrabold shadow-2xs">
                              {sample.category}
                            </span>
                          </div>

                          <h3 className="text-xs font-black text-slate-900 group-hover:text-sky-700 transition">
                            {sample.title}
                          </h3>

                          <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                            {sample.description}
                          </p>
                        </div>

                        <div className="mt-2.5 pt-2 border-t border-sky-100/80 flex items-center justify-between text-[11px] font-bold text-sky-700">
                          <span>{isSelected ? "Currently Loaded" : "Test Sample"}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-sky-600 transform group-hover:translate-x-1 transition" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-slate-50 p-6 rounded-2xl text-center space-y-1.5 border border-dashed border-slate-300">
                  <Search className="w-6 h-6 text-slate-400 mx-auto" />
                  <p className="text-xs font-bold text-slate-700">No matching sample contracts found</p>
                  <p className="text-[11px] text-slate-500">
                    Try clearing your search query or selecting "All Categories".
                  </p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Tab Navigation for Results */}
        <div className="flex items-center gap-2 border-b border-sky-200 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab("analysis")}
            className={`px-5 py-3 text-xs font-bold rounded-t-2xl transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === "analysis"
                ? "bg-white text-sky-950 border border-sky-200 border-b-white text-sky-700 font-black shadow-xs"
                : "text-slate-500 hover:text-slate-900 hover:bg-sky-50/60"
            }`}
          >
            <Scale className="w-4 h-4 text-sky-600" />
            Clause Risk Analysis ({analysisResult?.clauses.length || 0})
          </button>

          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-5 py-3 text-xs font-bold rounded-t-2xl transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === "privacy"
                ? "bg-white text-sky-950 border border-sky-200 border-b-white text-sky-700 font-black shadow-xs"
                : "text-slate-500 hover:text-slate-900 hover:bg-sky-50/60"
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            Privacy & PII Masking ({analysisResult?.piiEntities.length || 0})
          </button>
        </div>

        {/* Tab 1: Structured Clause Analysis */}
        {activeTab === "analysis" && (
          <div className="space-y-4">
            {/* Contract Health Score Banner */}
            {analysisResult && (
              <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-teal-950 border border-sky-800 text-white rounded-2xl p-5 sm:p-6 shadow-xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-cyan-300" /> Contract Fairness & Risk Gauge
                    </span>
                    <h3 className="text-lg font-extrabold flex items-center gap-2 text-white">
                      Overall Rating: <span className={contractHealth.color}>{contractHealth.label}</span>
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-900/90 px-4 py-2 rounded-xl border border-sky-800 shrink-0 shadow-inner">
                    <span className="text-xs text-sky-200 font-medium">Fairness Index:</span>
                    <span className="text-2xl font-black text-cyan-300 font-mono">{contractHealth.score}/100</span>
                  </div>
                </div>

                {/* Gauge Progress Bar */}
                <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden p-0.5 border border-sky-800">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${contractHealth.bg}`}
                    style={{ width: `${contractHealth.score}%` }}
                  />
                </div>
              </div>
            )}

            {/* Analysis Metrics */}
            {analysisResult && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white border border-sky-100 rounded-xl p-4 shadow-xs">
                  <span className="text-[11px] font-medium text-slate-500">Total Clauses Analyzed</span>
                  <div className="text-2xl font-black text-slate-900 font-mono mt-1">
                    {analysisResult.clauses.length}
                  </div>
                </div>

                <div className="bg-red-50/80 border border-red-200 rounded-xl p-4 shadow-xs">
                  <span className="text-[11px] font-medium text-red-700">Unusual / High Risk Flags</span>
                  <div className="text-2xl font-black text-red-700 font-mono mt-1">
                    {analysisResult.clauses.filter((c) => c.is_unusual_flag || c.risk_severity_score >= 7).length}
                  </div>
                </div>

                <div className="bg-teal-50/80 border border-teal-200 rounded-xl p-4 shadow-xs">
                  <span className="text-[11px] font-medium text-teal-800">PII Entities Masked</span>
                  <div className="text-2xl font-black text-teal-700 font-mono mt-1">
                    {analysisResult.piiEntities.length}
                  </div>
                </div>
              </div>
            )}

            {/* Search & Filter Controls for Clauses */}
            <div className="bg-white p-4 rounded-2xl border border-sky-100 space-y-3 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-sky-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={clauseSearchQuery}
                    onChange={(e) => setClauseSearchQuery(e.target.value)}
                    placeholder="Search identified clauses (e.g. rent, indemnity, IP, notice, termination)..."
                    className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-sky-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-sky-500 focus:outline-none transition shadow-inner"
                  />
                  {clauseSearchQuery && (
                    <button
                      onClick={() => setClauseSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-sky-900 shrink-0">
                  <Filter className="w-4 h-4 text-sky-600" /> Filter by Risk:
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-2 border-t border-sky-100">
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setRiskFilter("ALL")}
                    className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                      riskFilter === "ALL"
                        ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                        : "bg-slate-100 text-slate-700 hover:bg-sky-50 border border-slate-200"
                    }`}
                  >
                    All ({analysisResult?.clauses.length || 0})
                  </button>

                  <button
                    onClick={() => setRiskFilter("HIGH_UNUSUAL")}
                    className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                      riskFilter === "HIGH_UNUSUAL"
                        ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                        : "bg-red-50 text-red-800 hover:bg-red-100 border border-red-200"
                    }`}
                  >
                    ⚠️ High Risk (
                    {analysisResult?.clauses.filter((c) => c.is_unusual_flag || c.risk_severity_score >= 7).length || 0}
                    )
                  </button>

                  <button
                    onClick={() => setRiskFilter("CRITICAL")}
                    className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                      riskFilter === "CRITICAL"
                        ? "bg-red-900 text-white shadow-md"
                        : "bg-slate-100 text-slate-700 hover:bg-sky-50 border border-slate-200"
                    }`}
                  >
                    Critical (9-10)
                  </button>

                  <button
                    onClick={() => setRiskFilter("MODERATE")}
                    className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                      riskFilter === "MODERATE"
                        ? "bg-amber-600 text-white shadow-md"
                        : "bg-slate-100 text-slate-700 hover:bg-sky-50 border border-slate-200"
                    }`}
                  >
                    Moderate (4-6)
                  </button>

                  <button
                    onClick={() => setRiskFilter("STANDARD")}
                    className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                      riskFilter === "STANDARD"
                        ? "bg-teal-600 text-white shadow-md"
                        : "bg-slate-100 text-slate-700 hover:bg-sky-50 border border-slate-200"
                    }`}
                  >
                    Standard (1-3)
                  </button>
                </div>

                {/* Quick Toggle All Cards */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setForceExpandAll(true)}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 transition cursor-pointer"
                  >
                    Expand All
                  </button>
                  <button
                    onClick={() => setForceExpandAll(false)}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition cursor-pointer"
                  >
                    Collapse All
                  </button>
                </div>
              </div>
            </div>

            {/* Clauses List */}
            {filteredClauses.length > 0 ? (
              <div className="space-y-3.5">
                {filteredClauses.map((clause, idx) => (
                  <ClauseCard key={idx} clause={clause} index={idx} isForceExpanded={forceExpandAll} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-2xl border border-sky-100 text-center space-y-2 shadow-xs">
                <Info className="w-8 h-8 text-sky-500 mx-auto" />
                <h3 className="text-sm font-bold text-slate-900">No Clauses Match Filter</h3>
                <p className="text-xs text-slate-500">
                  Try switching the risk filter to "All" to view all evaluated contract terms.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Data Privacy Pipeline */}
        {activeTab === "privacy" && (
          <PIIVisualizer
            originalText={contractText}
            redactedText={analysisResult?.redactedText || "PII Redacted Text..."}
            entities={analysisResult?.piiEntities || []}
          />
        )}
      </main>

      {/* Footer with Owner Name Credit */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-6 border-t border-sky-900/60 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <p className="font-bold text-white text-sm">Legal Information Assistant</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Plain-English legal contract simplification and clause risk detection powered by Gemini.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowComplianceModal(true)}
                className="text-[11px] text-cyan-300 hover:text-white underline underline-offset-4 cursor-pointer transition"
              >
                Compliance Terms & Disclaimer
              </button>
            </div>
          </div>

          {/* Owner Credit Banner */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <p className="text-xs text-slate-300 font-medium">
              Created by <span className="font-extrabold text-cyan-300 tracking-wide">Shankar Janamoni</span>
            </p>
            <p className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} Legal Information Assistant. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
