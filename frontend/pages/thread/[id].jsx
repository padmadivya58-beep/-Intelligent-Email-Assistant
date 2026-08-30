import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { useAuthStore } from '../../store/authStore';

export default function ThreadPage() {
  const router = useRouter();
  const { id } = router.query;
  const { isAuthenticated, initAuth } = useAuthStore();
  const [thread, setThread] = useState(null);
  const [summary, setSummary] = useState('');

  useEffect(() => { initAuth(); }, [initAuth]);

  useEffect(() => {
    if (!isAuthenticated || !id) return;
    api.get(`/mail/thread/${id}`).then((res) => { if (res.success) setThread(res.data); }).catch(() => {});
  }, [isAuthenticated, id]);

  const handleSummarize = async () => {
    const res = await api.post('/ai/summarize', { email: thread?.messages?.[0]?.body || 'No content' });
    if (res.success) setSummary(res.data.summary);
  };

  if (!isAuthenticated) {
    return <div className="page" style={{ display: 'grid', placeItems: 'center' }}><div className="card" style={{ padding: 20 }}><h3>Please sign in</h3><Link href="/login" className="btn btn-primary">Go to login</Link></div></div>;
  }

  return (
    <div className="page">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 22 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ margin: 0 }}>{thread?.subject || 'Thread'}</h2>
            <Link href="/inbox" className="btn btn-secondary">Back</Link>
          </div>

          <div style={{ display: 'grid', gap: 16 }}>
            {(thread?.messages || []).map((msg, idx) => (
              <div key={idx} className="card" style={{ padding: 16 }}>
                <div style={{ color: '#a5b4fc', marginBottom: 10 }}>{msg.from || 'sender@example.com'}</div>
                <div style={{ color: '#e2e8f0', lineHeight: 1.7 }}>{msg.body}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ marginTop: 0 }}>AI assistant</h3>
          <button className="btn btn-primary" onClick={handleSummarize} style={{ width: '100%', marginBottom: 12 }}>Summarize</button>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ color: '#94a3b8', marginBottom: 8 }}>Summary</div>
            <div style={{ color: '#e2e8f0', lineHeight: 1.7 }}>{summary || 'Generate a summary for this email thread.'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
