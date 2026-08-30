import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import api from '../lib/api';
import { useAuthStore } from '../store/authStore';

export default function ComposePage() {
  const router = useRouter();
  const { isAuthenticated, initAuth } = useAuthStore();
  const [form, setForm] = useState({ to: 'team@company.com', subject: 'Follow-up on launch plan', body: 'Hi team,\n\nI reviewed the launch plan and the remaining item is final approval before Friday. Please confirm the timeline for sign-off.\n\nThanks,' });
  const [sending, setSending] = useState(false);

  useState(() => { initAuth(); });

  const handleSend = async () => {
    setSending(true);
    const res = await api.post('/mail/send', { ...form });
    setSending(false);
    if (res.success) router.push('/dashboard');
  };

  if (!isAuthenticated) {
    return <div className="page" style={{ display: 'grid', placeItems: 'center' }}><div className="card" style={{ padding: 22 }}><h3>Please sign in</h3><Link href="/login" className="btn btn-primary">Continue</Link></div></div>;
  }

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 1000 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <h1 style={{ margin: 0 }}>Compose</h1>
          <Link href="/dashboard" className="btn btn-secondary">Back</Link>
        </div>

        <div className="card" style={{ padding: 22 }}>
          <div style={{ display: 'grid', gap: 18 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8 }}>To</label>
              <input className="input" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8 }}>Subject</label>
              <input className="input" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8 }}>Message</label>
              <textarea className="input" rows={12} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-primary" onClick={handleSend} disabled={sending}>{sending ? 'Sending...' : 'Send email'}</button>
              <button className="btn btn-secondary" onClick={() => setForm({ ...form, body: `${form.body}\n\nAI draft: Thanks for the update. I will review the changes and share final confirmation by the end of the day.`})}>Generate AI draft</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
