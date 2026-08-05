import React, { useState, useEffect } from "react";
import { FolderTree, FileCode, Download, Copy, Check, Terminal } from "lucide-react";
import JSZip from "jszip";

export const PythonCodeScaffold: React.FC = () => {
  const [pythonFiles, setPythonFiles] = useState<Record<string, string>>({});
  const [selectedFileName, setSelectedFileName] = useState<string>("app.py");
  const [copied, setCopied] = useState(false);
  const [zipping, setZipping] = useState(false);

  useEffect(() => {
    fetch("/api/python-scaffold")
      .then((res) => res.json())
      .then((data) => {
        setPythonFiles(data);
      })
      .catch((err) => console.error("Error fetching Python scaffold:", err));
  }, []);

  const handleCopyCode = () => {
    const code = pythonFiles[selectedFileName] || "";
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setZipping(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder("legal_information_assistant");

      Object.entries(pythonFiles).forEach(([fileName, content]) => {
        folder?.file(fileName, String(content));
      });

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "legal_information_assistant_python_scaffold.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error generating zip:", err);
    } finally {
      setZipping(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-sky-100 shadow-xl p-5 sm:p-6 space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sky-100">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-tr from-sky-500 to-teal-400 text-white rounded-xl shadow-md">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 flex flex-wrap items-center gap-2">
              Python Scaffolding & Architecture Browser
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 text-sky-900 border border-sky-200">
                LlamaIndex + Presidio + SaulLM
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Complete modular backend codebase ready for local Python deployment with Streamlit and LlamaIndex.
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadZip}
          disabled={zipping}
          className="px-4 py-2.5 bg-gradient-to-r from-sky-600 to-teal-500 hover:from-sky-500 hover:to-teal-400 text-white font-bold text-xs rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer shrink-0 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {zipping ? "Packaging Zip..." : "Download Project Zip"}
        </button>
      </div>

      {/* Directory Structure & File Browser */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* File Tree Sidebar */}
        <div className="md:col-span-1 bg-sky-50/60 text-slate-700 rounded-xl p-3 border border-sky-200 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-sky-900 px-2 py-1 flex items-center gap-1.5 border-b border-sky-200 pb-2">
            <FolderTree className="w-3.5 h-3.5 text-sky-600" /> legal_assistant /
          </div>

          <div className="space-y-1">
            {Object.keys(pythonFiles).map((fileName) => (
              <button
                key={fileName}
                onClick={() => setSelectedFileName(fileName)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 transition cursor-pointer ${
                  selectedFileName === fileName
                    ? "bg-sky-600 text-white font-bold shadow-xs"
                    : "hover:bg-sky-100/80 text-slate-700"
                }`}
              >
                <FileCode className={`w-3.5 h-3.5 shrink-0 ${selectedFileName === fileName ? "text-white" : "text-sky-600"}`} />
                <span className="truncate">{fileName}</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-sky-200 text-[10px] text-slate-600 p-2 space-y-1">
            <div className="text-slate-900 font-semibold">💡 <strong>Run Locally:</strong></div>
            <code className="block bg-slate-900 p-2 rounded-lg border border-slate-800 text-cyan-200 text-[10px] font-mono leading-relaxed">
              pip install -r requirements.txt
              <br />
              streamlit run app.py
            </code>
          </div>
        </div>

        {/* Code Content Viewer */}
        <div className="md:col-span-3 space-y-0 overflow-hidden rounded-xl border border-sky-200 shadow-xs">
          <div className="flex items-center justify-between bg-sky-100/80 px-4 py-2.5 border-b border-sky-200">
            <span className="text-xs font-mono font-bold text-sky-950 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-sky-700" />
              {selectedFileName}
            </span>

            <button
              onClick={handleCopyCode}
              className="px-2.5 py-1 bg-white hover:bg-sky-50 text-sky-900 text-xs font-semibold rounded-lg border border-sky-300 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5 text-sky-600" />}
              {copied ? "Copied" : "Copy Code"}
            </button>
          </div>

          <pre className="bg-slate-900 text-sky-100 p-4 text-xs font-mono leading-relaxed h-[420px] overflow-auto shadow-inner">
            <code>{pythonFiles[selectedFileName] || "# Loading code content..."}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

