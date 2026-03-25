import React from "react";
import type { TrustUserExtension, TrustEvidenceItem } from "../../lib/trust/types";

export interface TrustEvidencePanelProps {
  trust: TrustUserExtension;
  compact?: boolean;
}

export const TrustEvidencePanel: React.FC<TrustEvidencePanelProps> = ({ trust, compact }) => {
  return (
    <section className="rounded border bg-background p-4 mb-2">
      <header className="flex items-center gap-2 mb-2">
        <span className="font-semibold text-lg">Trust &amp; Verification</span>
        <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
          trust.trustStatus === "verified"
            ? "bg-green-100 text-green-800"
            : trust.trustStatus === "flagged"
            ? "bg-red-100 text-red-800"
            : "bg-gray-100 text-gray-800"
        }`}>
          {trust.trustStatus.charAt(0).toUpperCase() + trust.trustStatus.slice(1)}
        </span>
        <span className="ml-auto text-xs text-muted-foreground">
          Visibility: {trust.trustVisibility.charAt(0).toUpperCase() + trust.trustVisibility.slice(1)}
        </span>
      </header>
      <ul className="space-y-2">
        {trust.trustEvidence.length === 0 ? (
          <li className="text-sm text-muted-foreground">No trust evidence available.</li>
        ) : (
          trust.trustEvidence.map((item: TrustEvidenceItem, idx: number) => (
            <li key={idx} className="border rounded p-2 bg-muted">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{item.type}</span>
                <span className="text-xs text-muted-foreground ml-auto">{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="text-sm">{item.summary}</div>
              {item.details && <div className="text-xs text-muted-foreground mt-1">{item.details}</div>}
            </li>
          ))
        )}
      </ul>
    </section>
  );
};
