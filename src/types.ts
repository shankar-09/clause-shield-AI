export interface PIIEntity {
  entityType: string;
  value: string;
  start: number;
  end: number;
  mask: string;
  confidence: number;
}

export interface ContractClause {
  clause_name: string;
  category: string;
  risk_severity_score: number; // 1 to 10
  is_unusual_flag: boolean;
  original_text: string;
  simple_explanation: string;
  actionable_recommendation: string;
}

export interface LayoutNode {
  type: "Header" | "Section" | "Table" | "Footnote" | "List";
  title: string;
  level: number;
  containsPII?: boolean;
  hasNestedList?: boolean;
  containsFootnotes?: boolean;
  containsTable?: boolean;
}

export interface TelemetryData {
  modelUsed: string;
  routingReason: string;
  promptCacheHit: boolean;
  estimatedTokensSaved: number;
  processingTimeMs: number;
  tokensAnalyzed: number;
}

export interface ContractAnalysisResult {
  redactedText: string;
  piiEntities: PIIEntity[];
  clauses: ContractClause[];
  layoutNodes: LayoutNode[];
  telemetry: TelemetryData;
}

export interface SampleContract {
  id: string;
  title: string;
  category: string;
  iconName: string;
  text: string;
  description: string;
}
