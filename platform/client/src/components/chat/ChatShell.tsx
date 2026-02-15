import React, { Suspense, lazy, useState } from 'react';

const SupabaseChat = lazy(() => import('./SupabaseChat'));

export default function ChatShell({ onClose }: { onClose: () => void }) {
  const [minimized, setMinimized] = useState(false);

  return (
    <div className="fixed bottom-20 right-6 z-50 w-80 md:w-96 max-h-[70vh] shadow-2xl rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
      <div className="flex items-center justify-between px-3 py-2 bg-slate-800 text-white">
        <div className="text-sm font-semibold">Community Support</div>
        <div className="flex items-center space-x-2">
          <button
            aria-label="Minimize chat"
            onClick={() => setMinimized((v) => !v)}
            className="text-white/90 hover:text-white"
          >
            {minimized ? 'Expand' : 'Minimize'}
          </button>
          <button aria-label="Close chat" onClick={onClose} className="text-white/90 hover:text-white">
            Close
          </button>
        </div>
      </div>

      {!minimized && (
        <Suspense fallback={<div className="p-4 text-slate-400">Loading chat…</div>}>
          <SupabaseChat />
        </Suspense>
      )}
    </div>
  );
}
