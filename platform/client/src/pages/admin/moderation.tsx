import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminRoute } from '@/routes/route-wrappers';

export default function AdminModerationPage() {
  const queryClient = useQueryClient();
  const { data: reports } = useQuery(['/api/admin/moderation'], async () => {
    const resp = await fetch('/api/admin/moderation');
    if (!resp.ok) throw new Error('Failed to fetch moderation reports');
    return resp.json();
  });

  const mutation = useMutation(async ({ id, status, resolution }: any) => {
    const resp = await fetch(`/api/admin/moderation/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, resolution }),
    });
    if (!resp.ok) throw new Error('Failed to update status');
    return resp.json();
  }, { onSuccess: () => queryClient.invalidateQueries(['/api/admin/moderation', '/api/admin/moderation/count']) });

  return (
    <AdminRoute>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Moderation Inbox</h1>
        {!reports || reports.length === 0 ? (
          <div className="text-muted-foreground">No reports.</div>
        ) : (
          <div className="space-y-4">
            {reports.map((r: any) => (
              <div key={r.id} className="p-4 border rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm">Reporter: {r.reporterId}</div>
                    <div className="text-sm">Reported: {r.reportedUserId || '—'}</div>
                    <div className="text-xs text-muted-foreground">Source: {r.source} / {r.sourceId}</div>
                  </div>
                  <div className="text-sm">Status: {r.status}</div>
                </div>
                <div className="mt-2 text-sm">Reason: {r.reason}</div>
                {r.description && <div className="mt-2 text-sm text-muted-foreground">{r.description}</div>}
                <div className="mt-3 flex gap-2">
                  <button onClick={() => mutation.mutate({ id: r.id, status: 'investigating' })} className="px-3 py-1 bg-yellow-500 text-white rounded">Investigate</button>
                  <button onClick={() => mutation.mutate({ id: r.id, status: 'resolved' })} className="px-3 py-1 bg-green-600 text-white rounded">Resolve</button>
                  <button onClick={() => mutation.mutate({ id: r.id, status: 'dismissed' })} className="px-3 py-1 bg-gray-500 text-white rounded">Dismiss</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminRoute>
  );
}
